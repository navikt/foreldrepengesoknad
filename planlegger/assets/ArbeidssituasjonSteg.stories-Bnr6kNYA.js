import{j as o}from"./iframe-DR_yTEQ2.js";import{M as d,P as v,C as i}from"./usePlanleggerNavigator-DWUOwdmn.js";import{P as c}from"./routes-Cyl7_Mgv.js";import{D as s}from"./satserUtils-AGsKM-Dl.js";import{H as t}from"./HvemPlanleggerUtils-l8npJuzn.js";import{A as l}from"./ArbeidssituasjonSteg-CYvAD2op.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-Bs42bmr7.js";import"./BlueRadioGroup-3Wq5XYg4.js";import"./customErrorFormatter-u3RWS8jf.js";import"./PlanleggerStepPage-DbjmFHsl.js";import"./useScrollBehaviour-Cgp3rorI.js";const{action:A}=__STORYBOOK_MODULE_ACTIONS__,P=({hvemPlanlegger:m,gåTilNesteSide:g=A("button-click"),satser:p})=>o.jsx(d,{initialEntries:[c.ARBEIDSSITUASJON],children:o.jsx(v,{initialState:{[i.OM_BARNET]:{erFødsel:!0,erBarnetFødt:!1,antallBarn:"1",termindato:"2024-01-01"},[i.HVEM_PLANLEGGER]:m},onDispatch:g,children:o.jsx(l,{satser:p})})}),f={title:"steg/ArbeidssituasjonSteg",component:l,render:P},e={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR},satser:s}},r={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:t.MOR},satser:s}},a={args:{hvemPlanlegger:{navnPåMor:"Esther Utvikler",navnPåMedmor:void 0,type:t.MOR_OG_MEDMOR},satser:s}},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR},satser:s}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const h=["ArbeidssituasjonMorOgFar","ArbeidssituasjonAleneforsørger","ArbeidssituasjonMorOgMedmorUtenNavn","ArbeidssituasjonFarOgFar"];export{r as ArbeidssituasjonAleneforsørger,n as ArbeidssituasjonFarOgFar,e as ArbeidssituasjonMorOgFar,a as ArbeidssituasjonMorOgMedmorUtenNavn,h as __namedExportsOrder,f as default};
