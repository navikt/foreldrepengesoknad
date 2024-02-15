import{j as t}from"./Modal-5f6515f6.js";import{a as p}from"./chunk-WFFRPTHA-80d37c1b.js";import{S as l,C as i}from"./routes-345f7acb.js";import{A as d}from"./ArbeidIUtlandetStep-bf681f08.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./fridagerUtils-89ecc5b6.js";import"./index-b580f7e8.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./useFortsettSøknadSenere-905f921d.js";import"./amplitude-8a437012.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./dateUtils-a13b77b7.js";import"./HorizontalLine-831b0129.js";import"./validation-631bcf6e.js";import"./BackButton-f80f5ffe.js";import"./Plus-b48ff6db.js";const j={title:"steps/ArbeidIUtlandet",component:d},o=()=>(...r)=>(p("button-click")(...r),Promise.resolve()),g=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],v=({mellomlagreSøknadOgNaviger:r=o(),gåTilNesteSide:m})=>t.jsx(l,{onDispatch:m,initialState:{[i.INNTEKTSINFORMASJON]:{harHattAnnenInntekt:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[i.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:t.jsx(d,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:o(),arbeidsforhold:g})}),e=v.bind({});var a,n,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: true,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: '2024-02-18',
      fødselsdato: '2024-02-18'
    }
  }}>
            <ArbeidIUtlandetStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
        </SvpDataContext>;
}`,...(s=(n=e.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const B=["Default"];export{e as Default,B as __namedExportsOrder,j as default};
