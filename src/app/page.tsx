'use client'
import { useState } from 'react'

import Image from "next/image"

import drink from '../../public/drinks.jpg'

import logo from '../../public/image.jpg'

import Video from './components/Video/Video'

import moldura from '../../public/moldura.png'

import hb from '../../public/images.jpg'

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

  return (
    <>
      {/* <img src={link} alt="" width={"100%"} className='absolute top-0' /> */}
      <section className="bg-gray-100 min-h-[100vh] max-w-[1000px] mx-auto my-0 relative w-[100%] rounded-[10px]">
        <div className="flex gap-4 py-2 items-center bg-white justify-between	w-[100%] mx-auto px-4">
          <h1 className="font-bold text-base">Roister - Rua 24 de outubro</h1>
          <Image src={logo} alt="Logo do site" className="w-[60px] h-[60px] rounded-[50%] max-[475px]:w-[55px] max-[475px]:h-[55px] border-2 drop-shadow-md	" />
        </div>
        <header className="flex flex-col bg-white top-[0] pt-2 sticky z-10">
          <section className="flex min-w-full overflow-auto scroll-remove">
            <button
              type="button"
              className=" bg-white px-3.5 py-3.5 text-sm font-semibold text-black min-w-[180px] border-b-black border-b-2"
            >
              Cardápio Almoço
            </button>
            <button
              type="button"
              className=" bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-700 min-w-[auto] "
            >
              Bebidas
            </button>
            <button
              type="button"
              className=" bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-700 min-w-[auto] "
            >
              Drinks
            </button>
            <button
              type="button"
              className=" bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-700 min-w-[180px]"
            >
              Vinhos e Espumante
            </button>
          </section>
          {/* <div>
          <nav className="mx-auto " aria-label="Progress">
            <ol
              role="list"
              className="overflow-auto rounded-md flex rounded-none pb-3"
            >
              {steps.map((step, stepIdx) => (
                <li key={step.id} className="relative overflow-hidden flex-1 min-w-[130px] border-b border-t border-gray-200">
                  <div
                    className={classNames(
                      'overflow-hidden border border-gray-200 border-0'
                    )}
                  >
                    {step.status === 'current' ? (
                      <a href={step.href} aria-current="step">
                        <span
                          className="absolute bg-black bottom-0 top-auto h-1 w-full"
                          aria-hidden="true"
                        />
                        <span
                          className={classNames(
                            stepIdx !== 0 ? 'lg:pl-9' : '',
                            'flex items-center px-6 py-2 text-sm font-medium'
                          )}
                        >
                          <span className="ml-4 mt-0.5 flex  flex-col">
                            <span className="text-sm font-medium text-black">{step.name}</span>
                          </span>
                        </span>
                      </a>
                    ) : (
                      <a href={step.href} className="group">
                        <span
                          className="absolute left-0 top-0 h-full bg-transparent lg:bottom-0 lg:top-auto lg:h-1 w-full"
                          aria-hidden="true"
                        />
                        <span
                          className={classNames(
                            stepIdx !== 0 ? 'lg:pl-9' : '',
                            'flex items-center px-6 py-2 text-sm font-medium'
                          )}
                        >
                          <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                            <span className="text-sm font-medium text-gray-500">{step.name}</span>
                          </span>
                        </span>
                      </a>
                    )}

                    {stepIdx !== 0 ? (
                      <>
                        <div className="absolute inset-0 left-0 top-0 w-3 block" aria-hidden="true">
                          <svg
                            className="h-full w-full text-gray-300"
                            viewBox="0 0 12 82"
                            fill="none"
                            preserveAspectRatio="none"
                          >
                            <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
                          </svg>
                        </div>
                      </>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div> */}
        </header>
        <main className="flex flex-col ">
          <div>
            <h2 className="pl-4 my-5 font-semibold text-base">Cardápio Almoço</h2>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg drop-shadow-xl sm:grid grid-cols-2 sm:gap-px sm:divide-y-0 max-[775px]:grid-cols-1">
              {actions.map((action, actionIdx) => (
                <div
                  key={action.title}
                  className={classNames(
                    actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                    actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                    actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                    actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
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
                  <img src={action.link} alt="" className="w-[90px] h-[90px] rounded-xl max-[475px]:w-[80px] max-[475px]:h-[80px]" />
                </div>
              ))}
            </div>
          </div>
          <Video indexVideo={0} />
          <div>
            <h2 className="pl-4 my-5 font-semibold text-base">Cardápio Almoço</h2>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg drop-shadow-xl sm:grid grid-cols-2 sm:gap-px sm:divide-y-0 max-[775px]:grid-cols-1">
              {actions.map((action, actionIdx) => (
                <div
                  key={action.title}
                  className={classNames(
                    actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                    actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                    actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                    actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
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
                  <img src={action.link} alt="" className="w-[90px] h-[90px] rounded-xl max-[475px]:w-[80px] max-[475px]:h-[80px]" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="pl-4 my-5 font-semibold text-base">Cardápio Almoço</h2>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg drop-shadow-xl sm:grid grid-cols-2 sm:gap-px sm:divide-y-0 max-[775px]:grid-cols-1">
              {actions.map((action, actionIdx) => (
                <div
                  key={action.title}
                  className={classNames(
                    actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                    actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                    actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                    actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
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
                  <img src={action.link} alt="" className="w-[90px] h-[90px] rounded-xl max-[475px]:w-[80px] max-[475px]:h-[80px]" />
                </div>
              ))}
            </div>
          </div>
        </main >
      </section >
    </>
  )
}
