import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{h as e,H as o}from"./index-Ey0twAil.js";import{a as h}from"./annenPartVedtak-CIFtkZAr.js";import{d as j}from"./dokumenter-DG3eZWEY.js";import{m as v,t as x}from"./tidslinjeHendelser-yT4IBdHO.js";import{s as y}from"./saker-CDVaZ90_.js";import{s as b}from"./sokerinfo-CAQ2VDkX.js";import{Q as E}from"./queryClient-SB0VFwmw.js";import{u as a,Q as S}from"./useQuery-D15qCwmj.js";import{d as _}from"./dates-JCHAmx_r.js";import{n as w,u as C,a as M,b as O,c as I}from"./nb_NO-CUaz4vns.js";import{e as Q,h as B,m as D,s as N}from"./api-Cr7z64jr.js";import{S as P}from"./MinidialogSkjema-DQyK4-yq.js";import{a as L}from"./useBackgroundColor-Cz-TGjGB.js";import{a as R}from"./ForeldrepengeoversiktRoutes-DniYLCEw.js";import{m as A}from"./sakerUtils-BUhIC3g1.js";import{L as F}from"./Button-Cz42euBq.js";import{r as G}from"./index-CTjT7uj6.js";import{w as T,c as V,I as H,B as q}from"./VeiviserPage-WWaDT2q1.js";import{M as U}from"./index-qfvvJAWu.js";import"./decorators-86JrGkCj.js";import"./UttaksdagenString-DBxOpWvb.js";import"./index-CCQ3W5xA.js";import"./UttaksplanKalender-CHYZ_Dh2.js";import"./index-BXq8hJNt.js";import"./iframe-DezlgRuI.js";import"../sb-preview/runtime.js";import"./barnType-CnRI8jWg.js";import"./_getTag-BJIhF6Yf.js";import"./stringUtils-BhrNUKGk.js";import"./bemUtils-DmNyTjfb.js";import"./VStack-Cmqt2b2v.js";import"./Label-BeJqMiuK.js";import"./useMergeRefs-DE1yqPfQ.js";import"./message-DyNkxP6Y.js";import"./Alert-CHcKNJcm.js";import"./Responsive-DQW2dfVe.js";import"./Accordion-Cvwr2ZIe.js";import"./ChevronDown-CyMHwesb.js";import"./composeEventHandlers-DeH74NdU.js";import"./index-ChWcicze.js";import"./index-BbmHap-z.js";import"./skjemanummer-CsrY1khI.js";import"./Ytelse-7td-ciMh.js";import"./Header-BScsmPsj.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./StatusTag-Dz76bBNV.js";import"./Tag-DNMWbfh9.js";import"./HGrid-B_1P65QK.js";import"./Stroller-B-9_9B1W.js";import"./LenkePanel-DfIQwAuU.js";import"./routes-D6j-qr5i.js";import"./BekreftelseSendtSøknad-bGpEqGAO.js";import"./links-XBeNlE0K.js";import"./dokumenterUtils-C7_0haOy.js";import"./File-CBdzl0Ak.js";import"./Link-gwHVuC8x.js";import"./KontonummerInfo-CB5S2YvT.js";import"./useSelectedSak-BQIkEs3k.js";import"./Snarveier-rzE7JfwR.js";import"./Dokument-BB_EWHwU.js";import"./GrupperteDokumenter-dEI0kWs9.js";import"./guid-CsArkN6i.js";import"./NoeGikkGalt-swYJaOtQ.js";import"./HarIkkeSaker-BTSb5_55.js";import"./ContentSection-B_6Fjlwm.js";import"./HarSaker-BUF0fVCN.js";import"./SakLink-BsA5gPkH.js";import"./DinPlan-BIzN156d.js";import"./Oppgaver-BGFFg_zq.js";import"./OppgaveLenkepanel-oycW-SZE.js";import"./KontaktOss-CFX05IuY.js";import"./_baseIteratee-C-3460IB.js";import"./index-BRV0Se7Z.js";const X=[{saksnr:"352009416",opprettet:"2023-02-09",dialogId:"1111111112"}];var K=function(){return null};const u=()=>{const m=L();a(D());const t=a({...Q(),refetchInterval:k=>k.state.data?!1:15e3}),i=a(N()),s=a({...B(),enabled:t.data,select:A});if(i.isError||s.isError)throw new Error("Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.");if(!i.data||s.isPending)return r.jsx("div",{className:"py-48 px-0 text-center",children:r.jsx(F,{type:"XXL"})});const f={engangsstønad:[],foreldrepenger:[],svangerskapspenger:[]};return r.jsxs("div",{className:m==="white"?"bg-white":"bg-deepblue-50",children:[r.jsx(P,{}),r.jsx(R,{søkerinfo:i.data,saker:s.data??f})]})};u.__docgenInfo={description:"",methods:[],displayName:"Foreldrepengeoversikt"};class g extends G.Component{constructor(t){super(t),this.state={hasError:!1,error:null}}componentDidCatch(t,i){t&&t.message!=="window.hasFocus is not a function"&&(this.setState(s=>({...s,hasError:!0,error:t})),T(s=>{s.setExtras(i),V(t)}))}render(){var t;return this.state.hasError?r.jsx("div",{className:"p-8 w-[704px] m-0 ml-auto mr-auto",children:(t=this.state.error)==null?void 0:t.message}):this.props.children}}g.__docgenInfo={description:"",methods:[],displayName:"ErrorBoundary"};const Y=new E({defaultOptions:{queries:{retry:3}}}),z={...w,...C.nb,...M.nb,...O.nb,...I.nb},J={nb:z};_.locale("nb");const p=()=>r.jsx(g,{children:r.jsxs(S,{client:Y,children:[r.jsx(K,{}),r.jsxs(H,{locale:"nb",messagesGroupedByLocale:J,children:[r.jsx(q,{}),r.jsx(u,{})]})]})});p.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const ht={title:"AppContainer",component:p,render:()=>r.jsx(U,{children:r.jsx(p,{})}),parameters:{msw:{handlers:[e.get("https://oversikt/rest/innsyn/v2/saker/oppdatert",()=>o.json(!0)),e.get("https://oversikt/rest/minidialog",()=>o.json(X)),e.get("https://oversikt/rest/sokerinfo",()=>o.json(b)),e.get("https://oversikt/rest/innsyn/v2/saker",()=>o.json(y)),e.get("https://oversikt/rest/historikk/vedlegg",()=>o.json(v)),e.post("https://oversikt/rest/innsyn/v2/annenPartVedtak",()=>o.json(h)),e.get("https://oversikt/rest/innsyn/tidslinje",()=>o.json(x)),e.get("https://oversikt/rest/dokument/alle",()=>o.json(j)),e.post("https://oversikt/rest/storage/foreldrepenger/vedlegg",()=>o.json({}))]}}},n={};var d,l,c;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(c=(l=n.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const jt=["Default"];export{n as Default,jt as __namedExportsOrder,ht as default};
