'use client'
import { useState, useRef, useEffect } from 'react'

import Video from '../components/Video/Video'

import { gaPlayVideo, gaViewVideo100, gaViewVideo25, gaViewVideo50, gaViewVideo75 } from "../components/Video/gtagHelper";

import Link from 'next/link'

import { ChevronLeftIcon } from '@heroicons/react/20/solid'

const videos_url = [{
  type: 'video',
  order: 0,
  url: "https://storage.googleapis.com/menuk/lb-involtini_1.mp4",
  title: "Involtini al Quattro Formaggi - R$ 42",
  subtitle: "A combinação dos quatro queijos que todo mundo ama! Mozzarella, catupiry, provolone e gorgonzola, enrolados pela nossa massa de pizza de longa fermentação, importasse diretamente da Itália",
  preload: "auto"
}]

export default function Product() {
  const videoRefs = useRef<HTMLVideoElement[]>([]);
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
    <section className="bg-white min-h-screen w-full relative max-w-lg mx-auto my-0 ">
      <div className='bg-gray-100 flex items-center py-2 divide-y w-full'>
        <Link href={"/"} className='w-full'>
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 bg-gray-100 px-2.5 py-1.5 text-sm font-semibold text-black w-full "
          >
            <ChevronLeftIcon className="-mr-0.5 h-8 w-8" aria-hidden="true" />
            Voltar
          </button >
        </Link>
      </div>
      <div className="bg-white flex flex-col gap-2 z-20 sticky shadowAll">
        <h1 className="text-left text-lg font-medium mt-4 px-4">2 clássicos pelo preço de 1</h1>
        <p className="text-left text-sm text-gray-700 font-normal px-4">Todas as cervejas do Roister com 30% de desconto. Verifique a disponibilidade atual no nosso cardápio físico.</p>
        <span className="text-sm text-black font-medium px-4">R$ 25,90</span>
        <div className='mt-5'>
          <Video
            setVideoLiked={setVideoLiked}
            preload={videos_url[0].preload}
            videoRefs={videoRefs}
            url={videos_url[0].url}
            title={videos_url[0].title}
            videoLiked={videoLiked}
            isLoading={isLoading}
            isPlaying={isPlaying}
            videoProgress={videoProgress}
            setIsPlaying={setIsPlaying}
            showButton={showButton}
            setShowButton={setShowButton}
            subtitle={videos_url[0].subtitle}
            indexVideo={videos_url[0].order}
            description={true} />
        </div>
      </div>
    </section>
  )
}