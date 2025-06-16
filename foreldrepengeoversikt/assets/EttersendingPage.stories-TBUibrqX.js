import{i as E,j as t}from"./iframe-Bw55AjnS.js";import{h as d,H as u}from"./index-BsOtLizl.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-hHYJ9ihb.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-D_9DSLPk.js";import"./useBackgroundColor-B4pi2JEN.js";import"./useSelectedSak-Dk6gG5nl.js";import"./useQuery-Bqj7qmxV.js";import"./api-BeD9IY8V.js";import"./sakerUtils-C2lV7Pwk.js";import"./Snarveier-DHcW0ABb.js";import"./LenkePanel-BkqMFZxX.js";import"./Dokument-GqOAFGpk.js";import"./dokumenterUtils-DC4efDfv.js";import"./Tag-D1o9nK91.js";import"./GrupperteDokumenter-ClOG85Ng.js";import"./guid-CsArkN6i.js";import"./Header-B3CNVWy5.js";import"./LayoutWrapper-DLuP80xK.js";import"./StatusTag-DOXBjCMP.js";import"./Stroller-CordUTLm.js";import"./NoeGikkGalt-BVAuspmL.js";import"./MinidialogSkjema-BOL5U4kf.js";import"./skjemanummer-SDzNDxXH.js";import"./BekreftelseSendtSøknad-BF-hH-lC.js";import"./KontonummerInfo-D3HNNyc0.js";import"./HarIkkeSaker-mgJdnm2o.js";import"./SøkelenkerPanel-QpKCWnKd.js";import"./HarSaker-HmnoKgAf.js";import"./SakLink-DsoggUvp.js";import"./ContentSection-DSjtgVmd.js";import"./Svangerskapspenger-3gGJTzqZ.js";import"./DinPlan-DHq_BkHP.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BXG1Yqx_.js";import"./OppgaveLenkepanel-BSTP7Zh5.js";import"./KontaktOss-cGRHQWCK.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
