import Link from 'next/link'
export default function Header() {
  return (
    <header className="w-full bg-neutral-900 text-white">
      <div className=" w-full max-w-screen-xl mx-auto py-4 px-4 flex flex-col md:flex-row items-center justify-between">
        <Link href="/" className=" w-full">
          <h1 className="w-full text-3xl font-bold text-center md:text-left">
            Venta Garage - online
          </h1>
        </Link>
        <h3 className="w-full text-xl uppercase font-thin md:font-semibold text-center md:text-right">
          Adri & Barby
        </h3>
      </div>
    </header>
  )
}
