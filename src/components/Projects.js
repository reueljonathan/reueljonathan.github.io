import React from 'react';
import Paragraph from '../styled/Paragraph';
import HeaderWithIcon from './HeaderWithIcon';
import CodeIcon from '../svg/code.svg';

export default function Projects(props){
   return (
      <React.Fragment>
         <HeaderWithIcon id={props.id}
            width='24'
            height='24'
            iconHref={`${CodeIcon}#code`}>
            Projects
         </HeaderWithIcon>
         <Paragraph> Soon.</Paragraph>
      </React.Fragment>
   );
}
