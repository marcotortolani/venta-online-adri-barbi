import { ProductList } from '@/components/product-list'
import { Footer } from '@/components/ui/footer'

export interface Product {
  id: string
  category: string
  name: string
  price: number
  condition: 'nuevo' | 'usado'
  description: string
  image: string
}

export default function Home() {
  return (
    <div className="">
      <header className="w-full  bg-neutral-900 text-white">
        <div className=" w-full max-w-screen-xl mx-auto py-4 px-4 flex flex-col md:flex-row items-center justify-between">
          <h1 className="w-full text-3xl font-bold text-left">
            Venta Garage - online
          </h1>
          <h3 className="w-full text-xl uppercase font-thin md:font-semibold text-center md:text-right">
            Adri & Barby
          </h3>
        </div>
      </header>
      <ProductList />
      <Footer />
    </div>
  )
}
