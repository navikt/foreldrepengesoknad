import{j as t}from"./index-f7e8eec7.js";import{a as d}from"./chunk-WFFRPTHA-a68c42c5.js";import{i as p}from"./VStack-1b7d0c8f.js";import{a as g,S as b,C as i}from"./routes-01c30f19.js";import{A as m}from"./ArbeidIUtlandetStep-759a0af5.js";import{M as v}from"./index-0df0c4a0.js";import"./index-f1f2c4b1.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./Button-07c65ca4.js";import"./Modal-d372bfb0.js";import"./index-da441cba.js";import"./index-b580f7e8.js";import"./createIntl-34ad85ce.js";import"./ErrorSummaryHookForm-64af9f17.js";import"./useSvpNavigator-d2e8748f.js";import"./_baseIteratee-c0f324be.js";import"./_baseUniq-332e0f4d.js";import"./EgenNæring-1a3aa973.js";import"./Frilans-f45bffb0.js";import"./HorizontalLine-a53a7446.js";import"./validationUtils-f019996a.js";const j={title:"steps/ArbeidIUtlandet",component:m},o=()=>(...r)=>(d("button-click")(...r),Promise.resolve()),S=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],f=({mellomlagreSøknadOgNaviger:r=o(),gåTilNesteSide:l=d("button-click")})=>(p(),t.jsx(v,{initialEntries:[g.ARBEID_I_UTLANDET],children:t.jsx(b,{onDispatch:l,initialState:{[i.INNTEKTSINFORMASJON]:{harHattArbeidIUtlandet:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[i.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:t.jsx(m,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:o(),arbeidsforhold:S})})})),e=f.bind({});var a,n,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.ARBEID_I_UTLANDET]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.INNTEKTSINFORMASJON]: {
        harHattArbeidIUtlandet: true,
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
            </SvpDataContext>
        </MemoryRouter>;
}`,...(s=(n=e.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const V=["Default"];export{e as Default,V as __namedExportsOrder,j as default};
