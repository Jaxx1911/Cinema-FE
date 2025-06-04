import { X } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

export default function QRPopup({ isOpen, onClose, orderId }) {
  if (!isOpen) return null
  if (!orderId) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-xl p-6 max-w-sm w-full mx-4 relative">
        
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Ticket QR Code</h3>
          <div className="bg-white p-4 rounded-lg inline-block">
            
          </div>
          <p className="text-muted-foreground mt-4">
            Show this QR code at the cinema entrance
          </p>
        </div>
      </div>
    </div>
  )
} 