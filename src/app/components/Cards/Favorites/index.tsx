import { memo } from 'react'
import Link from "next/link"

function CardFavorites({ favorites }: { favorites: product[] }) {
  return (
    <div className='shadow-lg'>
      <h2 className="pl-4 my-5 font-semibold text-base">Produtos mais vendidos</h2>
      <div className="bg-gray-50 flex overflow-auto gap-4 scrollStyle pb-4 px-2">
        {favorites.map((product, index) => (
          <div
            key={product.title}
            className={"flex flex-col justify-between items-start gap-4 group relative bg-white min-w-[180px] max-w-[180px] shadow-md"}
          >
            <Link href={"/product"} className='h-full flex flex-col justify-between items-start gap-4 group w-full'>
              <div className='w-full flex flex-col gap-2'>
                <img src={product.link} alt={"Imagem do produto" + product.title} className="w-full h-40 object-cover" />
                <h3 className="text-sm font-medium leading-6 text-gray-900 px-2">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {product.title}
                </h3>
              </div>
              <p className="mt-2 text-xs text-black font-medium	px-2 py-2">
                R$ {product.price}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div >
  )
}

export default CardFavorites