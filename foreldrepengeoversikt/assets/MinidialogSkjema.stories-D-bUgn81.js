import{i as l,j as a}from"./iframe-BL1fXp3Z.js";import{h as t,H as n}from"./index-CtMjQgvb.js";import{s as p}from"./sokerinfo-DYTpuEoT.js";import{A as r}from"./api-QlxCNsBs.js";import{M as o}from"./MinidialogSkjema-gLEXvcBT.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-DRSe34mH.js";import"./skjemanummer-DLD4juAC.js";import"./chunk-TMI4QPZX-B017oIpK.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,O={title:"MinidialogSkjema",component:o,decorators:[l],render:i=>a.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:a.jsx(o,{...i})})},e={parameters:{msw:{handlers:[t.post(r.lastOppFPVedlegg,()=>new n(null,{status:200})),t.get(r.søkerInfo,()=>n.json(p))]}},args:{onSubmit:d("button-click"),ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},sakstype:"FORELDREPENGER",ettersendelseError:void 0}},s={parameters:{msw:{handlers:[t.post(r.lastOppFPVedlegg,()=>new n(null,{status:400})),t.get(r.søkerInfo,()=>n.json(p))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.lastOppFPVedlegg, () => new HttpResponse(null, {
        status: 200
      })), http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo))]
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
      })), http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...s.parameters?.docs?.source}}};const I=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{s as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,I as __namedExportsOrder,O as default};
