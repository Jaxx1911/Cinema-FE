"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Play, X } from "lucide-react"
import MovieCard from "@/components/dashboard/MovieCard"
import { useState } from "react"
import { useNowPlaying, useComingSoon } from "@/hooks/useMovie"
import LoadingSpinner from "@/components/LoadingSpinner"
export default function Dashboard() {
    const { data: nowPlayingData, isLoading: isLoadingNowPlaying } = useNowPlaying()
    const { data: comingSoonData } = useComingSoon()
    const [showTrailer, setShowTrailer] = useState(false)

    if (isLoadingNowPlaying) {
        return (
            <div className="h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        )
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
                <div className="relative rounded-xl overflow-hidden">
                    <Image
                        src={featuredMovie.large_poster_url || "/test1.jpg"}
                        alt={featuredMovie.title}
                        width={1200}
                        height={600}
                        className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-8 z-10">
                        <div className="flex items-center gap-2">
                            <h2 className="text-4xl font-bold mb-2">{featuredMovie.title}</h2>
                            <Tag movieTag={featuredMovie.tag} />
                        </div>
                        <p className="text-white/80 mb-4 max-w-2xl">{featuredMovie.description}</p>
                        <div className="flex items-center gap-4 mb-6">
                            {featuredMovie.genres.map(genre => (
                                <div key={genre} className="bg-black/40 rounded-md px-2 py-1">{genre}</div>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <Link
                                href={`/movies/${featuredMovie.id}`}
                                className="primary-button w-auto inline-block px-6"
                            >
                                Book tickets
                            </Link>
                            <button
                                onClick={openTrailer}
                                className="secondary-button w-auto justify-center inline-flex items-center gap-2 px-6"
                            >
                                <Play className="w-4 h-4" /> Watch Trailer
                            </button>
                        </div>
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
                                        src={featuredMovie.trailer_url}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={`${featuredMovie.title} Trailer`}
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Now Playing</h2>
                    <Link href="/movies" className="text-primary flex items-center gap-1 hover:underline">
                        <span>View all</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.slice(0, 5).map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            image={movie.poster_url}
                            genres={movie.genres}
                            duration={movie.duration}
                            movieTag={movie.tag}
                        />
                    ))}
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Coming Soon</h2>
                    <Link href="/movies" className="text-primary flex items-center gap-1 hover:underline">
                        <span>View all</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {comingSoon.slice(0, 5).map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            image={movie.poster_url}
                            genres={movie.genres}
                            duration={movie.duration}
                            movieTag={movie.tag}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export function Tag({movieTag}) {
    if (movieTag === "P") {
        return <div className="bg-tag-p rounded px-4 py-2 bg-tag-p">P</div>
    } else if (movieTag === "K") {
        return <div className="bg-tag-k rounded px-4 py-2 bg-tag-k">K</div>
    } else if (movieTag === "C13") {
        return <div className="bg-tag-c13 rounded px-4 py-2 bg-tag-c13">C13</div>
    } else if (movieTag === "C16") {
        return <div className="bg-tag-c16 rounded px-4 py-2 bg-tag-c16">C16</div>
    } else if (movieTag === "C18") {
        return <div className="bg-tag-c18 rounded px-4 py-2 bg-tag-c18">C18</div>
    } else {
        return <></>
    }
}
