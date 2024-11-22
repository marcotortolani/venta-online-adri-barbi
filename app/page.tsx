import { ProductList } from '@/components/product-list'
import { Footer } from '@/components/ui/footer'

export interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  type: string
  condition: 'new' | 'used'
}

function getProducts(): Product[] {
  return [
    {
      id: '1',
      name: 'Bicicleta de montaña',
      price: 299.99,
      description: 'Bicicleta de montaña en excelente estado, poco uso.',
      image: 'https://placehold.co/600x400.png',
      type: 'bicicleta',
      condition: 'used',
    },
    {
      id: '2',
      name: 'iPhone 11 Pro',
      price: 499.99,
      description: 'iPhone 11 Pro, 64GB, color gris espacial, batería al 85%.',
      image: 'https://placehold.co/600x400.png',
      type: 'celular',
      condition: 'used',
    },
    {
      id: '3',
      name: 'Sofá de cuero',
      price: 599.99,
      description: 'Sofá de cuero 3 plazas, color marrón, muy cómodo.',
      image: 'https://placehold.co/600x400.png',
      type: 'sofá',
      condition: 'new',
    },
    {
      id: '4',
      name: 'Televisor 4K 55',
      price: 449.99,
      description: 'Smart TV 4K de 55 pulgadas, marca Samsung, como nuevo.',
      image: 'https://placehold.co/600x400.png',
      type: 'televisor',
      condition: 'used',
    },
    {
      id: '5',
      name: 'Mesa de comedor',
      price: 199.99,
      description:
        'Mesa de comedor extensible, madera maciza, para 6-8 personas.',
      image: 'https://placehold.co/600x400.png',
      type: 'mesa',
      condition: 'new',
    },
    {
      id: '6',
      name: 'Guitarra eléctrica',
      price: 349.99,
      description:
        'Guitarra eléctrica Fender Stratocaster, color sunburst, con estuche.',
      image: 'https://placehold.co/600x400.png',
      type: 'instrumento',
      condition: 'new',
    },
    {
      id: '7',
      name: 'Cámara DSLR',
      price: 599.99,
      description: 'Cámara DSLR Canon EOS 80D con lente 18-135mm, poco uso.',
      image: 'https://placehold.co/600x400.png',
      type: 'cámara',
      condition: 'used',
    },
    {
      id: '8',
      name: 'Patines en línea',
      price: 79.99,
      description: 'Patines en línea talla 42, ideales para principiantes.',
      image: 'https://placehold.co/600x400.png',
      type: 'deporte',
      condition: 'used',
    },
    {
      id: '9',
      name: 'Consola PS4',
      price: 249.99,
      description: 'PlayStation 4 Slim 1TB con dos mandos, en perfecto estado.',
      image: 'https://placehold.co/600x400.png',
      type: 'consola',
      condition: 'used',
    },
    {
      id: '10',
      name: 'Máquina de café',
      price: 129.99,
      description: 'Cafetera Nespresso con espumador de leche, como nueva.',
      image: 'https://placehold.co/600x400.png',
      type: 'electrodoméstico',
      condition: 'new',
    },
  ]
}

export default function Home() {
  const products = getProducts()

  return (
    <div className="">
      <header className="w-full  bg-neutral-800 text-white">
        <div className=" w-full max-w-screen-xl mx-auto py-4 px-4 flex flex-col md:flex-row items-center justify-between">
          <h1 className="w-full text-3xl font-bold text-left">Venta Garage - online</h1>
          <h3 className="w-full text-xl uppercase font-thin md:font-semibold text-center">Adri & Barby</h3>
        </div>
      </header>
      <ProductList products={products} />
      <Footer />
    </div>
  )
}
