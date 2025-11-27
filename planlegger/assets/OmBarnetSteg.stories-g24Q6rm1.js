import{j as s}from"./iframe-C6fHVOEJ.js";import{M as p,P as i,C as v}from"./usePlanleggerNavigator-ZJ12tRAf.js";import{P as c}from"./routes-Cyl7_Mgv.js";import{H as e}from"./HvemPlanleggerUtils-DZ9x4WMJ.js";import{O as l}from"./OmBarnetSteg-CkikG6J7.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-Xw_RZy9f.js";import"./PlanleggerStepPage--oL62Vd2.js";import"./useScrollBehaviour-DZYOZxGU.js";import"./BlueRadioGroup-0tVbfdQR.js";import"./customErrorFormatter-D1MerEZg.js";import"./TasklistStart-BBZ-EqeM.js";import"./PersonGroup-BFHtPx5s.js";const{action:P}=__STORYBOOK_MODULE_ACTIONS__,f={title:"steg/OmBarnetSteg",component:l,render:({hvemPlanlegger:g,gåTilNesteSide:m=P("button-click")})=>s.jsx(p,{initialEntries:[c.OM_BARNET],children:s.jsx(i,{initialState:{[v.HVEM_PLANLEGGER]:g},onDispatch:m,children:s.jsx(l,{})})})},r={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:e.MOR_OG_FAR}}},a={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:e.MOR}}},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:e.FAR}}},t={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:e.FAR_OG_FAR}}},o={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåMedmor:"Petra Utvikler",type:e.MOR_OG_MEDMOR}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    }
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
    }
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.FAR
    }
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Hugo Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    }
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåMedmor: 'Petra Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...o.parameters?.docs?.source}}};const H=["FlereForsørgere","AleneforsørgerMor","AleneforsørgerFar","FlereForsørgereFarOgFar","FlereForsørgereMorOgMor"];export{n as AleneforsørgerFar,a as AleneforsørgerMor,r as FlereForsørgere,t as FlereForsørgereFarOgFar,o as FlereForsørgereMorOgMor,H as __namedExportsOrder,f as default};
