import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'; // import the react-router-dom components
import { Login } from './pages' // import our pages
import SimpleMap  from './Maptst';
import TopNav from './TopNav.jsx'
import './styles/App.css'
import Register from './Register.jsx'
import FoodRequest from './FoodRequest.jsx'
import Posts from './Home.jsx'
import Post from './Post.jsx'


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component= {Posts} />
      <Route exact path='/login' component= {Login} />
      <Route exact path='/register' component= {Register} />
      <Route exact path='/map' component= {SimpleMap}/>
      <Route exact path='/Foodinfo' component ={Post} />
      <Route exact path = '/posts/:postId' component ={Post} />
      <Route exact path='/FoodRequest' component ={FoodRequest} />
    
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
