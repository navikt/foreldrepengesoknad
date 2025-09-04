import{i as g,j as t}from"./iframe-DCXGowBy.js";import{h as o,H as p}from"./index-CW50hLtf.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BQXggMvx.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-Bu0TNm6p.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BYcr3nnj.js";import"./useSelectedSak-BNsaCJHw.js";import"./useQuery-DHyj_4CN.js";import"./api-C8ezB4Dl.js";import"./sakerUtils-DcfY4jYi.js";import"./Snarveier-yNz98_Ww.js";import"./LenkePanel-CE58ecod.js";import"./index-BMM3-nqT.js";import"./Dokument-COX-fh4Y.js";import"./dokumenterUtils-CUPaIhKZ.js";import"./Tag-BV-iTgsE.js";import"./GrupperteDokumenter-ByZe9_MQ.js";import"./guid-CsArkN6i.js";import"./Accordion-BMR-mghI.js";import"./Header-CMoB-GU1.js";import"./LayoutWrapper-Fgv9jP72.js";import"./StatusTag-DcgMxzvW.js";import"./Stroller-CzPDeyyd.js";import"./NoeGikkGalt-wz9PrkoV.js";import"./MinidialogSkjema-B-jESk49.js";import"./skjemanummer-xZFFZDtX.js";import"./BekreftelseSendtSøknad-CKHbc-Jx.js";import"./KontonummerInfo-B9L1z1Ln.js";import"./HarIkkeSaker-hqlgMNWm.js";import"./SøkelenkerPanel-DghJZ20j.js";import"./HarSaker-BZtAsIBn.js";import"./SakLink-B4d0ThJE.js";import"./ContentSection-CZi5xWlC.js";import"./Svangerskapspenger-C5CqROuF.js";import"./DinPlan-BKlQYKa_.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-J8z0xHPl.js";import"./OppgaveLenkepanel-D32UgDdM.js";import"./KontaktOss-DiQbldbP.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
