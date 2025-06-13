import{_ as e}from"./iframe-B-z8zddB.js";import{F as M,C as _}from"./FpDataContext-D5pSzLHX.js";import{M as O,S as x}from"./useFpNavigator--VNk5tmS.js";import{S as n}from"./SøkersituasjonSteg-Dzoj_ugm.js";const{action:t}=__STORYBOOK_MODULE_ACTIONS__,b=()=>(...s)=>(t("button-click")(...s),Promise.resolve()),h={title:"steps/SøkersituasjonSteg",component:n,render:({søkersituasjon:s,gåTilNesteSide:k=t("button-click"),...j})=>e.jsx(O,{initialEntries:[x.SØKERSITUASJON],children:e.jsx(M,{onDispatch:k,initialState:{[_.SØKERSITUASJON]:s},children:e.jsx(n,{...j})})})},r={args:{kjønn:"K",arbeidsforhold:[],mellomlagreSøknadOgNaviger:b(),avbrytSøknad:t("button-click")}},a={args:{...r.args,kjønn:"M"}},o={args:{...r.args,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"}}};var i,c,m;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    kjønn: 'K',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var l,p,d;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    ...Mor.args,
    kjønn: 'M'
  }
}`,...(d=(p=a.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var u,g,S;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    ...Mor.args,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'mor'
    }
  }
}`,...(S=(g=o.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};const v=["Mor","Far","HarMellomlagretData"];export{a as Far,o as HarMellomlagretData,r as Mor,v as __namedExportsOrder,h as default};
