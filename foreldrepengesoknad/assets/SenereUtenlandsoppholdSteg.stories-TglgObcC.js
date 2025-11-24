import{l as t}from"./iframe-CzQpKlwB.js";import{M as l,S as i,A as m}from"./useFpNavigator-DZ3KK4Xq.js";import{F as p,C as d}from"./FpDataContext-CZS5nj5M.js";import{h as c,H as S}from"./index-C4g7yQ6r.js";import{S as r}from"./SenereUtenlandsoppholdSteg-CMfInn6k.js";import"./preload-helper-D9Z9MdNV.js";const{action:o}=__STORYBOOK_MODULE_ACTIONS__,u=()=>()=>(o("button-click")(),Promise.resolve()),g={skalBoUtenforNorgeNeste12Mnd:!0,harBoddUtenforNorgeSiste12Mnd:!1},D={title:"steps/SenereUtenlandsoppholdSteg",component:r,parameters:{msw:{handlers:[c.post(m.mellomlagring,()=>new S(null,{status:200}))]}},render:({gåTilNesteSide:a=o("button-click"),utenlandsopphold:s=g,...n})=>t.jsx(l,{initialEntries:[i.SENERE_UTENLANDSOPPHOLD],children:t.jsx(p,{onDispatch:a,initialState:{[d.UTENLANDSOPPHOLD]:s},children:t.jsx(r,{...n})})})},e={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:u(),avbrytSøknad:o("button-click")}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...e.parameters?.docs?.source}}};const x=["Default"];export{e as Default,x as __namedExportsOrder,D as default};
