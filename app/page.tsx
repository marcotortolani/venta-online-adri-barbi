import { ProductList } from '@/components/product-list'
import { Footer } from '@/components/ui/footer'
import Header from '@/components/ui/header'

export interface Product {
  id: string
  category: string
  name: string
  price: number
  payments: number
  discount: number
  condition: 'nuevo' | 'usado'
  state: 'disponible' | 'vendido'
  description: string
  shipping: 'con envio' | 'sin envio'
  image: string
}

export default function Home() {
  return (
    <div className="">
      <Header />
      <ProductList />
      <Footer />
    </div>
  )
}
