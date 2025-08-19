import{i as g,j as t}from"./iframe-CE7hT7if.js";import{h as o,H as p}from"./index-CXM0r17l.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-_IUUqGuF.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-CT9tgwxt.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-D3CYiOOU.js";import"./useSelectedSak-D-It1NjT.js";import"./useQuery-DAe-6ieI.js";import"./api-CW_KiZht.js";import"./sakerUtils-_pH2ZGJn.js";import"./Snarveier-BZetDHNx.js";import"./LenkePanel-DEXz5_mQ.js";import"./Dokument-CfGMtNST.js";import"./dokumenterUtils-Cmfr5izE.js";import"./Tag-jguWPH83.js";import"./GrupperteDokumenter-oXg78N_q.js";import"./guid-CsArkN6i.js";import"./Header-C_3LyNnX.js";import"./LayoutWrapper-BqvOi-C9.js";import"./StatusTag-DJoqO_OW.js";import"./Stroller-DoQJgpdj.js";import"./NoeGikkGalt-BaIP4C6L.js";import"./MinidialogSkjema-DAzVCPye.js";import"./skjemanummer-CmR8Q-T_.js";import"./BekreftelseSendtSøknad-DSHSDVfP.js";import"./KontonummerInfo-Ch0tCoW7.js";import"./HarIkkeSaker-B4-yFX26.js";import"./SøkelenkerPanel-BCFKKZg9.js";import"./HarSaker-BUUPx--K.js";import"./SakLink-DQvkwWdt.js";import"./ContentSection-C_YnPEM2.js";import"./Svangerskapspenger-C2weXGTi.js";import"./DinPlan-DIeJ2TjU.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CgKvn-H-.js";import"./OppgaveLenkepanel-Bfw2-Tdy.js";import"./KontaktOss-C6SkLBlR.js";const Z={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const ee=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,ee as __namedExportsOrder,Z as default};
