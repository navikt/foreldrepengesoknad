import{l as t}from"./iframe-DPFnp5-g.js";import{M as l,S as i,A as m}from"./useFpNavigator-5WE6ri_k.js";import{F as p,C as d}from"./FpDataContext-Cfmam1Z2.js";import{h as c,H as S}from"./index-VR70-J8h.js";import{S as r}from"./SenereUtenlandsoppholdSteg-CYtd1X90.js";import"./preload-helper-D9Z9MdNV.js";const{action:o}=__STORYBOOK_MODULE_ACTIONS__,u=()=>()=>(o("button-click")(),Promise.resolve()),g={skalBoUtenforNorgeNeste12Mnd:!0,harBoddUtenforNorgeSiste12Mnd:!1},D={title:"steps/SenereUtenlandsoppholdSteg",component:r,parameters:{msw:{handlers:[c.post(m.mellomlagring,()=>new S(null,{status:200}))]}},render:({gåTilNesteSide:a=o("button-click"),utenlandsopphold:s=g,...n})=>t.jsx(l,{initialEntries:[i.SENERE_UTENLANDSOPPHOLD],children:t.jsx(p,{onDispatch:a,initialState:{[d.UTENLANDSOPPHOLD]:s},children:t.jsx(r,{...n})})})},e={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:u(),avbrytSøknad:o("button-click")}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...e.parameters?.docs?.source}}};const x=["Default"];export{e as Default,x as __namedExportsOrder,D as default};
