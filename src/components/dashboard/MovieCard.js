import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"

export default function MovieCard({ id, title, image, genres, duration, size = "medium", movieTag}) {
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
        <Link href={`/movies/${id}`} className={`block ${sizeClasses[size].container} flex-shrink-0 movie-card`}>
            <div className="relative mb-3">
                <Tag movieTag={movieTag} />
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    width={size === "small" ? 180 : size === "medium" ? 220 : 260}
                    height={size === "small" ? 240 : size === "medium" ? 300 : 360}
                    className={`rounded-lg w-full ${sizeClasses[size].image} object-cover`}
                />
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 rounded-md px-2 py-1">
                    <Clock className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-xs font-medium">{duration + " min"}</span>
                </div>
            </div>
            <h3 className="text-sm font-medium line-clamp-1">{title}</h3>
            <p className="text-xs text-muted-foreground">{genres.join(", ")}</p>
        </Link>
    )
}

export function Tag({movieTag}) {
    if (movieTag === "P") {
        return (
            <div className="absolute top-2 left-2 flex items-center justify-center gap-1 bg-tag-p rounded-md px-2 py-1 w-8 h-7">
                <span className="text-xs font-medium">{movieTag}</span>
            </div>
        )
    } else if (movieTag === "K") {
        return (
            <div className="absolute top-2 left-2 flex items-center justify-center gap-1 bg-tag-k rounded-md px-2 py-1 w-8 h-8">
                <span className="text-xs font-medium">{movieTag}</span>
            </div>
        )
    } else if (movieTag === "C13") {
        return (
            <div className="absolute top-2 left-2 flex items-center justify-center gap-1 bg-tag-c13 rounded-md px-2 py-1 w-8 h-8">
                <span className="text-xs font-medium">{movieTag}</span>
            </div>
        )
    } else if (movieTag === "C16") {
        return (
            <div className="absolute top-2 left-2 flex items-center justify-center gap-1 bg-tag-c16 rounded-md px-2 py-1 w-8 h-8">
                <span className="text-xs font-medium">{movieTag}</span>
            </div>
        )
    } else if (movieTag === "C18") {
        return (
            <div className="absolute top-2 left-2 flex items-center justify-center gap-1 bg-tag-c18 rounded-md px-2 py-1 w-8 h-8">
                <span className="text-xs font-medium">{movieTag}</span>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}   