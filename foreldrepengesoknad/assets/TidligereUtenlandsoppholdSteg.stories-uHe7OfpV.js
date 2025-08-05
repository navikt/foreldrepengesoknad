import{_ as t}from"./iframe-C4kTZrHh.js";import{F as i,C as l}from"./FpDataContext-ByMvOMSe.js";import{M as d,S as p}from"./useFpNavigator-CA4p98DB.js";import{h as c,H as m}from"./index-R1rsXBQ_.js";import{T as o}from"./TidligereUtenlandsoppholdSteg-DDTbJU2-.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,u=()=>()=>(r("button-click")(),Promise.resolve()),g={skalBoUtenforNorgeNeste12Mnd:!1,harBoddUtenforNorgeSiste12Mnd:!0},_={title:"steps/TidligereUtenlandsoppholdSteg",component:o,parameters:{msw:{handlers:[c.post(".//rest/storage/foreldrepenger",()=>new m(null,{status:200}))]}},render:({gåTilNesteSide:a=r("button-click"),utenlandsopphold:s=g,...n})=>t.jsx(d,{initialEntries:[p.TIDLIGERE_UTENLANDSOPPHOLD],children:t.jsx(i,{onDispatch:a,initialState:{[l.UTENLANDSOPPHOLD]:s},children:t.jsx(o,{...n})})})},e={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:u(),avbrytSøknad:r("button-click")}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...e.parameters?.docs?.source}}};const k=["Default"];export{e as Default,k as __namedExportsOrder,_ as default};
