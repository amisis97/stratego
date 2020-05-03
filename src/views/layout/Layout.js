import React from 'react';
import './Layout.css';
import { Navbar } from "../menu/Navbar";

export function Layout({ children }) {
  return (
    <div className="ui">
      <Navbar />
      <div className="content-wrapper">
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  )
}