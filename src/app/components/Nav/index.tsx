'use client'
import React, { useEffect, useRef, forwardRef, useState, useCallback } from 'react';

import Link from 'next/link';

const Nav = forwardRef(({ navItems }: { navItems: string[] }, ref) => {
    const [buttonSelected, setButtonSelected] = useState(0)
    
    function scrollToSection(elementId: string, index: number) {
        const element = document.getElementById(elementId);
        let nav = document.getElementById('nav')

        if (element) {
            nav ? nav.scrollLeft = element.offsetLeft - 2 : null
            setButtonSelected(index)
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
        const items = document.querySelectorAll('[data-anime]') as NodeListOf<HTMLHeadElement>
        const windowTop = window.scrollY

        for (let index = 0; index < items.length; index++) {
            if (index == 0 && index != items.length - 1) {
                if (windowTop >= items[index].offsetTop - 100 && windowTop < items[index + 1].offsetTop - 100) {
                    scrollToSection(items[index].attributes[1].value, index)
                }

            }

            else if (index == items.length - 1) {
                if (windowTop > (items[index].offsetTop - 300)) {
                    scrollToSection(items[index].attributes[1].value, index)
                }
            }
            else {
                if (windowTop >= items[index].offsetTop - 100 && windowTop < items[index + 1].offsetTop - 100) {
                    scrollToSection(items[index].attributes[1].value, index)
                }
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', animeScroll)

        return () => window.removeEventListener("scroll", animeScroll);
    }, [])

    return (
        //@ts-ignore
        <nav className="flex flex-col bg-white top-0 sticky z-10 pt-1.5 shadow-lg ease-linear duration-700 opacity-100" id='header' ref={ref}>
            <section className="flex gap-3.5 min-w-full overflow-auto scroll-remove px-2 pb-2 scrollStyle" id='nav'>
                {navItems.map((item, index) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => { scrollToSectionNew(item) }}
                        id={`button${item}`}
                        className={`${index == buttonSelected ?
                            "bg-white px-8 py-2 text-sm font-bold text-black w-auto border-black border-2 whitespace-nowrap buttons" :
                            "bg-white px-8 py-2 text-sm font-medium text-gray-700 border-2 w-auto whitespace-nowrap buttons"} `}
                    >
                        {item}
                    </button>
                ))}
            </section>
        </nav >
    )
})

export default Nav