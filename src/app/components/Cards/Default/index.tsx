'use client'
import { memo } from 'react'
import Link from "next/link"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Cards({ products, title, buttonId, idElement }: { products: product[], title: string, buttonId: string, idElement: string }) {

  return (
    <div id={idElement} className="scroll-mt-14">
      <h2 className="pl-4 my-5 font-semibold text-base" data-anime={buttonId}>{title}</h2>
      <div className="grid divide-y divide-gray-200 overflow-hidden grid-cols-1 gap-px shadowAlter">
        {products.map((product, index) => (
          <Link href={"/product"} key={product.title}>
            <div
              className={classNames(
                'flex justify-between items-center gap-8 group relative bg-white p-4'
              )}
            >
              <div>
                <h3 className="text-base font-medium leading-6 text-gray-900">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {product.title}
                </h3>
                <p className="mt-2 text-sm text-black font-light">
                  {product.description}
                </p>
                <p className="mt-2 text-sm text-black font-medium	">
                  R$ {product.price}
                </p>
              </div>
              <img src={product.link} alt={"Imagem do produto" + product.title} className="w-20 h-20" />
            </div>
          </Link>
        ))}
      </div>
    </div >
  )
}

export default memo(Cards)