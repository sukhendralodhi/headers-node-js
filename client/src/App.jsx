import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AllUrls from './components/AllUrls'
import FormComponent from './components/FormComponent'
import UrlAnalytics from './components/UrlAnalytics'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FormComponent />} />
        <Route path='/urls' element={<AllUrls />} />
        <Route path="/analytics/:shortId" element={<UrlAnalytics />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
