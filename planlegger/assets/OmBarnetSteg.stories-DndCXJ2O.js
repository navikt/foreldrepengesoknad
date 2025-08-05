import{j as o}from"./iframe-7czCGN7b.js";import{M as m,P as p,C as i}from"./usePlanleggerNavigator-DYP19ueN.js";import{P as c}from"./routes-Cyl7_Mgv.js";import{H as t}from"./HvemPlanleggerUtils-CeanplYH.js";import{O as s}from"./OmBarnetSteg-BlPx_42T.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-CJBenv_k.js";import"./PlanleggerStepPage-tD3jivVV.js";import"./useScrollBehaviour-DPu1hTQy.js";import"./BlueRadioGroup-CFSMi-Z0.js";import"./customErrorFormatter-BXuhwfyP.js";import"./TasklistStart-CCVw0mVB.js";import"./Spacer-CcLD0oTU.js";import"./PersonGroup-C9CGBS0E.js";const{action:v}=__STORYBOOK_MODULE_ACTIONS__,h={title:"steg/OmBarnetSteg",component:s,render:({hvemPlanlegger:l,gåTilNesteSide:g=v("button-click")})=>o.jsx(m,{initialEntries:[c.OM_BARNET],children:o.jsx(p,{initialState:{[i.HVEM_PLANLEGGER]:l},onDispatch:g,children:o.jsx(s,{})})})},e={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR}}},r={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:t.MOR}}},a={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:t.FAR}}},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:t.FAR_OG_FAR}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
