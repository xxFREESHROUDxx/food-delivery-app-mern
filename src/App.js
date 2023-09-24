import './App.css';
import Home from './screens/Home';
import { Login } from './screens/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createuser' element={<Signup />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
