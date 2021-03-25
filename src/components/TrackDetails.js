import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Ring from "react-spinners-css/dist/Ring";
import { getTrackInfoURL, getTrackLyricsURL } from "../utils";
import LabeledTextWithIcon from "./LabeledTextWithIcon";
import "./TrackDetails.css";

const Lyrics = ({ trackName, artistName, lyrics }) => {
  return (
    <div>
      <h3 className="track-title">
        {trackName} by <span class="track-name">{artistName}</span>
      </h3>
      <p className="track-text"> {lyrics}</p>
    </div>
  );
};

const TrackDetails = () => {
  const { commonTrackId } = useParams();
  const [lyrics, setLyrics] = useState("");
  const [trackInfo, setTrackInfo] = useState();
  console.log("commonTrackId", commonTrackId);

  useEffect(() => {
    const getTrackInfo = async () => {
      const trackInfo = await fetchTrackInfo();
      setTrackInfo(trackInfo);
    };
    getTrackInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getLyrics = async () => {
      const lyrics = await fetchTrackLyrics();
      setLyrics(lyrics);
    };
    getLyrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTrackInfo = async () => {
    const trackInfoURL = getTrackInfoURL(commonTrackId);
    const res = await fetch(trackInfoURL);
    if (res.status !== 200) {
      console.log(res);
      alert("Error fetching track info");
      return;
    }
    console.log("res", res);
    const resJSON = await res.json();
    console.log("apiInfo", resJSON);
    const apiInfo = resJSON["message"]["body"]["track"];

    const info = {
      genres: apiInfo["primary_genres"]["music_genre_list"].map(
        (genre) => genre?.music_genre?.music_genre_name
      ),
      trackName: apiInfo.track_name,
      artistName: apiInfo.artist_name,
      albumName: apiInfo.album_name,
      explicit: !!apiInfo.explicit,
      userLikes: apiInfo.num_favourite,
    };
    console.log("info", info);
    return info;
  };

  const fetchTrackLyrics = async () => {
    const trackLyricsURL = getTrackLyricsURL(commonTrackId);
    const res = await fetch(trackLyricsURL);
    if (res.status !== 200) {
      console.log(res);
      alert("Error fetching track lyrics");
      return;
    }
    const resJSON = await res.json();
    console.log("lyricsJSON", resJSON);
    const apiLyrics = resJSON["message"]["body"]["lyrics"];
    const lyrics =
      apiLyrics["lyrics_body"] + " " + apiLyrics["lyrics_copyright"];
    return lyrics;
  };

  return (
    <div>
      <Link to="/" className="button go-back-button">
        Go Back
      </Link>
      {trackInfo && lyrics ? (
        <>
          <Lyrics
            trackName={trackInfo.trackName}
            artistName={trackInfo.artistName}
            lyrics={lyrics}
          />
          <div className="info-label">
            <LabeledTextWithIcon
              label="Album Name"
              text={trackInfo.albumName}
            />
          </div>
          <div className="info-label">
            <LabeledTextWithIcon
              label="Song Genre"
              text={trackInfo.genres?.join(", ")}
            />
          </div>
          <div className="info-label">
            <LabeledTextWithIcon
              label="Explicit"
              text={trackInfo.explicit ? "Yes" : "No"}
            />
          </div>
          <div className="info-label">
            <LabeledTextWithIcon
              label="User Likes"
              text={trackInfo.userLikes}
            />
          </div>
        </>
      ) : (
        <Ring color="#2e2e2e" className="spinner" />
      )}
    </div>
  );
};

export default TrackDetails;
