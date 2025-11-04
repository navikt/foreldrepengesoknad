import{i as g,j as t}from"./iframe-C9KJPXfJ.js";import{h as p,H as o}from"./index-PZEFNuCP.js";import{A as i}from"./api-B_y6eeU-.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CVCH8n0n.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-D07ZEwuW.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BF205jm4.js";import"./useSelectedSak-M-pn9ZSG.js";import"./useQuery-DrsC5nQQ.js";import"./sakerUtils-DFPkUgcB.js";import"./Snarveier-CXyjwRVg.js";import"./LenkePanel-C-89pSnx.js";import"./index-BvcktY-y.js";import"./Header-tCW2H_BJ.js";import"./LayoutWrapper-DaZFO2Bc.js";import"./StatusTag-BVNqvnOs.js";import"./Tag-Bz-v3O4J.js";import"./Stroller-k5BT6F3K.js";import"./NoeGikkGalt-BaO-U9hj.js";import"./MinidialogSkjema-BYtYcCu9.js";import"./skjemanummer-D166v1Fz.js";import"./HarIkkeSaker-BEipbVUc.js";import"./SøkelenkerPanel-r04Kqow1.js";import"./HarSaker-GvpkX1O0.js";import"./SakLink-CPHeRMll.js";import"./guid-CsArkN6i.js";import"./ContentSection-BcoPijCc.js";import"./BekreftelseSendtSøknad-CyFkFUlx.js";import"./KontonummerInfo-BmoviD5c.js";import"./Accordion-BHZzDM_0.js";import"./Svangerskapspenger-D_RZGhKa.js";import"./DinPlan-DatJ8Ixq.js";import"./Oppgaver-CL3y6tOy.js";import"./OppgaveLenkepanel-BLSD2k2_.js";import"./KontaktOss-JQJX9adU.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
