import { useState, useRef, useEffect } from "react";
import styles from "./profileSetup.module.css";
import { useAPI } from "../../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../../js/properties/properties";

export default function ProfileSetup() {
  const { isAuthenticated,isLoading, user, getAccessTokenWithPopup } = useAuth0();
  const { apiFetch } = useAPI();
  const navigate = useNavigate();
  const [goalDropdownOpen, setGoalDropdownOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState({ id: -1, title: "Select goal" });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [username, setUsername] = useState(undefined);
  const [shortBio, setShortBio] = useState(undefined);
  const dropdownRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [goals, setGoals] = useState([]);
  const [genres, setGenres] = useState([]);
  const [vibes, setVibes] = useState([]);

  const fetchCountries = async () => {
    const response = await apiFetch("/countries");
    const data = await response.json();
    setCountries(data);
  };

  const fetchGoals = async () => {
    const response = await apiFetch("/goals");
    const data = await response.json();
    setGoals(data);
  };

  const fetchGenres = async () => {
    const response = await apiFetch("/genres");
    const data = await response.json();
    setGenres(data);
  };

  const fetchVibes = async () => {
    const response = await apiFetch("/vibes");
    const data = await response.json();
    setVibes(data);
  };

  const isUsernameUnique = async (username) =>{
    const response = await apiFetch(`/users/isUsernameUnique/${username}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setGoalDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    fetchCountries();
    fetchGoals();
    fetchGenres();
    fetchVibes();

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if(isLoading){
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  function selectGoalOption(option) {
    setSelectedGoal(option);
    setGoalDropdownOpen(false);
  }

  function selectGenre(genre) {
    if (isGenreSelected(genre)) {
      setSelectedGenres(prevState =>
        prevState.filter(g => g.id !== genre.id)
      );
    } else {
      setSelectedGenres(prevState => [...prevState, genre]);
    }
  }

  function selectVibe(vibe) {
    if (isVibeSelected(vibe)) {
      setSelectedVibes(prevState =>
        prevState.filter(v => v.id !== vibe.id)
      );
    } else {
      setSelectedVibes(prevState => [...prevState, vibe]);
    }
  }

  function isGenreSelected(genre) {
    return selectedGenres.find(g => g.id === genre.id)
  }

  function isVibeSelected(vibe) {
    return selectedVibes.find(v => v.id === vibe.id)
  }

  async function submitProfileSetup() {
    
    await getAccessTokenWithPopup({
      authorizationParams: {
        audience: API_URL
      },
    });

    if(!isUsernameUnique(username))
    {
      return;
    }

    const resultUser = {
      id: user.sub,
      firstName: "firstname",
      lastName: "lastname",
      username,
      goal: { id: selectedGoal.id },
      genres: selectedGenres.map(g => ({ id: g.id })),
      vibes: selectedVibes.map(v => ({ id: v.id })),
      shortBio
    };

    try {
      const res = await apiFetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resultUser)
      });

      if (!res.ok) {
        throw new Error('Failed to save user');
      }

    } catch (err) {
      console.error(err);
    }
    return <Navigate to="/" replace />;
  }

  return (
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
        onChange={(e) => { setUsername(e.target.value) }}
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
              {countries.map(country => (
                <option key={country.id} value={country.name} />
              ))}
            </datalist>
          </div>

          <div className={styles.b2}>
            <div className={styles.text11}>Your Role</div>
            <div className={styles.dropdown} ref={dropdownRef}>
              <div className={styles["dropdown-toggle"]} onClick={() => { setGoalDropdownOpen(!goalDropdownOpen) }}>
                <span className={styles.label}>{selectedGoal.title}</span>
                <span className={styles.arrow}>{goalDropdownOpen ? "˄" : "˅"}</span>
              </div>
              {goalDropdownOpen && (
                <div className={styles["dropdown-options"]}>
                  {goals.map((goal) => (
                    <div key={goal.id} onClick={() => selectGoalOption(goal)}>
                      {goal.title}
                    </div>
                  ))}
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
          onChange={(e) => { setShortBio(e.target.value) }}
        />

        <div className={styles.text11}>Select your favorite genres:</div>
        <div className={styles["cont-block"]}>
          <div className={styles.up}>
            {genres.map((genre) => (
              <div className={`${styles.block} ${isGenreSelected(genre) ? styles['block-selected'] : ''}`} onClick={() => { selectGenre(genre) }}>{genre.title}</div>
            ))}
          </div>
        </div>

        <div className={styles.text11}>Pick Your Vibe:</div>
        <div className={styles.bottom}>
          {vibes.map((vibe) => (
            <div className={`${styles.block} ${isVibeSelected(vibe) ? styles['block-selected'] : ''}`} onClick={() => { selectVibe(vibe) }}>{vibe.title}</div>
          ))}
        </div>

        <div className={styles.f}>
          <button className={styles["cnt-btn"]} onClick={submitProfileSetup}>Continue</button>
        </div>
      </div>
    </div>
  );
}
