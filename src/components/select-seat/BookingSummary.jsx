import React from 'react';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';

const BookingSummary = ({ 
  movieDetails, 
  showtimeDetails, 
  selectedSeats, 
  selectedCombos, 
  totalPrice,
  buttonText,
  onButtonClick,
  buttonDisabled = false,
  showBackButton = false,
  onBackClick
}) => {
  return (
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
            <p>Price: {showtimeDetails?.body?.price.toLocaleString()} VND</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-4 mb-6">
        <div className="flex justify-between mb-2 mt-4">
          <span className="text-muted-foreground">Tickets ({selectedSeats.length})</span>
          <span>
            {selectedSeats.reduce((total, seatId) => {
              const row = seatId[0]
              const col = parseInt(seatId.slice(1))
              const isPremiumSeat = row >= 'D' 
                && row < String.fromCharCode(65 + showtimeDetails?.body?.room?.row_count - 2) 
                && col >= showtimeDetails?.body?.room?.column_count/2 - 3 
                && col <= showtimeDetails?.body?.room?.column_count/2 + 4
              const isCoupleSeat = row === String.fromCharCode(65 + showtimeDetails?.body?.room?.row_count - 1)
              
              let seatPrice = showtimeDetails?.body?.price
              if (isPremiumSeat) seatPrice += 29000
              if (isCoupleSeat) seatPrice += 19000
              
              return total + seatPrice
            }, 0).toLocaleString()} VND
          </span>
        </div>

        {selectedSeats.length > 0 && (
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Seats</span>
            <span>{selectedSeats.sort((a, b) => a.localeCompare(b)).join(", ")}</span>
          </div>
        )}

        {selectedCombos?.map((combo) => (
          <div key={combo.id} className="flex justify-between mb-2">
            <span className="text-muted-foreground">{combo.name} ({combo.quantity})</span>
            <span>{(combo.price * combo.quantity).toLocaleString()} VND</span>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 mb-6">
        <div className="flex justify-between font-bold mt-4">
          <span>Total</span>
          <span>{totalPrice.toLocaleString()} VND</span>
        </div>
      </div>

      <div className="space-y-3">
        {showBackButton && (
          <button
            onClick={onBackClick}
            className="w-full py-2 px-4 secondary-button"
          >
            Back to Seats
          </button>
        )}
        <button
          onClick={onButtonClick}
          disabled={buttonDisabled}
          className={`primary-button w-full ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default BookingSummary; 