import{j as t}from"./Modal-046e2c19.js";import{a as n}from"./chunk-WFFRPTHA-80d37c1b.js";import{S as a}from"./SenereUtenlandsoppholdSteg-d550c440.js";import{S as l,C as m}from"./routes-33249ab0.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./IntlProvider-49d926ea.js";import"./links-88d1705c.js";import"./dates-3bc796b0.js";import"./index-b580f7e8.js";import"./VStack-976bfc58.js";import"./Alert-ff30ac82.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./amplitude-672a2544.js";import"./createIntl-071bd006.js";import"./ArrowRight-349977b0.js";import"./TidligereUtenlandsoppholdPanel-0b49c771.js";import"./ErrorSummaryHookForm-47b0cb34.js";import"./isNativeReflectConstruct-554b52b6.js";import"./useFortsettSøknadSenere-92fe9728.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./ExpansionCard-69a50a71.js";import"./Plus-67b0fd41.js";import"./validation-631bcf6e.js";const g=()=>(...r)=>(n("button-click")(...r),Promise.resolve()),v=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],S={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},z={title:"steps/SenereUtenlandsoppholdSteg",component:a},b=({mellomlagreSøknadOgNaviger:r=g(),gåTilNesteSide:d,utenlandsforhold:p=S})=>t.jsx(l,{onDispatch:d,initialState:{[m.UTENLANDSOPPHOLD]:p},children:t.jsx(a,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:n("button-click"),arbeidsforhold:v})}),e=b.bind({});var o,i,s;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsforhold = defaultUtenlandsopphold
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.UTENLANDSOPPHOLD]: utenlandsforhold
  }}>
            <SenereUtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} arbeidsforhold={arbeidsforhold} />
        </SvpDataContext>;
}`,...(s=(i=e.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const B=["Default"];export{e as Default,B as __namedExportsOrder,z as default};
