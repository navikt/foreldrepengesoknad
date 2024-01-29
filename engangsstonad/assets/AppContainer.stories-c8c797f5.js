var ge=Object.defineProperty;var ce=(e,s,r)=>s in e?ge(e,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[s]=r;var L=(e,s,r)=>(ce(e,typeof s!="symbol"?s+"":s,r),r);import{j as t,p as de,d as pe}from"./fridagerUtils-e9d275e0.js";import{E as M,D as b,M as P}from"./DokumentasjonSteg-167a8199.js";import{Q as ue,R as me,T as fe,n as I,C as h,W as ee,X as ke,Y as Ee,Z as Se,_ as he,$ as E,a0 as ye,P as f,u as Ae,a1 as Ne,a2 as ve,a3 as Me,E as _e,a4 as we,a5 as xe,i as je}from"./useEsNavigator-9015f214.js";import{r as p,a as Le}from"./index-f1f2c4b1.js";import{d as ne,e as Re,c as Ie,b as Ce,a as De}from"./OmBarnet-8fde1c9e.js";import{e as Te,O as be,K as C}from"./OppsummeringSteg-9e675bdf.js";import"./index-c74c9f7f.js";import{n as Pe,a as R,b as Oe,e as Ue}from"./en_US-1277f816.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import{S as qe}from"./SøkersituasjonSteg-079d81ad.js";import{V as Ve}from"./Velkommen-a629b7af.js";import{O as Fe}from"./OmBarnetSteg-013f8df5.js";import{U as Ge}from"./UtenlandsoppholdSteg-18c548cf.js";import{S as Ke}from"./SenereUtenlandsoppholdSteg-bd0c77b8.js";import{T as He}from"./TidligereUtenlandsoppholdSteg-a99eacee.js";import"./index-b580f7e8.js";import"./ErrorSummaryHookForm-cfdc4992.js";import"./isNativeReflectConstruct-554b52b6.js";import"./ExpansionCard-6fd0d9fb.js";import"./Radio-e4342e87.js";import"./TidligereUtenlandsoppholdPanel-9039f7e9.js";const{Axios:Cn,AxiosError:Dn,CanceledError:Tn,isCancel:bn,CancelToken:Pn,VERSION:On,all:Un,Cancel:qn,isAxiosError:Be,spread:Vn,toFormData:Fn,AxiosHeaders:Gn,HttpStatusCode:Kn,formToJSON:Hn,getAdapter:Bn,mergeConfig:Jn}=ne;class S extends Error{constructor(r,n,c){super(r);L(this,"callId");L(this,"timestamp");this.callId=n,this.timestamp=c}}class w extends Error{constructor(){super("API_ACCESS_ERROR")}}const Je=e=>e instanceof w||e instanceof S,te=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),O=(e,s)=>{const[r,n]=p.useState(),[c,g]=p.useState(!1),[i,o]=p.useState();return p.useEffect(()=>{let d=!1;return(async()=>{var a,l;try{g(!0);const m=await e.get(s,{withCredentials:!0,timeout:60*1e3});d||n(m.data)}catch(m){Be(m)?((a=m.response)==null?void 0:a.status)===401||((l=m.response)==null?void 0:l.status)===403?o(new w):o(new S(m.message)):m instanceof Error?o(new S(m.message)):o(new S(String(m)))}finally{g(!1)}})(),()=>{d=!0}},[e,s]),{data:r,loading:c,error:i}},$e=e=>ne.create({baseURL:e,withCredentials:!0}),U="ukjent uuid",se=async(e,s,r,n,c=!1,g)=>{var i,o,d,u;try{return(await e.post(s,r,{withCredentials:!0,timeout:6e4,signal:g,headers:c?{"content-type":"application/json;"}:{}})).data}catch(a){if(te(a)&&a.code!=="ERR_CANCELED"){if(((i=a.response)==null?void 0:i.status)===401||((o=a.response)==null?void 0:o.status)===403)throw new w;const l=a.response&&a.response.data&&a.response.data.uuid?a.response.data.uuid:U,m=l!==U?l.slice(0,8):l;throw new S(n+m,l,(u=(d=a.response)==null?void 0:d.data)==null?void 0:u.timestamp)}throw a instanceof Error?new S(a.message):new S(String(a))}},q="ukjent uuid",D=async(e,s,r,n,c)=>{var g,i;try{return(await e.delete(s,{withCredentials:!0,timeout:6e4,signal:c,data:n})).data}catch(o){if(te(o)&&o.code!=="ERR_CANCELED"){if(((g=o.response)==null?void 0:g.status)===401||((i=o.response)==null?void 0:i.status)===403)throw new w;const d=o.response&&o.response.data&&o.response.data.uuid?o.response.data.uuid:q,u=d!==q?d.slice(0,8):d;throw new S(r+u)}throw o instanceof Error?new S(o.message):new S(String(o))}};/**
 * React Router DOM v6.21.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Ye="startTransition",V=Le[Ye];function ze(e){let{basename:s,children:r,future:n,window:c}=e,g=p.useRef();g.current==null&&(g.current=ue({window:c,v5Compat:!0}));let i=g.current,[o,d]=p.useState({action:i.action,location:i.location}),{v7_startTransition:u}=n||{},a=p.useCallback(l=>{u&&V?V(()=>d(l)):d(l)},[d,u]);return p.useLayoutEffect(()=>i.listen(a),[i,a]),p.createElement(me,{basename:s,children:r,location:o.location,navigationType:o.action,navigator:i,future:n})}var F;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(F||(F={}));var G;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(G||(G={}));const re="selectedLocale",Qe=()=>sessionStorage.getItem(re)||"nb",We=e=>{sessionStorage.setItem(re,e)},oe=e=>{window.location.href=e},Xe=e=>{oe(e+"?redirect="+window.location.origin)},Ze=(e,s)=>{const r=(s==null?void 0:s.vedlegg.map(n=>n.id))||[];if(Re(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(n=>n.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:r};if(Ie(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(Ce(e)&&s&&Te(s))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:s.terminbekreftelsedato,vedleggreferanser:r};throw Error("Det er feil i data om barnet")},K="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",en=(e,s,r)=>{const n=fe(),[c,g]=p.useState(),i=p.useCallback(async o=>{const d=I(n(h.OM_BARNET)),u=n(h.DOKUMENTASJON),a=n(h.UTENLANDSOPPHOLD_TIDLIGERE),l=n(h.UTENLANDSOPPHOLD_SENERE),m={type:"engangsstønad",språkkode:s,barn:Ze(d,u),utenlandsopphold:{utenlandsoppholdSiste12Mnd:(a==null?void 0:a.utenlandsoppholdSiste12Mnd)||[],utenlandsoppholdNeste12Mnd:(l==null?void 0:l.utenlandsoppholdNeste12Mnd)||[]},vedlegg:(u==null?void 0:u.vedlegg)||[]};let k;try{k=await se(e,"/soknad/engangsstonad",m,K,!0,o)}catch(j){if(Je(j))g(j);else throw new Error("This should never happen")}if(k){try{await D(e,"/storage/engangsstonad",K,o)}catch{}r(k)}},[n,s,r,e]);return p.useMemo(()=>({sendSøknad:i,errorSendSøknad:c}),[i,c])},ae=1,H="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",nn=(e,s,r)=>{const n=ee(),c=ke(),g=Ee(),[i,o]=p.useState(),[d,u]=p.useState(!1),a=p.useRef();p.useEffect(()=>{d&&(async()=>{u(!1);const k=c[h.CURRENT_PATH];k?(await se(e,"/storage/engangsstonad",{version:ae,locale:s,...c},H),n(k)):(await D(e,"/storage/engangsstonad",H),r(!1),g(),n("/")),a.current&&a.current()})().catch(k=>{o(k),a.current&&a.current()})},[d]);const l=p.useCallback(()=>(u(!0),new Promise(k=>{a.current=k})),[]);return p.useMemo(()=>({mellomlagreOgNaviger:l,errorMellomlagre:i}),[l,i])},y=$e(M.REST_API_URL),_=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(de,{size:"2xlarge"})}),x=({error:e})=>e instanceof w?(Xe(M.LOGIN_URL),t.jsx(_,{})):t.jsx(Se,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),tn=({locale:e,onChangeLocale:s,person:r,mellomlagretData:n})=>{const c=ee(),[g,i]=p.useState(!1),[o,d]=p.useState(),{sendSøknad:u,errorSendSøknad:a}=en(y,e,d),{mellomlagreOgNaviger:l,errorMellomlagre:m}=nn(y,e,i);return p.useEffect(()=>{n&&n[h.CURRENT_PATH]&&(i(!0),n.locale&&s(n.locale),c(n[h.CURRENT_PATH]))},[n]),o?M.INNSYN?(oe(o.saksNr?`${M.INNSYN}/sak/${o.saksNr}/redirectFromSoknad`:`${M.INNSYN}/redirectFromSoknad`),t.jsx(_,{})):t.jsx("div",{children:"Redirected to Innsyn"}):a||m?t.jsx(x,{error:I(a||m)}):t.jsxs(he,{children:[!g&&t.jsx(E,{path:"*",element:t.jsx(ye,{to:f.VELKOMMEN})}),t.jsx(E,{path:f.VELKOMMEN,element:t.jsx(Ve,{locale:e,onChangeLocale:s,startSøknad:i,erVelkommen:g,mellomlagreOgNaviger:l})}),g&&t.jsxs(t.Fragment,{children:[t.jsx(E,{path:f.SØKERSITUASJON,element:t.jsx(qe,{mellomlagreOgNaviger:l})}),t.jsx(E,{path:f.OM_BARNET,element:t.jsx(Fe,{kjønn:r.kjønn,mellomlagreOgNaviger:l})}),t.jsx(E,{path:f.TERMINBEKREFTELSE,element:t.jsx(b,{mellomlagreOgNaviger:l})}),t.jsx(E,{path:f.ADOPSJONSBEKREFTELSE,element:t.jsx(b,{mellomlagreOgNaviger:l})}),t.jsx(E,{path:f.UTENLANDSOPPHOLD,element:t.jsx(Ge,{mellomlagreOgNaviger:l})}),t.jsx(E,{path:f.TIDLIGERE_UTENLANDSOPPHOLD,element:t.jsx(He,{mellomlagreOgNaviger:l})}),t.jsx(E,{path:f.SENERE_UTENLANDSOPPHOLD,element:t.jsx(Ke,{mellomlagreOgNaviger:l})}),t.jsx(E,{path:f.OPPSUMMERING,element:t.jsx(be,{person:r,sendSøknad:u,mellomlagreOgNaviger:l})})]})]})};try{y.displayName="esApi",y.__docgenInfo={description:"",displayName:"esApi",props:{}}}catch{}try{_.displayName="Spinner",_.__docgenInfo={description:"",displayName:"Spinner",props:{}}}catch{}try{x.displayName="ApiErrorHandler",x.__docgenInfo={description:"",displayName:"ApiErrorHandler",props:{error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"ApiAccessError | ApiGeneralError"}}}}}catch{}try{EngangsstnadRoutes.displayName="EngangsstnadRoutes",EngangsstnadRoutes.__docgenInfo={description:"",displayName:"EngangsstnadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}},person:{defaultValue:null,description:"",name:"person",required:!0,type:{name:"Person"}},mellomlagretData:{defaultValue:null,description:"",name:"mellomlagretData",required:!1,type:{name:"EsDataMapAndMetaData"}}}}}catch{}const sn=({locale:e,onChangeLocale:s})=>{const{i18n:r}=Ae();Ne(r("Søknad.Pagetitle"));const{data:n,error:c}=O(y,"/personinfo"),{data:g,loading:i,error:o}=O(y,"/storage/engangsstonad");if(c||o)return t.jsx(x,{error:I(c||o)});if(!n||i)return t.jsx(_,{});if(!ve(n.fødselsdato))return t.jsx(Me,{appnavn:"Engangsstønad"});const d=(g==null?void 0:g.version)===ae?g:void 0;return t.jsx(_e,{initialState:d,children:t.jsx(tn,{locale:e,onChangeLocale:s,person:n,mellomlagretData:d})})};try{Engangsstnad.displayName="Engangsstnad",Engangsstnad.__docgenInfo={description:"",displayName:"Engangsstnad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}}}}}catch{}const le=Qe(),rn={nb:{...Pe,...R.nb},nn:{...Oe,...R.nn},en:{...Ue,...R.en}};pe.locale(le);const on=async()=>{try{await D(y,"/storage/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},an=()=>{const[e,s]=p.useState(le),r=p.useCallback(n=>{We(n),s(n),document.documentElement.setAttribute("lang",n)},[]);return t.jsx(we,{locale:e,messagesGroupedByLocale:rn,children:t.jsx(xe,{appName:"Engangsstønad",retryCallback:on,children:t.jsx(ze,{children:t.jsx(sn,{locale:e,onChangeLocale:r})})})})},ie=an,ln={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},$n={title:"Applikasjon - Engangsstønad (AppContainer)",component:ie},T=({person:e,mellomlagretData:s,doLogging:r=!0})=>{je();const n=new P(y);n.onGet("/personinfo").reply(()=>(r&&console.log("network request: get /personinfo"),[200,e])),n.onGet("/storage/engangsstonad").reply(()=>(r&&console.log("network request: get /storage/engangstonad"),[200,s])),n.onPost("/soknad/engangsstonad").reply(()=>(r&&console.log("network request: post /soknad/engangsstonad"),[200,ln])),n.onPost("/storage/engangsstonad").reply(()=>(r&&console.log("network request: post /storage/engangstonad"),[200])),n.onDelete("/storage/engangsstonad").reply(()=>(r&&console.log("network request: delete /storage/engangstonad"),[200]));const c=new P(De);return c.onPost("/storage/engangsstonad/vedlegg").reply(200),c.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200),t.jsx(ie,{})},A=T.bind({});A.args={person:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:C.KVINNE,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};const N=T.bind({});N.args={mellomlagretData:{version:1,locale:"nb",[h.SØKERSITUASJON]:{situasjon:"fødsel"},[h.CURRENT_PATH]:f.SØKERSITUASJON},person:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:C.KVINNE,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};const v=T.bind({});v.args={person:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:C.MANN,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};var B,J,$;A.parameters={...A.parameters,docs:{...(B=A.parameters)==null?void 0:B.docs,source:{originalSource:`({
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
}`,...($=(J=A.parameters)==null?void 0:J.docs)==null?void 0:$.source}}};var Y,z,Q;N.parameters={...N.parameters,docs:{...(Y=N.parameters)==null?void 0:Y.docs,source:{originalSource:`({
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
}`,...(Q=(z=N.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,Z;v.parameters={...v.parameters,docs:{...(W=v.parameters)==null?void 0:W.docs,source:{originalSource:`({
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
}`,...(Z=(X=v.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};const Yn=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{A as SøkerErKvinne,N as SøkerErKvinneMedMellomlagretData,v as SøkerErMann,Yn as __namedExportsOrder,$n as default};
