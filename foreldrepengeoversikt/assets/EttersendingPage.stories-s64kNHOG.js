import{i as g,j as t}from"./iframe-_ObgTIvO.js";import{h as p,H as o}from"./index-DGt0Llg0.js";import{A as m}from"./api-BLmyi74k.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DDmKcUAk.js";import{M as u,R as k,a as c}from"./chunk-TMI4QPZX-B4DqY82Q.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CLdPYyJY.js";import"./useSelectedSak-Dn03gsY9.js";import"./useQuery-DgkBNIex.js";import"./sakerUtils-BBJUz6cp.js";import"./Snarveier-CCo_Vx-x.js";import"./LenkePanel-B4_sTc2J.js";import"./index-B0iFlWDP.js";import"./Dokument-DGw-kGE9.js";import"./dokumenterUtils-C4xiCv8T.js";import"./Tag-0eVjUN-W.js";import"./GrupperteDokumenter-B5Yl2f2Y.js";import"./guid-CsArkN6i.js";import"./Accordion-lZ-PMbtQ.js";import"./Header-BCY7uCG3.js";import"./LayoutWrapper-Bkbbo96p.js";import"./StatusTag-BrVfGjyA.js";import"./Stroller-B3hU8Oan.js";import"./NoeGikkGalt-FTYMzGr9.js";import"./MinidialogSkjema-vOPBBUCJ.js";import"./skjemanummer-DnkMUdAG.js";import"./BekreftelseSendtSøknad-CsWF3rQi.js";import"./KontonummerInfo-VhLMjAja.js";import"./HarIkkeSaker-BWghkiQq.js";import"./SøkelenkerPanel-Ds4uxRmH.js";import"./HarSaker-Cv-roMZc.js";import"./SakLink-e1I9A0_c.js";import"./ContentSection-Bszpd5R7.js";import"./Svangerskapspenger-BC886n4H.js";import"./DinPlan-pU3t6BFf.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-8X-_cpCu.js";import"./OppgaveLenkepanel-s0Zvpho9.js";import"./KontaktOss-DbtOpFFg.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:i=>{const{skjematypeQueryParamValue:s,...l}=i,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(c,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
