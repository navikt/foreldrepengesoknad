var le=Object.defineProperty;var ge=(e,s,r)=>s in e?le(e,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[s]=r;var j=(e,s,r)=>(ge(e,typeof s!="symbol"?s+"":s,r),r);import{j as t,n as ce,u as de,d as pe}from"./dates-6e6416c1.js";import{B as ue,R as me,D as X,G as fe,I as ke,J as Ee,C as S,K as Se,n as Z,L as he,N as ye,O as k,Q as Ae,P as f,S as ve,T as Ne,W as Me,E as we,X as _e,Y as xe,i as Le}from"./useEsNavigator-13a162f5.js";import{E as M,D,M as T}from"./DokumentasjonSteg-ccee7f87.js";import{r as p,a as je}from"./index-f1f2c4b1.js";import{c as ee,e as Re,d as Ie,b as be,a as De}from"./OmBarnet-c086ae82.js";import"./index-c74c9f7f.js";import{n as Te,a as R,b as Ce,e as Pe}from"./nn_NO-4f3908d7.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import{e as Oe,O as Ue}from"./OppsummeringSteg-18ebc30d.js";import{O as Fe}from"./OmBarnetSteg-a7d599ee.js";import{S as qe}from"./SøkersituasjonSteg-bdc35a9f.js";import{U as Ge}from"./UtenlandsoppholdSteg-a853e693.js";import{S as Ve}from"./SenereUtenlandsoppholdSteg-05255dfe.js";import{T as Ke}from"./TidligereUtenlandsoppholdSteg-16482291.js";import{V as He}from"./Velkommen-50f4b8cb.js";import"./index-b580f7e8.js";import"./ErrorSummaryHookForm-54a44519.js";import"./isNativeReflectConstruct-554b52b6.js";import"./ExpansionCard-dab83973.js";import"./Radio-22b99ddf.js";import"./TidligereUtenlandsoppholdPanel-c489fd94.js";const{Axios:bn,AxiosError:Dn,CanceledError:Tn,isCancel:Cn,CancelToken:Pn,VERSION:On,all:Un,Cancel:Fn,isAxiosError:Be,spread:qn,toFormData:Gn,AxiosHeaders:Vn,HttpStatusCode:Kn,formToJSON:Hn,getAdapter:Bn,mergeConfig:Jn}=ee;class E extends Error{constructor(r,n,d){super(r);j(this,"callId");j(this,"timestamp");this.callId=n,this.timestamp=d}}class _ extends Error{constructor(){super("API_ACCESS_ERROR")}}const Je=e=>e instanceof _||e instanceof E,ne=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),C=(e,s)=>{const[r,n]=p.useState(),[d,c]=p.useState(!1),[g,o]=p.useState();return p.useEffect(()=>{let l=!1;return(async()=>{var i,a;try{c(!0);const m=await e.get(s,{withCredentials:!0,timeout:60*1e3});l||n(m.data)}catch(m){Be(m)?((i=m.response)==null?void 0:i.status)===401||((a=m.response)==null?void 0:a.status)===403?o(new _):o(new E(m.message)):m instanceof Error?o(new E(m.message)):o(new E(String(m)))}finally{c(!1)}})(),()=>{l=!0}},[e,s]),{data:r,loading:d,error:g}},$e=e=>ee.create({baseURL:e,withCredentials:!0}),P="ukjent uuid",te=async(e,s,r,n,d=!1,c)=>{var g,o,l,u;try{return(await e.post(s,r,{withCredentials:!0,timeout:6e4,signal:c,headers:d?{"content-type":"application/json;"}:{}})).data}catch(i){if(ne(i)&&i.code!=="ERR_CANCELED"){if(((g=i.response)==null?void 0:g.status)===401||((o=i.response)==null?void 0:o.status)===403)throw new _;const a=i.response&&i.response.data&&i.response.data.uuid?i.response.data.uuid:P,m=a!==P?a.slice(0,8):a;throw new E(n+m,a,(u=(l=i.response)==null?void 0:l.data)==null?void 0:u.timestamp)}throw i instanceof Error?new E(i.message):new E(String(i))}},O="ukjent uuid",I=async(e,s,r,n,d)=>{var c,g;try{return(await e.delete(s,{withCredentials:!0,timeout:6e4,signal:d,data:n})).data}catch(o){if(ne(o)&&o.code!=="ERR_CANCELED"){if(((c=o.response)==null?void 0:c.status)===401||((g=o.response)==null?void 0:g.status)===403)throw new _;const l=o.response&&o.response.data&&o.response.data.uuid?o.response.data.uuid:O,u=l!==O?l.slice(0,8):l;throw new E(r+u)}throw o instanceof Error?new E(o.message):new E(String(o))}};/**
 * React Router DOM v6.21.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Ye="startTransition",U=je[Ye];function ze(e){let{basename:s,children:r,future:n,window:d}=e,c=p.useRef();c.current==null&&(c.current=ue({window:d,v5Compat:!0}));let g=c.current,[o,l]=p.useState({action:g.action,location:g.location}),{v7_startTransition:u}=n||{},i=p.useCallback(a=>{u&&U?U(()=>l(a)):l(a)},[l,u]);return p.useLayoutEffect(()=>g.listen(i),[g,i]),p.createElement(me,{basename:s,children:r,location:o.location,navigationType:o.action,navigator:g,future:n})}var F;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(F||(F={}));var q;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(q||(q={}));const se="selectedLocale",Qe=()=>sessionStorage.getItem(se)||"nb",We=e=>{sessionStorage.setItem(se,e)},re=1,G="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Xe=(e,s,r)=>{const n=X(),d=fe(),c=ke(),[g,o]=p.useState(!1),l=p.useRef();return p.useEffect(()=>{g&&(async()=>{o(!1);const a=d[S.CURRENT_PATH];a?(n(a),await te(e,"/storage/engangsstonad",{version:re,locale:s,...d},G)):(await I(e,"/storage/engangsstonad",G),r(!1),c(),n("/")),l.current&&l.current()})().catch(a=>{Ee(a.message),l.current&&l.current()})},[g]),p.useCallback(()=>(o(!0),new Promise(a=>{l.current=a})),[])},oe=e=>{window.location.href=e},Ze=e=>{oe(e+"?redirect="+window.location.origin)},en=(e,s)=>{const r=(s==null?void 0:s.vedlegg.map(n=>n.id))||[];if(Re(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(n=>n.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:r};if(Ie(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(be(e)&&s&&Oe(s))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:s.terminbekreftelsedato,vedleggreferanser:r};throw Error("Det er feil i data om barnet")},V="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",nn=(e,s,r)=>{const n=Se(),[d,c]=p.useState(),g=p.useCallback(async o=>{const l=Z(n(S.OM_BARNET)),u=n(S.DOKUMENTASJON),i=n(S.UTENLANDSOPPHOLD_TIDLIGERE),a=n(S.UTENLANDSOPPHOLD_SENERE),m={type:"engangsstønad",språkkode:s,barn:en(l,u),oppholdIUtlandet:((i==null?void 0:i.utenlandsoppholdSiste12Mnd)||[]).concat((a==null?void 0:a.utenlandsoppholdNeste12Mnd)||[]),vedlegg:(u==null?void 0:u.vedlegg.map(y=>({...y,dokumenterer:{type:"barn"}})))||[]};let L;try{L=await te(e,"/soknad/engangsstonad",m,V,!0,o)}catch(y){if(Je(y))c(y);else throw new Error("This should never happen")}if(L){try{await I(e,"/storage/engangsstonad",V,o)}catch{}r(L)}},[n,s,r,e]);return p.useMemo(()=>({sendSøknad:g,errorSendSøknad:d}),[g,d])},h=$e(M.REST_API_URL),w=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(ce,{size:"2xlarge"})}),x=({error:e})=>e instanceof _?(Ze(M.LOGIN_URL),t.jsx(w,{})):t.jsx(he,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),tn=({locale:e,onChangeLocale:s,søker:r,mellomlagretData:n})=>{const d=X(),[c,g]=p.useState(!1),[o,l]=p.useState(),{sendSøknad:u,errorSendSøknad:i}=nn(h,e,l),a=Xe(h,e,g);return p.useEffect(()=>{n&&n[S.CURRENT_PATH]&&(g(!0),n.locale&&s(n.locale),d(n[S.CURRENT_PATH]))},[n]),o?M.INNSYN?(oe(o.saksNr?`${M.INNSYN}/sak/${o.saksNr}/redirectFromSoknad`:`${M.INNSYN}/redirectFromSoknad`),t.jsx(w,{})):t.jsx("div",{children:"Redirected to Innsyn"}):i?t.jsx(x,{error:i}):t.jsxs(ye,{children:[!c&&t.jsx(k,{path:"*",element:t.jsx(Ae,{to:f.VELKOMMEN})}),t.jsx(k,{path:f.VELKOMMEN,element:t.jsx(He,{locale:e,onChangeLocale:s,startSøknad:g,erVelkommen:c,mellomlagreOgNaviger:a})}),c&&t.jsxs(t.Fragment,{children:[t.jsx(k,{path:f.SØKERSITUASJON,element:t.jsx(qe,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.OM_BARNET,element:t.jsx(Fe,{kjønn:r.kjønn,mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.TERMINBEKREFTELSE,element:t.jsx(D,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.ADOPSJONSBEKREFTELSE,element:t.jsx(D,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.UTENLANDSOPPHOLD,element:t.jsx(Ge,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.TIDLIGERE_UTENLANDSOPPHOLD,element:t.jsx(Ke,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.SENERE_UTENLANDSOPPHOLD,element:t.jsx(Ve,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.OPPSUMMERING,element:t.jsx(Ue,{søker:r,sendSøknad:u,mellomlagreOgNaviger:a})})]})]})};try{h.displayName="esApi",h.__docgenInfo={description:"",displayName:"esApi",props:{}}}catch{}try{w.displayName="Spinner",w.__docgenInfo={description:"",displayName:"Spinner",props:{}}}catch{}try{x.displayName="ApiErrorHandler",x.__docgenInfo={description:"",displayName:"ApiErrorHandler",props:{error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"ApiAccessError | ApiGeneralError"}}}}}catch{}try{EngangsstnadRoutes.displayName="EngangsstnadRoutes",EngangsstnadRoutes.__docgenInfo={description:"",displayName:"EngangsstnadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}},søker:{defaultValue:null,description:"",name:"søker",required:!0,type:{name:"Søker"}},mellomlagretData:{defaultValue:null,description:"",name:"mellomlagretData",required:!1,type:{name:"EsDataMapAndMetaData"}}}}}catch{}const sn=({locale:e,onChangeLocale:s})=>{const r=de();ve(r.formatMessage({id:"Søknad.Pagetitle"}));const{data:n,error:d}=C(h,"/personinfo"),{data:c,loading:g,error:o}=C(h,"/storage/engangsstonad");if(d||o)return t.jsx(x,{error:Z(d||o)});if(!n||g)return t.jsx(w,{});if(!Ne(n.fødselsdato))return t.jsx(Me,{appnavn:"Engangsstønad"});const l=(c==null?void 0:c.version)===re?c:void 0;return t.jsx(we,{initialState:l,children:t.jsx(tn,{locale:e,onChangeLocale:s,søker:n,mellomlagretData:l})})};try{Engangsstnad.displayName="Engangsstnad",Engangsstnad.__docgenInfo={description:"",displayName:"Engangsstnad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}}}}}catch{}const ae=Qe(),rn={nb:{...Te,...R.nb},nn:{...Ce,...R.nn},en:{...Pe,...R.en}};pe.locale(ae);const on=async()=>{try{await I(h,"/storage/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},an=()=>{const[e,s]=p.useState(ae),r=p.useCallback(n=>{We(n),s(n),document.documentElement.setAttribute("lang",n)},[]);return t.jsx(_e,{locale:e,messagesGroupedByLocale:rn,children:t.jsx(xe,{appName:"Engangsstønad",retryCallback:on,children:t.jsx(ze,{children:t.jsx(sn,{locale:e,onChangeLocale:r})})})})},ie=an,ln={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},$n={title:"Applikasjon - Engangsstønad (AppContainer)",component:ie},b=({søker:e,mellomlagretData:s,doLogging:r=!0})=>{Le();const n=new T(h);n.onGet("/personinfo").reply(()=>(r&&console.log("network request: get /personinfo"),[200,e])),n.onGet("/storage/engangsstonad").reply(()=>(r&&console.log("network request: get /storage/engangstonad"),[200,s])),n.onPost("/soknad/engangsstonad").reply(()=>(r&&console.log("network request: post /soknad/engangsstonad"),[200,ln])),n.onPost("/storage/engangsstonad").reply(()=>(r&&console.log("network request: post /storage/engangstonad"),[200])),n.onDelete("/storage/engangsstonad").reply(()=>(r&&console.log("network request: delete /storage/engangstonad"),[200]));const d=new T(De);return d.onPost("/storage/engangsstonad/vedlegg").reply(200),d.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200),t.jsx(ie,{})},A=b.bind({});A.args={søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const v=b.bind({});v.args={mellomlagretData:{version:1,locale:"nb",[S.SØKERSITUASJON]:{situasjon:"fødsel"},[S.CURRENT_PATH]:f.SØKERSITUASJON},søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const N=b.bind({});N.args={søker:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};var K,H,B;A.parameters={...A.parameters,docs:{...(K=A.parameters)==null?void 0:K.docs,source:{originalSource:`({
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
}`,...(W=(Q=N.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};const Yn=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{A as SøkerErKvinne,v as SøkerErKvinneMedMellomlagretData,N as SøkerErMann,Yn as __namedExportsOrder,$n as default};
