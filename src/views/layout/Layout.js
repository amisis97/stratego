import React from 'react';
import './Layout.css';
import { Navbar } from "../menu/Navbar";

export function Layout({ children }) {
  return (
    <div className="ui container">
      <Navbar />
      {children}
    </div>
  )
}