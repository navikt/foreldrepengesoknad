import{i as g,j as t}from"./iframe-CYd54ksq.js";import{h as p,H as o}from"./index-anbsQTXw.js";import{A as i}from"./queries-C9c4B7F4.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Y8PvsNnr.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CnSTt7Pl.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BCPm2HRH.js";import"./useSelectedSak-Dhxo7ALA.js";import"./useQuery-CFzlq3rk.js";import"./sakerUtils-CdW6VLF4.js";import"./Snarveier-D6W9JpBs.js";import"./LenkePanel-B2p2LHRR.js";import"./index-q9ygLvhk.js";import"./Header-DDPu0YIH.js";import"./LayoutWrapper-C_mO9IzW.js";import"./StatusTag-D5YXFkSJ.js";import"./Tag-f1Dl2yq1.js";import"./Stroller-Bn8vlswg.js";import"./NoeGikkGalt-Bf2p9_II.js";import"./skjemanummer-CnVuRHYU.js";import"./MinidialogSkjema-vZLfTQDY.js";import"./HarIkkeSaker-cAWVsoyS.js";import"./SøkelenkerPanel-BLT0Gs26.js";import"./HarSaker-ClpbHehv.js";import"./SakLink-o0m3KdRV.js";import"./guid-CsArkN6i.js";import"./ContentSection-CBqCb8Nn.js";import"./BekreftelseSendtSøknad-Caw5G_Cl.js";import"./KontonummerInfo-CfX8GOgB.js";import"./Accordion-lko_WLmy.js";import"./Svangerskapspenger-B_ukJvFc.js";import"./DinPlan-de-6fk5s.js";import"./Oppgaver-CuR-g4En.js";import"./OppgaveLenkepanel-Dadq-zjX.js";import"./KontaktOss-t27wZqNF.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
