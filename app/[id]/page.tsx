'use client'
import { useState, useEffect } from 'react'
import { Product } from '../page'
import Header from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import { getProducts } from '@/lib/getProducts'
import { ProductCardLarge } from '@/components/product-card-large'

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    getProducts()
      .then((products) => {
        const prod = products?.find((p) => p.id === id) || null // Devuelve `null` si no encuentra el producto
        setProduct(prod)
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  // Renderizar estado de carga
  if (isLoading) {
    return (
      <main className=" h-fit min-h-screen flex flex-col justify-between ">
        <Header />
        <div className=" animate-pulse font-semibold text-xl h-fit mx-auto px-4 py-8">
          <p>Cargando...</p>
        </div>
        <Footer />
      </main>
    )
  }

  // Renderizar si el producto no se encuentra
  if (!product) {
    return (
      <main className=" h-fit min-h-screen flex flex-col justify-between ">
        <Header />
        <div className=" animate-pulse font-semibold text-2xl h-fit mx-auto px-4 py-8">
          <p>Producto no encontrado</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className=" h-fit min-h-screen flex flex-col justify-between ">
      <Header />
      <div className=" h-full mx-auto px-4 py-8">
        <ProductCardLarge product={product} />
      </div>
      <Footer />
    </main>
  )
}
