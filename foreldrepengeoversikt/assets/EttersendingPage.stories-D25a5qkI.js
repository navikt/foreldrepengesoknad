import{i as g,j as t}from"./iframe-CdYtWI9G.js";import{h as p,H as o}from"./index-FQeIYOKF.js";import{A as i}from"./queries-C5ohGfx5.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BIYctCrw.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-6vtQ1n3A.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-hpLla-mh.js";import"./useSelectedSak-DeP1LXWm.js";import"./useQuery-08_cy6N4.js";import"./sakerUtils-CDBaZLKl.js";import"./Snarveier-DXVueNic.js";import"./LenkePanel-BPxRb78l.js";import"./index-Cek65idl.js";import"./Header-CimLqDqF.js";import"./LayoutWrapper-uOhxq1N-.js";import"./StatusTag-C8jjSR7g.js";import"./Tag-C9ku7rr1.js";import"./Stroller-DuE6hihZ.js";import"./NoeGikkGalt-CWl6RArp.js";import"./skjemanummer-BEkbk-b9.js";import"./MinidialogSkjema-KSglYnse.js";import"./HarIkkeSaker-BIi6IgvT.js";import"./SøkelenkerPanel-BTwSU-NL.js";import"./HarSaker-LxGrH36m.js";import"./SakLink-CUkxNdJJ.js";import"./guid-CsArkN6i.js";import"./ContentSection-D8R5Q54f.js";import"./BekreftelseSendtSøknad-CF4dYUtb.js";import"./KontonummerInfo-C0VudJJ3.js";import"./Accordion-Chslv0_Q.js";import"./Svangerskapspenger-BLikY1mN.js";import"./DinPlan-DUBxv4Ja.js";import"./Oppgaver-D11F3WKJ.js";import"./OppgaveLenkepanel-DHFccURI.js";import"./KontaktOss-D4Kj_aNe.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
