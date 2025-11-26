import{j as n}from"./iframe-DB7pqv55.js";import{M as u,P as v,C as t}from"./usePlanleggerNavigator-Cp5BkLC7.js";import{P as c}from"./routes-Cyl7_Mgv.js";import{A as s,H as o}from"./HvemPlanleggerUtils-BbNdZgbe.js";import{D as i}from"./satserUtils-1JHaC4Vq.js";import{H as a}from"./HvorMyeSteg-CgIC7x8O.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-ClIchO_2.js";import"./PlanleggerStepPage-CDx2LBSi.js";import"./hvemHarRettUtils-BpexxDWu.js";import"./useScrollBehaviour-D7XLKSQH.js";import"./Wallet-DI4p2iyn.js";const{action:E}=__STORYBOOK_MODULE_ACTIONS__,h={title:"steg/HvorMyeSteg",component:a,render:({hvorMye:l,hvemPlanlegger:m,arbeidssituasjon:p,gåTilNesteSide:g=E("button-click"),satser:d})=>n.jsx(u,{initialEntries:[c.HVOR_MYE],children:n.jsx(v,{initialState:{[t.HVOR_MYE]:l,[t.HVEM_PLANLEGGER]:m,[t.ARBEIDSSITUASJON]:p},onDispatch:g,children:n.jsx(a,{satser:d})})})},e={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:o.MOR_OG_FAR},arbeidssituasjon:{status:s.JOBBER,jobberAnnenPart:!0},satser:i,hvorMye:{lønnSøker1:void 0,lønnSøker2:void 0}}},r={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:o.MOR},arbeidssituasjon:{status:s.JOBBER},satser:i,hvorMye:{lønnSøker1:void 0}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
