import React from "react";
import logo from "./logo.png"; // ⚠️ adjust path if inside subfolder

function Navbar() {
  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="nav-left">

        {/* LOGO */}
        <img src={logo} alt="logo" className="logo-img" />

        {/* MENU */}
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/sales">Sales</a>
          <a href="/accounts">Accounts</a>
          <a href="/clients">Clients</a>
          <a href="/reports">Reports</a>
          <a href="/admin">Admin</a>
          <a href="/settings">Settings</a>
        </div>

      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <div className="user-info">
          <p>Manager</p>
          <span>Manager</span>
        </div>

        <div className="avatar">MA</div>
      </div>

    </div>
  );
}

export default Navbar;