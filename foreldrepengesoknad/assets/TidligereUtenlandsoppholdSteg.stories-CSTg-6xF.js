import{_ as t}from"./iframe-ClSqJt5_.js";import{F as p,C as c}from"./FpDataContext-SvkGaKab.js";import{M as m,S as u}from"./useFpNavigator-vGkufEEK.js";import{h as g,H as f}from"./index-DT-3yxyD.js";import{T as o}from"./TidligereUtenlandsoppholdSteg-BSOv9dFT.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,S=()=>()=>(r("button-click")(),Promise.resolve()),h={skalBoUtenforNorgeNeste12Mnd:!1,harBoddUtenforNorgeSiste12Mnd:!0},x={title:"steps/TidligereUtenlandsoppholdSteg",component:o,parameters:{msw:{handlers:[g.post(".//rest/storage/foreldrepenger",()=>new f(null,{status:200}))]}},render:({gåTilNesteSide:i=r("button-click"),utenlandsopphold:l=h,...d})=>t.jsx(m,{initialEntries:[u.TIDLIGERE_UTENLANDSOPPHOLD],children:t.jsx(p,{onDispatch:i,initialState:{[c.UTENLANDSOPPHOLD]:l},children:t.jsx(o,{...d})})})},e={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:S(),avbrytSøknad:r("button-click")}};var a,s,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const T=["Default"];export{e as Default,T as __namedExportsOrder,x as default};
