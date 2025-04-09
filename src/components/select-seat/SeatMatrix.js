import React from "react"

export default function SeatMatrix({ showtimeDetails, tickets, toggleSeat, seatMap }) {
  console.log(showtimeDetails?.body?.room?.column_count)
  console.log('grid-cols-' + showtimeDetails?.body?.room?.column_count)
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

              <div className={`grid ${!showtimeDetails?.body?.room? 'grid-cols-10' : 'grid-cols-' + showtimeDetails?.body?.room?.column_count} gap-2 mb-8`}>
                {Array.from({ length: showtimeDetails?.body?.room?.row_count }, (_, i) => String.fromCharCode(65 + i)).map((row, rowIndex) => (
                  <React.Fragment key={row}>
                    {Array.from({ length: showtimeDetails?.body?.room?.column_count }, (_, i) => i + 1).map((col) => {
                      const seat = seatMap?.[`${row}${col}`]
                      return (
                        <button
                          key={`${row}${col}`}
                          className={`w-10 h-10 rounded-md text-xs flex items-center justify-center ${
                            tickets[seat?.id]?.status === "available" || !tickets[seat?.id]
                              ? "border border-[#333] hover:bg-[#222]"
                              : tickets[seat?.id]?.status === "selected"
                                ? "bg-primary text-black"
                                : "bg-[#333] opacity-50 cursor-not-allowed"
                          }`}
                          onClick={() => tickets[seat?.id]?.status !== "reserved" && toggleSeat(`${row}${col}`)}
                          disabled={tickets[seat?.id]?.status === "reserved"}
                        >
                          {row}
                          {col}
                        </button>
                      )
                    })}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-[#333] rounded-md"></div>
                  <span>Available</span>
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
