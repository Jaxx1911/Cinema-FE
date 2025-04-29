import React from "react"
import '@/app/globals.css'

export default function SeatMatrix({ showtimeDetails, tickets, toggleSeat, seatMap }) {
  const handleCoupleSeatClick = (row, col) => {
    const isEvenSeat = col % 2 === 0
    const firstSeat = `${row}${isEvenSeat ? col - 1 : col}`
    const secondSeat = `${row}${isEvenSeat ? col : col + 1}`

    const firstSeatData = seatMap?.[firstSeat]
    const secondSeatData = seatMap?.[secondSeat]
    
    // Check if either seat is selected
    const isSelected = tickets[firstSeatData?.id]?.status === "selected" || tickets[secondSeatData?.id]?.status === "selected"
    
    // If selected, we want to deselect both seats
    if (isSelected) {
      toggleSeat(firstSeat, secondSeat)
    } else {
      // If not selected, we want to select both seats
      toggleSeat(firstSeat, secondSeat)
    }
  }

  return (
    <>
      <div className="lg:col-span-2">
        <div className="bg-card rounded-xl p-6">
          <div className="w-full bg-[#111] rounded-lg p-6">
            <div className="w-full h-4 bg-[#333] rounded-full mb-12">
              <div className="-bottom-6 text-xs text-white flex items-center justify-center">
                SCREEN
              </div>
            </div>

            {/* Regular seats */}
            <div className={`grid ${!showtimeDetails?.body?.room? 'grid-cols-10' : 'grid-cols-' + showtimeDetails?.body?.room?.column_count} gap-4 mb-4`}>
              {Array.from({ length: showtimeDetails?.body?.room?.row_count - 1 }, (_, i) => String.fromCharCode(65 + i)).map((row) => (
                <React.Fragment key={row}>
                  {Array.from({ length: showtimeDetails?.body?.room?.column_count }, (_, i) => i + 1).map((col) => {
                    const seat = seatMap?.[`${row}${col}`]
                    const isPremiumSeat = row >= 'D' 
                          && row < String.fromCharCode(65 + showtimeDetails?.body?.room?.row_count - 2) 
                          && col >= showtimeDetails?.body?.room?.column_count/2 - 3 
                          && col <= showtimeDetails?.body?.room?.column_count/2 + 4
                    
                    const isCoupleSeat = row === String.fromCharCode(65 + showtimeDetails?.body?.room?.row_count - 1)

                    return (
                      <button
                        key={`${row}${col}`}
                        className={`w-full h-9 rounded-md text-xs flex items-center justify-center ${
                          tickets[seat?.id]?.status === "available" || !tickets[seat?.id]
                            ? isPremiumSeat 
                              ? "bg-purple-900 text-white hover:bg-purple-800" 
                              : "bg-[#222] hover:bg-[#333]"
                            : tickets[seat?.id]?.status === "selected"
                              ? "bg-primary text-black"
                              : "bg-[#333] opacity-50 cursor-not-allowed"
                        }`}
                        onClick={() => {
                          if (tickets[seat?.id]?.status === "available" || tickets[seat?.id]?.status === "selected") {
                            toggleSeat(`${row}${col}`)
                          }
                        }}
                        disabled={tickets[seat?.id]?.status !== "available" && tickets[seat?.id]?.status !== "selected"}
                      >
                        {row}
                        {col}
                      </button>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>

            {/* Couple seats row */}
            <div className={`grid ${!showtimeDetails?.body?.room? 'grid-cols-5' : 'grid-cols-' + Math.ceil(showtimeDetails?.body?.room?.column_count/2)} gap-4 mb-8`}>
              {(() => {
                const lastRow = String.fromCharCode(65 + showtimeDetails?.body?.room?.row_count - 1)
                return Array.from({ length: Math.floor(showtimeDetails?.body?.room?.column_count/2) }, (_, i) => i * 2 + 1).map((col) => {
                  const seat = seatMap?.[`${lastRow}${col}`]
                  const nextSeat = seatMap?.[`${lastRow}${col + 1}`]
                  const isSelected = tickets[seat?.id]?.status === "selected" || tickets[nextSeat?.id]?.status === "selected"
                  const isReserved = tickets[seat?.id]?.status === "reserved" || tickets[nextSeat?.id]?.status === "reserved"

                  return (
                    <button
                      key={`${lastRow}${col}`}
                      className={`w-full h-10 rounded-md text-xs flex items-center justify-center ${
                        !isReserved && (tickets[seat?.id]?.status === "available" || !tickets[seat?.id])
                          ? "bg-pink-900 text-white hover:bg-pink-800"
                          : isSelected
                            ? "bg-primary text-black"
                            : "bg-[#333] opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        if (!isReserved || isSelected) {
                          handleCoupleSeatClick(lastRow, col)
                        }
                      }}
                      disabled={isReserved && !isSelected}
                    >
                      {`${lastRow}${col}-${col+1}`}
                    </button>
                  )
                })
              })()}
            </div>

            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#222] rounded-md"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-900 rounded-md"></div>
                <span>Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pink-900 rounded-md"></div>
                <span>Couple</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded-md"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#333] opacity-50 rounded-md"></div>
                <span>Reserved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
