"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { format, addDays } from "date-fns"
import { useMovieDetails } from "@/hooks/useMovie"
export default function SelectSeat() {
  const params = useSearchParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState("19:30")
  
  const showtimeId = params.get("s")
  const movieId = params.get("m")
  console.log(showtimeId, movieId);
  
  const { data: movieDetails } = useMovieDetails(movieId)


  const dates = [
    { id: 1, date: format(new Date(), 'dd-MM-yyyy'), day: format(new Date(), 'EEEE')},
    { id: 2, date: format(addDays(new Date(), 1), 'dd-MM-yyyy'), day: format(addDays(new Date(), 1), 'EEEE')},
    { id: 3, date: format(addDays(new Date(), 2), 'dd-MM-yyyy'), day: format(addDays(new Date(), 2), 'EEEE')},
    { id: 4, date: format(addDays(new Date(), 3), 'dd-MM-yyyy'), day: format(addDays(new Date(), 3), 'EEEE')},
    { id: 5, date: format(addDays(new Date(), 4), 'dd-MM-yyyy'), day: format(addDays(new Date(), 4), 'EEEE')},
  ]

  const [selectedDate, setSelectedDate] = useState(dates[0].date)
  // Sample movie data
  const movie = {
    id: params.id,
    title: "Avengers: Infinity War",
    poster: "/placeholder.svg?height=150&width=100",
    genres: ["Action", "Adventure", "Sci-Fi"],
    price: 70000, // Price per seat in VND
    dates: dates,
    times: ["10:30", "13:15", "16:00", "19:30", "22:15"],
  }

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId))
    } else {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const getSeatStatus = (row, col) => {
    const seatId = `${row}${col}`

    if (selectedSeats.includes(seatId)) {
      return "selected"
    }

    // Some seats are pre-reserved
    const reservedSeats = ["C4", "C5", "D6", "D7", "E2", "E3", "F10", "G8", "H5", "H6", "H7"]
    if (reservedSeats.includes(seatId)) {
      return "reserved"
    }

    return "available"
  }

  const totalPrice = selectedSeats.length * movie.price

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/movie/${movie.id}`}>
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">Select seats</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Select date</h2>
              <span className="text-muted-foreground">April 2023</span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {movie.dates.map((date) => (
                <button
                  key={date.date}
                  className={`flex flex-col items-center justify-center min-w-[80px] p-4 rounded-lg ${
                    selectedDate === date.date ? "bg-primary text-black" : "bg-input hover:bg-input/80"
                  }`}
                  onClick={() => setSelectedDate(date.date)}
                >
                  <span className="text-sm">{date.day}</span>
                  <span className="text-xl font-bold">{date.date.split("-")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold mb-6">Select time</h2>

            <div className="flex flex-wrap gap-4">
              {movie.times.map((time) => (
                <button
                  key={time}
                  className={`px-6 py-3 rounded-lg ${
                    selectedTime === time ? "bg-primary text-black" : "bg-input hover:bg-input/80"
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6">Select seats</h2>

            <div className="w-full bg-[#111] rounded-lg p-6 mb-6">
              <div className="w-full h-2 bg-[#333] rounded-full mb-12 relative">
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                  SCREEN
                </div>
              </div>

              <div className="grid grid-cols-10 gap-2 mb-8">
                {["A", "B", "C", "D", "E", "F", "G", "H"].map((row, rowIndex) => (
                  <React.Fragment key={row}>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((col) => {
                      const status = getSeatStatus(row, col)
                      return (
                        <button
                          key={`${row}${col}`}
                          className={`w-10 h-10 rounded-md text-xs flex items-center justify-center ${
                            status === "available"
                              ? "border border-[#333] hover:bg-[#222]"
                              : status === "selected"
                                ? "bg-primary text-black"
                                : "bg-[#333] opacity-50 cursor-not-allowed"
                          }`}
                          onClick={() => status !== "reserved" && toggleSeat(`${row}${col}`)}
                          disabled={status === "reserved"}
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

            <div className="flex gap-4 mb-6">
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
                  <p>Date: {selectedDate.split("-").join("/")}</p>
                  <p>Time: {selectedTime}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Tickets ({selectedSeats.length})</span>
                <span>{(movie.price * selectedSeats.length).toLocaleString()} VND</span>
              </div>

              {selectedSeats.length > 0 && (
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Seats</span>
                  <span>{selectedSeats.sort().join(", ")}</span>
                </div>
              )}

              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Booking fee</span>
                <span>0 VND</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{totalPrice.toLocaleString()} VND</span>
              </div>
            </div>

            <Link
              href={selectedSeats.length > 0 ? `/payment/${movie.id}` : "#"}
              className={`primary-button block text-center ${selectedSeats.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={(e) => selectedSeats.length === 0 && e.preventDefault()}
            >
              Continue to payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

