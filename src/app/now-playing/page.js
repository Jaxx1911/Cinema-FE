import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, Film, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Sample data for currently playing movies
const nowPlayingMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    poster: "/test1.jpg?height=450&width=300",
    rating: 8.7,
    duration: "166 min",
    genres: ["Sci-Fi", "Adventure"],
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    showtimes: ["10:30", "13:45", "17:00", "20:15", "22:30"],
  },
  {
    id: 2,
    title: "Kung Fu Panda 4",
    poster: "/test1.jpg?height=450&width=300",
    rating: 7.5,
    duration: "94 min",
    genres: ["Animation", "Comedy"],
    description:
      "Po is called upon to become the Spiritual Leader of the Valley of Peace, but needs to find and train a new Dragon Warrior.",
    showtimes: ["09:15", "11:30", "14:00", "16:30", "18:45"],
  },
  {
    id: 3,
    title: "Godzilla x Kong",
    poster: "/test1.jpg?height=450&width=300",
    rating: 7.8,
    duration: "115 min",
    genres: ["Action", "Sci-Fi"],
    description: "Godzilla and Kong team up to face a colossal threat hidden within our world.",
    showtimes: ["10:00", "12:45", "15:30", "18:15", "21:00"],
  },
  {
    id: 4,
    title: "Ghostbusters: Frozen Empire",
    poster: "/test1.jpg?height=450&width=300",
    rating: 7.2,
    duration: "115 min",
    genres: ["Comedy", "Fantasy"],
    description:
      "The Spengler family returns to where it all started – the iconic New York City firehouse – to team up with the original Ghostbusters.",
    showtimes: ["11:15", "14:30", "17:45", "20:00", "22:15"],
  },
  {
    id: 5,
    title: "The Fall Guy",
    poster: "/test1.jpg?height=450&width=300",
    rating: 7.9,
    duration: "126 min",
    genres: ["Action", "Comedy"],
    description: "A stuntman is drawn back into a dangerous world when the star of a mega-budget film goes missing.",
    showtimes: ["09:30", "12:15", "15:00", "17:45", "20:30"],
  },
  {
    id: 6,
    title: "Kingdom of the Planet of the Apes",
    poster: "/test1.jpg?height=450&width=300",
    rating: 8.1,
    duration: "145 min",
    genres: ["Action", "Adventure"],
    description:
      "Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he's been taught.",
    showtimes: ["10:45", "13:30", "16:15", "19:00", "21:45"],
  },
]

export default function NowPlayingPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Now Showing</h1>
         
       
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nowPlayingMovies.map((movie) => (
          <Card key={movie.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative">
              <Image
                src={movie.poster || "/test1.jpg"}
                alt={movie.title}
                width={300}
                height={450}
                className="w-full object-cover aspect-[2/3]"
              />
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span>{movie.rating}</span>
              </div>
            </div>
            <CardContent className="pt-4 flex-grow">
              <h2 className="text-xl font-bold mb-1">{movie.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Film className="h-4 w-4" />
                  <span>{movie.genres.join(", ")}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{movie.description}</p>
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>Today's Showtimes</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.showtimes.slice(0, 4).map((time, index) => (
                    <Button key={index} variant="outline" size="sm" className="text-xs">
                      {time}
                    </Button>
                  ))}
                  {movie.showtimes.length > 4 && (
                    <Button variant="ghost" size="sm" className="text-xs">
                      +{movie.showtimes.length - 4} more
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button asChild className="w-full">
                <Link href={`/movie/${movie.id}`}>Book Tickets</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

