import{k as g,j as t}from"./iframe-DRfCgLAJ.js";import{h as p,H as o}from"./index-BAMt_Dyp.js";import{A as i}from"./queries-OQtTuHlc.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BdOHTbLc.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-I9aqfGqy.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-Da49AGBU.js";import"./useSelectedSak-BeMpm25Q.js";import"./useQuery-Da6KQxxY.js";import"./sakerUtils-CuAgs-bc.js";import"./Snarveier-Bn_CKixn.js";import"./LenkePanel-Ca0AaUAY.js";import"./index-pAElvg8C.js";import"./Header-DepfGFVj.js";import"./LayoutWrapper-DjTxVVHo.js";import"./StatusTag-bDFz-Ni6.js";import"./Tag-TINjYXly.js";import"./Stroller-BBNkWBRS.js";import"./NoeGikkGalt-Bl-qRoGq.js";import"./skjemanummer-BIwt3Xav.js";import"./MinidialogSkjema-CubR7bz5.js";import"./HarIkkeSaker-Bz4zuFKh.js";import"./SøkelenkerPanel-CJlF0n_b.js";import"./HarSaker-DKBgUSUV.js";import"./SakLink-EQZDAyeu.js";import"./guid-CsArkN6i.js";import"./ContentSection-DPbUbbOb.js";import"./BekreftelseSendtSøknad-CR5bmcWV.js";import"./KontonummerInfo-CsldtXSr.js";import"./Accordion-DXN5qfOG.js";import"./Svangerskapspenger-CiM1SDX9.js";import"./DinPlan-VW6vBqOu.js";import"./Oppgaver-BsKlemMZ.js";import"./OppgaveLenkepanel-EGHTn7YL.js";import"./KontaktOss-DLej1pCF.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
