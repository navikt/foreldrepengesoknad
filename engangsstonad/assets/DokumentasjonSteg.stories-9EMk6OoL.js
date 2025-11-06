import{j as n}from"./iframe-DIuvK7c6.js";import{P as a,M as E,E as S,C as O}from"./useEsNavigator-DfEDiCl-.js";import{D as d,h as r,A as o,a as l}from"./DokumentasjonSteg-CGH4UucD.js";import"./preload-helper-D9Z9MdNV.js";import"./attachmentType-DJ1vFT-G.js";const{action:m}=__STORYBOOK_MODULE_ACTIONS__,p=()=>()=>(m("button-click")(),Promise.resolve()),N={title:"steg/DokumentasjonSteg",component:d,render:({gåTilNesteSide:i=m("button-click"),mellomlagreOgNaviger:g,omBarnet:c,path:u})=>n.jsx(E,{initialEntries:[u],children:n.jsx(S,{onDispatch:i,initialState:{[O.OM_BARNET]:c},children:n.jsx(d,{mellomlagreOgNaviger:g})})})},e={parameters:{msw:{handlers:[r.post(o.sendVedlegg,()=>new l(JSON.stringify("uuid-test"),{status:200}))]}},args:{path:a.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"},mellomlagreOgNaviger:p()}},t={parameters:{msw:{handlers:[r.post(o.sendVedlegg,()=>new l(JSON.stringify("uuid-test"),{status:200}))]}},args:{path:a.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:p()}},s={parameters:{msw:{handlers:[r.post(o.sendVedlegg,()=>new l(null,{status:400}))]}},args:{path:a.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:p()}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.sendVedlegg, () => new HttpResponse(JSON.stringify('uuid-test'), {
        status: 200
      }))]
    }
  },
  args: {
    path: Path.TERMINBEKREFTELSE,
    omBarnet: {
      erBarnetFødt: false,
      antallBarn: 1,
      termindato: '2023-10-06'
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.sendVedlegg, () => new HttpResponse(JSON.stringify('uuid-test'), {
        status: 200
      }))]
    }
  },
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
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.sendVedlegg, () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
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
}`,...s.parameters?.docs?.source}}};const j=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,s as FeilerOpplastinger,e as Terminbekreftelse,j as __namedExportsOrder,N as default};
