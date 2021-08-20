import Home from './Home'
import { Contact, About } from './Pages'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import './App.css'
import ProductDetails from './ProductDetails'
import { useSelector } from 'react-redux'

function App() {
  const cart = useSelector(state => state.cart)  
  return (
    <Router>
      <header>
        <h1>Plants Direct</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link style={{margin: '0 .5rem'}} to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <section style={{marginLeft: '1rem'}}>🛒 ({cart.length})</section>
      </header>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/products/:productId">
          <ProductDetails />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
