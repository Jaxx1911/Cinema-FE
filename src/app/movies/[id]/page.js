"use client"

import { useState, useEffect } from "react"
import { Clock, Play, X, ChevronLeft} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMovieDetails } from "@/hooks/useMovie"
import { useParams } from "next/navigation"
import { useGetShowtimeByUserFilter } from "@/hooks/useShowtime"
import { useGetCinemas } from "@/hooks/useCinema"
import { format, parseISO, addDays, getISOWeek } from 'date-fns'
import SelectCinema from "@/components/movie/detail/selectCinema"
import SelectRoomType from "@/components/movie/detail/selectRoomType"
import SelectCity from "@/components/movie/detail/selectCity"

export default function MovieDetailPage() {
  const params = useParams()
  const [showTrailer, setShowTrailer] = useState(false)

  const dates = [
    { id: 1, date: format(new Date(), 'dd-MM-yyyy'), day: format(new Date(), 'EEEE')},
    { id: 2, date: format(addDays(new Date(), 1), 'dd-MM-yyyy'), day: format(addDays(new Date(), 1), 'EEEE')},
    { id: 3, date: format(addDays(new Date(), 2), 'dd-MM-yyyy'), day: format(addDays(new Date(), 2), 'EEEE')},
    { id: 4, date: format(addDays(new Date(), 3), 'dd-MM-yyyy'), day: format(addDays(new Date(), 3), 'EEEE')},
    { id: 5, date: format(addDays(new Date(), 4), 'dd-MM-yyyy'), day: format(addDays(new Date(), 4), 'EEEE')},
  ]

  const { data: movieDetails, isLoading } = useMovieDetails(params.id)

  const [selectedCity, setSelectedCity] = useState({ id: 1, name: "Hà Nội", value: "hanoi" })
  const { data: cinemas, isLoading: isCinemasLoading, refetch: refetchCinemas } = useGetCinemas(selectedCity?.value)

  const [selectedCinema, setSelectedCinema] = useState()
  
  
  const [roomType, setRoomType] = useState({ id: 1, name: "2D" })

  const [selectedDate, setSelectedDate] = useState(dates[0])

  const { data: showtimes, isLoading: isShowtimesLoading, refetch: refetchShowtimes } = useGetShowtimeByUserFilter(selectedCinema?.id, params.id, selectedDate.date)

  useEffect(() => {
    if (selectedCity?.value) {
      refetchCinemas()
    }
  }, [selectedCity])

  useEffect(() => {
    if (cinemas?.body?.length > 0) {
      setSelectedCinema(cinemas.body?.[0])
    } else {
      setSelectedCinema(null)
    }
  }, [cinemas])

  useEffect(() => {
    if(!!selectedCinema?.id && !!params.id && !!selectedDate.date) {
      refetchShowtimes()
    }
  }, [selectedCinema, selectedDate])

  const movies = movieDetails?.body || {}

  const openTrailer = () => {
    setShowTrailer(true)
  }

  const closeTrailer = () => {
    setShowTrailer(false)
  }

  return (
    <div>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Hero Banner */}
          <div className="relative">
            <Image
              src={movies.large_poster_url || "https://placehold.co/1200x600/jpg"}
              alt={movies.title || "placeholder"}
              width={1200}
              height={600}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-black/80 to-transparent z-10" />          
          
            <Link
              href="/dashboard"
              className="absolute top-8 left-8 flex items-center gap-2 bg-black/40 rounded-full px-4 py-2 hover:bg-black/60 transition-colors z-15"
            >
              <ChevronLeft className="w-5 h-5"/>
              <span>Back</span>
            </Link>
            <button
              onClick={openTrailer}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/50 rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:scale-110 z-15"
              aria-label="Play trailer"
            >
              <Play size={32} fill="white" className="w-8 h-8 text-black fill-black ml-1" />
            </button>
          </div>

          {/* Movie Info Section */}
          <div className="max-w-8xl mx-auto px-8 -mt-32 relative z-10">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Poster */}
              <div className="lg:w-1/4 items-center justify-center flex flex-col gap-2">
                <Image
                  src={movies.poster_url || "https://placehold.co/300x450/jpg"}
                  alt={movies.title || "placeholder"}
                  width={300}
                  height={450}
                  className="rounded-xl shadow-lg"
                />
                <Link href={`/select-seat/${movies.id}`} className="primary-button max-w-md mx-auto block text-center">
                    Book tickets
                </Link>
              </div>

              {/* Details */}
              <div className="lg:w-3/4">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{movies.title}</h1>
                </div>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Tag movieTag={movies.tag} />
                  <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{movies.duration} min</span>
                  </div>
                  {movies?.genres?.map((genre) => (
                    <div key={genre} className="bg-card rounded-full px-4 py-2">
                      {genre}
                    </div>
                  ))}
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Storyline</h2>
                  <p className="text-gray-300 leading-relaxed">{movies.description}</p>
                </div>

                {/* Directors */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Directors</h2>
                      <div className="flex gap-6">
                      {movies?.director?.split(',').map((name, index) => (
                        <div key={index} className="flex items-center gap-3 name-card hover:underline transition-all duration-300 text-gray-300">
                          <p>{name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Release Date</h2>
                    <div className="flex items-center gap-3 name-card hover:underline transition-all duration-300 text-gray-300">
                      <p>{movies.release_date}</p>
                    </div>
                  </div>
                </div>

                {/* Cast */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-2">Caster</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {movies?.caster?.split(',').map((name, index) => (
                      <div key={index} className="flex items-center gap-3 name-card hover:underline transition-all duration-300 text-gray-300">  
                        <p>{name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-8xl mx-auto flex gap-4 mt-8 relative z-10 px-8">
            {dates.map((date) => (
              <button
                key={date.date}
                className={`flex flex-col items-center justify-center min-w-[110px] p-4 rounded-lg cursor-pointer ${
                  date.id === selectedDate.id ? "bg-primary text-black" : "bg-card"
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
          
          {/* Showtimes */}
          <div className="max-w-8xl mx-auto px-8 mt-8 relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Showtimes</h2>
              <div className="flex items-center gap-2">
                  <SelectRoomType selected={roomType} setSelected={setRoomType} />
                  <SelectCinema selected={selectedCinema} setSelected={setSelectedCinema} cinemas={cinemas} />
                  <SelectCity selected={selectedCity} setSelected={setSelectedCity}/>
              </div>
            </div>      

            <div className="grid grid-cols-6 md:grid-cols-6 lg:grid-cols-7 gap-4 mb-8">
              {showtimes?.body?.filter((showtime) => showtime.room.type === roomType.name).length > 0 ? (
                showtimes?.body?.filter((showtime) => showtime.room.type === roomType.name).map((showtime) => (
                  <Link
                    key={showtime.id}
                    href={`/select-seat?s=${showtime.id}&m=${params.id}`}
                    className={`p-4 rounded-lg text-center bg-card transition-colors cursor-pointer showtime-card`}
                  >
                    <p className="font-medium">{format(parseISO(showtime.start_time), 'HH:mm')}</p>
                    <p className="text-sm text-gray-400">{showtime.room.name}</p>
                  </Link>
                ))) : (
                  <p className="text-gray-400">No showtimes available</p>
                )}
              </div>
          </div>
          <div className="flex justify-between items-center mb-4" style={{height: 200}}></div>

          {/* Trailer Modal */}
          {showTrailer && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="relative w-full max-w-4xl aspect-video bg-black">
                <button
                  onClick={closeTrailer}
                  className="absolute -top-10 right-0 text-white hover:text-gray-300"
                  aria-label="Close trailer"
                >
                  <X size={24} />
                </button>
                <iframe
                  src={movies.trailer_url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${movies.title} Trailer`}
                ></iframe>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export function Tag({movieTag}) {
  if (movieTag === "P") {
    return <div className="bg-tag-p rounded-full px-4 py-2 bg-tag-p">P</div>
  } else if (movieTag === "K") {
    return <div className="bg-tag-k rounded-full px-4 py-2 bg-tag-k">K</div>
  } else if (movieTag === "C13") {
    return <div className="bg-tag-c13 rounded-full px-4 py-2 bg-tag-c13">C13</div>
  } else if (movieTag === "C16") {
    return <div className="bg-tag-c16 rounded-full px-4 py-2 bg-tag-c16">C16</div>
  } else if (movieTag === "C18") {
    return <div className="bg-tag-c18 rounded-full px-4 py-2 bg-tag-c18">C18</div>
  } else {
    return <></>
  }
}