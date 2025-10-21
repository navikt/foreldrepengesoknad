import{j as n}from"./iframe-BDgwCH-l.js";import{M as u,P as v,C as t}from"./usePlanleggerNavigator-GW_IQNEq.js";import{P as c}from"./routes-Cyl7_Mgv.js";import{A as s}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as o}from"./satserUtils-C6uEiA7o.js";import{H as i}from"./HvemPlanleggerUtils-BEwfDS-_.js";import{H as a}from"./HvorMyeSteg-BOzgW7OK.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-CsAn-_Ru.js";import"./PlanleggerStepPage-B5gGWiak.js";import"./hvemHarRettUtils-C6P04xZs.js";import"./useScrollBehaviour-BOyMqIjq.js";import"./Wallet-thACeoqG.js";import"./Spacer-DAkEaI2z.js";const{action:E}=__STORYBOOK_MODULE_ACTIONS__,F={title:"steg/HvorMyeSteg",component:a,render:({hvorMye:l,hvemPlanlegger:m,arbeidssituasjon:p,gåTilNesteSide:g=E("button-click"),satser:d})=>n.jsx(u,{initialEntries:[c.HVOR_MYE],children:n.jsx(v,{initialState:{[t.HVOR_MYE]:l,[t.HVEM_PLANLEGGER]:m,[t.ARBEIDSSITUASJON]:p},onDispatch:g,children:n.jsx(a,{satser:d})})})},e={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:i.MOR_OG_FAR},arbeidssituasjon:{status:s.JOBBER,jobberAnnenPart:!0},satser:o,hvorMye:{lønnSøker1:void 0,lønnSøker2:void 0}}},r={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:i.MOR},arbeidssituasjon:{status:s.JOBBER},satser:o,hvorMye:{lønnSøker1:void 0}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    satser: DEFAULT_SATSER,
    hvorMye: {
      lønnSøker1: undefined,
      lønnSøker2: undefined
    }
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    satser: DEFAULT_SATSER,
    hvorMye: {
      lønnSøker1: undefined
    }
  }
}`,...r.parameters?.docs?.source}}};const U=["FlereForsørgere","AleneforsørgerMor"];export{r as AleneforsørgerMor,e as FlereForsørgere,U as __namedExportsOrder,F as default};
