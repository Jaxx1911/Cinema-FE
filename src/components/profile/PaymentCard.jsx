'use client'

import { useGetUserPayments } from '@/hooks/useUser'
import { useState } from 'react'
import { Eye } from 'lucide-react'
import PaymentDetailPopup from './PaymentDetailPopup'

export default function PaymentCard() {
    const { data: payments } = useGetUserPayments()
    const [selectedOrderId, setSelectedOrderId] = useState(null)

    return (
        <div data-active-tab="true">
            <h1 className="text-2xl font-bold mb-6">Payment History</h1>

            <div className="bg-card border rounded-lg overflow-hidden">
                <div className="p-4">
                    {payments?.body?.sort((a, b) => new Date(b.payment_time) - new Date(a.payment_time)).map((payment) => (
                        <div key={payment.id} className="flex border-b border-gray-800 justify-between items-center p-4 hover:bg-gray-800/50 transition-colors rounded-lg mb-2">
                            <div>
                                <h3 className="font-medium text-lg">{"Mã giao dịch: " + payment.transaction_id}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(payment.payment_time).toLocaleDateString('vi-VN', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-primary font-bold text-lg">
                                    {payment.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </span>
                                <button
                                    onClick={() => setSelectedOrderId(payment.order_id)}
                                    className="flex items-center justify-center w-10 h-10 bg-input rounded-full hover:scale-105 transition-colors cursor-pointer"
                                >
                                    <Eye className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <PaymentDetailPopup
                isOpen={!!selectedOrderId}
                onClose={() => setSelectedOrderId(null)}
                orderId={selectedOrderId}
            />
        </div>
    )
}
