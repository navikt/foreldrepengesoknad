import{i as c,j as t}from"./iframe-Ui6H9FKp.js";import{h as d,H as m}from"./index-tvOkpNSO.js";import{M as r}from"./MinidialogSkjema-Bltdg7H-.js";import"./useQuery-OB7UwXoN.js";import"./api-jMzK91i7.js";import"./skjemanummer-BH827EY4.js";import"./chunk-NL6KNZEE-DoEMPvTH.js";const{action:u}=__STORYBOOK_MODULE_ACTIONS__,w={title:"MinidialogSkjema",component:r,decorators:[c],render:g=>t.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:t.jsx(r,{...g})})},e={parameters:{msw:{handlers:[d.post(".//rest/storage/foreldrepenger/vedlegg",()=>new m(null,{status:200}))]}},args:{onSubmit:u("button-click"),ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},sakstype:"FORELDREPENGER",ettersendelseError:void 0}},s={parameters:{msw:{handlers:[d.post(".//storage/foreldrepenger/vedlegg",()=>new m(null,{status:400}))]}},args:e.args};var n,a,o;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};var l,p,i;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/storage/foreldrepenger/vedlegg\`, () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(i=(p=s.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};const _=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{s as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,_ as __namedExportsOrder,w as default};
