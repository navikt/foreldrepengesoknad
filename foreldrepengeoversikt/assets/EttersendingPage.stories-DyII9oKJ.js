import{k as g,j as t}from"./iframe-YzsMqPi8.js";import{h as p,H as o}from"./index-vK98giye.js";import{A as i}from"./queries-yCGiMydJ.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DDq6PguY.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-D6SMBpmh.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-9zaGeqzn.js";import"./useSelectedSak-D9PRTkeR.js";import"./useQuery-Nzci2VYI.js";import"./sakerUtils-ddEy9qcR.js";import"./Snarveier-CnKlgYmg.js";import"./LenkePanel-BEXt--Bm.js";import"./index-CaD3v7ks.js";import"./Header-BO4kqZOf.js";import"./LayoutWrapper-eL9-q2RG.js";import"./StatusTag-CsEdrS0K.js";import"./Tag-7xqxeoiU.js";import"./Stroller-TVhFeVt4.js";import"./NoeGikkGalt-C8-5qTO3.js";import"./skjemanummer-D1GIyISl.js";import"./MinidialogSkjema-BYc6fHnC.js";import"./HarIkkeSaker-DPaDfcu5.js";import"./SøkelenkerPanel-gpYHJaET.js";import"./HarSaker-BKlriR10.js";import"./SakLink-DkKpdSgo.js";import"./guid-CsArkN6i.js";import"./ContentSection-CnBGrHSD.js";import"./BekreftelseSendtSøknad-D1Lj1wTp.js";import"./KontonummerInfo-D-_tsuJh.js";import"./Accordion-DBKWjWKJ.js";import"./Svangerskapspenger-Bs9bai9L.js";import"./DinPlan-DCs_wOJh.js";import"./Oppgaver-BDeCVkMv.js";import"./OppgaveLenkepanel-CTXLbGFl.js";import"./KontaktOss-DCzOM4VL.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
