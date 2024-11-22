'use client'

import { useState, useMemo, useEffect } from 'react'
import { ProductCard } from './product-card'
import { ProductCardSkeleton } from './product-card-skeleton'
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

import { getProducts } from '@/lib/getProducts'

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('name-asc')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [conditionFilter, setConditionFilter] = useState<
    'all' | 'nuevo' | 'usado'
  >('all')

  const tags = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)))
  }, [products])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    if (selectedTags.length > 0) {
      filtered = filtered?.filter((product) =>
        selectedTags.includes(product.category)
      )
    }

    if (conditionFilter !== 'all') {
      filtered = filtered.filter(
        (product) => product?.condition === conditionFilter
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

  const isFiltersApplied =
    selectedTags.length > 0 ||
    sortBy !== 'name-asc' ||
    conditionFilter !== 'all'

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

  useEffect(() => {
    getProducts().then((data) => {
      console.log(data)
      setProducts(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="container mx-auto w-full max-w-screen-xl py-8 px-2 md:px-4">
      {tags.length ? (
        <ProductTags
          tags={tags}
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
        />
      ) : (
        <div className=" w-full h-10 mb-2 opacity-0 content-normal"></div>
      )}
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
            onValueChange={(value: 'all' | 'nuevo' | 'usado') =>
              setConditionFilter(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Condición" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="nuevo">Nuevo</SelectItem>
              <SelectItem value="usado">Usado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className=" flex items-center md:flex-row-reverse gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            disabled={!isFiltersApplied}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Limpiar filtros
          </Button>
          <p className=" text-sm text-nowrap ">
            ({filteredAndSortedProducts.length} Productos)
          </p>
        </div>
      </div>
      <div className="mt-10 px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
      </div>
    </div>
  )
}
