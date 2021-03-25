import { FaMusic } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <form className="search-form">
      <h1>
        <FaMusic className="music-icon" />
        Search For A Song
      </h1>
      <h3>Get the lyrics for any track</h3>
      <input
        className="form-control text-input"
        type="text"
        placeholder="Song title..."
      ></input>
      <input
        className="button form-button"
        type="submit"
        value="Get Track Lyrics"
      ></input>
    </form>
  );
};

export default SearchBar;
