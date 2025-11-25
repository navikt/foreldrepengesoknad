import{i as g,j as t}from"./iframe-2X5b7wGu.js";import{h as p,H as o}from"./index-BnDizS2s.js";import{A as i}from"./queries-BepJQoDW.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-XJb_G5xg.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-9fLl2Gdr.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BcOqZA8f.js";import"./useSelectedSak-oJj7K-OT.js";import"./useQuery-CigvV_nw.js";import"./sakerUtils-BMRlwrb3.js";import"./Snarveier-CDJT9ZwV.js";import"./LenkePanel-CyuOWNYx.js";import"./index-DSLRkqwp.js";import"./Header-CfJyTvF8.js";import"./LayoutWrapper-Dxz58bDi.js";import"./StatusTag-CRI0TLRr.js";import"./Tag-Bo_CkWt6.js";import"./Stroller-D3vX1snq.js";import"./NoeGikkGalt-iy3V9PAQ.js";import"./skjemanummer-BR1Tofgi.js";import"./MinidialogSkjema-CxKJYyHh.js";import"./HarIkkeSaker-BUBraOUE.js";import"./SøkelenkerPanel-DOjJ9b_s.js";import"./HarSaker-n_m9IhcW.js";import"./SakLink-CVznwkbg.js";import"./guid-CsArkN6i.js";import"./ContentSection-BpGyeZmF.js";import"./BekreftelseSendtSøknad-KftILQPZ.js";import"./KontonummerInfo-C257_ati.js";import"./Accordion-Bfjnitq2.js";import"./Svangerskapspenger-DYibz146.js";import"./DinPlan-CIYyFCyo.js";import"./Oppgaver-E90pdjrO.js";import"./OppgaveLenkepanel-BB0jzR2l.js";import"./KontaktOss-CEXkOHHA.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
