import{h as t,H as o}from"./index-C1uWNzPf.js";import{a as j}from"./annenPartVedtak-DNA383L1.js";import{d as x}from"./dokumenter-DG3eZWEY.js";import{m as y,t as v}from"./tidslinjeHendelser-BDT2VQVF.js";import{s as b}from"./saker-C0JViQRW.js";import{s as E}from"./sokerinfo-CAQ2VDkX.js";import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{u as n,Q as _,a as S}from"./useQuery-CY6KkctN.js";import{d as w}from"./dates-DUtd6zgH.js";import{n as C,u as B}from"./app-TW-ZAU-Y.js";import{h as I,e as M}from"./Uttaksdagen-Bkz5oXqd.js";import{r as O}from"./index-CTjT7uj6.js";import{B as P}from"./index-BD0lb3_z.js";import{e as Q,h as A,E as D,m as F,s as L}from"./api-BmJ5658F.js";import{S as N}from"./MinidialogSkjema-DwKA6Y5S.js";import{a as R}from"./useBackgroundColor-D4ksQeHz.js";import{b as T}from"./ForeldrepengeoversiktRoutes-D4_hoZk_.js";import{m as G}from"./sakerUtils-S3oFvgqY.js";import{L as H}from"./Alert-VUqTQ4T6.js";import{w as V,c as U,I as $,B as X}from"./VeiviserPage-C4GqGTMy.js";import"./decorators-DP8eTBZN.js";import"./index-CYM-y3Gt.js";import"./index-BK5YD3Eg.js";import"./index-DnmOyZDY.js";import"./Ytelse-7td-ciMh.js";import"./Label-DI1hapHN.js";import"./composeEventHandlers-DeH74NdU.js";import"./ChevronDown-CjGECSJR.js";import"./useId-BFxX0aRd.js";import"./VStack-DAdWZtn3.js";import"./useMergeRefs-Dg7ETiim.js";import"./message-CHiw6Zgx.js";import"./react-DKFOadDt.js";import"./Snarveier-B0i30urM.js";import"./links-BegG-28I.js";import"./useSelectedSak-DMNwml2H.js";import"./routes-Run26EI7.js";import"./LinkPanel-BH3zccDo.js";import"./ChevronRight-Cbq2_cV6.js";import"./ContentSection-DEhOJ2zx.js";import"./Header-V_RN9OGW.js";import"./Breadcrumb-ClKoZ4RL.js";import"./Link-DOX29Uo4.js";import"./useId-BHtrcvnP.js";import"./StatusTag-kq4Xscpa.js";import"./Tag-DySx6g-E.js";import"./HGrid-c4MUBGlc.js";import"./Dokument-BSb8lqHF.js";import"./dokumenterUtils-DnduGNvw.js";import"./GrupperteDokumenter-Dhg-9S-W.js";import"./guid-CsArkN6i.js";import"./Accordion-Crybvfb9.js";import"./NoeGikkGalt-DyvSN5dH.js";import"./BekreftelseSendtSøknad-8DuQDwxk.js";import"./KontonummerInfo-DU_1Eksx.js";import"./HarIkkeSaker-C1D14_ST.js";import"./HarSaker-BrNxKoxu.js";import"./stringUtils-avxv7LF_.js";import"./SakLink-a1pF-klk.js";import"./EttersendDokumenter-Sa1taJTn.js";import"./SeDokumenter-DRrVuUAY.js";import"./SeHeleProsessen-B3X1ANaL.js";import"./PeriodeListe-B9jb4F4i.js";import"./_getTag-Bh8w3XMl.js";import"./isFunction-CCU-qS27.js";import"./dateUtils-BIf_z0Mz.js";import"./colors-BgDiWhW9.js";import"./IconBox-i7pE5Y5l.js";import"./XMarkOctagonFill-BgBREcbx.js";import"./ExclamationmarkTriangle-CrbIB9PM.js";import"./Oppgaver-WdKsW25C.js";import"./OppgaveLenkepanel-zV8zh3YZ.js";import"./KontaktOss-COX08eNX.js";import"./_baseIteratee-CPBdszNX.js";import"./_overArg-w2jqAdKJ.js";import"./index-BRV0Se7Z.js";const q=[{saksnr:"352009416",opprettet:"2023-02-09",dialogId:"1111111112"}];var W=function(){return null};const Y="From {fom} until {tom}",z={tidsperiode:Y,"tidsperiode.kort":"{fom} - {tom}"},J="Fra {fom} til {tom}",K={tidsperiode:J,"tidsperiode.kort":"{fom} - {tom}"},Z="Frå {fom} til {tom}",rr={tidsperiode:Z,"tidsperiode.kort":"{fom} - {tom}"},er={nb:K,nn:rr,en:z},u=()=>{const i=M("app"),e=R();n(F());const m=n({...Q(),refetchInterval:h=>h.state.data?!1:15e3}),s=n(L()),p=n({...A(),enabled:m.data,select:G});if(s.isError||p.isError)throw new Error("Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.");if(!s.data||p.isPending)return r.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:r.jsx(H,{type:"XXL"})});const k={engangsstønad:[],foreldrepenger:[],svangerskapspenger:[]};return r.jsx("div",{className:I(i.block,e==="white"?i.element("white"):i.element("blue")),children:r.jsxs(P,{basename:D.PUBLIC_PATH,children:[r.jsx(N,{}),r.jsx(T,{søkerinfo:s.data,saker:p.data??k})]})})};u.__docgenInfo={description:"",methods:[],displayName:"Foreldrepengeoversikt"};class g extends O.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}componentDidCatch(e,m){e&&e.message!=="window.hasFocus is not a function"&&(this.setState(s=>({...s,hasError:!0,error:e})),V(s=>{s.setExtras(m),U(e)}))}render(){var e;return this.state.hasError?r.jsx("div",{style:{padding:"2rem",maxWidth:"704px",margin:"0 auto"},children:(e=this.state.error)==null?void 0:e.message}):this.props.children}}g.__docgenInfo={description:"",methods:[],displayName:"ErrorBoundary"};const tr=new _,or={...C,...B.nb,...er.nb},sr={nb:or};w.locale("nb");const f=()=>r.jsx(g,{children:r.jsxs(S,{client:tr,children:[r.jsx(W,{}),r.jsxs($,{locale:"nb",messagesGroupedByLocale:sr,children:[r.jsx(X,{}),r.jsx(u,{})]})]})});f.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const Ce={title:"AppContainer",component:f,parameters:{msw:{handlers:[t.get("/rest/innsyn/v2/saker/oppdatert",()=>o.json(!0)),t.get("/rest/minidialog",()=>o.json(q)),t.get("/rest/sokerinfo",()=>o.json(E)),t.get("/rest/innsyn/v2/saker",()=>o.json(b)),t.get("/rest/historikk/vedlegg",()=>o.json(y)),t.post("/rest/innsyn/v2/annenPartVedtak",()=>o.json(j)),t.get("/rest/innsyn/tidslinje",()=>o.json(v)),t.get("/rest/dokument/alle",()=>o.json(x)),t.post("/rest/storage/foreldrepenger/vedlegg",()=>o.json({}))]}}},a={};var d,l,c;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(c=(l=a.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const Be=["Default"];export{a as Default,Be as __namedExportsOrder,Ce as default};
