import{l as e}from"./iframe-RMFhRmYV.js";import{h as i,A as l,f as m}from"./index-Cz6y2jRY.js";import{F as p,C as d}from"./FpDataContext-C_LH7Orl.js";import{M as c,S}from"./useFpNavigator-Bz8JiZ4k.js";import{S as r}from"./SenereUtenlandsoppholdSteg-yAtb0u-x.js";import"./preload-helper-D9Z9MdNV.js";import"./annenForelderUtils-C0qJhOc9.js";import"./eksisterendeSakUtils-CxWmePza.js";const{action:o}=__STORYBOOK_MODULE_ACTIONS__,u=()=>()=>(o("button-click")(),Promise.resolve()),f={skalBoUtenforNorgeNeste12Mnd:!0,harBoddUtenforNorgeSiste12Mnd:!1},E={title:"steps/SenereUtenlandsoppholdSteg",component:r,parameters:{msw:{handlers:[i.post(l.mellomlagring,()=>new m(null,{status:200}))]}},render:({gåTilNesteSide:a=o("button-click"),utenlandsopphold:s=f,...n})=>e.jsx(c,{initialEntries:[S.SENERE_UTENLANDSOPPHOLD],children:e.jsx(p,{onDispatch:a,initialState:{[d.UTENLANDSOPPHOLD]:s},children:e.jsx(r,{...n})})})},t={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:u(),avbrytSøknad:o("button-click")}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...t.parameters?.docs?.source}}};const U=["Default"];export{t as Default,U as __namedExportsOrder,E as default};
