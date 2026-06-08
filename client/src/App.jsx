import { useState } from 'react'
import './App.css'
import FormComponent from './components/FormComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
      <FormComponent />
    </div>
  )
}

export default App
