import { Button } from "@/components/ui/button"

interface ProductTagsProps {
  tags: string[]
  selectedTags: string[]
  onTagClick: (tag: string) => void
}

export function ProductTags({ tags, selectedTags, onTagClick }: ProductTagsProps) {
  return (
    <div className="flex flex-wrap  gap-2 mb-4">
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={selectedTags.includes(tag) ? "active" : "outline"}
          size="sm"
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </Button>
      ))}
    </div>
  )
}

