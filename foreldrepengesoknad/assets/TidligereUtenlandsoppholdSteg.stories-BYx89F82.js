import{_ as t}from"./iframe-DwG41fXo.js";import{F as i,C as l}from"./FpDataContext-NEJemwdy.js";import{M as d,S as p}from"./useFpNavigator-ZheKTWLC.js";import{h as c,H as m}from"./index-DhjHaLk2.js";import{T as o}from"./TidligereUtenlandsoppholdSteg-BJ81jbbl.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,u=()=>()=>(r("button-click")(),Promise.resolve()),g={skalBoUtenforNorgeNeste12Mnd:!1,harBoddUtenforNorgeSiste12Mnd:!0},_={title:"steps/TidligereUtenlandsoppholdSteg",component:o,parameters:{msw:{handlers:[c.post(".//rest/storage/foreldrepenger",()=>new m(null,{status:200}))]}},render:({gåTilNesteSide:a=r("button-click"),utenlandsopphold:s=g,...n})=>t.jsx(d,{initialEntries:[p.TIDLIGERE_UTENLANDSOPPHOLD],children:t.jsx(i,{onDispatch:a,initialState:{[l.UTENLANDSOPPHOLD]:s},children:t.jsx(o,{...n})})})},e={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:u(),avbrytSøknad:r("button-click")}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...e.parameters?.docs?.source}}};const k=["Default"];export{e as Default,k as __namedExportsOrder,_ as default};
