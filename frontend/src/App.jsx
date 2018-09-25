import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'; // import the react-router-dom components
import { Home, Login } from './pages' // import our pages
import SimpleMap  from './Maptst';
import TopNav from './TopNav.jsx'
import './styles/App.css'
import Register from './Register.jsx'


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component= {Home} />
      <Route exact path='/login' component= {Login} />
      <Route exact path='/register' component= {Register} />
      <Route exact path='/map' component= {SimpleMap}/>
    </Switch>
  </main>

)


const App = () => (
  <div>
    <TopNav />
    <Main />
  </div>
)

export default App;
