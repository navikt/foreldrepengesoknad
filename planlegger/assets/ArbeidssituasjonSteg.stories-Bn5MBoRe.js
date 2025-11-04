import{j as o}from"./iframe-5Q6VtAAo.js";import{M as d,P as v,C as i}from"./usePlanleggerNavigator-DjkwqAs9.js";import{P as c}from"./routes-Cyl7_Mgv.js";import{D as s}from"./satserUtils-BT2J8iIT.js";import{H as t}from"./HvemPlanleggerUtils-BaS1So_L.js";import{A as l}from"./ArbeidssituasjonSteg-BLlCVGWy.js";import"./preload-helper-D9Z9MdNV.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-ThyT0CXo.js";import"./BlueRadioGroup-CQHpv_Yt.js";import"./customErrorFormatter-Bfkcc01J.js";import"./PlanleggerStepPage-gNQM08EE.js";import"./useScrollBehaviour-BSDSqwOQ.js";import"./Spacer-BdFY-L4H.js";const{action:A}=__STORYBOOK_MODULE_ACTIONS__,P=({hvemPlanlegger:m,gåTilNesteSide:g=A("button-click"),satser:p})=>o.jsx(d,{initialEntries:[c.ARBEIDSSITUASJON],children:o.jsx(v,{initialState:{[i.OM_BARNET]:{erFødsel:!0,erBarnetFødt:!1,antallBarn:"1",termindato:"2024-01-01"},[i.HVEM_PLANLEGGER]:m},onDispatch:g,children:o.jsx(l,{satser:p})})}),k={title:"steg/ArbeidssituasjonSteg",component:l,render:P},e={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR},satser:s}},r={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:t.MOR},satser:s}},a={args:{hvemPlanlegger:{navnPåMor:"Esther Utvikler",navnPåMedmor:void 0,type:t.MOR_OG_MEDMOR},satser:s}},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR},satser:s}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const D=["ArbeidssituasjonMorOgFar","ArbeidssituasjonAleneforsørger","ArbeidssituasjonMorOgMedmorUtenNavn","ArbeidssituasjonFarOgFar"];export{r as ArbeidssituasjonAleneforsørger,n as ArbeidssituasjonFarOgFar,e as ArbeidssituasjonMorOgFar,a as ArbeidssituasjonMorOgMedmorUtenNavn,D as __namedExportsOrder,k as default};
