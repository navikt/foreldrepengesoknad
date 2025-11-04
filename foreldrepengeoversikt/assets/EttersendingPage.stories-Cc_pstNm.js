import{i as g,j as t}from"./iframe-DEhwS6sp.js";import{h as p,H as o}from"./index-DnOzczH2.js";import{A as i}from"./api-CPfxHqTM.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-j98V4uC5.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BtmiRiL4.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Cs2nLKT4.js";import"./useSelectedSak-DZTP3mqH.js";import"./useQuery-DTjTkXx_.js";import"./sakerUtils-CitOY5_8.js";import"./Snarveier-CZY47_h1.js";import"./LenkePanel-BoOsYrDc.js";import"./index-D4MN5hiV.js";import"./Header-CHW8drPn.js";import"./LayoutWrapper-BvnZoIfJ.js";import"./StatusTag-BvqVgydR.js";import"./Tag-D7lHsqNP.js";import"./Stroller-BMIG3Wz_.js";import"./NoeGikkGalt-BRsQBwSl.js";import"./MinidialogSkjema-Ds04HKCn.js";import"./skjemanummer-BSzKSMDy.js";import"./HarIkkeSaker-CTtw1jqM.js";import"./SøkelenkerPanel-CytROjCQ.js";import"./HarSaker-CJqzhri4.js";import"./SakLink-BmKftEIZ.js";import"./guid-CsArkN6i.js";import"./ContentSection-CC2Q0g2S.js";import"./BekreftelseSendtSøknad-CH7PR9wZ.js";import"./KontonummerInfo-DiNzaHFX.js";import"./Accordion-C0Dma9LM.js";import"./Svangerskapspenger-BqmU3qwo.js";import"./DinPlan-vDh76K14.js";import"./Oppgaver-CQsstLYF.js";import"./OppgaveLenkepanel-Bnq-SVlX.js";import"./KontaktOss-8t6QGlF5.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
