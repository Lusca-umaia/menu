'use client'
import { useState, useEffect, useRef, Fragment } from 'react'

import Link from 'next/link'
import { gaPlayVideo, gaViewVideo100, gaViewVideo25, gaViewVideo50, gaViewVideo75 } from "./components/Video/gtagHelper";

import Image from "next/image"

import Nav from './components/Nav'
import Card from './components/Cards/Default/index'
import CardFavorites from './components/Cards/Favorites/index'
import Footer from './components/Footer'
import Video from './components/Video/Video'

import logo from '../../public/image.jpg'

const mediaItems = [
  {
    type: 'card',
    title: 'Cardápio Almoço',
    products: [
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
      },
      {
        title: 'Ragu + Chá Gelado Com Ervas',
        description: "ragu de carne • batata baby confit • picles de moranga • farofa de pão • couve",
        link: "https://tagmeimages.azureedge.net/?q=70&url=https://tagmepub.azureedge.net/pubimg/thumbs/MenuItem/81b49120-afa2-11ec-827e-bfa70ccd62ce.jpg&w=80&h=80&output=jpg&dpr=2",
        href: '#',
        price: '100,00'
      }
    ]
  },
  {
    type: 'video',
    order: 0,
    url: "https://storage.googleapis.com/menuk/lb-involtini_1.mp4",
    title: "Involtini al Quattro Formaggi - R$ 42",
    subtitle: "A combinação dos quatro queijos que todo mundo ama! Mozzarella, catupiry, provolone e gorgonzola, enrolados pela nossa massa de pizza de longa fermentação, importasse diretamente da Itália",
    preload: "auto"
  },
  {
    type: 'card',
    title: 'Bebidas',
    products: [
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
      },
      {
        title: 'Ragu + Chá Gelado Com Ervas',
        description: "ragu de carne • batata baby confit • picles de moranga • farofa de pão • couve",
        link: "https://tagmeimages.azureedge.net/?q=70&url=https://tagmepub.azureedge.net/pubimg/thumbs/MenuItem/81b49120-afa2-11ec-827e-bfa70ccd62ce.jpg&w=80&h=80&output=jpg&dpr=2",
        href: '#',
        price: '100,00'
      }
    ]
  },
  {
    type: 'card',
    title: 'Drinks',
    products: [
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
      },
      {
        title: 'Ragu + Chá Gelado Com Ervas',
        description: "ragu de carne • batata baby confit • picles de moranga • farofa de pão • couve",
        link: "https://tagmeimages.azureedge.net/?q=70&url=https://tagmepub.azureedge.net/pubimg/thumbs/MenuItem/81b49120-afa2-11ec-827e-bfa70ccd62ce.jpg&w=80&h=80&output=jpg&dpr=2",
        href: '#',
        price: '100,00'
      }
    ]
  },
  {
    type: 'card',
    title: 'Vinhos e espumantes',
    products: [
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
      },
      {
        title: 'Ragu + Chá Gelado Com Ervas',
        description: "ragu de carne • batata baby confit • picles de moranga • farofa de pão • couve",
        link: "https://tagmeimages.azureedge.net/?q=70&url=https://tagmepub.azureedge.net/pubimg/thumbs/MenuItem/81b49120-afa2-11ec-827e-bfa70ccd62ce.jpg&w=80&h=80&output=jpg&dpr=2",
        href: '#',
        price: '100,00'
      }
    ]
  },
]

const cards = mediaItems.filter(item => item.type == 'card')
const videos_url = mediaItems.filter(item => item.type == 'video') as video[]

const navItems = cards.map((item) => item.title)

