import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'; // import the react-router-dom components
import SimpleMap  from './Maptst';
import TopNav from './TopNav.jsx'
import './styles/App.css'
import Register from './Register.jsx'
import Posts from './Home.jsx'
import Login from './Login.jsx'
import SearchedPosts from './SearchedPosts.jsx'
import NewPosts from './NewPosts.jsx'
import Trades from './Trades.jsx'


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component= {Posts} />
      <Route exact path='/login' component= {Login} />
      <Route exact path='/register' component= {Register} />
      <Route exact path='/map' component= {SimpleMap}/>
      <Route exact path='/posts' component={SearchedPosts} />
      <Route exact path='/creatNewPost' component={NewPosts} />
      <Route exact path='/trades' component={Trades} />
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
