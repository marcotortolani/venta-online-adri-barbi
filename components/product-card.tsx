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
import { Truck, Eye } from 'lucide-react'

interface ProductCardProps extends Product {
  onCardClick: (product: Product) => void
}

const imagePlaceHolder =
  'https://blocks.astratic.com/img/general-img-landscape.png'

export function ProductCard({
  id,
  name,
  category,
  price,
  description,
  image,
  condition,
  state,
  discount = 0,
  payments = 1,
  shipping,
  onCardClick,
}: ProductCardProps) {
  const handleInterest = () => {
    const message = encodeURIComponent(
      `Hola, me interesa:\n${name}.\nPrecio: $${price}.\nDescripción: ${description}`
    )
    window.open(`https://wa.me/541164689680?text=${message}`, '_blank')
  }

  const discountedPrice = price - (price * discount) / 100
  const pricePerPayment = price / payments

  return (
    <Card
      className={`${
        state === 'vendido'
          ? 'opacity-60 scale-100 '
          : ' hover:scale-105 hover:shadow-md hover:shadow-neutral-500/60'
      } relative w-full flex flex-col justify-between group transition-all duration-200 ease-in-out overflow-hidden cursor-pointer`}
      onClick={() =>
        onCardClick({
          id,
          name,
          price,
          description,
          image,
          condition,
          state,
          discount,
          payments,
          shipping,
          category: '',
        })
      }
    >
      <div className=" group-hover:opacity-100 opacity-0 absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-[1px] z-[1000] content-normal transition-all duration-200 ease-in-out ">
        <p className=" flex items-center gap-4 bg-black text-white uppercase font-semibold px-4 py-2 rounded-3xl">
          <Eye className=" w-10 h-10 text-white" /> Ver más
        </p>
      </div>
      <div className="relative ">
        <CardHeader className="relative pt-7 pb-2">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge
            variant={condition === 'nuevo' ? 'default' : 'secondary'}
            className="z-50 absolute top-1 right-2"
          >
            {condition === 'nuevo' ? 'Nuevo' : 'Usado'}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className=" aspect-video relative mb-4">
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
          <div className="relative mb-2">
            {shipping === 'con envio' && (
              <Badge
                variant="secondary"
                className="z-50 absolute top-0 right-0 bg-sky-400 text-white hover:bg-sky-500"
              >
                <Truck className="w-4 h-4 mr-1" />
                Mercado Envíos
              </Badge>
            )}
            <p
              className={`${
                payments === 1 &&
                discount > 0 &&
                ' line-through text-neutral-500 font-semibold '
              } text-2xl font-bold`}
            >
              {price === 0 ? 'Sin precio' : `$${price.toLocaleString('es-AR')}`}
            </p>
            {payments > 1 && (
              <>
                <p className="text-sm text-gray-600">
                  1 pago: $
                  {discount > 0
                    ? `${discountedPrice.toLocaleString(
                        'es-AR'
                      )} (${discount}% desc)`
                    : price.toLocaleString('es-AR')}
                </p>
                <p className="text-sm text-gray-600">
                  Pago en cuotas: {payments}x $
                  {pricePerPayment.toLocaleString('es-AR', {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </>
            )}
            {payments === 1 && discount > 0 && (
              <p className="text-sm font-semibold text-red-600">
                Precio con descuento: ${discountedPrice.toLocaleString('es-AR')}{' '}
                ({discount}% desc)
              </p>
            )}
          </div>
          <div className=" w-4/5 mx-auto h-[1px] bg-neutral-500/70 content-normal"></div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {description}
          </p>
        </CardContent>
      </div>

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
        <div className="absolute top-0 left-0 w-full py-2 flex justify-center -translate-x-20 translate-y-20 -rotate-45 bg-red-600 text-white text-lg font-semibold uppercase">
          Vendido
        </div>
      )}
    </Card>
  )
}
