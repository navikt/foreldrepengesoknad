import{_ as t}from"./iframe-Cz5FuZRO.js";import{F as i,C as l}from"./FpDataContext-YJjAZB7E.js";import{M as p,S as d}from"./useFpNavigator-BaO8GNuX.js";import{h as m,H as c}from"./index-CSjfIlQ6.js";import{S as o}from"./SenereUtenlandsoppholdSteg-CMLXXRy3.js";import"./preload-helper-D9Z9MdNV.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,u=()=>()=>(r("button-click")(),Promise.resolve()),S={skalBoUtenforNorgeNeste12Mnd:!0,harBoddUtenforNorgeSiste12Mnd:!1},k={title:"steps/SenereUtenlandsoppholdSteg",component:o,parameters:{msw:{handlers:[m.post(".//rest/storage/foreldrepenger",()=>new c(null,{status:200}))]}},render:({gåTilNesteSide:a=r("button-click"),utenlandsopphold:s=S,...n})=>t.jsx(p,{initialEntries:[d.SENERE_UTENLANDSOPPHOLD],children:t.jsx(i,{onDispatch:a,initialState:{[l.UTENLANDSOPPHOLD]:s},children:t.jsx(o,{...n})})})},e={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:u(),avbrytSøknad:r("button-click")}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...e.parameters?.docs?.source}}};const D=["Default"];export{e as Default,D as __namedExportsOrder,k as default};
