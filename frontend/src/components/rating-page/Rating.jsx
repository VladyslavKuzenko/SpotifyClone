import React, { useState, useEffect, useRef } from "react";
import styles from "./rating.module.css";
import LeftSide from "../main-components/LeftSide";
import { useAPI } from "../../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useAudio } from "../../hooks/useAudio";

export default function Rating() {
  const [isTypeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("All Types");
  const typeDropdownRef = useRef(null);
  const [periodIsDropdownOpen, setPeriodIsDropdownOpen] = useState(false);
  const [periodSelectedOption, setPeriodSelectedOption] = useState("All time");
  const periodDropdownRef = useRef(null);
  const [artist, setArtists] = useState([])
  const [tracks, setTracks] = useState([])
  const { apiFetch } = useAPI();
  const { isLoading } = useAuth0();
  const { setCurrentSong, setCurrentSongList } = useAudio();



  const fetchUsers = async () => {
    if (isLoading) return;
    console.log("Rating: fetchUsers()");

    const response = await apiFetch("/artists/top/0/5");
    const data = await response.json();
    setArtists(data);

    console.log("Rating: data: ", data)
  };
  const fetchTracks = async () => {
    if (isLoading) return;
    console.log("Rating: fetchTracks()");
    var period;
    switch (periodSelectedOption) {
      case "Last 24 hours":
        period = "day";
        break;
      case "Last 7 days":
        period = "week";
        break;
      case "Monthly":
        period = "month";
        break;
      case "Year":
        period = "year";
        break;
      case "All time":
        period = "all";
        break;

      default:
        break;
    }
    const response = await apiFetch(`/tracks/top?first=0&count=10&period=${period}`);
    const data = await response.json();
    setTracks(data);

    console.log("Rating: track data: ", data)
  };
  const toggleTypeDropdown = () => {
    setTypeDropdownOpen(!isTypeDropdownOpen);
    setPeriodIsDropdownOpen(false);
  };

  const togglePeriodDropdown = () => {
    setPeriodIsDropdownOpen(!periodIsDropdownOpen);
    setTypeDropdownOpen(false);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setTypeDropdownOpen(false);
  };

  const handlePeriodSelect = (period) => {

    setPeriodSelectedOption(period);
    setPeriodIsDropdownOpen(false);
  };

  useEffect(() => {
    fetchUsers();
    fetchTracks();
  }, [isLoading, periodSelectedOption])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(event.target)
      ) {
        setTypeDropdownOpen(false);
      }

      if (
        periodDropdownRef.current &&
        !periodDropdownRef.current.contains(event.target)
      ) {
        setPeriodIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allTypeOptions = [
    "Hip Hop",
    "Pop",
    "Rock",
    "Classical",
    "All Types",
    "Another",
  ];
  const typeOptions =
    selectedType === "All Types"
      ? allTypeOptions
      : [selectedType, ...allTypeOptions.filter((opt) => opt !== selectedType)];

  const periodOptions = [
    "Last 24 hours",
    "Last 7 days",
    "Monthly",
    "Year",
    "All time",
  ];
  const orderedPeriodOptions =
    periodSelectedOption === "Monthly"
      ? periodOptions
      : [
        periodSelectedOption,
        ...periodOptions.filter((opt) => opt !== periodSelectedOption),
      ];

  return (
    <>
      <div className={styles["raitinig-container"]}>
        <div className={styles["upper-platform"]}>
          <div className={styles["upper-left"]}>
            <div className={styles["top-content"]}>
              <div className={styles["text1"]}>Popular Tracks</div>
              <div className={styles["btn-container"]}>
                {/* Type Dropdown */}
                <div
                  className={styles["dropdown-wrapper"]}
                  ref={typeDropdownRef}
                >
                  <button
                    className={styles["all-type"]}
                    onClick={toggleTypeDropdown}
                  >
                    {selectedType}
                    <span className={styles["arrow"]}>
                      {isTypeDropdownOpen ? "▲" : "▼"}
                    </span>
                  </button>

                  {isTypeDropdownOpen && (
                    <div className={styles["dropdown-menu"]}>
                      {typeOptions.map((type, index) => (
                        <div
                          key={index}
                          className={styles["dropdown-item"]}
                          onClick={() => handleTypeSelect(type)}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Period Dropdown */}
                <div
                  className={styles["period-dropdown-wrapper"]}
                  ref={periodDropdownRef}
                >
                  <button
                    className={styles["period-button"]}
                    onClick={togglePeriodDropdown}
                  >
                    {periodSelectedOption}
                    <span className={styles["period-arrow"]}>
                      {periodIsDropdownOpen ? "▲" : "▼"}
                    </span>
                  </button>

                  {periodIsDropdownOpen && (
                    <div className={styles["period-dropdown-menu"]}>
                      {orderedPeriodOptions.map((period, index) => (
                        <div
                          key={index}
                          className={styles["period-dropdown-item"]}
                          onClick={() => handlePeriodSelect(period)}
                        >
                          {period}
                        </div>
                      ))}
                    </div>
                  )}
                </div>


              </div>
            </div>

            {/* Example Content */}
            <div className={styles["info-song"]}>
              <div className={styles["info-place"]}>1</div>
              <div className={styles["info-content"]}>
                <div className={styles["info-artist"]}>{tracks[0]?.artist.user.username} </div>
                <div className={styles["info-song-name"]}>{tracks[0]?.title} </div>
                <div className={styles["info-listeners"]}>{tracks[0]?.listeningCount} listeners</div>
              </div>
            </div>

            <div className={styles["upper-right"]}>
              <div className={styles["scroll-container"]}>
                {tracks.map((item, index) => (
                  <div key={index} className={styles["scroll-item"]} onClick={() => {
                    setCurrentSong(item);
                    setCurrentSongList(tracks);
                  }}>
                    <div className={styles["item-place"]}>{index + 1}</div>
                    <div className={styles["item-info"]}>
                      <div className={styles["item-photo"]}></div>
                      <div className={styles["inside-info"]}>
                        <div className={styles["inside-name"]}>{item.title}</div>
                        <div className={styles["inside-singer"]}>
                          {item.artist.user.username}
                        </div>
                        <div className={styles["inside-listeners"]}>
                          {item.listeningCount} listeners
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>

        <div className={styles["bottom-platform"]}>
          <div className={styles["text2"]}>Top Artists</div>
          <div className={styles["bottom-content"]}>
            <div className={styles["raite-wrapper"]}>
              <div className={styles["raite-item1"]}>
                <div className={styles["raite-photo"]}></div>
                <div className={styles["raite-center"]}>
                  <div className={styles["raite-text"]}>{artist[0]?.user?.username}</div>
                </div>
                <div className={styles["raite-end1"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>{artist[0]?.listeningCount} listeners</div>
            </div>

            <div className={styles["raite-wrapper"]}>
              <div className={styles["raite-item2"]}>
                <div className={styles["raite-photo"]}></div>
                <div className={styles["raite-center"]}>
                  <div className={styles["raite-text"]}>{artist[1]?.user?.username}</div>
                </div>
                <div className={styles["raite-end2"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>{artist[1]?.listeningCount} listeners</div>
            </div>

            <div className={styles["raite-wrapper"]}>
              <div className={styles["raite-item3"]}>
                <div className={styles["raite-photo"]}></div>
                <div className={styles["raite-center"]}>
                  <div className={styles["raite-text"]}>{artist[2]?.user?.username}</div>
                </div>
                <div className={styles["raite-end3"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>{artist[2]?.listeningCount} listeners</div>
            </div>

            <div className={styles["raite-wrapper"]}>
              <div className={styles["raite-item4"]}>
                <div className={styles["raite-photo"]}></div>
                <div className={styles["raite-center"]}>
                  <div className={styles["raite-text"]}>{artist[3]?.user?.username}</div>
                </div>
                <div className={styles["raite-end4"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>{artist[3]?.listeningCount} listeners</div>
            </div>

            <div className={styles["raite-wrapper"]}>
              <div className={styles["raite-item5"]}>
                <div className={styles["raite-photo"]}></div>
                <div className={styles["raite-center"]}>
                  <div className={styles["raite-text"]}>{artist[4]?.user?.username}</div>
                </div>
                <div className={styles["raite-end5"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>{artist[4]?.listeningCount} listeners</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
