import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/main'
import Order from './pages/order'

import './style.scss'
import 'react-notifications/lib/notifications.css'
import 'react-credit-cards/lib/styles.scss'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:ticket" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
