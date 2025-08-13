import{j as n}from"./iframe-hCHVhrPZ.js";import{M as u,P as v,C as t}from"./usePlanleggerNavigator-4oI-ddpm.js";import{P as c}from"./routes-Cyl7_Mgv.js";import{A as s}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as o}from"./satserUtils-CWZgftlC.js";import{H as i}from"./HvemPlanleggerUtils-1tKXz-7x.js";import{H as a}from"./HvorMyeSteg-C8ABwGnB.js";import"./barnetUtils-Ba1FRw0g.js";import"./PlanleggerStepPage-CFHltph5.js";import"./hvemHarRettUtils-CnQuB32B.js";import"./Wallet-DFOJsTNF.js";import"./Spacer-CGnCe6fT.js";const{action:E}=__STORYBOOK_MODULE_ACTIONS__,h={title:"steg/HvorMyeSteg",component:a,render:({hvorMye:l,hvemPlanlegger:m,arbeidssituasjon:p,gåTilNesteSide:g=E("button-click"),satser:d})=>n.jsx(u,{initialEntries:[c.HVOR_MYE],children:n.jsx(v,{initialState:{[t.HVOR_MYE]:l,[t.HVEM_PLANLEGGER]:m,[t.ARBEIDSSITUASJON]:p},onDispatch:g,children:n.jsx(a,{satser:d})})})},e={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:i.MOR_OG_FAR},arbeidssituasjon:{status:s.JOBBER,jobberAnnenPart:!0},satser:o,hvorMye:{lønnSøker1:void 0,lønnSøker2:void 0}}},r={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:i.MOR},arbeidssituasjon:{status:s.JOBBER},satser:o,hvorMye:{lønnSøker1:void 0}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const j=["FlereForsørgere","AleneforsørgerMor"];export{r as AleneforsørgerMor,e as FlereForsørgere,j as __namedExportsOrder,h as default};
