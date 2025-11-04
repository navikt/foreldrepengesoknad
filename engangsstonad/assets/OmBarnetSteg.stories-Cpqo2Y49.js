import{j as r}from"./iframe-CJY63k4T.js";import{M as d,P as g,E as p,C as u}from"./useEsNavigator-BPDENEew.js";import{O as a}from"./OmBarnetSteg-DdjnjnzF.js";import"./preload-helper-D9Z9MdNV.js";const{action:n}=__STORYBOOK_MODULE_ACTIONS__,t=()=>()=>(n("button-click")(),Promise.resolve()),N={title:"steg/OmBarnetSteg",component:a,render:({søkersituasjon:i,kjønn:c,gåTilNesteSide:l,mellomlagreOgNaviger:m})=>r.jsx(d,{initialEntries:[g.OM_BARNET],children:r.jsx(p,{initialState:{[u.SØKERSITUASJON]:{situasjon:i}},onDispatch:l,children:r.jsx(a,{kjønn:c,mellomlagreOgNaviger:m})})})},e={args:{søkersituasjon:"adopsjon",kjønn:"K",gåTilNesteSide:n("button-click"),mellomlagreOgNaviger:t()}},s={args:{søkersituasjon:"adopsjon",kjønn:"M",gåTilNesteSide:n("button-click"),mellomlagreOgNaviger:t()}},o={args:{søkersituasjon:"fødsel",kjønn:"K",gåTilNesteSide:n("button-click"),mellomlagreOgNaviger:t()}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    søkersituasjon: 'adopsjon',
    kjønn: 'K',
    gåTilNesteSide: action('button-click'),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    søkersituasjon: 'adopsjon',
    kjønn: 'M',
    gåTilNesteSide: action('button-click'),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    søkersituasjon: 'fødsel',
    kjønn: 'K',
    gåTilNesteSide: action('button-click'),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...o.parameters?.docs?.source}}};const A=["VisSideForAdopsjonKvinne","VisSideForAdopsjonMann","VisSideForFodsel"];export{e as VisSideForAdopsjonKvinne,s as VisSideForAdopsjonMann,o as VisSideForFodsel,A as __namedExportsOrder,N as default};
