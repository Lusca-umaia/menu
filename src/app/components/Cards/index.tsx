'use client'
import Link from "next/link"

interface product {
    title: string, href: string, description: string, price: string, link: string
}

export default function Cards({ products, title }: { products: product[], title: string }) {

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div>
            <h2 className="pl-4 my-5 font-semibold text-base">{title}</h2>
            <div className="divide-y divide-gray-200 overflow-hidden sm:grid grid-cols-1 sm:gap-px sm:divide-y-0 shadowAlter">
                {products.map((product, index) => (
                    <Link href={"/product"}>
                        <div
                            key={product.title + index}
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