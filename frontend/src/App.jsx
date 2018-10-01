import React from 'react';
import { Switch, Route } from 'react-router-dom'; // import the react-router-dom components
import SimpleMap  from './Maptst';
import TopNav from './TopNav.jsx'
import './styles/App.css'
import Register from './Register.jsx'
import FoodRequest from './FoodRequest.jsx'
import Posts from './Home.jsx'

import Post from './Post.jsx'
import Trade from './Trade.jsx'

import Login from './Login.jsx'
import SearchedPosts from './SearchedPosts.jsx'
import NewPosts from './NewPosts.jsx'
import Trades from './Trades.jsx'

import 'mapbox-gl/dist/mapbox-gl.css'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component= {Posts} />
      <Route exact path='/login' component= {Login} />
      <Route exact path='/register' component= {Register} />
      <Route exact path='/map' component= {SimpleMap}/>

      <Route exact path='/Foodinfo' component ={Post} />
      <Route exact path = '/posts/:post_id' component ={Post} />
      <Route exact path='/FoodRequest' component ={FoodRequest} />
      <Route exact path='/posts/:postId/:selected' component = {Trade} />


      <Route exact path='/posts' component={SearchedPosts} />
      <Route exact path='/createNewPost' component={NewPosts} />
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
