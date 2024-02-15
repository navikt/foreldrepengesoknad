var ie=Object.defineProperty;var ge=(e,s,r)=>s in e?ie(e,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[s]=r;var j=(e,s,r)=>(ge(e,typeof s!="symbol"?s+"":s,r),r);import{j as t,l as ce,d as de}from"./fridagerUtils-79e129b2.js";import{r as p,a as pe}from"./index-f1f2c4b1.js";import{c as X,e as ue,d as me,b as fe,a as ke}from"./OmBarnet-c4b73edc.js";import{K as Ee,R as Se,L as Z,N as he,O as ye,Q as Ae,C as S,S as ve,n as ee,T as Ne,W as Me,X as k,Y as _e,P as f,u as we,Z as xe,_ as Le,$ as je,E as Re,a0 as Ie,a1 as be,i as Ce}from"./useEsNavigator-4179a5cf.js";import{E as N,D as C,M as D}from"./DokumentasjonSteg-1f02e788.js";import"./index-c74c9f7f.js";import{n as De,a as R,b as Te,e as Pe}from"./en_US-ebe5ef1b.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import{e as Oe,O as Ue}from"./OppsummeringSteg-da2cd850.js";import{O as Fe}from"./OmBarnetSteg-e37dc972.js";import{S as qe}from"./SøkersituasjonSteg-045981ea.js";import{U as Ge}from"./UtenlandsoppholdSteg-b9091f6b.js";import{S as Ve}from"./SenereUtenlandsoppholdSteg-90f1898d.js";import{T as Ke}from"./TidligereUtenlandsoppholdSteg-84309284.js";import{V as He}from"./Velkommen-c7815bcb.js";import"./index-b580f7e8.js";import"./ErrorSummaryHookForm-246fe46c.js";import"./isNativeReflectConstruct-554b52b6.js";import"./ExpansionCard-0d690fa8.js";import"./Radio-26f75412.js";import"./TidligereUtenlandsoppholdPanel-5d941821.js";const{Axios:bn,AxiosError:Cn,CanceledError:Dn,isCancel:Tn,CancelToken:Pn,VERSION:On,all:Un,Cancel:Fn,isAxiosError:Be,spread:qn,toFormData:Gn,AxiosHeaders:Vn,HttpStatusCode:Kn,formToJSON:Hn,getAdapter:Bn,mergeConfig:Jn}=X;class E extends Error{constructor(r,n,d){super(r);j(this,"callId");j(this,"timestamp");this.callId=n,this.timestamp=d}}class _ extends Error{constructor(){super("API_ACCESS_ERROR")}}const Je=e=>e instanceof _||e instanceof E,ne=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),T=(e,s)=>{const[r,n]=p.useState(),[d,c]=p.useState(!1),[g,o]=p.useState();return p.useEffect(()=>{let i=!1;return(async()=>{var l,a;try{c(!0);const m=await e.get(s,{withCredentials:!0,timeout:60*1e3});i||n(m.data)}catch(m){Be(m)?((l=m.response)==null?void 0:l.status)===401||((a=m.response)==null?void 0:a.status)===403?o(new _):o(new E(m.message)):m instanceof Error?o(new E(m.message)):o(new E(String(m)))}finally{c(!1)}})(),()=>{i=!0}},[e,s]),{data:r,loading:d,error:g}},$e=e=>X.create({baseURL:e,withCredentials:!0}),P="ukjent uuid",te=async(e,s,r,n,d=!1,c)=>{var g,o,i,u;try{return(await e.post(s,r,{withCredentials:!0,timeout:6e4,signal:c,headers:d?{"content-type":"application/json;"}:{}})).data}catch(l){if(ne(l)&&l.code!=="ERR_CANCELED"){if(((g=l.response)==null?void 0:g.status)===401||((o=l.response)==null?void 0:o.status)===403)throw new _;const a=l.response&&l.response.data&&l.response.data.uuid?l.response.data.uuid:P,m=a!==P?a.slice(0,8):a;throw new E(n+m,a,(u=(i=l.response)==null?void 0:i.data)==null?void 0:u.timestamp)}throw l instanceof Error?new E(l.message):new E(String(l))}},O="ukjent uuid",I=async(e,s,r,n,d)=>{var c,g;try{return(await e.delete(s,{withCredentials:!0,timeout:6e4,signal:d,data:n})).data}catch(o){if(ne(o)&&o.code!=="ERR_CANCELED"){if(((c=o.response)==null?void 0:c.status)===401||((g=o.response)==null?void 0:g.status)===403)throw new _;const i=o.response&&o.response.data&&o.response.data.uuid?o.response.data.uuid:O,u=i!==O?i.slice(0,8):i;throw new E(r+u)}throw o instanceof Error?new E(o.message):new E(String(o))}};/**
 * React Router DOM v6.21.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Ye="startTransition",U=pe[Ye];function ze(e){let{basename:s,children:r,future:n,window:d}=e,c=p.useRef();c.current==null&&(c.current=Ee({window:d,v5Compat:!0}));let g=c.current,[o,i]=p.useState({action:g.action,location:g.location}),{v7_startTransition:u}=n||{},l=p.useCallback(a=>{u&&U?U(()=>i(a)):i(a)},[i,u]);return p.useLayoutEffect(()=>g.listen(l),[g,l]),p.createElement(Se,{basename:s,children:r,location:o.location,navigationType:o.action,navigator:g,future:n})}var F;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(F||(F={}));var q;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(q||(q={}));const se="selectedLocale",Qe=()=>sessionStorage.getItem(se)||"nb",We=e=>{sessionStorage.setItem(se,e)},re=e=>{window.location.href=e},Xe=e=>{re(e+"?redirect="+window.location.origin)},oe=1,G="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Ze=(e,s,r)=>{const n=Z(),d=he(),c=ye(),[g,o]=p.useState(!1),i=p.useRef();return p.useEffect(()=>{g&&(async()=>{o(!1);const a=d[S.CURRENT_PATH];a?(n(a),await te(e,"/storage/engangsstonad",{version:oe,locale:s,...d},G)):(await I(e,"/storage/engangsstonad",G),r(!1),c(),n("/")),i.current&&i.current()})().catch(a=>{Ae(a.message),i.current&&i.current()})},[g]),p.useCallback(()=>(o(!0),new Promise(a=>{i.current=a})),[])},en=(e,s)=>{const r=(s==null?void 0:s.vedlegg.map(n=>n.id))||[];if(ue(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(n=>n.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:r};if(me(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(fe(e)&&s&&Oe(s))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:s.terminbekreftelsedato,vedleggreferanser:r};throw Error("Det er feil i data om barnet")},V="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",nn=(e,s,r)=>{const n=ve(),[d,c]=p.useState(),g=p.useCallback(async o=>{const i=ee(n(S.OM_BARNET)),u=n(S.DOKUMENTASJON),l=n(S.UTENLANDSOPPHOLD_TIDLIGERE),a=n(S.UTENLANDSOPPHOLD_SENERE),m={type:"engangsstønad",språkkode:s,barn:en(i,u),utenlandsopphold:{utenlandsoppholdSiste12Mnd:(l==null?void 0:l.utenlandsoppholdSiste12Mnd)||[],utenlandsoppholdNeste12Mnd:(a==null?void 0:a.utenlandsoppholdNeste12Mnd)||[]},vedlegg:(u==null?void 0:u.vedlegg)||[]};let x;try{x=await te(e,"/soknad/engangsstonad",m,V,!0,o)}catch(L){if(Je(L))c(L);else throw new Error("This should never happen")}if(x){try{await I(e,"/storage/engangsstonad",V,o)}catch{}r(x)}},[n,s,r,e]);return p.useMemo(()=>({sendSøknad:g,errorSendSøknad:d}),[g,d])},h=$e(N.REST_API_URL),M=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(ce,{size:"2xlarge"})}),w=({error:e})=>e instanceof _?(Xe(N.LOGIN_URL),t.jsx(M,{})):t.jsx(Ne,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),tn=({locale:e,onChangeLocale:s,søker:r,mellomlagretData:n})=>{const d=Z(),[c,g]=p.useState(!1),[o,i]=p.useState(),{sendSøknad:u,errorSendSøknad:l}=nn(h,e,i),a=Ze(h,e,g);return p.useEffect(()=>{n&&n[S.CURRENT_PATH]&&(g(!0),n.locale&&s(n.locale),d(n[S.CURRENT_PATH]))},[n]),o?N.INNSYN?(re(o.saksNr?`${N.INNSYN}/sak/${o.saksNr}/redirectFromSoknad`:`${N.INNSYN}/redirectFromSoknad`),t.jsx(M,{})):t.jsx("div",{children:"Redirected to Innsyn"}):l?t.jsx(w,{error:l}):t.jsxs(Me,{children:[!c&&t.jsx(k,{path:"*",element:t.jsx(_e,{to:f.VELKOMMEN})}),t.jsx(k,{path:f.VELKOMMEN,element:t.jsx(He,{locale:e,onChangeLocale:s,startSøknad:g,erVelkommen:c,mellomlagreOgNaviger:a})}),c&&t.jsxs(t.Fragment,{children:[t.jsx(k,{path:f.SØKERSITUASJON,element:t.jsx(qe,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.OM_BARNET,element:t.jsx(Fe,{kjønn:r.kjønn,mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.TERMINBEKREFTELSE,element:t.jsx(C,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.ADOPSJONSBEKREFTELSE,element:t.jsx(C,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.UTENLANDSOPPHOLD,element:t.jsx(Ge,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.TIDLIGERE_UTENLANDSOPPHOLD,element:t.jsx(Ke,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.SENERE_UTENLANDSOPPHOLD,element:t.jsx(Ve,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.OPPSUMMERING,element:t.jsx(Ue,{søker:r,sendSøknad:u,mellomlagreOgNaviger:a})})]})]})};try{h.displayName="esApi",h.__docgenInfo={description:"",displayName:"esApi",props:{}}}catch{}try{M.displayName="Spinner",M.__docgenInfo={description:"",displayName:"Spinner",props:{}}}catch{}try{w.displayName="ApiErrorHandler",w.__docgenInfo={description:"",displayName:"ApiErrorHandler",props:{error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"ApiAccessError | ApiGeneralError"}}}}}catch{}try{EngangsstnadRoutes.displayName="EngangsstnadRoutes",EngangsstnadRoutes.__docgenInfo={description:"",displayName:"EngangsstnadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}},søker:{defaultValue:null,description:"",name:"søker",required:!0,type:{name:"Søker"}},mellomlagretData:{defaultValue:null,description:"",name:"mellomlagretData",required:!1,type:{name:"EsDataMapAndMetaData"}}}}}catch{}const sn=({locale:e,onChangeLocale:s})=>{const{i18n:r}=we();xe(r("Søknad.Pagetitle"));const{data:n,error:d}=T(h,"/personinfo"),{data:c,loading:g,error:o}=T(h,"/storage/engangsstonad");if(d||o)return t.jsx(w,{error:ee(d||o)});if(!n||g)return t.jsx(M,{});if(!Le(n.fødselsdato))return t.jsx(je,{appnavn:"Engangsstønad"});const i=(c==null?void 0:c.version)===oe?c:void 0;return t.jsx(Re,{initialState:i,children:t.jsx(tn,{locale:e,onChangeLocale:s,søker:n,mellomlagretData:i})})};try{Engangsstnad.displayName="Engangsstnad",Engangsstnad.__docgenInfo={description:"",displayName:"Engangsstnad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}}}}}catch{}const ae=Qe(),rn={nb:{...De,...R.nb},nn:{...Te,...R.nn},en:{...Pe,...R.en}};de.locale(ae);const on=async()=>{try{await I(h,"/storage/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},an=()=>{const[e,s]=p.useState(ae),r=p.useCallback(n=>{We(n),s(n),document.documentElement.setAttribute("lang",n)},[]);return t.jsx(Ie,{locale:e,messagesGroupedByLocale:rn,children:t.jsx(be,{appName:"Engangsstønad",retryCallback:on,children:t.jsx(ze,{children:t.jsx(sn,{locale:e,onChangeLocale:r})})})})},le=an,ln={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},$n={title:"Applikasjon - Engangsstønad (AppContainer)",component:le},b=({søker:e,mellomlagretData:s,doLogging:r=!0})=>{Ce();const n=new D(h);n.onGet("/personinfo").reply(()=>(r&&console.log("network request: get /personinfo"),[200,e])),n.onGet("/storage/engangsstonad").reply(()=>(r&&console.log("network request: get /storage/engangstonad"),[200,s])),n.onPost("/soknad/engangsstonad").reply(()=>(r&&console.log("network request: post /soknad/engangsstonad"),[200,ln])),n.onPost("/storage/engangsstonad").reply(()=>(r&&console.log("network request: post /storage/engangstonad"),[200])),n.onDelete("/storage/engangsstonad").reply(()=>(r&&console.log("network request: delete /storage/engangstonad"),[200]));const d=new D(ke);return d.onPost("/storage/engangsstonad/vedlegg").reply(200),d.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200),t.jsx(le,{})},y=b.bind({});y.args={søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const A=b.bind({});A.args={mellomlagretData:{version:1,locale:"nb",[S.SØKERSITUASJON]:{situasjon:"fødsel"},[S.CURRENT_PATH]:f.SØKERSITUASJON},søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const v=b.bind({});v.args={søker:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};var K,H,B;y.parameters={...y.parameters,docs:{...(K=y.parameters)==null?void 0:K.docs,source:{originalSource:`({
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
}`,...(B=(H=y.parameters)==null?void 0:H.docs)==null?void 0:B.source}}};var J,$,Y;A.parameters={...A.parameters,docs:{...(J=A.parameters)==null?void 0:J.docs,source:{originalSource:`({
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
}`,...(Y=($=A.parameters)==null?void 0:$.docs)==null?void 0:Y.source}}};var z,Q,W;v.parameters={...v.parameters,docs:{...(z=v.parameters)==null?void 0:z.docs,source:{originalSource:`({
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
}`,...(W=(Q=v.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};const Yn=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{y as SøkerErKvinne,A as SøkerErKvinneMedMellomlagretData,v as SøkerErMann,Yn as __namedExportsOrder,$n as default};
