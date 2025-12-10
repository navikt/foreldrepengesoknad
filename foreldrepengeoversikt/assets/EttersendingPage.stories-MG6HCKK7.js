import{k as g,j as t}from"./iframe-BNKLDQIx.js";import{h as p,H as o}from"./index-COpQmBpi.js";import{A as i}from"./queries-DgnQYwvy.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-RJNwyFH0.js";import{M as u,R as k,a as S}from"./chunk-4WY6JWTD-3YC1soPf.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-_HZJSx4_.js";import"./useSelectedSak-8hw_1uhN.js";import"./useQuery-BJvq-Jy8.js";import"./sakerUtils-Cp7GTaNI.js";import"./Snarveier-BBz9ogqJ.js";import"./LenkePanel-8Nn6b35c.js";import"./index-T1TWLa-o.js";import"./Header-DZYPjOd_.js";import"./LayoutWrapper-k9YLAU47.js";import"./StatusTag-D3OY8ScN.js";import"./Tag-BwDNxCs6.js";import"./Stroller-C7wp7HR6.js";import"./NoeGikkGalt-Bihh2wE2.js";import"./skjemanummer-CALBS8gO.js";import"./MinidialogSkjema-Evsq65vO.js";import"./HarIkkeSaker-Dt9O5iEd.js";import"./SøkelenkerPanel-BiwBlr_q.js";import"./HarSaker-8T-ku_Gf.js";import"./SakLink-CLoAHyZ2.js";import"./guid-CsArkN6i.js";import"./ContentSection-DM-zRf-J.js";import"./BekreftelseSendtSøknad-Pm9RoeFM.js";import"./KontonummerInfo-sKblvd_6.js";import"./Accordion-NQLjAl0z.js";import"./Svangerskapspenger-CRhMMMBO.js";import"./DinPlan-Cp5qxlZ9.js";import"./Oppgaver-DhQ2VFGf.js";import"./OppgaveLenkepanel-DXF7v2Eu.js";import"./KontaktOss-DllD0J-1.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
