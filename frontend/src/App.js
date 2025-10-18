import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import BookingHistoryPage from './pages/BookingHistoryPage.jsx';
import './styles/main.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/booking-history" component={BookingHistoryPage} />
      </Switch>
    </Router>
  );
};

export default App;