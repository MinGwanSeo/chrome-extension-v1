function getQuery() {
  return location.search
    .substring(1)
    .split("&")
    .reduce((acc, cur) => {
      const [key, value] = cur.split("=");
      acc[key] = value;
      return acc;
    }, {});
}

function getYoutubeVideo() {
  const isInViewport = (e, { top: t, height: h } = e.getBoundingClientRect()) =>
    t <= innerHeight && t + h >= 0;

  let video = undefined;

  document.querySelectorAll("video").forEach((v) => {
    if (isInViewport(v)) {
      video = v;
    }
  });

  return video;
}

export { getQuery, getYoutubeVideo };
