export const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
    window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
    });
};

export const openMenuk = () => {
    window.gtag('event', 'open_menuk')
}

export const closeMenuk = () => {
    window.gtag('event', 'close_menuk')
}

export const gaPlayVideo = (videoUrl: string) => {
    const videoName = getFilenameFromUrl(videoUrl)
    window.gtag('event', 'play_video', {
        'video_name': videoName
    })
}

export const gaPauseVideo = (videoUrl: string) => {
    const videoName = getFilenameFromUrl(videoUrl)
    window.gtag('event', 'pause_video', {
        'video_name': videoName
    })
}

export const getFilenameFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf('/') + 1)
}

export const gaShareVideo = (videoUrl: string) => {
    const videoName = getFilenameFromUrl(videoUrl)
    window.gtag('event', 'share_video', {
        'video_name': videoName
    })
}

export const gaViewVideo25 = (videoUrl: string) => {
    const videoName = getFilenameFromUrl(videoUrl)
    window.gtag('event', 'view_video_25', {
        'video_name': videoName
    })
}

export const gaViewVideo50 = (videoUrl: string) => {
    const videoName = getFilenameFromUrl(videoUrl)
    window.gtag('event', 'view_video_50', {
        'video_name': videoName
    })
}

export const gaViewVideo75 = (videoUrl: string) => {
    const videoName = getFilenameFromUrl(videoUrl)
    window.gtag('event', 'view_video_75', {
        'video_name': videoName
    })
}

export const gaViewVideo100 = (videoUrl: string) => {
    const videoName = getFilenameFromUrl(videoUrl)
    window.gtag('event', 'view_video_100', {
        'video_name': videoName
    })
}

export const gaUnmuteVideo = (videoUrl: string) => {
    const videoName = getFilenameFromUrl(videoUrl)
    window.gtag('event', 'unmute_video', {
        'video_name': videoName
    })
}

export const gaMuteVideo = (videoUrl: string) => {
    const videoName = getFilenameFromUrl(videoUrl)
    window.gtag('event', 'mute_video', {
        'video_name': videoName
    })
}

export const gaLikeVideo = (videoUrl: string) => {
    const videoName = getFilenameFromUrl(videoUrl)
    window.gtag('event', 'like_video', {
        'video_name': videoName
    })
}
