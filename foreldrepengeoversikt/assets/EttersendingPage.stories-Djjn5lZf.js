import{i as g,j as t}from"./iframe-DoW6OxbK.js";import{h as p,H as o}from"./index-OFSud93j.js";import{A as i}from"./queries-BocRl32X.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-C38xvKnu.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DnwaNCuG.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DcUmuyoB.js";import"./useSelectedSak-Cn0j07hs.js";import"./useQuery-BpHolZ9F.js";import"./sakerUtils-qq6kih1U.js";import"./Snarveier-Dgk5AxUF.js";import"./LenkePanel-hmKVpLO5.js";import"./index-DDb9nB8b.js";import"./Header-Cz7PaK7L.js";import"./LayoutWrapper-BZURKrqE.js";import"./StatusTag-DKo2j9Gu.js";import"./Tag-CVCROYFu.js";import"./Stroller-DO7G4ANq.js";import"./NoeGikkGalt-bEBpmOIq.js";import"./skjemanummer-DDSQq6vc.js";import"./MinidialogSkjema-dw1xt4qp.js";import"./HarIkkeSaker-Dbx6jP_Z.js";import"./SøkelenkerPanel-BJeVosXt.js";import"./HarSaker-CVsmHkfZ.js";import"./SakLink-BFfzC-yi.js";import"./guid-CsArkN6i.js";import"./ContentSection-Bnh-6E_r.js";import"./BekreftelseSendtSøknad-B4yIB0iQ.js";import"./KontonummerInfo-CEUtEu0U.js";import"./Accordion-Ct7Nd3u-.js";import"./Svangerskapspenger-C6ge9hhx.js";import"./DinPlan-FsGlsoMz.js";import"./Oppgaver-BZFoHktm.js";import"./OppgaveLenkepanel-K09boPBy.js";import"./KontaktOss-CRJgkrbe.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
