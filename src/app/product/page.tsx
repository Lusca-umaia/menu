import { StarIcon, CheckCircleIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const actions = [
    {
        title: 'Suco de abacaxi',
        href: '#',
        link: "https://tagmeimages.azureedge.net/?q=70&url=https://tagmepub.azureedge.net/pubimg/thumbs/MenuItem/523786c0-aebf-11ec-b99f-5504017ee26a.jpg&w=80&h=80&output=jpg&dpr=2",
        description: "cogumelos, mini pimentões e cebola roxa tostados e pimenta gochujang... ",
        price: '49,00'
    },
    {
        title: 'Refrigerante',
        href: '#',
        link: "https://tagmeimages.azureedge.net/?q=70&url=https://tagmepub.azureedge.net/pubimg/thumbs/MenuItem/5e553b10-18b3-11ed-8c61-b7f633bde1ba.jpg&w=80&h=80&output=jpg&dpr=2",
        description: "Frango empanado (230g) • molho de queijos • house fries",
        price: '49,00'
    },
    {
        title: 'Chá Gelado',
        description: "ragu de carne • batata baby confit • picles de moranga • farofa de pão • couve",
        link: "https://tagmeimages.azureedge.net/?q=70&url=https://tagmepub.azureedge.net/pubimg/thumbs/MenuItem/81b49120-afa2-11ec-827e-bfa70ccd62ce.jpg&w=80&h=80&output=jpg&dpr=2",
        href: '#',
        price: '100,00'
    }
]


export default function Product() {
    return (
        <>
            <div className='flex items-center border-b-2 border-b-gray-50 py-2'>
                <button
                    type="button"
                    className="inline-flex items-center gap-x-1.5 bg-white px-2.5 py-1.5 text-sm font-semibold text-black w-full "
                >
                    <ChevronLeftIcon className="-mr-0.5 h-8 w-8" aria-hidden="true" />
                    Voltar
                </button >
            </div>
            <section className="bg-white min-h-screen my-0 relative w-full relative">
                <div className="sticky top-0 z-[2] w-full flex flex-col">
                    {/* <img src="https://cdn.icon-icons.com/icons2/2131/PNG/512/back_arrow_icon_131563.png" alt="ícone de retorno" className="absolute top-4 shadow-lg border-2 p-2 bg-gray-200 rounded-full w-10 left-2" /> */}
                    <img src="https://www.goomer.app/webmenu/muza-restaurante/product/5055134/picture/large/230826220826" alt="Product" className="w-full h-60 object-cover" />
                </div>
                <div className="bg-white flex flex-col gap-2 shadowAlter z-[5] sticky min-h-screen">
                    <h1 className="text-left text-xl font-semibold mt-4 px-4">2 clássicos pelo preço de 1</h1>
                    <p className="text-left text-base text-gray-700 px-4">Todas as cervejas do Roister com 30% de desconto. Verifique a disponibilidade atual no nosso cardápio físico.</p>
                    <span className="text-base text-black font-semibold px-4">R$ 25,90 <span className="ml-2 text-sm text-gray-500 line-through">R$ 35,00</span></span>
                    <div>
                        <h2 className="pl-4 my-5 font-semibold text-base">Bebidas</h2>
                        <div className="divide-y divide-gray-200 overflow-hidden sm:grid grid-cols-2 sm:gap-px sm:divide-y-0 shadowAlter">
                            {actions.map((action, actionIdx) => (
                                <div className='flex justify-between items-center p-4'>
                                    <div
                                        key={action.title}
                                        className={classNames(
                                            'flex justify-start items-center gap-4 group relative bg-white focus-within:ring-2 focus-within:ring-inset'
                                        )}
                                    >
                                        <img src={action.link} alt="" className="w-20 h-20" />
                                        <div>
                                            <h3 className="text-sm font-medium leading-6 text-gray-900">
                                                <a href={action.href} className="focus:outline-none">
                                                    <span className="absolute inset-0" aria-hidden="true" />
                                                    {action.title}
                                                </a>
                                            </h3>
                                        </div>
                                    </div>
                                    <input
                                        // aria-describedby={`${plan.id}-description`}
                                        name="plan"
                                        type="radio"
                                        checked
                                        value={'teste'}
                                        // defaultChecked={plan.id === 'small'}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}