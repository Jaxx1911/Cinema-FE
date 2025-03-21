import Link from "next/link"
import Image from "next/image"
import { Star, Clock, Calendar } from "lucide-react"

// Sample data for now playing movies
const nowPlayingMovies = [
  {
    id: 1,
    title: "Avengers: Infinity War",
    poster: "/test1.jpg?height=450&width=300",
    rating: 4.8,
    duration: "149 min",
    year: 2018,
    genres: ["Action", "Adventure", "Sci-Fi"],
  },
  {
    id: 2,
    title: "Dune: Part Two",
    poster: "/test1.jpg?height=450&width=300",
    rating: 4.7,
    duration: "166 min",
    year: 2024,
    genres: ["Sci-Fi", "Adventure"],
  },
  {
    id: 3,
    title: "Kung Fu Panda 4",
    poster: "/test1.jpg?height=450&width=300",
    rating: 4.2,
    duration: "94 min",
    year: 2024,
    genres: ["Animation", "Comedy"],
  },
  {
    id: 4,
    title: "Godzilla x Kong",
    poster: "/test1.jpg?height=450&width=300",
    rating: 4.5,
    duration: "115 min",
    year: 2024,
    genres: ["Action", "Sci-Fi"],
  },
  {
    id: 5,
    title: "Ghostbusters: Frozen Empire",
    poster: "/test1.jpg?height=450&width=300",
    rating: 4.0,
    duration: "115 min",
    year: 2024,
    genres: ["Comedy", "Fantasy"],
  },
  {
    id: 6,
    title: "The Fall Guy",
    poster: "/test1.jpg?height=450&width=300",
    rating: 4.3,
    duration: "126 min",
    year: 2024,
    genres: ["Action", "Comedy"],
  },
]

// Sample data for upcoming movies
const upcomingMovies = [
  {
    id: 101,
    title: "Deadpool & Wolverine",
    poster: "/test1.jpg?height=450&width=300",
    releaseDate: "July 26, 2024",
    genres: ["Action", "Comedy", "Superhero"],
  },
  {
    id: 102,
    title: "Alien: Romulus",
    poster: "/test1.jpg?height=450&width=300",
    releaseDate: "August 16, 2024",
    genres: ["Horror", "Sci-Fi"],
  },
  {
    id: 103,
    title: "Kraven the Hunter",
    poster: "/test1.jpg?height=450&width=300",
    releaseDate: "August 30, 2024",
    genres: ["Action", "Adventure", "Superhero"],
  },
  {
    id: 104,
    title: "Beetlejuice Beetlejuice",
    poster: "/test1.jpg?height=450&width=300",
    releaseDate: "September 6, 2024",
    genres: ["Comedy", "Fantasy", "Horror"],
  },
  {
    id: 105,
    title: "Joker: Folie à Deux",
    poster: "/test1.jpg?height=450&width=300",
    releaseDate: "October 4, 2024",
    genres: ["Crime", "Drama", "Thriller"],
  },
  {
    id: 106,
    title: "Venom: The Last Dance",
    poster: "/test1.jpg?height=450&width=300",
    releaseDate: "October 25, 2024",
    genres: ["Action", "Sci-Fi", "Superhero"],
  },
]

export default function MoviesPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>

      {/* Now Playing Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Now Playing</h2>
          <Link href="/now-playing" className="text-amber-500 hover:text-amber-400 flex items-center gap-1">
            View all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {nowPlayingMovies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="group">
              <div className="space-y-3">
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                  <Image
                    src={movie.poster || "/test1.jpg"}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span className="text-sm">{movie.rating}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{movie.duration}</span>
                    </div>
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {movie.genres.slice(0, 2).map((genre, index) => (
                      <span key={index} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                        {genre}
                      </span>
                    ))}
                    {movie.genres.length > 2 && (
                      <span className="text-xs text-zinc-400">+{movie.genres.length - 2}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Coming Soon Section */}
      <div>
      <div className="mb-6"> </div>    
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Coming Soon</h2>
          <Link href="/coming-soon" className="text-amber-500 hover:text-amber-400 flex items-center gap-1">
            View all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {upcomingMovies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="group">
              <div className="space-y-3">
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                  <Image
                    src={movie.poster || "/test1.jpg"}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-amber-400 text-black px-2 py-1 rounded-md text-xs font-medium">
                    Coming Soon
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{movie.releaseDate}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {movie.genres.slice(0, 2).map((genre, index) => (
                      <span key={index} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                        {genre}
                      </span>
                    ))}
                    {movie.genres.length > 2 && (
                      <span className="text-xs text-zinc-400">+{movie.genres.length - 2}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

