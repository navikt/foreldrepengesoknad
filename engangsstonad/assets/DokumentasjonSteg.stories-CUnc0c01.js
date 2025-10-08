import{j as n}from"./iframe-Ob8NwATb.js";import{P as s,M as E,E as h,C as B}from"./useEsNavigator-CY66nNLE.js";import{D as p,h as r,A as o,a as l}from"./DokumentasjonSteg-GVao5WvB.js";import"./preload-helper-D9Z9MdNV.js";import"./attachmentType-DJ1vFT-G.js";const{action:m}=__STORYBOOK_MODULE_ACTIONS__,d=()=>()=>(m("button-click")(),Promise.resolve()),j={title:"steg/DokumentasjonSteg",component:p,render:({gåTilNesteSide:i=m("button-click"),mellomlagreOgNaviger:c,omBarnet:g,path:u})=>n.jsx(E,{initialEntries:[u],children:n.jsx(h,{onDispatch:i,initialState:{[B.OM_BARNET]:g},children:n.jsx(p,{mellomlagreOgNaviger:c})})})},e={parameters:{msw:{handlers:[r.post(o.sendVedlegg,()=>new l("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{path:s.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"},mellomlagreOgNaviger:d()}},t={parameters:{msw:{handlers:[r.post(o.sendVedlegg,()=>new l("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{path:s.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:d()}},a={parameters:{msw:{handlers:[r.post(o.sendVedlegg,()=>new l(null,{status:400}))]}},args:{path:s.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:d()}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.sendVedlegg, () => new HttpResponse('uuid-test', {
        status: 200,
        headers: {
          location: 'test.com'
        }
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
      handlers: [http.post(API_URLS.sendVedlegg, () => new HttpResponse('uuid-test', {
        status: 200,
        headers: {
          location: 'test.com'
        }
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
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const N=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,a as FeilerOpplastinger,e as Terminbekreftelse,N as __namedExportsOrder,j as default};
