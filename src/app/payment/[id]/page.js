"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Clock, Check, AlertCircle } from "lucide-react"
import { useGetOrderWithPayment } from "@/hooks/useOrder"
import { useGetShowtimeById } from "@/hooks/useShowtime"
import { useMovieDetails } from "@/hooks/useMovie"
import { useGetCinemaById } from "@/hooks/useCinema"
import { QRCodeSVG } from 'qrcode.react'

export default function PaymentPage() {
    const { id } = useParams()
    const router = useRouter()
    const { data: orderData, isLoading } = useGetOrderWithPayment(id)
    const { data: showtimeData, refetch: refetchShowtime } = useGetShowtimeById(orderData?.body?.order.showtime_id)
    const { data: movieData, refetch: refetchMovie } = useMovieDetails(showtimeData?.body?.movie_id)
    const { data: cinemaData } = useGetCinemaById(showtimeData?.body?.room?.cinema_id)
    const [paymentStatus, setPaymentStatus] = useState("pending") // pending, success, failed

    useEffect(() => {
        if (orderData) {
            refetchShowtime()
        }
    }, [orderData])

    useEffect(() => {
        if (showtimeData) {
            refetchMovie()
        }
    }, [showtimeData])

    useEffect(() => {
        // Connect to WebSocket
        const ws = new WebSocket('ws://localhost:8000/ws?t=' + 'Bearer ' + localStorage.getItem('access_token') + '&r=payment')

        ws.onopen = () => {
            console.log('WebSocket Connected')
            // Send order ID to subscribe to payment updates
            ws.send(JSON.stringify({ orderId: id }))
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log(data)
            if (data.data.message === 'success') {
                setPaymentStatus('success')
                // Redirect to payment success page after 2 seconds
                // setTimeout(() => {
                //     router.push(`/payment/success/${id}`)
                // }, 2000)
            } else if (data.status === 'failed') {
                setPaymentStatus('failed')
            }
        }

        ws.onerror = (error) => {
            console.error('WebSocket error:', error)
        }

        ws.onclose = () => {
            console.log('WebSocket Disconnected')
        }

        // Cleanup on component unmount
        return () => {
            ws.close()
        }
    }, [])

    const movie = {
        id: movieData?.body?.id,
        title: movieData?.body?.title,
        poster_url: movieData?.body?.poster_url,
        genres: movieData?.body?.genres,
        release_date: showtimeData?.body?.start_time,
    }

    return (
        <div className="max-w-3xl mx-auto p-8">
            <div className="flex items-center gap-4 mb-8">
                <Link href={`/payment/${movie.id}`}>
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold">Payment Confirmation</h1>
            </div>

            <div className="bg-card rounded-xl overflow-hidden mb-8">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <Image
                            src={movie?.poster_url || "/placeholder.svg"}
                            alt={movie?.title || "Movie Poster"}
                            width={100}
                            height={150}
                            className="rounded-lg"
                        />
                        <div>
                            <h2 className="text-xl font-bold mb-2">{movie?.title}</h2>
                            <p className="text-muted-foreground mb-4">{movie?.genres?.join(", ")}</p>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                <p className="text-sm">
                                    <span className="text-muted-foreground">Date:</span> {showtimeData?.body?.start_time.split("T")[0]}
                                </p>
                                <p className="text-sm">
                                    <span className="text-muted-foreground">Time:</span> {showtimeData?.body?.start_time.split("T")[1].slice(0, 5)}
                                </p>
                                <p className="text-sm">
                                    <span className="text-muted-foreground">Theater:</span> {cinemaData?.body?.name}
                                </p>
                                <p className="text-sm">
                                    <span className="text-muted-foreground">Seats:</span> {orderData?.body?.order.tickets.map(ticket => ticket.seat.row_number + ticket.seat.seat_number).sort(
                                        (a, b) => a.localeCompare(b)
                                    ).join(", ")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-dashed border-border mt-4 mb-4">
                        <div className="flex justify-between font-bold mt-4">
                            <span>Total</span>
                            <span>{orderData?.body?.order.total_price.toLocaleString()} VND</span>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-0 -top-4 w-8 h-8 rounded-full bg-background -translate-x-1/4"></div>
                    <div className="absolute right-0 -top-4 w-8 h-8 rounded-full bg-background translate-x-1/4"></div>
                    <div className="border-t border-dashed border-border my-3"></div>
                </div>

                <div className="p-6 flex flex-col items-center">
                    {paymentStatus === "pending" && (
                        <>
                            <div className="text-center mb-6">
                                <h3 className="text-lg font-bold mb-2">Scan QR Code to Pay</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Use your banking app or e-wallet to scan this QR code
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-lg mb-6">
                                <QRCodeSVG 
                                    value={orderData?.body?.qr_text || ""}
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>

                            <p className="text-sm text-center text-muted-foreground mb-4">
                                Please don't close this page until payment is complete
                            </p>

                            <div className="flex items-center justify-center gap-2 text-primary animate-pulse">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                <span>Waiting for payment...</span>
                            </div>
                        </>
                    )}

                    {paymentStatus === "success" && (
                        <>
                            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                                <Check className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Payment Successful!</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                Your payment has been processed successfully. Your tickets are ready.
                            </p>
                            <Link href={`/tickets`} className="primary-button">
                                View My Ticket
                            </Link>
                        </>
                    )}

                    {paymentStatus === "failed" && (
                        <>
                            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                                <AlertCircle className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Payment Failed</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                There was an issue processing your payment. Please try again.
                            </p>
                            <div className="flex gap-4">
                                <button onClick={() => setPaymentStatus("pending")} className="secondary-button flex-1">
                                    Try Again
                                </button>
                                <Link href={`/payment/${movie.id}`} className="primary-button flex-1">
                                    Change Payment Method
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
