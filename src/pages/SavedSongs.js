import { Link, Outlet, useOutletContext } from "react-router-dom";
import SongCard from "../components/SongCard";
import { useEffect, useRef, useState } from "react";

function SavedSongs() {
  const summaryRef = useRef();
  const [summaryOpen, setSummaryOpen] = useState(false);
  const { savedSongs, handleUnsave } = useOutletContext();
  const songList = savedSongs.map((song) => (
    <SongCard
      key={song.id}
      song={song}
      handleUnsave={handleUnsave}
      type="saved"
    />
  ));

  useEffect(() => {
    if (summaryOpen) {
      const summaryElement = summaryRef.current;
      summaryElement.scrollIntoView();
    }
  }, [summaryOpen]);

  function handleViewHide() {
    setSummaryOpen((summaryOpen) => !summaryOpen);
  }

  return (
    <>
      <h1>Saved Songs</h1>
      <div className="container savedcontainer mb-5">
        <div className="row g-4">{songList}</div>
      </div>
      <div className="container summarycontainer" ref={summaryRef}>
        {summaryOpen ? (
          <Link
            to={"/saved"}
            className="btn w-100 summarybtn btn-outline-light mb-3"
            onClick={handleViewHide}
          >
            Hide Summary
          </Link>
        ) : (
          <Link
            to={"/saved/summary"}
            className="btn w-100 summarybtn btn-outline-light mb-3"
            onClick={handleViewHide}
          >
            View Summary
          </Link>
        )}
        <Outlet context={savedSongs} />
      </div>
    </>
  );
}

export default SavedSongs;
