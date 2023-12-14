import{j as n,y as ie,d as ge}from"./fridagerUtils-f3aec6f3.js";import{E as v,D as b,M as T}from"./DokumentasjonSteg-b70e5bc7.js";import{Q as ce,R as de,V as pe,n as R,b as S,W as Z,X as ue,Y as me,Z as fe,_ as ke,$ as k,a0 as Ee,P as f,a1 as Se,a2 as he,E as ye,a3 as Ae,a4 as Ne,i as ve}from"./useEsNavigator-49099871.js";import{r as i,$ as Me}from"./_baseToString-53b0dbb2.js";import{d as ee,e as _e,c as we,b as xe,a as Le}from"./OmBarnet-0cd42a30.js";import{e as je,O as Re,K as D}from"./OppsummeringSteg-1acd9a40.js";import{n as De,a as j,b as Ie,e as Ce}from"./en_US-81b94afb.js";import"./_createSet-a1fd5098.js";import{S as be}from"./SøkersituasjonSteg-0b0d5864.js";import{V as Te}from"./Velkommen-6449ef98.js";import{O as Pe}from"./OmBarnetSteg-1b747337.js";import{U as Oe}from"./UtenlandsoppholdSteg-abe1ff1a.js";import{S as Ue}from"./SenereUtenlandsoppholdSteg-9f54250d.js";import{T as qe}from"./TidligereUtenlandsoppholdSteg-4520a4a2.js";import"./index-b613d0ba.js";import"./v4-a960c1f4.js";import"./ErrorSummaryHookForm-9e431d55.js";import"./TidligereUtenlandsoppholdPanel-f7ad2de3.js";const{Axios:Nn,AxiosError:vn,CanceledError:Mn,isCancel:_n,CancelToken:wn,VERSION:xn,all:Ln,Cancel:jn,isAxiosError:Ve,spread:Rn,toFormData:Dn,AxiosHeaders:In,HttpStatusCode:Cn,formToJSON:bn,getAdapter:Tn,mergeConfig:Pn}=ee;class E extends Error{constructor(r){super(r)}}class _ extends Error{constructor(){super("API_ACCESS_ERROR")}}const Ge=e=>e instanceof _||e instanceof E,ne=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),P=(e,r)=>{const[s,t]=i.useState(),[g,c]=i.useState(!1),[l,o]=i.useState();return i.useEffect(()=>{let a=!1;return(async()=>{var m,p;try{c(!0);const u=await e.get(r,{withCredentials:!0,timeout:60*1e3});a||t(u.data)}catch(u){Ve(u)?((m=u.response)==null?void 0:m.status)===401||((p=u.response)==null?void 0:p.status)===403?o(new _):o(new E(u.message)):u instanceof Error?o(new E(u.message)):o(new E(String(u)))}finally{c(!1)}})(),()=>{a=!0}},[e,r]),{data:s,loading:g,error:l}},Fe=e=>ee.create({baseURL:e,withCredentials:!0}),O="ukjent uuid",te=async(e,r,s,t,g=!1,c)=>{var l,o;try{return(await e.post(r,s,{withCredentials:!0,timeout:6e4,signal:c,headers:g?{"content-type":"application/json;"}:{}})).data}catch(a){if(ne(a)&&a.code!=="ERR_CANCELED"){if(((l=a.response)==null?void 0:l.status)===401||((o=a.response)==null?void 0:o.status)===403)throw new _;const d=a.response&&a.response.data&&a.response.data.uuid?a.response.data.uuid:O,m=d!==O?d.slice(0,8):d;throw new E(t+m)}throw a instanceof Error?new E(a.message):new E(String(a))}},U="ukjent uuid",I=async(e,r,s,t,g)=>{var c,l;try{return(await e.delete(r,{withCredentials:!0,timeout:6e4,signal:g,data:t})).data}catch(o){if(ne(o)&&o.code!=="ERR_CANCELED"){if(((c=o.response)==null?void 0:c.status)===401||((l=o.response)==null?void 0:l.status)===403)throw new _;const a=o.response&&o.response.data&&o.response.data.uuid?o.response.data.uuid:U,d=a!==U?a.slice(0,8):a;throw new E(s+d)}throw o instanceof Error?new E(o.message):new E(String(o))}};/**
 * React Router DOM v6.15.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Ke="startTransition",q=Me[Ke];function He(e){let{basename:r,children:s,future:t,window:g}=e,c=i.useRef();c.current==null&&(c.current=ce({window:g,v5Compat:!0}));let l=c.current,[o,a]=i.useState({action:l.action,location:l.location}),{v7_startTransition:d}=t||{},m=i.useCallback(p=>{d&&q?q(()=>a(p)):a(p)},[a,d]);return i.useLayoutEffect(()=>l.listen(m),[l,m]),i.createElement(de,{basename:r,children:s,location:o.location,navigationType:o.action,navigator:l})}var V;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher"})(V||(V={}));var G;(function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(G||(G={}));const oe="selectedLocale",Be=()=>sessionStorage.getItem(oe)||"nb",$e=e=>{sessionStorage.setItem(oe,e)},re=e=>{window.location.href=e},Je=e=>{re(e+"?redirect="+window.location.origin)},Ye=(e,r)=>{const s=(r==null?void 0:r.vedlegg.map(t=>t.id))||[];if(_e(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(t=>t.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:s};if(we(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(xe(e)&&r&&je(r))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:r.terminbekreftelsedato,vedleggreferanser:s};throw Error("Det er feil i data om barnet")},F="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",ze=(e,r,s)=>{const t=pe(),[g,c]=i.useState(),l=i.useCallback(async o=>{const a=R(t(S.OM_BARNET)),d=t(S.DOKUMENTASJON),m=t(S.UTENLANDSOPPHOLD_TIDLIGERE),p=t(S.UTENLANDSOPPHOLD_SENERE),u={type:"engangsstønad",språkkode:r,barn:Ye(a,d),utenlandsopphold:{utenlandsoppholdSiste12Mnd:(m==null?void 0:m.utenlandsoppholdSiste12Mnd)||[],utenlandsoppholdNeste12Mnd:(p==null?void 0:p.utenlandsoppholdNeste12Mnd)||[]},vedlegg:(d==null?void 0:d.vedlegg)||[]};let x;try{x=await te(e,"/soknad/engangsstonad",u,F,!0,o)}catch(L){if(Ge(L))c(L);else throw new Error("This should never happen")}if(x){try{await I(e,"/storage/engangsstonad",F,o)}catch{}s(x)}},[t,r,s,e]);return i.useMemo(()=>({sendSøknad:l,errorSendSøknad:g}),[l,g])},se=1,K="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Qe=(e,r)=>{const s=Z(),t=ue(),g=me(),[c,l]=i.useState(),[o,a]=i.useState(!1),d=i.useRef();i.useEffect(()=>{o&&(async()=>{a(!1);const u=t[S.CURRENT_PATH];u?(await te(e,"/storage/engangsstonad",{version:se,...t},K),s(u)):(await I(e,"/storage/engangsstonad",K),r(!1),g(),s("/")),d.current&&d.current()})().catch(u=>{l(u),d.current&&d.current()})},[o]);const m=i.useCallback(()=>(a(!0),new Promise(u=>{d.current=u})),[]);return i.useMemo(()=>({mellomlagreOgNaviger:m,errorMellomlagre:c}),[m,c])},h=Fe(v.REST_API_URL),M=()=>n.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:n.jsx(ie,{size:"2xlarge"})}),w=({error:e})=>e instanceof _?(Je(v.LOGIN_URL),n.jsx(M,{})):n.jsx(fe,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),We=({locale:e,onChangeLocale:r,person:s,mellomlagretData:t})=>{const g=Z(),[c,l]=i.useState(!1),[o,a]=i.useState(),{sendSøknad:d,errorSendSøknad:m}=ze(h,e,a),{mellomlagreOgNaviger:p,errorMellomlagre:u}=Qe(h,l);return i.useEffect(()=>{t&&t[S.CURRENT_PATH]&&(l(!0),g(t[S.CURRENT_PATH]))},[t]),o?v.INNSYN?(re(o.saksNr?`${v.INNSYN}/sak/${o.saksNr}/redirectFromSoknad`:`${v.INNSYN}/redirectFromSoknad`),n.jsx(M,{})):n.jsx("div",{children:"Redirected to Innsyn"}):m||u?n.jsx(w,{error:R(m||u)}):n.jsxs(ke,{children:[!c&&n.jsx(k,{path:"*",element:n.jsx(Ee,{to:f.VELKOMMEN})}),n.jsx(k,{path:f.VELKOMMEN,element:n.jsx(Te,{locale:e,onChangeLocale:r,startSøknad:l,erVelkommen:c,mellomlagreOgNaviger:p})}),c&&n.jsxs(n.Fragment,{children:[n.jsx(k,{path:f.SØKERSITUASJON,element:n.jsx(be,{mellomlagreOgNaviger:p})}),n.jsx(k,{path:f.OM_BARNET,element:n.jsx(Pe,{kjønn:s.kjønn,mellomlagreOgNaviger:p})}),n.jsx(k,{path:f.TERMINBEKREFTELSE,element:n.jsx(b,{mellomlagreOgNaviger:p})}),n.jsx(k,{path:f.ADOPSJONSBEKREFTELSE,element:n.jsx(b,{mellomlagreOgNaviger:p})}),n.jsx(k,{path:f.UTENLANDSOPPHOLD,element:n.jsx(Oe,{mellomlagreOgNaviger:p})}),n.jsx(k,{path:f.TIDLIGERE_UTENLANDSOPPHOLD,element:n.jsx(qe,{mellomlagreOgNaviger:p})}),n.jsx(k,{path:f.SENERE_UTENLANDSOPPHOLD,element:n.jsx(Ue,{mellomlagreOgNaviger:p})}),n.jsx(k,{path:f.OPPSUMMERING,element:n.jsx(Re,{person:s,sendSøknad:d,mellomlagreOgNaviger:p})})]})]})};try{h.displayName="esApi",h.__docgenInfo={description:"",displayName:"esApi",props:{}}}catch{}try{M.displayName="Spinner",M.__docgenInfo={description:"",displayName:"Spinner",props:{}}}catch{}try{w.displayName="ApiErrorHandler",w.__docgenInfo={description:"",displayName:"ApiErrorHandler",props:{error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"ApiAccessError | ApiGeneralError"}}}}}catch{}try{EngangsstnadRoutes.displayName="EngangsstnadRoutes",EngangsstnadRoutes.__docgenInfo={description:"",displayName:"EngangsstnadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}},person:{defaultValue:null,description:"",name:"person",required:!0,type:{name:"Person"}},mellomlagretData:{defaultValue:null,description:"",name:"mellomlagretData",required:!1,type:{name:"ContextDataMap"}}}}}catch{}const Xe=({locale:e,onChangeLocale:r})=>{const{data:s,error:t}=P(h,"/personinfo"),{data:g,loading:c,error:l}=P(h,"/storage/engangsstonad");if(t||l)return n.jsx(w,{error:R(t||l)});if(!s||c)return n.jsx(M,{});if(!Se(s.fødselsdato))return n.jsx(he,{appnavn:"Engangsstønad"});const o=(g==null?void 0:g.version)===se?g:void 0;return n.jsx(ye,{initialState:o,children:n.jsx(We,{locale:e,onChangeLocale:r,person:s,mellomlagretData:o})})};try{Engangsstnad.displayName="Engangsstnad",Engangsstnad.__docgenInfo={description:"",displayName:"Engangsstnad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}}}}}catch{}const ae=Be(),Ze={nb:{...De,...j.nb},nn:{...Ie,...j.nn},en:{...Ce,...j.en}};ge.locale(ae);const en=async()=>{try{await I(h,"/storage/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},nn=()=>{const[e,r]=i.useState(ae),s=i.useCallback(t=>{$e(t),r(t)},[]);return n.jsx(Ae,{locale:e,messagesGroupedByLocale:Ze,children:n.jsx(Ne,{appName:"Engangsstønad",retryCallback:en,children:n.jsx(He,{children:n.jsx(Xe,{locale:e,onChangeLocale:s})})})})},le=nn,tn={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},On={title:"Applikasjon - Engangsstønad (AppContainer)",component:le},C=({person:e,mellomlagretData:r,doLogging:s=!0})=>{ve();const t=new T(h);t.onGet("/personinfo").reply(()=>(s&&console.log("network request: get /personinfo"),[200,e])),t.onGet("/storage/engangsstonad").reply(()=>(s&&console.log("network request: get /storage/engangstonad"),[200,r])),t.onPost("/soknad/engangsstonad").reply(()=>(s&&console.log("network request: post /soknad/engangsstonad"),[200,tn])),t.onPost("/storage/engangsstonad").reply(()=>(s&&console.log("network request: post /storage/engangstonad"),[200])),t.onDelete("/storage/engangsstonad").reply(()=>(s&&console.log("network request: delete /storage/engangstonad"),[200]));const g=new T(Le);return g.onPost("/storage/engangsstonad/vedlegg").reply(200),g.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200),n.jsx(le,{})},y=C.bind({});y.args={person:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:D.KVINNE,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};const A=C.bind({});A.args={mellomlagretData:{version:1,[S.SØKERSITUASJON]:{situasjon:"fødsel"},[S.CURRENT_PATH]:f.SØKERSITUASJON},person:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:D.KVINNE,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};const N=C.bind({});N.args={person:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:D.MANN,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};var H,B,$;y.parameters={...y.parameters,docs:{...(H=y.parameters)==null?void 0:H.docs,source:{originalSource:`({
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
}`,...($=(B=y.parameters)==null?void 0:B.docs)==null?void 0:$.source}}};var J,Y,z;A.parameters={...A.parameters,docs:{...(J=A.parameters)==null?void 0:J.docs,source:{originalSource:`({
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
}`,...(X=(W=N.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};const Un=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{y as SøkerErKvinne,A as SøkerErKvinneMedMellomlagretData,N as SøkerErMann,Un as __namedExportsOrder,On as default};
//# sourceMappingURL=AppContainer.stories-aa8d5d00.js.map
