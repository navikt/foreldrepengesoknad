import{l as e}from"./iframe-Dmr2Xk0e.js";import{h as i,A as l,f as m}from"./index-C7140wNa.js";import{F as p,C as d}from"./FpDataContext-C8cVxE23.js";import{M as c,S}from"./useFpNavigator-BzCUTurL.js";import{S as r}from"./SenereUtenlandsoppholdSteg-CEp3nTfi.js";import"./preload-helper-D9Z9MdNV.js";import"./annenForelderUtils-shRlbNJP.js";import"./eksisterendeSakUtils-CEgJ-AQF.js";const{action:o}=__STORYBOOK_MODULE_ACTIONS__,u=()=>()=>(o("button-click")(),Promise.resolve()),f={skalBoUtenforNorgeNeste12Mnd:!0,harBoddUtenforNorgeSiste12Mnd:!1},E={title:"steps/SenereUtenlandsoppholdSteg",component:r,parameters:{msw:{handlers:[i.post(l.mellomlagring,()=>new m(null,{status:200}))]}},render:({gåTilNesteSide:a=o("button-click"),utenlandsopphold:s=f,...n})=>e.jsx(c,{initialEntries:[S.SENERE_UTENLANDSOPPHOLD],children:e.jsx(p,{onDispatch:a,initialState:{[d.UTENLANDSOPPHOLD]:s},children:e.jsx(r,{...n})})})},t={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:u(),avbrytSøknad:o("button-click")}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...t.parameters?.docs?.source}}};const U=["Default"];export{t as Default,U as __namedExportsOrder,E as default};
