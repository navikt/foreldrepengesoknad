import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import{a as A}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{M as h,E as v,C as N,P as n}from"./useEsNavigator-C41Ogaul.js";import{D as i,M as P,A as F}from"./DokumentasjonSteg-kcuNX1Aq.js";import{i as T}from"./dateFormValidation-BVnQxZDT.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./ErrorSummaryHookForm-oRWcrTDq.js";import"./index-vZN_Bsf0.js";import"./OmBarnet-BV6De4cI.js";import"./apiInterceptor-jBtz8lZe.js";import"./index-BRV0Se7Z.js";const s=()=>(...r)=>(A("button-click")(...r),Promise.resolve()),w={title:"steg/DokumentasjonSteg",component:i,render:({gåTilNesteSide:r=A("button-click"),mellomlagreOgNaviger:O,omBarnet:S,skalFeileOpplasting:j=!1,path:k})=>{T();const l=new P(F());return j||(l.onPost("/rest/storage/engangsstonad/vedlegg").reply(200),l.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200)),o.jsx(h,{initialEntries:[k],children:o.jsx(v,{onDispatch:r,initialState:{[N.OM_BARNET]:S},children:o.jsx(i,{mellomlagreOgNaviger:O})})})}},e={args:{path:n.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"},mellomlagreOgNaviger:s()}},a={args:{path:n.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:s()}},t={args:{skalFeileOpplasting:!0,path:n.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:s()}};var m,p,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    path: Path.TERMINBEKREFTELSE,
    omBarnet: {
      erBarnetFødt: false,
      antallBarn: 1,
      termindato: '2023-10-06'
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(d=(p=e.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var g,c,E;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    path: Path.ADOPSJONSBEKREFTELSE,
    omBarnet: {
      adopsjonAvEktefellesBarn: true,
      adopsjonsdato: '2020-01-01',
      antallBarn: 1,
      fødselsdatoer: [{
        dato: '2020-01-01'
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(E=(c=a.parameters)==null?void 0:c.docs)==null?void 0:E.source}}};var u,B,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    skalFeileOpplasting: true,
    path: Path.ADOPSJONSBEKREFTELSE,
    omBarnet: {
      adopsjonAvEktefellesBarn: true,
      adopsjonsdato: '2020-01-01',
      antallBarn: 1,
      fødselsdatoer: [{
        dato: '2020-01-01'
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(f=(B=t.parameters)==null?void 0:B.docs)==null?void 0:f.source}}};const q=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{a as Adopsjonsbekreftelse,t as FeilerOpplastinger,e as Terminbekreftelse,q as __namedExportsOrder,w as default};
