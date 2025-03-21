import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

export default function MovieCard({ id, title, image, genres, rating, size = "medium" }) {
    const sizeClasses = {
        small: {
            container: "w-[180px]",
            image: "h-[240px]",
        },
        medium: {
            container: "w-[220px]",
            image: "h-[300px]",
        },
        large: {
            container: "w-[260px]",
            image: "h-[360px]",
        },
    }

    return (
        <Link href={`/movie/${id}`} className={`block ${sizeClasses[size].container} flex-shrink-0 movie-card`}>
            <div className="relative mb-3">
                <Image
                    src={image || "/test1.jpg"}
                    alt={title}
                    width={size === "small" ? 180 : size === "medium" ? 220 : 260}
                    height={size === "small" ? 240 : size === "medium" ? 300 : 360}
                    className={`rounded-lg w-full ${sizeClasses[size].image} object-cover`}
                />
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 rounded-md px-2 py-1">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-xs font-medium">{rating}</span>
                </div>
            </div>
            <h3 className="text-sm font-medium line-clamp-1">{title}</h3>
            <p className="text-xs text-muted-foreground">{genres.join(", ")}</p>
        </Link>
    )
}

