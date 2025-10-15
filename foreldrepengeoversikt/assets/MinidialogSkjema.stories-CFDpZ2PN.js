import{i as l,j as t}from"./iframe-V-4o2Cg9.js";import{h as r,H as a}from"./index-Bgu2Y1sX.js";import{A as o}from"./api-Cvuszg4G.js";import{M as n}from"./MinidialogSkjema-lZTf8njg.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-Nx4rUoOy.js";import"./skjemanummer-VcmdVIIG.js";import"./chunk-TMI4QPZX-B7ZijZcf.js";const{action:i}=__STORYBOOK_MODULE_ACTIONS__,O={title:"MinidialogSkjema",component:n,decorators:[l],render:p=>t.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:t.jsx(n,{...p})})},e={parameters:{msw:{handlers:[r.post(o.lastOppFPVedlegg,()=>new a(null,{status:200}))]}},args:{onSubmit:i("button-click"),ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},sakstype:"FORELDREPENGER",ettersendelseError:void 0}},s={parameters:{msw:{handlers:[r.post(o.lastOppFPVedlegg,()=>new a(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.lastOppFPVedlegg, () => new HttpResponse(null, {
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
      handlers: [http.post(API_URLS.lastOppFPVedlegg, () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...s.parameters?.docs?.source}}};const R=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{s as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,R as __namedExportsOrder,O as default};
