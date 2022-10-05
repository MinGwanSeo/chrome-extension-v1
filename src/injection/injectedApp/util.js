function getYoutubeVideo() {
  const isInViewport = (e, { top: t, height: h } = e.getBoundingClientRect()) =>
    t <= innerHeight && t + h >= 0;

  let video = undefined;

  document.querySelectorAll("video").forEach((v) => {
    if (isInViewport(v) && v.src) {
      video = v;
    }
  });

  return video;
}

export { getYoutubeVideo };
