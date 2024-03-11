import{j as i}from"./index-f7e8eec7.js";import{a as m}from"./chunk-WFFRPTHA-a68c42c5.js";import{i as x}from"./VStack-28112b15.js";import{a as I,S as R,C as o}from"./routes-ae734381.js";import{T,D as E,A as b}from"./useSvpNavigator-fc3da1bd.js";import{P as v}from"./PerioderStep-35400323.js";import{M as u}from"./index-0df0c4a0.js";import"./index-f1f2c4b1.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./Button-a86d3715.js";import"./Modal-3643fac1.js";import"./index-da441cba.js";import"./index-b580f7e8.js";import"./createIntl-34ad85ce.js";import"./_baseIteratee-c0f324be.js";import"./_baseUniq-332e0f4d.js";import"./ErrorSummaryHookForm-6bc22af4.js";import"./isNativeReflectConstruct-554b52b6.js";import"./dateUtils-aa8e7c2d.js";import"./Bedriftsbanner-82b43752.js";import"./HorizontalLine-35ed19c3.js";import"./tilretteleggingUtils-976cb981.js";import"./numberUtils-1f932ffe.js";import"./validationUtils-250fce27.js";import"./Radio-d0ab925f.js";import"./ReadMore-499561cd.js";const Y={title:"steps/PerioderStep",component:v},y=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],n=()=>(...r)=>(m("button-click")(...r),Promise.resolve()),S=({mellomlagreSøknadOgNaviger:r=n(),gåTilNesteSide:f=m("button-click"),tilrettelegging:c})=>(x(),i.jsx(u,{initialEntries:[I.PERIODER],children:i.jsx(R,{onDispatch:f,initialState:{[o.TILRETTELEGGINGER]:c,[o.VALGT_TILRETTELEGGING_ID]:"263929546-6215-9868-5127-161910165730101",[o.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:i.jsx(v,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:n(),arbeidsforhold:y})})})),e=S.bind({});e.args={tilrettelegging:[{id:"263929546-6215-9868-5127-161910165730101",arbeidsforhold:{navn:"Omsorgspartner Vestfold AS",stillinger:[{fom:"2019-01-01",stillingsprosent:100}]},type:T.DELVIS,delvisTilretteleggingPeriodeType:E.VARIERTE_PERIODER}]};const t=S.bind({});t.args={tilrettelegging:[{id:"263929546-6215-9868-5127-161910165730101",behovForTilretteleggingFom:"2023-09-01",arbeidsforhold:{navn:"Omsorgspartner Vestfold AS",type:b.VIRKSOMHET,startdato:"2023-09-01",stillinger:[{fom:"2023-09-01",stillingsprosent:10},{fom:"2023-10-01",stillingsprosent:20},{fom:"2023-11-01",stillingsprosent:0}]},type:T.DELVIS,delvisTilretteleggingPeriodeType:E.VARIERTE_PERIODER}]};var s,a,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  tilrettelegging
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODER]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
      [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
      [ContextDataType.OM_BARNET]: {
        erBarnetFødt: false,
        termindato: '2024-02-18',
        fødselsdato: '2024-02-18'
      }
    }}>
                <PerioderStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(l=(a=e.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};var d,g,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  tilrettelegging
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODER]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
      [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
      [ContextDataType.OM_BARNET]: {
        erBarnetFødt: false,
        termindato: '2024-02-18',
        fødselsdato: '2024-02-18'
      }
    }}>
                <PerioderStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(p=(g=t.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};const $=["Default","FlereStillinger"];export{e as Default,t as FlereStillinger,$ as __namedExportsOrder,Y as default};
