import{i as g,j as t}from"./iframe-Gomn0hXJ.js";import{h as o,H as p}from"./index-Ms5WyU47.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DE2HCGy_.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-Bmx1GKNC.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-D1QBvvdf.js";import"./useSelectedSak-DMnYuWUk.js";import"./useQuery-CY8oy0_P.js";import"./api-DpNGSAc7.js";import"./sakerUtils-BNEIyqnb.js";import"./Snarveier-BK3FArG6.js";import"./LenkePanel-BrP3xJEZ.js";import"./index-LmvG6jHN.js";import"./Dokument-hY-lHWZZ.js";import"./dokumenterUtils-BwJigEvM.js";import"./Tag-jNkXalMi.js";import"./GrupperteDokumenter-D9_xqJap.js";import"./guid-CsArkN6i.js";import"./Accordion-B82ShLhy.js";import"./Header-DX83Pb0Q.js";import"./LayoutWrapper-Bp-JhgUU.js";import"./StatusTag-CHy5MFrD.js";import"./Stroller-UcegfLvl.js";import"./NoeGikkGalt-Z3GBLHhp.js";import"./MinidialogSkjema-CLTnC43J.js";import"./skjemanummer-CmYLATVY.js";import"./BekreftelseSendtSøknad-B0EKD_jZ.js";import"./KontonummerInfo-BqLnckUH.js";import"./HarIkkeSaker-B4ufo6b2.js";import"./SøkelenkerPanel-DmZnFG2g.js";import"./HarSaker-BI1zeBDX.js";import"./SakLink-KKRL8P1M.js";import"./ContentSection-BMigGgN2.js";import"./Svangerskapspenger-CQBcA3AL.js";import"./DinPlan-B_u3F4A1.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-x54ltUQD.js";import"./OppgaveLenkepanel-CJZv6SAG.js";import"./KontaktOss-W2WAodTu.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
