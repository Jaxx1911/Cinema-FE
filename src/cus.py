import sqlite3
import base64
import json
import requests
import os
import psutil
import platform
import logging

# Set up logger
logger = logging.getLogger()
logging.basicConfig(level=logging.INFO)

def reset_account(state_path: str) -> bool:
    try:
        # Determine the correct process name based on the OS
        if platform.system() == 'Windows':
            process_name = 'cursor.exe'
        else:
            process_name = 'cursor'  # for macOS/Linux

        # Kill the cursor process
        for proc in psutil.process_iter(['pid', 'name']):
            if proc.info['name'] == process_name:
                logger.info(f"Terminating {process_name}...")
                proc.terminate()  # Terminate the process

        logger.info("Resetting account data...")

        conn = sqlite3.connect(state_path)
        cursor = conn.cursor()
        cursor.execute("SELECT value FROM ItemTable WHERE key = 'cursorAuth/accessToken'")
        result = cursor.fetchone()
        conn.close()

        if not result:
            logger.error("Access token not found")
            return False

        access_token = result[0]
        try:
            payload = access_token.split('.')[1]
            padding = 4 - len(payload) % 4
            if padding != 4: payload += '=' * padding
            token_data = json.loads(base64.b64decode(payload))
            user_id = token_data['sub'].split('|')[1] if '|' in token_data['sub'] else token_data['sub']
        except Exception as e:
            logger.error(f"Error parsing token: {e}")
            return False

        headers = {
            'accept': '/',
            'accept-language': 'en,vi;q=0.9',
            'content-type': 'application/json',
            'authorization': f'Bearer {access_token}',
            'origin': 'https://www.cursor.com',
            'referer': 'https://www.cursor.com/settings',
            'user-agent': 'Mozilla/5.0',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin'
        }

        cookies = {'WorkosCursorSessionToken': f'{user_id}::{access_token}'}
        response = requests.post('https://www.cursor.com/api/dashboard/delete-account', headers=headers, cookies=cookies, json={}, timeout=10)

        if response.status_code == 200:
            logger.info("Account reset successful!")
            return True
        else:
            logger.error(f"Error resetting account: HTTP {response.status_code}")
            logger.error(f"Response: {response.text}")
            return False

    except Exception as e:
        logger.error(f"Error resetting account: {e}")
        return False

# Usage example
if platform.system() == 'Windows':
    appdata = os.getenv("APPDATA", "")
    cursor_storage = os.path.join(appdata, "Cursor", "User", "globalStorage")
else:
    home_dir = os.path.expanduser("~")
    if platform.system() == 'Darwin':  # macOS
        cursor_storage = os.path.join(home_dir, "Library", "Application Support", "Cursor", "User", "globalStorage")
    else:  # Linux
        cursor_storage = os.path.join(home_dir, ".config", "Cursor", "User", "globalStorage")

state_path = os.path.join(cursor_storage, "state.vscdb")

# Call the function
reset_account(state_path)