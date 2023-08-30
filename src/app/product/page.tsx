import Video from '../components/Video/Video'

import { StarIcon, CheckCircleIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'

export default function Product() {
    return (
        <section className="bg-white min-h-screen my-0 relative w-full relative">
            <div className='flex items-center border-b-2 border-b-gray-50 py-2'>
                <button
                    type="button"
                    className="inline-flex items-center gap-x-1.5 bg-white px-2.5 py-1.5 text-sm font-semibold text-black w-full "
                >
                    <ChevronLeftIcon className="-mr-0.5 h-8 w-8" aria-hidden="true" />
                    Voltar
                </button >
            </div>
            <div className="sticky top-0 z-10 w-full flex flex-col">
                <img src="https://www.goomer.app/webmenu/muza-restaurante/product/5055134/picture/large/230826220826" alt="Product" className="w-full h-60 object-cover" />
            </div>
            <div className="bg-white flex flex-col gap-2 shadowAlter z-20 sticky">
                <h1 className="text-left text-xl font-semibold mt-4 px-4">2 clássicos pelo preço de 1</h1>
                <p className="text-left text-base text-gray-700 px-4">Todas as cervejas do Roister com 30% de desconto. Verifique a disponibilidade atual no nosso cardápio físico.</p>
                <span className="text-base text-black font-semibold px-4">R$ 25,90 <span className="ml-2 text-sm text-gray-500 line-through">R$ 35,00</span></span>
                <div className='mt-5'>
                    <Video indexVideo={0} />
                </div>
            </div>
        </section>
    )
}