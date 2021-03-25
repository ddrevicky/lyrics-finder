import { FaCompactDisc, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import LabeledTextWithIcon from "./LabeledTextWithIcon";
import "./Track.css";

const Track = ({ trackName, artistName, albumName, commonTrackId }) => {
  return (
    <div className="track">
      <h3>{artistName}</h3>
      <LabeledTextWithIcon icon={<FaPlay />} label="Song" text={trackName} />
      <LabeledTextWithIcon
        icon={<FaCompactDisc />}
        label="Album"
        text={albumName}
      />
      <Link to={`/${commonTrackId}`} className="button lyrics-button">
        View Lyrics
      </Link>
    </div>
  );
};

export default Track;
