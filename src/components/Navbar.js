import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
   text-align: center;
`;

const NavList = styled.ul`
   list-style: none;
   margin: 0;
   padding: 0;
`;

const NavItem = styled.li`
   display: inline-block;
   margin: 1em 0;
`;

const NavLink = styled.a`
   text-decoration: none;
`;

export default function Navbar(props){
   return (
      <Nav>
         <NavList>
            { props.links.map( link => 
               <NavItem>
                  <NavLink href={link.href}>{link.text}</NavLink>
               </NavItem>
            )}
         </NavList>
      </Nav>
   );
}
