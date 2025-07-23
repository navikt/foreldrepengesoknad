import{j as t}from"./iframe-Bt5SVsXg.js";import{S as i,c as l,C as c}from"./routes-DDYEnNZR.js";import{T as o}from"./TidligereUtenlandsoppholdSteg-D7xpeSKI.js";import{M as d}from"./useSvpNavigator-D0xuG3EZ.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,m=()=>()=>(r("button-click")(),Promise.resolve()),f={title:"steps/TidligereUtenlandsoppholdSteg",component:o,render:({gåTilNesteSide:a=r("button-click"),utenlandsopphold:n={harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!1},...s})=>t.jsx(d,{initialEntries:[i.HAR_BODD_I_UTLANDET],children:t.jsx(l,{onDispatch:a,initialState:{[c.UTENLANDSOPPHOLD]:n},children:t.jsx(o,{...s})})})},e={args:{mellomlagreSøknadOgNaviger:m(),avbrytSøknad:r("button-click"),arbeidsforhold:[]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click'),
    arbeidsforhold: []
  }
}`,...e.parameters?.docs?.source}}};const _=["Default"];export{e as Default,_ as __namedExportsOrder,f as default};
