import{i as g,j as t}from"./iframe-BCkgP-XL.js";import{h as o,H as p}from"./index-CuDauSKi.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Bf_exO-E.js";import{M as d,R as u,a as k}from"./chunk-TMI4QPZX-B8E1VFW_.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-KsRP6-Ou.js";import"./useSelectedSak-Bpva4_4q.js";import"./useQuery-DPA_JJ-q.js";import"./api-CZfqxYUM.js";import"./sakerUtils-DCzvlZ3D.js";import"./Snarveier-snUQf2_M.js";import"./LenkePanel-BaQa0Y93.js";import"./index-DL8ND0GX.js";import"./Dokument-Bx05D0rq.js";import"./dokumenterUtils-CbCWtLgp.js";import"./Tag-BNJ1thpg.js";import"./GrupperteDokumenter-YqUdsuTE.js";import"./guid-CsArkN6i.js";import"./Accordion-DYjK6rWB.js";import"./Header-7dvhB0JY.js";import"./LayoutWrapper-BgQwbqc9.js";import"./StatusTag-DC2qz0a4.js";import"./Stroller-BGhMOKer.js";import"./NoeGikkGalt-fnx6X9fU.js";import"./MinidialogSkjema-BOWqqAb4.js";import"./skjemanummer-D7OfcTVW.js";import"./BekreftelseSendtSøknad-CU7wSPAM.js";import"./KontonummerInfo-BcMSM1eU.js";import"./HarIkkeSaker-qBBQ3sZ0.js";import"./SøkelenkerPanel-6BPjE1_q.js";import"./HarSaker-D0zR4NeT.js";import"./SakLink-BfXmTeca.js";import"./ContentSection-BWu4S38o.js";import"./Svangerskapspenger-BHcetxVr.js";import"./DinPlan-BoM2yjZa.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BsM4G0oU.js";import"./OppgaveLenkepanel-BIGp1PTQ.js";import"./KontaktOss-AHc40mcI.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
