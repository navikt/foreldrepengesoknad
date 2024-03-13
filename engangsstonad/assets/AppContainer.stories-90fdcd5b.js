var le=Object.defineProperty;var ie=(e,s,r)=>s in e?le(e,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[s]=r;var j=(e,s,r)=>(ie(e,typeof s!="symbol"?s+"":s,r),r);import{j as t,u as ge}from"./index-b829706d.js";import{Y as ce,Z as de,_ as Q,$ as pe,a0 as ue,a1 as me,C as S,a2 as fe,n as W,a3 as ke,a4 as Ee,a5 as Se,a6 as k,a7 as he,P as f,a8 as ye,a9 as Ae,aa as ve,E as Ne,d as Me,ab as _e,ac as we,i as xe}from"./useEsNavigator-3da59353.js";import{E as M,D as b,M as D}from"./DokumentasjonSteg-dfe1f43f.js";import{r as p,a as Le}from"./index-f1f2c4b1.js";import{b as X,e as je,c as Re,d as Ie,a as be}from"./OmBarnet-c2933a6c.js";import"./index-c74c9f7f.js";import{e as De,O as Te}from"./OppsummeringSteg-fcd764f2.js";import{O as Ce}from"./OmBarnetSteg-16190a28.js";import{S as Pe}from"./SøkersituasjonSteg-dc33b1ff.js";import{U as Oe}from"./UtenlandsoppholdSteg-d414b80c.js";import{S as Ue}from"./SenereUtenlandsoppholdSteg-b5b35052.js";import{T as Fe}from"./TidligereUtenlandsoppholdSteg-fcb30715.js";import{V as qe}from"./Velkommen-7f7bfda4.js";import{n as Ge,a as Ve,e as Ke}from"./nn_NO-69933817.js";import"./index-b580f7e8.js";import"./ErrorSummaryHookForm-2742172e.js";import"./ExpansionCard-7b88ec1f.js";import"./TidligereUtenlandsoppholdPanel-5cac4718.js";const{Axios:xn,AxiosError:Ln,CanceledError:jn,isCancel:Rn,CancelToken:In,VERSION:bn,all:Dn,Cancel:Tn,isAxiosError:He,spread:Cn,toFormData:Pn,AxiosHeaders:On,HttpStatusCode:Un,formToJSON:Fn,getAdapter:qn,mergeConfig:Gn}=X;class E extends Error{constructor(r,n,d){super(r);j(this,"callId");j(this,"timestamp");this.callId=n,this.timestamp=d}}class w extends Error{constructor(){super("API_ACCESS_ERROR")}}const Be=e=>e instanceof w||e instanceof E,ee=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),T=(e,s)=>{const[r,n]=p.useState(),[d,c]=p.useState(!1),[g,o]=p.useState();return p.useEffect(()=>{let i=!1;return(async()=>{var l,a;try{c(!0);const m=await e.get(s,{withCredentials:!0,timeout:60*1e3});i||n(m.data)}catch(m){He(m)?((l=m.response)==null?void 0:l.status)===401||((a=m.response)==null?void 0:a.status)===403?o(new w):o(new E(m.message)):m instanceof Error?o(new E(m.message)):o(new E(String(m)))}finally{c(!1)}})(),()=>{i=!0}},[e,s]),{data:r,loading:d,error:g}},Je=e=>X.create({baseURL:e,withCredentials:!0}),C="ukjent uuid",ne=async(e,s,r,n,d=!1,c)=>{var g,o,i,u;try{return(await e.post(s,r,{withCredentials:!0,timeout:6e4,signal:c,headers:d?{"content-type":"application/json;"}:{}})).data}catch(l){if(ee(l)&&l.code!=="ERR_CANCELED"){if(((g=l.response)==null?void 0:g.status)===401||((o=l.response)==null?void 0:o.status)===403)throw new w;const a=l.response&&l.response.data&&l.response.data.uuid?l.response.data.uuid:C,m=a!==C?a.slice(0,8):a;throw new E(n+m,a,(u=(i=l.response)==null?void 0:i.data)==null?void 0:u.timestamp)}throw l instanceof Error?new E(l.message):new E(String(l))}},P="ukjent uuid",R=async(e,s,r,n,d)=>{var c,g;try{return(await e.delete(s,{withCredentials:!0,timeout:6e4,signal:d,data:n})).data}catch(o){if(ee(o)&&o.code!=="ERR_CANCELED"){if(((c=o.response)==null?void 0:c.status)===401||((g=o.response)==null?void 0:g.status)===403)throw new w;const i=o.response&&o.response.data&&o.response.data.uuid?o.response.data.uuid:P,u=i!==P?i.slice(0,8):i;throw new E(r+u)}throw o instanceof Error?new E(o.message):new E(String(o))}};/**
 * React Router DOM v6.21.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const $e="startTransition",O=Le[$e];function Ye(e){let{basename:s,children:r,future:n,window:d}=e,c=p.useRef();c.current==null&&(c.current=ce({window:d,v5Compat:!0}));let g=c.current,[o,i]=p.useState({action:g.action,location:g.location}),{v7_startTransition:u}=n||{},l=p.useCallback(a=>{u&&O?O(()=>i(a)):i(a)},[i,u]);return p.useLayoutEffect(()=>g.listen(l),[g,l]),p.createElement(de,{basename:s,children:r,location:o.location,navigationType:o.action,navigator:g,future:n})}var U;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(U||(U={}));var F;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(F||(F={}));const te=e=>{window.location.href=e},ze=e=>{te(e+"?redirect="+window.location.origin)},se="selectedLocale",Ze=()=>sessionStorage.getItem(se)||"nb",Qe=e=>{sessionStorage.setItem(se,e)},re=1,q="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",We=(e,s,r)=>{const n=Q(),d=pe(),c=ue(),[g,o]=p.useState(!1),i=p.useRef();return p.useEffect(()=>{g&&(async()=>{o(!1);const a=d[S.CURRENT_PATH];a?(n(a),await ne(e,"/storage/engangsstonad",{version:re,locale:s,...d},q)):(await R(e,"/storage/engangsstonad",q),r(!1),c(),n("/")),i.current&&i.current()})().catch(a=>{me(a.message),i.current&&i.current()})},[g]),p.useCallback(()=>(o(!0),new Promise(a=>{i.current=a})),[])},Xe=(e,s)=>{const r=(s==null?void 0:s.vedlegg.map(n=>n.id))||[];if(je(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(n=>n.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:r};if(Re(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(Ie(e)&&s&&De(s))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:s.terminbekreftelsedato,vedleggreferanser:r};throw Error("Det er feil i data om barnet")},G="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",en=(e,s,r)=>{const n=fe(),[d,c]=p.useState(),g=p.useCallback(async o=>{const i=W(n(S.OM_BARNET)),u=n(S.DOKUMENTASJON),l=n(S.UTENLANDSOPPHOLD_TIDLIGERE),a=n(S.UTENLANDSOPPHOLD_SENERE),m={type:"engangsstønad",språkkode:s,barn:Xe(i,u),oppholdIUtlandet:((l==null?void 0:l.utenlandsoppholdSiste12Mnd)||[]).concat((a==null?void 0:a.utenlandsoppholdNeste12Mnd)||[]),vedlegg:(u==null?void 0:u.vedlegg.map(y=>({...y,dokumenterer:{type:"barn"}})))||[]};let L;try{L=await ne(e,"/soknad/engangsstonad",m,G,!0,o)}catch(y){if(Be(y))c(y);else throw new Error("This should never happen")}if(L){try{await R(e,"/storage/engangsstonad",G,o)}catch{}r(L)}},[n,s,r,e]);return p.useMemo(()=>({sendSøknad:g,errorSendSøknad:d}),[g,d])},h=Je(M.REST_API_URL),_=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(ke,{size:"2xlarge"})}),x=({error:e})=>e instanceof w?(ze(M.LOGIN_URL),t.jsx(_,{})):t.jsx(Ee,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),nn=({locale:e,onChangeLocale:s,søker:r,mellomlagretData:n})=>{const d=Q(),[c,g]=p.useState(!1),[o,i]=p.useState(),{sendSøknad:u,errorSendSøknad:l}=en(h,e,i),a=We(h,e,g);return p.useEffect(()=>{n&&n[S.CURRENT_PATH]&&(g(!0),n.locale&&s(n.locale),d(n[S.CURRENT_PATH]))},[n]),o?M.INNSYN?(te(o.saksNr?`${M.INNSYN}/sak/${o.saksNr}/redirectFromSoknad`:`${M.INNSYN}/redirectFromSoknad`),t.jsx(_,{})):t.jsx("div",{children:"Redirected to Innsyn"}):l?t.jsx(x,{error:l}):t.jsxs(Se,{children:[!c&&t.jsx(k,{path:"*",element:t.jsx(he,{to:f.VELKOMMEN})}),t.jsx(k,{path:f.VELKOMMEN,element:t.jsx(qe,{locale:e,onChangeLocale:s,startSøknad:g,erVelkommen:c,mellomlagreOgNaviger:a})}),c&&t.jsxs(t.Fragment,{children:[t.jsx(k,{path:f.SØKERSITUASJON,element:t.jsx(Pe,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.OM_BARNET,element:t.jsx(Ce,{kjønn:r.kjønn,mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.TERMINBEKREFTELSE,element:t.jsx(b,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.ADOPSJONSBEKREFTELSE,element:t.jsx(b,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.UTENLANDSOPPHOLD,element:t.jsx(Oe,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.TIDLIGERE_UTENLANDSOPPHOLD,element:t.jsx(Fe,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.SENERE_UTENLANDSOPPHOLD,element:t.jsx(Ue,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.OPPSUMMERING,element:t.jsx(Te,{søker:r,sendSøknad:u,mellomlagreOgNaviger:a})})]})]})};try{h.displayName="esApi",h.__docgenInfo={description:"",displayName:"esApi",props:{}}}catch{}try{_.displayName="Spinner",_.__docgenInfo={description:"",displayName:"Spinner",props:{}}}catch{}try{x.displayName="ApiErrorHandler",x.__docgenInfo={description:"",displayName:"ApiErrorHandler",props:{error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"ApiAccessError | ApiGeneralError"}}}}}catch{}try{EngangsstnadRoutes.displayName="EngangsstnadRoutes",EngangsstnadRoutes.__docgenInfo={description:"",displayName:"EngangsstnadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}},søker:{defaultValue:null,description:"",name:"søker",required:!0,type:{name:"Søker"}},mellomlagretData:{defaultValue:null,description:"",name:"mellomlagretData",required:!1,type:{name:"EsDataMapAndMetaData"}}}}}catch{}const tn=({locale:e,onChangeLocale:s})=>{const r=ge();ye(r.formatMessage({id:"Søknad.Pagetitle"}));const{data:n,error:d}=T(h,"/personinfo"),{data:c,loading:g,error:o}=T(h,"/storage/engangsstonad");if(d||o)return t.jsx(x,{error:W(d||o)});if(!n||g)return t.jsx(_,{});if(!Ae(n.fødselsdato))return t.jsx(ve,{appnavn:"Engangsstønad"});const i=(c==null?void 0:c.version)===re?c:void 0;return t.jsx(Ne,{initialState:i,children:t.jsx(nn,{locale:e,onChangeLocale:s,søker:n,mellomlagretData:i})})};try{Engangsstnad.displayName="Engangsstnad",Engangsstnad.__docgenInfo={description:"",displayName:"Engangsstnad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}}}}}catch{}const oe=Ze(),sn={nb:Ge,nn:Ve,en:Ke};Me.locale(oe);const rn=async()=>{try{await R(h,"/storage/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},on=()=>{const[e,s]=p.useState(oe),r=p.useCallback(n=>{Qe(n),s(n),document.documentElement.setAttribute("lang",n)},[]);return t.jsx(_e,{locale:e,messagesGroupedByLocale:sn,children:t.jsx(we,{appName:"Engangsstønad",retryCallback:rn,children:t.jsx(Ye,{children:t.jsx(tn,{locale:e,onChangeLocale:r})})})})},ae=on,an={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},Vn={title:"Applikasjon - Engangsstønad (AppContainer)",component:ae},I=({søker:e,mellomlagretData:s,doLogging:r=!0})=>{xe();const n=new D(h);n.onGet("/personinfo").reply(()=>(r&&console.log("network request: get /personinfo"),[200,e])),n.onGet("/storage/engangsstonad").reply(()=>(r&&console.log("network request: get /storage/engangstonad"),[200,s])),n.onPost("/soknad/engangsstonad").reply(()=>(r&&console.log("network request: post /soknad/engangsstonad"),[200,an])),n.onPost("/storage/engangsstonad").reply(()=>(r&&console.log("network request: post /storage/engangstonad"),[200])),n.onDelete("/storage/engangsstonad").reply(()=>(r&&console.log("network request: delete /storage/engangstonad"),[200]));const d=new D(be);return d.onPost("/storage/engangsstonad/vedlegg").reply(200),d.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200),t.jsx(ae,{})},A=I.bind({});A.args={søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const v=I.bind({});v.args={mellomlagretData:{version:1,locale:"nb",[S.SØKERSITUASJON]:{situasjon:"fødsel"},[S.CURRENT_PATH]:f.SØKERSITUASJON},søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const N=I.bind({});N.args={søker:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};var V,K,H;A.parameters={...A.parameters,docs:{...(V=A.parameters)==null?void 0:V.docs,source:{originalSource:`({
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
}`,...($=(J=v.parameters)==null?void 0:J.docs)==null?void 0:$.source}}};var Y,z,Z;N.parameters={...N.parameters,docs:{...(Y=N.parameters)==null?void 0:Y.docs,source:{originalSource:`({
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
}`,...(Z=(z=N.parameters)==null?void 0:z.docs)==null?void 0:Z.source}}};const Kn=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{A as SøkerErKvinne,v as SøkerErKvinneMedMellomlagretData,N as SøkerErMann,Kn as __namedExportsOrder,Vn as default};
