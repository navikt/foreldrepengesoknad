import{_ as e}from"./iframe-ByzD4xDi.js";import{F as n,C as i}from"./FpDataContext-C9lxeT1r.js";import{M as l,S as c}from"./useFpNavigator-CaO3pVsU.js";import{U as o}from"./UtenlandsoppholdSteg-CkEibQ5b.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,m=()=>()=>(r("button-click")(),Promise.resolve()),g={title:"steps/UtenlandsoppholdSteg",component:o,render:({gåTilNesteSide:a,...s})=>e.jsx(l,{initialEntries:[c.UTENLANDSOPPHOLD],children:e.jsx(n,{onDispatch:a,initialState:{[i.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:e.jsx(o,{...s})})})},t={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:m(),avbrytSøknad:r("button-click")}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...t.parameters?.docs?.source}}};const O=["Default"];export{t as Default,O as __namedExportsOrder,g as default};
