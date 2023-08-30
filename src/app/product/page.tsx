import Video from '../components/Video/Video'

import Link from 'next/link'

import { ChevronLeftIcon } from '@heroicons/react/20/solid'

export default function Product() {
    return (
        <section className="bg-white min-h-screen relative w-full relative max-w-lg mx-auto my-0">
            <div className='border-b-2 border-gray-200 bg-white flex items-center py-2 divide-y'>
                <Link href={"/"}>
                    <button
                        type="button"
                        className="inline-flex items-center gap-x-1.5 bg-white px-2.5 py-1.5 text-sm font-semibold text-black w-full "
                    >
                        <ChevronLeftIcon className="-mr-0.5 h-8 w-8" aria-hidden="true" />
                        Voltar
                    </button >
                </Link>
            </div>
            <div className="bg-white flex flex-col gap-2  z-20 sticky">
                <h1 className="text-left text-xl font-medium mt-4 px-4">2 clássicos pelo preço de 1</h1>
                <p className="text-left text-base text-gray-700 font-normal px-4">Todas as cervejas do Roister com 30% de desconto. Verifique a disponibilidade atual no nosso cardápio físico.</p>
                <span className="text-base text-black font-medium px-4">R$ 25,90</span>
                <div className='mt-5'>
                    <Video indexVideo={0} description={false} />
                </div>
            </div>
        </section>
    )
}