import{h as e,H as o}from"./index-CQPv6-if.js";import{a as h}from"./annenPartVedtak-DNA383L1.js";import{d as j}from"./dokumenter-DG3eZWEY.js";import{m as x,t as v}from"./tidslinjeHendelser-BDT2VQVF.js";import{s as y}from"./saker-C0JViQRW.js";import{s as E}from"./sokerinfo-CAQ2VDkX.js";import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{u as n,Q as b,a as _}from"./useQuery-D_fvW0PL.js";import{d as w}from"./dates-DUtd6zgH.js";import{n as S,u as C}from"./nb_NO-CihO99rF.js";import"./Uttaksdagen-ClUiN95P.js";import{r as B}from"./index-CTjT7uj6.js";import"./index-CCQ3W5xA.js";import{B as I}from"./index-D9Go8z3K.js";import{e as M,h as O,E as P,m as Q,s as D}from"./api-BmJ5658F.js";import{S as F}from"./MinidialogSkjema-DQuWeGV7.js";import{a as L}from"./useBackgroundColor-D4ksQeHz.js";import{b as N}from"./ForeldrepengeoversiktRoutes-abYMF82B.js";import{m as A}from"./sakerUtils-eThI45Eb.js";import{L as R}from"./Alert-CVpGPMbJ.js";import{w as T,c as G,I as H,B as V}from"./VeiviserPage-KQokrPmW.js";import"./decorators-Bo_HQzC9.js";import"./index-vZN_Bsf0.js";import"./index-ghK6WsM8.js";import"./Ytelse-7td-ciMh.js";import"./Label-BeJqMiuK.js";import"./composeEventHandlers-DeH74NdU.js";import"./ChevronDown-CjGECSJR.js";import"./useId-BFxX0aRd.js";import"./VStack-CislUPit.js";import"./useMergeRefs-Dg7ETiim.js";import"./message-CSZdADn6.js";import"./react-DKFOadDt.js";import"./Snarveier-IHanyTw_.js";import"./links-BegG-28I.js";import"./LenkePanel-BGlWXzD2.js";import"./useSelectedSak-DxKH6Ae0.js";import"./routes-Run26EI7.js";import"./HGrid-9RT2OXkm.js";import"./ContentSection-B_6Fjlwm.js";import"./Header-C7J_os3R.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./Breadcrumb-U_wLn93R.js";import"./bemUtils-DmNyTjfb.js";import"./Link-gwHVuC8x.js";import"./useId-BHtrcvnP.js";import"./ChevronRight-Cbq2_cV6.js";import"./StatusTag-Crc04EW3.js";import"./Tag-DNMWbfh9.js";import"./Responsive-Cqh12JNO.js";import"./Dokument-HtKQu-g_.js";import"./dokumenterUtils-DnduGNvw.js";import"./GrupperteDokumenter-CAsCCAhQ.js";import"./guid-CsArkN6i.js";import"./Accordion-JjU6DK1h.js";import"./NoeGikkGalt-DxR4p5mt.js";import"./BekreftelseSendtSøknad-DAtjmmNu.js";import"./KontonummerInfo-DiJWAh76.js";import"./HarIkkeSaker-B9PFc_3k.js";import"./HarSaker-BW5LLhKv.js";import"./stringUtils-avxv7LF_.js";import"./SakLink-Bni9f5in.js";import"./PeriodeListe-DNRHsbG1.js";import"./_getTag-COHPfPRs.js";import"./dateUtils-SLNltPAj.js";import"./colors-BgDiWhW9.js";import"./IconBox-DuxDMq02.js";import"./XMarkOctagonFill-BgBREcbx.js";import"./ExclamationmarkTriangle-CrbIB9PM.js";import"./Oppgaver-Cf1nOLcl.js";import"./OppgaveLenkepanel-DfYIuUj2.js";import"./KontaktOss-pM9mAiCN.js";import"./_baseIteratee-CNgr-98l.js";import"./index-BRV0Se7Z.js";const $=[{saksnr:"352009416",opprettet:"2023-02-09",dialogId:"1111111112"}];var U=function(){return null};const X="From {fom} until {tom}",q={tidsperiode:X,"tidsperiode.kort":"{fom} - {tom}"},Y="Fra {fom} til {tom}",z={tidsperiode:Y,"tidsperiode.kort":"{fom} - {tom}"},J="Frå {fom} til {tom}",K={tidsperiode:J,"tidsperiode.kort":"{fom} - {tom}"},W={nb:z,nn:K,en:q},c=()=>{const m=L();n(Q());const t=n({...M(),refetchInterval:k=>k.state.data?!1:15e3}),i=n(D()),s=n({...O(),enabled:t.data,select:A});if(i.isError||s.isError)throw new Error("Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.");if(!i.data||s.isPending)return r.jsx("div",{className:"py-48 px-0 text-center",children:r.jsx(R,{type:"XXL"})});const g={engangsstønad:[],foreldrepenger:[],svangerskapspenger:[]};return r.jsx("div",{className:m==="white"?"bg-white":"bg-deepblue-50",children:r.jsxs(I,{basename:P.PUBLIC_PATH,children:[r.jsx(F,{}),r.jsx(N,{søkerinfo:i.data,saker:s.data??g})]})})};c.__docgenInfo={description:"",methods:[],displayName:"Foreldrepengeoversikt"};class u extends B.Component{constructor(t){super(t),this.state={hasError:!1,error:null}}componentDidCatch(t,i){t&&t.message!=="window.hasFocus is not a function"&&(this.setState(s=>({...s,hasError:!0,error:t})),T(s=>{s.setExtras(i),G(t)}))}render(){var t;return this.state.hasError?r.jsx("div",{className:"p-8 w-[704px] m-0 ml-auto mr-auto",children:(t=this.state.error)==null?void 0:t.message}):this.props.children}}u.__docgenInfo={description:"",methods:[],displayName:"ErrorBoundary"};const Z=new b,rr={...S,...C.nb,...W.nb},tr={nb:rr};w.locale("nb");const f=()=>r.jsx(u,{children:r.jsxs(_,{client:Z,children:[r.jsx(U,{}),r.jsxs(H,{locale:"nb",messagesGroupedByLocale:tr,children:[r.jsx(V,{}),r.jsx(c,{})]})]})});f.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const Et={title:"AppContainer",component:f,parameters:{msw:{handlers:[e.get("/rest/innsyn/v2/saker/oppdatert",()=>o.json(!0)),e.get("/rest/minidialog",()=>o.json($)),e.get("/rest/sokerinfo",()=>o.json(E)),e.get("/rest/innsyn/v2/saker",()=>o.json(y)),e.get("/rest/historikk/vedlegg",()=>o.json(x)),e.post("/rest/innsyn/v2/annenPartVedtak",()=>o.json(h)),e.get("/rest/innsyn/tidslinje",()=>o.json(v)),e.get("/rest/dokument/alle",()=>o.json(j)),e.post("/rest/storage/foreldrepenger/vedlegg",()=>o.json({}))]}}},a={};var p,d,l;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(l=(d=a.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const bt=["Default"];export{a as Default,bt as __namedExportsOrder,Et as default};
