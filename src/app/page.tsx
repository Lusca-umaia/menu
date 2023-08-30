'use client'
import { useState } from 'react'

import Image from "next/image"

import logo from '../../public/image.jpg'

import Video from './components/Video/Video'

export default function Home() {
  const link = "https://classic.exame.com/wp-content/uploads/2016/12/madero-restaurante.jpg?quality=70&strip=info&w=680"
  const actions = [
    {
      title: 'Bulgogi Vegano + Chá Gelado',
      href: '#',
      link: "https://tagmeimages.azureedge.net/?q=70&url=https://tagmepub.azureedge.net/pubimg/thumbs/MenuItem/523786c0-aebf-11ec-b99f-5504017ee26a.jpg&w=80&h=80&output=jpg&dpr=2",
      description: "cogumelos, mini pimentões e cebola roxa tostados e pimenta gochujang... ",
      price: '49,00'
    },
    {
      title: 'Frango Empanado com Molho de Queijos + Chá Gelado',
      href: '#',
      link: "https://tagmeimages.azureedge.net/?q=70&url=https://tagmepub.azureedge.net/pubimg/thumbs/MenuItem/5e553b10-18b3-11ed-8c61-b7f633bde1ba.jpg&w=80&h=80&output=jpg&dpr=2",
      description: "Frango empanado (230g) • molho de queijos • house fries",
      price: '49,00'
    },
    {
      title: 'Ragu + Chá Gelado',
      description: "ragu de carne • batata baby confit • picles de moranga • farofa de pão • couve",
      link: "https://tagmeimages.azureedge.net/?q=70&url=https://tagmepub.azureedge.net/pubimg/thumbs/MenuItem/81b49120-afa2-11ec-827e-bfa70ccd62ce.jpg&w=80&h=80&output=jpg&dpr=2",
      href: '#',
      price: '100,00'
    }
  ]

  const steps = [
    { id: '01', name: 'Entradas', description: 'Vitae sed mi luctus laoreet.', href: '#', status: 'current' },
    { id: '02', name: 'Saladas', description: 'Cursus semper viverra.', href: '#', status: 'complete' },
    { id: '03', name: 'Principal', description: 'Cursus semper viverra.', href: '#', status: 'complete' },
    { id: '04', name: 'Drinks', description: 'Cursus semper viverra.', href: '#', status: 'complete' },
    { id: '05', name: 'Doces', description: 'Cursus semper viverra.', href: '#', status: 'complete' },
  ]

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const [selectButton, setSelectButton] = useState(1)

  const cardapioOptions = ['Cardápio Almoço', 'Bebidas', 'Drinks', 'Vinhos e Espumantes']

  return (
    <section className="bg-gray-100 min-h-screen max-w-5xl mx-auto my-0 relative w-full">
      <div className="flex gap-4 pt-3 pb-1.5 items-center bg-white w-full mx-auto px-4">
        <Image src={logo} alt="Logo do site" className="w-20 h-20 " />
        {/* rounded-full border-2 shadow */}
        <div className='flex flex-col'>
          <h1 className="font-bold text-sm">Roister - Rua 24 de outubro</h1>
          <h2 className="font-medium text-xs ext-gray-300">Cantina & Italiano</h2>
        </div>
      </div>
      <header className="flex flex-col bg-white top-0 sticky z-10 pt-1.5 shadow-lg ease-linear duration-100" id='header'>
        <section className="flex gap-3.5 min-w-full overflow-auto scroll-remove px-2 pb-2 scrollStyle">
          {cardapioOptions.map((item, index) => (
            <button
              key={item + index}
              type="button"
              className={`${index == 0 ?
                "bg-white px-8 py-2 text-sm font-bold text-black w-auto border-black border-2 whitespace-nowrap" :
                "bg-white px-8 py-2 text-sm font-medium text-gray-700 border-2 w-auto whitespace-nowrap"} `}
            >
              {item}
            </button>
          ))}
        </section>
      </header >
      <main className="flex flex-col ">
        <div>
          <h2 className="pl-4 my-5 font-semibold text-base">Cardápio Almoço</h2>
          <div className="divide-y divide-gray-200 overflow-hidden sm:grid grid-cols-2 sm:gap-px sm:divide-y-0 shadowAlter">
            {actions.map((action, actionIdx) => (
              <div
                key={action.title}
                className={classNames(
                  'flex justify-between items-center gap-8 group relative bg-white p-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                )}
              >
                <div>
                  <h3 className="text-base font-medium leading-6 text-gray-900">
                    <a href={action.href} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {action.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-black font-light">
                    {action.description}
                  </p>
                  <p className="mt-2 text-sm text-black font-medium	">
                    R$ {action.price}
                  </p>
                </div>
                <img src={action.link} alt="" className="w-20 h-20" />
              </div>
            ))}
          </div>
        </div>
        <Video indexVideo={0} />
        <div>
          <h2 className="pl-4 my-5 font-semibold text-base">Cardápio Almoço</h2>
          <div className="divide-y divide-gray-200 overflow-hidden sm:grid grid-cols-2 sm:gap-px sm:divide-y-0 shadowAlter">
            {actions.map((action, actionIdx) => (
              <div
                key={action.title}
                className={classNames(
                  'flex justify-between items-center gap-8 group relative bg-white p-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                )}
              >
                <div>
                  <h3 className="text-base font-medium leading-6 text-gray-900">
                    <a href={action.href} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {action.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-black font-light">
                    {action.description}
                  </p>
                  <p className="mt-2 text-sm text-black font-medium	">
                    R$ {action.price}
                  </p>
                </div>
                <img src={action.link} alt="" className="w-20 h-20" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="pl-4 my-5 font-semibold text-base">Cardápio Almoço</h2>
          <div className="divide-y divide-gray-200 overflow-hidden sm:grid grid-cols-2 sm:gap-px sm:divide-y-0 shadowAlter">
            {actions.map((action, actionIdx) => (
              <div
                key={action.title}
                className={classNames(
                  'flex justify-between items-center gap-8 group relative bg-white p-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                )}
              >
                <div>
                  <h3 className="text-base font-medium leading-6 text-gray-900">
                    <a href={action.href} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {action.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-black font-light">
                    {action.description}
                  </p>
                  <p className="mt-2 text-sm text-black font-medium	">
                    R$ {action.price}
                  </p>
                </div>
                <img src={action.link} alt="" className="w-20 h-20" />
              </div>
            ))}
          </div>
        </div>
      </main >
    </section >
  )
}
