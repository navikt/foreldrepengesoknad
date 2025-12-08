import{j as o}from"./iframe-ZcAMqDWh.js";import{S as s,c as i}from"./routes-Byzpc-Sj.js";import{U as e}from"./UtenlandsoppholdSteg-CxF8EWX5.js";import{M as c}from"./useSvpNavigator-CLai5982.js";import"./preload-helper-PPVm8Dsz.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,l=()=>()=>(r("button-click")(),Promise.resolve()),g={title:"steps/UtenlandsoppholdSteg",component:e,render:({gåTilNesteSide:a=r("button-click"),...n})=>o.jsx(c,{initialEntries:[s.UTENLANDSOPPHOLD],children:o.jsx(i,{onDispatch:a,children:o.jsx(e,{...n})})})},t={args:{mellomlagreSøknadOgNaviger:l(),avbrytSøknad:()=>r("button-click"),arbeidsforhold:[]}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: () => action('button-click'),
    arbeidsforhold: []
  }
}`,...t.parameters?.docs?.source}}};const O=["Default"];export{t as Default,O as __namedExportsOrder,g as default};
