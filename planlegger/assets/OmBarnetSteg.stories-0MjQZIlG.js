import{j as s}from"./iframe-5Q6VtAAo.js";import{M as p,P as i,C as v}from"./usePlanleggerNavigator-DjkwqAs9.js";import{P as c}from"./routes-Cyl7_Mgv.js";import{H as e}from"./HvemPlanleggerUtils-BaS1So_L.js";import{O as l}from"./OmBarnetSteg-DOjJgkpG.js";import"./preload-helper-D9Z9MdNV.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-ThyT0CXo.js";import"./PlanleggerStepPage-gNQM08EE.js";import"./useScrollBehaviour-BSDSqwOQ.js";import"./BlueRadioGroup-CQHpv_Yt.js";import"./customErrorFormatter-Bfkcc01J.js";import"./TasklistStart-ByVg2wLj.js";import"./Spacer-BdFY-L4H.js";import"./PersonGroup-BELxf0j6.js";const{action:P}=__STORYBOOK_MODULE_ACTIONS__,S={title:"steg/OmBarnetSteg",component:l,render:({hvemPlanlegger:g,gåTilNesteSide:m=P("button-click")})=>s.jsx(p,{initialEntries:[c.OM_BARNET],children:s.jsx(i,{initialState:{[v.HVEM_PLANLEGGER]:g},onDispatch:m,children:s.jsx(l,{})})})},r={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:e.MOR_OG_FAR}}},a={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:e.MOR}}},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:e.FAR}}},t={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:e.FAR_OG_FAR}}},o={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåMedmor:"Petra Utvikler",type:e.MOR_OG_MEDMOR}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const T=["FlereForsørgere","AleneforsørgerMor","AleneforsørgerFar","FlereForsørgereFarOgFar","FlereForsørgereMorOgMor"];export{n as AleneforsørgerFar,a as AleneforsørgerMor,r as FlereForsørgere,t as FlereForsørgereFarOgFar,o as FlereForsørgereMorOgMor,T as __namedExportsOrder,S as default};
