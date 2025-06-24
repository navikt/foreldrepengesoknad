import{i as E,j as t}from"./iframe-BJPuNUHF.js";import{h as d,H as u}from"./index-CTFy4nPz.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-IVZn5PBG.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-BMuloYWr.js";import"./useBackgroundColor-B1Ri4vk4.js";import"./useSelectedSak-CWwtc8lr.js";import"./useQuery-DouvvC5V.js";import"./api-D-FHbRRJ.js";import"./sakerUtils-B63kceXc.js";import"./Snarveier-By5BR_J1.js";import"./LenkePanel-BF5pdDjr.js";import"./Dokument-CWaIfXcw.js";import"./dokumenterUtils-DgFEPEDh.js";import"./Tag-BYgfewLn.js";import"./GrupperteDokumenter-Bk-DZq0K.js";import"./guid-CsArkN6i.js";import"./Header-CspJ2vPL.js";import"./LayoutWrapper-D-G3oxuq.js";import"./StatusTag-C18VFXNo.js";import"./Stroller-CntL7pKi.js";import"./NoeGikkGalt-C2_Y01Ob.js";import"./MinidialogSkjema-CDvqdprV.js";import"./skjemanummer-CxJ164Ma.js";import"./BekreftelseSendtSøknad-DQTquzUG.js";import"./KontonummerInfo-DWMeSoxN.js";import"./HarIkkeSaker-BYR_2aiQ.js";import"./SøkelenkerPanel-DneLnnh_.js";import"./HarSaker-DardmTGv.js";import"./SakLink-BfIhcwSD.js";import"./ContentSection-Droutm4m.js";import"./Svangerskapspenger-D8UTGUww.js";import"./DinPlan-BspQs8Va.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-DmoSvjXJ.js";import"./OppgaveLenkepanel-D7eTu4Jq.js";import"./KontaktOss-CiOvS2RZ.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
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
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var i,l,g;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(g=(l=r.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const ae=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,ae as __namedExportsOrder,ne as default};
