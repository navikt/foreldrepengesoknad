var ge=Object.defineProperty;var ce=(e,s,o)=>s in e?ge(e,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[s]=o;var L=(e,s,o)=>(ce(e,typeof s!="symbol"?s+"":s,o),o);import{j as t,p as de,d as pe}from"./fridagerUtils-e9d275e0.js";import{E as v,D as T,M as b}from"./DokumentasjonSteg-7754dbad.js";import{Q as ue,R as me,T as Z,W as fe,X as ke,Y as Ee,C as S,Z as Se,n as ee,_ as he,$ as ye,a0 as k,a1 as Ae,P as f,u as Ne,a2 as ve,a3 as Me,a4 as _e,E as we,a5 as xe,a6 as je,i as Le}from"./useEsNavigator-fef0abd8.js";import{r as p,a as Re}from"./index-f1f2c4b1.js";import{d as ne,e as Ie,c as Ce,b as De,a as Te}from"./OmBarnet-8fde1c9e.js";import{e as be,O as Pe,K as I}from"./OppsummeringSteg-90107058.js";import"./index-c74c9f7f.js";import{n as Oe,a as R,b as Ue,e as qe}from"./en_US-1277f816.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import{O as Ve}from"./OmBarnetSteg-33979349.js";import{S as Fe}from"./SøkersituasjonSteg-f4216aac.js";import{U as Ge}from"./UtenlandsoppholdSteg-98bfab10.js";import{S as Ke}from"./SenereUtenlandsoppholdSteg-a6400ae1.js";import{T as He}from"./TidligereUtenlandsoppholdSteg-3b936e8e.js";import{V as Be}from"./Velkommen-b60da496.js";import"./index-b580f7e8.js";import"./ErrorSummaryHookForm-f951038c.js";import"./isNativeReflectConstruct-554b52b6.js";import"./ExpansionCard-6fd0d9fb.js";import"./Radio-b954752c.js";import"./TidligereUtenlandsoppholdPanel-6a36dafb.js";const{Axios:Dn,AxiosError:Tn,CanceledError:bn,isCancel:Pn,CancelToken:On,VERSION:Un,all:qn,Cancel:Vn,isAxiosError:Je,spread:Fn,toFormData:Gn,AxiosHeaders:Kn,HttpStatusCode:Hn,formToJSON:Bn,getAdapter:Jn,mergeConfig:$n}=ne;class E extends Error{constructor(o,n,d){super(o);L(this,"callId");L(this,"timestamp");this.callId=n,this.timestamp=d}}class _ extends Error{constructor(){super("API_ACCESS_ERROR")}}const $e=e=>e instanceof _||e instanceof E,te=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),P=(e,s)=>{const[o,n]=p.useState(),[d,c]=p.useState(!1),[g,r]=p.useState();return p.useEffect(()=>{let i=!1;return(async()=>{var l,a;try{c(!0);const m=await e.get(s,{withCredentials:!0,timeout:60*1e3});i||n(m.data)}catch(m){Je(m)?((l=m.response)==null?void 0:l.status)===401||((a=m.response)==null?void 0:a.status)===403?r(new _):r(new E(m.message)):m instanceof Error?r(new E(m.message)):r(new E(String(m)))}finally{c(!1)}})(),()=>{i=!0}},[e,s]),{data:o,loading:d,error:g}},Ye=e=>ne.create({baseURL:e,withCredentials:!0}),O="ukjent uuid",se=async(e,s,o,n,d=!1,c)=>{var g,r,i,u;try{return(await e.post(s,o,{withCredentials:!0,timeout:6e4,signal:c,headers:d?{"content-type":"application/json;"}:{}})).data}catch(l){if(te(l)&&l.code!=="ERR_CANCELED"){if(((g=l.response)==null?void 0:g.status)===401||((r=l.response)==null?void 0:r.status)===403)throw new _;const a=l.response&&l.response.data&&l.response.data.uuid?l.response.data.uuid:O,m=a!==O?a.slice(0,8):a;throw new E(n+m,a,(u=(i=l.response)==null?void 0:i.data)==null?void 0:u.timestamp)}throw l instanceof Error?new E(l.message):new E(String(l))}},U="ukjent uuid",C=async(e,s,o,n,d)=>{var c,g;try{return(await e.delete(s,{withCredentials:!0,timeout:6e4,signal:d,data:n})).data}catch(r){if(te(r)&&r.code!=="ERR_CANCELED"){if(((c=r.response)==null?void 0:c.status)===401||((g=r.response)==null?void 0:g.status)===403)throw new _;const i=r.response&&r.response.data&&r.response.data.uuid?r.response.data.uuid:U,u=i!==U?i.slice(0,8):i;throw new E(o+u)}throw r instanceof Error?new E(r.message):new E(String(r))}};/**
 * React Router DOM v6.21.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const ze="startTransition",q=Re[ze];function Qe(e){let{basename:s,children:o,future:n,window:d}=e,c=p.useRef();c.current==null&&(c.current=ue({window:d,v5Compat:!0}));let g=c.current,[r,i]=p.useState({action:g.action,location:g.location}),{v7_startTransition:u}=n||{},l=p.useCallback(a=>{u&&q?q(()=>i(a)):i(a)},[i,u]);return p.useLayoutEffect(()=>g.listen(l),[g,l]),p.createElement(me,{basename:s,children:o,location:r.location,navigationType:r.action,navigator:g,future:n})}var V;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(V||(V={}));var F;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(F||(F={}));const oe="selectedLocale",We=()=>sessionStorage.getItem(oe)||"nb",Xe=e=>{sessionStorage.setItem(oe,e)},re=e=>{window.location.href=e},Ze=e=>{re(e+"?redirect="+window.location.origin)},ae=1,G="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",en=(e,s,o)=>{const n=Z(),d=fe(),c=ke(),[g,r]=p.useState(!1),i=p.useRef();return p.useEffect(()=>{g&&(async()=>{r(!1);const a=d[S.CURRENT_PATH];a?(n(a),await se(e,"/storage/engangsstonad",{version:ae,locale:s,...d},G)):(await C(e,"/storage/engangsstonad",G),o(!1),c(),n("/")),i.current&&i.current()})().catch(a=>{Ee(a.message),i.current&&i.current()})},[g]),p.useCallback(()=>(r(!0),new Promise(a=>{i.current=a})),[])},nn=(e,s)=>{const o=(s==null?void 0:s.vedlegg.map(n=>n.id))||[];if(Ie(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(n=>n.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:o};if(Ce(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(De(e)&&s&&be(s))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:s.terminbekreftelsedato,vedleggreferanser:o};throw Error("Det er feil i data om barnet")},K="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",tn=(e,s,o)=>{const n=Se(),[d,c]=p.useState(),g=p.useCallback(async r=>{const i=ee(n(S.OM_BARNET)),u=n(S.DOKUMENTASJON),l=n(S.UTENLANDSOPPHOLD_TIDLIGERE),a=n(S.UTENLANDSOPPHOLD_SENERE),m={type:"engangsstønad",språkkode:s,barn:nn(i,u),utenlandsopphold:{utenlandsoppholdSiste12Mnd:(l==null?void 0:l.utenlandsoppholdSiste12Mnd)||[],utenlandsoppholdNeste12Mnd:(a==null?void 0:a.utenlandsoppholdNeste12Mnd)||[]},vedlegg:(u==null?void 0:u.vedlegg)||[]};let x;try{x=await se(e,"/soknad/engangsstonad",m,K,!0,r)}catch(j){if($e(j))c(j);else throw new Error("This should never happen")}if(x){try{await C(e,"/storage/engangsstonad",K,r)}catch{}o(x)}},[n,s,o,e]);return p.useMemo(()=>({sendSøknad:g,errorSendSøknad:d}),[g,d])},h=Ye(v.REST_API_URL),M=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(de,{size:"2xlarge"})}),w=({error:e})=>e instanceof _?(Ze(v.LOGIN_URL),t.jsx(M,{})):t.jsx(he,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),sn=({locale:e,onChangeLocale:s,person:o,mellomlagretData:n})=>{const d=Z(),[c,g]=p.useState(!1),[r,i]=p.useState(),{sendSøknad:u,errorSendSøknad:l}=tn(h,e,i),a=en(h,e,g);return p.useEffect(()=>{n&&n[S.CURRENT_PATH]&&(g(!0),n.locale&&s(n.locale),d(n[S.CURRENT_PATH]))},[n]),r?v.INNSYN?(re(r.saksNr?`${v.INNSYN}/sak/${r.saksNr}/redirectFromSoknad`:`${v.INNSYN}/redirectFromSoknad`),t.jsx(M,{})):t.jsx("div",{children:"Redirected to Innsyn"}):l?t.jsx(w,{error:l}):t.jsxs(ye,{children:[!c&&t.jsx(k,{path:"*",element:t.jsx(Ae,{to:f.VELKOMMEN})}),t.jsx(k,{path:f.VELKOMMEN,element:t.jsx(Be,{locale:e,onChangeLocale:s,startSøknad:g,erVelkommen:c,mellomlagreOgNaviger:a})}),c&&t.jsxs(t.Fragment,{children:[t.jsx(k,{path:f.SØKERSITUASJON,element:t.jsx(Fe,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.OM_BARNET,element:t.jsx(Ve,{kjønn:o.kjønn,mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.TERMINBEKREFTELSE,element:t.jsx(T,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.ADOPSJONSBEKREFTELSE,element:t.jsx(T,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.UTENLANDSOPPHOLD,element:t.jsx(Ge,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.TIDLIGERE_UTENLANDSOPPHOLD,element:t.jsx(He,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.SENERE_UTENLANDSOPPHOLD,element:t.jsx(Ke,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.OPPSUMMERING,element:t.jsx(Pe,{person:o,sendSøknad:u,mellomlagreOgNaviger:a})})]})]})};try{h.displayName="esApi",h.__docgenInfo={description:"",displayName:"esApi",props:{}}}catch{}try{M.displayName="Spinner",M.__docgenInfo={description:"",displayName:"Spinner",props:{}}}catch{}try{w.displayName="ApiErrorHandler",w.__docgenInfo={description:"",displayName:"ApiErrorHandler",props:{error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"ApiAccessError | ApiGeneralError"}}}}}catch{}try{EngangsstnadRoutes.displayName="EngangsstnadRoutes",EngangsstnadRoutes.__docgenInfo={description:"",displayName:"EngangsstnadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}},person:{defaultValue:null,description:"",name:"person",required:!0,type:{name:"Person"}},mellomlagretData:{defaultValue:null,description:"",name:"mellomlagretData",required:!1,type:{name:"EsDataMapAndMetaData"}}}}}catch{}const on=({locale:e,onChangeLocale:s})=>{const{i18n:o}=Ne();ve(o("Søknad.Pagetitle"));const{data:n,error:d}=P(h,"/personinfo"),{data:c,loading:g,error:r}=P(h,"/storage/engangsstonad");if(d||r)return t.jsx(w,{error:ee(d||r)});if(!n||g)return t.jsx(M,{});if(!Me(n.fødselsdato))return t.jsx(_e,{appnavn:"Engangsstønad"});const i=(c==null?void 0:c.version)===ae?c:void 0;return t.jsx(we,{initialState:i,children:t.jsx(sn,{locale:e,onChangeLocale:s,person:n,mellomlagretData:i})})};try{Engangsstnad.displayName="Engangsstnad",Engangsstnad.__docgenInfo={description:"",displayName:"Engangsstnad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}}}}}catch{}const le=We(),rn={nb:{...Oe,...R.nb},nn:{...Ue,...R.nn},en:{...qe,...R.en}};pe.locale(le);const an=async()=>{try{await C(h,"/storage/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},ln=()=>{const[e,s]=p.useState(le),o=p.useCallback(n=>{Xe(n),s(n),document.documentElement.setAttribute("lang",n)},[]);return t.jsx(xe,{locale:e,messagesGroupedByLocale:rn,children:t.jsx(je,{appName:"Engangsstønad",retryCallback:an,children:t.jsx(Qe,{children:t.jsx(on,{locale:e,onChangeLocale:o})})})})},ie=ln,gn={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},Yn={title:"Applikasjon - Engangsstønad (AppContainer)",component:ie},D=({person:e,mellomlagretData:s,doLogging:o=!0})=>{Le();const n=new b(h);n.onGet("/personinfo").reply(()=>(o&&console.log("network request: get /personinfo"),[200,e])),n.onGet("/storage/engangsstonad").reply(()=>(o&&console.log("network request: get /storage/engangstonad"),[200,s])),n.onPost("/soknad/engangsstonad").reply(()=>(o&&console.log("network request: post /soknad/engangsstonad"),[200,gn])),n.onPost("/storage/engangsstonad").reply(()=>(o&&console.log("network request: post /storage/engangstonad"),[200])),n.onDelete("/storage/engangsstonad").reply(()=>(o&&console.log("network request: delete /storage/engangstonad"),[200]));const d=new b(Te);return d.onPost("/storage/engangsstonad/vedlegg").reply(200),d.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200),t.jsx(ie,{})},y=D.bind({});y.args={person:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:I.KVINNE,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};const A=D.bind({});A.args={mellomlagretData:{version:1,locale:"nb",[S.SØKERSITUASJON]:{situasjon:"fødsel"},[S.CURRENT_PATH]:f.SØKERSITUASJON},person:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:I.KVINNE,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};const N=D.bind({});N.args={person:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:I.MANN,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};var H,B,J;y.parameters={...y.parameters,docs:{...(H=y.parameters)==null?void 0:H.docs,source:{originalSource:`({
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
}`,...(J=(B=y.parameters)==null?void 0:B.docs)==null?void 0:J.source}}};var $,Y,z;A.parameters={...A.parameters,docs:{...($=A.parameters)==null?void 0:$.docs,source:{originalSource:`({
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
}`,...(z=(Y=A.parameters)==null?void 0:Y.docs)==null?void 0:z.source}}};var Q,W,X;N.parameters={...N.parameters,docs:{...(Q=N.parameters)==null?void 0:Q.docs,source:{originalSource:`({
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
}`,...(X=(W=N.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};const zn=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{y as SøkerErKvinne,A as SøkerErKvinneMedMellomlagretData,N as SøkerErMann,zn as __namedExportsOrder,Yn as default};
