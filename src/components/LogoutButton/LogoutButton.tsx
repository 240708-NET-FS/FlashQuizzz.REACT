import React from "react";

function LogoutButton() {
  function logout() {
    localStorage.clear();
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default LogoutButton;