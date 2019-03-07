import React from 'react';
import styled from 'styled-components';

const Header2 = styled.h2`
   margin: 0;
   font-size: ${props => props.theme.h2.fontSize}
   color: ${props => props.theme.colors.primary}
`;

export default Header2;
