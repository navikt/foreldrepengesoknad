import{k as i,j as a}from"./iframe-DCfPTw-c.js";import{h as t,H as n}from"./index-V5pJY-H_.js";import{s as p}from"./sokerinfo-BNVlgI1c.js";import{A as r}from"./queries-DbQrLqEA.js";import{M as o}from"./MinidialogSkjema-DVacgVHE.js";import"./preload-helper-PPVm8Dsz.js";import"./useQuery-BV_PWbiX.js";import"./skjemanummer-BJ3hGUiX.js";import"./chunk-WWGJGFF6-C4IWAZFG.js";const{action:m}=__STORYBOOK_MODULE_ACTIONS__,O={title:"MinidialogSkjema",component:o,decorators:[i],render:l=>a.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:a.jsx(o,{...l})})},e={parameters:{msw:{handlers:[t.post(r.lastOppFPVedlegg,()=>new n(null,{status:200})),t.get(r.søkerInfo,()=>n.json(p))]}},args:{onSubmit:m("button-click"),ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{opprettet:"2020-01-01",saksnummer:"1"},sakstype:"FORELDREPENGER",ettersendelseError:void 0}},s={parameters:{msw:{handlers:[t.post(r.lastOppFPVedlegg,()=>new n(null,{status:400})),t.get(r.søkerInfo,()=>n.json(p))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
      opprettet: '2020-01-01',
      saksnummer: '1'
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
}`,...s.parameters?.docs?.source}}};const _=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{s as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,_ as __namedExportsOrder,O as default};
