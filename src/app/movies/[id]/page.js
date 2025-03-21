"use client"

import { useState } from "react"
import { Clock, Play, Star, X, MapPin, ChevronLeft } from "lucide-react"
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
    posterUrl: "/poster.jpg?height=200&width=400",
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
    <div>
      {/* Hero Banner */}
      <div className="relative">
          <Image
            src={movie.bannerUrl || "/placeholder.svg"}
            alt={movie.title}
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
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:scale-110 z-15"
            aria-label="Play trailer"
          >
            <Play size={32} fill="white" className="w-8 h-8 text-black fill-black ml-1" />
          </button>
      </div>

      {/* Movie Info Section */}
      <div className="max-w-7xl mx-auto px-8 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="lg:w-1/4">
            <Image
              src={movie.posterUrl || "/poster.jpg"}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-xl shadow-lg"
            />
            <Link href={`/select-seat/${movie.id}`} className="primary-button max-w-md mx-auto block text-center">
                Book tickets
              </Link>
          </div>

          {/* Details */}
          <div className="lg:w-3/4">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-6">

              <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{movie.duration} min</span>
              </div>
              {movie.genres.map((genre) => (
                <div key={genre} className="bg-card rounded-full px-4 py-2">
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
                  <div key={index} className="flex items-center gap-3 name-card hover:underline transition-all duration-300">
                    <p>{director.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cast */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Caster</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movie.cast.map((actor, index) => (
                  <div key={index} className="flex items-center gap-3 name-card hover:underline transition-all duration-300">  
                    <p>{actor.name}</p>
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