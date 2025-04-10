"use client"

import { useState } from "react"
import Image from "next/image"


// Sample ticket data
const ticketData = {
  upcoming: [
    {
      id: "T12345",
      movieTitle: "Avengers: Infinity War",
      poster: "/test1.jpg?height=450&width=300",
      genres: ["Action", "Adventure", "Sci-Fi"],
      date: "23/04/2023",
      time: "19:30",
      cinema: "Cinema Section A",
      seats: ["D4", "D5"],
      theater: "Vincom Ocean Park CGV",
      status: "Upcoming",
    },
  ],
  completed: [
    {
      id: "T12289",
      movieTitle: "Black Panther",
      poster: "/test1.jpg?height=450&width=300",
      genres: ["Action", "Adventure", "Sci-Fi"],
      date: "15/04/2023",
      time: "20:00",
      cinema: "Cinema Section B",
      seats: ["F7", "F8"],
      theater: "Vincom Ocean Park CGV",
      status: "Completed",
    },
    {
      id: "T11987",
      movieTitle: "Doctor Strange",
      poster: "/test1.jpg?height=450&width=300",
      genres: ["Action", "Adventure", "Fantasy"],
      date: "05/04/2023",
      time: "18:15",
      cinema: "Cinema Section C",
      seats: ["C10", "C11"],
      theater: "Vincom Ocean Park CGV",
      status: "Completed",
    },
  ],
}

export default function TicketsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">My Tickets</h1>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`py-3 px-6 rounded-full text-sm font-medium transition-colors ${
                activeTab === "upcoming" ? "bg-primary text-black" : "bg-card hover:bg-card/80"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`py-3 px-6 rounded-full text-sm font-medium transition-colors ${
                activeTab === "completed" ? "bg-primary text-black" : "bg-card hover:bg-card/80"
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Tickets List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {activeTab === "upcoming" && ticketData.upcoming.length === 0 && (
                <div className="bg-card rounded-xl p-8 text-center">
                  <p className="text-muted-foreground">You don't have any upcoming tickets.</p>
                </div>
              )}

              {activeTab === "completed" && ticketData.completed.length === 0 && (
                <div className="bg-card rounded-xl p-8 text-center">
                  <p className="text-muted-foreground">You don't have any completed tickets.</p>
                </div>
              )}

              {activeTab === "upcoming" &&
                ticketData.upcoming.map((ticket) => (
                  <div key={ticket.id} className="bg-card rounded-xl overflow-hidden border-l-4 border-primary">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 lg:w-1/4 relative" style={{ minHeight: "200px" }}>
                        <Image
                          src={ticket.poster || "/test1.svg"}
                          alt={ticket.movieTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h2 className="text-xl font-bold">{ticket.movieTitle}</h2>
                            <p className="text-sm text-muted-foreground">{ticket.genres.join(", ")}</p>
                          </div>
                          <span className="bg-primary/20 text-primary text-xs px-3 py-1 rounded-full font-medium">
                            {ticket.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Cinema</p>
                            <p className="text-sm">{ticket.cinema}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Date</p>
                            <p className="text-sm">{ticket.date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Time</p>
                            <p className="text-sm">{ticket.time}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Seats</p>
                            <p className="text-sm">{ticket.seats.join(", ")}</p>
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          
                          <button className="bg-card border border-border py-2 px-4 rounded-md font-medium text-sm flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === "completed" &&
                ticketData.completed.map((ticket) => (
                  <div key={ticket.id} className="bg-card rounded-xl overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 lg:w-1/4 relative" style={{ minHeight: "200px" }}>
                        <Image
                          src={ticket.poster || "/test1.svg"}
                          alt={ticket.movieTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h2 className="text-xl font-bold">{ticket.movieTitle}</h2>
                            <p className="text-sm text-muted-foreground">{ticket.genres.join(", ")}</p>
                          </div>
                          <span className="bg-green-500/20 text-green-500 text-xs px-3 py-1 rounded-full font-medium">
                            {ticket.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Cinema</p>
                            <p className="text-sm">{ticket.cinema}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Date</p>
                            <p className="text-sm">{ticket.date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Time</p>
                            <p className="text-sm">{ticket.time}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Seats</p>
                            <p className="text-sm">{ticket.seats.join(", ")}</p>
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <button className="bg-card border border-border py-2 px-4 rounded-md font-medium text-sm flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Ticket History Table */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Ticket History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 text-sm font-medium">Movie</th>
                        <th className="text-left py-3 px-2 text-sm font-medium">Date</th>
                        <th className="text-left py-3 px-2 text-sm font-medium">Time</th>
                        <th className="text-left py-3 px-2 text-sm font-medium">Seats</th>
                        <th className="text-left py-3 px-2 text-sm font-medium">Theater</th>
                        <th className="text-left py-3 px-2 text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...ticketData.upcoming, ...ticketData.completed].map((ticket) => (
                        <tr key={ticket.id} className="border-b border-border">
                          <td className="py-3 px-2 text-sm">{ticket.movieTitle}</td>
                          <td className="py-3 px-2 text-sm">{ticket.date}</td>
                          <td className="py-3 px-2 text-sm">{ticket.time}</td>
                          <td className="py-3 px-2 text-sm">{ticket.seats.join(", ")}</td>
                          <td className="py-3 px-2 text-sm">{ticket.theater}</td>
                          <td className="py-3 px-2 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                ticket.status === "Upcoming"
                                  ? "bg-primary/20 text-primary"
                                  : "bg-green-500/20 text-green-500"
                              }`}
                            >
                              {ticket.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

