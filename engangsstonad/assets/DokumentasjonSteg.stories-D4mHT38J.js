import{j as n}from"./iframe-0KXek5uf.js";import{P as r,M as f,E as j,C as N}from"./useEsNavigator-BVgk8NEo.js";import{D as p,h as o,a as l}from"./DokumentasjonSteg-D9DA4xSF.js";import"./attachmentType-DJ1vFT-G.js";const{action:O}=__STORYBOOK_MODULE_ACTIONS__,m=()=>(...s)=>(O("button-click")(...s),Promise.resolve()),D={title:"steg/DokumentasjonSteg",component:p,render:({gåTilNesteSide:s=O("button-click"),mellomlagreOgNaviger:v,omBarnet:A,path:R})=>n.jsx(f,{initialEntries:[R],children:n.jsx(j,{onDispatch:s,initialState:{[N.OM_BARNET]:A},children:n.jsx(p,{mellomlagreOgNaviger:v})})})},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new l("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{path:r.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"},mellomlagreOgNaviger:m()}},t={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new l("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{path:r.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:m()}},a={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new l(null,{status:400}))]}},args:{path:r.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:m()}};var d,g,i;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(i=(g=e.parameters)==null?void 0:g.docs)==null?void 0:i.source}}};var c,E,u;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(u=(E=t.parameters)==null?void 0:E.docs)==null?void 0:u.source}}};var B,h,S;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(S=(h=a.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};const F=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,a as FeilerOpplastinger,e as Terminbekreftelse,F as __namedExportsOrder,D as default};
