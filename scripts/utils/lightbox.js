const $mediaWrapper = document.querySelector('.lightbox__container__media');

function calculateIndexOfMedia() {
    let index;
    if ($mediaWrapper.firstChild) {
        if ($mediaWrapper.firstChild.tagName === 'IMG') {
            const $img = document.querySelector('.lightbox__container__media img');
            const currentImagePath = $img.src;
            index = medias.findIndex((media) => currentImagePath.endsWith(media._image) === true);
        } else if ($mediaWrapper.firstChild.tagName === 'VIDEO') {
            currentMediaType = 'video';
            const $video = document.querySelector('.lightbox__container__media video');
            const currentVideoPath = $video.firstChild.src;
            index = medias.findIndex((media) => currentVideoPath.endsWith(media._video) === true);
        }
        return index;
    }
    return NaN;
}

