import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{Q as k}from"./useQuery-D15qCwmj.js";import{h as g,H as d}from"./index-Ey0twAil.js";import{Y as f}from"./Ytelse-7td-ciMh.js";import{O as s}from"./routes-D6j-qr5i.js";import{E as o}from"./ForeldrepengeoversiktRoutes-BLGHQMop.js";import{M as c,R as E,a as S}from"./index-qfvvJAWu.js";import{Q as h}from"./queryClient-SB0VFwmw.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./UttaksdagenString-DBxOpWvb.js";import"./dates-JCHAmx_r.js";import"./index-CCQ3W5xA.js";import"./api-D4tgiajT.js";import"./stringUtils-grKZaQiI.js";import"./Header-CBTM3VoP.js";import"./index-BXq8hJNt.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./sakerUtils-BUhIC3g1.js";import"./_baseIteratee-C-3460IB.js";import"./_getTag-BJIhF6Yf.js";import"./barnType-CnRI8jWg.js";import"./StatusTag-Dz76bBNV.js";import"./Tag-DNMWbfh9.js";import"./Label-BeJqMiuK.js";import"./HGrid-B_1P65QK.js";import"./VStack-Cmqt2b2v.js";import"./useMergeRefs-DE1yqPfQ.js";import"./Responsive-DQW2dfVe.js";import"./Stroller-B-9_9B1W.js";import"./LenkePanel-DfIQwAuU.js";import"./index-ChWcicze.js";import"./index-BbmHap-z.js";import"./useBackgroundColor-BQRSMoNK.js";import"./Button-Cz42euBq.js";import"./composeEventHandlers-DeH74NdU.js";import"./Alert-CHcKNJcm.js";import"./BekreftelseSendtSøknad-CZB3FExM.js";import"./links-XBeNlE0K.js";import"./bemUtils-DmNyTjfb.js";import"./dokumenterUtils-B_5cFmaa.js";import"./File-CBdzl0Ak.js";import"./Link-gwHVuC8x.js";import"./KontonummerInfo-CB5S2YvT.js";import"./Accordion-Cvwr2ZIe.js";import"./ChevronDown-CyMHwesb.js";import"./message-DyNkxP6Y.js";import"./UttaksplanKalender-ntp1RIis.js";import"./iframe-U5B0vV4m.js";import"../sb-preview/runtime.js";import"./dateFormValidation-D_6x3GZx.js";import"./index-BRV0Se7Z.js";import"./useSelectedSak-BqDU6dPH.js";import"./Snarveier-C0w3Y5C0.js";import"./Dokument-CrVjvdWB.js";import"./GrupperteDokumenter-LNcDOUDO.js";import"./guid-CsArkN6i.js";import"./NoeGikkGalt-swYJaOtQ.js";import"./MinidialogSkjema-rXv_Xg7O.js";import"./skjemanummer-CsrY1khI.js";import"./HarIkkeSaker-BJ9bPOlW.js";import"./ContentSection-B_6Fjlwm.js";import"./HarSaker-J3gSOXBB.js";import"./SakLink-BsA5gPkH.js";import"./DinPlan-MR4-CPJL.js";import"./Oppgaver-D2YrIBdP.js";import"./OppgaveLenkepanel-oycW-SZE.js";import"./KontaktOss-CFX05IuY.js";const v=new h({defaultOptions:{queries:{retry:!1}}}),Hr={title:"EttersendingPage",component:o,render:u=>r.jsx(k,{client:v,children:r.jsx(c,{initialEntries:[`/${s.ETTERSEND}/1`],children:r.jsx(E,{children:r.jsx(S,{element:r.jsx(o,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},e={parameters:{msw:{handlers:[g.post("/foreldrepenger/oversikt/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:f.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},t={parameters:{msw:{handlers:[g.post("/foreldrepenger/oversikt/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:e.args};var n,p,a;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
        ytelse: Ytelse.ENGANGSSTØNAD,
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
}`,...(a=(p=e.parameters)==null?void 0:p.docs)==null?void 0:a.source}}};var i,m,l;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(l=(m=t.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const Qr=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{t as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,Qr as __namedExportsOrder,Hr as default};
