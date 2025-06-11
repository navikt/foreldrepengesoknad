import{i as E,j as t}from"./iframe-BJsoEAxD.js";import{h as d,H as u}from"./index-BHj-gL7w.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-D_2QD5k9.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-BzZlyfVG.js";import"./useBackgroundColor-DWQEofiW.js";import"./useSelectedSak-69CnXisn.js";import"./useQuery-CK4ffj2H.js";import"./api-DtyvSpDy.js";import"./sakerUtils-C3z8xbki.js";import"./Snarveier-B1k3lcal.js";import"./LenkePanel-CCDNYnB0.js";import"./Dokument-Dcqcudzl.js";import"./dokumenterUtils-CZsFx7Dy.js";import"./Tag-BKIg1B-o.js";import"./GrupperteDokumenter-1pUfTxpJ.js";import"./guid-CsArkN6i.js";import"./Header-Dvty74p0.js";import"./LayoutWrapper-CTsCCrwp.js";import"./StatusTag-DB0eFeoj.js";import"./Stroller-DQ2W0QXm.js";import"./NoeGikkGalt-C4zBlwi3.js";import"./MinidialogSkjema-wq8vwgRS.js";import"./skjemanummer-BJzCGP8B.js";import"./BekreftelseSendtSøknad-CFHnPPwM.js";import"./KontonummerInfo-C5KSiyhg.js";import"./HarIkkeSaker-Jei8Vu37.js";import"./SøkelenkerPanel-BRz_BnlM.js";import"./HarSaker-B99isvmt.js";import"./SakLink-Cj80PN0k.js";import"./ContentSection-btS7lCTR.js";import"./Svangerskapspenger-D5zODdKg.js";import"./DinPlan-D2Lrk6If.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-ClZzStgY.js";import"./OppgaveLenkepanel-iDrMfmyh.js";import"./KontaktOss-BMmUGRiV.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
