import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Hero from './pages/Hero';
import Search from './pages/Search';
import Read from './pages/Read';
import SetView from './pages/SetView';
import ImageDetails from './pages/ImageDetails';
import TableDetails from './pages/TableDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import PdfTable from './pages/PdfTable';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Login} />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/hero' component={Hero} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/read' component={Read} />
        <Route exact path='/setview' component={SetView} />
        <Route exact path='/imagedetails' component={ImageDetails} />
        <Route exact path='/tabledetails' component={TableDetails} />
        <Route exact path='/pdftable' component={PdfTable} />
      </Switch>
    </Router>
  );
}

export default App;
