import Image from "next/image"
import { Calendar, Clock, MapPin, Download, QrCode } from "lucide-react"

export default function TicketsPage() {
  // Sample tickets data
  const tickets = [
    {
      id: "1",
      movie: {
        title: "Avengers: Infinity War",
        poster: "/poster.jpg?height=150&width=100",
        genres: ["Action", "Adventure", "Sci-Fi"],
      },
      date: "23/04/2023",
      time: "19:30",
      seats: ["D4", "D5"],
      theater: "Vincom Ocean Park CGV",
      section: "Section A",
      status: "upcoming",
    },
    {
      id: "2",
      movie: {
        title: "Black Panther",
        poster: "/poster.jpg?height=150&width=100",
        genres: ["Action", "Adventure"],
      },
      date: "15/04/2023",
      time: "20:00",
      seats: ["F7", "F8"],
      theater: "Vincom Ocean Park CGV",
      section: "Section B",
      status: "completed",
    },
    {
      id: "3",
      movie: {
        title: "Doctor Strange",
        poster: "/poster.jpg?height=150&width=100",
        genres: ["Action", "Fantasy"],
      },
      date: "05/04/2023",
      time: "18:15",
      seats: ["C10", "C11"],
      theater: "Vincom Ocean Park CGV",
      section: "Section A",
      status: "completed",
    },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Tickets</h1>

      

      <div className="flex lg:flex-row gap-8">
        <div className="space-y-6 lg:w-[40%]">
        <div className="flex gap-4 mb-8">
          <button className="px-6 py-2 bg-primary text-black rounded-full">Upcoming</button>
          <button className="px-6 py-2 bg-card hover:bg-card/80 rounded-full">Completed</button>
        </div>
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`bg-card rounded-xl overflow-hidden ${
                ticket.status === "upcoming" ? "border-l-4 border-primary" : ""
              }`}
            >
              <div className="p-6 flex flex-col md:flex-row gap-6">
                <div className="flex gap-6">
                  <Image
                    src={ticket.movie.poster || "/poster.jpg"}
                    alt={ticket.movie.title}
                    width={100}
                    height={150}
                    className="rounded-lg h-[150px] w-auto"
                  />
                  <div>
                    <h2 className="text-xl font-bold mb-2">{ticket.movie.title}</h2>
                    <p className="text-muted-foreground mb-4">{ticket.movie.genres.join(", ")}</p>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Cinema</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <p>{ticket.section}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Date</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <p>{ticket.date}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Time</p>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <p>{ticket.time}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Seats</p>
                        <p>{ticket.seats.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:ml-auto flex flex-col justify-between">
                  <div className="flex flex-col items-end">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        ticket.status === "upcoming"
                          ? "bg-primary/20 text-primary"
                          : ticket.status === "completed"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex gap-4 mt-4 md:mt-0">
                    <button className="flex items-center gap-2 px-4 py-2 bg-input rounded-lg text-sm">
                      <QrCode className="w-4 h-4" />
                      <span>View QR</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-input rounded-lg text-sm">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-[60%] bg-card rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Ticket History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border">
                  <th className="text-left py-3 px-4">Movie</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Time</th>
                  <th className="text-left py-3 px-4">Seats</th>
                  <th className="text-left py-3 px-4">Theater</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border">
                    <td className="py-3 px-4">{ticket.movie.title}</td>
                    <td className="py-3 px-4">{ticket.date}</td>
                    <td className="py-3 px-4">{ticket.time}</td>
                    <td className="py-3 px-4">{ticket.seats.join(", ")}</td>
                    <td className="py-3 px-4">{ticket.theater}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          ticket.status === "upcoming"
                            ? "bg-primary/20 text-primary"
                            : ticket.status === "completed"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-red-500/20 text-red-500"
                        }`}
                      >
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
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
  )
}

