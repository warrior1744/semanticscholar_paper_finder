import React from 'react'

function About() {
  return (
    <>
        <h1 className="text-6xl mb4">Semanticscholar Paper Finder</h1>
        <p className="mb-4 text-2xl font-light">
        A free, AI-powered research tool for scientific literature
        </p>
        <p className="text-lg text-gray-400">
            Version <span className="text-white">1.0.0</span>
        </p>
        <p className="text-lg text-gray-400">
            Created By: 
            <a href="https://www.jim1984.com" className="text-white"> Jim Chang
            </a>
        </p>
    </>

  )
}

export default About