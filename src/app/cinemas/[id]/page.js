"use client"

import Link from "next/link"
import Image from "next/image"
import { useParams, useSearchParams } from "next/navigation"
import { MapPin, Star, Clock, Phone, ChevronRight } from "lucide-react"
import { cinemaImages, moviePosters, cinemaLogos } from "@/utils/imageMockUrls"
import { format, addDays } from "date-fns"
import { useState } from "react"
import { useGetCinemaById } from "@/hooks/useCinema"
import { useMovieInRangeDate } from "@/hooks/useMovie"
import { useGetShowtimeByUserFilter } from "@/hooks/useShowtime"
import MovieWithShowtime from "@/components/cinemas/movieWithShowtime"

export default function CinemaDetail() {
  const params = useParams()
  const searchParams = useSearchParams()

  const dates = [
    { id: 1, date: format(new Date(), 'dd-MM-yyyy'), day: format(new Date(), 'EEEE')},
    { id: 2, date: format(addDays(new Date(), 1), 'dd-MM-yyyy'), day: format(addDays(new Date(), 1), 'EEEE')},
    { id: 3, date: format(addDays(new Date(), 2), 'dd-MM-yyyy'), day: format(addDays(new Date(), 2), 'EEEE')},
    { id: 4, date: format(addDays(new Date(), 3), 'dd-MM-yyyy'), day: format(addDays(new Date(), 3), 'EEEE')},
    { id: 5, date: format(addDays(new Date(), 4), 'dd-MM-yyyy'), day: format(addDays(new Date(), 4), 'EEEE')},
  ]

  const [selectedDate, setSelectedDate] = useState(dates[0])

  const index = parseInt(searchParams.get("index")) || 0
  const { data: cinemaData, isLoading: isCinemaLoading } = useGetCinemaById(params.id)
  const { data: movieListData, isLoading: isMovieListLoading } = useMovieInRangeDate()
  const cinema = cinemaData?.body
  const movies = movieListData?.body


  return (
    <div>
      {/* Cinema header */}
      <div className="relative">
        <div className="h-64 relative">
          <Image src={"/cinema/"+ (index + 1) + ".jpg"} alt={cinema?.name || "placeholder"} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-8 -mt-24 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 pt-24">
              <h1 className="text-3xl font-bold mb-2">{cinema?.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <p className="text-muted-foreground">{cinema?.address}</p>
              </div>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span>{cinema?.opening_hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span>{cinema?.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {[...new Set(cinema?.rooms?.map(room => room.type))].map((facility, index) => (
                  <span key={index} className="px-2 py-1 bg-input rounded-md text-xs border border-gray-900">
                    {facility}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes section */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Showtimes</h2>

          <div className="max-w-8xl mx-auto flex gap-4 mt-8 relative z-10">
            {dates.map((date) => (
              <button
                key={date.date}
                className={`flex flex-col items-center justify-center min-w-[110px] p-4 rounded-lg cursor-pointer ${
                  date.id === selectedDate.id ? "bg-primary text-black" : "bg-card hover:bg-card/80"
                }`}
                onClick={() => {
                  setSelectedDate(date)
                }}
              >
                <span className="text-sm">{date.day}</span>
                <span className="text-xl font-bold">{date.date.split("-")[0]}</span>
              </button>
            ))}
          </div> 
        </div>

        <div className="space-y-8">
          {movies?.map((movie) => (
            <MovieWithShowtime key={movie.id} cinema={cinema} movie={movie} selectedDate={selectedDate} />
          ))}
        </div>
      </div>
    </div>
  )
}
