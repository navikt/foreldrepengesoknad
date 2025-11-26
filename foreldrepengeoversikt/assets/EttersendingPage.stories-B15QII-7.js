import{k as g,j as t}from"./iframe-Ba91ONca.js";import{h as p,H as o}from"./index-BMiVihQd.js";import{A as i}from"./queries-CWOBDaOb.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DfJFOfod.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CyeXW52V.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BWFtpHeP.js";import"./useSelectedSak-D39zH--b.js";import"./useQuery-C8GKLKUv.js";import"./sakerUtils-BKEKI5T_.js";import"./Snarveier-Drg7dQU8.js";import"./LenkePanel-DHVL0_x_.js";import"./index-DUa15r_E.js";import"./Header-DNjoLMq2.js";import"./LayoutWrapper-5nbn3R2a.js";import"./StatusTag-CDTZUW9I.js";import"./Tag-DyFW5QKi.js";import"./Stroller-CWuvw2ff.js";import"./NoeGikkGalt-BsjrpJXa.js";import"./skjemanummer-CtKs9rvM.js";import"./MinidialogSkjema-BbzVkJBa.js";import"./HarIkkeSaker-CDS4pWOQ.js";import"./SøkelenkerPanel-CGvPJpOB.js";import"./HarSaker-CSfddcGH.js";import"./SakLink-CoeXL9yc.js";import"./guid-CsArkN6i.js";import"./ContentSection-CqoVP7V1.js";import"./BekreftelseSendtSøknad-nZVXRiVE.js";import"./KontonummerInfo-D0hxfqaS.js";import"./Accordion-C1xtiWhV.js";import"./Svangerskapspenger-Cvz8irBi.js";import"./DinPlan-B_X1xH53.js";import"./Oppgaver-MmYsU9R4.js";import"./OppgaveLenkepanel-DaRpAYeg.js";import"./KontaktOss-BdFfFn5C.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.lastOppESVedlegg, () => {
        return new HttpResponse(JSON.stringify('test-uuid'), {
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
}`,...r.parameters?.docs?.source}}};const Z=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,Z as __namedExportsOrder,Y as default};
