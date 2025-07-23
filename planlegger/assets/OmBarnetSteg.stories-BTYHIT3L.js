import{j as o}from"./iframe-C0zW3gbC.js";import{M as m,P as p,C as i}from"./usePlanleggerNavigator-DtuLJGnq.js";import{P as c}from"./routes-Cyl7_Mgv.js";import{H as t}from"./HvemPlanleggerUtils-sI2mxn03.js";import{O as s}from"./OmBarnetSteg-fkeeVYg2.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-B_cvbOpn.js";import"./PlanleggerStepPage-6D9Suj-N.js";import"./useScrollBehaviour-C4b9TFXL.js";import"./BlueRadioGroup-D4jORFow.js";import"./customErrorFormatter-DXd23HFI.js";import"./TasklistStart-Bh9UirQy.js";import"./Spacer-DJSlEuZZ.js";import"./PersonGroup-BYuvRAD2.js";const{action:v}=__STORYBOOK_MODULE_ACTIONS__,h={title:"steg/OmBarnetSteg",component:s,render:({hvemPlanlegger:l,gåTilNesteSide:g=v("button-click")})=>o.jsx(m,{initialEntries:[c.OM_BARNET],children:o.jsx(p,{initialState:{[i.HVEM_PLANLEGGER]:l},onDispatch:g,children:o.jsx(s,{})})})},e={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR}}},r={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:t.MOR}}},a={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:t.FAR}}},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:t.FAR_OG_FAR}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
