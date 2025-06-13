import{_ as r}from"./iframe-eYC-YEL0.js";import{F as p,C as c}from"./FpDataContext-CxioCBmU.js";import{M as m,S as u}from"./useFpNavigator-77_TFbWK.js";import{h as g,H as f}from"./index-BCJ3qr8W.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-DphFn26I.js";const{action:o}=__STORYBOOK_MODULE_ACTIONS__,S=()=>(...t)=>(o("button-click")(...t),Promise.resolve()),h={skalBoUtenforNorgeNeste12Mnd:!1,harBoddUtenforNorgeSiste12Mnd:!0},x={title:"steps/TidligereUtenlandsoppholdSteg",component:a,parameters:{msw:{handlers:[g.post(".//rest/storage/foreldrepenger",()=>new f(null,{status:200}))]}},render:({gåTilNesteSide:t=o("button-click"),utenlandsopphold:l=h,...d})=>r.jsx(m,{initialEntries:[u.TIDLIGERE_UTENLANDSOPPHOLD],children:r.jsx(p,{onDispatch:t,initialState:{[c.UTENLANDSOPPHOLD]:l},children:r.jsx(a,{...d})})})},e={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:S(),avbrytSøknad:o("button-click")}};var s,n,i;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(i=(n=e.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const T=["Default"];export{e as Default,T as __namedExportsOrder,x as default};
