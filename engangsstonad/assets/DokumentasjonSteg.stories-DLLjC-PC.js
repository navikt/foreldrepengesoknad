import{j as s}from"./jsx-runtime-Cw0GR0a5.js";import{a as f}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{M as R,E as j,C as k,P as r}from"./useEsNavigator-Deic1-63.js";import{D as p,h as o,H as m}from"./DokumentasjonSteg-CT5V_Koa.js";import{i as N}from"./dateFormValidation-DaBMxOR2.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./decorators-86JrGkCj.js";import"./ErrorSummaryHookForm-3ijHPn0b.js";import"./index-BbmHap-z.js";import"./OmBarnet-BV6De4cI.js";import"./index-BRV0Se7Z.js";const l=()=>(...n)=>(f("button-click")(...n),Promise.resolve()),M={title:"steg/DokumentasjonSteg",component:p,render:({gåTilNesteSide:n=f("button-click"),mellomlagreOgNaviger:v,omBarnet:A,path:O})=>(N(),s.jsx(R,{initialEntries:[O],children:s.jsx(j,{onDispatch:n,initialState:{[k.OM_BARNET]:A},children:s.jsx(p,{mellomlagreOgNaviger:v})})}))},e={parameters:{msw:{handlers:[o.post("/engangsstonad/soknad/rest/storage/engangsstonad/vedlegg",()=>new m("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{path:r.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"},mellomlagreOgNaviger:l()}},t={parameters:{msw:{handlers:[o.post("/engangsstonad/soknad/rest/storage/engangsstonad/vedlegg",()=>new m("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{path:r.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:l()}},a={parameters:{msw:{handlers:[o.post("/engangsstonad/soknad/rest/storage/engangsstonad/vedlegg",()=>new m(null,{status:400}))]}},args:{path:r.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:l()}};var d,i,g;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(g=(i=e.parameters)==null?void 0:i.docs)==null?void 0:g.source}}};var c,u,E;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(E=(u=t.parameters)==null?void 0:u.docs)==null?void 0:E.source}}};var h,B,S;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(S=(B=a.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};const J=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,a as FeilerOpplastinger,e as Terminbekreftelse,J as __namedExportsOrder,M as default};
