import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '../app/page'
import { Truck, Share2 } from 'lucide-react'

interface ProductCardLargeProps {
  product: Product
}

const imagePlaceHolder =
  'https://blocks.astratic.com/img/general-img-landscape.png'

export function ProductCardLarge({ product }: ProductCardLargeProps) {
  const {
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
  } = product

  const handleInterest = () => {
    const message = encodeURIComponent(
      `Hola, me interesa:\n${name}.\nPrecio: $${price}.\nDescripción: ${description}`
    )
    window.open(`https://wa.me/541164689680?text=${message}`, '_blank')
  }

  const handleShare = () => {
    const shareUrl = `https://venta-online-adri-barbi.vercel.app/${id}`
    const shareMessage = encodeURIComponent(
      `Mira este producto: ${name}\n${shareUrl}`
    )
    window.open(`https://wa.me/?text=${shareMessage}`, '_blank')
  }

  const discountedPrice = price - (price * discount) / 100
  const pricePerPayment = price / payments

  return (
    <main className=" w-full flex flex-col items-center gap-6 ">
      <div className=" max-w-screen-lg bg-white rounded-lg border-[1px] border-neutral-300 shadow-lg overflow-hidden">
        <div className=" relative grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left column */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{name}</h1>
            <div className="aspect-square relative w-full">
              <Image
                src={
                  !image.includes('https')
                    ? imagePlaceHolder
                    : image || imagePlaceHolder
                }
                alt={name}
                fill
                className="object-contain rounded-md"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant={condition === 'nuevo' ? 'default' : 'secondary'}>
                {condition === 'nuevo' ? 'Nuevo' : 'Usado'}
              </Badge>
              {shipping === 'con envio' && (
                <Badge
                  variant="secondary"
                  className="bg-sky-400 text-white hover:bg-sky-500"
                >
                  <Truck className="w-4 h-4 mr-1" />
                  Mercado Envíos
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-3xl font-bold">
                ${price.toLocaleString('es-AR')}
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
                    Pago en cuotas: {payments}x$
                    {pricePerPayment.toLocaleString('es-AR', {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </>
              )}
              {payments === 1 && discount > 0 && (
                <p className="text-sm text-gray-600">
                  Precio con descuento: $
                  {discountedPrice.toLocaleString('es-AR')} ({discount}% desc)
                </p>
              )}
            </div>

            <div className="h-px bg-gray-200" />

            <p className="text-gray-700">{description}</p>

            <div className=" flex items-center gap-2">
              <Button
                onClick={handleInterest}
                className="w-full hover:bg-sky-800 transition-all duration-200 ease-in-out  "
                disabled={state === 'vendido'}
              >
                Me interesa
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="w-full hover:bg-green-500 transition-all duration-200 ease-in-out "
                title="Compartir por WhatsApp"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
          {state === 'vendido' && (
            <div className="absolute lg:top-28 lg:-left-32 w-full py-2 flex justify-center -translate-x-20 translate-y-20 -rotate-45 bg-red-600 text-white text-lg md:text-xl font-semibold uppercase">
              Vendido
            </div>
          )}
        </div>
      </div>
      <Button asChild>
        <Link href="/" target="_self">
          Ver más productos
        </Link>
      </Button>
    </main>
  )
}
