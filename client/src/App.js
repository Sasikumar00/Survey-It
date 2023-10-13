import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Dashboard from'./pages/Dashboard'
import CreateSurveyPage from './pages/CreateSurveyPage'
import LandingPage from './pages/LandingPage'
import Protected from './routes/Protected'
import { useAuth } from './context/authContext'
import SurveyEdit from './pages/SurveyEdit'
import { DemoPage } from './pages/DemoPage'

function App() {
  const {auth} = useAuth();
  return (
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/dashboard' element={<Protected isLoggedIn={auth}><Dashboard/></Protected>}/>
        <Route path='/survey' element={<Protected isLoggedIn={auth}><CreateSurveyPage/></Protected>}/>
        <Route path='/survey/:id' element={<Protected isLoggedIn={auth}><SurveyEdit/></Protected>}/>
        <Route path='/survey/:ownerID/:sid' element={<Protected isLoggedIn={auth}><DemoPage/></Protected>}/>
      </Routes>
  );
}

export default App;
