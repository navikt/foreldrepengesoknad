import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{Q as l,a as f}from"./useQuery-D_fvW0PL.js";import{h as o,H as e}from"./index-CQPv6-if.js";import{r as g}from"./index-CTjT7uj6.js";import{t as k,m as u}from"./tidslinjeHendelser-BDT2VQVF.js";import{s as i}from"./saker-C0JViQRW.js";import{s as c}from"./sokerinfo-CAQ2VDkX.js";import{O as s}from"./routes-Run26EI7.js";import{F as m}from"./ForeldrepengeoversiktRoutes-JXb3XSY4.js";import{M as j,R as h,a as R}from"./index-DOF3ycNb.js";import"./decorators-Bo_HQzC9.js";import"./Snarveier-cwIQrPeQ.js";import"./index-ghK6WsM8.js";import"./links-BegG-28I.js";import"./dates-DUtd6zgH.js";import"./LenkePanel-BLvnv6b4.js";import"./index-CCQ3W5xA.js";import"./index-Cn00N9t0.js";import"./index-vZN_Bsf0.js";import"./VStack-CislUPit.js";import"./Label-BeJqMiuK.js";import"./useMergeRefs-Dg7ETiim.js";import"./useId-BFxX0aRd.js";import"./useSelectedSak-k0E3egpA.js";import"./api-DZHAPXBN.js";import"./sakerUtils-eThI45Eb.js";import"./_baseIteratee-CNgr-98l.js";import"./_getTag-COHPfPRs.js";import"./Uttaksdagen-ClUiN95P.js";import"./Ytelse-7td-ciMh.js";import"./dateUtils-SLNltPAj.js";import"./HGrid-9RT2OXkm.js";import"./ContentSection-B_6Fjlwm.js";import"./Header-CXVpjRDu.js";import"./react-DKFOadDt.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./StatusTag-Crc04EW3.js";import"./Tag-DNMWbfh9.js";import"./Responsive-Cqh12JNO.js";import"./Stroller-JY-nL-ik.js";import"./Dokument-iUaOdCPU.js";import"./dokumenterUtils-Nut45n91.js";import"./useId-BHtrcvnP.js";import"./Link-gwHVuC8x.js";import"./GrupperteDokumenter-Bbx-wsGS.js";import"./guid-CsArkN6i.js";import"./Accordion-JjU6DK1h.js";import"./ChevronDown-CjGECSJR.js";import"./composeEventHandlers-DeH74NdU.js";import"./NoeGikkGalt-DxR4p5mt.js";import"./Alert-CVpGPMbJ.js";import"./XMarkOctagonFill-BgBREcbx.js";import"./useBackgroundColor-D4ksQeHz.js";import"./MinidialogSkjema-DqBt9KIN.js";import"./VeiviserPage-KQokrPmW.js";import"./bemUtils-DmNyTjfb.js";import"./message-CSZdADn6.js";import"./ExclamationmarkTriangle-CrbIB9PM.js";import"./index-BRV0Se7Z.js";import"./colors-BgDiWhW9.js";import"./BekreftelseSendtSøknad-BymbIp9u.js";import"./KontonummerInfo-DiJWAh76.js";import"./HarIkkeSaker-B9PFc_3k.js";import"./HarSaker-FzA-O2P1.js";import"./stringUtils-avxv7LF_.js";import"./SakLink-DxzmpG3x.js";import"./PeriodeListe-DNRHsbG1.js";import"./IconBox-DuxDMq02.js";import"./Oppgaver-CJkVw9bC.js";import"./OppgaveLenkepanel-DY27KlYR.js";import"./KontaktOss-pM9mAiCN.js";const x=new l,Mr={title:"Forside",component:m,render:d=>r.jsx(f,{client:x,children:r.jsx(j,{initialEntries:[`/${s.TIDSLINJEN}/352011079`],children:r.jsx(h,{children:r.jsx(R,{element:r.jsx(m,{...d}),path:`/${s.TIDSLINJEN}/:saksnummer`})})})})},t={parameters:{msw:{handlers:[o.get("/rest/innsyn/v2/saker",()=>e.json(i)),o.get("/rest/innsyn/tidslinje",()=>e.json(k)),o.get("/rest/historikk/vedlegg",()=>e.json(u))]}},args:{saker:i,isFirstRender:g.useRef(!1),søkerinfo:c}};var p,n,a;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('/rest/innsyn/v2/saker', () => HttpResponse.json(saker)), http.get('/rest/innsyn/tidslinje', () => HttpResponse.json(tidslinjeHendelser)), http.get('/rest/historikk/vedlegg', () => HttpResponse.json(manglendeVedlegg))]
    }
  },
  args: {
    // @ts-ignore Er backend og frontend-typar like her? Fiks!
    saker,
    isFirstRender: useRef(false),
    søkerinfo: søkerinfo as SøkerinfoDTO
  }
}`,...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const Vr=["Default"];export{t as Default,Vr as __namedExportsOrder,Mr as default};
