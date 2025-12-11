import{j as o}from"./iframe-CHAdjWow.js";import{S as s,c as i}from"./routes-D7s0K2fF.js";import{U as e}from"./UtenlandsoppholdSteg-oX4QL_h3.js";import{M as c}from"./useSvpNavigator-DcsIIyju.js";import"./preload-helper-PPVm8Dsz.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,l=()=>()=>(r("button-click")(),Promise.resolve()),g={title:"steps/UtenlandsoppholdSteg",component:e,render:({gåTilNesteSide:a=r("button-click"),...n})=>o.jsx(c,{initialEntries:[s.UTENLANDSOPPHOLD],children:o.jsx(i,{onDispatch:a,children:o.jsx(e,{...n})})})},t={args:{mellomlagreSøknadOgNaviger:l(),avbrytSøknad:()=>r("button-click"),arbeidsforhold:[]}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: () => action('button-click'),
    arbeidsforhold: []
  }
}`,...t.parameters?.docs?.source}}};const O=["Default"];export{t as Default,O as __namedExportsOrder,g as default};
