"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, Star, Clock, Phone } from "lucide-react"
import { cinemaImages, cinemaLogos } from "@/utils/imageMockUrls"
import SelectCity from "@/components/movie/detail/selectCity"
import { useState, useEffect } from "react"
import { useGetCinemasWithFacilities } from "@/hooks/useCinema"
export default function CinemasPage() {
  const [city, setCity] = useState({id: 1, name: "Hà Nội", value: "hanoi"})
  const { data: cinemas, refetch: refetchCinemasWithFacilities } = useGetCinemasWithFacilities(city.value)

  useEffect(() => {
     refetchCinemasWithFacilities()
  }, [city])
  


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Cinemas</h1>

      <div className="flex justify-between items-center mb-8">

        <div className="flex gap-4">
          <SelectCity selected={city} setSelected={setCity} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {cinemas?.body?.map((cinema, index) => (
          <Link href={`/cinemas/${cinema.id}?index=${index}`} key={cinema.id} className="block hover:scale-105 transition-all duration-300 h-full">
            <div className="bg-card rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full">
              <div className="relative h-48">
                <Image src={"/cinema/"+ (index + 1) + ".jpg"} alt={cinema.name} fill className="object-cover" />
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
                    <span className="text-sm">{cinema.opening_hours}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{cinema.phone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[...new Set(cinema.rooms.map(room => room.type))].map((facility, index) => (
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

