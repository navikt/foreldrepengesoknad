import{l as s}from"./iframe-RMFhRmYV.js";import{F as m,C as l}from"./FpDataContext-C_LH7Orl.js";import{M as p,S as d}from"./useFpNavigator-Bz8JiZ4k.js";import{S as t}from"./SøkersituasjonSteg-BruKHQd9.js";import"./preload-helper-D9Z9MdNV.js";const{action:e}=__STORYBOOK_MODULE_ACTIONS__,u=()=>()=>(e("button-click")(),Promise.resolve()),O={title:"steps/SøkersituasjonSteg",component:t,render:({søkersituasjon:n,gåTilNesteSide:i=e("button-click"),...c})=>s.jsx(p,{initialEntries:[d.SØKERSITUASJON],children:s.jsx(m,{onDispatch:i,initialState:{[l.SØKERSITUASJON]:n},children:s.jsx(t,{...c})})})},r={args:{kjønn:"K",arbeidsforhold:[],mellomlagreSøknadOgNaviger:u(),avbrytSøknad:e("button-click")}},a={args:{...r.args,kjønn:"M"}},o={args:{...r.args,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    kjønn: 'K',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Mor.args,
    kjønn: 'M'
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...Mor.args,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'mor'
    }
  }
}`,...o.parameters?.docs?.source}}};const _=["Mor","Far","HarMellomlagretData"];export{a as Far,o as HarMellomlagretData,r as Mor,_ as __namedExportsOrder,O as default};
