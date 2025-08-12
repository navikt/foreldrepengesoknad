import{j as o}from"./iframe-D2c3Nw0A.js";import{M as d,P as v,C as i}from"./usePlanleggerNavigator-DQxUUH20.js";import{P as c}from"./routes-Cyl7_Mgv.js";import{D as s}from"./satserUtils-QPVjacxi.js";import{H as t}from"./HvemPlanleggerUtils-D9U4hfzQ.js";import{A as l}from"./ArbeidssituasjonSteg-BPb_92og.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-D5M6B_Jj.js";import"./BlueRadioGroup-DNc3H7ue.js";import"./customErrorFormatter-DJK05_o6.js";import"./PlanleggerStepPage-CwvSannI.js";import"./useScrollBehaviour-BSQm-pg4.js";import"./Spacer-Dcyx7hV7.js";const{action:A}=__STORYBOOK_MODULE_ACTIONS__,P=({hvemPlanlegger:m,gåTilNesteSide:g=A("button-click"),satser:p})=>o.jsx(d,{initialEntries:[c.ARBEIDSSITUASJON],children:o.jsx(v,{initialState:{[i.OM_BARNET]:{erFødsel:!0,erBarnetFødt:!1,antallBarn:"1",termindato:"2024-01-01"},[i.HVEM_PLANLEGGER]:m},onDispatch:g,children:o.jsx(l,{satser:p})})}),h={title:"steg/ArbeidssituasjonSteg",component:l,render:P},e={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR},satser:s}},r={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:t.MOR},satser:s}},a={args:{hvemPlanlegger:{navnPåMor:"Esther Utvikler",navnPåMedmor:void 0,type:t.MOR_OG_MEDMOR},satser:s}},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR},satser:s}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
