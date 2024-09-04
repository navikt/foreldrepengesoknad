import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{Q as d,a as l}from"./useQuery-CY6KkctN.js";import{h as t,H as r}from"./index-C1uWNzPf.js";import{r as k}from"./index-CTjT7uj6.js";import{a as j}from"./annenPartVedtak-DNA383L1.js";import{d as u}from"./dokumenter-DG3eZWEY.js";import{t as g,m as f}from"./tidslinjeHendelser-BDT2VQVF.js";import{s as c}from"./saker-C0JViQRW.js";import{s as h}from"./sokerinfo-CAQ2VDkX.js";import{O as s}from"./routes-Run26EI7.js";import{S as i}from"./ForeldrepengeoversiktRoutes-kHj01_Fe.js";import{M as R,R as v,a as y}from"./index-BK5YD3Eg.js";import"./decorators-DP8eTBZN.js";import"./Uttaksdagen-Bkz5oXqd.js";import"./dates-DUtd6zgH.js";import"./Snarveier-DjLUgql7.js";import"./index-DnmOyZDY.js";import"./links-BegG-28I.js";import"./useSelectedSak-BTrqldnb.js";import"./api-BlleEFcW.js";import"./sakerUtils-S3oFvgqY.js";import"./_baseIteratee-CPBdszNX.js";import"./_getTag-Bh8w3XMl.js";import"./isFunction-CCU-qS27.js";import"./_overArg-w2jqAdKJ.js";import"./Ytelse-7td-ciMh.js";import"./dateUtils-BIf_z0Mz.js";import"./Label-C_2a564_.js";import"./LinkPanel-Cpparcb1.js";import"./ChevronRight-Cbq2_cV6.js";import"./useId-BFxX0aRd.js";import"./ContentSection-Bg1AkEed.js";import"./Header-B5fKgdgt.js";import"./react-DKFOadDt.js";import"./Breadcrumb-CDz2ffHd.js";import"./index-BD0lb3_z.js";import"./index-CYM-y3Gt.js";import"./Link-D59AnNQS.js";import"./useId-BHtrcvnP.js";import"./StatusTag-MRVr4YUs.js";import"./Tag-SdNSLzrn.js";import"./HGrid-PWs16Klb.js";import"./VStack-CQ8vh05t.js";import"./useMergeRefs-Dg7ETiim.js";import"./Dokument-Ae-C8ili.js";import"./dokumenterUtils-BFmXBiiW.js";import"./GrupperteDokumenter-V2jibHLZ.js";import"./guid-CsArkN6i.js";import"./Accordion-BttdNS4q.js";import"./ChevronDown-CjGECSJR.js";import"./composeEventHandlers-DeH74NdU.js";import"./NoeGikkGalt-BM16JNz3.js";import"./Alert--vXQkOFI.js";import"./XMarkOctagonFill-BgBREcbx.js";import"./useBackgroundColor-D4ksQeHz.js";import"./MinidialogSkjema-CSfEgC9n.js";import"./ByttBrowserModal-D6aSXWe7.js";import"./message-CHiw6Zgx.js";import"./ExclamationmarkTriangle-CrbIB9PM.js";import"./index-BRV0Se7Z.js";import"./colors-BgDiWhW9.js";import"./BekreftelseSendtSøknad-AtI2Ep16.js";import"./KontonummerInfo-CMtP9mta.js";import"./HarIkkeSaker-CLTS4FCV.js";import"./HarSaker-DT3D318d.js";import"./stringUtils-avxv7LF_.js";import"./SakLink-DKC-smGn.js";import"./EttersendDokumenter-Du0AUo4O.js";import"./SeDokumenter-CP-Oo6Z_.js";import"./SeHeleProsessen-CzgZw06h.js";import"./PeriodeListe-DBEYZXH4.js";import"./IconBox-i7pE5Y5l.js";import"./Oppgaver-CeZQ1DIC.js";import"./OppgaveLenkepanel-BT1IMhRK.js";import"./KontaktOss-B1470kL8.js";const x=new d,Bt={title:"Saksoversikt",component:i,render:()=>{const a=k.useRef(!1);return e.jsx(l,{client:x,children:e.jsx(R,{initialEntries:[`/${s.DIN_PLAN}/352011079`],children:e.jsx(v,{children:e.jsx(y,{element:e.jsx(i,{søkerinfo:h,isFirstRender:a}),path:`/${s.DIN_PLAN}/:saksnummer`})})})})}},o={parameters:{msw:{handlers:[t.get("/rest/dokument/alle",()=>r.json(u)),t.get("/rest/innsyn/v2/saker",()=>r.json(c)),t.get("/rest/innsyn/tidslinje",()=>r.json(g)),t.get("/rest/historikk/vedlegg",()=>r.json(f)),t.get("/rest/innsyn/v2/saker/oppdatert",()=>r.json(!0)),t.post("/rest/innsyn/v2/annenPartVedtak",()=>r.json(j))]}}};var p,m,n;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('/rest/dokument/alle', () => HttpResponse.json(dokumenter)), http.get('/rest/innsyn/v2/saker', () => HttpResponse.json(saker)), http.get('/rest/innsyn/tidslinje', () => HttpResponse.json(tidslinjeHendelser)), http.get('/rest/historikk/vedlegg', () => HttpResponse.json(manglendeVedlegg)), http.get('/rest/innsyn/v2/saker/oppdatert', () => HttpResponse.json(true)), http.post('/rest/innsyn/v2/annenPartVedtak', () => HttpResponse.json(annenPartsVedtak))]
    }
  }
}`,...(n=(m=o.parameters)==null?void 0:m.docs)==null?void 0:n.source}}};const Gt=["Default"];export{o as Default,Gt as __namedExportsOrder,Bt as default};
