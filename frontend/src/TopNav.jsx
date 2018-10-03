import React from 'react'
import {Link} from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Badge,
  Breadcrumb,
  BreadcrumbItem, InputGroup,
  InputGroupAddon,
  Button,
  Input,
} from 'reactstrap'
import Resource from './models/resource'
const UsersDB = Resource('users')

class TopNav extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      searchInput: "",
      current_username: ''
    }
  }

  componentDidMount() {
    UsersDB.find(1).then(result => this.setState({current_username: result.username}));
  }

  handleChange = evt => {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    return (
      <div>
        <Navbar id="navbar" expand="md">
          <NavbarBrand>
            <Link to='/'  id="navbar-brand">
              Grapevine
            </Link>
          </NavbarBrand>

          <InputGroup id="nav-search">
            <Input onChange={this.handleChange} name="searchInput"/>
            <InputGroupAddon addonType="append">
              <Button id="search-button" tag={Link} to={`/posts?food_name=${this.state.searchInput}`} >
                Search
              </Button>

            </InputGroupAddon>
          </InputGroup>

            <Nav className="ml-auto" navbar>

              <NavItem>
                <Button id="create-post" tag={Link} to='/createNewPost'>
                  New Post
                </Button>
              </NavItem>

              <NavItem>
                <h2 id="welcome-user">
                  Welcome, {this.state.current_username}
                </h2>
              </NavItem>
              {/*<Breadcrumb>
                <BreadcrumbItem>
                  <Link to='/login'>Log In</Link>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <Link to='/register'>Register</Link>
                </BreadcrumbItem>

                <BreadcrumbItem active>
                  <Link to='/user'>User Profile</Link>
                </BreadcrumbItem>
              </Breadcrumb>*/}
            </Nav>
        </Navbar>
      </div>
    );
  }
}

export default TopNav
