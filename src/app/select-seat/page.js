"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useMovieDetails } from "@/hooks/useMovie"
import { useGetShowtimeById, useGetShowtimeByUserFilter } from "@/hooks/useShowtime"
import { useGetSeatsByRoomId } from "@/hooks/useSeat"
import SeatMatrix from "@/components/select-seat/SeatMatrix"
import PopcornCombo from "@/components/select-seat/PopcornCombo"
import BookingSummary from "@/components/select-seat/BookingSummary"
import OrderConfirmation from "@/components/select-seat/OrderConfirmation"

export default function SelectSeat() {
  const params = useSearchParams()
  const router = useRouter()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [tickets, setTickets] = useState({})
  const [showComboSelection, setShowComboSelection] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedCombos, setSelectedCombos] = useState([])
  const [promoCodeApplied, setPromoCodeApplied] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)
  
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

  const toggleSeat = (...listSeatId) => {
    const firstSeat = seatMap?.[listSeatId[0]]
    if (!firstSeat) return
    const newStatus = tickets[firstSeat.id]?.status === 'selected' ? 'available' : 'selected'

    const newTickets = { ...tickets }
    listSeatId.forEach(seatId => {
      const seat = seatMap?.[seatId]
      if (seat) {
        newTickets[seat.id] = {
          ...tickets[seat.id],
          status: newStatus
        }
      }
    })
    setTickets(newTickets)

    if (selectedSeats.includes(listSeatId[0])) {
      setSelectedSeats(selectedSeats.filter(id => !listSeatId.includes(id)))
    } else {
      setSelectedSeats([...selectedSeats, ...listSeatId].sort(
        (a, b) => {
          const rowA = a.split('')[0]
          const rowB = b.split('')[0]
          if (rowA === rowB) {
            return a.split('')[1] - b.split('')[1]
          }
          return rowA - rowB
        }
      ))
    }
  }

  const handleComboSelect = (combo, quantity) => {
    setSelectedCombos(prev => {
      const existingCombo = prev.find(c => c.id === combo.id)
      if (existingCombo) {
        if (quantity === 0) {
          return prev.filter(c => c.id !== combo.id)
        }
        return prev.map(c => c.id === combo.id ? { ...c, quantity } : c)
      }
      return [...prev, { ...combo, quantity }]
    })
  }

  const handleApplyPromoCode = (code) => {
    // Giả lập API call kiểm tra mã giảm giá
    setTimeout(() => {
      if (code === 'DISCOUNT20') {
        setPromoCodeApplied(true)
        setDiscountAmount(Math.floor(totalPrice * 0.2)) // Giảm 20%
      }
    }, 500)
  }

  const handleContinueToPayment = () => {
    router.push(`/payment?m=${movieId}&s=${showtimeId}&seats=${selectedSeats.join(',')}&combos=${JSON.stringify(selectedCombos)}&discount=${discountAmount}`)
  }

  const totalPrice = selectedSeats.length * showtimeDetails?.body?.price + 
    selectedCombos.reduce((total, combo) => total + (combo.price * combo.quantity), 0)

  const getStepTitle = () => {
    if (showConfirmation) return 'Xác nhận đơn hàng'
    if (showComboSelection) return 'Chọn combo'
    return 'Chọn ghế'
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <Image 
        src={movieDetails?.body?.large_poster_url || "/placeholder.svg"} 
        alt="background" 
        width={1920} 
        height={1080} 
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1] opacity-50" 
      />
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/movies/${movieId}`}>
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">{getStepTitle()}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {!showComboSelection && !showConfirmation ? (
          <>
            <SeatMatrix 
              showtimeDetails={showtimeDetails} 
              tickets={tickets} 
              toggleSeat={toggleSeat} 
              selectedSeats={selectedSeats} 
              seatMap={seatMap} 
            />

            <div className="lg:col-span-1">
              <BookingSummary
                movieDetails={movieDetails}
                showtimeDetails={showtimeDetails}
                selectedSeats={selectedSeats}
                totalPrice={totalPrice}
                buttonText="Tiếp tục"
                onButtonClick={() => setShowComboSelection(true)}
                buttonDisabled={selectedSeats.length === 0}
              />
            </div>
          </>
        ) : showComboSelection && !showConfirmation ? (
          <>
            <div className="lg:col-span-2">
              <PopcornCombo onContinue={handleComboSelect} selectedCombos={selectedCombos} />
            </div>

            <div className="lg:col-span-1">
              <BookingSummary
                movieDetails={movieDetails}
                showtimeDetails={showtimeDetails}
                selectedSeats={selectedSeats}
                selectedCombos={selectedCombos}
                totalPrice={totalPrice}
                buttonText="Tiếp tục"
                onButtonClick={() => setShowConfirmation(true)}
                showBackButton={true}
                onBackClick={() => setShowComboSelection(false)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="lg:col-span-3">
              <OrderConfirmation
                movieDetails={movieDetails}
                showtimeDetails={showtimeDetails}
                selectedSeats={selectedSeats}
                selectedCombos={selectedCombos}
                totalPrice={totalPrice}
                onApplyPromoCode={handleApplyPromoCode}
                onBack={() => setShowConfirmation(false)}
                onConfirm={handleContinueToPayment}
                promoCodeApplied={promoCodeApplied}
                discountAmount={discountAmount}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

