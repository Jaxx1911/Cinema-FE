"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Play, X } from "lucide-react"
import MovieCard from "@/components/dashboard/MovieCard"
import { useState } from "react"

export default function Dashboard() {
    const [showTrailer, setShowTrailer] = useState(false)

    const openTrailer = () => {
        setShowTrailer(true)
    }

    const closeTrailer = () => {
        setShowTrailer(false)
    }

    // Sample data
    const nowPlaying = [
        {
            id: "1",
            title: "Avengers: Infinity War",
            image: "/test1.jpg?height=300&width=220",
            genres: ["Action", "Adventure", "Sci-Fi"],
            rating: 4.8,
        },
        {
            id: "2",
            title: "Black Panther",
            image: "/test1.jpg?height=300&width=220",
            genres: ["Action", "Adventure"],
            rating: 4.5,
        },
        {
            id: "3",
            title: "Guardians of The Galaxy",
            image: "/test1.jpg?height=300&width=220",
            genres: ["Action", "Comedy", "Sci-Fi"],
            rating: 4.7,
        },
        {
            id: "4",
            title: "Doctor Strange",
            image: "/test1.jpg?height=300&width=220",
            genres: ["Action", "Fantasy"],
            rating: 4.4,
        },
        {
            id: "5",
            title: "Thor: Ragnarok",
            image: "/test1.jpg?height=300&width=220",
            genres: ["Action", "Comedy", "Fantasy"],
            rating: 4.6,
        },
    ]

    const comingSoon = [
        {
            id: "6",
            title: "Shazam!",
            image: "/test1.jpg?height=300&width=220",
            genres: ["Action", "Comedy", "Fantasy"],
            rating: 4.2,
        },
        {
            id: "7",
            title: "Aquaman",
            image: "/test1.jpg?height=300&width=220",
            genres: ["Action", "Adventure", "Fantasy"],
            rating: 4.3,
        },
        {
            id: "8",
            title: "Captain Marvel",
            image: "/test1.jpg?height=300&width=220",
            genres: ["Action", "Adventure", "Sci-Fi"],
            rating: 4.4,
        },
        {
            id: "9",
            title: "Spider-Man: Far From Home",
            image: "/test1.jpg?height=300&width=220",
            genres: ["Action", "Adventure"],
            rating: 4.5,
        },
        {
            id: "10",
            title: "Joker",
            image: "/test1.jpg?height=300&width=220",
            genres: ["Crime", "Drama", "Thriller"],
            rating: 4.7,
        },
    ]

    const featuredMovie = {
        id: "1",
        title: "Avengers: Infinity War",
        image: "/test1.jpg?height=600&width=1200",
        description:
            "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
        rating: 4.8,
        genres: ["Action", "Adventure", "Sci-Fi"],
        duration: "149 min",
        releaseYear: "2018",
        trailerUrl: "https://www.youtube.com/embed/6ZfuNTqbHE8",
    }

    return (
        <div className="p-8">
            <div className="mb-12">
                <div className="relative rounded-xl overflow-hidden">
                    <Image
                        src={featuredMovie.image || "/test1.jpg"}
                        alt={featuredMovie.title}
                        width={1200}
                        height={600}
                        className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                        <h2 className="text-4xl font-bold text-white mb-2">{featuredMovie.title}</h2>
                        <p className="text-white/80 mb-4 max-w-2xl">{featuredMovie.description}</p>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 bg-black/40 rounded-md px-2 py-1">
                                <span className="text-primary font-medium">{featuredMovie.rating}</span>
                                <span className="text-white/60">/ 5.0</span>
                            </div>
                            <div className="bg-black/40 rounded-md px-2 py-1">{featuredMovie.duration}</div>
                            <div className="bg-black/40 rounded-md px-2 py-1">{featuredMovie.releaseYear}</div>
                        </div>
                        <div className="flex gap-4">
                            <Link
                                href={`/movie/${featuredMovie.id}`}
                                className="flex-1 px-6 py-3 w-16 h-16 bg-amber-400 text-black rounded-full hover:bg-amber-500 flex items-center justify-center"
                            >
                                Book tickets
                            </Link>
                            <button
                                onClick={openTrailer}
                                className="flex-1 px-6 py-3 w-16 h-16 bg-white text-black rounded-full hover:bg-gray-100 flex items-center justify-center gap-2"
                            >
                                <Play className="w-4 h-4" /> Watch Trailer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Now Playing</h2>
                    <Link href="/now-playing" className="text-primary flex items-center gap-1 hover:underline">
                        <span>View all</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {nowPlaying.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            image={movie.image}
                            genres={movie.genres}
                            rating={movie.rating}
                        />
                    ))}
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Coming Soon</h2>
                    <Link href="/coming-soon" className="text-primary flex items-center gap-1 hover:underline">
                        <span>View all</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {comingSoon.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            image={movie.image}
                            genres={movie.genres}
                            rating={movie.rating}
                        />
                    ))}
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
                            src={featuredMovie.trailerUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={`${featuredMovie.title} Trailer`}
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    )
}

