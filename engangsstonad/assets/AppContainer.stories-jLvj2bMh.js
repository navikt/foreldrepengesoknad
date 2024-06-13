var me=Object.defineProperty;var fe=(e,s,o)=>s in e?me(e,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[s]=o;var R=(e,s,o)=>(fe(e,typeof s!="symbol"?s+"":s,o),o);import{aa as ke,n as ne,j as t,ab as Ee,ac as Se,u as he,ad as Ae,ae as Me,af as we,d as ye,ag as Ne,ah as xe,i as ve}from"./dateFormValidation-ht3trlp_.js";import{d as je,R as Re,e as te,f as be,g as Ie,C as S,h as Le,i as Te,j as k,N as _e,P as f,E as De}from"./useEsNavigator-C8TR9kJX.js";import{E as N,D as P,M as O}from"./DokumentasjonSteg-DLlPjeWe.js";import{r as p,$ as Ce}from"./index-DVXBtNgz.js";import{b as se,a as Pe}from"./attachmentApi-ChTKvg06.js";import"./index-Cbx7Fas8.js";import{b as Oe,u as b,a as I,o as L,e as Ue,n as Fe}from"./nn_NO-DBu8Uehs.js";import{e as qe,O as Ge}from"./OppsummeringSteg-BQzfZyXf.js";import{e as Ke,b as Ve,a as He}from"./OmBarnet-BV6De4cI.js";import{O as $e}from"./OmBarnetSteg-B6sITzNr.js";import{S as Be}from"./SøkersituasjonSteg-B7CB4Jgt.js";import{U as Je}from"./UtenlandsoppholdSteg-DE2ehDMT.js";import{S as Ye}from"./SenereUtenlandsoppholdSteg-KP1oBiAg.js";import{T as ze}from"./TidligereUtenlandsoppholdSteg-Bs6AxIA0.js";import{V as Qe}from"./Velkommen-CdPjWYu1.js";import"./index-Dcs0RV0A.js";import"./tslib.es6-CMwweBXX.js";import"./ErrorSummaryHookForm-D4yKW1j8.js";import"./SøkerOppsummeringspunkt-pD6D7Ssq.js";import"./ConfirmationPanel-DgESEgmi.js";import"./TidligereUtenlandsoppholdPanel-C3D1CP4K.js";const{Axios:Kn,AxiosError:Vn,CanceledError:Hn,isCancel:$n,CancelToken:Bn,VERSION:Jn,all:Yn,Cancel:zn,isAxiosError:We,spread:Qn,toFormData:Wn,AxiosHeaders:Xn,HttpStatusCode:Zn,formToJSON:et,getAdapter:nt,mergeConfig:tt}=se;class E extends Error{constructor(o,n,d){super(o);R(this,"callId");R(this,"timestamp");this.callId=n,this.timestamp=d}}class x extends Error{constructor(){super("API_ACCESS_ERROR")}}const Xe=e=>e instanceof x||e instanceof E,oe=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),U=(e,s)=>{const[o,n]=p.useState(),[d,c]=p.useState(!1),[g,r]=p.useState();return p.useEffect(()=>{let l=!1;return(async()=>{var i,a;try{c(!0);const m=await e.get(s,{withCredentials:!0,timeout:60*1e3});l||n(m.data)}catch(m){We(m)?((i=m.response)==null?void 0:i.status)===401||((a=m.response)==null?void 0:a.status)===403?r(new x):r(new E(m.message)):m instanceof Error?r(new E(m.message)):r(new E(String(m)))}finally{c(!1)}})(),()=>{l=!0}},[e,s]),{data:o,loading:d,error:g}},Ze=e=>se.create({baseURL:e,withCredentials:!0}),F="ukjent uuid",re=async(e,s,o,n,d=!1,c)=>{var g,r,l,u;try{return(await e.post(s,o,{withCredentials:!0,timeout:6e4,signal:c,headers:d?{"content-type":"application/json;"}:{}})).data}catch(i){if(oe(i)&&i.code!=="ERR_CANCELED"){if(((g=i.response)==null?void 0:g.status)===401||((r=i.response)==null?void 0:r.status)===403)throw new x;const a=i.response&&i.response.data&&i.response.data.uuid?i.response.data.uuid:F,m=a!==F?a.slice(0,8):a;throw new E(n+m,a,(u=(l=i.response)==null?void 0:l.data)==null?void 0:u.timestamp)}throw i instanceof Error?new E(i.message):new E(String(i))}},q="ukjent uuid",_=async(e,s,o,n,d)=>{var c,g;try{return(await e.delete(s,{withCredentials:!0,timeout:6e4,signal:d,data:n})).data}catch(r){if(oe(r)&&r.code!=="ERR_CANCELED"){if(((c=r.response)==null?void 0:c.status)===401||((g=r.response)==null?void 0:g.status)===403)throw new x;const l=r.response&&r.response.data&&r.response.data.uuid?r.response.data.uuid:q,u=l!==q?l.slice(0,8):l;throw new E(o+u)}throw r instanceof Error?new E(r.message):new E(String(r))}};/**
 * React Router DOM v6.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const en="6";try{window.__reactRouterVersion=en}catch{}const nn="startTransition",G=Ce[nn];function tn(e){let{basename:s,children:o,future:n,window:d}=e,c=p.useRef();c.current==null&&(c.current=je({window:d,v5Compat:!0}));let g=c.current,[r,l]=p.useState({action:g.action,location:g.location}),{v7_startTransition:u}=n||{},i=p.useCallback(a=>{u&&G?G(()=>l(a)):l(a)},[l,u]);return p.useLayoutEffect(()=>g.listen(i),[g,i]),p.createElement(Re,{basename:s,children:o,location:r.location,navigationType:r.action,navigator:g,future:n})}var K;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(K||(K={}));var V;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(V||(V={}));const sn="From {fom} until {tom}",on={tidsperiode:sn,"tidsperiode.kort":"{fom} - {tom}"},rn="Fra {fom} til {tom}",an={tidsperiode:rn,"tidsperiode.kort":"{fom} - {tom}"},ln="Frå {fom} til {tom}",gn={tidsperiode:ln,"tidsperiode.kort":"{fom} - {tom}"},ae=e=>{window.location.href=e},cn=e=>{ae(e+"?redirect="+window.location.origin)},ie="selectedLocale",dn=()=>sessionStorage.getItem(ie)||"nb",pn=e=>{sessionStorage.setItem(ie,e)},T={nb:an,nn:gn,en:on},le=1,H="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",un=(e,s,o)=>{const n=te(),d=be(),c=Ie(),[g,r]=p.useState(!1),l=p.useRef();return p.useEffect(()=>{g&&(async()=>{r(!1);const a=d[S.CURRENT_PATH];a?(n(a),await re(e,"/storage/engangsstonad",{version:le,locale:s,...d},H)):(await _(e,"/storage/engangsstonad",H),o(!1),c(),n("/")),l.current&&l.current()})().catch(a=>{ke(a.message),l.current&&l.current()})},[g]),p.useCallback(()=>(r(!0),new Promise(a=>{l.current=a})),[])},mn=(e,s)=>{const o=(s==null?void 0:s.vedlegg.map(n=>n.id))||[];if(Ke(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(n=>n.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:o};if(Ve(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(He(e)&&s&&qe(s))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:s.terminbekreftelsedato,vedleggreferanser:o};throw Error("Det er feil i data om barnet")},$="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",fn=(e,s,o)=>{const n=Le(),[d,c]=p.useState(),g=p.useCallback(async r=>{const l=ne(n(S.OM_BARNET)),u=n(S.DOKUMENTASJON),i=n(S.UTENLANDSOPPHOLD_TIDLIGERE),a=n(S.UTENLANDSOPPHOLD_SENERE),m={type:"engangsstønad",språkkode:s,barn:mn(l,u),oppholdIUtlandet:((i==null?void 0:i.utenlandsoppholdSiste12Mnd)||[]).concat((a==null?void 0:a.utenlandsoppholdNeste12Mnd)||[]),vedlegg:(u==null?void 0:u.vedlegg.map(A=>({...A,dokumenterer:{type:"barn"}})))||[]};let j;try{j=await re(e,"/soknad/engangsstonad",m,$,!0,r)}catch(A){if(Xe(A))c(A);else throw new Error("This should never happen")}if(j){try{await _(e,"/storage/engangsstonad",$,r)}catch{}o(j)}},[n,s,o,e]);return p.useMemo(()=>({sendSøknad:g,errorSendSøknad:d}),[g,d])},h=Ze(N.REST_API_URL),v=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(Ee,{size:"2xlarge"})}),D=({error:e})=>e instanceof x?(cn(N.LOGIN_URL),t.jsx(v,{})):t.jsx(Se,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),ge=({locale:e,onChangeLocale:s,søker:o,mellomlagretData:n})=>{const d=te(),[c,g]=p.useState(!1),[r,l]=p.useState(),{sendSøknad:u,errorSendSøknad:i}=fn(h,e,l),a=un(h,e,g);return p.useEffect(()=>{n&&n[S.CURRENT_PATH]&&(g(!0),n.locale&&s(n.locale),d(n[S.CURRENT_PATH]))},[n]),r?N.INNSYN?(ae(r.saksNr?`${N.INNSYN}/sak/${r.saksNr}/redirectFromSoknad`:`${N.INNSYN}/redirectFromSoknad`),t.jsx(v,{})):t.jsx("div",{children:"Redirected to Innsyn"}):i?t.jsx(D,{error:i}):t.jsxs(Te,{children:[!c&&t.jsx(k,{path:"*",element:t.jsx(_e,{to:f.VELKOMMEN})}),t.jsx(k,{path:f.VELKOMMEN,element:t.jsx(Qe,{locale:e,onChangeLocale:s,startSøknad:g,erVelkommen:c,mellomlagreOgNaviger:a})}),c&&t.jsxs(t.Fragment,{children:[t.jsx(k,{path:f.SØKERSITUASJON,element:t.jsx(Be,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.OM_BARNET,element:t.jsx($e,{kjønn:o.kjønn,mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.TERMINBEKREFTELSE,element:t.jsx(P,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.ADOPSJONSBEKREFTELSE,element:t.jsx(P,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.UTENLANDSOPPHOLD,element:t.jsx(Je,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.TIDLIGERE_UTENLANDSOPPHOLD,element:t.jsx(ze,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.SENERE_UTENLANDSOPPHOLD,element:t.jsx(Ye,{mellomlagreOgNaviger:a})}),t.jsx(k,{path:f.OPPSUMMERING,element:t.jsx(Ge,{søker:o,sendSøknad:u,mellomlagreOgNaviger:a})})]})]})};v.__docgenInfo={description:"",methods:[],displayName:"Spinner"};D.__docgenInfo={description:"",methods:[],displayName:"ApiErrorHandler"};ge.__docgenInfo={description:"",methods:[],displayName:"EngangsstønadRoutes"};const ce=({locale:e,onChangeLocale:s})=>{const o=he();Ae(o.formatMessage({id:"Søknad.Pagetitle"}));const{data:n,error:d}=U(h,"/personinfo"),{data:c,loading:g,error:r}=U(h,"/storage/engangsstonad");if(d||r)return t.jsx(D,{error:ne(d||r)});if(!n||g)return t.jsx(v,{});if(!Me(n.fødselsdato))return t.jsx(we,{appnavn:"Engangsstønad"});const l=(c==null?void 0:c.version)===le?c:void 0;return t.jsx(De,{initialState:l,children:t.jsx(ge,{locale:e,onChangeLocale:s,søker:n,mellomlagretData:l})})};ce.__docgenInfo={description:"",methods:[],displayName:"Engangsstønad"};const kn={...Fe,...b.nb,...I.nb,...L.nb,...T.nb},de=dn(),En={nb:kn,nn:{...Oe,...b.nn,...I.nn,...L.nn,...T.nn},en:{...Ue,...b.en,...I.en,...L.en,...T.en}};ye.locale(de);const Sn=async()=>{try{await _(h,"/storage/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},pe=()=>{const[e,s]=p.useState(de),o=p.useCallback(n=>{pn(n),s(n),document.documentElement.setAttribute("lang",n)},[]);return t.jsx(Ne,{locale:e,messagesGroupedByLocale:En,children:t.jsx(xe,{appName:"Engangsstønad",retryCallback:Sn,children:t.jsx(tn,{children:t.jsx(ce,{locale:e,onChangeLocale:o})})})})},ue=pe;pe.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const hn={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},st={title:"Applikasjon - Engangsstønad (AppContainer)",component:ue},C=({søker:e,mellomlagretData:s,doLogging:o=!0})=>{ve();const n=new O(h);n.onGet("/personinfo").reply(()=>(o&&console.log("network request: get /personinfo"),[200,e])),n.onGet("/storage/engangsstonad").reply(()=>(o&&console.log("network request: get /storage/engangstonad"),[200,s])),n.onPost("/soknad/engangsstonad").reply(()=>(o&&console.log("network request: post /soknad/engangsstonad"),[200,hn])),n.onPost("/storage/engangsstonad").reply(()=>(o&&console.log("network request: post /storage/engangstonad"),[200])),n.onDelete("/storage/engangsstonad").reply(()=>(o&&console.log("network request: delete /storage/engangstonad"),[200]));const d=new O(Pe);return d.onPost("/storage/engangsstonad/vedlegg").reply(200),d.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200),t.jsx(ue,{})},M=C.bind({});M.args={søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const w=C.bind({});w.args={mellomlagretData:{version:1,locale:"nb",[S.SØKERSITUASJON]:{situasjon:"fødsel"},[S.CURRENT_PATH]:f.SØKERSITUASJON},søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const y=C.bind({});y.args={søker:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};var B,J,Y;M.parameters={...M.parameters,docs:{...(B=M.parameters)==null?void 0:B.docs,source:{originalSource:`({
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
}`,...(Y=(J=M.parameters)==null?void 0:J.docs)==null?void 0:Y.source}}};var z,Q,W;w.parameters={...w.parameters,docs:{...(z=w.parameters)==null?void 0:z.docs,source:{originalSource:`({
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
}`,...(W=(Q=w.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Z,ee;y.parameters={...y.parameters,docs:{...(X=y.parameters)==null?void 0:X.docs,source:{originalSource:`({
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
}`,...(ee=(Z=y.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};const ot=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{M as SøkerErKvinne,w as SøkerErKvinneMedMellomlagretData,y as SøkerErMann,ot as __namedExportsOrder,st as default};
