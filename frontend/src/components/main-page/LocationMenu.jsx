import React, { useState, useEffect, useRef } from "react";
import styles from "./main.module.css";

const LocationMenu = ({locationControl}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const locations = [
    "Kyiv",
    "Lviv",
    "Odessa",
    "Dnipro",
    "Kharkiv",
    "Zhytomyr",
    "Zhytomyr",
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectLocation = (loc) => {
    console.log("Selected location:", loc);
    locationControl.setLocation(loc)
    setIsOpen(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className={styles["aml-location-menu-wrapper"]}>
     <button className={styles["aml-location-button"]} onClick={toggleMenu}>
  {locationControl.location || "Add location"}
</button>

      {isOpen && (
        <ul className={styles["aml-location-list"]}>
          {locations.map((loc) => (
            <li
              key={loc}
              className={styles["aml-location-item"]}
              onClick={() => handleSelectLocation(loc)}
            >
              {loc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationMenu;
