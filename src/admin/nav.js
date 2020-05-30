import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import Cookie from 'js-cookie';
import { BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect,withRouter } from 'react-router-dom'
import './cssjs/nav.css'
const Navigation = (props) => {
const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  console.log(props)
  return (
      
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">WebPet Admin</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
            <Link to="/mainadmin/usermanager">User Manager</Link>

            </NavItem>
            <NavItem>
              <Link to="/mainadmin/productmanager">Product Manager</Link>
            </NavItem>
            <NavItem>
              <Link to="/mainadmin/order">Order Manager</Link>
            </NavItem>

            <NavItem>
              <Link to="/mainadmin/chart" >Dashboard Chart</Link>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
               {props.data.name}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <a href="/mainadmin" onClick={()=>{
                     Cookie.remove('emailad');
                    //  window.location.reload(false);
                }}>
                  Log Out
                </a>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavItem>
            <div className="wellcomImgUser">
                <img src={props.data.userImg} alt="imgAvater"></img>
                
            </div>
          </NavItem>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default withRouter(Navigation);