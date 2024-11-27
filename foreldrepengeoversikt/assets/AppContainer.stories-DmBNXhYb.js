import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{h as t,H as o}from"./index-Ey0twAil.js";import{a as h}from"./annenPartVedtak-5pIDAVQj.js";import{d as j}from"./dokumenter-DG3eZWEY.js";import{m as x,t as y}from"./tidslinjeHendelser-yT4IBdHO.js";import{s as v}from"./saker-DXs8MA0N.js";import{s as b}from"./sokerinfo-CqC5rv1g.js";import{Q as E}from"./queryClient-SB0VFwmw.js";import{u as a,Q as S}from"./useQuery-D15qCwmj.js";import{d as _}from"./dates-JCHAmx_r.js";import{n as w,u as C,a as M,b as O,c as I}from"./nb_NO-DqkmtMx-.js";import{e as Q,h as $,m as B,s as D}from"./api-hwq1sMPe.js";import{S as N}from"./MinidialogSkjema-CjT1K5ic.js";import{a as P}from"./useBackgroundColor-Cz-TGjGB.js";import{a as L}from"./ForeldrepengeoversiktRoutes-1nhrlUYI.js";import{m as R}from"./sakerUtils-D4fsp9GY.js";import{L as A}from"./Button-Cz42euBq.js";import{r as F}from"./index-CTjT7uj6.js";import{w as G,c as T,I as V,B as H}from"./dateFormValidation-BBxfzUfL.js";import{M as q}from"./index-qfvvJAWu.js";import"./decorators-86JrGkCj.js";import"./UttaksdagenString-DBxOpWvb.js";import"./UttaksplanKalender-DJXi4mb1.js";import"./index-BXq8hJNt.js";import"./iframe-CSeF-ayO.js";import"../sb-preview/runtime.js";import"./barnType-CnRI8jWg.js";import"./_getTag-BJIhF6Yf.js";import"./stringUtils-grKZaQiI.js";import"./index-CCQ3W5xA.js";import"./VStack-Cmqt2b2v.js";import"./Label-BeJqMiuK.js";import"./useMergeRefs-DE1yqPfQ.js";import"./message-DyNkxP6Y.js";import"./Alert-CHcKNJcm.js";import"./Responsive-DQW2dfVe.js";import"./Accordion-Cvwr2ZIe.js";import"./ChevronDown-CyMHwesb.js";import"./composeEventHandlers-DeH74NdU.js";import"./index-ChWcicze.js";import"./index-BbmHap-z.js";import"./skjemanummer-CsrY1khI.js";import"./Ytelse-7td-ciMh.js";import"./Header-C5iCciuP.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./StatusTag-Dz76bBNV.js";import"./Tag-DNMWbfh9.js";import"./HGrid-B_1P65QK.js";import"./Stroller-B-9_9B1W.js";import"./LenkePanel-DfIQwAuU.js";import"./routes-D6j-qr5i.js";import"./BekreftelseSendtSøknad-ClnsUet5.js";import"./links-Cq4ifjPA.js";import"./dokumenterUtils-DXLqxenX.js";import"./File-CBdzl0Ak.js";import"./Link-gwHVuC8x.js";import"./KontonummerInfo-DxdfuLNC.js";import"./useSelectedSak-BInGIrc1.js";import"./Snarveier-SObdhbQ-.js";import"./Dokument-iXqIYlLu.js";import"./GrupperteDokumenter-DYE12xVH.js";import"./guid-CsArkN6i.js";import"./NoeGikkGalt-swYJaOtQ.js";import"./HarIkkeSaker-Bg8S_ce2.js";import"./SøkelenkerPanel-CXVGwBW6.js";import"./HarSaker-CigXDLLd.js";import"./SakLink-DsuZUH8C.js";import"./ContentSection-B_6Fjlwm.js";import"./DinPlan-DO8EPU6a.js";import"./Oppgaver-SZjyR6Mk.js";import"./OppgaveLenkepanel-GmAqf4Ch.js";import"./KontaktOss-CFX05IuY.js";import"./_baseIteratee-C-3460IB.js";import"./index-BRV0Se7Z.js";const U=[{saksnr:"352009416",opprettet:"2023-02-09",dialogId:"1111111112"}];var X=function(){return null};const u=()=>{const m=P();a(B());const e=a({...Q(),refetchInterval:k=>k.state.data?!1:15e3}),i=a(D()),s=a({...$(),enabled:e.data,select:R});if(i.isError||s.isError)throw new Error("Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.");if(!i.data||s.isPending)return r.jsx("div",{className:"py-48 px-0 text-center",children:r.jsx(A,{type:"XXL"})});const f={engangsstønad:[],foreldrepenger:[],svangerskapspenger:[]};return r.jsxs("div",{className:m==="white"?"bg-white":"bg-deepblue-50",children:[r.jsx(N,{}),r.jsx(L,{søkerinfo:i.data,saker:s.data??f})]})};u.__docgenInfo={description:"",methods:[],displayName:"Foreldrepengeoversikt"};class g extends F.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}componentDidCatch(e,i){e&&e.message!=="window.hasFocus is not a function"&&(this.setState(s=>({...s,hasError:!0,error:e})),G(s=>{s.setExtras(i),T(e)}))}render(){var e;return this.state.hasError?r.jsx("div",{className:"p-8 w-[704px] m-0 ml-auto mr-auto",children:(e=this.state.error)==null?void 0:e.message}):this.props.children}}g.__docgenInfo={description:"",methods:[],displayName:"ErrorBoundary"};const K=new E({defaultOptions:{queries:{retry:3}}}),Y={...w,...C.nb,...M.nb,...O.nb,...I.nb},z={nb:Y};_.locale("nb");const p=()=>r.jsx(g,{children:r.jsxs(S,{client:K,children:[r.jsx(X,{}),r.jsxs(V,{locale:"nb",messagesGroupedByLocale:z,children:[r.jsx(H,{}),r.jsx(u,{})]})]})});p.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const he={title:"AppContainer",component:p,render:()=>r.jsx(q,{children:r.jsx(p,{})}),parameters:{msw:{handlers:[t.get(".//rest/innsyn/v2/saker/oppdatert",()=>o.json(!0)),t.get(".//rest/minidialog",()=>o.json(U)),t.get(".//rest/sokerinfo",()=>o.json(b)),t.get(".//rest/innsyn/v2/saker",()=>o.json(v)),t.get(".//rest/historikk/vedlegg",()=>o.json(x)),t.post(".//rest/innsyn/v2/annenPartVedtak",()=>o.json(h)),t.get(".//rest/innsyn/tidslinje",()=>o.json(y)),t.get(".//rest/dokument/alle",()=>o.json(j)),t.post(".//rest/storage/foreldrepenger/vedlegg",()=>o.json({}))]}}},n={};var d,l,c;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(c=(l=n.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const je=["Default"];export{n as Default,je as __namedExportsOrder,he as default};
