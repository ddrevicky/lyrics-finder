import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TrackDetails from "./components/TrackDetails";
import TrackList from "./components/TrackList";
import { topTracksURL } from "./utils";

function App() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const getTracks = async () => {
      const tracks = await fetchTracks();
      setTracks(tracks);
    };
    getTracks();
  }, []);

  const fetchTracks = async () => {
    const res = await fetch(topTracksURL);
    if (res.status !== 200) {
      console.log(res);
      alert("Error fetching tracks");
      return;
    }
    const resJSON = await res.json();
    const apiTracks = resJSON["message"]["body"]["track_list"];
    console.log(apiTracks);
    const tracks = apiTracks.map((track) => ({
      commonTrackId: track["track"]["commontrack_id"],
      trackName: track["track"]["track_name"],
      artistName: track["track"]["artist_name"],
      albumName: track["track"]["album_name"],
    }));
    return tracks;
  };

  return (
    <Router>
      <Header title="Lyrics Finder" />
      <div className="app-content">
        <Route
          path="/"
          exact
          render={() => (
            <>
              <SearchBar />
              <TrackList title="Top 10 Tracks" tracks={tracks} />
            </>
          )}
        />
        <Route path="/:commonTrackId" component={TrackDetails}></Route>
      </div>
    </Router>
  );
}

export default App;
