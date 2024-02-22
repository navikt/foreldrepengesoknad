import{j as o}from"./Modal-5f6515f6.js";import{a as x}from"./chunk-WFFRPTHA-80d37c1b.js";import{S as I,C as i}from"./routes-345f7acb.js";import{T as m,D as T,A as b}from"./useFortsettSøknadSenere-bfd4ef8d.js";import{P as v}from"./PerioderStep-3614c0c0.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./fridagerUtils-c1457aac.js";import"./index-b580f7e8.js";import"./amplitude-ef1b2f86.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./validation-631bcf6e.js";import"./Bedriftsbanner-f1a8447a.js";import"./VStack-f6b4d53e.js";import"./dateUtils-8841aa4b.js";import"./HorizontalLine-831b0129.js";import"./tilretteleggingValidation-151de6cb.js";import"./BackButton-f80f5ffe.js";import"./Plus-b48ff6db.js";import"./Alert-4f08e6e5.js";const Q={title:"steps/PerioderStep",component:v},c=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],n=()=>(...r)=>(x("button-click")(...r),Promise.resolve()),E=({mellomlagreSøknadOgNaviger:r=n(),gåTilNesteSide:f,tilrettelegging:S})=>o.jsx(I,{onDispatch:f,initialState:{[i.TILRETTELEGGINGER]:S,[i.VALGT_TILRETTELEGGING_ID]:"263929546-6215-9868-5127-161910165730101",[i.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:o.jsx(v,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:n(),arbeidsforhold:c})}),e=E.bind({});e.args={tilrettelegging:[{id:"263929546-6215-9868-5127-161910165730101",arbeidsforhold:{navn:"Omsorgspartner Vestfold AS",stillinger:[{fom:"2019-01-01",stillingsprosent:100}]},type:m.DELVIS,delvisTilretteleggingPeriodeType:T.VARIERTE_PERIODER}]};const t=E.bind({});t.args={tilrettelegging:[{id:"263929546-6215-9868-5127-161910165730101",behovForTilretteleggingFom:"2023-09-01",arbeidsforhold:{navn:"Omsorgspartner Vestfold AS",type:b.VIRKSOMHET,startdato:"2023-09-01",stillinger:[{fom:"2023-09-01",stillingsprosent:10},{fom:"2023-10-01",stillingsprosent:20},{fom:"2023-11-01",stillingsprosent:0}]},type:m.DELVIS,delvisTilretteleggingPeriodeType:T.VARIERTE_PERIODER}]};var s,a,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  tilrettelegging
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: '2024-02-18',
      fødselsdato: '2024-02-18'
    }
  }}>
            <PerioderStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
        </SvpDataContext>;
}`,...(l=(a=e.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};var d,g,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  tilrettelegging
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: '2024-02-18',
      fødselsdato: '2024-02-18'
    }
  }}>
            <PerioderStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
        </SvpDataContext>;
}`,...(p=(g=t.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};const U=["Default","FlereStillinger"];export{e as Default,t as FlereStillinger,U as __namedExportsOrder,Q as default};
