import React, { Component } from 'react';
import { Collapse, Navbar, NavItem, NavbarToggler, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  toggleNavbar = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to='/'>Home</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Words
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>    
                  <Link className="nav-link" to='/words'>List</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Exercises
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Link className="nav-link" to='/reading-exercise'>Reading</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link className="nav-link" to='/writing-exercise'>Writing</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}