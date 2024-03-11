var le=Object.defineProperty;var ge=(e,t,s)=>t in e?le(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var j=(e,t,s)=>(ge(e,typeof t!="symbol"?t+"":t,s),s);import{j as r,m as ce,u as de,d as pe}from"./dates-a54b7688.js";import{B as ue,R as me,D as X,G as fe,I as ke,J as Ee,C as S,K as Se,n as Z,L as he,N as ye,O as k,Q as Ae,P as f,T as ve,W as Ne,E as Me,X as we,Y as _e,i as xe}from"./useEsNavigator-9078f7eb.js";import{E as M,D,M as T}from"./DokumentasjonSteg-950f4ae7.js";import{r as p,a as Le}from"./index-f1f2c4b1.js";import{c as ee,e as je,d as Re,b as Ie,a as be}from"./OmBarnet-c086ae82.js";import"./index-c74c9f7f.js";import"./fridagerUtils-1041562e.js";import{n as De,a as R,b as Te,e as Ce}from"./nn_NO-4f3908d7.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import{e as Pe,O as Oe}from"./OppsummeringSteg-51fc6903.js";import{O as Ue}from"./OmBarnetSteg-bd4e8c32.js";import{S as Fe}from"./SøkersituasjonSteg-5ac51c15.js";import{U as qe}from"./UtenlandsoppholdSteg-572fa343.js";import{S as Ge}from"./SenereUtenlandsoppholdSteg-1c91faf7.js";import{T as Ve}from"./TidligereUtenlandsoppholdSteg-52913970.js";import{V as Ke}from"./Velkommen-1e204fec.js";import"./index-b580f7e8.js";import"./ErrorSummaryHookForm-214b1ce2.js";import"./customParseFormat-61b655e4.js";import"./isNativeReflectConstruct-554b52b6.js";import"./ExpansionCard-38f1f044.js";import"./useControllableState-e0bf3f38.js";import"./Radio-7106ba17.js";import"./TidligereUtenlandsoppholdPanel-d51c0fb8.js";const{Axios:Cn,AxiosError:Pn,CanceledError:On,isCancel:Un,CancelToken:Fn,VERSION:qn,all:Gn,Cancel:Vn,isAxiosError:He,spread:Kn,toFormData:Hn,AxiosHeaders:Bn,HttpStatusCode:Jn,formToJSON:$n,getAdapter:Yn,mergeConfig:zn}=ee;class E extends Error{constructor(s,n,d){super(s);j(this,"callId");j(this,"timestamp");this.callId=n,this.timestamp=d}}class _ extends Error{constructor(){super("API_ACCESS_ERROR")}}const Be=e=>e instanceof _||e instanceof E,ne=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),C=(e,t)=>{const[s,n]=p.useState(),[d,c]=p.useState(!1),[g,o]=p.useState();return p.useEffect(()=>{let l=!1;return(async()=>{var i,a;try{c(!0);const m=await e.get(t,{withCredentials:!0,timeout:60*1e3});l||n(m.data)}catch(m){He(m)?((i=m.response)==null?void 0:i.status)===401||((a=m.response)==null?void 0:a.status)===403?o(new _):o(new E(m.message)):m instanceof Error?o(new E(m.message)):o(new E(String(m)))}finally{c(!1)}})(),()=>{l=!0}},[e,t]),{data:s,loading:d,error:g}},Je=e=>ee.create({baseURL:e,withCredentials:!0}),P="ukjent uuid",te=async(e,t,s,n,d=!1,c)=>{var g,o,l,u;try{return(await e.post(t,s,{withCredentials:!0,timeout:6e4,signal:c,headers:d?{"content-type":"application/json;"}:{}})).data}catch(i){if(ne(i)&&i.code!=="ERR_CANCELED"){if(((g=i.response)==null?void 0:g.status)===401||((o=i.response)==null?void 0:o.status)===403)throw new _;const a=i.response&&i.response.data&&i.response.data.uuid?i.response.data.uuid:P,m=a!==P?a.slice(0,8):a;throw new E(n+m,a,(u=(l=i.response)==null?void 0:l.data)==null?void 0:u.timestamp)}throw i instanceof Error?new E(i.message):new E(String(i))}},O="ukjent uuid",I=async(e,t,s,n,d)=>{var c,g;try{return(await e.delete(t,{withCredentials:!0,timeout:6e4,signal:d,data:n})).data}catch(o){if(ne(o)&&o.code!=="ERR_CANCELED"){if(((c=o.response)==null?void 0:c.status)===401||((g=o.response)==null?void 0:g.status)===403)throw new _;const l=o.response&&o.response.data&&o.response.data.uuid?o.response.data.uuid:O,u=l!==O?l.slice(0,8):l;throw new E(s+u)}throw o instanceof Error?new E(o.message):new E(String(o))}};/**
 * React Router DOM v6.21.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const $e="startTransition",U=Le[$e];function Ye(e){let{basename:t,children:s,future:n,window:d}=e,c=p.useRef();c.current==null&&(c.current=ue({window:d,v5Compat:!0}));let g=c.current,[o,l]=p.useState({action:g.action,location:g.location}),{v7_startTransition:u}=n||{},i=p.useCallback(a=>{u&&U?U(()=>l(a)):l(a)},[l,u]);return p.useLayoutEffect(()=>g.listen(i),[g,i]),p.createElement(me,{basename:t,children:s,location:o.location,navigationType:o.action,navigator:g,future:n})}var F;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(F||(F={}));var q;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(q||(q={}));function ze(e){p.useEffect(()=>{const t=document.title;return document.title=e,()=>{document.title=t}},[e])}const re="selectedLocale",Qe=()=>sessionStorage.getItem(re)||"nb",We=e=>{sessionStorage.setItem(re,e)},se=e=>{window.location.href=e},Xe=e=>{se(e+"?redirect="+window.location.origin)},oe=1,G="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Ze=(e,t,s)=>{const n=X(),d=fe(),c=ke(),[g,o]=p.useState(!1),l=p.useRef();return p.useEffect(()=>{g&&(async()=>{o(!1);const a=d[S.CURRENT_PATH];a?(n(a),await te(e,"/storage/engangsstonad",{version:oe,locale:t,...d},G)):(await I(e,"/storage/engangsstonad",G),s(!1),c(),n("/")),l.current&&l.current()})().catch(a=>{Ee(a.message),l.current&&l.current()})},[g]),p.useCallback(()=>(o(!0),new Promise(a=>{l.current=a})),[])},en=(e,t)=>{const s=(t==null?void 0:t.vedlegg.map(n=>n.id))||[];if(je(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(n=>n.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:s};if(Re(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(Ie(e)&&t&&Pe(t))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:t.terminbekreftelsedato,vedleggreferanser:s};throw Error("Det er feil i data om barnet")},V="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",nn=(e,t,s)=>{const n=Se(),[d,c]=p.useState(),g=p.useCallback(async o=>{const l=Z(n(S.OM_BARNET)),u=n(S.DOKUMENTASJON),i=n(S.UTENLANDSOPPHOLD_TIDLIGERE),a=n(S.UTENLANDSOPPHOLD_SENERE),m={type:"engangsstønad",språkkode:t,barn:en(l,u),oppholdIUtlandet:((i==null?void 0:i.utenlandsoppholdSiste12Mnd)||[]).concat((a==null?void 0:a.utenlandsoppholdNeste12Mnd)||[]),vedlegg:(u==null?void 0:u.vedlegg.map(y=>({...y,dokumenterer:{type:"barn"}})))||[]};let L;try{L=await te(e,"/soknad/engangsstonad",m,V,!0,o)}catch(y){if(Be(y))c(y);else throw new Error("This should never happen")}if(L){try{await I(e,"/storage/engangsstonad",V,o)}catch{}s(L)}},[n,t,s,e]);return p.useMemo(()=>({sendSøknad:g,errorSendSøknad:d}),[g,d])},h=Je(M.REST_API_URL),w=()=>r.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:r.jsx(ce,{size:"2xlarge"})}),x=({error:e})=>e instanceof _?(Xe(M.LOGIN_URL),r.jsx(w,{})):r.jsx(he,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),tn=({locale:e,onChangeLocale:t,søker:s,mellomlagretData:n})=>{const d=X(),[c,g]=p.useState(!1),[o,l]=p.useState(),{sendSøknad:u,errorSendSøknad:i}=nn(h,e,l),a=Ze(h,e,g);return p.useEffect(()=>{n&&n[S.CURRENT_PATH]&&(g(!0),n.locale&&t(n.locale),d(n[S.CURRENT_PATH]))},[n]),o?M.INNSYN?(se(o.saksNr?`${M.INNSYN}/sak/${o.saksNr}/redirectFromSoknad`:`${M.INNSYN}/redirectFromSoknad`),r.jsx(w,{})):r.jsx("div",{children:"Redirected to Innsyn"}):i?r.jsx(x,{error:i}):r.jsxs(ye,{children:[!c&&r.jsx(k,{path:"*",element:r.jsx(Ae,{to:f.VELKOMMEN})}),r.jsx(k,{path:f.VELKOMMEN,element:r.jsx(Ke,{locale:e,onChangeLocale:t,startSøknad:g,erVelkommen:c,mellomlagreOgNaviger:a})}),c&&r.jsxs(r.Fragment,{children:[r.jsx(k,{path:f.SØKERSITUASJON,element:r.jsx(Fe,{mellomlagreOgNaviger:a})}),r.jsx(k,{path:f.OM_BARNET,element:r.jsx(Ue,{kjønn:s.kjønn,mellomlagreOgNaviger:a})}),r.jsx(k,{path:f.TERMINBEKREFTELSE,element:r.jsx(D,{mellomlagreOgNaviger:a})}),r.jsx(k,{path:f.ADOPSJONSBEKREFTELSE,element:r.jsx(D,{mellomlagreOgNaviger:a})}),r.jsx(k,{path:f.UTENLANDSOPPHOLD,element:r.jsx(qe,{mellomlagreOgNaviger:a})}),r.jsx(k,{path:f.TIDLIGERE_UTENLANDSOPPHOLD,element:r.jsx(Ve,{mellomlagreOgNaviger:a})}),r.jsx(k,{path:f.SENERE_UTENLANDSOPPHOLD,element:r.jsx(Ge,{mellomlagreOgNaviger:a})}),r.jsx(k,{path:f.OPPSUMMERING,element:r.jsx(Oe,{søker:s,sendSøknad:u,mellomlagreOgNaviger:a})})]})]})};try{h.displayName="esApi",h.__docgenInfo={description:"",displayName:"esApi",props:{}}}catch{}try{w.displayName="Spinner",w.__docgenInfo={description:"",displayName:"Spinner",props:{}}}catch{}try{x.displayName="ApiErrorHandler",x.__docgenInfo={description:"",displayName:"ApiErrorHandler",props:{error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"ApiAccessError | ApiGeneralError"}}}}}catch{}try{EngangsstnadRoutes.displayName="EngangsstnadRoutes",EngangsstnadRoutes.__docgenInfo={description:"",displayName:"EngangsstnadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}},søker:{defaultValue:null,description:"",name:"søker",required:!0,type:{name:"Søker"}},mellomlagretData:{defaultValue:null,description:"",name:"mellomlagretData",required:!1,type:{name:"EsDataMapAndMetaData"}}}}}catch{}const rn=({locale:e,onChangeLocale:t})=>{const s=de();ze(s.formatMessage({id:"Søknad.Pagetitle"}));const{data:n,error:d}=C(h,"/personinfo"),{data:c,loading:g,error:o}=C(h,"/storage/engangsstonad");if(d||o)return r.jsx(x,{error:Z(d||o)});if(!n||g)return r.jsx(w,{});if(!ve(n.fødselsdato))return r.jsx(Ne,{appnavn:"Engangsstønad"});const l=(c==null?void 0:c.version)===oe?c:void 0;return r.jsx(Me,{initialState:l,children:r.jsx(tn,{locale:e,onChangeLocale:t,søker:n,mellomlagretData:l})})};try{Engangsstnad.displayName="Engangsstnad",Engangsstnad.__docgenInfo={description:"",displayName:"Engangsstnad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}}}}}catch{}const ae=Qe(),sn={nb:{...De,...R.nb},nn:{...Te,...R.nn},en:{...Ce,...R.en}};pe.locale(ae);const on=async()=>{try{await I(h,"/storage/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},an=()=>{const[e,t]=p.useState(ae),s=p.useCallback(n=>{We(n),t(n),document.documentElement.setAttribute("lang",n)},[]);return r.jsx(we,{locale:e,messagesGroupedByLocale:sn,children:r.jsx(_e,{appName:"Engangsstønad",retryCallback:on,children:r.jsx(Ye,{children:r.jsx(rn,{locale:e,onChangeLocale:s})})})})},ie=an,ln={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},Qn={title:"Applikasjon - Engangsstønad (AppContainer)",component:ie},b=({søker:e,mellomlagretData:t,doLogging:s=!0})=>{xe();const n=new T(h);n.onGet("/personinfo").reply(()=>(s&&console.log("network request: get /personinfo"),[200,e])),n.onGet("/storage/engangsstonad").reply(()=>(s&&console.log("network request: get /storage/engangstonad"),[200,t])),n.onPost("/soknad/engangsstonad").reply(()=>(s&&console.log("network request: post /soknad/engangsstonad"),[200,ln])),n.onPost("/storage/engangsstonad").reply(()=>(s&&console.log("network request: post /storage/engangstonad"),[200])),n.onDelete("/storage/engangsstonad").reply(()=>(s&&console.log("network request: delete /storage/engangstonad"),[200]));const d=new T(be);return d.onPost("/storage/engangsstonad/vedlegg").reply(200),d.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200),r.jsx(ie,{})},A=b.bind({});A.args={søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const v=b.bind({});v.args={mellomlagretData:{version:1,locale:"nb",[S.SØKERSITUASJON]:{situasjon:"fødsel"},[S.CURRENT_PATH]:f.SØKERSITUASJON},søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const N=b.bind({});N.args={søker:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};var K,H,B;A.parameters={...A.parameters,docs:{...(K=A.parameters)==null?void 0:K.docs,source:{originalSource:`({
  søker,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(esApi);
  apiMock.onGet('/personinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /personinfo');
    }
    return [200, søker];
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
}`,...(B=(H=A.parameters)==null?void 0:H.docs)==null?void 0:B.source}}};var J,$,Y;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`({
  søker,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(esApi);
  apiMock.onGet('/personinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /personinfo');
    }
    return [200, søker];
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
}`,...(Y=($=v.parameters)==null?void 0:$.docs)==null?void 0:Y.source}}};var z,Q,W;N.parameters={...N.parameters,docs:{...(z=N.parameters)==null?void 0:z.docs,source:{originalSource:`({
  søker,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(esApi);
  apiMock.onGet('/personinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /personinfo');
    }
    return [200, søker];
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
}`,...(W=(Q=N.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};const Wn=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{A as SøkerErKvinne,v as SøkerErKvinneMedMellomlagretData,N as SøkerErMann,Wn as __namedExportsOrder,Qn as default};
