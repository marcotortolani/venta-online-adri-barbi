// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog'
// import { Badge } from '@/components/ui/badge'
// import { Product } from '../app/page'
// import { Truck } from 'lucide-react'

// interface ProductModalProps {
//   product: Product
//   isOpen: boolean
//   onClose: () => void
// }

// export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
//   const {
//     name,
//     price,
//     description,
//     image,
//     condition,
//     state,
//     discount = 0,
//     payments = 1,
//     shipping,
//   } = product

//   const handleInterest = () => {
//     const message = encodeURIComponent(
//       `Hola, me interesa:\n${name}.\nPrecio: $${price}.\nDescripción: ${description}`
//     )
//     window.open(`https://wa.me/541164689680?text=${message}`, '_blank')
//   }

//   const discountedPrice = price - (price * discount) / 100
//   const pricePerPayment = price / payments

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-3xl">
//         <DialogHeader>
//           <DialogTitle>{name}</DialogTitle>
//           <DialogDescription>
//             <div className="flex justify-between items-start">
//               <div className="flex-1">
//                 <div className="aspect-video relative mb-4 w-full max-h-[400px]">
//                   <Image
//                     src={image || '/placeholder.svg'}
//                     alt={name}
//                     width={400}
//                     height={600}

//                     className=" w-auto h-full rounded-md bg-sky-300"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <p
//                     className={`${
//                       payments === 1 &&
//                       discount > 0 &&
//                       ' line-through text-neutral-500 font-semibold '
//                     } text-2xl font-bold`}
//                   >
//                     {price === 0
//                       ? 'Sin precio'
//                       : `$${price.toLocaleString('es-AR')}`}
//                   </p>
//                   {payments > 1 && (
//                     <>
//                       <p className="text-sm text-gray-600">
//                         1 pago: $
//                         {discount > 0
//                           ? `${discountedPrice.toLocaleString(
//                               'es-AR'
//                             )} (${discount}% desc)`
//                           : price.toLocaleString('es-AR')}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Pago en cuotas: {payments}x$
//                         {pricePerPayment.toLocaleString('es-AR', {
//                           maximumFractionDigits: 0,
//                         })}
//                       </p>
//                     </>
//                   )}
//                   {payments === 1 && discount > 0 && (
//                     <p className="text-base font-semibold text-red-600">
//                       Precio con descuento: $
//                       {discountedPrice.toLocaleString('es-AR')} ({discount}%
//                       desc)
//                     </p>
//                   )}
//                 </div>
//                 <p className="text-gray-700">{description}</p>
//               </div>
//               <div className="ml-4 flex flex-col items-end">
//                 <Badge
//                   variant={condition === 'nuevo' ? 'default' : 'secondary'}
//                   className="mb-2"
//                 >
//                   {condition === 'nuevo' ? 'Nuevo' : 'Usado'}
//                 </Badge>
//                 {shipping === 'con envio' && (
//                   <Badge
//                     variant="secondary"
//                     className="bg-sky-400 text-white hover:bg-sky-500"
//                   >
//                     <Truck className="w-4 h-4 mr-1" />
//                     Mercado Envíos
//                   </Badge>
//                 )}
//               </div>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//         <div className="mt-4">
//           <Button
//             onClick={handleInterest}
//             className="w-full"
//             disabled={state === 'vendido'}
//           >
//             Me interesa
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Product } from '../app/page'
import { Truck } from 'lucide-react'

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const {
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

  const discountedPrice = price - (price * discount) / 100
  const pricePerPayment = price / payments

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            <DialogTitle className="text-2xl">{name}</DialogTitle>
            <div className="aspect-square relative w-full">
              <Image
                src={image || '/placeholder.svg'}
                alt={name}
                fill
                className="object-contain rounded-md"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="h-full flex flex-col justify-between">
            <div className="space-y-4 ">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={condition === 'nuevo' ? 'default' : 'secondary'}
                >
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
                <p
                  className={`${
                    payments === 1 &&
                    discount > 0 &&
                    ' line-through text-neutral-500 font-semibold '
                  } text-2xl font-bold`}
                >
                  {price === 0
                    ? 'Sin precio'
                    : `$${price.toLocaleString('es-AR')}`}
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
                  <p className="text-base font-semibold text-red-600">
                    Precio con descuento: $
                    {discountedPrice.toLocaleString('es-AR')} ({discount}% desc)
                  </p>
                )}
              </div>

              <div className="h-px bg-border" />

              <p className="text-gray-700">{description}</p>
            </div>

            <Button
              onClick={handleInterest}
              className="w-full hover:bg-sky-800 transition-all duration-200 ease-in-out  "
              disabled={state === 'vendido'}
            >
              Me interesa
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
