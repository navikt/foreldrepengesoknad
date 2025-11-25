import{j as t}from"./iframe-D7gQvS2B.js";import{S as s,c as i}from"./routes-Dq3cNFa3.js";import{B as o}from"./BarnetSteg-ChtIZyRV.js";import{M as c}from"./useSvpNavigator-B4GuBgJF.js";import"./preload-helper-D9Z9MdNV.js";const{action:e}=__STORYBOOK_MODULE_ACTIONS__,m=()=>()=>(e("button-click")(),Promise.resolve()),g={title:"steps/BarnetSteg",component:o,render:({gåTilNesteSide:a=e("button-click"),...n})=>t.jsx(c,{initialEntries:[s.BARNET],children:t.jsx(i,{onDispatch:a,children:t.jsx(o,{...n})})})},r={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:m(),avbrytSøknad:()=>e("button-click")}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: () => action('button-click')
  }
}`,...r.parameters?.docs?.source}}};const f=["Default"];export{r as Default,f as __namedExportsOrder,g as default};
