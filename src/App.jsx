import { useState } from 'react'
import './App.css'

// Components
import Home from './Pages/Base/Home/Home';
import Universities from './Pages/Internal/Uni/Universities';
import University from './Pages/Internal/Uni/University';

// Routers liblaries
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Contact from './Pages/Internal/Contact/Contact';
import EventsPage from './Pages/Internal/Events/Events';
import EventDetail from './Pages/Internal/Events/EventDetail';
import BlogsList from './Pages/Internal/Blogs/BlogsList';
import BlogDetails from './Pages/Internal/BlogDetails/BlogDetails';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/universities/university/:university_name" element={<University />} />

        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetail />} />

        <Route path="/blogs" element={<BlogsList />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
