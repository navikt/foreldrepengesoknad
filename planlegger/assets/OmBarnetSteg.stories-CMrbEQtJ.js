import{j as o}from"./iframe-lQp3spMt.js";import{M as m,P as p,C as i}from"./usePlanleggerNavigator-B4tkWjv3.js";import{P as c}from"./routes-Cyl7_Mgv.js";import{H as t}from"./HvemPlanleggerUtils-BN412Ngh.js";import{O as s}from"./OmBarnetSteg-DLCfNdSR.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-126h3eTM.js";import"./PlanleggerStepPage-DgPX9gP_.js";import"./useScrollBehaviour-BwJRysQl.js";import"./BlueRadioGroup-CoIJ7gfl.js";import"./customErrorFormatter-ByVips7c.js";import"./TasklistStart-OgWfcHpC.js";import"./Spacer-B3jPneWW.js";import"./PersonGroup-Csbf841L.js";const{action:v}=__STORYBOOK_MODULE_ACTIONS__,h={title:"steg/OmBarnetSteg",component:s,render:({hvemPlanlegger:l,gåTilNesteSide:g=v("button-click")})=>o.jsx(m,{initialEntries:[c.OM_BARNET],children:o.jsx(p,{initialState:{[i.HVEM_PLANLEGGER]:l},onDispatch:g,children:o.jsx(s,{})})})},e={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR}}},r={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:t.MOR}}},a={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:t.FAR}}},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:t.FAR_OG_FAR}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    }
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
    }
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.FAR
    }
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Hugo Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    }
  }
}`,...n.parameters?.docs?.source}}};const x=["FlereForsørgere","AleneforsørgerMor","AleneforsørgerFar","FlereForsørgereFarOgFar"];export{a as AleneforsørgerFar,r as AleneforsørgerMor,e as FlereForsørgere,n as FlereForsørgereFarOgFar,x as __namedExportsOrder,h as default};
