import React from 'react';
import styled from 'styled-components';
import Header1 from '../styled/Header1';
import SVG from '../styled/SVG';

const FlexHeader = styled(Header1)`
   display: flex;
   align-items: center;
`;

export default function HeaderWithIcon(props){
   return(
      <FlexHeader>
         <SVG width={props.width} height={props.height}>
            <use href={props.iconHref}
               width={props.width}
               height={props.height}
            />
         </SVG>
         {props.children}
      </FlexHeader>   
   );
}
