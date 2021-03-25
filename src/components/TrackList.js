import { Ring } from "react-spinners-css";
import Track from "./Track";
import "./TrackList.css";

const TrackList = ({ title, tracks }) => {
  return (
    <div className="tracks">
      <h2>{title}</h2>
      {tracks && tracks.length ? (
        <div className="tracks-container">
          {tracks.map((track, index) => (
            <Track key={index} {...track} />
          ))}
        </div>
      ) : (
        <Ring color="#2e2e2e" className="spinner" />
      )}
    </div>
  );
};

export default TrackList;
