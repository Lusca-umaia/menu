import Video from '../components/Video/Video'

import Link from 'next/link'

import { ChevronLeftIcon } from '@heroicons/react/20/solid'

export default function Product() {
    return (
        <section className="bg-white min-h-screen relative w-full relative max-w-lg mx-auto my-0">
            <div className='bg-gray-100 flex items-center py-2 divide-y w-full'>
                <Link href={"/"} className='w-full'>
                    <button
                        type="button"
                        className="inline-flex items-center gap-x-1.5 bg-gray-100 px-2.5 py-1.5 text-sm font-semibold text-black w-full "
                    >
                        <ChevronLeftIcon className="-mr-0.5 h-8 w-8" aria-hidden="true" />
                        Voltar
                    </button >
                </Link>
            </div>
            <div className="sticky top-0 z-10 w-full flex flex-col shadowAll">
                <img src="https://www.goomer.app/webmenu/muza-restaurante/product/5055134/picture/large/230826220826" alt="Product" className="w-full h-60 object-cover" />
            </div>
            <div className="bg-white flex flex-col gap-2  z-20 sticky">
                <h1 className="text-left text-lg font-medium mt-4 px-4">2 clássicos pelo preço de 1</h1>
                <p className="text-left text-sm text-gray-700 font-normal px-4">Todas as cervejas do Roister com 30% de desconto. Verifique a disponibilidade atual no nosso cardápio físico.</p>
                <span className="text-sm text-black font-medium px-4">R$ 25,90</span>
            </div>
        </section>
    )
}