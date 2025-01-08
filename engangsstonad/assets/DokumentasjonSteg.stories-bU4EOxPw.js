import{j as n}from"./jsx-runtime-DwRxq3ZX.js";import{a as v}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as R,E as j,C as N,P as r}from"./useEsNavigator-8jnwrcOk.js";import{D as p,h as o,H as l}from"./DokumentasjonSteg-DbJpAqbQ.js";import"./index-BX3iQpgp.js";import"./v4-CtRu48qb.js";import"./dateFormValidation-Bl3Cxj6E.js";import"./index-B1dLepta.js";import"./decorators-DIzpaN6C.js";import"./ErrorSummaryHookForm-DSvQt0ZC.js";import"./OmBarnet-BV6De4cI.js";const m=()=>(...s)=>(v("button-click")(...s),Promise.resolve()),$={title:"steg/DokumentasjonSteg",component:p,render:({gåTilNesteSide:s=v("button-click"),mellomlagreOgNaviger:f,omBarnet:A,path:O})=>n.jsx(R,{initialEntries:[O],children:n.jsx(j,{onDispatch:s,initialState:{[N.OM_BARNET]:A},children:n.jsx(p,{mellomlagreOgNaviger:f})})})},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new l("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{path:r.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"},mellomlagreOgNaviger:m()}},t={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new l("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{path:r.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:m()}},a={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new l(null,{status:400}))]}},args:{path:r.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:m()}};var d,i,g;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => new HttpResponse('uuid-test', {
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
}`,...(g=(i=e.parameters)==null?void 0:i.docs)==null?void 0:g.source}}};var c,E,u;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => new HttpResponse('uuid-test', {
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
}`,...(u=(E=t.parameters)==null?void 0:E.docs)==null?void 0:u.source}}};var h,B,S;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => new HttpResponse(null, {
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
}`,...(S=(B=a.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};const H=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,a as FeilerOpplastinger,e as Terminbekreftelse,H as __namedExportsOrder,$ as default};
