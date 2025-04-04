"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { format, addDays } from "date-fns"
import { useMovieDetails } from "@/hooks/useMovie"
import { useGetShowtimeById, useGetShowtimeByUserFilter } from "@/hooks/useShowtime"
import { useGetSeatsByRoomId } from "@/hooks/useSeat"
import { parseISO } from 'date-fns'

export default function SelectSeat() {
  const params = useSearchParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState("19:30")
  const [tickets, setTickets] = useState({})
  
  const showtimeId = params.get("s")
  const movieId = params.get("m")
  
  const { data: movieDetails } = useMovieDetails(movieId)
  const { data: showtimeDetails } = useGetShowtimeById(showtimeId)
  const { data: listSeats } = useGetSeatsByRoomId(showtimeDetails?.body?.room?.id)

  const seatMap = listSeats?.body?.reduce((acc, seat) => {
    acc[seat.row_number + seat.seat_number] = seat
    return acc
  }, {})

  const initialTickets = showtimeDetails?.body?.tickets?.reduce((acc, ticket) => {
    acc[ticket.seat_id] = ticket
    return acc
  }, {})

  useEffect(() => {
    if (showtimeDetails?.body?.tickets) {
      setTickets(initialTickets)
    }
  }, [showtimeDetails])

  const toggleSeat = (seatId) => {
    const seat = seatMap?.[seatId]
    if (!seat) return

    setTickets(prev => ({
      ...prev,
      [seat.id]: {
        ...prev[seat.id],
        status: prev[seat.id]?.status === 'selected' ? 'available' : 'selected'
      }
    }))

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId))
    } else {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }
  
  console.log(tickets)

  const totalPrice = selectedSeats.length * showtimeDetails?.body?.price

  return (
    <div className="max-w-7xl mx-auto p-8">
      <Image src={movieDetails?.body?.large_poster_url} alt="background" width={1920} height={1080} className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-50" />
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/movie/${movieId}`}>
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">Select seats</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl p-6">
            <div className="w-full bg-[#111] rounded-lg p-6">
              <div className="w-full h-4 bg-[#333] rounded-full mb-12">
                <div className="-bottom-6 text-xs text-white flex items-center justify-center">
                  SCREEN
                </div>
              </div>

              <div className="grid grid-cols-10 gap-2 mb-8">
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

        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl p-6 sticky top-8">
            <h2 className="text-lg font-bold mb-6">Booking summary</h2>

            <div className="flex gap-4 mb-4">
              <Image
                src={movieDetails?.body?.poster_url || "/placeholder.svg"}
                alt={movieDetails?.body?.title || ""}
                width={100}
                height={150}
                className="rounded-lg"
              />
              <div>
                <h3 className="font-bold mb-1">{movieDetails?.body?.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{movieDetails?.body?.genres.join(", ")}</p>
                <div className="text-sm">
                  <p>Date: {showtimeDetails?.body ? format(parseISO(showtimeDetails?.body?.start_time), 'dd-MM-yyyy') : ""}</p>
                  <p>Time: {showtimeDetails?.body ? format(parseISO(showtimeDetails?.body?.start_time), 'HH:mm') : ""}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between mb-2 mt-4">
                <span className="text-muted-foreground">Tickets ({selectedSeats.length})</span>
                <span>{(showtimeDetails?.body?.price * selectedSeats.length).toLocaleString()} VND</span>
              </div>

              {selectedSeats.length > 0 && (
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Seats</span>
                  <span>{selectedSeats.sort((a, b) => a.localeCompare(b)).join(", ")}</span>
                </div>
              )}

              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Booking fee</span>
                <span>0 VND</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between font-bold mt-4">
                <span>Total</span>
                <span>{totalPrice.toLocaleString()} VND</span>
              </div>
            </div>

            <Link
              href={selectedSeats.length > 0 ? `/payment/${movieId}` : "#"}
              className={`primary-button block text-center ${selectedSeats.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={(e) => selectedSeats.length === 0 && e.preventDefault()}
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

