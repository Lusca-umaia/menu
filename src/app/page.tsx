'use client'
import { useState } from 'react'

import Image from "next/image"

import drink from '../../public/drinks.jpg'

import logo from '../../public/image.jpg'

import Video from './components/Video/Video'

import hb from '../../public/images.jpg'

export default function Home() {
  const link = "https://guiadohamburguer.com/wp-content/uploads/2020/09/old-man-sandwich.jpg"
  const actions = [
    {
      title: 'Bulgogi Vegano + Chá Gelado',
      href: '#',
      description: "cogumelos, mini pimentões e cebola roxa tostados e pimenta gochujang... ",
      price: '49,00'
    },
    {
      title: 'Frango Empanado com Molho de Queijos + Chá Gelado',
      href: '#',
      description: "Frango empanado (230g) • molho de queijos • house fries",
      price: '49,00'
    },
    {
      title: 'Ragu + Chá Gelado',
      description: "ragu de carne • batata baby confit • picles de moranga • farofa de pão • couve",
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
    <section className="bg-gray-50 min-h-[100vh] max-w-[1000px] mx-auto my-0 relative">
      <div className="flex gap-4 pl-4 py-2 items-center bg-white">
        <Image src={logo} alt="Logo do site" className="w-[90px] h-[90px] rounded-xl max-[475px]:w-[80px] max-[475px]:h-[80px]" />
        <h1 className="font-bold text-xl">Roister - Rua 24 de outubro</h1>
      </div>
      <header className="flex flex-col bg-white top-[0] pt-2	sticky z-10">
        <section className="flex gap-3 min-w-full overflow-auto px-4 pb-3">
          <button
            type="button"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-4 ring-inset ring-indigo-200 hover:bg-gray-50 min-w-[180px]"
          >
            Cardápio Almoço
          </button>
          <button
            type="button"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 min-w-[140px]"
          >
            Bebidas
          </button>
          <button
            type="button"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 min-w-[140px]"
          >
            Drinks
          </button>
          <button
            type="button"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 min-w-[180px]"
          >
            Vinhos e Espumante
          </button>
        </section>
        <div>
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
                          className="absolute bg-indigo-600 bottom-0 top-auto h-1 w-full"
                          aria-hidden="true"
                        />
                        <span
                          className={classNames(
                            stepIdx !== 0 ? 'lg:pl-9' : '',
                            'flex items-center px-6 py-2 text-sm font-medium'
                          )}
                        >
                          <span className="ml-4 mt-0.5 flex  flex-col">
                            <span className="text-sm font-medium text-indigo-600">{step.name}</span>
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
                          <span className="flex-shrink-0">
                            {/* <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                              <span className="text-gray-500">{step.id}</span>
                            </span> */}
                          </span>
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
        </div>
      </header>
      <main className="flex flex-col ">
        <Video indexVideo={0} />
        <div>
          <h2 className="pl-4 my-3 font-semibold text-sm">Cardápio Almoço</h2>
          <div className="divide-y divide-gray-200 overflow-hidden rounded-lg shadow sm:grid grid-cols-2 sm:gap-px sm:divide-y-0 max-[775px]:grid-cols-1">
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
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    <a href={action.href} className="focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      {action.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-black font-light">
                    {action.description}
                  </p>
                  <p className="mt-2 text-sm text-black font-semibold	">
                    R$ {action.price}
                  </p>
                </div>
                <Image src={hb} alt="Imagem do produto" className="w-[90px] h-[90px] rounded-xl max-[475px]:w-[80px] max-[475px]:h-[80px]" />
              </div>
            ))}
          </div>
        </div>
      </main >
    </section >
  )
}
