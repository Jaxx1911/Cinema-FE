"use client"

import { useState } from "react"
import { ArrowLeft, Clock, Play, Star, X, MapPin, Calendar, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function MovieDetailPage() {
  const router = useRouter()
  const [showTrailer, setShowTrailer] = useState(false)
  const [movie] = useState({
    id: 5,
    title: "Avengers: Infinity War",
    rating: 4.8,
    duration: 149,
    year: 2018,
    genres: ["Action", "Adventure", "Sci-Fi"],
    storyline:
      "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality.",
    posterUrl: "/test1.jpg?height=200&width=400",
    bannerUrl: "/test1.jpg?height=100&width=1000",
    trailerUrl: "https://www.youtube.com/embed/6ZfuNTqbHE8",
    directors: [
      { name: "Anthony Russo", image: "/test1.jpg?height=60&width=60" },
      { name: "Joe Russo", image: "/test1.jpg?height=60&width=60" },
    ],
    cast: [
      { name: "Robert Downey Jr.", character: "Tony Stark / Iron Man", image: "/test1.jpg?height=60&width=60" },
      { name: "Chris Hemsworth", character: "Thor", image: "/test1.jpg?height=60&width=60" },
      { name: "Mark Ruffalo", character: "Bruce Banner / Hulk", image: "/test1.jpg?height=60&width=60" },
      { name: "Chris Evans", character: "Steve Rogers / Captain America", image: "/test1.jpg?height=60&width=60" },
      { name: "Scarlett Johansson", character: "Natasha Romanoff / Black Widow", image: "/test1.jpg?height=60&width=60" },
      { name: "Benedict Cumberbatch", character: "Doctor Strange", image: "/test1.jpg?height=60&width=60" },
    ],
    showtimes: [
      { time: "10:30 AM", theater: "Cinema 1", available: true },
      { time: "1:15 PM", theater: "Cinema 1", available: true },
      { time: "4:00 PM", theater: "Cinema 2", available: true },
      { time: "7:30 PM", theater: "Cinema 3", available: true },
      { time: "10:15 PM", theater: "Cinema 2", available: false },
    ],
  })

  const goBack = () => {
    router.back()
  }

  const openTrailer = () => {
    setShowTrailer(true)
  }

  const closeTrailer = () => {
    setShowTrailer(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-0">
          <Image src={movie.bannerUrl || "/test1.jpg"} alt={movie.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

          {/* Play Trailer Button */}
          <button
            onClick={openTrailer}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 md:w-20 md:h-20 transition-all hover:scale-110"
            aria-label="Play trailer"
          >
            <Play size={32} fill="white" className="ml-1" />
          </button>
        </div>

        <button
          onClick={goBack}
          className="absolute top-4 left-4 z-10 flex items-center gap-1 text-white/90 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      {/* Movie Info Section */}
      <div className="relative px-4 md:px-8 pb-12 -mt-20">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Poster */}
          <div className="flex-shrink-0">
            <Image
              src={movie.posterUrl || "/test1.jpg"}
              alt={movie.title}
              width={240}
              height={360}
              className="rounded-md shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">{movie.rating}</span>
                <span className="text-gray-400 ml-1">/ 5.0</span>
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="ml-1">{movie.duration} min</span>
              </div>

              <div className="px-3 py-1 rounded-full bg-gray-800 text-sm">{movie.year}</div>

              {movie.genres.map((genre) => (
                <div key={genre} className="px-3 py-1 rounded-full bg-gray-800 text-sm">
                  {genre}
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Storyline</h2>
              <p className="text-gray-300 leading-relaxed">{movie.storyline}</p>
            </div>

            {/* Directors */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Directors</h2>
              <div className="flex gap-6">
                {movie.directors.map((director, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Image
                      src={director.image || "/test1.jpg"}
                      alt={director.name}
                      width={60}
                      height={60}
                      className="w-[50px] h-[50px] object-cover rounded-full"
                    />
                    <div>
                      <p className="font-medium">{director.name}</p>
                      <p className="text-sm text-gray-400">Director</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cast */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Cast</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movie.cast.map((actor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Image
                      src={actor.image || "/test1.jpg"}
                      alt={actor.name}
                      width={60}
                      height={60}
                      className="w-[50px] h-[50px] object-cover rounded-full"
                    />
                    <div>
                      <p className="font-medium">{actor.name}</p>
                      <p className="text-sm text-gray-400">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Showtimes */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Showtimes</h2>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Vincom Ocean Park CGV</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {movie.showtimes.map((showtime, index) => (
                  <button
                    key={index}
                    disabled={!showtime.available}
                    className={`p-4 rounded-lg text-center ${
                      showtime.available
                        ? "bg-gray-800 hover:bg-gray-700 transition-colors"
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <p className="font-medium">{showtime.time}</p>
                    <p className="text-sm text-gray-400">{showtime.theater}</p>
                  </button>
                ))}
              </div>
              <Link href={`/select-seat/${movie.id}`} className="primary-button max-w-md mx-auto block text-center">
                Book tickets
              </Link>
            </div>
          </div>
        </div>
      </div>

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
              src={movie.trailerUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${movie.title} Trailer`}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}
