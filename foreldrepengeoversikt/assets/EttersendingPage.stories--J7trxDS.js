import{k as g,j as t}from"./iframe-OuPw_AAl.js";import{h as p,H as o}from"./index-Cd1vQHFu.js";import{A as i}from"./queries-B7Mavn8A.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-D2XtLUFB.js";import{M as u,R as k,a as S}from"./chunk-4WY6JWTD-BgqL89ER.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-CJNWKZmp.js";import"./useSelectedSak-CTfwSEFs.js";import"./useQuery-BUf2RA8B.js";import"./sakerUtils-E8qS1FzO.js";import"./Snarveier-BibF7F_I.js";import"./LenkePanel-B7jTEsTn.js";import"./index-D9NB9_BP.js";import"./Header-CkflXi2H.js";import"./LayoutWrapper-DHWX4iFY.js";import"./StatusTag-DGBuTxfP.js";import"./Tag-DT9otXTd.js";import"./Stroller-DoDV5xWq.js";import"./NoeGikkGalt-C2ewmd8v.js";import"./skjemanummer-DySabmph.js";import"./MinidialogSkjema-CyJJhKSi.js";import"./HarIkkeSaker-CcM2h0Xk.js";import"./SøkelenkerPanel-Be4iDiN7.js";import"./HarSaker-Dwwd8OfJ.js";import"./SakLink-iFKd6kSJ.js";import"./guid-CsArkN6i.js";import"./ContentSection-DSRSQjhE.js";import"./BekreftelseSendtSøknad-36bzFygA.js";import"./KontonummerInfo-2ykL-YVg.js";import"./Accordion-B1W6iHMj.js";import"./Svangerskapspenger-HTKJ0aFI.js";import"./DinPlan-DEh4q_23.js";import"./Oppgaver-DIubtAy7.js";import"./OppgaveLenkepanel-A_ieajZH.js";import"./KontaktOss-BchksEn2.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
