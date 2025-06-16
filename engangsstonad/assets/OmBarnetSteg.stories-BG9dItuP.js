import{j as t}from"./iframe-BQFBi_VC.js";import{M as A,P as T,E as v,C as x}from"./useEsNavigator-DUZpD1Dk.js";import{O as i}from"./OmBarnetSteg-CF8h49Im.js";const{action:n}=__STORYBOOK_MODULE_ACTIONS__,a=()=>(...r)=>(n("button-click")(...r),Promise.resolve()),K={title:"steg/OmBarnetSteg",component:i,render:({søkersituasjon:r,kjønn:k,gåTilNesteSide:O,mellomlagreOgNaviger:N})=>t.jsx(A,{initialEntries:[T.OM_BARNET],children:t.jsx(v,{initialState:{[x.SØKERSITUASJON]:{situasjon:r}},onDispatch:O,children:t.jsx(i,{kjønn:k,mellomlagreOgNaviger:N})})})},e={args:{søkersituasjon:"adopsjon",kjønn:"K",gåTilNesteSide:n("button-click"),mellomlagreOgNaviger:a()}},s={args:{søkersituasjon:"adopsjon",kjønn:"M",gåTilNesteSide:n("button-click"),mellomlagreOgNaviger:a()}},o={args:{søkersituasjon:"fødsel",kjønn:"K",gåTilNesteSide:n("button-click"),mellomlagreOgNaviger:a()}};var c,l,m;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    søkersituasjon: 'adopsjon',
    kjønn: 'K',
    gåTilNesteSide: action('button-click'),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(m=(l=e.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var d,g,p;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    søkersituasjon: 'adopsjon',
    kjønn: 'M',
    gåTilNesteSide: action('button-click'),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(p=(g=s.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var u,j,S;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    søkersituasjon: 'fødsel',
    kjønn: 'K',
    gåTilNesteSide: action('button-click'),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(S=(j=o.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};const M=["VisSideForAdopsjonKvinne","VisSideForAdopsjonMann","VisSideForFodsel"];export{e as VisSideForAdopsjonKvinne,s as VisSideForAdopsjonMann,o as VisSideForFodsel,M as __namedExportsOrder,K as default};
