import{j as o}from"./iframe-DQwDPExg.js";import{M as d,P as v,C as i}from"./usePlanleggerNavigator-SSsX-AKq.js";import{P as c}from"./routes-Cyl7_Mgv.js";import{H as s}from"./HvemPlanleggerUtils-CHX4c2X2.js";import{A as l}from"./ArbeidssituasjonSteg-CTI3--NT.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-DIdrQew2.js";import"./BlueRadioGroup-nRVHGJll.js";import"./customErrorFormatter-hIY99Dql.js";import"./PlanleggerStepPage-hPT-F9Sx.js";import"./satserUtils-BheF6V5A.js";import"./useScrollBehaviour-ptYB-jQz.js";import"./Spacer-BlEVdZSL.js";const{action:A}=__STORYBOOK_MODULE_ACTIONS__,t={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},u=({hvemPlanlegger:m,gåTilNesteSide:g=A("button-click"),satser:p})=>o.jsx(d,{initialEntries:[c.ARBEIDSSITUASJON],children:o.jsx(v,{initialState:{[i.OM_BARNET]:{erFødsel:!0,erBarnetFødt:!1,antallBarn:"1",termindato:"2024-01-01"},[i.HVEM_PLANLEGGER]:m},onDispatch:g,children:o.jsx(l,{satser:p})})}),h={title:"steg/ArbeidssituasjonSteg",component:l,render:u},e={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_FAR},satser:t}},r={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:s.MOR},satser:t}},a={args:{hvemPlanlegger:{navnPåMor:"Esther Utvikler",navnPåMedmor:void 0,type:s.MOR_OG_MEDMOR},satser:t}},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:s.FAR_OG_FAR},satser:t}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
    },
    satser: DEFAULT_SATSER
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Esther Utvikler',
      navnPåMedmor: undefined,
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    },
    satser: DEFAULT_SATSER
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...n.parameters?.docs?.source}}};const k=["ArbeidssituasjonMorOgFar","ArbeidssituasjonAleneforsørger","ArbeidssituasjonMorOgMedmorUtenNavn","ArbeidssituasjonFarOgFar"];export{r as ArbeidssituasjonAleneforsørger,n as ArbeidssituasjonFarOgFar,e as ArbeidssituasjonMorOgFar,a as ArbeidssituasjonMorOgMedmorUtenNavn,k as __namedExportsOrder,h as default};
