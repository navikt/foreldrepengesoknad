import{j as t}from"./iframe-CvABAzEa.js";import{S as d,c as m,C as p}from"./routes-Boa2fadw.js";import{T as o}from"./TidligereUtenlandsoppholdSteg-Be1_C4JQ.js";import{M as u}from"./useSvpNavigator-zgY812RP.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,g=()=>()=>(r("button-click")(),Promise.resolve()),O={title:"steps/TidligereUtenlandsoppholdSteg",component:o,render:({gåTilNesteSide:i=r("button-click"),utenlandsopphold:l={harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!1},...c})=>t.jsx(u,{initialEntries:[d.HAR_BODD_I_UTLANDET],children:t.jsx(m,{onDispatch:i,initialState:{[p.UTENLANDSOPPHOLD]:l},children:t.jsx(o,{...c})})})},e={args:{mellomlagreSøknadOgNaviger:g(),avbrytSøknad:r("button-click"),arbeidsforhold:[]}};var a,n,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click'),
    arbeidsforhold: []
  }
}`,...(s=(n=e.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const k=["Default"];export{e as Default,k as __namedExportsOrder,O as default};
