import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import Home from './Home';
import Book from '../containers/Book';
import Footer from './common/Footer';
import Navbar from './common/Navbar';
import LoggedInNavbar from './common/NavbarLogin';
import Login from './Login';
import Signup from './Signup';
import Verse from '../containers/Verse';
import FavoritesList from '../containers/FavoritesList';
import NotFound from './404NotFound';

const Routes = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <Router>
      <LastLocationProvider>
        <div className="dark-overlay" />
        <header>
          { loggedIn && <LoggedInNavbar status={handleLogin} /> }
          { !loggedIn && <Navbar /> }
        </header>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login update={handleLogin} />
          </Route>
          <Route exact path="/books/:id">
            <Book login={loggedIn} />
          </Route>
          <Route path="/books/:id/verses/:verse">
            <Verse />
          </Route>
          <Route path="/favorites">
            <FavoritesList />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </LastLocationProvider>
    </Router>
  );
};

export default Routes;
