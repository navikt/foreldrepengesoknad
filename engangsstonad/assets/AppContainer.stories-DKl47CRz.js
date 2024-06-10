var ue=Object.defineProperty;var me=(e,s,o)=>s in e?ue(e,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[s]=o;var R=(e,s,o)=>(me(e,typeof s!="symbol"?s+"":s,o),o);import{aa as fe,n as ee,j as t,ab as ke,ac as Ee,u as Se,ad as he,ae as Ae,af as we,d as Me,ag as ye,ah as Ne,i as xe}from"./dateFormValidation-D7QUEZim.js";import{d as ve,R as je,e as ne,f as Re,g as Ie,C as S,h as be,i as Le,j as k,N as Te,P as f,E as _e}from"./useEsNavigator-CboEBiOx.js";import{E as N,D as C,M as P}from"./DokumentasjonSteg-B90cVY5x.js";import{r as p,$ as De}from"./index-DVXBtNgz.js";import{b as te,a as Ce}from"./attachmentApi-ChTKvg06.js";import"./index-Cbx7Fas8.js";import{b as Pe,u as I,a as b,o as L,e as Oe,n as Ue}from"./nn_NO-DPfYDm3-.js";import{e as Fe,O as qe}from"./OppsummeringSteg-wUHtcNXU.js";import{e as Ge,b as Ke,a as Ve}from"./OmBarnet-BV6De4cI.js";import{O as He}from"./OmBarnetSteg-SlP-0YFy.js";import{S as Be}from"./SøkersituasjonSteg-Bx47PQSk.js";import{U as $e}from"./UtenlandsoppholdSteg-B3qACMNR.js";import{S as Je}from"./SenereUtenlandsoppholdSteg-Bipza2Kt.js";import{T as Ye}from"./TidligereUtenlandsoppholdSteg-B4lSrTmt.js";import{V as ze}from"./Velkommen-5ME5nikN.js";import"./index-Dcs0RV0A.js";import"./tslib.es6-CMwweBXX.js";import"./ErrorSummaryHookForm-DaPJEdEa.js";import"./SøkerOppsummeringspunkt-BVTtd_2q.js";import"./ConfirmationPanel-CdLHdBpN.js";import"./TidligereUtenlandsoppholdPanel-BPoV5Lxz.js";const{Axios:Cn,AxiosError:Pn,CanceledError:On,isCancel:Un,CancelToken:Fn,VERSION:qn,all:Gn,Cancel:Kn,isAxiosError:Qe,spread:Vn,toFormData:Hn,AxiosHeaders:Bn,HttpStatusCode:$n,formToJSON:Jn,getAdapter:Yn,mergeConfig:zn}=te;class E extends Error{constructor(o,n,d){super(o);R(this,"callId");R(this,"timestamp");this.callId=n,this.timestamp=d}}class x extends Error{constructor(){super("API_ACCESS_ERROR")}}const We=e=>e instanceof x||e instanceof E,se=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),O=(e,s)=>{const[o,n]=p.useState(),[d,c]=p.useState(!1),[g,r]=p.useState();return p.useEffect(()=>{let l=!1;return(async()=>{var i,a;try{c(!0);const m=await e.get(s,{withCredentials:!0,timeout:60*1e3});l||n(m.data)}catch(m){Qe(m)?((i=m.response)==null?void 0:i.status)===401||((a=m.response)==null?void 0:a.status)===403?r(new x):r(new E(m.message)):m instanceof Error?r(new E(m.message)):r(new E(String(m)))}finally{c(!1)}})(),()=>{l=!0}},[e,s]),{data:o,loading:d,error:g}},Xe=e=>te.create({baseURL:e,withCredentials:!0}),U="ukjent uuid",oe=async(e,s,o,n,d=!1,c)=>{var g,r,l,u;try{return(await e.post(s,o,{withCredentials:!0,timeout:6e4,signal:c,headers:d?{"content-type":"application/json;"}:{}})).data}catch(i){if(se(i)&&i.code!=="ERR_CANCELED"){if(((g=i.response)==null?void 0:g.status)===401||((r=i.response)==null?void 0:r.status)===403)throw new x;const a=i.response&&i.response.data&&i.response.data.uuid?i.response.data.uuid:U,m=a!==U?a.slice(0,8):a;throw new E(n+m,a,(u=(l=i.response)==null?void 0:l.data)==null?void 0:u.timestamp)}throw i instanceof Error?new E(i.message):new E(String(i))}},F="ukjent uuid",T=async(e,s,o,n,d)=>{var c,g;try{return(await e.delete(s,{withCredentials:!0,timeout:6e4,signal:d,data:n})).data}catch(r){if(se(r)&&r.code!=="ERR_CANCELED"){if(((c=r.response)==null?void 0:c.status)===401||((g=r.response)==null?void 0:g.status)===403)throw new x;const l=r.response&&r.response.data&&r.response.data.uuid?r.response.data.uuid:F,u=l!==F?l.slice(0,8):l;throw new E(o+u)}throw r instanceof Error?new E(r.message):new E(String(r))}};/**
 * React Router DOM v6.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Ze="6";try{window.__reactRouterVersion=Ze}catch{}const en="startTransition",q=De[en];function nn(e){let{basename:s,children:o,future:n,window:d}=e,c=p.useRef();c.current==null&&(c.current=ve({window:d,v5Compat:!0}));let g=c.current,[r,l]=p.useState({action:g.action,location:g.location}),{v7_startTransition:u}=n||{},i=p.useCallback(a=>{u&&q?q(()=>l(a)):l(a)},[l,u]);return p.useLayoutEffect(()=>g.listen(i),[g,i]),p.createElement(je,{basename:s,children:o,location:r.location,navigationType:r.action,navigator:g,future:n})}var G;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(G||(G={}));var K;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(K||(K={}));const re=e=>{window.location.href=e},tn=e=>{re(e+"?redirect="+window.location.origin)},ae="selectedLocale",sn=()=>sessionStorage.getItem(ae)||"nb",on=e=>{sessionStorage.setItem(ae,e)},ie=1,V="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",rn=(e,s,o)=>{const n=ne(),d=Re(),c=Ie(),[g,r]=p.useState(!1),l=p.useRef();return p.useEffect(()=>{g&&(async()=>{r(!1);const a=d[S.CURRENT_PATH];a?(n(a),await oe(e,"/storage/engangsstonad",{version:ie,locale:s,...d},V)):(await T(e,"/storage/engangsstonad",V),o(!1),c(),n("/")),l.current&&l.current()})().catch(a=>{fe(a.message),l.current&&l.current()})},[g]),p.useCallback(()=>(r(!0),new Promise(a=>{l.current=a})),[])},an=(e,s)=>{const o=(s==null?void 0:s.vedlegg.map(n=>n.id))||[];if(Ge(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(n=>n.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:o};if(Ke(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(Ve(e)&&s&&Fe(s))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:s.terminbekreftelsedato,vedleggreferanser:o};throw Error("Det er feil i data om barnet")},H="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",ln=(e,s,o)=>{const n=be(),[d,c]=p.useState(),g=p.useCallback(async r=>{const l=ee(n(S.OM_BARNET)),u=n(S.DOKUMENTASJON),i=n(S.UTENLANDSOPPHOLD_TIDLIGERE),a=n(S.UTENLANDSOPPHOLD_SENERE),m={type:"engangsstønad",språkkode:s,barn:an(l,u),oppholdIUtlandet:((i==null?void 0:i.utenlandsoppholdSiste12Mnd)||[]).concat((a==null?void 0:a.utenlandsoppholdNeste12Mnd)||[]),vedlegg:(u==null?void 0:u.vedlegg.map(A=>({...A,dokumenterer:{type:"barn"}})))||[]};let j;try{j=await oe(e,"/soknad/engangsstonad",m,H,!0,r)}catch(A){if(We(A))c(A);else throw new Error("This should never happen")}if(j){try{await T(e,"/storage/engangsstonad",H,r)}catch{}o(j)}},[n,s,o,e]);return p.useMemo(()=>({sendSøknad:g,errorSendSøknad:d}),[g,d])},h=Xe(N.REST_API_URL),v=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(ke,{size:"2xlarge"})}),_=({error:e})=>e instanceof x?(tn(N.LOGIN_URL),t.jsx(v,{})):t.jsx(Ee,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),le=({locale:e,onChangeLocale:s,søker:o,mellomlagretData:n})=>{const d=ne(),[c,g]=p.useState(!1),[r,l]=p.useState(),{sendSøknad:u,errorSendSøknad:i}=ln(h,e,l),a=rn(h,e,g);return p.useEffect(()=>{n&&n[S.CURRENT_PATH]&&(g(!0),n.locale&&s(n.locale),d(n[S.CURRENT_PATH]))},[n]),r?N.INNSYN?(re(r.saksNr?`${N.INNSYN}/sak/${r.saksNr}/redirectFromSoknad`:`${N.INNSYN}/redirectFromSoknad`),t.jsx(v,{})):t.jsx("div",{children:"Redirected to Innsyn"}):i?t.jsx(_,{error:i}):t.jsxs(Le,{children:[!c&&t.jsx(k,{path:"*",element:t.jsx(Te,{to:f.VELKOMMEN})}),t.jsx(k,{path:f.VELKOMMEN,element:t.jsx(ze,{locale:e,onChangeLocale:s,startSøknad:g,erVelkommen:c,mellomlagreOgNaviger:a})}),c&&t.jsxs(t.Fragment,{children:[t.jsx(k,{path:f.SØKERSITUASJON,element:t.jsx(Be,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.OM_BARNET,element:t.jsx(He,{kjønn:o.kjønn,mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.TERMINBEKREFTELSE,element:t.jsx(C,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.ADOPSJONSBEKREFTELSE,element:t.jsx(C,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.UTENLANDSOPPHOLD,element:t.jsx($e,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.TIDLIGERE_UTENLANDSOPPHOLD,element:t.jsx(Ye,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.SENERE_UTENLANDSOPPHOLD,element:t.jsx(Je,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.OPPSUMMERING,element:t.jsx(qe,{søker:o,sendSøknad:u,mellomlagreOgNaviger:a})})]})]})};v.__docgenInfo={description:"",methods:[],displayName:"Spinner"};_.__docgenInfo={description:"",methods:[],displayName:"ApiErrorHandler"};le.__docgenInfo={description:"",methods:[],displayName:"EngangsstønadRoutes"};const ge=({locale:e,onChangeLocale:s})=>{const o=Se();he(o.formatMessage({id:"Søknad.Pagetitle"}));const{data:n,error:d}=O(h,"/personinfo"),{data:c,loading:g,error:r}=O(h,"/storage/engangsstonad");if(d||r)return t.jsx(_,{error:ee(d||r)});if(!n||g)return t.jsx(v,{});if(!Ae(n.fødselsdato))return t.jsx(we,{appnavn:"Engangsstønad"});const l=(c==null?void 0:c.version)===ie?c:void 0;return t.jsx(_e,{initialState:l,children:t.jsx(le,{locale:e,onChangeLocale:s,søker:n,mellomlagretData:l})})};ge.__docgenInfo={description:"",methods:[],displayName:"Engangsstønad"};const gn={...Ue,...I.nb,...b.nb,...L.nb},ce=sn(),cn={nb:gn,nn:{...Pe,...I.nn,...b.nn,...L.nn},en:{...Oe,...I.en,...b.en,...L.en}};Me.locale(ce);const dn=async()=>{try{await T(h,"/storage/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},de=()=>{const[e,s]=p.useState(ce),o=p.useCallback(n=>{on(n),s(n),document.documentElement.setAttribute("lang",n)},[]);return t.jsx(ye,{locale:e,messagesGroupedByLocale:cn,children:t.jsx(Ne,{appName:"Engangsstønad",retryCallback:dn,children:t.jsx(nn,{children:t.jsx(ge,{locale:e,onChangeLocale:o})})})})},pe=de;de.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const pn={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},Qn={title:"Applikasjon - Engangsstønad (AppContainer)",component:pe},D=({søker:e,mellomlagretData:s,doLogging:o=!0})=>{xe();const n=new P(h);n.onGet("/personinfo").reply(()=>(o&&console.log("network request: get /personinfo"),[200,e])),n.onGet("/storage/engangsstonad").reply(()=>(o&&console.log("network request: get /storage/engangstonad"),[200,s])),n.onPost("/soknad/engangsstonad").reply(()=>(o&&console.log("network request: post /soknad/engangsstonad"),[200,pn])),n.onPost("/storage/engangsstonad").reply(()=>(o&&console.log("network request: post /storage/engangstonad"),[200])),n.onDelete("/storage/engangsstonad").reply(()=>(o&&console.log("network request: delete /storage/engangstonad"),[200]));const d=new P(Ce);return d.onPost("/storage/engangsstonad/vedlegg").reply(200),d.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200),t.jsx(pe,{})},w=D.bind({});w.args={søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const M=D.bind({});M.args={mellomlagretData:{version:1,locale:"nb",[S.SØKERSITUASJON]:{situasjon:"fødsel"},[S.CURRENT_PATH]:f.SØKERSITUASJON},søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const y=D.bind({});y.args={søker:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};var B,$,J;w.parameters={...w.parameters,docs:{...(B=w.parameters)==null?void 0:B.docs,source:{originalSource:`({
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
}`,...(J=($=w.parameters)==null?void 0:$.docs)==null?void 0:J.source}}};var Y,z,Q;M.parameters={...M.parameters,docs:{...(Y=M.parameters)==null?void 0:Y.docs,source:{originalSource:`({
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
}`,...(Q=(z=M.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,Z;y.parameters={...y.parameters,docs:{...(W=y.parameters)==null?void 0:W.docs,source:{originalSource:`({
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
}`,...(Z=(X=y.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};const Wn=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{w as SøkerErKvinne,M as SøkerErKvinneMedMellomlagretData,y as SøkerErMann,Wn as __namedExportsOrder,Qn as default};
