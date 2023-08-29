'use client'

import { gaMuteVideo, gaPauseVideo, gaPlayVideo, gaShareVideo, gaUnmuteVideo, gaViewVideo100, gaViewVideo25, gaViewVideo50, gaViewVideo75 } from "./gtagHelper";
import "./style.css";
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';

import Image from "next/image";

import Logo from '../../../../public/image.jpg'

const videos_url = [
    {
        url: "https://storage.googleapis.com/menuk/lb-involtini_1.mp4",
        title: "Involtini al Quattro Formaggi - R$ 42",
        subtitle: "A combinação dos quatro queijos que todo mundo ama! Mozzarella, catupiry, provolone e gorgonzola, enrolados pela nossa massa de pizza de longa fermentação, importasse diretamente da Itália",
        preload: "auto"
    },
    {
        url: "https://storage.googleapis.com/menuk/lb-r357.mp4",
        title: "Gnocchi alla Sorrentina - R$ 69",
        subtitle: "Gnocchi artesanal com molho de tomate italiano, queijos mozzarella e parmesão, folhas de manjericão, servido em uma cesta de massa de pizza que leva só 4 ingredientes: água, sal, farinha importada da Itália e fermento biológico.",
        preload: "auto"
    },
    {
        url: "https://storage.googleapis.com/menuk/lb-calzone-smores_1.mp4",
        title: "Calzone S'mores - R$ 55",
        subtitle: "Nutella e marshmallow envolto pela nossa tradicional massa de pizza de longa fermentação, em formato de calzone, que é assado no forno e finalizada com chocolate ao leite Lindt",
        preload: "auto"
    },
    {
        url: "https://storage.googleapis.com/menuk/lb-rdonluiz.mp4",
        title: "Expresso Mustache - R$ 34",
        subtitle: "O drink assinado pelo Mustache leva vodka, licor de doce de leite Don Luiz e café expresso! Uma uma ótima opção para acompanhar uma entrada ou sobremesa",
        preload: "auto"
    }
]


