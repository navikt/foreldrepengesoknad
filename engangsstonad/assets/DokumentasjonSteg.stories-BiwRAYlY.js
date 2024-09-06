import{i as k,j as o}from"./dateFormValidation-C0UtuBi7.js";import{a as O}from"./chunk-454WOBUV-CM0pFb8Z.js";import{M as v,E as N,C as F,P as n}from"./useEsNavigator-BBqit1Si.js";import{D as i,M as P}from"./DokumentasjonSteg-DzDaKGrD.js";import"./index-CTjT7uj6.js";import{g as T}from"./apiInterceptor-DfqAa4et.js";import"./index-BRV0Se7Z.js";import"./index-CYM-y3Gt.js";import"./v4-CQkTLCs1.js";import"./ErrorSummaryHookForm-DuBmz4si.js";import"./OmBarnet-BV6De4cI.js";const s=()=>(...t)=>(O("button-click")(...t),Promise.resolve()),_={component:i,render:({gåTilNesteSide:t=O("button-click"),mellomlagreOgNaviger:S,omBarnet:A,skalFeileOpplasting:j=!1,path:h})=>{k();const l=new P(T());return j||(l.onPost("/rest/storage/engangsstonad/vedlegg").reply(200),l.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200)),o.jsx(v,{initialEntries:[h],children:o.jsx(N,{onDispatch:t,initialState:{[F.OM_BARNET]:A},children:o.jsx(i,{mellomlagreOgNaviger:S})})})}},e={args:{path:n.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"},mellomlagreOgNaviger:s()}},a={args:{path:n.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:s()}},r={args:{skalFeileOpplasting:!0,path:n.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:s()}};var p,m,d;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    path: Path.TERMINBEKREFTELSE,
    omBarnet: {
      erBarnetFødt: false,
      antallBarn: 1,
      termindato: '2023-10-06'
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(d=(m=e.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var g,c,E;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(E=(c=a.parameters)==null?void 0:c.docs)==null?void 0:E.source}}};var B,u,f;r.parameters={...r.parameters,docs:{...(B=r.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(f=(u=r.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};const w=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{a as Adopsjonsbekreftelse,r as FeilerOpplastinger,e as Terminbekreftelse,w as __namedExportsOrder,_ as default};
