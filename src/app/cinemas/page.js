import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, Star, Clock, Phone } from "lucide-react"
import { cinemaImages, cinemaLogos } from "@/utils/imageMockUrls"

export default function CinemasPage() {
  // Sample cinemas data
  const cinemas = [
    {
      id: "1",
      name: "Vincom Ocean Park CGV",
      image: cinemaImages[0],
      logo: cinemaLogos[0],
      address: "Ocean Park, Gia Lâm, Hà Nội",
      rating: 4.8,
      distance: "2.5 km",
      openingHours: "09:00 - 23:00",
      phone: "(024) 7300 8855",
      facilities: ["IMAX", "4DX", "VIP", "Dolby Atmos"],
    },
    {
      id: "2",
      name: "Lotte Cinema Thăng Long",
      image: cinemaImages[1],
      logo: cinemaLogos[1],
      address: "Big C Thăng Long, 222 Trần Duy Hưng, Cầu Giấy, Hà Nội",
      rating: 4.6,
      distance: "5.2 km",
      openingHours: "08:00 - 23:30",
      phone: "(024) 3974 3333",
      facilities: ["Gold Class", "Dolby Atmos", "Screen X"],
    },
    {
      id: "3",
      name: "BHD Star Cineplex Vincom Center",
      image: cinemaImages[2],
      logo: cinemaLogos[2],
      address: "Vincom Center, 191 Bà Triệu, Hai Bà Trưng, Hà Nội",
      rating: 4.7,
      distance: "3.8 km",
      openingHours: "09:30 - 22:00",
      phone: "(024) 3636 5566",
      facilities: ["ULTRA", "Dolby Atmos", "Premium"],
    },
    {
      id: "4",
      name: "Galaxy Cinema Mipec Tower",
      image: cinemaImages[3],
      logo: cinemaLogos[3],
      address: "Mipec Tower, 229 Tây Sơn, Đống Đa, Hà Nội",
      rating: 4.5,
      distance: "4.1 km",
      openingHours: "09:00 - 22:30",
      phone: "(024) 3632 9999",
      facilities: ["Premium", "Dolby Sound", "Couple Seats"],
    },
    {
      id: "5",
      name: "Beta Cinemas Mỹ Đình",
      image: cinemaImages[4],
      logo: cinemaLogos[4],
      address: "Tầng 4, TTTM The Garden, Mỹ Đình, Nam Từ Liêm, Hà Nội",
      rating: 4.4,
      distance: "7.3 km",
      openingHours: "09:00 - 22:00",
      phone: "(024) 7300 7766",
      facilities: ["Beta Deluxe", "Beta Premium"],
    },
    {
      id: "6",
      name: "Platinum Cineplex Royal City",
      image: cinemaImages[0],
      logo: cinemaLogos[0],
      address: "Tầng B2, TTTM Royal City, 72A Nguyễn Trãi, Thanh Xuân, Hà Nội",
      rating: 4.3,
      distance: "6.5 km",
      openingHours: "10:00 - 22:00",
      phone: "(024) 6683 2222",
      facilities: ["Platinum Suite", "Dolby Sound"],
    },
  ]

  // Sample districts for filtering
  const districts = [
    "Tất cả",
    "Hoàn Kiếm",
    "Ba Đình",
    "Đống Đa",
    "Hai Bà Trưng",
    "Cầu Giấy",
    "Thanh Xuân",
    "Tây Hồ",
    "Long Biên",
    "Nam Từ Liêm",
    "Bắc Từ Liêm",
    "Hà Đông",
    "Gia Lâm",
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Cinemas</h1>

      <div className="flex justify-between items-center mb-8">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search cinemas..."
            className="w-full pl-10 pr-4 py-2 bg-input border border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>

        <div className="flex gap-4">
          <select className="px-4 py-2 bg-input border border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="">Tất cả các rạp</option>
            <option value="cgv">CGV</option>
            <option value="lotte">Lotte Cinema</option>
            <option value="bhd">BHD Star</option>
            <option value="galaxy">Galaxy Cinema</option>
            <option value="beta">Beta Cinemas</option>
          </select>

          <select className="px-4 py-2 bg-input border border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary">
            {districts.map((district) => (
              <option key={district} value={district.toLowerCase()}>
                {district}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {cinemas.map((cinema) => (
          <Link href={`/cinemas/${cinema.id}`} key={cinema.id} className="block">
            <div className="bg-card rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={cinema.image || "/placeholder.svg"} alt={cinema.name} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-black/60 p-2 rounded-lg">
                  <Image
                    src={cinema.logo || "/placeholder.svg"}
                    alt={cinema.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{cinema.name}</h2>

                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{cinema.address}</p>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm">{cinema.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{cinema.openingHours}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{cinema.phone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cinema.facilities.map((facility, index) => (
                    <span key={index} className="px-2 py-1 bg-input rounded-md text-xs">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

