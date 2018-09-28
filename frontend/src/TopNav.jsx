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
  Input} from 'reactstrap'

class TopNav extends React.Component {

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <Link to='/'>
              ~Grapevine~
            </Link>
          </NavbarBrand>

          <NavbarBrand>
            <Link to='/'>
              About US!
            </Link>
          </NavbarBrand>

          <InputGroup id="nav-search">
            <Input />
            <InputGroupAddon addonType="append">
              <Button color="secondary">Search</Button>
            </InputGroupAddon>
          </InputGroup>

            <Nav className="ml-auto" navbar>

              <NavItem>
               <Badge color="warning" id="creat-post">
                  <Link to='/creatNewPost'>
                    Create New Post
                  </Link>
                </Badge>
              </NavItem>

              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to='/login'>Log In</Link>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <Link to='/register'>Register</Link>
                </BreadcrumbItem>
                
                <BreadcrumbItem>
                  <Link to='/Foodinfo'>TestFood</Link>
              </BreadcrumbItem>


                <BreadcrumbItem active>
                  <Link to='/user'>User Profile</Link>
                </BreadcrumbItem>
              </Breadcrumb>
            </Nav>
        </Navbar>
      </div>
    );
  }
}

export default TopNav
