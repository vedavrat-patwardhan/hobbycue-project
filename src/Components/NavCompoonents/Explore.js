import React from "react";

export default function Explore({ matches }) {
  return (
    <div className="explore-drop">
      <button className="explore-drop__options">People - Community</button>
      {!matches && <hr className="drop-separator" />}
      <button className="explore-drop__options">Places - Venues</button>
      {!matches && <hr className="drop-separator" />}
      <button className="explore-drop__options">Programs - Events</button>
      {!matches && <hr className="drop-separator" />}
      <button className="explore-drop__options">Products - Store</button>
      {!matches && <hr className="drop-separator" />}
      <button className="explore-drop__options">Posts - Write-ups</button>
    </div>
  );
}