export default function Home({ indexVideo }: { indexVideo: number }) {
    const videoRefs = useRef<HTMLVideoElement[]>([]);
    const [isMuted, setIsMuted] = useState(true);
    const { width: widthX, height: heightX } = useWindowSize();
    const [videoProgress, setVideoProgress] = useState(Array(videos_url.length).fill(0));
    const [showButton, setShowButton] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const hasFired25Event = useRef(videos_url.map(() => false));
    const hasFired50Event = useRef(videos_url.map(() => false));
    const hasFired75Event = useRef(videos_url.map(() => false))
    const hasFired100Event = useRef(videos_url.map(() => false))
    const [videoLiked, setVideoLiked] = useState(Array(videos_url.length).fill(false));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleWaiting = () => setIsLoading(true);
        const handleCanPlay = () => setIsLoading(false);

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    const video = entry.target as HTMLVideoElement;
                    const videoIndex = videoRefs.current.indexOf(video);
                    if (entry.isIntersecting) {
                        setCurrentVideoIndex(videoIndex);  // Update current video index here
                        if (videoRefs.current[videoIndex]) {
                            videoRefs.current[videoIndex].play();
                            const element = document.getElementById('header')
                            element ? element.style.zIndex = '2' : null
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
                            const element = document.getElementById('header')

                            element ? element.style.opacity = '0' : null
                            setTimeout(() => {
                                element ? element.style.zIndex = '20' : null
                                element ? element.style.opacity = '1' : null
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

    const handleVideoClick = (index: any) => {
        const video: any = videoRefs.current[index];
        if (video.paused) {
            video.play();
            // Atualize o estado para indicar que o vídeo está tocando
            setIsPlaying(true);
            setShowButton(true);
            setTimeout(() => setShowButton(false), 1000);
        } else {
            video.pause();
            gaPauseVideo(videos_url[index].url);
            // Atualize o estado para indicar que o vídeo está pausado
            setIsPlaying(false);
            setShowButton(true);
        }
    };

    const handleMutedClick = (videoIndex: number) => {
        if (isMuted) gaUnmuteVideo(videos_url[videoIndex].url)
        else gaMuteVideo(videos_url[videoIndex].url)
        setIsMuted(!isMuted);
    };

    const handleShare = (videoIndex: number) => {
        if (navigator.share) {
            navigator.share({
                title: 'La Braciera',
                text: 'La Braciera',
                url: 'https://go.menuk.com.br/lb-share',
            })
                .then(() => {
                    console.log('Successful share')
                    gaShareVideo(videos_url[videoIndex].url)
                })
                .catch((error: any) => console.log('Error sharing', error));
        }
    };

    const handleLikeVideo = (videoIndex: number) => {
        setVideoLiked((prev) => {
            const copy = [...prev];
            copy[videoIndex] = !copy[videoIndex];
            return copy;
        });
    }

    const video = videos_url[indexVideo]

    return (
        <>
            {
                <div className="TqpeWW" id="containerVideo">
                    <div className="TcqeEa">
                        <video
                            ref={(element) => {
                                if (element) {
                                    videoRefs.current[indexVideo] = element;
                                }
                            }}
                            autoPlay={true}
                            muted={isMuted}
                            preload={video.preload}
                            playsInline={true}
                            loop={true}
                            className="TkdkJq">
                            <source src={video.url} type="video/mp4" />
                        </video>
                    </div>
                    <header className="isHzPS">
                        <div className="gmCcTH">
                            <Image src={"https://www.menuk.com.br/logo.jpg"} width={50} alt="logo" height={50} className="gmaXK" />
                            <h1 className="text-white">Roister</h1>
                        </div>
                        <div className="gmCcTH">
                            <div className="jWDGig">
                                <button className="cnTjGy" onClick={() => handleMutedClick(indexVideo)}>
                                    {isMuted ? (
                                        <svg width="34" height="34" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="white" stroke="white" strokeLinecap="round" stroke-miterlimit="10" stroke-width="25"
                                                d="M416 432L64 80" />
                                            <path fill="white" d="M224 136.92v33.8a4 4 0 001.17 2.82l24 24a4 4 0 006.83-2.82v-74.15a24.53 24.53 0 00-12.67-21.72 23.91 23.91 0 00-25.55 1.83 8.27 8.27 0 00-.66.51l-31.94 26.15a4 4 0 00-.29 5.92l17.05 17.06a4 4 0 005.37.26zM224 375.08l-78.07-63.92a32 32 0 00-20.28-7.16H64v-96h50.72a4 4 0 002.82-6.83l-24-24a4 4 0 00-2.82-1.17H56a24 24 0 00-24 24v112a24 24 0 0024 24h69.76l91.36 74.8a8.27 8.27 0 00.66.51 23.93 23.93 0 0025.85 1.69A24.49 24.49 0 00256 391.45v-50.17a4 4 0 00-1.17-2.82l-24-24a4 4 0 00-6.83 2.82zM125.82 336zM352 256c0-24.56-5.81-47.88-17.75-71.27a16 16 0 00-28.5 14.54C315.34 218.06 320 236.62 320 256q0 4-.31 8.13a8 8 0 002.32 6.25l19.66 19.67a4 4 0 006.75-2A146.89 146.89 0 00352 256zM416 256c0-51.19-13.08-83.89-34.18-120.06a16 16 0 00-27.64 16.12C373.07 184.44 384 211.83 384 256c0 23.83-3.29 42.88-9.37 60.65a8 8 0 001.9 8.26l16.77 16.76a4 4 0 006.52-1.27C410.09 315.88 416 289.91 416 256z" />
                                            <path fill="white" stroke-width="25" d="M480 256c0-74.26-20.19-121.11-50.51-168.61a16 16 0 10-27 17.22C429.82 147.38 448 189.5 448 256c0 47.45-8.9 82.12-23.59 113a4 4 0 00.77 4.55L443 391.39a4 4 0 006.4-1C470.88 348.22 480 307 480 256z" />
                                        </svg>

                                    ) : (
                                        <svg width="34" height="34" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="none" d="M126 192H56a8 8 0 00-8 8v112a8 8 0 008 8h69.65a15.93 15.93 0 0110.14 3.54l91.47 74.89A8 8 0 00240 392V120a8 8 0 00-12.74-6.43l-91.47 74.89A15 15 0 01126 192zM320 320c9.74-19.38 16-40.84 16-64 0-23.48-6-44.42-16-64M368 368c19.48-33.92 32-64.06 32-112s-12-77.74-32-112M416 416c30-46 48-91.43 48-160s-18-113-48-160"
                                                stroke="white" strokeLinecap="round" stroke-linejoin="round" stroke-width="25" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </header>
                    {(isMuted && !isLoading && false) &&
                        <div className="TkdAeq">
                            <button className="cnTjGy" onClick={() => setIsMuted(!isMuted)}>
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <circle cx="32" cy="32" r="32" fill="#161616" fillOpacity="0.6"></circle>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M27.2773 25.5879L26.8155 26.1094C26.7727 26.1526 26.7221 26.1871 26.6663 26.2112C26.6077 26.2364 26.5447 26.2497 26.4809 26.25H22C20.8683 26.25 20 27.1963 20 28.3V35.6988C20 36.8032 20.8678 37.75 22 37.75H26.471C26.536 37.7503 26.6001 37.7639 26.6596 37.79C26.7175 37.8154 26.7696 37.852 26.8131 37.8977L30.5441 42.1016L30.5574 42.1162C31.8492 43.4968 34 42.4781 34 40.6963V32.3107L32.5 30.8107V40.6963C32.5 40.9628 32.3547 41.1363 32.1787 41.2107C32.0082 41.2828 31.8164 41.2621 31.6581 41.0971L27.9284 36.8947L27.9177 36.8828C27.7335 36.684 27.5103 36.5252 27.2621 36.4163C27.0138 36.3074 26.7458 36.2508 26.4747 36.25H26.4725H22C21.7522 36.25 21.5 36.0318 21.5 35.6988V28.3C21.5 27.9687 21.7517 27.75 22 27.75H26.4825L26.4852 27.75C26.7519 27.7491 27.0156 27.6941 27.2605 27.5885C27.5053 27.4828 27.7263 27.3287 27.91 27.1354C27.916 27.129 27.9219 27.1225 27.9278 27.116L28.3399 26.6505L27.2773 25.5879ZM32.5 28.6893V23.3038C32.5 23.0395 32.3562 22.8658 32.1814 22.7904C32.0131 22.7178 31.8238 22.7362 31.6658 22.8945L29.3361 25.5255L28.2735 24.4629L30.5547 21.8866C30.5614 21.879 30.5683 21.8716 30.5753 21.8643C31.8763 20.5096 34 21.5359 34 23.3038V30.1893L32.5 28.6893ZM37.635 35.9457C37.4043 36.2757 37.4755 36.7317 37.8001 36.9751C38.066 37.1744 38.4211 37.1706 38.6795 36.9901L37.635 35.9457ZM39.5091 35.6984L38.3536 34.5429C38.612 33.7813 38.7497 32.9032 38.7497 32C38.7497 30.4724 38.3559 29.0166 37.6499 28.0749C37.4015 27.7435 37.4687 27.2734 37.8001 27.0249C38.1315 26.7765 38.6016 26.8437 38.8501 27.1751C39.8103 28.4559 40.2497 30.2639 40.2497 32C40.2497 33.2729 40.0135 34.5844 39.5091 35.6984ZM41.693 40.0037C41.6249 40.0712 41.5557 40.1381 41.4855 40.2043C41.1841 40.4885 41.1702 40.9632 41.4543 41.2646C41.7385 41.5659 42.2132 41.5799 42.5145 41.2957C42.5955 41.2194 42.6752 41.1422 42.7537 41.0643L41.693 40.0037ZM43.7558 39.9451L42.6869 38.8763C46.1378 34.3867 45.7203 27.8394 41.4821 23.7925C41.1825 23.5064 41.1715 23.0317 41.4576 22.7321C41.7436 22.4325 42.2184 22.4215 42.5179 22.7076C47.3602 27.3313 47.8025 34.8492 43.7558 39.9451Z" fill="white"></path>
                                    <path d="M20.75 19.5L43.25 42" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </button>
                        </div>
                    }
                    {isLoading &&
                        <div className="TkdAeq">
                            <button className="cnTjGy">
                                <svg width="64px" height="64px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="25" cy="25" r="20" fill="none" stroke="#161616" strokeOpacity="0.6" strokeWidth="2">
                                        <animate attributeName="stroke-dasharray" dur="1s" repeatCount="indefinite" values="150 50;1 150;150 50" keyTimes="0;0.5;1" />
                                        <animate attributeName="stroke-dashoffset" dur="1s" repeatCount="indefinite" values="0;-100;-200" keyTimes="0;0.5;1" />
                                        <animate attributeName="stroke" dur="1s" repeatCount="indefinite" values="#161616;#FFFFFF;#161616" keyTimes="0;0.5;1" />
                                    </circle>
                                </svg>
                            </button>
                        </div>
                    }
                    <div className="cVHMpv">
                        <div className="titledXTrWE">
                            <div className="dXTrWE">
                                <div style={{
                                    paddingBottom: "10px",
                                    fontSize: "16.5px",
                                    fontWeight: "bold"
                                }}>
                                    {video.title}
                                </div>
                                <div style={{
                                    paddingBottom: "10px",
                                    fontSize: "13.5px"
                                }}>
                                    {video.subtitle}
                                </div>
                            </div>
                        </div>
                        <div className="ksuiaN">
                            <div className="krNkcP">
                                <button className="dDYExP" onClick={() => handleLikeVideo(indexVideo)}>
                                    {videoLiked[indexVideo] ? (
                                        <svg color="rgb(255, 48, 64)" fill="rgb(255, 48, 64)" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                                    ) : (
                                        <svg color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                                    )}
                                    <p className="deznxB">{videoLiked[indexVideo] ? 33 : 32}</p>
                                </button>
                                <button onClick={() => handleShare(indexVideo)}>
                                    <svg
                                        color="rgb(245, 245, 245)"
                                        fill="rgb(245, 245, 245)"
                                        height="24"
                                        role="img"
                                        viewBox="0 0 24 24"
                                        width="24">
                                        <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" x1="22" x2="9.218" y1="3" y2="10.083">
                                        </line>
                                        <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2">
                                        </polygon>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="gsiaAU"></div>
                    <div style={{ position: "absolute", width: "100%", bottom: "0px" }}>
                        <div className="TuQgi">
                            <button type="button"
                                className={`TazcOk ${!showButton ? 'fade-out' : ''}`}
                                onClick={() => handleVideoClick(indexVideo)}>
                                <div>
                                    {!isPlaying ? (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.75 3.75H15.375C14.9608 3.75 14.625 4.08579 14.625 4.5V19.5C14.625 19.9142 14.9608 20.25 15.375 20.25H18.75C19.1642 20.25 19.5 19.9142 19.5 19.5V4.5C19.5 4.08579 19.1642 3.75 18.75 3.75Z" fill="white" />
                                            <path d="M8.625 3.75H5.25C4.83579 3.75 4.5 4.08579 4.5 4.5V19.5C4.5 19.9142 4.83579 20.25 5.25 20.25H8.625C9.03921 20.25 9.375 19.9142 9.375 19.5V4.5C9.375 4.08579 9.03921 3.75 8.625 3.75Z" fill="white" />
                                        </svg>
                                    ) : (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.7781 10.7154L6.27813 2.47473C6.05326 2.33222 5.79356 2.25424 5.52738 2.24928C5.26121 2.24432 4.99878 2.31257 4.76876 2.4466C4.53533 2.57467 4.34074 2.76329 4.20545 2.99261C4.07017 3.22193 3.9992 3.48348 4.00001 3.74973V20.2497C3.9992 20.516 4.07017 20.7775 4.20545 21.0068C4.34074 21.2362 4.53533 21.4248 4.76876 21.5529C4.99878 21.6869 5.26121 21.7551 5.52738 21.7502C5.79356 21.7452 6.05326 21.6672 6.27813 21.5247L19.7781 13.2841C19.9994 13.1506 20.1824 12.9622 20.3095 12.7372C20.4365 12.5122 20.5033 12.2581 20.5033 11.9997C20.5033 11.7413 20.4365 11.4873 20.3095 11.2623C20.1824 11.0372 19.9994 10.8488 19.7781 10.7154V10.7154Z" fill="white"></path></svg>
                                    )}
                                </div>
                            </button>
                            <div style={{ backgroundSize: `${videoProgress[indexVideo]}% 100%` }}></div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}