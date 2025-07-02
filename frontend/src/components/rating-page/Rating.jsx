import React, { useState, useEffect, useRef } from 'react';
import styles from './rating.module.css';
import LeftSide from '../main-components/LeftSide';

export default function Rating() {
  const [isTypeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("All Types");
  const typeDropdownRef = useRef(null);

  const [periodIsDropdownOpen, setPeriodIsDropdownOpen] = useState(false);
  const [periodSelectedOption, setPeriodSelectedOption] = useState("Monthly");
  const periodDropdownRef = useRef(null);

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

  const allTypeOptions = ["Hip Hop", "Pop", "Rock", "Classical", "All Types", "Another"];
  const typeOptions =
    selectedType === "All Types"
      ? allTypeOptions
      : [selectedType, ...allTypeOptions.filter((opt) => opt !== selectedType)];

  const periodOptions = ["Last 24 hours", "Last 7 days","Monthly", "Year", "All time"];
  const orderedPeriodOptions =
    periodSelectedOption === "Monthly"
      ? periodOptions
      : [periodSelectedOption, ...periodOptions.filter((opt) => opt !== periodSelectedOption)];

  return (
    <>
      <LeftSide />
      <div className={styles["raitinig-container"]}>
        <div className={styles["upper-platform"]}>
          <div className={styles["upper-left"]}>
            <div className={styles["top-content"]}>
              <div className={styles["text1"]}>Popular Tracks</div>
              <div className={styles["btn-container"]}>
                {/* Type Dropdown */}
                <div className={styles["dropdown-wrapper"]} ref={typeDropdownRef}>
                  <button className={styles["all-type"]} onClick={toggleTypeDropdown}>
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
                <div className={styles["period-dropdown-wrapper"]} ref={periodDropdownRef}>
                  <button className={styles["period-button"]} onClick={togglePeriodDropdown}>
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

                <button className={styles["world-place"]}>Worldwide</button>
              </div>
            </div>

            {/* Example Content */}
            <div className={styles["info-song"]}>
              <div className={styles["info-place"]}>1</div>
              <div className={styles["info-content"]}>
                <div className={styles["info-artist"]}>Travis Skott</div>
                <div className={styles["info-song-name"]}>Type Sh-t</div>
                <div className={styles["info-listeners"]}>19.7m listeners</div>
              </div>
            </div>
          </div>

          <div className={styles["upper-right"]}>
            <div className={styles["scroll-container"]}>
              {[...Array(10)].map((_, i) => (
                <div key={i} className={styles["scroll-item"]}>
                  <div className={styles["item-place"]}>1</div>
                  <div className={styles["item-info"]}>
                    <div className={styles["item-photo"]}></div>
                    <div className={styles["inside-info"]}>
                      <div className={styles["inside-name"]}>Not Like Us</div>
                      <div className={styles["inside-singer"]}>Kendrick Lamar</div>
                      <div className={styles["inside-listeners"]}>19.7m listeners</div>
                    </div>
                  </div>
                </div>
              ))}
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
                  <div className={styles["raite-text"]}>Kendrick Lamar</div>
                </div>
                <div className={styles["raite-end"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>15.7m listeners</div>
            </div>

            <div className={styles["raite-wrapper"]}>
              <div className={styles["raite-item2"]}>
                <div className={styles["raite-photo"]}></div>
                <div className={styles["raite-center"]}>
                  <div className={styles["raite-text"]}>Travis Skott</div>
                </div>
                <div className={styles["raite-end"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>15.7m listeners</div>
            </div>

            <div className={styles["raite-wrapper"]}>
              <div className={styles["raite-item3"]}>
                <div className={styles["raite-photo"]}></div>
                <div className={styles["raite-center"]}>
                  <div className={styles["raite-text"]}>The Weekend</div>
                </div>
                <div className={styles["raite-end"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>12m listeners</div>
            </div>

            <div className={styles["raite-wrapper"]}>
              <div className={styles["raite-item4"]}>
                <div className={styles["raite-photo"]}></div>
                <div className={styles["raite-center"]}>
                  <div className={styles["raite-text"]}>Billie Eilish</div>
                </div>
                <div className={styles["raite-end"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>10.9m listeners</div>
            </div>

            <div className={styles["raite-wrapper"]}>
              <div className={styles["raite-item5"]}>
                <div className={styles["raite-photo"]}></div>
                <div className={styles["raite-center"]}>
                  <div className={styles["raite-text"]}>Bad Bunny</div>
                </div>
                <div className={styles["raite-end"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>7.7m listeners</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
