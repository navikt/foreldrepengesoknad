import{_ as t}from"./iframe-DtqnyF_u.js";import{F as p,C as c}from"./FpDataContext-C6RBdciT.js";import{M as m,S as u}from"./useFpNavigator-Cq2TmE8s.js";import{h as S,H as f}from"./index-Dgv8WwqR.js";import{S as o}from"./SenereUtenlandsoppholdSteg-BnfVBMIr.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,g=()=>()=>(r("button-click")(),Promise.resolve()),h={skalBoUtenforNorgeNeste12Mnd:!0,harBoddUtenforNorgeSiste12Mnd:!1},x={title:"steps/SenereUtenlandsoppholdSteg",component:o,parameters:{msw:{handlers:[S.post(".//rest/storage/foreldrepenger",()=>new f(null,{status:200}))]}},render:({gåTilNesteSide:i=r("button-click"),utenlandsopphold:l=h,...d})=>t.jsx(m,{initialEntries:[u.SENERE_UTENLANDSOPPHOLD],children:t.jsx(p,{onDispatch:i,initialState:{[c.UTENLANDSOPPHOLD]:l},children:t.jsx(o,{...d})})})},e={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:g(),avbrytSøknad:r("button-click")}};var a,s,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const E=["Default"];export{e as Default,E as __namedExportsOrder,x as default};
