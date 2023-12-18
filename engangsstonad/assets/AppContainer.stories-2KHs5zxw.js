import{j as t,q as ie,d as ge}from"./fridagerUtils-N3KKpnwX.js";import{E as M,D as T,M as b}from"./DokumentasjonSteg-3W2kvNlN.js";import{O as ce,R as de,Q as pe,n as R,C as h,T as Z,W as ue,X as me,Y as fe,Z as ke,_ as E,$ as Ee,P as f,a0 as Se,a1 as he,E as ye,a2 as Ae,a3 as Ne,i as ve}from"./useEsNavigator-e559VhHu.js";import{r as g,a as Me}from"./index-OjgoNOWw.js";import{d as ee,e as _e,c as we,b as xe,a as je}from"./OmBarnet-3NviD4hu.js";import{e as Le,O as Re,K as I}from"./OppsummeringSteg-oi3C0sqd.js";import"./index-mQqIOHEI.js";import{n as Ie,a as L,b as Ce,e as De}from"./en_US-ynPEy3c_.js";import"./_baseToString-r0zJwuYG.js";import"./_createSet-pyNrvG8u.js";import{S as Te}from"./SøkersituasjonSteg-0oQ8NMzq.js";import{V as be}from"./Velkommen-F3Vu7IU2.js";import{O as Pe}from"./OmBarnetSteg--LbvdRm2.js";import{U as Oe}from"./UtenlandsoppholdSteg-Rl4USmMO.js";import{S as Ue}from"./SenereUtenlandsoppholdSteg-a1oU6oeJ.js";import{T as qe}from"./TidligereUtenlandsoppholdSteg-jf5MTr5C.js";import"./index-lbrLmSir.js";import"./ErrorSummaryHookForm-8aRBk6a_.js";import"./isNativeReflectConstruct-3LOYyi5T.js";import"./ExpansionCard-qAQky0Xh.js";import"./ConfirmationPanel-9qhAct_a.js";import"./Radio-IFKHmgtZ.js";import"./TidligereUtenlandsoppholdPanel-qaoAN8cX.js";const{Axios:xn,AxiosError:jn,CanceledError:Ln,isCancel:Rn,CancelToken:In,VERSION:Cn,all:Dn,Cancel:Tn,isAxiosError:Ve,spread:bn,toFormData:Pn,AxiosHeaders:On,HttpStatusCode:Un,formToJSON:qn,getAdapter:Vn,mergeConfig:Fn}=ee;class S extends Error{constructor(o){super(o)}}class w extends Error{constructor(){super("API_ACCESS_ERROR")}}const Fe=e=>e instanceof w||e instanceof S,ne=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),P=(e,o)=>{const[s,n]=g.useState(),[i,d]=g.useState(!1),[l,r]=g.useState();return g.useEffect(()=>{let a=!1;return(async()=>{var p,c;try{d(!0);const m=await e.get(o,{withCredentials:!0,timeout:60*1e3});a||n(m.data)}catch(m){Ve(m)?((p=m.response)==null?void 0:p.status)===401||((c=m.response)==null?void 0:c.status)===403?r(new w):r(new S(m.message)):m instanceof Error?r(new S(m.message)):r(new S(String(m)))}finally{d(!1)}})(),()=>{a=!0}},[e,o]),{data:s,loading:i,error:l}},Ge=e=>ee.create({baseURL:e,withCredentials:!0}),O="ukjent uuid",te=async(e,o,s,n,i=!1,d)=>{var l,r;try{return(await e.post(o,s,{withCredentials:!0,timeout:6e4,signal:d,headers:i?{"content-type":"application/json;"}:{}})).data}catch(a){if(ne(a)&&a.code!=="ERR_CANCELED"){if(((l=a.response)==null?void 0:l.status)===401||((r=a.response)==null?void 0:r.status)===403)throw new w;const u=a.response&&a.response.data&&a.response.data.uuid?a.response.data.uuid:O,p=u!==O?u.slice(0,8):u;throw new S(n+p)}throw a instanceof Error?new S(a.message):new S(String(a))}},U="ukjent uuid",C=async(e,o,s,n,i)=>{var d,l;try{return(await e.delete(o,{withCredentials:!0,timeout:6e4,signal:i,data:n})).data}catch(r){if(ne(r)&&r.code!=="ERR_CANCELED"){if(((d=r.response)==null?void 0:d.status)===401||((l=r.response)==null?void 0:l.status)===403)throw new w;const a=r.response&&r.response.data&&r.response.data.uuid?r.response.data.uuid:U,u=a!==U?a.slice(0,8):a;throw new S(s+u)}throw r instanceof Error?new S(r.message):new S(String(r))}};/**
 * React Router DOM v6.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Ke="startTransition",q=Me[Ke];function He(e){let{basename:o,children:s,future:n,window:i}=e,d=g.useRef();d.current==null&&(d.current=ce({window:i,v5Compat:!0}));let l=d.current,[r,a]=g.useState({action:l.action,location:l.location}),{v7_startTransition:u}=n||{},p=g.useCallback(c=>{u&&q?q(()=>a(c)):a(c)},[a,u]);return g.useLayoutEffect(()=>l.listen(p),[l,p]),g.createElement(de,{basename:o,children:s,location:r.location,navigationType:r.action,navigator:l,future:n})}var V;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(V||(V={}));var F;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(F||(F={}));const re="selectedLocale",Be=()=>sessionStorage.getItem(re)||"nb",Je=e=>{sessionStorage.setItem(re,e)},oe=e=>{window.location.href=e},$e=e=>{oe(e+"?redirect="+window.location.origin)},Ye=(e,o)=>{const s=(o==null?void 0:o.vedlegg.map(n=>n.id))||[];if(_e(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(n=>n.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:s};if(we(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(xe(e)&&o&&Le(o))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:o.terminbekreftelsedato,vedleggreferanser:s};throw Error("Det er feil i data om barnet")},G="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",ze=(e,o,s)=>{const n=pe(),[i,d]=g.useState(),l=g.useCallback(async r=>{const a=R(n(h.OM_BARNET)),u=n(h.DOKUMENTASJON),p=n(h.UTENLANDSOPPHOLD_TIDLIGERE),c=n(h.UTENLANDSOPPHOLD_SENERE),m={type:"engangsstønad",språkkode:o,barn:Ye(a,u),utenlandsopphold:{utenlandsoppholdSiste12Mnd:(p==null?void 0:p.utenlandsoppholdSiste12Mnd)||[],utenlandsoppholdNeste12Mnd:(c==null?void 0:c.utenlandsoppholdNeste12Mnd)||[]},vedlegg:(u==null?void 0:u.vedlegg)||[]};let k;try{k=await te(e,"/soknad/engangsstonad",m,G,!0,r)}catch(j){if(Fe(j))d(j);else throw new Error("This should never happen")}if(k){try{await C(e,"/storage/engangsstonad",G,r)}catch{}s(k)}},[n,o,s,e]);return g.useMemo(()=>({sendSøknad:l,errorSendSøknad:i}),[l,i])},se=1,K="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Qe=(e,o,s)=>{const n=Z(),i=ue(),d=me(),[l,r]=g.useState(),[a,u]=g.useState(!1),p=g.useRef();g.useEffect(()=>{a&&(async()=>{u(!1);const k=i[h.CURRENT_PATH];k?(await te(e,"/storage/engangsstonad",{version:se,locale:o,...i},K),n(k)):(await C(e,"/storage/engangsstonad",K),s(!1),d(),n("/")),p.current&&p.current()})().catch(k=>{r(k),p.current&&p.current()})},[a]);const c=g.useCallback(()=>(u(!0),new Promise(k=>{p.current=k})),[]);return g.useMemo(()=>({mellomlagreOgNaviger:c,errorMellomlagre:l}),[c,l])},y=Ge(M.REST_API_URL),_=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(ie,{size:"2xlarge"})}),x=({error:e})=>e instanceof w?($e(M.LOGIN_URL),t.jsx(_,{})):t.jsx(fe,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),We=({locale:e,onChangeLocale:o,person:s,mellomlagretData:n})=>{const i=Z(),[d,l]=g.useState(!1),[r,a]=g.useState(),{sendSøknad:u,errorSendSøknad:p}=ze(y,e,a),{mellomlagreOgNaviger:c,errorMellomlagre:m}=Qe(y,e,l);return g.useEffect(()=>{n&&n[h.CURRENT_PATH]&&(l(!0),n.locale&&o(n.locale),i(n[h.CURRENT_PATH]))},[n]),r?M.INNSYN?(oe(r.saksNr?`${M.INNSYN}/sak/${r.saksNr}/redirectFromSoknad`:`${M.INNSYN}/redirectFromSoknad`),t.jsx(_,{})):t.jsx("div",{children:"Redirected to Innsyn"}):p||m?t.jsx(x,{error:R(p||m)}):t.jsxs(ke,{children:[!d&&t.jsx(E,{path:"*",element:t.jsx(Ee,{to:f.VELKOMMEN})}),t.jsx(E,{path:f.VELKOMMEN,element:t.jsx(be,{locale:e,onChangeLocale:o,startSøknad:l,erVelkommen:d,mellomlagreOgNaviger:c})}),d&&t.jsxs(t.Fragment,{children:[t.jsx(E,{path:f.SØKERSITUASJON,element:t.jsx(Te,{mellomlagreOgNaviger:c})}),t.jsx(E,{path:f.OM_BARNET,element:t.jsx(Pe,{kjønn:s.kjønn,mellomlagreOgNaviger:c})}),t.jsx(E,{path:f.TERMINBEKREFTELSE,element:t.jsx(T,{mellomlagreOgNaviger:c})}),t.jsx(E,{path:f.ADOPSJONSBEKREFTELSE,element:t.jsx(T,{mellomlagreOgNaviger:c})}),t.jsx(E,{path:f.UTENLANDSOPPHOLD,element:t.jsx(Oe,{mellomlagreOgNaviger:c})}),t.jsx(E,{path:f.TIDLIGERE_UTENLANDSOPPHOLD,element:t.jsx(qe,{mellomlagreOgNaviger:c})}),t.jsx(E,{path:f.SENERE_UTENLANDSOPPHOLD,element:t.jsx(Ue,{mellomlagreOgNaviger:c})}),t.jsx(E,{path:f.OPPSUMMERING,element:t.jsx(Re,{person:s,sendSøknad:u,mellomlagreOgNaviger:c})})]})]})};try{y.displayName="esApi",y.__docgenInfo={description:"",displayName:"esApi",props:{}}}catch{}try{_.displayName="Spinner",_.__docgenInfo={description:"",displayName:"Spinner",props:{}}}catch{}try{x.displayName="ApiErrorHandler",x.__docgenInfo={description:"",displayName:"ApiErrorHandler",props:{error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"ApiAccessError | ApiGeneralError"}}}}}catch{}try{EngangsstnadRoutes.displayName="EngangsstnadRoutes",EngangsstnadRoutes.__docgenInfo={description:"",displayName:"EngangsstnadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}},person:{defaultValue:null,description:"",name:"person",required:!0,type:{name:"Person"}},mellomlagretData:{defaultValue:null,description:"",name:"mellomlagretData",required:!1,type:{name:"EsDataMapAndMetaData"}}}}}catch{}const Xe=({locale:e,onChangeLocale:o})=>{const{data:s,error:n}=P(y,"/personinfo"),{data:i,loading:d,error:l}=P(y,"/storage/engangsstonad");if(n||l)return t.jsx(x,{error:R(n||l)});if(!s||d)return t.jsx(_,{});if(!Se(s.fødselsdato))return t.jsx(he,{appnavn:"Engangsstønad"});const r=(i==null?void 0:i.version)===se?i:void 0;return t.jsx(ye,{initialState:r,children:t.jsx(We,{locale:e,onChangeLocale:o,person:s,mellomlagretData:r})})};try{Engangsstnad.displayName="Engangsstnad",Engangsstnad.__docgenInfo={description:"",displayName:"Engangsstnad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}}}}}catch{}const ae=Be(),Ze={nb:{...Ie,...L.nb},nn:{...Ce,...L.nn},en:{...De,...L.en}};ge.locale(ae);const en=async()=>{try{await C(y,"/storage/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},nn=()=>{const[e,o]=g.useState(ae),s=g.useCallback(n=>{Je(n),o(n),document.documentElement.setAttribute("lang",n)},[]);return t.jsx(Ae,{locale:e,messagesGroupedByLocale:Ze,children:t.jsx(Ne,{appName:"Engangsstønad",retryCallback:en,children:t.jsx(He,{children:t.jsx(Xe,{locale:e,onChangeLocale:s})})})})},le=nn,tn={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},Gn={title:"Applikasjon - Engangsstønad (AppContainer)",component:le},D=({person:e,mellomlagretData:o,doLogging:s=!0})=>{ve();const n=new b(y);n.onGet("/personinfo").reply(()=>(s&&console.log("network request: get /personinfo"),[200,e])),n.onGet("/storage/engangsstonad").reply(()=>(s&&console.log("network request: get /storage/engangstonad"),[200,o])),n.onPost("/soknad/engangsstonad").reply(()=>(s&&console.log("network request: post /soknad/engangsstonad"),[200,tn])),n.onPost("/storage/engangsstonad").reply(()=>(s&&console.log("network request: post /storage/engangstonad"),[200])),n.onDelete("/storage/engangsstonad").reply(()=>(s&&console.log("network request: delete /storage/engangstonad"),[200]));const i=new b(je);return i.onPost("/storage/engangsstonad/vedlegg").reply(200),i.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200),t.jsx(le,{})},A=D.bind({});A.args={person:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:I.KVINNE,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};const N=D.bind({});N.args={mellomlagretData:{version:1,locale:"nb",[h.SØKERSITUASJON]:{situasjon:"fødsel"},[h.CURRENT_PATH]:f.SØKERSITUASJON},person:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:I.KVINNE,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};const v=D.bind({});v.args={person:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:I.MANN,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};var H,B,J;A.parameters={...A.parameters,docs:{...(H=A.parameters)==null?void 0:H.docs,source:{originalSource:`({
  person,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(esApi);
  apiMock.onGet('/personinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /personinfo');
    }
    return [200, person];
  });
  apiMock.onGet('/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: get /storage/engangstonad');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('/soknad/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: post /soknad/engangsstonad');
    }
    return [200, kvittering];
  });
  apiMock.onPost('/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onDelete('/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: delete /storage/engangstonad');
    }
    return [200];
  });
  const attachmentApiMock = new MockAdapter(attachmentApi);
  attachmentApiMock.onPost('/storage/engangsstonad/vedlegg').reply(200); //story
  attachmentApiMock.onPost('http://localhost:8888/rest/storage/engangsstonad/vedlegg').reply(200); //test

  return <AppContainer />;
}`,...(J=(B=A.parameters)==null?void 0:B.docs)==null?void 0:J.source}}};var $,Y,z;N.parameters={...N.parameters,docs:{...($=N.parameters)==null?void 0:$.docs,source:{originalSource:`({
  person,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(esApi);
  apiMock.onGet('/personinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /personinfo');
    }
    return [200, person];
  });
  apiMock.onGet('/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: get /storage/engangstonad');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('/soknad/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: post /soknad/engangsstonad');
    }
    return [200, kvittering];
  });
  apiMock.onPost('/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onDelete('/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: delete /storage/engangstonad');
    }
    return [200];
  });
  const attachmentApiMock = new MockAdapter(attachmentApi);
  attachmentApiMock.onPost('/storage/engangsstonad/vedlegg').reply(200); //story
  attachmentApiMock.onPost('http://localhost:8888/rest/storage/engangsstonad/vedlegg').reply(200); //test

  return <AppContainer />;
}`,...(z=(Y=N.parameters)==null?void 0:Y.docs)==null?void 0:z.source}}};var Q,W,X;v.parameters={...v.parameters,docs:{...(Q=v.parameters)==null?void 0:Q.docs,source:{originalSource:`({
  person,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(esApi);
  apiMock.onGet('/personinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /personinfo');
    }
    return [200, person];
  });
  apiMock.onGet('/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: get /storage/engangstonad');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('/soknad/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: post /soknad/engangsstonad');
    }
    return [200, kvittering];
  });
  apiMock.onPost('/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onDelete('/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: delete /storage/engangstonad');
    }
    return [200];
  });
  const attachmentApiMock = new MockAdapter(attachmentApi);
  attachmentApiMock.onPost('/storage/engangsstonad/vedlegg').reply(200); //story
  attachmentApiMock.onPost('http://localhost:8888/rest/storage/engangsstonad/vedlegg').reply(200); //test

  return <AppContainer />;
}`,...(X=(W=v.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};const Kn=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{A as SøkerErKvinne,N as SøkerErKvinneMedMellomlagretData,v as SøkerErMann,Kn as __namedExportsOrder,Gn as default};
