import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import profileImage from './img/profile-2019.png';

import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';

import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import theme from './styled/theme';

const Root = styled.div`
   background-color: ${props => props.theme.backgroundColor};
   color: ${props => props.theme.colors.secondary}
   font-family: ${props => props.theme.fontFamily}
`;

const links = [
   { href:'#about', text:'About' },
   { href:'#projects', text:'Projects' },
   { href:'#skills', text:'Skills' },
];

function App(props){
   return (
      <ThemeProvider theme={theme}>
         <Root>
            <Header imgSource={profileImage} />
            <Navbar links={links} />

            <About id="about" width='24' height='24'/>
            <Projects id="projects" />
            <Skills id="skills" />

         </Root>
      </ThemeProvider>
   );
}

ReactDOM.render( <App />, document.getElementById('root') );
