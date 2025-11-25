import{i as g,j as t}from"./iframe--LXeAaZx.js";import{h as p,H as o}from"./index-BbqyAjaQ.js";import{A as i}from"./queries-De-LxnWd.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DTk2XZ3P.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-Ct6ofrUn.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-MXLvdFYb.js";import"./useSelectedSak-BwERAcba.js";import"./useQuery-CbAC7qLT.js";import"./sakerUtils-DzwKF4TQ.js";import"./Snarveier-WnMEfaR-.js";import"./LenkePanel-BcQh7Bg4.js";import"./index-BlxjyQzd.js";import"./Header-bcXRn9sH.js";import"./LayoutWrapper-C7l-9_Z6.js";import"./StatusTag-CZbEvA7u.js";import"./Tag-B2ceE9ct.js";import"./Stroller-BS0P5BJD.js";import"./NoeGikkGalt-oG3TMaEG.js";import"./skjemanummer-BWLTo9BB.js";import"./MinidialogSkjema-MKNPeiFU.js";import"./HarIkkeSaker-clmSku-g.js";import"./SøkelenkerPanel-CFYdK1_C.js";import"./HarSaker-C1JXchmz.js";import"./SakLink-DzMzJgZ1.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cj62C6nL.js";import"./BekreftelseSendtSøknad-mPBYwA5A.js";import"./KontonummerInfo-Ccekxc56.js";import"./Accordion-NqSQaK5S.js";import"./Svangerskapspenger-C3qFoAo9.js";import"./DinPlan-BA6Gu1yF.js";import"./Oppgaver-BHRXgv9e.js";import"./OppgaveLenkepanel-C3bZQMJo.js";import"./KontaktOss-ld8lgMH8.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
