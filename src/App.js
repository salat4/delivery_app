
import './App.css';
import { Routes,  Route } from 'react-router-dom';
import Shop from './components/Shop/Shop';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Navigation from './components/Navigation/Navigation';


export const  App = () => {
  return (
    <>
      <Navigation></Navigation>
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/shopping-cart' element={<ShoppingCart/> } />
      </Routes>
    </>
  );
}
