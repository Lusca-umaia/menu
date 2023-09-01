'use client'
import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

export default function Nav() {
    const cardapioOptions = ['Cardápio Almoço', 'Bebidas', 'Drinks', 'Vinhos e Espumantes']

    const [selectButton, setSelectButton] = useState(0)

    function scrollToSection(elementId: string, index: number) {
        const element = document.getElementById(elementId);
        let nav = document.getElementById('nav')

        if (element) {
            nav ? nav.scrollLeft = element.offsetLeft - 2 : null
            setSelectButton(index)
        }
    }

    function scrollToSectionNew(elementId: string) {
        const element = document.getElementById(elementId)?.offsetTop;

        if (element) {
            window.scroll({
                top: element - 50,
                behavior: "smooth"
            })
        }
    }

    function animeScroll() {
        const items = document.querySelectorAll('[data-anime]')
        const windowTop = window.scrollY

        for (let index = 0; index < items.length; index++) {
            if (index == 0 && index != items.length - 1) {
                // @ts-ignore
                if (windowTop >= items[index].offsetTop - 100 && windowTop < items[index + 1].offsetTop - 100) {
                    scrollToSection(items[index].attributes[1].value, index)
                }

            }

            else if (index == items.length - 1) {
                // @ts-ignore
                if (windowTop > (items[index].offsetTop - 300)) {
                    scrollToSection(items[index].attributes[1].value, index)
                }
            }
            else {
                // @ts-ignore
                if (windowTop >= items[index].offsetTop - 100 && windowTop < items[index + 1].offsetTop - 100) {
                    scrollToSection(items[index].attributes[1].value, index)
                }
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            animeScroll()
        })

    }, [])


    return (
        <nav className="flex flex-col bg-white top-0 sticky z-10 pt-1.5 shadow-lg ease-linear duration-700 opacity-100" id='header'>
            <section className="flex gap-3.5 min-w-full overflow-auto scroll-remove px-2 pb-2 scrollStyle" id='nav'>
                {cardapioOptions.map((item, index) => (
                    <button
                        key={item + index}
                        type="button"
                        onClick={() => { scrollToSectionNew(`item${index + 1}`) }}
                        id={"button" + (index + 1)}
                        className={`${index == selectButton ?
                            "bg-white px-8 py-2 text-sm font-bold text-black w-auto border-black border-2 whitespace-nowrap buttons" :
                            "bg-white px-8 py-2 text-sm font-medium text-gray-700 border-2 w-auto whitespace-nowrap buttons"} `}
                    >
                        {item}
                    </button>
                ))}
            </section>
        </nav >
    )
}
