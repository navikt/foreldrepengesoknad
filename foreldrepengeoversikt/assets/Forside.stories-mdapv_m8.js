import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{Q as l}from"./useQuery-D15qCwmj.js";import{h as e,H as o}from"./index-Ey0twAil.js";import{r as f}from"./index-CTjT7uj6.js";import{t as g,m as k}from"./tidslinjeHendelser-yT4IBdHO.js";import{s as i}from"./saker-wGcw9qFq.js";import{s as c}from"./sokerinfo-CqC5rv1g.js";import{O as s}from"./routes-D6j-qr5i.js";import{F as j}from"./ForeldrepengeoversiktRoutes-BLGHQMop.js";import{M as u,R,a as h}from"./index-qfvvJAWu.js";import{Q as v}from"./queryClient-SB0VFwmw.js";import"./decorators-86JrGkCj.js";import"./UttaksdagenString-DBxOpWvb.js";import"./dates-JCHAmx_r.js";import"./index-CCQ3W5xA.js";import"./api-D4tgiajT.js";import"./stringUtils-grKZaQiI.js";import"./Header-CBTM3VoP.js";import"./index-BXq8hJNt.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./Ytelse-7td-ciMh.js";import"./sakerUtils-BUhIC3g1.js";import"./_baseIteratee-C-3460IB.js";import"./_getTag-BJIhF6Yf.js";import"./barnType-CnRI8jWg.js";import"./StatusTag-Dz76bBNV.js";import"./Tag-DNMWbfh9.js";import"./Label-BeJqMiuK.js";import"./HGrid-B_1P65QK.js";import"./VStack-Cmqt2b2v.js";import"./useMergeRefs-DE1yqPfQ.js";import"./Responsive-DQW2dfVe.js";import"./Stroller-B-9_9B1W.js";import"./LenkePanel-DfIQwAuU.js";import"./index-ChWcicze.js";import"./index-BbmHap-z.js";import"./useBackgroundColor-BQRSMoNK.js";import"./Button-Cz42euBq.js";import"./composeEventHandlers-DeH74NdU.js";import"./Alert-CHcKNJcm.js";import"./BekreftelseSendtSøknad-CZB3FExM.js";import"./links-XBeNlE0K.js";import"./bemUtils-DmNyTjfb.js";import"./dokumenterUtils-B_5cFmaa.js";import"./File-CBdzl0Ak.js";import"./Link-gwHVuC8x.js";import"./KontonummerInfo-CB5S2YvT.js";import"./Accordion-Cvwr2ZIe.js";import"./ChevronDown-CyMHwesb.js";import"./message-DyNkxP6Y.js";import"./UttaksplanKalender-ntp1RIis.js";import"./iframe-U5B0vV4m.js";import"../sb-preview/runtime.js";import"./dateFormValidation-D_6x3GZx.js";import"./index-BRV0Se7Z.js";import"./useSelectedSak-BqDU6dPH.js";import"./Snarveier-C0w3Y5C0.js";import"./Dokument-CrVjvdWB.js";import"./GrupperteDokumenter-LNcDOUDO.js";import"./guid-CsArkN6i.js";import"./NoeGikkGalt-swYJaOtQ.js";import"./MinidialogSkjema-rXv_Xg7O.js";import"./skjemanummer-CsrY1khI.js";import"./HarIkkeSaker-BJ9bPOlW.js";import"./ContentSection-B_6Fjlwm.js";import"./HarSaker-J3gSOXBB.js";import"./SakLink-BsA5gPkH.js";import"./DinPlan-MR4-CPJL.js";import"./Oppgaver-D2YrIBdP.js";import"./OppgaveLenkepanel-oycW-SZE.js";import"./KontaktOss-CFX05IuY.js";const x=new v,Tr={title:"Forside",render:a=>{const d=f.useRef(!1);return r.jsx(l,{client:x,children:r.jsx(u,{initialEntries:[`/${s.TIDSLINJEN}/352011079`],children:r.jsx(R,{children:r.jsx(h,{element:r.jsx(j,{...a,isFirstRender:d}),path:`/${s.TIDSLINJEN}/:saksnummer`})})})})}},t={parameters:{msw:{handlers:[e.get("/foreldrepenger/oversikt/rest/innsyn/v2/saker",()=>o.json(i)),e.get("/foreldrepenger/oversikt/rest/innsyn/tidslinje",()=>o.json(g)),e.get("/foreldrepenger/oversikt/rest/historikk/vedlegg",()=>o.json(k))]}},args:{saker:i,søkerinfo:c}};var m,p,n;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(saker)), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/tidslinje\`, () => HttpResponse.json(tidslinjeHendelser)), http.get(\`\${import.meta.env.BASE_URL}/rest/historikk/vedlegg\`, () => HttpResponse.json(manglendeVedlegg))]
    }
  },
  args: {
    // @ts-ignore Er backend og frontend-typar like her? Fiks!
    saker,
    søkerinfo: søkerinfo as SøkerinfoDTO
  }
}`,...(n=(p=t.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};const Ur=["Default"];export{t as Default,Ur as __namedExportsOrder,Tr as default};
