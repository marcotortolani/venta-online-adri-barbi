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
import { Truck } from 'lucide-react'

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
  discount = 0,
  payments = 1,
  shipping,
}: Product) {
  const handleInterest = () => {
    const message = encodeURIComponent(
      `Hola, me interesa:\n${name}.\nPrecio: $${price}. ${
        discount > 0 && `Descuento: ${discount}%`
      } .\nCuotas: ${payments}x $${price / payments}.${
        shipping === 'con envio' && '\nCon Mercado Envios.'
      }\nDescripción: ${description}`
    )
    window.open(`https://wa.me/541164689680?text=${message}`, '_blank')
  }

  const discountedPrice = price - (price * discount) / 100
  const pricePerPayment = price / payments

  return (
    <Card
      className={`${
        state === 'vendido'
          ? 'opacity-70 scale-100'
          : ' hover:scale-105 hover:shadow-md hover:shadow-neutral-500/60'
      } relative w-full group transition-all duration-200 ease-in-out overflow-hidden flex flex-col justify-between`}
    >
      <div className="w-full">
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
            <p className="text-2xl font-bold">
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
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
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
