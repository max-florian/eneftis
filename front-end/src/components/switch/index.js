import React, {useEffect} from 'react';
import './switch.css';
import { ReactComponent as MoonIcon } from "../../assets/svg/moon.svg";
import { ReactComponent as SunIcon } from "../../assets/svg/sun.svg";

const updateTheme = (isDarkEnabled) => {
    // Get CSS variables for background/foreground
    const styles = getComputedStyle(document.body);
    const black = styles.getPropertyValue("--black");
    const white = styles.getPropertyValue("--white");
    const togglercolor = document.documentElement;
  
    if (isDarkEnabled) {
      togglercolor.style.setProperty("--background", black);
      togglercolor.style.setProperty("--foreground", white);
    } else {
      togglercolor.style.setProperty("--background", white);
      togglercolor.style.setProperty("--foreground", black);
    }
  };

function Switch ({ isOn, handleToggle }){

    useEffect(() => {
        updateTheme(isOn);
    }, [isOn]);
  return (
    <>
      {/* <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && '#EF476F' }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label> */}
      <label className="toggle-wrapper" htmlFor="toggle">
        <div className={`toggle ${isOn ? "enabled" : "disabled"}`}>
            <span className="hidden">
                {isOn ? "Enable Light Mode" : "Enable Dark Mode"}
            </span>
            <div className="icons">
                <SunIcon />
                <MoonIcon />
            </div>
            <input
                id="toggle"
                name="toggle"
                type="checkbox"
                checked={isOn}
                onChange={handleToggle}
            />
        </div>
    </label>
    </>
  );
};

export default Switch;