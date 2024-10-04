import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

let counter = 1

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)


// command to run json-server--->
//npx json-server --port 3001 --watch db.json