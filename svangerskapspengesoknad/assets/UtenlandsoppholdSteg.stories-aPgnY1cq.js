import{j as o}from"./iframe-D7gQvS2B.js";import{S as s,c as i}from"./routes-Dq3cNFa3.js";import{U as e}from"./UtenlandsoppholdSteg-mUXWr8w4.js";import{M as c}from"./useSvpNavigator-B4GuBgJF.js";import"./preload-helper-D9Z9MdNV.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,l=()=>()=>(r("button-click")(),Promise.resolve()),g={title:"steps/UtenlandsoppholdSteg",component:e,render:({gåTilNesteSide:a=r("button-click"),...n})=>o.jsx(c,{initialEntries:[s.UTENLANDSOPPHOLD],children:o.jsx(i,{onDispatch:a,children:o.jsx(e,{...n})})})},t={args:{mellomlagreSøknadOgNaviger:l(),avbrytSøknad:()=>r("button-click"),arbeidsforhold:[]}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: () => action('button-click'),
    arbeidsforhold: []
  }
}`,...t.parameters?.docs?.source}}};const O=["Default"];export{t as Default,O as __namedExportsOrder,g as default};
