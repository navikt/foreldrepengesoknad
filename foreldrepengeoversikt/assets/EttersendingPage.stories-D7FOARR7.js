import{i as g,j as t}from"./iframe-DZqmX2Pl.js";import{h as o,H as p}from"./index-2sm9E9gI.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CYQHXBRx.js";import{M as d,R as u,a as k}from"./chunk-TMI4QPZX-BpI84etn.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-QWf0HCgM.js";import"./useSelectedSak-DGDe2O2X.js";import"./useQuery-CCpOkbfR.js";import"./api-briH8RE4.js";import"./sakerUtils-D2AYwurK.js";import"./Snarveier-Dr_WZSEU.js";import"./LenkePanel-lTqdE-pC.js";import"./index-BKKzYOzq.js";import"./Dokument-CpGOsjS0.js";import"./dokumenterUtils-CbHZzTLn.js";import"./Tag-BkwNHn-l.js";import"./GrupperteDokumenter-DJm52qaa.js";import"./guid-CsArkN6i.js";import"./Accordion-HyT86eUs.js";import"./Header-BEwOGZzE.js";import"./LayoutWrapper-BR__bP6e.js";import"./StatusTag-B3hvntiM.js";import"./Stroller-fXTzZUVj.js";import"./NoeGikkGalt-uVYKNhA9.js";import"./MinidialogSkjema-BoSZc5ks.js";import"./skjemanummer-BWSC44tl.js";import"./BekreftelseSendtSøknad-z6BEHama.js";import"./KontonummerInfo-I4DzilRh.js";import"./HarIkkeSaker-BVTZa_nv.js";import"./SøkelenkerPanel-BXHoQPgc.js";import"./HarSaker-DMXytBeX.js";import"./SakLink-IhweO2mY.js";import"./ContentSection-Bh0vEia0.js";import"./Svangerskapspenger-tGCqdka6.js";import"./DinPlan-DbSd-Kzp.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-R5THg7ql.js";import"./OppgaveLenkepanel-y4VRXyM5.js";import"./KontaktOss-qDor53HB.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
