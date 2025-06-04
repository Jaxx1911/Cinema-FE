"use client"

import MovieCard from "@/components/dashboard/MovieCard"
import { useState } from "react"
import { useNowPlaying, useComingSoon } from "@/hooks/useMovie"
import { useSearchParams } from "next/navigation"

export default function Movies() {
    const { data: nowPlayingData, isLoading: isLoadingNowPlaying } = useNowPlaying()
    const { data: comingSoonData } = useComingSoon()
    const searchParams = useSearchParams()
    const defaultTab = searchParams.get("tab") || "nowPlaying"
    const [activeTab, setActiveTab] = useState(defaultTab)

    if (isLoadingNowPlaying) {
        return <div>Loading...</div>
    }

    const movies = nowPlayingData?.body || []
    const comingSoon = comingSoonData?.body || []

    return (
        <div className="p-8 ">
            <div className="flex space-x-4 mb-8">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setActiveTab('nowPlaying')}
                        className={`px-4 py-2 rounded-lg cursor-pointer ${
                            activeTab === 'nowPlaying'
                                ? 'bg-primary text-black'
                                : 'bg-secondary text-white border border-gray-900'
                        }`}
                    >
                        Now Playing
                    </button>
                    <button
                        onClick={() => setActiveTab('comingSoon')}
                        className={`px-4 py-2 rounded-lg cursor-pointer ${
                            activeTab === 'comingSoon'
                                ? 'bg-primary text-black'
                                : 'bg-secondary text-white border border-gray-900'
                        }`}
                    >
                        Coming Soon
                    </button>
                </div>
            </div>

            {activeTab === 'nowPlaying' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.map((movie) => (
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
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {comingSoon.map((movie) => (
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
            )}
        </div>
    )
}
