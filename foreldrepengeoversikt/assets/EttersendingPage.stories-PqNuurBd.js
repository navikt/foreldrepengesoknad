import{i as E,j as t}from"./iframe-B7Wne0nc.js";import{h as d,H as u}from"./index-BSvZrEVq.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Bfj7Zcxv.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-C6QFn_RM.js";import"./useBackgroundColor-ds4CPk0h.js";import"./useSelectedSak-DJgTd89r.js";import"./useQuery-Bal89Sli.js";import"./api-DYeouuwG.js";import"./sakerUtils-n3XErz7Z.js";import"./Snarveier-CDJMHGud.js";import"./LenkePanel-Do_k-0I4.js";import"./Dokument-CKwNzPhy.js";import"./dokumenterUtils-BJOnZlhG.js";import"./Tag-DyqBPTdq.js";import"./GrupperteDokumenter-DFGcuP-_.js";import"./guid-CsArkN6i.js";import"./Header-DxvOlzf3.js";import"./LayoutWrapper-CjvcC1qy.js";import"./StatusTag-DGqNoUYQ.js";import"./Stroller-DC8HrfZK.js";import"./NoeGikkGalt-B7o16MOe.js";import"./MinidialogSkjema-BiiIb0b0.js";import"./skjemanummer-KzM2Eo5j.js";import"./BekreftelseSendtSøknad-CacXc9as.js";import"./KontonummerInfo-CNXGLkJv.js";import"./HarIkkeSaker-Cfyq-TJG.js";import"./SøkelenkerPanel-CO42gtSv.js";import"./HarSaker-JP17qWa9.js";import"./SakLink-CuYZKmuj.js";import"./ContentSection-F9y7G6tI.js";import"./Svangerskapspenger-I5TARh3D.js";import"./DinPlan-C6fzyA0U.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-B77MG5mv.js";import"./OppgaveLenkepanel-BA3tEA1e.js";import"./KontaktOss-loYAD0lj.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 200
        });
      })]
    }
  },
  args: {
    saker: {
      engangsstønad: [{
        ytelse: 'ENGANGSSTØNAD',
        saksnummer: '1',
        sakAvsluttet: false,
        gjelderAdopsjon: false,
        familiehendelse: {
          fødselsdato: '2020-01-01',
          antallBarn: 1
        },
        oppdatertTidspunkt: '2024-02-28T21:19:08.911'
      }],
      foreldrepenger: [],
      svangerskapspenger: []
    }
  }
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var i,l,g;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(g=(l=r.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const ae=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,ae as __namedExportsOrder,ne as default};
