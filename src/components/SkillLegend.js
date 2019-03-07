import React from 'react';
import styled from 'styled-components';
import SKILL_LEVEL from '../constants/SkillLevel';

const Legend = styled.span`
   margin: 0 1em;
`;

export default function SkillLegend(props){
   let fill;

   switch(props.level){
      case SKILL_LEVEL.LOW:
         fill = '#d7263d';
         break;
      case SKILL_LEVEL.MEDIUM:
         fill = '#0197f6';
         break;
      case SKILL_LEVEL.HIGH:
         fill = '#d6ff79';
         break;
      default:
         fill = '#fff';
   }

   return (
      <Legend>
         <svg width='20' height='10'>
            <circle cx='10' cy='5' r='5' fill={fill} />
         </svg>
         {props.children}
      </Legend>
   );
}