const favorites = [
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


export default function Home() {
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const header = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [videoLiked, setVideoLiked] = useState(Array(videos_url.length).fill(false));
  const [videoProgress, setVideoProgress] = useState(Array(videos_url.length).fill(0));
  const hasFired25Event = useRef(videos_url.map(() => false));
  const hasFired50Event = useRef(videos_url.map(() => false));
  const hasFired75Event = useRef(videos_url.map(() => false))
  const hasFired100Event = useRef(videos_url.map(() => false))

  useEffect(() => {
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target as HTMLVideoElement;
          const videoIndex = videoRefs.current.indexOf(video);
          if (entry.isIntersecting) {
            if (videoRefs.current[videoIndex]) {
              videoRefs.current[videoIndex].play();
              header.current ? header.current.style.zIndex = '2' : null
              if (!isPlaying) {
                gaPlayVideo(videos_url[videoIndex].url)
                setIsPlaying(true);
                setShowButton(false)
                hasFired25Event.current[videoIndex] = false;
                hasFired50Event.current[videoIndex] = false;
                hasFired75Event.current[videoIndex] = false;
                hasFired100Event.current[videoIndex] = false;
              }
            }
          } else {
            if (videoRefs.current[videoIndex]) {
              videoRefs.current[videoIndex].pause();
              header.current ? header.current.style.opacity = '0' : null
              setTimeout(() => {
                header.current ? header.current.style.zIndex = '20' : null
                header.current ? header.current.style.opacity = '1' : null
              }, 100);

            }
          }
        });
      },
      {
        threshold: 0.25
      }
    );

    const handleTimeUpdate = (index: number) => () => {
      const video = videoRefs.current[index];
      const progress = (video.currentTime / video.duration) * 100;
      triggerPercentVideoPlayed(progress, index);
      setVideoProgress((prev) => {
        const copy = [...prev];
        copy[index] = progress;
        return copy;
      });
    };

    const triggerPercentVideoPlayed = (percent: number, index: number) => {
      if (percent >= 25 && !hasFired25Event.current[index]) {
        gaViewVideo25(videos_url[index].url)
        hasFired25Event.current[index] = true;
      }
      if (percent >= 50 && !hasFired50Event.current[index]) {
        gaViewVideo50(videos_url[index].url)
        hasFired50Event.current[index] = true;
      }
      if (percent >= 75 && !hasFired75Event.current[index]) {
        gaViewVideo75(videos_url[index].url)
        hasFired75Event.current[index] = true;
      }
      if (percent >= 99 && !hasFired100Event.current[index]) {
        gaViewVideo100(videos_url[index].url)
        hasFired100Event.current[index] = true;
      }
    }

    videoRefs.current.forEach((video, videoIndex) => {
      if (video) {
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('timeupdate', handleTimeUpdate(videoIndex));
        observer.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video, videoIndex) => {
        // Verifique se o vídeo existe e ainda está conectado ao DOM antes de tentar desobservá-lo
        if (video && video.isConnected) {
          observer.unobserve(video);
          video.removeEventListener('timeupdate', handleTimeUpdate(videoIndex));
          video.removeEventListener('waiting', handleWaiting);
          video.removeEventListener('canplay', handleCanPlay);
        }
      });
    };
  }, []);

  return (
    <section className="bg-gray-100 min-h-screen max-w-lg mx-auto my-0 relative w-full">
      <header className="flex gap-4 pt-3 pb-1.5 items-center bg-white w-full mx-auto px-4">
        <Image src={logo} alt="Logo do site" className="w-20 h-20 " />
        <div className='flex flex-col'>
          <h1 className="font-bold text-sm">Roister - Rua 24 de outubro</h1>
          <h2 className="font-medium text-xs ext-gray-300">Cantina & Italiano</h2>
        </div>
      </header>
      <Nav
        navItems={navItems}
        ref={header}
      />
      <main className="flex flex-col ">
        <CardFavorites favorites={favorites} />
        {mediaItems && mediaItems.map((item, index) => (
          <Fragment key={item.title}>
            {item.type == "card" ? (
              <Card
                title={item.title}
                products={item.products ? item.products : []}
                buttonId={`button${item.title}`}
                idElement={item.title}
              />
            ) : (
              <Video
                setVideoLiked={setVideoLiked}
                preload={item.preload ? item.preload : ''}
                videoRefs={videoRefs}
                url={item.url ? item.url : ''}
                title={item.title}
                videoLiked={videoLiked}
                isLoading={isLoading}
                isPlaying={isPlaying}
                videoProgress={videoProgress}
                setIsPlaying={setIsPlaying}
                showButton={showButton}
                setShowButton={setShowButton}
                subtitle={item.subtitle ? item.subtitle : ''}
                indexVideo={item.order ? item.order : 0}
                description={true} />
            )}
          </Fragment>
        ))}
      </main >
      <Footer />
    </section >
  )
}
