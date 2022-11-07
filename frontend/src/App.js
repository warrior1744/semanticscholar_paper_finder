import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from "./components/layout/Navbar"
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Paper from './pages/Paper'
import NotFound from './pages/NotFound'
import Bucket from './pages/Bucket'
import Alert from './components/layout/Alert'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Users from './pages/Users'
import { SemanticscholarProvider} from './context/semanticscholar/SemanticsholarContext'
import { AlertProvider} from './context/alert/AlertContext'
import { BucketProvider} from './context/bucket/bucketContext'
import { UserProvider} from './context/user/UserContext'


function App() {
  return (
    <UserProvider>
      <SemanticscholarProvider>
        <BucketProvider>
          <AlertProvider>
            <Router>
              <div className="flex flex-col h-screen">
                <Navbar />
                    <div className='relative top-16'>
                    <main className="container mx-auto px-3 pb-12">
                    <Alert />
                    <Routes>
                      <Route path="/" exact element={<Home/>} />
                      <Route path="/about" element={<About/>} />
                      <Route path="/paper/:paperId" element={<Paper/>} />
                      <Route path="/bucket" element={<Bucket/>} />
                      <Route path="/login" element={<Login/>} />
                      <Route path="/register" element={<Register/>} />
                      <Route path="/profile" element={<Profile/>} />
                      <Route path="/users" element={<Users/>} />
                      <Route path="/*" element={<NotFound/>} />
                    </Routes>
                    </main>
                    <Footer/>
                    </div>
              </div>
            </Router>
          </AlertProvider>
        </BucketProvider>
      </SemanticscholarProvider>
    </UserProvider>
  );
}

export default App;
