import{i as E,j as t}from"./iframe-BWs6YiSD.js";import{h as d,H as u}from"./index-KPA9rKLR.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-xiNqowC3.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-CuQejqUr.js";import"./useBackgroundColor-Cdz_QgVI.js";import"./useSelectedSak-CKXYGI5S.js";import"./useQuery-C7AIrGlu.js";import"./api-DtDQGiqu.js";import"./sakerUtils-CH7c72yn.js";import"./Snarveier-Do_JLBL6.js";import"./LenkePanel-mBkaE_Sx.js";import"./Dokument-o45URCmp.js";import"./dokumenterUtils-DrWjTrzt.js";import"./Tag-Ba_6zhSf.js";import"./GrupperteDokumenter-DsyRW8Tp.js";import"./guid-CsArkN6i.js";import"./Header-Boz9vISm.js";import"./LayoutWrapper-B-FaSvvX.js";import"./StatusTag-DIu5IVN9.js";import"./Stroller-DKofNBT2.js";import"./NoeGikkGalt-B1Y0jFLu.js";import"./MinidialogSkjema-Bn4RWP45.js";import"./skjemanummer-Bkp7YBg1.js";import"./BekreftelseSendtSøknad-DfdraupN.js";import"./KontonummerInfo-B-J8mOLx.js";import"./HarIkkeSaker-D5vI1z11.js";import"./SøkelenkerPanel-BWiFSppm.js";import"./HarSaker-CRZJ-phX.js";import"./SakLink-CF5KBtqV.js";import"./ContentSection-JQ-7vG8-.js";import"./Svangerskapspenger-c9tPPdEy.js";import"./DinPlan-DmNokECe.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-zVzDlN-2.js";import"./OppgaveLenkepanel-PEK1ebeG.js";import"./KontaktOss-CBNLmZ8m.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
