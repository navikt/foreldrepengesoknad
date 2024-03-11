var ie=Object.defineProperty;var le=(e,s,r)=>s in e?ie(e,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[s]=r;var j=(e,s,r)=>(le(e,typeof s!="symbol"?s+"":s,r),r);import{j as t,u as ge}from"./index-b829706d.js";import{$ as ce,a0 as de,a1 as W,a2 as pe,a3 as ue,a4 as me,C as S,a5 as fe,n as X,a6 as ke,a7 as Ee,a8 as Se,a9 as k,aa as he,P as f,ab as ye,ac as Ae,ad as ve,E as Ne,d as Me,ae as we,af as _e,i as xe}from"./useEsNavigator-1fee33b1.js";import{E as M,D as b,M as D}from"./DokumentasjonSteg-e7ce8bad.js";import{r as p,a as Le}from"./index-f1f2c4b1.js";import{b as Z,e as je,c as Re,d as Ie,a as be}from"./OmBarnet-c2933a6c.js";import"./index-c74c9f7f.js";import{e as De,O as Te}from"./OppsummeringSteg-b2d2e81e.js";import{O as Ce}from"./OmBarnetSteg-66b51dec.js";import{S as Pe}from"./SøkersituasjonSteg-fd7c4a86.js";import{U as Oe}from"./UtenlandsoppholdSteg-2502ec1e.js";import{S as Ue}from"./SenereUtenlandsoppholdSteg-3aaed230.js";import{T as Fe}from"./TidligereUtenlandsoppholdSteg-d8844338.js";import{V as qe}from"./Velkommen-82df01e5.js";import{n as Ge,a as Ve,e as Ke}from"./nn_NO-69933817.js";import"./index-b580f7e8.js";import"./ErrorSummaryHookForm-bc7131af.js";import"./isNativeReflectConstruct-554b52b6.js";import"./ExpansionCard-bd825b8d.js";import"./Radio-e22038aa.js";import"./TidligereUtenlandsoppholdPanel-c244870b.js";const{Axios:jn,AxiosError:Rn,CanceledError:In,isCancel:bn,CancelToken:Dn,VERSION:Tn,all:Cn,Cancel:Pn,isAxiosError:He,spread:On,toFormData:Un,AxiosHeaders:Fn,HttpStatusCode:qn,formToJSON:Gn,getAdapter:Vn,mergeConfig:Kn}=Z;class E extends Error{constructor(r,n,d){super(r);j(this,"callId");j(this,"timestamp");this.callId=n,this.timestamp=d}}class _ extends Error{constructor(){super("API_ACCESS_ERROR")}}const Be=e=>e instanceof _||e instanceof E,ee=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),T=(e,s)=>{const[r,n]=p.useState(),[d,c]=p.useState(!1),[g,o]=p.useState();return p.useEffect(()=>{let l=!1;return(async()=>{var i,a;try{c(!0);const m=await e.get(s,{withCredentials:!0,timeout:60*1e3});l||n(m.data)}catch(m){He(m)?((i=m.response)==null?void 0:i.status)===401||((a=m.response)==null?void 0:a.status)===403?o(new _):o(new E(m.message)):m instanceof Error?o(new E(m.message)):o(new E(String(m)))}finally{c(!1)}})(),()=>{l=!0}},[e,s]),{data:r,loading:d,error:g}},Je=e=>Z.create({baseURL:e,withCredentials:!0}),C="ukjent uuid",ne=async(e,s,r,n,d=!1,c)=>{var g,o,l,u;try{return(await e.post(s,r,{withCredentials:!0,timeout:6e4,signal:c,headers:d?{"content-type":"application/json;"}:{}})).data}catch(i){if(ee(i)&&i.code!=="ERR_CANCELED"){if(((g=i.response)==null?void 0:g.status)===401||((o=i.response)==null?void 0:o.status)===403)throw new _;const a=i.response&&i.response.data&&i.response.data.uuid?i.response.data.uuid:C,m=a!==C?a.slice(0,8):a;throw new E(n+m,a,(u=(l=i.response)==null?void 0:l.data)==null?void 0:u.timestamp)}throw i instanceof Error?new E(i.message):new E(String(i))}},P="ukjent uuid",R=async(e,s,r,n,d)=>{var c,g;try{return(await e.delete(s,{withCredentials:!0,timeout:6e4,signal:d,data:n})).data}catch(o){if(ee(o)&&o.code!=="ERR_CANCELED"){if(((c=o.response)==null?void 0:c.status)===401||((g=o.response)==null?void 0:g.status)===403)throw new _;const l=o.response&&o.response.data&&o.response.data.uuid?o.response.data.uuid:P,u=l!==P?l.slice(0,8):l;throw new E(r+u)}throw o instanceof Error?new E(o.message):new E(String(o))}};/**
 * React Router DOM v6.21.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const $e="startTransition",O=Le[$e];function Ye(e){let{basename:s,children:r,future:n,window:d}=e,c=p.useRef();c.current==null&&(c.current=ce({window:d,v5Compat:!0}));let g=c.current,[o,l]=p.useState({action:g.action,location:g.location}),{v7_startTransition:u}=n||{},i=p.useCallback(a=>{u&&O?O(()=>l(a)):l(a)},[l,u]);return p.useLayoutEffect(()=>g.listen(i),[g,i]),p.createElement(de,{basename:s,children:r,location:o.location,navigationType:o.action,navigator:g,future:n})}var U;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(U||(U={}));var F;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(F||(F={}));const te=e=>{window.location.href=e},ze=e=>{te(e+"?redirect="+window.location.origin)},se="selectedLocale",Qe=()=>sessionStorage.getItem(se)||"nb",We=e=>{sessionStorage.setItem(se,e)},re=1,q="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Xe=(e,s,r)=>{const n=W(),d=pe(),c=ue(),[g,o]=p.useState(!1),l=p.useRef();return p.useEffect(()=>{g&&(async()=>{o(!1);const a=d[S.CURRENT_PATH];a?(n(a),await ne(e,"/storage/engangsstonad",{version:re,locale:s,...d},q)):(await R(e,"/storage/engangsstonad",q),r(!1),c(),n("/")),l.current&&l.current()})().catch(a=>{me(a.message),l.current&&l.current()})},[g]),p.useCallback(()=>(o(!0),new Promise(a=>{l.current=a})),[])},Ze=(e,s)=>{const r=(s==null?void 0:s.vedlegg.map(n=>n.id))||[];if(je(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(n=>n.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:r};if(Re(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(Ie(e)&&s&&De(s))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:s.terminbekreftelsedato,vedleggreferanser:r};throw Error("Det er feil i data om barnet")},G="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",en=(e,s,r)=>{const n=fe(),[d,c]=p.useState(),g=p.useCallback(async o=>{const l=X(n(S.OM_BARNET)),u=n(S.DOKUMENTASJON),i=n(S.UTENLANDSOPPHOLD_TIDLIGERE),a=n(S.UTENLANDSOPPHOLD_SENERE),m={type:"engangsstønad",språkkode:s,barn:Ze(l,u),oppholdIUtlandet:((i==null?void 0:i.utenlandsoppholdSiste12Mnd)||[]).concat((a==null?void 0:a.utenlandsoppholdNeste12Mnd)||[]),vedlegg:(u==null?void 0:u.vedlegg.map(y=>({...y,dokumenterer:{type:"barn"}})))||[]};let L;try{L=await ne(e,"/soknad/engangsstonad",m,G,!0,o)}catch(y){if(Be(y))c(y);else throw new Error("This should never happen")}if(L){try{await R(e,"/storage/engangsstonad",G,o)}catch{}r(L)}},[n,s,r,e]);return p.useMemo(()=>({sendSøknad:g,errorSendSøknad:d}),[g,d])},h=Je(M.REST_API_URL),w=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(ke,{size:"2xlarge"})}),x=({error:e})=>e instanceof _?(ze(M.LOGIN_URL),t.jsx(w,{})):t.jsx(Ee,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),nn=({locale:e,onChangeLocale:s,søker:r,mellomlagretData:n})=>{const d=W(),[c,g]=p.useState(!1),[o,l]=p.useState(),{sendSøknad:u,errorSendSøknad:i}=en(h,e,l),a=Xe(h,e,g);return p.useEffect(()=>{n&&n[S.CURRENT_PATH]&&(g(!0),n.locale&&s(n.locale),d(n[S.CURRENT_PATH]))},[n]),o?M.INNSYN?(te(o.saksNr?`${M.INNSYN}/sak/${o.saksNr}/redirectFromSoknad`:`${M.INNSYN}/redirectFromSoknad`),t.jsx(w,{})):t.jsx("div",{children:"Redirected to Innsyn"}):i?t.jsx(x,{error:i}):t.jsxs(Se,{children:[!c&&t.jsx(k,{path:"*",element:t.jsx(he,{to:f.VELKOMMEN})}),t.jsx(k,{path:f.VELKOMMEN,element:t.jsx(qe,{locale:e,onChangeLocale:s,startSøknad:g,erVelkommen:c,mellomlagreOgNaviger:a})}),c&&t.jsxs(t.Fragment,{children:[t.jsx(k,{path:f.SØKERSITUASJON,element:t.jsx(Pe,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.OM_BARNET,element:t.jsx(Ce,{kjønn:r.kjønn,mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.TERMINBEKREFTELSE,element:t.jsx(b,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.ADOPSJONSBEKREFTELSE,element:t.jsx(b,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.UTENLANDSOPPHOLD,element:t.jsx(Oe,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.TIDLIGERE_UTENLANDSOPPHOLD,element:t.jsx(Fe,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.SENERE_UTENLANDSOPPHOLD,element:t.jsx(Ue,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.OPPSUMMERING,element:t.jsx(Te,{søker:r,sendSøknad:u,mellomlagreOgNaviger:a})})]})]})};try{h.displayName="esApi",h.__docgenInfo={description:"",displayName:"esApi",props:{}}}catch{}try{w.displayName="Spinner",w.__docgenInfo={description:"",displayName:"Spinner",props:{}}}catch{}try{x.displayName="ApiErrorHandler",x.__docgenInfo={description:"",displayName:"ApiErrorHandler",props:{error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"ApiAccessError | ApiGeneralError"}}}}}catch{}try{EngangsstnadRoutes.displayName="EngangsstnadRoutes",EngangsstnadRoutes.__docgenInfo={description:"",displayName:"EngangsstnadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}},søker:{defaultValue:null,description:"",name:"søker",required:!0,type:{name:"Søker"}},mellomlagretData:{defaultValue:null,description:"",name:"mellomlagretData",required:!1,type:{name:"EsDataMapAndMetaData"}}}}}catch{}const tn=({locale:e,onChangeLocale:s})=>{const r=ge();ye(r.formatMessage({id:"Søknad.Pagetitle"}));const{data:n,error:d}=T(h,"/personinfo"),{data:c,loading:g,error:o}=T(h,"/storage/engangsstonad");if(d||o)return t.jsx(x,{error:X(d||o)});if(!n||g)return t.jsx(w,{});if(!Ae(n.fødselsdato))return t.jsx(ve,{appnavn:"Engangsstønad"});const l=(c==null?void 0:c.version)===re?c:void 0;return t.jsx(Ne,{initialState:l,children:t.jsx(nn,{locale:e,onChangeLocale:s,søker:n,mellomlagretData:l})})};try{Engangsstnad.displayName="Engangsstnad",Engangsstnad.__docgenInfo={description:"",displayName:"Engangsstnad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}}}}}catch{}const oe=Qe(),sn={nb:Ge,nn:Ve,en:Ke};Me.locale(oe);const rn=async()=>{try{await R(h,"/storage/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},on=()=>{const[e,s]=p.useState(oe),r=p.useCallback(n=>{We(n),s(n),document.documentElement.setAttribute("lang",n)},[]);return t.jsx(we,{locale:e,messagesGroupedByLocale:sn,children:t.jsx(_e,{appName:"Engangsstønad",retryCallback:rn,children:t.jsx(Ye,{children:t.jsx(tn,{locale:e,onChangeLocale:r})})})})},ae=on,an={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},Hn={title:"Applikasjon - Engangsstønad (AppContainer)",component:ae},I=({søker:e,mellomlagretData:s,doLogging:r=!0})=>{xe();const n=new D(h);n.onGet("/personinfo").reply(()=>(r&&console.log("network request: get /personinfo"),[200,e])),n.onGet("/storage/engangsstonad").reply(()=>(r&&console.log("network request: get /storage/engangstonad"),[200,s])),n.onPost("/soknad/engangsstonad").reply(()=>(r&&console.log("network request: post /soknad/engangsstonad"),[200,an])),n.onPost("/storage/engangsstonad").reply(()=>(r&&console.log("network request: post /storage/engangstonad"),[200])),n.onDelete("/storage/engangsstonad").reply(()=>(r&&console.log("network request: delete /storage/engangstonad"),[200]));const d=new D(be);return d.onPost("/storage/engangsstonad/vedlegg").reply(200),d.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200),t.jsx(ae,{})},A=I.bind({});A.args={søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const v=I.bind({});v.args={mellomlagretData:{version:1,locale:"nb",[S.SØKERSITUASJON]:{situasjon:"fødsel"},[S.CURRENT_PATH]:f.SØKERSITUASJON},søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const N=I.bind({});N.args={søker:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};var V,K,H;A.parameters={...A.parameters,docs:{...(V=A.parameters)==null?void 0:V.docs,source:{originalSource:`({
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
}`,...(H=(K=A.parameters)==null?void 0:K.docs)==null?void 0:H.source}}};var B,J,$;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`({
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
}`,...($=(J=v.parameters)==null?void 0:J.docs)==null?void 0:$.source}}};var Y,z,Q;N.parameters={...N.parameters,docs:{...(Y=N.parameters)==null?void 0:Y.docs,source:{originalSource:`({
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
}`,...(Q=(z=N.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};const Bn=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{A as SøkerErKvinne,v as SøkerErKvinneMedMellomlagretData,N as SøkerErMann,Bn as __namedExportsOrder,Hn as default};
