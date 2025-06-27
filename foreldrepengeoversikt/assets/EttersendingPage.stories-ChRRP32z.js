import{i as E,j as t}from"./iframe-CbjlfzRz.js";import{h as d,H as u}from"./index-QfaYdV1a.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CTlSLlrW.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-DRu4oqAk.js";import"./useBackgroundColor-D9PLoySm.js";import"./useSelectedSak-C68P6lOS.js";import"./useQuery-ccqG3gLy.js";import"./api-DvOYiSou.js";import"./sakerUtils-BgVNcEGO.js";import"./Snarveier-DeU7myM5.js";import"./LenkePanel-CbPKorgh.js";import"./Dokument-DM_gXq9Z.js";import"./dokumenterUtils-Dwj2f2WR.js";import"./Tag-DAM9p75_.js";import"./GrupperteDokumenter-DNSksHX0.js";import"./guid-CsArkN6i.js";import"./Header-D5XFo5BY.js";import"./LayoutWrapper-B3xyErZg.js";import"./StatusTag-Db8a4mSZ.js";import"./Stroller-DjXiDAmZ.js";import"./NoeGikkGalt-B0Fk5Fc-.js";import"./MinidialogSkjema-CVe2NJZ8.js";import"./skjemanummer-78ecJqP8.js";import"./BekreftelseSendtSøknad-zduZ4aE2.js";import"./KontonummerInfo-8K7Ut3Sq.js";import"./HarIkkeSaker-B5e6t-8f.js";import"./SøkelenkerPanel-C7mQ6Ksa.js";import"./HarSaker-ySL7pBz7.js";import"./SakLink-C5lvtEmX.js";import"./ContentSection-BWYGItRU.js";import"./Svangerskapspenger-CQGgFP9l.js";import"./DinPlan-nWUEXxYg.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-nY0Wpzea.js";import"./OppgaveLenkepanel-D5sZlEyB.js";import"./KontaktOss-BlFqBTCd.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
