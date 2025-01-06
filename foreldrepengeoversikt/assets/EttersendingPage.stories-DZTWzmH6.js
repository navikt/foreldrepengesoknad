import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as k}from"./useQuery-D15qCwmj.js";import{h as g,H as d}from"./index-Ey0twAil.js";import{O as s}from"./routes-D6j-qr5i.js";import{Y as c}from"./Ytelse-7td-ciMh.js";import{E as o}from"./ForeldrepengeoversiktRoutes-DkohpOIK.js";import{M as f,R as E,a as S}from"./index-qfvvJAWu.js";import{Q as h}from"./queryClient-SB0VFwmw.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./UttaksplanKalender-3qSvAcQC.js";import"./dates-JCHAmx_r.js";import"./index-BXq8hJNt.js";import"./iframe-DN4h6hV-.js";import"../sb-preview/runtime.js";import"./dateFormValidation-CT3TT2sQ.js";import"./links-Cq4ifjPA.js";import"./VStack-Cmqt2b2v.js";import"./Label-BeJqMiuK.js";import"./useMergeRefs-DE1yqPfQ.js";import"./message-DyNkxP6Y.js";import"./Alert-CHcKNJcm.js";import"./Button-Cz42euBq.js";import"./composeEventHandlers-DeH74NdU.js";import"./Link-gwHVuC8x.js";import"./File-CBdzl0Ak.js";import"./index-BRV0Se7Z.js";import"./UttaksdagenString-DBxOpWvb.js";import"./HGrid-B_1P65QK.js";import"./index-BbmHap-z.js";import"./stønadskontoType-l1GAnwlP.js";import"./barnType-CnRI8jWg.js";import"./_getTag-BJIhF6Yf.js";import"./stringUtils-grKZaQiI.js";import"./index-CCQ3W5xA.js";import"./Responsive-DQW2dfVe.js";import"./Accordion-Cvwr2ZIe.js";import"./ChevronDown-CyMHwesb.js";import"./useBackgroundColor-Cz-TGjGB.js";import"./useSelectedSak-8U_0L6st.js";import"./api-C4E93qPC.js";import"./sakerUtils-D4fsp9GY.js";import"./_baseIteratee-C-3460IB.js";import"./Snarveier-B5j31XfI.js";import"./LenkePanel-DfIQwAuU.js";import"./index-ChWcicze.js";import"./Dokument-CqvrB6WT.js";import"./dokumenterUtils-4s-wLIFx.js";import"./Tag-DNMWbfh9.js";import"./GrupperteDokumenter-B9zZZ_bm.js";import"./guid-CsArkN6i.js";import"./Header-CrlogHy3.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./StatusTag-BZ-AOL7j.js";import"./Stroller-B-9_9B1W.js";import"./NoeGikkGalt-BvA4F91x.js";import"./MinidialogSkjema-Csq6RQq-.js";import"./skjemanummer-CsrY1khI.js";import"./BekreftelseSendtSøknad-M3rKGjtH.js";import"./KontonummerInfo-CmfaLREW.js";import"./HarIkkeSaker-Bg8S_ce2.js";import"./SøkelenkerPanel-CXVGwBW6.js";import"./HarSaker-B6jarFas.js";import"./SakLink-BaJZDVTA.js";import"./ContentSection-B_6Fjlwm.js";import"./DinPlan-CBzulxPw.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-B9uDzp1_.js";import"./OppgaveLenkepanel-CgvMe_Cz.js";import"./KontaktOss-CFX05IuY.js";const R=new h({defaultOptions:{queries:{retry:!1}}}),_t={title:"EttersendingPage",component:o,render:u=>t.jsx(k,{client:R,children:t.jsx(f,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(E,{children:t.jsx(S,{element:t.jsx(o,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[g.post(".//rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:c.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[g.post(".//rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:r.args};var n,p,a;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(a=(p=r.parameters)==null?void 0:p.docs)==null?void 0:a.source}}};var m,i,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const Ct=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,r as SkalIkkeFeileOpplasting,Ct as __namedExportsOrder,_t as default};
