import { X } from "lucide-react"
import { useGetOrderFullDetail } from "@/hooks/useOrder"
import { useGetCinemaById } from "@/hooks/useCinema"
import Image from "next/image"
import { Calendar, Clock, MapPin, Armchair, Clapperboard, Popcorn } from "lucide-react"

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export default function PaymentDetailPopup({ isOpen, onClose, orderId }) {
    const { data: order, isLoading } = useGetOrderFullDetail(orderId)
    const { data: cinema } = useGetCinemaById(order?.body?.room?.cinema_id)

    if (!isOpen || !orderId) {
        return null
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-xl p-6 max-w-2xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>
                
                {isLoading ? (
                    <div className="flex items-center justify-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex gap-6">
                            <div className="relative">
                                <Image
                                    src={order?.body?.movie?.poster_url || "/placeholder.svg"}
                                    alt={order?.body?.movie?.title || "Movie Poster"}
                                    width={120}
                                    height={180}
                                    className="rounded-lg h-[180px] w-auto object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">{order?.body?.movie?.title}</h3>
                                <p className="text-muted-foreground mb-4">{order?.body?.movie?.genres.join(", ")}</p>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Date</p>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-primary" />
                                            <p>{formatDate(order?.body?.showtime?.start_time)}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Time</p>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-primary" />
                                            <p>{new Date(order?.body?.showtime?.start_time).toLocaleTimeString("en-US", {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Cinema</p>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-primary" />
                                            <p>{cinema?.body?.name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Room</p>
                                        <div className="flex items-center gap-2">
                                            <Clapperboard className="w-4 h-4 text-primary" />
                                            <p>{order?.body?.room?.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-border pt-4">
                            <h4 className="font-bold mb-4">Ticket Details</h4>
                            <div className="space-y-2">
                                {order?.body?.tickets.map((ticket) => (
                                    <div key={ticket.id} className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Armchair className="w-4 h-4 text-primary" />
                                            <p>Seat {ticket.seat.row_number}{ticket.seat.seat_number}</p>
                                        </div>
                                        <p className="text-primary font-medium">
                                            {order?.body?.showtime?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {order?.body?.combos?.length > 0 && (
                            <div className="border-t border-border pt-4">
                                <h4 className="font-bold mb-4">Combo Details</h4>
                                <div className="space-y-4">
                                    {order?.body?.combos.map((combo) => (
                                        <div key={combo.id}>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <Popcorn className="w-4 h-4 text-primary" />
                                                    <p className="font-medium">{combo.name} x{combo.quantity}</p>
                                                </div>
                                                <p className="text-primary font-medium">
                                                    {(combo.price * combo.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div className="border-t border-border pt-4">
                            <div className="space-y-2">
                                {(() => {
                                    // Calculate original ticket price
                                    const ticketsTotal = order?.body?.tickets.reduce((sum, ticket) => 
                                        sum + (order?.body?.showtime?.price || 0), 0) || 0
                                    
                                    // Calculate combos total
                                    const combosTotal = order?.body?.combos?.reduce((sum, combo) => 
                                        sum + (combo.price * combo.quantity), 0) || 0
                                    
                                    // Calculate original total
                                    const originalTotal = ticketsTotal + combosTotal
                                    
                                    // Calculate discount
                                    const discount = originalTotal - (order?.body?.total_price || 0)
                                    
                                    return (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-medium">Subtotal</h4>
                                                <p className="font-medium">
                                                    {originalTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                </p>
                                            </div>
                                            
                                            {discount > 0 && (
                                                <div className="flex justify-between items-center text-green-500">
                                                    <h4 className="font-medium">Discount</h4>
                                                    <p className="font-medium">
                                                        -{discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </p>
                                                </div>
                                            )}
                                            
                                            <div className="flex justify-between items-center border-t border-border pt-2">
                                                <h4 className="font-bold">Total Amount</h4>
                                                <p className="text-xl text-primary font-bold">
                                                    {order?.body?.total_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                </p>
                                            </div>
                                        </>
                                    )
                                })()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 