import React from 'react';
import Paragraph from '../styled/Paragraph';
import HeaderWithIcon from './HeaderWithIcon';
import UserIcon from '../svg/user.svg';

export default function About(props){
   return (
      <React.Fragment>
         <HeaderWithIcon id={props.id} width='24' height='24' 
            iconHref={`${UserIcon}#user`}>
            About
         </HeaderWithIcon>
         <Paragraph>
            I started my career at 2013 with 17 years old, working at C.E.S.A.R (Recife, Brazil) as an apprentice developer.
            There I worked in different projects, with the most variated technologies. ASP.Net MVC, Java, Lua, Javascript, AngularJS...
            just to name a few. There were almost 6 different projects, in a duration of 3 years, what helped me develop the
            ability of learn new things in a short period of time.
         </Paragraph>
         <Paragraph>
            I like to define myself as a curious person, because I like to know how stuff works. Does not matter if it is how to 
            play an instrument, develop a NES game with Assembly, or learn a new programming language.
         </Paragraph>
      </React.Fragment>
   );
}
