import{i as g,j as t}from"./iframe-CLM11C8m.js";import{h as p,H as o}from"./index-DQwqjeWI.js";import{A as i}from"./queries-VyfYVLlM.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DAXsYKoC.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CE4fpZis.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BdijMl_b.js";import"./useSelectedSak-CFVycs97.js";import"./useQuery-CxJ4Fx3z.js";import"./sakerUtils-BWtzJuuh.js";import"./Snarveier-SdB9mKVu.js";import"./LenkePanel-Coi1Fzq7.js";import"./index-BeDkJ9GN.js";import"./Header-6WvV_Imq.js";import"./LayoutWrapper-BnGZ8TGR.js";import"./StatusTag-BYEbQW5B.js";import"./Tag-nExZsBw2.js";import"./Stroller-K7VyG0M4.js";import"./NoeGikkGalt-BvGApvhi.js";import"./skjemanummer-Dhg6re-Y.js";import"./MinidialogSkjema-Bxe4TlQ1.js";import"./HarIkkeSaker-Dve-D20M.js";import"./SøkelenkerPanel-D-UYFpnp.js";import"./HarSaker-svnu9FkH.js";import"./SakLink-Bj51we0L.js";import"./guid-CsArkN6i.js";import"./ContentSection-BN5pNG0O.js";import"./BekreftelseSendtSøknad-C3bAvcaP.js";import"./KontonummerInfo-B6BKyvcD.js";import"./Accordion-Ck9OfTuC.js";import"./Svangerskapspenger-C7kkLop-.js";import"./DinPlan-CVo-z6qH.js";import"./Oppgaver-DZgaQcWS.js";import"./OppgaveLenkepanel-CRFmst_G.js";import"./KontaktOss-BU1DrjfQ.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
