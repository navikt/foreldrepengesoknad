import{i as g,j as t}from"./iframe-B32evDWZ.js";import{h as o,H as p}from"./index-oJ7eYyfF.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Begl-ifu.js";import{M as d,R as u,a as k}from"./chunk-EF7DTUVF-BctMXm57.js";import"./useBackgroundColor-CIUV8gYZ.js";import"./useSelectedSak-Duauv8DJ.js";import"./useQuery-0uLNDPpC.js";import"./api-DNiL4QzO.js";import"./sakerUtils-DL9nPtMR.js";import"./Snarveier-BR2Wf2AS.js";import"./LenkePanel-CfvBl2hc.js";import"./Dokument-1nbbuwKc.js";import"./dokumenterUtils-DlJYEURL.js";import"./Tag-CvNQeNc_.js";import"./GrupperteDokumenter-BPxcbJ0s.js";import"./guid-CsArkN6i.js";import"./Header-yBl0G1DZ.js";import"./LayoutWrapper-DxnbVrj_.js";import"./StatusTag-CydxeXvl.js";import"./Stroller-BakRnG2Q.js";import"./NoeGikkGalt-DA5iJqEe.js";import"./MinidialogSkjema-BeOzW7LI.js";import"./skjemanummer-Sn8w2Hku.js";import"./BekreftelseSendtSøknad-BHqIZTWP.js";import"./KontonummerInfo-CwxQ_ECQ.js";import"./HarIkkeSaker-DGhl79ay.js";import"./SøkelenkerPanel-CTSL9Ngc.js";import"./HarSaker-J38xBEuY.js";import"./SakLink-BpY-CIRU.js";import"./ContentSection-4miCLrdt.js";import"./Svangerskapspenger-Be-9L0E_.js";import"./DinPlan-j-r0G6ym.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CZdVD1l1.js";import"./OppgaveLenkepanel-BkyzSr8b.js";import"./KontaktOss-BOqKEKGw.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const Z=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,Z as __namedExportsOrder,Y as default};
