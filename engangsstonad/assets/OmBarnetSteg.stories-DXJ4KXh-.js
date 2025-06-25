import{j as r}from"./iframe-BEE1zbdW.js";import{M as A,P as T,E as v,C as x}from"./useEsNavigator-DfTH_z0H.js";import{O as a}from"./OmBarnetSteg-B3tslwTK.js";const{action:n}=__STORYBOOK_MODULE_ACTIONS__,t=()=>()=>(n("button-click")(),Promise.resolve()),K={title:"steg/OmBarnetSteg",component:a,render:({søkersituasjon:S,kjønn:k,gåTilNesteSide:O,mellomlagreOgNaviger:N})=>r.jsx(A,{initialEntries:[T.OM_BARNET],children:r.jsx(v,{initialState:{[x.SØKERSITUASJON]:{situasjon:S}},onDispatch:O,children:r.jsx(a,{kjønn:k,mellomlagreOgNaviger:N})})})},e={args:{søkersituasjon:"adopsjon",kjønn:"K",gåTilNesteSide:n("button-click"),mellomlagreOgNaviger:t()}},s={args:{søkersituasjon:"adopsjon",kjønn:"M",gåTilNesteSide:n("button-click"),mellomlagreOgNaviger:t()}},o={args:{søkersituasjon:"fødsel",kjønn:"K",gåTilNesteSide:n("button-click"),mellomlagreOgNaviger:t()}};var i,c,l;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    søkersituasjon: 'adopsjon',
    kjønn: 'K',
    gåTilNesteSide: action('button-click'),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var m,d,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    søkersituasjon: 'adopsjon',
    kjønn: 'M',
    gåTilNesteSide: action('button-click'),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(g=(d=s.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var p,u,j;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    søkersituasjon: 'fødsel',
    kjønn: 'K',
    gåTilNesteSide: action('button-click'),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(j=(u=o.parameters)==null?void 0:u.docs)==null?void 0:j.source}}};const M=["VisSideForAdopsjonKvinne","VisSideForAdopsjonMann","VisSideForFodsel"];export{e as VisSideForAdopsjonKvinne,s as VisSideForAdopsjonMann,o as VisSideForFodsel,M as __namedExportsOrder,K as default};
