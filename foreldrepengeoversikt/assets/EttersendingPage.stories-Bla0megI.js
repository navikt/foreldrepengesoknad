import{i as E,j as t}from"./iframe-CWo92Ymk.js";import{h as d,H as u}from"./index-DZusc7F4.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DE9fTUbO.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-Ojkx7Czc.js";import"./useBackgroundColor-Cf1V-xcB.js";import"./useSelectedSak-BjJMqJGa.js";import"./useQuery-D8F8luuk.js";import"./api-CnCBX3oU.js";import"./sakerUtils-DNJEv504.js";import"./Snarveier-cGKKM2w9.js";import"./LenkePanel-Du5H-aw7.js";import"./Dokument-DLkjUJuR.js";import"./dokumenterUtils-DxEkBLrL.js";import"./Tag-BFp30PbK.js";import"./GrupperteDokumenter-C-w6MeKD.js";import"./guid-CsArkN6i.js";import"./Header-D9zyrF6q.js";import"./LayoutWrapper-PRoYNtoa.js";import"./StatusTag-UHgDsxdU.js";import"./Stroller-ClIpDfJD.js";import"./NoeGikkGalt-Bt1G5tTM.js";import"./MinidialogSkjema-B1nobzuN.js";import"./skjemanummer-DxrR2zpu.js";import"./BekreftelseSendtSøknad-BItX5MZ6.js";import"./KontonummerInfo-0lKDEIFS.js";import"./HarIkkeSaker-DV5jI_S7.js";import"./SøkelenkerPanel-PvXxlF_f.js";import"./HarSaker-DHSZrsdF.js";import"./SakLink-MmVX0RNF.js";import"./ContentSection-Cm4EpqBE.js";import"./Svangerskapspenger-sHp9FkWL.js";import"./DinPlan-BxCC5Cgi.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-u71lg8Gk.js";import"./OppgaveLenkepanel-f3_oeUkS.js";import"./KontaktOss-DZiJFhAi.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
