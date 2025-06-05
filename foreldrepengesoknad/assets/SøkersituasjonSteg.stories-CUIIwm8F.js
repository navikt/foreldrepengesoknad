import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{a as e}from"./index-B-lxVbXh.js";import{F as M,C as x}from"./FpDataContext-DSKr2VRc.js";import{M as b,S as f}from"./useFpNavigator-Byynlfe_.js";import{S as n}from"./SøkersituasjonSteg-FndbveWw.js";import"./v4-CtRu48qb.js";import"./index-75N07mRN.js";import"./Uttaksplan-C-N2USpD.js";import"./dates-iBrNYYBq.js";import"./index-BLIM7tmH.js";import"./iframe-ZauHspcP.js";import"./VStack-DI-xS76s.js";import"./index-M7yiXcen.js";import"./index-Bj-N6E0A.js";import"./ErrorSummaryHookForm-Dmm2dDMj.js";const h=()=>(...t)=>(e("button-click")(...t),Promise.resolve()),J={title:"steps/SøkersituasjonSteg",component:n,render:({søkersituasjon:t,gåTilNesteSide:j=e("button-click"),...k})=>s.jsx(b,{initialEntries:[f.SØKERSITUASJON],children:s.jsx(M,{onDispatch:j,initialState:{[x.SØKERSITUASJON]:t},children:s.jsx(n,{...k})})})},r={args:{kjønn:"K",arbeidsforhold:[],mellomlagreSøknadOgNaviger:h(),avbrytSøknad:e("button-click")}},o={args:{...r.args,kjønn:"M"}},a={args:{...r.args,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"}}};var i,m,c;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    kjønn: 'K',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(c=(m=r.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var p,l,d;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    ...Mor.args,
    kjønn: 'M'
  }
}`,...(d=(l=o.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var u,g,S;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    ...Mor.args,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'mor'
    }
  }
}`,...(S=(g=a.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};const U=["Mor","Far","HarMellomlagretData"];export{o as Far,a as HarMellomlagretData,r as Mor,U as __namedExportsOrder,J as default};
