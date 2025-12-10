import{l as t}from"./iframe-BtElsYv0.js";import{M as l,S as i,A as m}from"./useFpNavigator-CJvVQ9d0.js";import{F as p,C as d}from"./FpDataContext-B9WtNCe-.js";import{h as c,H as S}from"./index-D2a5lnnX.js";import{S as r}from"./SenereUtenlandsoppholdSteg-DawLRPMu.js";import"./preload-helper-PPVm8Dsz.js";const{action:o}=__STORYBOOK_MODULE_ACTIONS__,u=()=>()=>(o("button-click")(),Promise.resolve()),g={skalBoUtenforNorgeNeste12Mnd:!0,harBoddUtenforNorgeSiste12Mnd:!1},D={title:"steps/SenereUtenlandsoppholdSteg",component:r,parameters:{msw:{handlers:[c.post(m.mellomlagring,()=>new S(null,{status:200}))]}},render:({gåTilNesteSide:a=o("button-click"),utenlandsopphold:s=g,...n})=>t.jsx(l,{initialEntries:[i.SENERE_UTENLANDSOPPHOLD],children:t.jsx(p,{onDispatch:a,initialState:{[d.UTENLANDSOPPHOLD]:s},children:t.jsx(r,{...n})})})},e={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:u(),avbrytSøknad:o("button-click")}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...e.parameters?.docs?.source}}};const x=["Default"];export{e as Default,x as __namedExportsOrder,D as default};
