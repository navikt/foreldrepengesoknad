import{i as l,j as t}from"./iframe-DNdFQc-E.js";import{h as n,H as a}from"./index-ZHclRefx.js";import{M as r}from"./MinidialogSkjema-C0SgBfpP.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-DWA1I81K.js";import"./api-CntHfO5i.js";import"./skjemanummer-C5PRFulN.js";import"./chunk-UH6JLGW7-DGACcyrF.js";const{action:p}=__STORYBOOK_MODULE_ACTIONS__,S={title:"MinidialogSkjema",component:r,decorators:[l],render:o=>t.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:t.jsx(r,{...o})})},e={parameters:{msw:{handlers:[n.post(".//rest/storage/foreldrepenger/vedlegg",()=>new a(null,{status:200}))]}},args:{onSubmit:p("button-click"),ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},sakstype:"FORELDREPENGER",ettersendelseError:void 0}},s={parameters:{msw:{handlers:[n.post(".//storage/foreldrepenger/vedlegg",()=>new a(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/foreldrepenger/vedlegg\`, () => new HttpResponse(null, {
        status: 200
      }))]
    }
  },
  args: {
    onSubmit: action('button-click'),
    ettersendelseErSendt: false,
    isSendingEttersendelse: false,
    minidialog: {
      dialogId: '1',
      opprettet: '2020-01-01',
      saksnr: '1'
    },
    sakstype: 'FORELDREPENGER',
    ettersendelseError: undefined
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/storage/foreldrepenger/vedlegg\`, () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...s.parameters?.docs?.source}}};const f=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{s as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,f as __namedExportsOrder,S as default};
