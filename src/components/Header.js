import React from 'react';
import styled from 'styled-components'; 
import Header1 from '../styled/Header1';
import Header2 from '../styled/Header2';

const FlexContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 1em;

   font-family: ${props => props.theme.fontFamily}
`;

const ProfileImage = styled.img`
   border-radius: 100%;
   border-width: 0.2em;
   border-style: solid;
   border-color: ${props => props.theme.colors.primary};
   width: 7em;
`;

export default function Header(props){
   return (
      <FlexContainer>
         <ProfileImage src={props.imgSource} />
         <Header1> Reuel Jonathan </Header1>
         <Header2> Software Developer </Header2>
      </FlexContainer>
   );
}
