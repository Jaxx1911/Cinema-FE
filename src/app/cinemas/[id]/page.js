import Link from "next/link"
import Image from "next/image"
import { MapPin, Star, Clock, Phone, ChevronRight } from "lucide-react"
import { cinemaImages, moviePosters, cinemaLogos } from "@/utils/imageMockUrls"

export default function CinemaDetail({ params }) {
  // Sample cinema data
  const cinema = {
    id: params.id,
    name: "Vincom Ocean Park CGV",
    image: cinemaImages[0],
    logo: cinemaLogos[0],
    address: "Ocean Park, Gia Lâm, Hà Nội",
    rating: 4.8,
    distance: "2.5 km",
    openingHours: "09:00 - 23:00",
    phone: "(024) 7300 8855",
    facilities: ["IMAX", "4DX", "VIP", "Dolby Atmos"],
    description:
      "CGV Vincom Ocean Park là cụm rạp chiếu phim hiện đại bậc nhất tại khu vực Gia Lâm, Hà Nội. Với 8 phòng chiếu được trang bị công nghệ hình ảnh và âm thanh tiên tiến, CGV Vincom Ocean Park mang đến trải nghiệm điện ảnh tuyệt vời cho khán giả. Rạp còn có khu vực giải trí, ẩm thực phong phú và dịch vụ khách hàng chuyên nghiệp.",
  }

  // Sample dates for showtimes
  const dates = [
    { date: "2023-04-22", day: "Sat", isToday: false },
    { date: "2023-04-23", day: "Sun", isToday: true },
    { date: "2023-04-24", day: "Mon", isToday: false },
    { date: "2023-04-25", day: "Tue", isToday: false },
    { date: "2023-04-26", day: "Wed", isToday: false },
    { date: "2023-04-27", day: "Thu", isToday: false },
    { date: "2023-04-28", day: "Fri", isToday: false },
  ]

  // Sample movies with showtimes
  const movies = [
    {
      id: "1",
      title: "Avengers: Infinity War",
      poster: moviePosters[0],
      genres: ["Action", "Adventure", "Sci-Fi"],
      duration: "149 min",
      rating: 4.8,
      showtimes: [
        { time: "10:30", screen: "Screen 1", type: "2D" },
        { time: "13:15", screen: "Screen 1", type: "2D" },
        { time: "16:00", screen: "Screen 2", type: "3D" },
        { time: "19:30", screen: "Screen 3", type: "IMAX" },
        { time: "22:15", screen: "Screen 2", type: "2D" },
      ],
    },
    {
      id: "2",
      title: "Black Panther",
      poster: moviePosters[1],
      genres: ["Action", "Adventure"],
      duration: "134 min",
      rating: 4.5,
      showtimes: [
        { time: "09:45", screen: "Screen 4", type: "2D" },
        { time: "12:30", screen: "Screen 4", type: "2D" },
        { time: "15:15", screen: "Screen 5", type: "3D" },
        { time: "18:00", screen: "Screen 5", type: "3D" },
        { time: "20:45", screen: "Screen 4", type: "2D" },
      ],
    },
    {
      id: "3",
      title: "Guardians of The Galaxy",
      poster: moviePosters[2],
      genres: ["Action", "Comedy", "Sci-Fi"],
      duration: "136 min",
      rating: 4.7,
      showtimes: [
        { time: "11:00", screen: "Screen 6", type: "2D" },
        { time: "14:00", screen: "Screen 6", type: "2D" },
        { time: "17:00", screen: "Screen 7", type: "4DX" },
        { time: "20:00", screen: "Screen 7", type: "4DX" },
      ],
    },
    {
      id: "4",
      title: "Doctor Strange",
      poster: moviePosters[3],
      genres: ["Action", "Fantasy"],
      duration: "115 min",
      rating: 4.4,
      showtimes: [
        { time: "10:00", screen: "Screen 8", type: "2D" },
        { time: "12:45", screen: "Screen 8", type: "2D" },
        { time: "15:30", screen: "Screen 8", type: "3D" },
        { time: "18:15", screen: "Screen 8", type: "3D" },
        { time: "21:00", screen: "Screen 8", type: "2D" },
      ],
    },
  ]

  // Selected date (default to today)
  const selectedDate = dates.find((d) => d.isToday) || dates[0]

  return (
    <div>
      {/* Cinema header */}
      <div className="relative">
        <div className="h-64 relative">
          <Image src={cinema.image || "/placeholder.svg"} alt={cinema.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-8 -mt-24 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-64 h-64 bg-card rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
              <Image
                src={cinema.logo || "/placeholder.svg"}
                alt={cinema.name}
                width={128}
                height={128}
                className="w-32 h-32 object-contain"
              />
            </div>

            <div className="flex-1 pt-24">
              <h1 className="text-3xl font-bold mb-2">{cinema.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <p className="text-muted-foreground">{cinema.address}</p>
              </div>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span>{cinema.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span>{cinema.openingHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span>{cinema.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {cinema.facilities.map((facility, index) => (
                  <span key={index} className="px-3 py-1 bg-card rounded-full text-sm">
                    {facility}
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground">{cinema.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes section */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Showtimes</h2>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {dates.map((date) => (
              <button
                key={date.date}
                className={`flex flex-col items-center justify-center min-w-[80px] p-4 rounded-lg ${
                  date.isToday ? "bg-primary text-black" : "bg-card hover:bg-card/80"
                }`}
              >
                <span className="text-sm">{date.day}</span>
                <span className="text-xl font-bold">{date.date.split("-")[2]}</span>
                {date.isToday && <span className="text-xs mt-1">Today</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-card rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex gap-6">
                  <Image
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    width={100}
                    height={150}
                    className="rounded-lg"
                  />

                  <div>
                    <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                    <p className="text-muted-foreground mb-2">{movie.genres.join(", ")}</p>

                    <div className="flex gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{movie.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm">{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Showtimes for {selectedDate.date.split("-").reverse().join("/")}</h4>
                    <Link
                      href={`/movie/${movie.id}`}
                      className="text-primary flex items-center gap-1 text-sm hover:underline"
                    >
                      <span>Movie details</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movie.showtimes.map((showtime, index) => (
                      <Link
                        key={index}
                        href={`/select-seat/${movie.id}?time=${showtime.time}&date=${selectedDate.date}&screen=${showtime.screen}&type=${showtime.type}`}
                        className="block p-4 bg-input rounded-lg hover:bg-input/80 transition-colors text-center"
                      >
                        <p className="font-medium mb-1">{showtime.time}</p>
                        <p className="text-xs text-muted-foreground mb-1">{showtime.screen}</p>
                        <span className="inline-block px-2 py-1 bg-black/20 rounded-md text-xs">{showtime.type}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

