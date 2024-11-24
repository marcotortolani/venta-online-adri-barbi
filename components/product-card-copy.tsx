import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Product } from '../app/page'

const imagePlaceHolder =
  'https://blocks.astratic.com/img/general-img-landscape.png'

export function ProductCard({
  id,
  name,
  price,
  description,
  image,
  condition,
  state,
}: Product) {
  const handleInterest = () => {
    const message = encodeURIComponent(
      `Hola, me interesa:\n${name}.\nPrecio: $${price}.\nDescripción: ${description}`
    )
    window.open(`https://wa.me/541164689680?text=${message}`, '_blank')
  }

  // prices is NaN?

  return (
    <Card
      className={` ${
        state === 'vendido'
          ? 'opacity-60 scale-100 '
          : ' hover:scale-105 hover:shadow-md hover:shadow-neutral-500/60'
      } relative w-full group  transition-all duration-200 ease-in-out overflow-hidden `}
    >
      <CardHeader className="relative">
        <CardTitle className="text-lg">{name}</CardTitle>
        <Badge
          variant={condition === 'nuevo' ? 'default' : 'secondary'}
          className="z-50 absolute top-1 right-2"
        >
          {condition === 'nuevo' ? 'Nuevo' : 'Usado'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="aspect-video relative mb-4">
          <Image
            src={
              !image.includes('https')
                ? imagePlaceHolder
                : image || imagePlaceHolder
            }
            alt={name}
            fill
            className="object-cover rounded-md border-neutral-200 border-2"
          />
        </div>
        <p className="text-2xl font-bold">
          {isNaN(price) ? 'Sin precio' : `$${price.toLocaleString('es-AR')}`}
        </p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleInterest}
          className="w-full"
          disabled={state === 'vendido'}
        >
          Me interesa
        </Button>
      </CardFooter>
      {state === 'vendido' && (
        <div className=" absolute top-0 left-0 w-full py-2 flex justify-center -translate-x-20 translate-y-20 -rotate-45 bg-red-600 text-white text-lg font-semibold uppercase">
          Vendido
        </div>
      )}
    </Card>
  )
}
