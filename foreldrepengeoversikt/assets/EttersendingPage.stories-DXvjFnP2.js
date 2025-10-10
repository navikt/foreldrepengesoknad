import{i as g,j as t}from"./iframe-UfXC0p-1.js";import{h as p,H as o}from"./index-YuEvdJcH.js";import{A as m}from"./api-DFXOmjZu.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Db_5hGpg.js";import{M as u,R as k,a as c}from"./chunk-TMI4QPZX-Cv-Od35g.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-sc_byijV.js";import"./useSelectedSak-CA3-cnht.js";import"./useQuery-CRSDkvn-.js";import"./sakerUtils-BLIkkC4f.js";import"./Snarveier-D0tL_HS2.js";import"./LenkePanel-D9mqU5HX.js";import"./index-B3eOkrZg.js";import"./Dokument-DbMdlD5E.js";import"./dokumenterUtils-wh7s3sVK.js";import"./Tag-EY_S4qyu.js";import"./GrupperteDokumenter-PGNwJhnY.js";import"./guid-CsArkN6i.js";import"./Accordion-Bx_Ph9r2.js";import"./Header-B2VZviZi.js";import"./LayoutWrapper-DCHGOH2Y.js";import"./StatusTag-BNEuPAID.js";import"./Stroller-d6HrHk-z.js";import"./NoeGikkGalt-BByiuuxC.js";import"./MinidialogSkjema-BDYW9Cr0.js";import"./skjemanummer-CIGqbfVD.js";import"./BekreftelseSendtSøknad-BeBHOpf7.js";import"./KontonummerInfo-BX0PBl_V.js";import"./HarIkkeSaker-D2no7Pvp.js";import"./SøkelenkerPanel-CGQd4SGd.js";import"./HarSaker-CO-5CgYv.js";import"./SakLink-CgBwrUaO.js";import"./ContentSection-D5kRyldd.js";import"./Svangerskapspenger-B-D-xrRK.js";import"./DinPlan-CjNm4zIu.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-D9_9S2Ud.js";import"./OppgaveLenkepanel-g5D9n6DQ.js";import"./KontaktOss-BwyMr2zv.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:i=>{const{skjematypeQueryParamValue:s,...l}=i,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(c,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.lastOppESVedlegg, () => {
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
      handlers: [http.post(API_URLS.lastOppESVedlegg, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...r.parameters?.docs?.source}}};const se=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,se as __namedExportsOrder,re as default};
