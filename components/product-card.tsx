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

export function ProductCard({
  id,
  name,
  price,
  description,
  image,
  condition,
}: Product) {
  const handleInterest = () => {
    const message = encodeURIComponent(
      `Hola, me interesa: ${name}. Precio: $${price}. Descripción: ${description}`
    )
    window.open(`https://wa.me/541164689680?text=${message}`, '_blank')
  }

  return (
    <Card className="w-full">
      <CardHeader className="relative">
        <CardTitle className="text-lg">{name}</CardTitle>
        <Badge
          variant={condition === 'new' ? 'default' : 'secondary'}
          className="absolute top-4 right-4"
        >
          {condition === 'new' ? 'Nuevo' : 'Usado'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="aspect-square relative mb-4">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p className="text-2xl font-bold">${price.toFixed(2)}</p>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleInterest} className="w-full">
          Me interesa
        </Button>
      </CardFooter>
    </Card>
  )
}
