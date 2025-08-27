import{i as g,j as t}from"./iframe-C-5o1vG8.js";import{h as o,H as p}from"./index-cgSXQBlf.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Dhpaa7ep.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-BjFkVpg_.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DtB0TyGX.js";import"./useSelectedSak-DATXCtHI.js";import"./useQuery-TlMAIBbQ.js";import"./api-BRtp39ZL.js";import"./sakerUtils-DxnvNSBa.js";import"./Snarveier-BgfZf2Rb.js";import"./LenkePanel-BujT9UV2.js";import"./index-CQtlta_e.js";import"./Dokument-CTWE364q.js";import"./dokumenterUtils-BZ8Iao9B.js";import"./Tag-MaDmkoTF.js";import"./GrupperteDokumenter-DfO1_ptc.js";import"./guid-CsArkN6i.js";import"./Accordion-CagUBT_y.js";import"./Header-CnMcs578.js";import"./LayoutWrapper-CqoKtpDs.js";import"./StatusTag-DQRNv4ve.js";import"./Stroller-CSVLdPOE.js";import"./NoeGikkGalt-B7pYij3m.js";import"./MinidialogSkjema-DOiYIYU8.js";import"./skjemanummer-B0kSgjH2.js";import"./BekreftelseSendtSøknad-DjXgeNpx.js";import"./KontonummerInfo-Djzp59xo.js";import"./HarIkkeSaker-Cqxadr4A.js";import"./SøkelenkerPanel-DdfzN-pf.js";import"./HarSaker-eQ5KyHrG.js";import"./SakLink-IjeWEw3f.js";import"./ContentSection-Cg2mxq-C.js";import"./Svangerskapspenger-CgPB3lr0.js";import"./DinPlan-C_P-deoc.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-SPGfaacq.js";import"./OppgaveLenkepanel-rMHAL_ET.js";import"./KontaktOss-CEwms0O5.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const re=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,re as __namedExportsOrder,te as default};
