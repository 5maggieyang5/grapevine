import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'; // import the react-router-dom components
import { Home, Login, Register, ShowPosts } from './pages' // import our pages
import SimpleMap  from './Maptst';



const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component= {Home} />
      <Route exact path='/1' component= {Login} />
      <Route exact path='/2' component= {Register} />
      <Route exact path='/3' component= {SimpleMap}/>
      <Route exact path='/4' component= {ShowPosts}/>

    </Switch>
  </main>

)

const Header = () => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light  bg-light">
      <Link className="navbar-brand" to="/">Home</Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/1">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/2">Register</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/3">Test Map</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/4">Show Posts</Link>
      </li>
       
      </ul>
    </nav>
  </div>
)


const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

export default App;
