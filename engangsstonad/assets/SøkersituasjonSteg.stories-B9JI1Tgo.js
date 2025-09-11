import{j as t}from"./iframe-D3zon-h2.js";import{M as i,P as n,E as c}from"./useEsNavigator-6AAUemKa.js";import{S as r}from"./SøkersituasjonSteg-Dt9xNKhx.js";import"./preload-helper-D9Z9MdNV.js";const{action:o}=__STORYBOOK_MODULE_ACTIONS__,m=()=>()=>(o("button-click")(),Promise.resolve()),S={title:"steg/SøkersituasjonSteg",component:r,render:({gåTilNesteSide:s,mellomlagreOgNaviger:a})=>t.jsx(i,{initialEntries:[n.SØKERSITUASJON],children:t.jsx(c,{onDispatch:s,children:t.jsx(r,{mellomlagreOgNaviger:a})})})},e={args:{gåTilNesteSide:o("button-click"),mellomlagreOgNaviger:m()}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    gåTilNesteSide: action('button-click'),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...e.parameters?.docs?.source}}};const d=["Default"];export{e as Default,d as __namedExportsOrder,S as default};
