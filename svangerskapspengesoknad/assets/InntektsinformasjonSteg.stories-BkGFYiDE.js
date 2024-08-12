import{j as o}from"./tslib.es6-C_-gbNBy.js";import{a as g}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{i as T}from"./CalendarLabel-BOjWYyGG.js";import{a as v,S as u,C as n}from"./routes-BKH065He.js";import{I as S}from"./InntektsinformasjonSteg-CZUvuFnR.js";import{M as x}from"./useSvpNavigator-CcE3CUWV.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./Modal-jpjfRTmg.js";import"./index-9r8iugjR.js";import"./index-BRV0Se7Z.js";import"./ErrorSummaryHookForm-DYQj2NvG.js";import"./Checkbox-E4i2biKU.js";import"./dateFormValidation-ChXBOKMN.js";import"./velgArbeidFormUtils-CwAzLmny.js";import"./EgenNæring-DdBVG6ty.js";import"./Frilans-B_RcwIAw.js";import"./ReadMore-DQFjhoyC.js";import"./ExpansionCard-zG2D4Nlm.js";import"./_baseIteratee-Dyzk-1k8.js";import"./_baseUniq-DYqiuyAy.js";const V={title:"steps/InntektsinformasjonSteg",component:S},k=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],i=()=>(...t)=>(g("button-click")(...t),Promise.resolve()),f=({mellomlagreSøknadOgNaviger:t=i(),gåTilNesteSide:N=g("button-click"),arbeidsforhold:c=k})=>(T(),o.jsx(x,{initialEntries:[v.INNTEKTSINFORMASJON],children:o.jsx(u,{onDispatch:N,initialState:{[n.UTENLANDSOPPHOLD]:{harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},[n.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:o.jsx(S,{mellomlagreSøknadOgNaviger:t,avbrytSøknad:i(),arbeidsforhold:c})})})),r=f.bind({}),e=f.bind({});e.args={arbeidsforhold:[]};var a,s,d;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  arbeidsforhold = DEFAULT_ARBEIDSFORHOLD
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.INNTEKTSINFORMASJON]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTENLANDSOPPHOLD]: {
        harBoddUtenforNorgeSiste12Mnd: false,
        skalBoUtenforNorgeNeste12Mnd: false
      },
      [ContextDataType.OM_BARNET]: {
        erBarnetFødt: false,
        termindato: '2024-02-18',
        fødselsdato: '2024-02-18'
      }
    }}>
                <InntektsinformasjonSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(d=(s=r.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};var l,m,p;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  arbeidsforhold = DEFAULT_ARBEIDSFORHOLD
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.INNTEKTSINFORMASJON]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTENLANDSOPPHOLD]: {
        harBoddUtenforNorgeSiste12Mnd: false,
        skalBoUtenforNorgeNeste12Mnd: false
      },
      [ContextDataType.OM_BARNET]: {
        erBarnetFødt: false,
        termindato: '2024-02-18',
        fødselsdato: '2024-02-18'
      }
    }}>
                <InntektsinformasjonSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(p=(m=e.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const J=["Default","BrukerKanIkkeSøke"];export{e as BrukerKanIkkeSøke,r as Default,J as __namedExportsOrder,V as default};
