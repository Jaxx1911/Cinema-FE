"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, Star, Clock, Phone } from "lucide-react"
import { cinemaImages, cinemaLogos } from "@/utils/imageMockUrls"
import SelectCity from "@/components/movie/detail/selectCity"
import { useState } from "react"
import { useCinema, useGetCinemas } from "@/hooks/useCinema"
export default function CinemasPage() {
  const [city, setCity] = useState({id: 1, name: "Hà Nội", value: "hanoi"})
  const { data: cinema, refetch } = useGetCinemas(city.value)

  useEffect(() => {
     refetch()
  }, [city])
  
  // Sample cinemas data

  const cinemas = [
    {
      id: "1",
      name: "Vincom Ocean Park CGV",
      image: "/cinema/1.jpg",
      address: "Ocean Park, Gia Lâm, Hà Nội",
      openingHours: "09:00 - 23:00",
      phone: "(024) 7300 8855",
      facilities: ["IMAX", "4DX", "VIP", "Dolby Atmos"],
    },
    {
      id: "2",
      name: "Lotte Cinema Thăng Long",
      image: "/cinema/2.jpg",
      address: "Big C Thăng Long, 222 Trần Duy Hưng, Cầu Giấy, Hà Nội",
      openingHours: "08:00 - 23:30",
      phone: "(024) 3974 3333",
      facilities: ["Gold Class", "Dolby Atmos", "Screen X"],
    },
    {
      id: "3",
      name: "BHD Star Cineplex Vincom Center",
      image: "/cinema/3.jpg",
      address: "Vincom Center, 191 Bà Triệu, Hai Bà Trưng, Hà Nội",
      openingHours: "09:30 - 22:00",
      phone: "(024) 3636 5566",
      facilities: ["ULTRA", "Dolby Atmos", "Premium"],
    },
    {
      id: "4",
      name: "Galaxy Cinema Mipec Tower",
      image: "/cinema/4.jpg",
      address: "Mipec Tower, 229 Tây Sơn, Đống Đa, Hà Nội",
      openingHours: "09:00 - 22:30",
      phone: "(024) 3632 9999",
      facilities: ["Premium", "Dolby Sound", "Couple Seats"],
    },
    {
      id: "5",
      name: "Beta Cinemas Mỹ Đình",
      image: "/cinema/5.jpg",
      address: "Tầng 4, TTTM The Garden, Mỹ Đình, Nam Từ Liêm, Hà Nội",
      openingHours: "09:00 - 22:00",
      phone: "(024) 7300 7766",
      facilities: ["Beta Deluxe", "Beta Premium"],
    },
    {
      id: "6",
      name: "Platinum Cineplex Royal City",
      image: "/cinema/8.jpg",
      address: "Tầng B2, TTTM Royal City, 72A Nguyễn Trãi, Thanh Xuân, Hà Nội",
      openingHours: "10:00 - 22:00",
      phone: "(024) 6683 2222",
      facilities: ["Platinum Suite", "Dolby Sound"],
    },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Cinemas</h1>

      <div className="flex justify-between items-center mb-8">

        <div className="flex gap-4">
          <SelectCity selected={city} setSelected={setCity} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {cinemas.map((cinema) => (
          <Link href={`/cinemas/${cinema.id}`} key={cinema.id} className="block">
            <div className="bg-card rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={cinema.image || "/placeholder.svg"} alt={cinema.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{cinema.name}</h2>

                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{cinema.address}</p>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 mt-3">
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
                    <span key={index} className="px-2 py-1 bg-input rounded-md text-xs border border-gray-900">
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

