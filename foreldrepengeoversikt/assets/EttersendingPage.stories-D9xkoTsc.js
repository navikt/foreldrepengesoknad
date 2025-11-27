import{k as g,j as t}from"./iframe-BCrCQR0v.js";import{h as p,H as o}from"./index-8OhhmJkJ.js";import{A as i}from"./queries-z88tTpn9.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Bv_zZ70P.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BwnSm7gM.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CPH3fESu.js";import"./useSelectedSak-CEKMsXMw.js";import"./useQuery-DM-c5BKR.js";import"./sakerUtils-D3UeiCW1.js";import"./Snarveier-BfZwuw-l.js";import"./LenkePanel-BLtxdIi9.js";import"./index-ylXTHoAf.js";import"./Header-DCaALqfb.js";import"./LayoutWrapper-BPI6oFU0.js";import"./StatusTag-Nht5eGpz.js";import"./Tag-CsppBFHH.js";import"./Stroller-Buz3zGce.js";import"./NoeGikkGalt-DtUq3bMe.js";import"./skjemanummer-BFa0iUCb.js";import"./MinidialogSkjema-CZcUXizo.js";import"./HarIkkeSaker-Uup0zu4w.js";import"./SøkelenkerPanel-Kj6X9eSa.js";import"./HarSaker-CgkRgXjZ.js";import"./SakLink-BVVUDSyN.js";import"./guid-CsArkN6i.js";import"./ContentSection-DEf0MvGQ.js";import"./BekreftelseSendtSøknad-Dx_cj2Ak.js";import"./KontonummerInfo-n24VKvHC.js";import"./Accordion-Dz63FtBO.js";import"./Svangerskapspenger-CnvzEZ3u.js";import"./DinPlan-Be27GDyc.js";import"./Oppgaver-usMrH0ca.js";import"./OppgaveLenkepanel-B-5AY0C8.js";import"./KontaktOss-BXwsW6wV.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
