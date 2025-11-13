import{j as t}from"./iframe-jNskavL9.js";import{S as i,c as l,C as c}from"./routes-C2Yb4A2d.js";import{S as r}from"./SenereUtenlandsoppholdSteg-BYGXH9DK.js";import{M as d}from"./useSvpNavigator-DmdY1F1N.js";import"./preload-helper-D9Z9MdNV.js";const{action:o}=__STORYBOOK_MODULE_ACTIONS__,m=()=>()=>(o("button-click")(),Promise.resolve()),p={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!0},O={title:"steps/SenereUtenlandsoppholdSteg",component:r,render:({gåTilNesteSide:a=o("button-click"),utenlandsforhold:n=p,...s})=>t.jsx(d,{initialEntries:[i.SKAL_BO_I_UTLANDET],children:t.jsx(l,{onDispatch:a,initialState:{[c.UTENLANDSOPPHOLD]:n},children:t.jsx(r,{...s})})})},e={args:{mellomlagreSøknadOgNaviger:m(),avbrytSøknad:o("button-click"),arbeidsforhold:[]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click'),
    arbeidsforhold: []
  }
}`,...e.parameters?.docs?.source}}};const k=["Default"];export{e as Default,k as __namedExportsOrder,O as default};
