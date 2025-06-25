import{i as E,j as t}from"./iframe-0_Pfn_Hg.js";import{h as d,H as u}from"./index-CD9NMLmE.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BrsbVyff.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-CEya78yo.js";import"./useBackgroundColor-C0h0w_n8.js";import"./useSelectedSak-BEebh1Yt.js";import"./useQuery-0Z7l5vZ2.js";import"./api-Ca4yGKOZ.js";import"./sakerUtils-D_sVtLFC.js";import"./Snarveier-DUviFqf8.js";import"./LenkePanel-BZrwuGvj.js";import"./Dokument-pV7JvHD3.js";import"./dokumenterUtils-BPuCtKcA.js";import"./Tag-BwI6ixil.js";import"./GrupperteDokumenter-CMblQl13.js";import"./guid-CsArkN6i.js";import"./Header-B453AGKk.js";import"./LayoutWrapper-C94uA0SD.js";import"./StatusTag-DnpHmTMk.js";import"./Stroller-5nMXspYP.js";import"./NoeGikkGalt-BQNNZf3U.js";import"./MinidialogSkjema-RUnxQDkz.js";import"./skjemanummer-CRsChutl.js";import"./BekreftelseSendtSøknad-hF4V9tZV.js";import"./KontonummerInfo-wwIFVggs.js";import"./HarIkkeSaker-BMOFIOcF.js";import"./SøkelenkerPanel-BdUVfDmy.js";import"./HarSaker--murIi33.js";import"./SakLink-DZxWj5bu.js";import"./ContentSection-U4bdmkTG.js";import"./Svangerskapspenger-BferktB7.js";import"./DinPlan-B2nKRNqv.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-B_At9Xsp.js";import"./OppgaveLenkepanel-BWM1bS7m.js";import"./KontaktOss-CWxUNLqp.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
