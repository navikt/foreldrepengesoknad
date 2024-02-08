import{j as d}from"./Modal-5f6515f6.js";import{a as V}from"./chunk-WFFRPTHA-80d37c1b.js";import{S as G,M as _}from"./SkjemaSteg-cc185afb.js";import{_ as J}from"./soknad-056e750f.js";import{A as P}from"./useFortsettSøknadSenere-e239225e.js";import"./index-f1f2c4b1.js";import{a as j}from"./attachmentApi-1d2d61fa.js";import{S as H,C as i}from"./routes-345f7acb.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./ErrorSummaryHookForm-738f8944.js";import"./fridagerUtils-57eeeb7b.js";import"./index-b580f7e8.js";import"./dates-ef312fee.js";import"./isNativeReflectConstruct-554b52b6.js";import"./check-dates-d5278c7f.js";import"./ArrowRight-7eea1688.js";import"./IntlProvider-0260fe89.js";import"./links-439b6638.js";import"./VStack-ea079a1e.js";import"./HStack-13158dfb.js";import"./Alert-084535df.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./Paperplane-3462cdad.js";import"./amplitude-672a2544.js";import"./createIntl-f391d6e4.js";import"./validation-631bcf6e.js";import"./dateFormValidation-78b19ee9.js";import"./Bedriftsbanner-d2b21c87.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";const Ae={title:"steps/SkjemaSteg",component:G},m=()=>(...g)=>(V("button-click")(...g),Promise.resolve()),e=J,t=({mellomlagreSøknadOgNaviger:g=m(),gåTilNesteSide:M,skalFeileOpplasting:u,maxAntallVedlegg:R=40,tilrettelegging:L})=>{const p=new _(j);return u||(p.onPost("/rest-api/storage/svangerskapspenger/vedlegg").reply(200),p.onPost("http://localhost:8888/rest/storage/svangerskapspenger/vedlegg").reply(200)),d.jsx(H,{onDispatch:M,initialState:{[i.INNTEKTSINFORMASJON]:{harHattAnnenInntekt:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[i.TILRETTELEGGINGER]:L,[i.VALGT_TILRETTELEGGING_ID]:"263929546-6215-9868-5127-161910165730101",[i.OM_BARNET]:e.søknad.barn},children:d.jsx(G,{mellomlagreSøknadOgNaviger:g,avbrytSøknad:m(),søkerInfo:e.søkerinfo,maxAntallVedlegg:R})})},a=t.bind({});a.args={tilrettelegging:[{...e.søknad.tilrettelegging[0],vedlegg:[]}],skalFeileOpplasting:!1};const n=t.bind({});n.args={tilrettelegging:[{...e.søknad.tilrettelegging[0],vedlegg:[]}],skalFeileOpplasting:!0};const r=t.bind({});r.args={tilrettelegging:e.søknad.tilrettelegging,skalFeileOpplasting:!1};const l=t.bind({});l.args={tilrettelegging:[{...e.søknad.tilrettelegging[0],vedlegg:[]},{...e.søknad.tilrettelegging[0],vedlegg:[]}],skalFeileOpplasting:!1};const o=t.bind({});o.args={tilrettelegging:[{...e.søknad.tilrettelegging[0],arbeidsforhold:{...e.søknad.tilrettelegging[0].arbeidsforhold,type:P.FRILANSER}}],skalFeileOpplasting:!1};const s=t.bind({});s.args={tilrettelegging:e.søknad.tilrettelegging,skalFeileOpplasting:!1,maxAntallVedlegg:2};var x,k,S;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
    [ContextDataType.OM_BARNET]: defaultContext.søknad.barn
  }}>
            <SkjemaSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={defaultContext.søkerinfo} maxAntallVedlegg={maxAntallVedlegg} />
        </SvpDataContext>;
}`,...(S=(k=a.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var c,T,E;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
    [ContextDataType.OM_BARNET]: defaultContext.søknad.barn
  }}>
            <SkjemaSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={defaultContext.søkerinfo} maxAntallVedlegg={maxAntallVedlegg} />
        </SvpDataContext>;
}`,...(E=(T=n.parameters)==null?void 0:T.docs)==null?void 0:E.source}}};var N,v,F;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
    [ContextDataType.OM_BARNET]: defaultContext.søknad.barn
  }}>
            <SkjemaSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={defaultContext.søkerinfo} maxAntallVedlegg={maxAntallVedlegg} />
        </SvpDataContext>;
}`,...(F=(v=r.parameters)==null?void 0:v.docs)==null?void 0:F.source}}};var A,f,I;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
    [ContextDataType.OM_BARNET]: defaultContext.søknad.barn
  }}>
            <SkjemaSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={defaultContext.søkerinfo} maxAntallVedlegg={maxAntallVedlegg} />
        </SvpDataContext>;
}`,...(I=(f=l.parameters)==null?void 0:f.docs)==null?void 0:I.source}}};var O,y,h;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
    [ContextDataType.OM_BARNET]: defaultContext.søknad.barn
  }}>
            <SkjemaSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={defaultContext.søkerinfo} maxAntallVedlegg={maxAntallVedlegg} />
        </SvpDataContext>;
}`,...(h=(y=o.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var b,C,D;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
    [ContextDataType.OM_BARNET]: defaultContext.søknad.barn
  }}>
            <SkjemaSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={defaultContext.søkerinfo} maxAntallVedlegg={maxAntallVedlegg} />
        </SvpDataContext>;
}`,...(D=(C=s.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const fe=["SkalIkkeFeileOpplasting","SkalFeileOpplasting","MedVedlegg","MedToTilrettelegginger","ErTypeFrilans","KanMaxHaToVedlegg"];export{o as ErTypeFrilans,s as KanMaxHaToVedlegg,l as MedToTilrettelegginger,r as MedVedlegg,n as SkalFeileOpplasting,a as SkalIkkeFeileOpplasting,fe as __namedExportsOrder,Ae as default};
