import { useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
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
  const currUser = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <LastLocationProvider>
        <div className="dark-overlay" />
        <header>
          { loggedIn && <LoggedInNavbar login={setLoggedIn} /> }
          { !loggedIn && <Navbar /> }
        </header>
        <Switch>
          <Route exact path="/">
            <Home currentUser={currUser} login={setLoggedIn} />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login update={setLoggedIn} />
          </Route>
          <Route exact path="/books/:id">
            <Book currentUser={currUser} login={setLoggedIn} />
          </Route>
          <Route path="/books/:id/verses/:verse">
            <Verse currentUser={currUser} login={setLoggedIn} />
          </Route>
          <Route path="/favorites">
            <FavoritesList currentUser={currUser} login={setLoggedIn} />
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
