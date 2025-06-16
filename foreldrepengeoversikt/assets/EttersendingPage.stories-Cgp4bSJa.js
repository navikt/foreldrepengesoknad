import{i as E,j as t}from"./iframe-Ui6H9FKp.js";import{h as d,H as u}from"./index-tvOkpNSO.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BSLCegeq.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-DoEMPvTH.js";import"./useBackgroundColor-BSOmcoGA.js";import"./useSelectedSak-CQ8NNs1J.js";import"./useQuery-OB7UwXoN.js";import"./api-jMzK91i7.js";import"./sakerUtils-CA6qPtUr.js";import"./Snarveier-DGCpRL_c.js";import"./LenkePanel-BPjLXS9y.js";import"./Dokument-CLpdbUNy.js";import"./dokumenterUtils-U1pFFjqr.js";import"./Tag-Cn9x64FN.js";import"./GrupperteDokumenter-CfpA3-fj.js";import"./guid-CsArkN6i.js";import"./Header-D-LwQtGh.js";import"./LayoutWrapper-BO8wZfqx.js";import"./StatusTag-DuC7N8pU.js";import"./Stroller-uhLOXyWY.js";import"./NoeGikkGalt-BFSZTN6j.js";import"./MinidialogSkjema-Bltdg7H-.js";import"./skjemanummer-BH827EY4.js";import"./BekreftelseSendtSøknad-Ux_ZxFDe.js";import"./KontonummerInfo-D9O0XcxD.js";import"./HarIkkeSaker-C4iOTY6o.js";import"./SøkelenkerPanel-XoKzZ70r.js";import"./HarSaker-Dtq5FuYw.js";import"./SakLink-dLS3_OJA.js";import"./ContentSection-CmgUOI4J.js";import"./Svangerskapspenger-DOUVsxp0.js";import"./DinPlan-rq9P4h3H.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-DECwjipV.js";import"./OppgaveLenkepanel-3IKRO3cr.js";import"./KontaktOss-BLAVx9i9.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
