import{_ as s}from"./iframe-DqUTJYq8.js";import{F as M,C as _}from"./FpDataContext-DWl9nV1x.js";import{M as O,S as x}from"./useFpNavigator-Dz_KNZO0.js";import{S as t}from"./SøkersituasjonSteg-CDeDv6pq.js";const{action:e}=__STORYBOOK_MODULE_ACTIONS__,b=()=>()=>(e("button-click")(),Promise.resolve()),h={title:"steps/SøkersituasjonSteg",component:t,render:({søkersituasjon:S,gåTilNesteSide:k=e("button-click"),...j})=>s.jsx(O,{initialEntries:[x.SØKERSITUASJON],children:s.jsx(M,{onDispatch:k,initialState:{[_.SØKERSITUASJON]:S},children:s.jsx(t,{...j})})})},r={args:{kjønn:"K",arbeidsforhold:[],mellomlagreSøknadOgNaviger:b(),avbrytSøknad:e("button-click")}},a={args:{...r.args,kjønn:"M"}},o={args:{...r.args,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"}}};var n,i,c;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    kjønn: 'K',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(c=(i=r.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var m,l,p;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    ...Mor.args,
    kjønn: 'M'
  }
}`,...(p=(l=a.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var d,u,g;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    ...Mor.args,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'mor'
    }
  }
}`,...(g=(u=o.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const v=["Mor","Far","HarMellomlagretData"];export{a as Far,o as HarMellomlagretData,r as Mor,v as __namedExportsOrder,h as default};
