import { Product } from '@/app/page'
export async function getProducts(): Promise<Product[]> {
  const csvUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vS2SE4rnoKV7wQIT95DvBJ4OKpUpQgoC2pk3UCc7Kisz4oscDjIICTVgfCWEroyXxEv_VGJVZ42KK4e/pub?gid=0&single=true&output=csv'

  const response = await fetch(csvUrl)
  const csvData = await response.text()

  const rows = csvData.split('\n').slice(1) // Remover la primera fila (cabecera)

  const products = rows
    .map((row, index) => {
      const columns = row.split(',')

      // Validar que haya suficientes columnas y datos válidos
      if (columns.length < 6 || !columns[1] || !columns[2]) return null

      return {
        id: index.toString(),
        category: columns[0].trim(),
        name: columns[1].trim(),
        price: parseFloat(columns[2].trim()),
        condition: columns[3].trim() as 'nuevo' | 'usado', // Ajustar el tipo si corresponde
        state: columns[4].trim() as 'disponible' | 'vendido',
        description: columns[5].trim(),
        image: columns[6].trim(),
      }
    })
    .filter((product): product is Product => product !== null) // Tipo específico para eliminar nulos

  return products
}
