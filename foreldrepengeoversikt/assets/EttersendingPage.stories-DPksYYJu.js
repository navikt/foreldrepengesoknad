import{i as E,j as t}from"./iframe-DX72ucYV.js";import{h as d,H as u}from"./index-D0_SQ3Lt.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-JuxgCicf.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-BurtXCNU.js";import"./useBackgroundColor-B6fnPEsw.js";import"./useSelectedSak-Bhvh4fEB.js";import"./useQuery-DZBVDuY9.js";import"./api-Blv5udmg.js";import"./sakerUtils-DBmAdM4M.js";import"./Snarveier-nZOJSLJ0.js";import"./LenkePanel-Bvb0Fimp.js";import"./Dokument-DUE5q7uX.js";import"./dokumenterUtils-N-8zeTjw.js";import"./Tag-Dgr1Pq3G.js";import"./GrupperteDokumenter-DAQ6obuQ.js";import"./guid-CsArkN6i.js";import"./Header-CmIuIC1U.js";import"./LayoutWrapper-EKpJOTkL.js";import"./StatusTag-DmT5zz2Q.js";import"./Stroller-ZFpevoy7.js";import"./NoeGikkGalt-BTTo_6nb.js";import"./MinidialogSkjema-CtZKE7M8.js";import"./skjemanummer-C98ghbKB.js";import"./BekreftelseSendtSøknad-0be8E8iI.js";import"./KontonummerInfo-BajOnb68.js";import"./HarIkkeSaker-r1hly9v5.js";import"./SøkelenkerPanel-C3LJpfke.js";import"./HarSaker-M99XVkcr.js";import"./SakLink-DtuvlwNH.js";import"./ContentSection-fWaf3xX6.js";import"./Svangerskapspenger-BR9LjKhm.js";import"./DinPlan-CltO32-x.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BUCrHvSC.js";import"./OppgaveLenkepanel-BJm3DzBs.js";import"./KontaktOss-DHp6wvNI.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
