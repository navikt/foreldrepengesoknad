import{j as n}from"./jsx-runtime-Cw0GR0a5.js";import{a as S}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{M as A,E as R,C as N,P as r}from"./useEsNavigator-BmdoUglf.js";import{D as m,h as o,H as l}from"./DokumentasjonSteg-g3qdndIC.js";import{i as k}from"./dateFormValidation-CNuHCVUP.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./decorators-86JrGkCj.js";import"./ErrorSummaryHookForm-CwoKT8eo.js";import"./index-vZN_Bsf0.js";import"./OmBarnet-BV6De4cI.js";import"./index-BRV0Se7Z.js";const p=()=>(...a)=>(S("button-click")(...a),Promise.resolve()),C={title:"steg/DokumentasjonSteg",component:m,render:({gåTilNesteSide:a=S("button-click"),mellomlagreOgNaviger:O,omBarnet:j,path:v})=>(k(),n.jsx(A,{initialEntries:[v],children:n.jsx(R,{onDispatch:a,initialState:{[N.OM_BARNET]:j},children:n.jsx(m,{mellomlagreOgNaviger:O})})}))},e={parameters:{msw:{handlers:[o.post("https://es/rest/storage/engangsstonad/vedlegg",()=>new l("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{path:r.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"},mellomlagreOgNaviger:p()}},t={parameters:{msw:{handlers:[o.post("https://es/rest/storage/engangsstonad/vedlegg",()=>new l("uuid-test",{status:200,headers:{location:"test.com"}}))]}},args:{path:r.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:p()}},s={parameters:{msw:{handlers:[o.post("https://es/rest/storage/engangsstonad/vedlegg",()=>new l(null,{status:400}))]}},args:{path:r.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]},mellomlagreOgNaviger:p()}};var d,i,g;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('https://es/rest/storage/engangsstonad/vedlegg', () => new HttpResponse('uuid-test', {
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
      handlers: [http.post('https://es/rest/storage/engangsstonad/vedlegg', () => new HttpResponse('uuid-test', {
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
}`,...(E=(u=t.parameters)==null?void 0:u.docs)==null?void 0:E.source}}};var h,B,f;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('https://es/rest/storage/engangsstonad/vedlegg', () => new HttpResponse(null, {
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
}`,...(f=(B=s.parameters)==null?void 0:B.docs)==null?void 0:f.source}}};const _=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,s as FeilerOpplastinger,e as Terminbekreftelse,_ as __namedExportsOrder,C as default};
