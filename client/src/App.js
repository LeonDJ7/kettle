import logo from './logo.svg'
import Main from './Main'
import './App.css'
import Nav from './components/nav/Nav'

function App() {
  return (
    <div className="App">
        <div className="header">
            <Nav />
            <Main />
        </div>
    </div>
  )
}

export default App
