import{k as g,j as t}from"./iframe-Yr3ikmRB.js";import{h as p,H as o}from"./index--Y-KVhMB.js";import{A as i}from"./queries-C6k2LQmH.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DXHMCy2v.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-Xx74wE5A.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-iDVTIFu2.js";import"./useSelectedSak-iK9xccOK.js";import"./useQuery-BCZgAB0y.js";import"./sakerUtils-BAse5xh2.js";import"./Snarveier-DpxcIWQg.js";import"./LenkePanel-CSmkwQ3P.js";import"./index-p31wFLZy.js";import"./Header-nCLoIkkR.js";import"./LayoutWrapper-C7lpJdTD.js";import"./StatusTag-0qHP-I-k.js";import"./Tag-DAGVHiNO.js";import"./Stroller-47F4VCcq.js";import"./NoeGikkGalt-7NkanYBo.js";import"./skjemanummer-Cw8MkDOp.js";import"./MinidialogSkjema-CtB2uOAt.js";import"./HarIkkeSaker-CgkAmo42.js";import"./SøkelenkerPanel-DFsuzA-r.js";import"./HarSaker-DKU5av8l.js";import"./SakLink-BW7EBiAG.js";import"./guid-CsArkN6i.js";import"./ContentSection-BhuNT9aU.js";import"./BekreftelseSendtSøknad-BI-Zh9-9.js";import"./KontonummerInfo-0kizcRmc.js";import"./Accordion-BE4hDUbF.js";import"./Svangerskapspenger-CEInAnzz.js";import"./DinPlan-Ct5-GQrF.js";import"./Oppgaver-s87W6Bck.js";import"./OppgaveLenkepanel-BG-bQT9T.js";import"./KontaktOss-tZi8rEzw.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
