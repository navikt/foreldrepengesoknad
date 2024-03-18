var ce=Object.defineProperty;var de=(e,s,o)=>s in e?ce(e,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[s]=o;var R=(e,s,o)=>(de(e,typeof s!="symbol"?s+"":s,o),o);import{j as t,u as pe}from"./index-DZ_iNobP.js";import{a5 as ue,a6 as me,a7 as W,a8 as ke,a9 as fe,aa as Ee,C as S,ab as Se,n as X,ac as he,ad as Ae,ae as we,af as f,ag as ye,P as k,ah as Ne,ai as Me,aj as ve,E as xe,d as je,ak as Re,al as Ie,i as Le}from"./useEsNavigator-CCPepSoW.js";import{E as M,D as _,M as b}from"./DokumentasjonSteg-D4gpGgPh.js";import{r as p,a as Te}from"./index-Dl6G-zuu.js";import{c as Z,e as _e,d as be,b as Ce,a as De}from"./OmBarnet-Cmf1HkXn.js";import"./index-D1_ZHIBm.js";import{e as Pe,O as Oe}from"./OppsummeringSteg-DyJsa3mN.js";import{O as Ue}from"./OmBarnetSteg-BRY6AdFN.js";import{S as Fe}from"./SøkersituasjonSteg-DJ9vlHn6.js";import{U as qe}from"./UtenlandsoppholdSteg-DHvf1iIo.js";import{S as Ge}from"./SenereUtenlandsoppholdSteg-DTueQdc2.js";import{T as Ke}from"./TidligereUtenlandsoppholdSteg-BP6lIxcD.js";import{V as Ve}from"./Velkommen-BytumYNz.js";import{n as He,a as Be,e as Je}from"./nn_NO-Deslpf4B.js";import"./index-BfyspvgH.js";import"./ErrorSummaryHookForm-BK0p70mm.js";import"./ConfirmationPanel-BRWpuimZ.js";import"./TidligereUtenlandsoppholdPanel-BfSMpdQ2.js";const{Axios:Rn,AxiosError:In,CanceledError:Ln,isCancel:Tn,CancelToken:_n,VERSION:bn,all:Cn,Cancel:Dn,isAxiosError:$e,spread:Pn,toFormData:On,AxiosHeaders:Un,HttpStatusCode:Fn,formToJSON:qn,getAdapter:Gn,mergeConfig:Kn}=Z;class E extends Error{constructor(o,n,d){super(o);R(this,"callId");R(this,"timestamp");this.callId=n,this.timestamp=d}}class v extends Error{constructor(){super("API_ACCESS_ERROR")}}const Ye=e=>e instanceof v||e instanceof E,ee=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),C=(e,s)=>{const[o,n]=p.useState(),[d,c]=p.useState(!1),[g,r]=p.useState();return p.useEffect(()=>{let l=!1;return(async()=>{var i,a;try{c(!0);const m=await e.get(s,{withCredentials:!0,timeout:60*1e3});l||n(m.data)}catch(m){$e(m)?((i=m.response)==null?void 0:i.status)===401||((a=m.response)==null?void 0:a.status)===403?r(new v):r(new E(m.message)):m instanceof Error?r(new E(m.message)):r(new E(String(m)))}finally{c(!1)}})(),()=>{l=!0}},[e,s]),{data:o,loading:d,error:g}},ze=e=>Z.create({baseURL:e,withCredentials:!0}),D="ukjent uuid",ne=async(e,s,o,n,d=!1,c)=>{var g,r,l,u;try{return(await e.post(s,o,{withCredentials:!0,timeout:6e4,signal:c,headers:d?{"content-type":"application/json;"}:{}})).data}catch(i){if(ee(i)&&i.code!=="ERR_CANCELED"){if(((g=i.response)==null?void 0:g.status)===401||((r=i.response)==null?void 0:r.status)===403)throw new v;const a=i.response&&i.response.data&&i.response.data.uuid?i.response.data.uuid:D,m=a!==D?a.slice(0,8):a;throw new E(n+m,a,(u=(l=i.response)==null?void 0:l.data)==null?void 0:u.timestamp)}throw i instanceof Error?new E(i.message):new E(String(i))}},P="ukjent uuid",I=async(e,s,o,n,d)=>{var c,g;try{return(await e.delete(s,{withCredentials:!0,timeout:6e4,signal:d,data:n})).data}catch(r){if(ee(r)&&r.code!=="ERR_CANCELED"){if(((c=r.response)==null?void 0:c.status)===401||((g=r.response)==null?void 0:g.status)===403)throw new v;const l=r.response&&r.response.data&&r.response.data.uuid?r.response.data.uuid:P,u=l!==P?l.slice(0,8):l;throw new E(o+u)}throw r instanceof Error?new E(r.message):new E(String(r))}};/**
 * React Router DOM v6.22.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Qe="6";try{window.__reactRouterVersion=Qe}catch{}const We="startTransition",O=Te[We];function Xe(e){let{basename:s,children:o,future:n,window:d}=e,c=p.useRef();c.current==null&&(c.current=ue({window:d,v5Compat:!0}));let g=c.current,[r,l]=p.useState({action:g.action,location:g.location}),{v7_startTransition:u}=n||{},i=p.useCallback(a=>{u&&O?O(()=>l(a)):l(a)},[l,u]);return p.useLayoutEffect(()=>g.listen(i),[g,i]),p.createElement(me,{basename:s,children:o,location:r.location,navigationType:r.action,navigator:g,future:n})}var U;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(U||(U={}));var F;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(F||(F={}));const te=e=>{window.location.href=e},Ze=e=>{te(e+"?redirect="+window.location.origin)},se="selectedLocale",en=()=>sessionStorage.getItem(se)||"nb",nn=e=>{sessionStorage.setItem(se,e)},oe=1,q="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",tn=(e,s,o)=>{const n=W(),d=ke(),c=fe(),[g,r]=p.useState(!1),l=p.useRef();return p.useEffect(()=>{g&&(async()=>{r(!1);const a=d[S.CURRENT_PATH];a?(n(a),await ne(e,"/storage/engangsstonad",{version:oe,locale:s,...d},q)):(await I(e,"/storage/engangsstonad",q),o(!1),c(),n("/")),l.current&&l.current()})().catch(a=>{Ee(a.message),l.current&&l.current()})},[g]),p.useCallback(()=>(r(!0),new Promise(a=>{l.current=a})),[])},sn=(e,s)=>{const o=(s==null?void 0:s.vedlegg.map(n=>n.id))||[];if(_e(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(n=>n.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:o};if(be(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(Ce(e)&&s&&Pe(s))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:s.terminbekreftelsedato,vedleggreferanser:o};throw Error("Det er feil i data om barnet")},G="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",on=(e,s,o)=>{const n=Se(),[d,c]=p.useState(),g=p.useCallback(async r=>{const l=X(n(S.OM_BARNET)),u=n(S.DOKUMENTASJON),i=n(S.UTENLANDSOPPHOLD_TIDLIGERE),a=n(S.UTENLANDSOPPHOLD_SENERE),m={type:"engangsstønad",språkkode:s,barn:sn(l,u),oppholdIUtlandet:((i==null?void 0:i.utenlandsoppholdSiste12Mnd)||[]).concat((a==null?void 0:a.utenlandsoppholdNeste12Mnd)||[]),vedlegg:(u==null?void 0:u.vedlegg.map(A=>({...A,dokumenterer:{type:"barn"}})))||[]};let j;try{j=await ne(e,"/soknad/engangsstonad",m,G,!0,r)}catch(A){if(Ye(A))c(A);else throw new Error("This should never happen")}if(j){try{await I(e,"/storage/engangsstonad",G,r)}catch{}o(j)}},[n,s,o,e]);return p.useMemo(()=>({sendSøknad:g,errorSendSøknad:d}),[g,d])},h=ze(M.REST_API_URL),x=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(he,{size:"2xlarge"})}),L=({error:e})=>e instanceof v?(Ze(M.LOGIN_URL),t.jsx(x,{})):t.jsx(Ae,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),re=({locale:e,onChangeLocale:s,søker:o,mellomlagretData:n})=>{const d=W(),[c,g]=p.useState(!1),[r,l]=p.useState(),{sendSøknad:u,errorSendSøknad:i}=on(h,e,l),a=tn(h,e,g);return p.useEffect(()=>{n&&n[S.CURRENT_PATH]&&(g(!0),n.locale&&s(n.locale),d(n[S.CURRENT_PATH]))},[n]),r?M.INNSYN?(te(r.saksNr?`${M.INNSYN}/sak/${r.saksNr}/redirectFromSoknad`:`${M.INNSYN}/redirectFromSoknad`),t.jsx(x,{})):t.jsx("div",{children:"Redirected to Innsyn"}):i?t.jsx(L,{error:i}):t.jsxs(we,{children:[!c&&t.jsx(f,{path:"*",element:t.jsx(ye,{to:k.VELKOMMEN})}),t.jsx(f,{path:k.VELKOMMEN,element:t.jsx(Ve,{locale:e,onChangeLocale:s,startSøknad:g,erVelkommen:c,mellomlagreOgNaviger:a})}),c&&t.jsxs(t.Fragment,{children:[t.jsx(f,{path:k.SØKERSITUASJON,element:t.jsx(Fe,{mellomlagreOgNaviger:a})}),t.jsx(f,{path:k.OM_BARNET,element:t.jsx(Ue,{kjønn:o.kjønn,mellomlagreOgNaviger:a})}),t.jsx(f,{path:k.TERMINBEKREFTELSE,element:t.jsx(_,{mellomlagreOgNaviger:a})}),t.jsx(f,{path:k.ADOPSJONSBEKREFTELSE,element:t.jsx(_,{mellomlagreOgNaviger:a})}),t.jsx(f,{path:k.UTENLANDSOPPHOLD,element:t.jsx(qe,{mellomlagreOgNaviger:a})}),t.jsx(f,{path:k.TIDLIGERE_UTENLANDSOPPHOLD,element:t.jsx(Ke,{mellomlagreOgNaviger:a})}),t.jsx(f,{path:k.SENERE_UTENLANDSOPPHOLD,element:t.jsx(Ge,{mellomlagreOgNaviger:a})}),t.jsx(f,{path:k.OPPSUMMERING,element:t.jsx(Oe,{søker:o,sendSøknad:u,mellomlagreOgNaviger:a})})]})]})};x.__docgenInfo={description:"",methods:[],displayName:"Spinner"};L.__docgenInfo={description:"",methods:[],displayName:"ApiErrorHandler"};re.__docgenInfo={description:"",methods:[],displayName:"EngangsstønadRoutes"};const ae=({locale:e,onChangeLocale:s})=>{const o=pe();Ne(o.formatMessage({id:"Søknad.Pagetitle"}));const{data:n,error:d}=C(h,"/personinfo"),{data:c,loading:g,error:r}=C(h,"/storage/engangsstonad");if(d||r)return t.jsx(L,{error:X(d||r)});if(!n||g)return t.jsx(x,{});if(!Me(n.fødselsdato))return t.jsx(ve,{appnavn:"Engangsstønad"});const l=(c==null?void 0:c.version)===oe?c:void 0;return t.jsx(xe,{initialState:l,children:t.jsx(re,{locale:e,onChangeLocale:s,søker:n,mellomlagretData:l})})};ae.__docgenInfo={description:"",methods:[],displayName:"Engangsstønad"};const ie=en(),rn={nb:He,nn:Be,en:Je};je.locale(ie);const an=async()=>{try{await I(h,"/storage/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},le=()=>{const[e,s]=p.useState(ie),o=p.useCallback(n=>{nn(n),s(n),document.documentElement.setAttribute("lang",n)},[]);return t.jsx(Re,{locale:e,messagesGroupedByLocale:rn,children:t.jsx(Ie,{appName:"Engangsstønad",retryCallback:an,children:t.jsx(Xe,{children:t.jsx(ae,{locale:e,onChangeLocale:o})})})})},ge=le;le.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const ln={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},Vn={title:"Applikasjon - Engangsstønad (AppContainer)",component:ge},T=({søker:e,mellomlagretData:s,doLogging:o=!0})=>{Le();const n=new b(h);n.onGet("/personinfo").reply(()=>(o&&console.log("network request: get /personinfo"),[200,e])),n.onGet("/storage/engangsstonad").reply(()=>(o&&console.log("network request: get /storage/engangstonad"),[200,s])),n.onPost("/soknad/engangsstonad").reply(()=>(o&&console.log("network request: post /soknad/engangsstonad"),[200,ln])),n.onPost("/storage/engangsstonad").reply(()=>(o&&console.log("network request: post /storage/engangstonad"),[200])),n.onDelete("/storage/engangsstonad").reply(()=>(o&&console.log("network request: delete /storage/engangstonad"),[200]));const d=new b(De);return d.onPost("/storage/engangsstonad/vedlegg").reply(200),d.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200),t.jsx(ge,{})},w=T.bind({});w.args={søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const y=T.bind({});y.args={mellomlagretData:{version:1,locale:"nb",[S.SØKERSITUASJON]:{situasjon:"fødsel"},[S.CURRENT_PATH]:k.SØKERSITUASJON},søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const N=T.bind({});N.args={søker:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};var K,V,H;w.parameters={...w.parameters,docs:{...(K=w.parameters)==null?void 0:K.docs,source:{originalSource:`({
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
}`,...(H=(V=w.parameters)==null?void 0:V.docs)==null?void 0:H.source}}};var B,J,$;y.parameters={...y.parameters,docs:{...(B=y.parameters)==null?void 0:B.docs,source:{originalSource:`({
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
}`,...($=(J=y.parameters)==null?void 0:J.docs)==null?void 0:$.source}}};var Y,z,Q;N.parameters={...N.parameters,docs:{...(Y=N.parameters)==null?void 0:Y.docs,source:{originalSource:`({
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
}`,...(Q=(z=N.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};const Hn=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{w as SøkerErKvinne,y as SøkerErKvinneMedMellomlagretData,N as SøkerErMann,Hn as __namedExportsOrder,Vn as default};
