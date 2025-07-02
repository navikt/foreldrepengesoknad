import{j as s}from"./iframe-B3EBtrGf.js";import{P as n,M as f,E as j,C as N}from"./useEsNavigator-adPNT3Pk.js";import{D as m,h as r,a as o}from"./DokumentasjonSteg-D-BsYCQP.js";import"./attachmentType-DJ1vFT-G.js";const{action:S}=__STORYBOOK_MODULE_ACTIONS__,l=()=>()=>(S("button-click")(),Promise.resolve()),D={title:"steg/DokumentasjonSteg",component:m,render:({gåTilNesteSide:O=S("button-click"),mellomlagreOgNaviger:v,omBarnet:A,path:R})=>s.jsx(f,{initialEntries:[R],children:s.jsx(j,{onDispatch:O,initialState:{[N.OM_BARNET]:A},children:s.jsx(m,{mellomlagreOgNaviger:v})})})},e={parameters:{msw:{handlers:[r.post(".//rest/storage/engangsstonad/vedlegg",()=>new o("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{path:n.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"},mellomlagreOgNaviger:l()}},t={parameters:{msw:{handlers:[r.post(".//rest/storage/engangsstonad/vedlegg",()=>new o("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{path:n.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:l()}},a={parameters:{msw:{handlers:[r.post(".//rest/storage/engangsstonad/vedlegg",()=>new o(null,{status:400}))]}},args:{path:n.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:l()}};var p,d,g;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(g=(d=e.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var i,c,E;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(E=(c=t.parameters)==null?void 0:c.docs)==null?void 0:E.source}}};var u,B,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(h=(B=a.parameters)==null?void 0:B.docs)==null?void 0:h.source}}};const F=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,a as FeilerOpplastinger,e as Terminbekreftelse,F as __namedExportsOrder,D as default};
