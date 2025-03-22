"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Play, X } from "lucide-react"
import MovieCard from "@/components/dashboard/MovieCard"
import { useState } from "react"
import { useNowPlaying, useComingSoon } from "@/hooks/useMovie"

export default function Movies() {
    const { data: nowPlayingData, isLoading: isLoadingNowPlaying } = useNowPlaying()
    const { data: comingSoonData } = useComingSoon()
    const [showTrailer, setShowTrailer] = useState(false)

    if (isLoadingNowPlaying) {
        return <div>Loading...</div>
    }

    const movies = nowPlayingData?.body || []

    const comingSoon = comingSoonData?.body || []

    const openTrailer = () => {
        setShowTrailer(true)
    }

    const closeTrailer = () => {
        setShowTrailer(false)
    }

    const featuredMovie = movies[0]

    return (
        <div className="p-8">
            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Now Playing</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            image={movie.poster_url}
                            genres={movie.genres}
                            duration={movie.duration}
                        />
                    ))}
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Coming Soon</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {comingSoon.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            image={movie.poster_url}
                            genres={movie.genres}
                            duration={movie.duration}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
