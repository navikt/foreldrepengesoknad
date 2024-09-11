import{i as h,j as o}from"./dateFormValidation-DU24VlAX.js";import{a as O}from"./chunk-454WOBUV-CM0pFb8Z.js";import{M as v,E as N,C as F,P as n}from"./useEsNavigator-bP7v46Jf.js";import{D as i,M as P}from"./DokumentasjonSteg-46QaojCJ.js";import"./index-CTjT7uj6.js";import{g as T}from"./apiInterceptor-DfqAa4et.js";import"./index-BRV0Se7Z.js";import"./index-CYM-y3Gt.js";import"./v4-CQkTLCs1.js";import"./ErrorSummaryHookForm-Dqq_26vw.js";import"./OmBarnet-BV6De4cI.js";const s=()=>(...r)=>(O("button-click")(...r),Promise.resolve()),_={title:"steg/DokumentasjonSteg",component:i,render:({gåTilNesteSide:r=O("button-click"),mellomlagreOgNaviger:S,omBarnet:A,skalFeileOpplasting:j=!1,path:k})=>{h();const l=new P(T());return j||(l.onPost("/rest/storage/engangsstonad/vedlegg").reply(200),l.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200)),o.jsx(v,{initialEntries:[k],children:o.jsx(N,{onDispatch:r,initialState:{[F.OM_BARNET]:A},children:o.jsx(i,{mellomlagreOgNaviger:S})})})}},e={args:{path:n.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"},mellomlagreOgNaviger:s()}},a={args:{path:n.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:s()}},t={args:{skalFeileOpplasting:!0,path:n.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:s()}};var m,p,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(f=(B=t.parameters)==null?void 0:B.docs)==null?void 0:f.source}}};const w=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{a as Adopsjonsbekreftelse,t as FeilerOpplastinger,e as Terminbekreftelse,w as __namedExportsOrder,_ as default};
