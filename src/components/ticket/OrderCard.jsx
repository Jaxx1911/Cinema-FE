import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin, Download, QrCode, Armchair, Clapperboard, Popcorn, Eye } from "lucide-react"
import { useGetOrderFullDetail } from "@/hooks/useOrder"
import { useGetCinemaById } from "@/hooks/useCinema"
import { useEffect, useState } from "react"
import QRPopup from "./QRPopup"
import TicketDetailPopup from "./TicketDetailPopup"

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export default function OrderCard({ id, selectedStatus, onVisibilityChange }) {
    const { data: order, isLoading, error } = useGetOrderFullDetail(id)
    const { data: cinema } = useGetCinemaById(order?.body?.room?.cinema_id)
    const [isQRPopupOpen, setIsQRPopupOpen] = useState(false)
    const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false)

    const showtimeDate = new Date(order?.body?.showtime?.start_time)
    const now = new Date()
    
    const isVisible = () => {
        switch (selectedStatus.value) {
            case "upcoming":
                return showtimeDate >= now
            case "completed":
                return showtimeDate < now
            case "cancelled":
                return order?.body?.status === "cancelled"
            default:
                return true
        }
    }

    useEffect(() => {
      if (order?.body) {
          const visible = isVisible()
          onVisibilityChange?.(id, visible)
      }
      }, [order?.body, selectedStatus, id, onVisibilityChange])

    const handleQRClick = () => {
        if (order?.body?.id) {
            setIsQRPopupOpen(true)
        }
    }

    if (!isVisible()) return null

    return (
        <div key={id}>
            <div
              className={`bg-card rounded-xl overflow-hidden transition-all duration-300 ${
                showtimeDate >= now ? "border-l-4 border-primary" : ""
              }`}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left side - Movie poster and info */}
                  <div className="flex gap-6 flex-1">
                    <div className="relative">
                      <Image
                        src={order?.body?.movie?.poster_url || "/placeholder.svg"}
                        alt={order?.body?.movie?.title || "Movie Poster"}
                        width={100}
                        height={150}
                        className="rounded-lg h-auto w-[100px] object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold mb-2 transition-colors">
                        {order?.body?.movie?.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">{order?.body?.movie?.genres.join(", ")}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
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
                        

                        
                      </div>
                    </div>
                  </div>

                  {/* Right side - Theater logo and actions */}
                  <div className="flex flex-col justify-end items-center gap-4">
                    <div className={`flex gap-3 px-2 py-2 mb-auto rounded-md text-xs font-medium ${
                        showtimeDate >= now
                          ? "bg-yellow-500/20 text-yellow-500"
                          : showtimeDate < now
                          ? "bg-green-500/20 text-green-500"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {showtimeDate >= now
                        ? "Upcoming"
                        : showtimeDate < now
                          ? "Completed"
                          : "Cancelled"
                      }
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={handleQRClick}
                        className="flex items-end justify-end w-10 h-10 bg-input rounded-full hover:scale-105 transition-colors cursor-pointer"
                      >
                        <QrCode className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setIsDetailPopupOpen(true)}
                        className="flex items-end justify-end w-10 h-10 bg-input rounded-full hover:scale-105 transition-colors cursor-pointer"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <QRPopup 
              isOpen={isQRPopupOpen}
              onClose={() => setIsQRPopupOpen(false)}
              orderId={id}
            />
            <TicketDetailPopup 
              isOpen={isDetailPopupOpen}
              onClose={() => setIsDetailPopupOpen(false)}
              orderId={id}
            />
        </div>
    )
}

