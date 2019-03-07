import React from 'react';
import styled from 'styled-components';


const Header1 = styled.h1`
   margin: 0;
   font-size: ${props => props.theme.h1.fontSize}
   color: ${props => props.theme.colors.primary}
`;

export default Header1;
