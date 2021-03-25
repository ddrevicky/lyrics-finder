const apiKey = process.env.REACT_APP_MUSIXMATCH_KEY;

const crossOriginProxyURL = process.env.REACT_APP_CROSSORIGIN_PROXY_URL;
const rootURL = crossOriginProxyURL + "https://api.musixmatch.com/ws/1.1/";

export const topTracksURL =
  rootURL +
  `chart.tracks.get?chart_name=top&page=1&page_size=11&country=us&f_has_lyrics=1&apikey=${apiKey}`;

export const getTrackInfoURL = (commonTrackId) =>
  rootURL + `track.get?commontrack_id=${commonTrackId}&apikey=${apiKey}`;

export const getTrackLyricsURL = (commonTrackId) =>
  rootURL + `track.lyrics.get?commontrack_id=${commonTrackId}&apikey=${apiKey}`;
