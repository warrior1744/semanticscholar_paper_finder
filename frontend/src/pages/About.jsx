import React from 'react'

function About() {
  return (
    <>
        <h1 className="text-4xl mb-6">Semanticscholar Paper Finder</h1>
        <p className="mb-4 text-2xl font-light">
        A free, AI-powered research tool for scientific literature
        </p>
        <p className="text-lg text-gray-400">
            Version <span className="text-white">1.0.1</span>
        </p>
        <p>Updated on Jan 4th 2023</p>
        <p className="text-lg text-gray-400">
            Created By: 
            <a href="https://www.jim1984.com" className="text-white"> Jim Chang
            </a>
        </p>
    </>

  )
}

export default About