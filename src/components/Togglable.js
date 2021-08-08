import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Togglable.scss";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div className="Togglable">
      <div className="Togglable__show-button-container" style={hideWhenVisible}>
        <button
          className="Togglable__show-button"
          onClick={() => setVisible(true)}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>{props.children}</div>
      <div style={showWhenVisible}>
        <button
          className="Togglable__hide-button"
          onClick={() => setVisible(false)}
        >
          cancel
        </button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
