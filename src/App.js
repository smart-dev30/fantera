import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/main'
import Checkout from './pages/checkout'
import 'react-notifications/lib/notifications.css'
import 'react-credit-cards/lib/styles.scss'
import './styles/main.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:ticket" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
