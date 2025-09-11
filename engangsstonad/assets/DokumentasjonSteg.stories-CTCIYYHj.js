import{j as s}from"./iframe-D3zon-h2.js";import{P as n,M as E,E as u,C as B}from"./useEsNavigator-6AAUemKa.js";import{D as m,h as r,a as o}from"./DokumentasjonSteg-rrKpYco-.js";import"./preload-helper-D9Z9MdNV.js";import"./attachmentType-DJ1vFT-G.js";const{action:p}=__STORYBOOK_MODULE_ACTIONS__,l=()=>()=>(p("button-click")(),Promise.resolve()),R={title:"steg/DokumentasjonSteg",component:m,render:({gåTilNesteSide:d=p("button-click"),mellomlagreOgNaviger:g,omBarnet:i,path:c})=>s.jsx(E,{initialEntries:[c],children:s.jsx(u,{onDispatch:d,initialState:{[B.OM_BARNET]:i},children:s.jsx(m,{mellomlagreOgNaviger:g})})})},e={parameters:{msw:{handlers:[r.post(".//rest/storage/engangsstonad/vedlegg",()=>new o("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{path:n.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"},mellomlagreOgNaviger:l()}},t={parameters:{msw:{handlers:[r.post(".//rest/storage/engangsstonad/vedlegg",()=>new o("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{path:n.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:l()}},a={parameters:{msw:{handlers:[r.post(".//rest/storage/engangsstonad/vedlegg",()=>new o(null,{status:400}))]}},args:{path:n.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:l()}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const f=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,a as FeilerOpplastinger,e as Terminbekreftelse,f as __namedExportsOrder,R as default};
