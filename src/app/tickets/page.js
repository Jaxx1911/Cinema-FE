"use client"

import Link from "next/link"
import { Calendar, Search } from "lucide-react"
import { useGetUserOrders } from "@/hooks/useUser"
import OrderCard from "@/components/ticket/OrderCard"
import SelectStatus from "@/components/ticket/SelectStatusCard"
import { useState, useCallback } from "react"

export default function TicketsPage() {
  const { data: orders, isLoading, error } = useGetUserOrders()
  const [selectedStatus, setSelectedStatus] = useState({ id: 1, name: "Upcoming", value: "upcoming" })
  const [visibleTickets, setVisibleTickets] = useState(0)

  const handleVisibilityChange = useCallback((id, isVisible) => {
    setVisibleTickets(prev => isVisible ? prev + 1 : prev)
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">My Tickets</h1>
        <div className="flex items-center gap-4">
          <SelectStatus selected={selectedStatus} setSelected={setSelectedStatus} style={{right: 0}}/>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders?.body?.map((order) => (
          <OrderCard 
            key={order.id} 
            id={order.id} 
            selectedStatus={selectedStatus} 
            onVisibilityChange={handleVisibilityChange}
          />
        ))}
      </div>

      {visibleTickets === 0 && (
        <div className="text-center py-16 bg-card rounded-xl mt-2 mb-2 pt-4 py-2">
          <h2 className="text-xl font-bold mb-2">No tickets found</h2>
          <p className="text-muted-foreground mb-6">You don't have any tickets for this status</p>
        </div>
      )}
    </div>
  )
}
