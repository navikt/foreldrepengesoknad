import{j as t,p as ie,d as ge}from"./fridagerUtils-03862b91.js";import{E as M,D as T,M as b}from"./DokumentasjonSteg-26f91156.js";import{O as ce,R as de,Q as pe,n as R,C as h,T as Z,W as ue,X as me,Y as fe,Z as ke,_ as E,$ as Ee,P as f,u as Se,a0 as he,a1 as ye,a2 as Ae,E as Ne,a3 as ve,a4 as Me,i as _e}from"./useEsNavigator-9adad4d5.js";import{r as g,a as we}from"./index-f1f2c4b1.js";import{d as ee,e as xe,c as je,b as Le,a as Re}from"./OmBarnet-af2613e0.js";import{e as Ie,O as Ce,K as I}from"./OppsummeringSteg-c9ed70a7.js";import"./index-c74c9f7f.js";import{n as De,a as L,b as Te,e as be}from"./en_US-08536538.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import{S as Pe}from"./SøkersituasjonSteg-5afe6323.js";import{V as Oe}from"./Velkommen-8fcafb58.js";import{O as Ue}from"./OmBarnetSteg-dfb9bd3d.js";import{U as qe}from"./UtenlandsoppholdSteg-bd1bfe04.js";import{S as Ve}from"./SenereUtenlandsoppholdSteg-6a7f7cf4.js";import{T as Fe}from"./TidligereUtenlandsoppholdSteg-7a252060.js";import"./index-b580f7e8.js";import"./ErrorSummaryHookForm-5a735e96.js";import"./isNativeReflectConstruct-81b4d0cb.js";import"./ExpansionCard-5335c08e.js";import"./ConfirmationPanel-206deca6.js";import"./Radio-d50215d2.js";import"./TidligereUtenlandsoppholdPanel-7e188d13.js";const{Axios:Ln,AxiosError:Rn,CanceledError:In,isCancel:Cn,CancelToken:Dn,VERSION:Tn,all:bn,Cancel:Pn,isAxiosError:Ge,spread:On,toFormData:Un,AxiosHeaders:qn,HttpStatusCode:Vn,formToJSON:Fn,getAdapter:Gn,mergeConfig:Kn}=ee;class S extends Error{constructor(o){super(o)}}class w extends Error{constructor(){super("API_ACCESS_ERROR")}}const Ke=e=>e instanceof w||e instanceof S,ne=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),P=(e,o)=>{const[a,n]=g.useState(),[d,i]=g.useState(!1),[l,s]=g.useState();return g.useEffect(()=>{let r=!1;return(async()=>{var p,c;try{i(!0);const m=await e.get(o,{withCredentials:!0,timeout:60*1e3});r||n(m.data)}catch(m){Ge(m)?((p=m.response)==null?void 0:p.status)===401||((c=m.response)==null?void 0:c.status)===403?s(new w):s(new S(m.message)):m instanceof Error?s(new S(m.message)):s(new S(String(m)))}finally{i(!1)}})(),()=>{r=!0}},[e,o]),{data:a,loading:d,error:l}},He=e=>ee.create({baseURL:e,withCredentials:!0}),O="ukjent uuid",te=async(e,o,a,n,d=!1,i)=>{var l,s;try{return(await e.post(o,a,{withCredentials:!0,timeout:6e4,signal:i,headers:d?{"content-type":"application/json;"}:{}})).data}catch(r){if(ne(r)&&r.code!=="ERR_CANCELED"){if(((l=r.response)==null?void 0:l.status)===401||((s=r.response)==null?void 0:s.status)===403)throw new w;const u=r.response&&r.response.data&&r.response.data.uuid?r.response.data.uuid:O,p=u!==O?u.slice(0,8):u;throw new S(n+p)}throw r instanceof Error?new S(r.message):new S(String(r))}},U="ukjent uuid",C=async(e,o,a,n,d)=>{var i,l;try{return(await e.delete(o,{withCredentials:!0,timeout:6e4,signal:d,data:n})).data}catch(s){if(ne(s)&&s.code!=="ERR_CANCELED"){if(((i=s.response)==null?void 0:i.status)===401||((l=s.response)==null?void 0:l.status)===403)throw new w;const r=s.response&&s.response.data&&s.response.data.uuid?s.response.data.uuid:U,u=r!==U?r.slice(0,8):r;throw new S(a+u)}throw s instanceof Error?new S(s.message):new S(String(s))}};/**
 * React Router DOM v6.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Be="startTransition",q=we[Be];function Je(e){let{basename:o,children:a,future:n,window:d}=e,i=g.useRef();i.current==null&&(i.current=ce({window:d,v5Compat:!0}));let l=i.current,[s,r]=g.useState({action:l.action,location:l.location}),{v7_startTransition:u}=n||{},p=g.useCallback(c=>{u&&q?q(()=>r(c)):r(c)},[r,u]);return g.useLayoutEffect(()=>l.listen(p),[l,p]),g.createElement(de,{basename:o,children:a,location:s.location,navigationType:s.action,navigator:l,future:n})}var V;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(V||(V={}));var F;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(F||(F={}));const se="selectedLocale",$e=()=>sessionStorage.getItem(se)||"nb",Ye=e=>{sessionStorage.setItem(se,e)},re=e=>{window.location.href=e},ze=e=>{re(e+"?redirect="+window.location.origin)},Qe=(e,o)=>{const a=(o==null?void 0:o.vedlegg.map(n=>n.id))||[];if(xe(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(n=>n.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:a};if(je(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(Le(e)&&o&&Ie(o))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:o.terminbekreftelsedato,vedleggreferanser:a};throw Error("Det er feil i data om barnet")},G="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",We=(e,o,a)=>{const n=pe(),[d,i]=g.useState(),l=g.useCallback(async s=>{const r=R(n(h.OM_BARNET)),u=n(h.DOKUMENTASJON),p=n(h.UTENLANDSOPPHOLD_TIDLIGERE),c=n(h.UTENLANDSOPPHOLD_SENERE),m={type:"engangsstønad",språkkode:o,barn:Qe(r,u),utenlandsopphold:{utenlandsoppholdSiste12Mnd:(p==null?void 0:p.utenlandsoppholdSiste12Mnd)||[],utenlandsoppholdNeste12Mnd:(c==null?void 0:c.utenlandsoppholdNeste12Mnd)||[]},vedlegg:(u==null?void 0:u.vedlegg)||[]};let k;try{k=await te(e,"/soknad/engangsstonad",m,G,!0,s)}catch(j){if(Ke(j))i(j);else throw new Error("This should never happen")}if(k){try{await C(e,"/storage/engangsstonad",G,s)}catch{}a(k)}},[n,o,a,e]);return g.useMemo(()=>({sendSøknad:l,errorSendSøknad:d}),[l,d])},oe=1,K="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Xe=(e,o,a)=>{const n=Z(),d=ue(),i=me(),[l,s]=g.useState(),[r,u]=g.useState(!1),p=g.useRef();g.useEffect(()=>{r&&(async()=>{u(!1);const k=d[h.CURRENT_PATH];k?(await te(e,"/storage/engangsstonad",{version:oe,locale:o,...d},K),n(k)):(await C(e,"/storage/engangsstonad",K),a(!1),i(),n("/")),p.current&&p.current()})().catch(k=>{s(k),p.current&&p.current()})},[r]);const c=g.useCallback(()=>(u(!0),new Promise(k=>{p.current=k})),[]);return g.useMemo(()=>({mellomlagreOgNaviger:c,errorMellomlagre:l}),[c,l])},y=He(M.REST_API_URL),_=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(ie,{size:"2xlarge"})}),x=({error:e})=>e instanceof w?(ze(M.LOGIN_URL),t.jsx(_,{})):t.jsx(fe,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),Ze=({locale:e,onChangeLocale:o,person:a,mellomlagretData:n})=>{const d=Z(),[i,l]=g.useState(!1),[s,r]=g.useState(),{sendSøknad:u,errorSendSøknad:p}=We(y,e,r),{mellomlagreOgNaviger:c,errorMellomlagre:m}=Xe(y,e,l);return g.useEffect(()=>{n&&n[h.CURRENT_PATH]&&(l(!0),n.locale&&o(n.locale),d(n[h.CURRENT_PATH]))},[n]),s?M.INNSYN?(re(s.saksNr?`${M.INNSYN}/sak/${s.saksNr}/redirectFromSoknad`:`${M.INNSYN}/redirectFromSoknad`),t.jsx(_,{})):t.jsx("div",{children:"Redirected to Innsyn"}):p||m?t.jsx(x,{error:R(p||m)}):t.jsxs(ke,{children:[!i&&t.jsx(E,{path:"*",element:t.jsx(Ee,{to:f.VELKOMMEN})}),t.jsx(E,{path:f.VELKOMMEN,element:t.jsx(Oe,{locale:e,onChangeLocale:o,startSøknad:l,erVelkommen:i,mellomlagreOgNaviger:c})}),i&&t.jsxs(t.Fragment,{children:[t.jsx(E,{path:f.SØKERSITUASJON,element:t.jsx(Pe,{mellomlagreOgNaviger:c})}),t.jsx(E,{path:f.OM_BARNET,element:t.jsx(Ue,{kjønn:a.kjønn,mellomlagreOgNaviger:c})}),t.jsx(E,{path:f.TERMINBEKREFTELSE,element:t.jsx(T,{mellomlagreOgNaviger:c})}),t.jsx(E,{path:f.ADOPSJONSBEKREFTELSE,element:t.jsx(T,{mellomlagreOgNaviger:c})}),t.jsx(E,{path:f.UTENLANDSOPPHOLD,element:t.jsx(qe,{mellomlagreOgNaviger:c})}),t.jsx(E,{path:f.TIDLIGERE_UTENLANDSOPPHOLD,element:t.jsx(Fe,{mellomlagreOgNaviger:c})}),t.jsx(E,{path:f.SENERE_UTENLANDSOPPHOLD,element:t.jsx(Ve,{mellomlagreOgNaviger:c})}),t.jsx(E,{path:f.OPPSUMMERING,element:t.jsx(Ce,{person:a,sendSøknad:u,mellomlagreOgNaviger:c})})]})]})};try{y.displayName="esApi",y.__docgenInfo={description:"",displayName:"esApi",props:{}}}catch{}try{_.displayName="Spinner",_.__docgenInfo={description:"",displayName:"Spinner",props:{}}}catch{}try{x.displayName="ApiErrorHandler",x.__docgenInfo={description:"",displayName:"ApiErrorHandler",props:{error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"ApiAccessError | ApiGeneralError"}}}}}catch{}try{EngangsstnadRoutes.displayName="EngangsstnadRoutes",EngangsstnadRoutes.__docgenInfo={description:"",displayName:"EngangsstnadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}},person:{defaultValue:null,description:"",name:"person",required:!0,type:{name:"Person"}},mellomlagretData:{defaultValue:null,description:"",name:"mellomlagretData",required:!1,type:{name:"EsDataMapAndMetaData"}}}}}catch{}const en=({locale:e,onChangeLocale:o})=>{const{i18n:a}=Se();he(a("Søknad.Pagetitle"));const{data:n,error:d}=P(y,"/personinfo"),{data:i,loading:l,error:s}=P(y,"/storage/engangsstonad");if(d||s)return t.jsx(x,{error:R(d||s)});if(!n||l)return t.jsx(_,{});if(!ye(n.fødselsdato))return t.jsx(Ae,{appnavn:"Engangsstønad"});const r=(i==null?void 0:i.version)===oe?i:void 0;return t.jsx(Ne,{initialState:r,children:t.jsx(Ze,{locale:e,onChangeLocale:o,person:n,mellomlagretData:r})})};try{Engangsstnad.displayName="Engangsstnad",Engangsstnad.__docgenInfo={description:"",displayName:"Engangsstnad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleAll) => void"}}}}}catch{}const ae=$e(),nn={nb:{...De,...L.nb},nn:{...Te,...L.nn},en:{...be,...L.en}};ge.locale(ae);const tn=async()=>{try{await C(y,"/storage/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},sn=()=>{const[e,o]=g.useState(ae),a=g.useCallback(n=>{Ye(n),o(n),document.documentElement.setAttribute("lang",n)},[]);return t.jsx(ve,{locale:e,messagesGroupedByLocale:nn,children:t.jsx(Me,{appName:"Engangsstønad",retryCallback:tn,children:t.jsx(Je,{children:t.jsx(en,{locale:e,onChangeLocale:a})})})})},le=sn,rn={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},Hn={title:"Applikasjon - Engangsstønad (AppContainer)",component:le},D=({person:e,mellomlagretData:o,doLogging:a=!0})=>{_e();const n=new b(y);n.onGet("/personinfo").reply(()=>(a&&console.log("network request: get /personinfo"),[200,e])),n.onGet("/storage/engangsstonad").reply(()=>(a&&console.log("network request: get /storage/engangstonad"),[200,o])),n.onPost("/soknad/engangsstonad").reply(()=>(a&&console.log("network request: post /soknad/engangsstonad"),[200,rn])),n.onPost("/storage/engangsstonad").reply(()=>(a&&console.log("network request: post /storage/engangstonad"),[200])),n.onDelete("/storage/engangsstonad").reply(()=>(a&&console.log("network request: delete /storage/engangstonad"),[200]));const d=new b(Re);return d.onPost("/storage/engangsstonad/vedlegg").reply(200),d.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200),t.jsx(le,{})},A=D.bind({});A.args={person:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:I.KVINNE,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};const N=D.bind({});N.args={mellomlagretData:{version:1,locale:"nb",[h.SØKERSITUASJON]:{situasjon:"fødsel"},[h.CURRENT_PATH]:f.SØKERSITUASJON},person:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:I.KVINNE,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};const v=D.bind({});v.args={person:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:I.MANN,fødselsdato:"1979-01-28",adresse:"Oslo 123",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}}};var H,B,J;A.parameters={...A.parameters,docs:{...(H=A.parameters)==null?void 0:H.docs,source:{originalSource:`({
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
}`,...(X=(W=v.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};const Bn=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{A as SøkerErKvinne,N as SøkerErKvinneMedMellomlagretData,v as SøkerErMann,Bn as __namedExportsOrder,Hn as default};
