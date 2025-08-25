import{_ as t}from"./iframe-lCO4QE_Q.js";import{F as i,C as l}from"./FpDataContext-CkLM65TO.js";import{M as d,S as p}from"./useFpNavigator-Cfzgj4S6.js";import{h as m,H as c}from"./index-HUUkS92L.js";import{T as o}from"./TidligereUtenlandsoppholdSteg-43zxy8nt.js";import"./preload-helper-D9Z9MdNV.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,u=()=>()=>(r("button-click")(),Promise.resolve()),g={skalBoUtenforNorgeNeste12Mnd:!1,harBoddUtenforNorgeSiste12Mnd:!0},k={title:"steps/TidligereUtenlandsoppholdSteg",component:o,parameters:{msw:{handlers:[m.post(".//rest/storage/foreldrepenger",()=>new c(null,{status:200}))]}},render:({gåTilNesteSide:a=r("button-click"),utenlandsopphold:s=g,...n})=>t.jsx(d,{initialEntries:[p.TIDLIGERE_UTENLANDSOPPHOLD],children:t.jsx(i,{onDispatch:a,initialState:{[l.UTENLANDSOPPHOLD]:s},children:t.jsx(o,{...n})})})},e={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:u(),avbrytSøknad:r("button-click")}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...e.parameters?.docs?.source}}};const N=["Default"];export{e as Default,N as __namedExportsOrder,k as default};
