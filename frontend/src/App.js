import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from "./components/layout/Navbar"
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Paper from './pages/Paper'
import NotFound from './pages/NotFound'
import Bucket from './pages/Bucket'
import Alert from './components/layout/Alert'
import { SemanticscholarProvider} from './context/semanticscholar/SemanticsholarContext'
import { AlertProvider} from './context/alert/AlertContext'

function App() {
  return (
    <SemanticscholarProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
              <main className="container mx-auto px-3 pb-12">
              <Alert />
              <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/paper/:paperId" element={<Paper/>} />
                <Route path="/bucket" element={<Bucket/>} />
                <Route path="/*" element={<NotFound/>} />
              </Routes>
              </main>
            <Footer/>
          </div>
        </Router>
      </AlertProvider>
    </SemanticscholarProvider>
  );
}

export default App;
