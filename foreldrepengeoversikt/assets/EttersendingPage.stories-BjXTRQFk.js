import{i as g,j as t}from"./iframe-DD56jBa9.js";import{h as p,H as o}from"./index-BCc5dHNN.js";import{A as i}from"./queries-CP1IF2jh.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DM9B58BP.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-D13H9MA4.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DN7CAypn.js";import"./useSelectedSak-u_WV8I8q.js";import"./useQuery-CE8KmS8G.js";import"./sakerUtils-BjBGs0yZ.js";import"./Snarveier-BtQq39SF.js";import"./LenkePanel-DpY0ivt7.js";import"./index-Brx_4QG-.js";import"./Header-CjlN0tsx.js";import"./LayoutWrapper-DeKwNDSI.js";import"./StatusTag-DOZdGwPI.js";import"./Tag-0FTiUioX.js";import"./Stroller-0q9h2n5w.js";import"./NoeGikkGalt-DcLdS47O.js";import"./skjemanummer-md7FLabt.js";import"./MinidialogSkjema-WdWj7O66.js";import"./HarIkkeSaker-BI66SCop.js";import"./SøkelenkerPanel-Bfewq7en.js";import"./HarSaker-Cp68XW81.js";import"./SakLink-Dfo6QYMA.js";import"./guid-CsArkN6i.js";import"./ContentSection-DXZeBLM7.js";import"./BekreftelseSendtSøknad-CSKOJ1Oo.js";import"./KontonummerInfo-DVl8addU.js";import"./Accordion-BKomoaF_.js";import"./Svangerskapspenger-CyGZQIjT.js";import"./DinPlan-B1gQMTTN.js";import"./Oppgaver-BL_Zj7aX.js";import"./OppgaveLenkepanel-cD_5WziM.js";import"./KontaktOss-DnYJpGIF.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
