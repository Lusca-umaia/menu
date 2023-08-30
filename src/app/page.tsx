'use client'
import { useState, useEffect } from 'react'

import { HeartIcon } from '@heroicons/react/20/solid'

import Link from 'next/link'
import Image from "next/image"

import Cards from './components/Cards/index'
import Video from './components/Video/Video'

import logo from '../../public/image.jpg'

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  const products = [
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

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const [selectButton, setSelectButton] = useState(0)

  const cardapioOptions = ['Cardápio Almoço', 'Bebidas', 'Drinks', 'Vinhos e Espumantes']

  return (
    <section className="bg-gray-100 min-h-screen max-w-lg mx-auto my-0 relative w-full">
      <div className="flex gap-4 pt-3 pb-1.5 items-center bg-white w-full mx-auto px-4">
        <Image src={logo} alt="Logo do site" className="w-20 h-20 " />
        <div className='flex flex-col'>
          <h1 className="font-bold text-sm">Roister - Rua 24 de outubro</h1>
          <h2 className="font-medium text-xs ext-gray-300">Cantina & Italiano</h2>
        </div>
      </div>
      <nav className="flex flex-col bg-white top-0 sticky z-10 pt-1.5 shadow-lg ease-linear duration-700 opacity-100" id='header'>
        <section className="flex gap-3.5 min-w-full overflow-auto scroll-remove px-2 pb-2 scrollStyle">
          {cardapioOptions.map((item, index) => (
            <button
              key={item + index}
              type="button"
              className={`${index == selectButton ?
                "bg-white px-8 py-2 text-sm font-bold text-black w-auto border-black border-2 whitespace-nowrap" :
                "bg-white px-8 py-2 text-sm font-medium text-gray-700 border-2 w-auto whitespace-nowrap"} `}
            >
              {item}
            </button>
          ))}
        </section>
      </nav >
      <main className="flex flex-col ">
        <Cards title='Cardápio Almoço' products={products}></Cards>
        <Video indexVideo={0} description={true} />
        <Cards title='Bebidas' products={products}></Cards>
        <Cards title='Drinks' products={products}></Cards>
      </main >
      <footer className={`fixed bottom-0 font-medium z-40 bg-white w-full p-5 max-w-lg shadowAlter text-center duration-500 ${scrolled ? "opacity-0" : "opacity-100"}`}>
        <p className='flex justify-center gap-1'>Feito com <HeartIcon width={20} color='red' /> por MENUK</p>
      </footer>
    </section >
  )
}
