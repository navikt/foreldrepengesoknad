import{l as e}from"./iframe-gDD2DzZq.js";import{M as i,S as l,A as d}from"./useFpNavigator-DwrbMQ6P.js";import{F as m,C as p}from"./FpDataContext-C6uCSol7.js";import{h as c,H as u}from"./index-CMx7W5EN.js";import{T as r}from"./TidligereUtenlandsoppholdSteg-HTkLEjjX.js";import"./preload-helper-D9Z9MdNV.js";const{action:o}=__STORYBOOK_MODULE_ACTIONS__,g=()=>()=>(o("button-click")(),Promise.resolve()),S={skalBoUtenforNorgeNeste12Mnd:!1,harBoddUtenforNorgeSiste12Mnd:!0},N={title:"steps/TidligereUtenlandsoppholdSteg",component:r,parameters:{msw:{handlers:[c.post(d.mellomlagring,()=>new u(null,{status:200}))]}},render:({gåTilNesteSide:a=o("button-click"),utenlandsopphold:s=S,...n})=>e.jsx(i,{initialEntries:[l.TIDLIGERE_UTENLANDSOPPHOLD],children:e.jsx(m,{onDispatch:a,initialState:{[p.UTENLANDSOPPHOLD]:s},children:e.jsx(r,{...n})})})},t={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:g(),avbrytSøknad:o("button-click")}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...t.parameters?.docs?.source}}};const x=["Default"];export{t as Default,x as __namedExportsOrder,N as default};
