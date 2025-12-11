import{k as g,j as t}from"./iframe-BRmcZIst.js";import{h as p,H as o}from"./index-9Nm-IMS8.js";import{A as i}from"./queries-_my3A2ce.js";import{O as n}from"./routes-BgSQQwXh.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BD30tUg6.js";import{M as u,R as k,a as S}from"./chunk-4WY6JWTD-HsQf5FQP.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-BnALp3sh.js";import"./useSelectedSak-CXiH3I_B.js";import"./useQuery-BnqWRpHe.js";import"./sakerUtils-BPyRMxfW.js";import"./Snarveier-BW82A4ZH.js";import"./LenkePanel-C1A9YcUd.js";import"./index-Bx25rIxT.js";import"./Header-QsnlzLTT.js";import"./LayoutWrapper-Cy7dUNmz.js";import"./StatusTag-Bh3tYYMd.js";import"./Tag-Ch5oMGre.js";import"./Stroller-BPREDgfJ.js";import"./BabyWrapped-tQkSzOrY.js";import"./NoeGikkGalt-D_Xg_r5S.js";import"./skjemanummer-WIzlw668.js";import"./MinidialogSkjema-DHYCcONT.js";import"./HarIkkeSaker-Bes00XDU.js";import"./SøkelenkerPanel-C3sN19_P.js";import"./HarSaker-htvSjR4H.js";import"./SakLink-C-dPWKyZ.js";import"./guid-CsArkN6i.js";import"./ContentSection-BZxFgg8z.js";import"./BekreftelseSendtSøknad-umscLa9Y.js";import"./tidslinjeUtils-DUlhmbvc.js";import"./KontonummerInfo-Bnzii-in.js";import"./Accordion-BEnwD6Lo.js";import"./Svangerskapspenger-A4F_uU3B.js";import"./DinPlan-BleEAs-T.js";import"./Oppgaver-_t9PPizu.js";import"./OppgaveLenkepanel-D4tmVzF_.js";import"./Tidslinje-wVcctpGI.js";import"./Paperplane-DrKgyBxF.js";import"./KontaktOss-Vqeejoui.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const se=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,se as __namedExportsOrder,re as default};
