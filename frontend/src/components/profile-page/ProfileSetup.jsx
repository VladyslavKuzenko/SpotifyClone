import { useState, useRef, useEffect } from "react";
import styles from "./profileSetup.module.css";
import { useAPI } from "../../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../../js/properties/properties";
import {
  getUser_metadata_firstName,
  getUser_metadata_lastName,
} from "../../js/functions/functions";

export default function ProfileSetup() {
  const { isAuthenticated, isLoading, getAccessTokenWithPopup } = useAuth0();
  const { apiFetch, apiFetchWithoutAutorization, user } = useAPI();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isUserArtist, setIsUserArtist] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [shortBio, setShortBio] = useState(undefined);
  const dropdownRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [genres, setGenres] = useState([]);
  const profileOptions = ["Artist", "Listener"];

  const fetchCountries = async () => {
    const response = await apiFetchWithoutAutorization("/countries");
    const data = await response.json();
    setCountries(data);
  };

  const fetchGenres = async () => {
    const response = await apiFetchWithoutAutorization("/genres");
    const data = await response.json();
    setGenres(data);
  };

  const isUsernameUnique = async (username) => {
    const response = await apiFetch(`/users/isUsernameUnique/${username}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    fetchCountries();
    fetchGenres();

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  function selectProfileOption(option) {
    setDropdownOpen(false);
    setIsUserArtist(option === profileOptions[0] ? true : false);
  }

  function selectGenre(genre) {
    if (isGenreSelected(genre)) {
      setSelectedGenres((prevState) =>
        prevState.filter((g) => g.id !== genre.id)
      );
    } else {
      setSelectedGenres((prevState) => [...prevState, genre]);
    }
  }

  function isGenreSelected(genre) {
    return selectedGenres.find((g) => g.id === genre.id);
  }

  async function submitProfileSetup() {
    await getAccessTokenWithPopup({
      authorizationParams: {
        audience: API_URL,
      },
    });
    if (!(await isUsernameUnique(username))) {
      return;
    }

    const resultUser = {
      id: user.sub,
      firstName: getUser_metadata_firstName(user) ,
      lastName: getUser_metadata_lastName(user) ,
      username,
      genres: selectedGenres.map((g) => ({ id: g.id })),
      shortBio,
      isArtist: isUserArtist,
    };

    try {
      console.log("ApiFetch start");
      const res = await apiFetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultUser),
      });

      if (!res.ok) {
        throw new Error("Failed to save user");
      }
    } catch (err) {
      console.error(err);
    }

    const resultPlaylist = {
      user: { id: user.sub },
      title: "Like",
    };
    apiFetch("/playlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultPlaylist),
    });

    navigate("/", { replace: true });
  }

  return (
    <div className={styles["background"]}>
      <div className={styles["main-container"]}>
        <div className={styles.text1}>Profile Setup</div>
        <div className={styles.picture}></div>
        <div className={styles.container}>
          <button className={styles["change-picture"]}>Change picture</button>
          <button className={styles["delete-picture"]}>Delete picture</button>
        </div>
        <div className={styles.username}>Username</div>
        <input
          type="text"
          id="user-name"
          placeholder="@Name"
          className={styles["user-name"]}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <div className={styles["bottom-block"]}>
          <div className={styles.ocnt}>
            <div className={styles.b1}>
              <div className={styles.text11}>Location</div>
              <input
                type="text"
                id="location"
                placeholder="City or Country"
                className={styles.location}
                list="genres"
              />
              <datalist id="genres">
                {countries.map((country) => (
                  <option key={country.id} value={country.name} />
                ))}
              </datalist>
            </div>

            <div className={styles.b2}>
              <div className={styles.text11}>Profile View</div>
              <div className={styles.dropdown} ref={dropdownRef}>
                <div
                  className={styles["dropdown-toggle"]}
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                  }}
                >
                  <span className={styles.label}>{isUserArtist ? "Artist" : "Listener"}</span>
                </div>
                {dropdownOpen && (
                  <div className={styles["dropdown-options"]}>
                    {<div onClick={() => selectProfileOption(isUserArtist ? profileOptions[1] : profileOptions[0])}>
                      {isUserArtist ? profileOptions[1] : profileOptions[0]}
                    </div>}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.text11}>Short Bio</div>
          <input
            type="text"
            id="bio"
            placeholder="Add a few words about your music taste..."
            className={styles.bio}
            onChange={(e) => {
              setShortBio(e.target.value);
            }}
          />

          <div className={styles.text11}>Select your favorite genres:</div>
          <div className={styles["cont-block"]}>
            <div className={styles.genres}>
              {genres.map((genre) => (
                <div
                  className={`${styles.block} ${isGenreSelected(genre) ? styles["block-selected"] : ""
                    }`}
                  onClick={() => {
                    selectGenre(genre);
                  }}
                >
                  {genre.title}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.f}>
            <button
              className={styles["cnt-btn"]}
              onClick={async () => {
                await submitProfileSetup();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
