import{j as n}from"./iframe-DDACrD87.js";import{M as u,P as v,C as t}from"./usePlanleggerNavigator-CMKb3z3b.js";import{P as c}from"./routes-Cyl7_Mgv.js";import{A as s}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as o}from"./satserUtils-tN1d9viq.js";import{H as i}from"./HvemPlanleggerUtils-DtVvCAm-.js";import{H as a}from"./HvorMyeSteg-B8wgD7cU.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-23QICeaT.js";import"./PlanleggerStepPage-DARo0GLf.js";import"./hvemHarRettUtils-ChzdvcHg.js";import"./Wallet-WSvsRS45.js";import"./Spacer-aJKfeyKc.js";const{action:E}=__STORYBOOK_MODULE_ACTIONS__,j={title:"steg/HvorMyeSteg",component:a,render:({hvorMye:l,hvemPlanlegger:m,arbeidssituasjon:p,gåTilNesteSide:g=E("button-click"),satser:d})=>n.jsx(u,{initialEntries:[c.HVOR_MYE],children:n.jsx(v,{initialState:{[t.HVOR_MYE]:l,[t.HVEM_PLANLEGGER]:m,[t.ARBEIDSSITUASJON]:p},onDispatch:g,children:n.jsx(a,{satser:d})})})},e={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:i.MOR_OG_FAR},arbeidssituasjon:{status:s.JOBBER,jobberAnnenPart:!0},satser:o,hvorMye:{lønnSøker1:void 0,lønnSøker2:void 0}}},r={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:i.MOR},arbeidssituasjon:{status:s.JOBBER},satser:o,hvorMye:{lønnSøker1:void 0}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const F=["FlereForsørgere","AleneforsørgerMor"];export{r as AleneforsørgerMor,e as FlereForsørgere,F as __namedExportsOrder,j as default};
