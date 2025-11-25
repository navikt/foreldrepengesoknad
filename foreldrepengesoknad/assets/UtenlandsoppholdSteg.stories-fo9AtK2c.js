import{l as o}from"./iframe-BRbIGTdy.js";import{F as n,C as i}from"./FpDataContext-DPE-urfQ.js";import{M as l,S as m}from"./useFpNavigator-DvM6Xj6C.js";import{U as e}from"./UtenlandsoppholdSteg-XEqnYb5o.js";import"./preload-helper-D9Z9MdNV.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,c=()=>()=>(r("button-click")(),Promise.resolve()),O={title:"steps/UtenlandsoppholdSteg",component:e,render:({gåTilNesteSide:a,...s})=>o.jsx(l,{initialEntries:[m.UTENLANDSOPPHOLD],children:o.jsx(n,{onDispatch:a,initialState:{[i.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:o.jsx(e,{...s})})})},t={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:c(),avbrytSøknad:r("button-click")}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...t.parameters?.docs?.source}}};const f=["Default"];export{t as Default,f as __namedExportsOrder,O as default};
