import Image from "next/image";
import type { CarPhoto } from "@/lib/api";

type PhotoGridProps = {
  photos: CarPhoto[];
};

export function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <figure
          key={photo.id}
          className="overflow-hidden rounded-xl border bg-card shadow-sm"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">
            {photo.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
