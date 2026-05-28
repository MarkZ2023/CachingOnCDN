import type { CarCategory } from "@/lib/api";

type CategoryApiNoteProps = {
  category: CarCategory;
};

export function CategoryApiNote({ category }: CategoryApiNoteProps) {
  return (
    <p className="text-sm text-muted-foreground">
      API returned {category.photos.length} photo
      {category.photos.length === 1 ? "" : "s"}
      {category.personalizedFor
        ? ` (cookie forwarded for ${category.personalizedFor})`
        : " (no auth cookie forwarded)"}
    </p>
  );
}
