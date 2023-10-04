import { useState, useEffect, useCallback, memo } from 'react'
import { HeartIcon } from '@heroicons/react/20/solid'

function Footer() {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, [])

  useEffect(() => {

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  return (
    <footer className={`fixed bottom-0 font-medium z-40 bg-white w-full p-3.5 max-w-lg shadowAlter text-center duration-500 ${scrolled ? "opacity-0" : "opacity-100"}`}>
      <p className='flex justify-center gap-1 text-sm'>Feito com <HeartIcon width={20} color='red' /> por MENUK</p>
    </footer>
  )
}

export default Footer