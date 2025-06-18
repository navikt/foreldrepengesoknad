import{_ as r}from"./iframe-Gxd28MnS.js";import{F as p,C as c}from"./FpDataContext-CGyNGwkW.js";import{M as m,S as u}from"./useFpNavigator-B8aNkvCK.js";import{h as S,H as f}from"./index-CPnfIhCi.js";import{S as a}from"./SenereUtenlandsoppholdSteg-p4SlPFEV.js";const{action:o}=__STORYBOOK_MODULE_ACTIONS__,g=()=>(...t)=>(o("button-click")(...t),Promise.resolve()),h={skalBoUtenforNorgeNeste12Mnd:!0,harBoddUtenforNorgeSiste12Mnd:!1},x={title:"steps/SenereUtenlandsoppholdSteg",component:a,parameters:{msw:{handlers:[S.post(".//rest/storage/foreldrepenger",()=>new f(null,{status:200}))]}},render:({gåTilNesteSide:t=o("button-click"),utenlandsopphold:l=h,...d})=>r.jsx(m,{initialEntries:[u.SENERE_UTENLANDSOPPHOLD],children:r.jsx(p,{onDispatch:t,initialState:{[c.UTENLANDSOPPHOLD]:l},children:r.jsx(a,{...d})})})},e={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:g(),avbrytSøknad:o("button-click")}};var s,n,i;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(i=(n=e.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const E=["Default"];export{e as Default,E as __namedExportsOrder,x as default};
