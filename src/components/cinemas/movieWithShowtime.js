import { format } from "date-fns"
import Link from "next/link"
import { ChevronRight, Clock } from "lucide-react"
import Image from "next/image"
import { useGetShowtimeByUserFilter } from "@/hooks/useShowtime"
import { useEffect, useState } from "react"

export default function MovieWithShowtime({ cinema, movie, selectedDate }) {

  const [showtimes, setShowtimes] = useState([])        
  const { data: showtimesData, refetch: refetchShowtimes } = useGetShowtimeByUserFilter(cinema?.id, movie?.id, selectedDate.date)

  useEffect(() => {
    if (cinema?.id && movie?.id && selectedDate.date) {
        refetchShowtimes()
    }
  }, [cinema?.id, movie?.id, selectedDate.date])

  useEffect(() => {
    setShowtimes(showtimesData?.body)
  }, [showtimesData])

  return (
    <div key={movie?.id} className="bg-card rounded-xl overflow-hidden mb-8">
      <div className="p-6">
        <div className="flex gap-6">
            <Image
              src={movie?.poster_url}
              alt={movie?.title}
              width={100}
              height={150}
              className="rounded-lg"
            />

            <div>
              <h3 className="text-xl font-bold mb-2">{movie?.title}</h3>
              <p className="text-muted-foreground mb-2">{movie?.genres?.join(", ")}</p>

              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{movie?.duration + " min"}</span>
                </div>
              </div>
            </div>
        </div>

        <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Showtimes for {selectedDate.date.split("-").join("/")}</h4>
              <Link
                href={`/movies/${movie?.id}`}
                className="text-primary flex items-center gap-1 text-sm hover:underline"
              >
                <span>Movie details</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {showtimes?.length > 0 ? (
                showtimes?.map((showtime, index) => (
                  <Link
                    key={index}
                    href={`/select-seat?s=${showtime.id}&m=${movie.id}`}
                    className="block p-4 bg-card rounded-lg hover:bg-gray-700 transition-colors text-center border border-gray-700 showtime-card"
                  >
                    <p className="font-medium mb-1">{format(new Date(showtime.start_time), 'HH:mm')}</p>
                    <p className="text-xs text-muted-foreground mb-1">{showtime.room.name}</p>
                    <span className="inline-block px-2 py-1 bg-black/20 rounded-md text-xs">{showtime.room.type}</span>
                  </Link>
              ))) : (
                <p className="text-muted-foreground">No showtimes found</p>
              )}
            </div>
        </div>
      </div>
    </div>
  )
}