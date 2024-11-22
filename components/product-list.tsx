'use client'

import { useState, useMemo } from 'react'
import { ProductCard } from './product-card'
import { ProductTags } from './product-tags'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Product } from '../app/page'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  const [sortBy, setSortBy] = useState('name-asc')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [conditionFilter, setConditionFilter] = useState<
    'all' | 'new' | 'used'
  >('all')

  const tags = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.type)))
  }, [products])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    if (selectedTags.length > 0) {
      filtered = filtered.filter((product) =>
        selectedTags.includes(product.type)
      )
    }

    if (conditionFilter !== 'all') {
      filtered = filtered.filter(
        (product) => product.condition === conditionFilter
      )
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        default:
          return 0
      }
    })
  }, [products, selectedTags, sortBy, conditionFilter])

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedTags([])
    setSortBy('name-asc')
    setConditionFilter('all')
  }

  const isFiltersApplied =
    selectedTags.length > 0 ||
    sortBy !== 'name-asc' ||
    conditionFilter !== 'all'

  return (
    <div className="container mx-auto w-full max-w-screen-xl py-8 px-2">
      <ProductTags
        tags={tags}
        selectedTags={selectedTags}
        onTagClick={handleTagClick}
      />
      <div className=" w-full flex flex-wrap md:flex-nowrap justify-between items-center mb-4 gap-4">
        <div className=" w-full flex items-center justify-between md:justify-start md:gap-6">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Nombre (A-Z)</SelectItem>
              <SelectItem value="name-desc">Nombre (Z-A)</SelectItem>
              <SelectItem value="price-asc">Precio (Menor a Mayor)</SelectItem>
              <SelectItem value="price-desc">Precio (Mayor a Menor)</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={conditionFilter}
            onValueChange={(value: 'all' | 'new' | 'used') =>
              setConditionFilter(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Condición" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="new">Nuevo</SelectItem>
              <SelectItem value="used">Usado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          disabled={!isFiltersApplied}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Limpiar filtros
        </Button>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-20">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}
