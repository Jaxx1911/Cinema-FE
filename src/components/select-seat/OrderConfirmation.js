import React, { useState } from 'react';
import { CalendarIcon, MapPinIcon, ClockIcon } from 'lucide-react';
import { useCreateOrder } from '@/hooks/useOrder';
import { toast } from 'react-hot-toast';

const OrderConfirmation = ({ 
  movieDetails, 
  showtimeDetails, 
  selectedSeats, 
  selectedCombos,
  totalPrice,
  onApplyPromoCode,
  onBack,
  onConfirm,
  promoCodeApplied,
  discountAmount = 0,
  seatMap,
  ticketMap
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');
  const { createOrder, isCreating } = useCreateOrder();

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      setError('Vui lòng nhập mã giảm giá');
      return;
    }
    onApplyPromoCode(promoCode);
  };

  const handleConfirmOrder = () => {
    const orderData = {
      showtime_id: showtimeDetails?.body?.id,
      discount_id: promoCodeApplied ? promoCode : null,
      total_price: totalPrice - discountAmount,
      tickets: selectedSeats.map(seatId => {
        const seat = seatMap[seatId]
        const ticket = ticketMap[seat.id]
        if (!ticket) {
          return null;
        }
        return ticket.id
      }).filter(Boolean),
      combos: selectedCombos.map(combo => ({
        id: combo.id,
        quantity: combo.quantity,
        total_price: combo.price * combo.quantity
      }))
    };

    console.log('Final order data:', orderData);

    createOrder(orderData, {
      onSuccess: () => {
        onConfirm();
      }
    });
  };

  return (
    <div className="bg-card rounded-xl p-6">
      <h2 className="text-lg font-bold mb-6">Xác nhận đơn hàng</h2>

      {/* Movie & Showtime Info */}
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-bold mb-2">{movieDetails?.body?.title}</h3>
        <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="w-4 h-4" />
                <p>Ngày: {new Date(showtimeDetails?.body?.start_time).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            </div>
            <div className="flex items-center gap-2 mb-2">
                <ClockIcon className="w-4 h-4" />
                <p>Suất chiếu: {new Date(showtimeDetails?.body?.start_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="flex items-center gap-2 mb-2">
                <MapPinIcon className="w-4 h-4" />
                <p>Phòng: {showtimeDetails?.body?.room?.name}</p>
            </div>
        </div>
      </div>

      {/* Selected Seats */}
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-bold mb-2">Ghế đã chọn</h3>
        <div className="flex justify-between mb-2">
            <div className="flex flex-wrap gap-2">
            {selectedSeats.map(seat => (
                <span key={seat} className="px-3 py-1 bg-primary rounded-md text-black mb-2">
                {seat}
                </span>
            ))}
            </div>
          <p className="text-sm mt-2">
            {selectedSeats.length} x {showtimeDetails?.body?.price?.toLocaleString()} VND
          </p>
        </div>
      </div>

      {/* Selected Combos */}
      {selectedCombos.length > 0 && (
        <div className="border-b border-border pb-4 mb-4">
          <h3 className="font-bold mb-2">Combo đã chọn</h3>
          {selectedCombos.map(combo => (
            <div key={combo.id} className="flex justify-between text-sm mb-2">
              <span>{combo.name} x {combo.quantity}</span>
              <span>{(combo.price * combo.quantity).toLocaleString()} VND</span>
            </div>
          ))}
        </div>
      )}

      {/* Promo Code */}
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-bold mb-2">Mã giảm giá</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              setError('');
            }}
            placeholder="Nhập mã giảm giá"
            className="flex-1 px-3 py-2 bg-background rounded-md border border-border focus:outline-none focus:border-primary"
            disabled={promoCodeApplied}
          />
          <button
            onClick={handleApplyPromoCode}
            disabled={promoCodeApplied}
            className={`px-4 py-2 rounded-md ${
              promoCodeApplied 
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-primary text-black hover:bg-primary/90'
            }`}
          >
            {promoCodeApplied ? 'Đã áp dụng' : 'Áp dụng'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1 mb-2">{error}</p>}
        {promoCodeApplied && (
          <p className="text-green-500 text-sm mt-1">Đã áp dụng mã giảm giá thành công!</p>
        )}
      </div>

      {/* Total */}
      <div className="border-b border-border pb-4 mb-6">
        <div className="flex justify-between mb-2">
          <span>Tổng tiền</span>
          <span>{totalPrice.toLocaleString()} VND</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between mb-2 text-green-500">
            <span>Giảm giá</span>
            <span>-{discountAmount.toLocaleString()} VND</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg mb-2">
          <span>Thành tiền</span>
          <span>{(totalPrice - discountAmount).toLocaleString()} VND</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-2 px-4 rounded-md border border-border hover:bg-border"
        >
          Quay lại
        </button>
        <button
          onClick={handleConfirmOrder}
          disabled={isCreating}
          className={`flex-1 py-2 px-4 rounded-md bg-primary text-black hover:bg-primary/90 cursor-pointer ${
            isCreating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isCreating ? 'Đang xử lý...' : 'Xác nhận đặt vé'}
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation; 