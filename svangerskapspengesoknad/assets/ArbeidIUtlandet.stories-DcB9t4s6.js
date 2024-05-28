import{j as t}from"./Button-CMP7iQqg.js";import{a as d}from"./chunk-MZXVCX43-DWuJqIWT.js";import{i as p}from"./dateUtils-CN4o7I8p.js";import{a as g,S as b,C as i}from"./routes-ohrnZimV.js";import{A as m}from"./ArbeidIUtlandetStep-BtscMgkn.js";import{M as v}from"./useSvpNavigator-COpmW_f5.js";import"./index-DVXBtNgz.js";import"./tslib.es6-pJfR_DrR.js";import"./v4-D8aEg3BZ.js";import"./ErrorSummaryHookForm-DfZ2GWih.js";import"./calendarLabel.module-D4JBI6pR.js";import"./Modal-C4wk8HnH.js";import"./index-Cbx7Fas8.js";import"./index-Dcs0RV0A.js";import"./dateFormValidation-DPpK1ZKT.js";import"./EgenNæring-DdBVG6ty.js";import"./Frilans-B_RcwIAw.js";import"./validationUtils-B-zpIIHD.js";import"./Plus-C8lbhYrq.js";import"./_baseIteratee-Br7F5h5R.js";import"./_baseUniq-BxoSU8YA.js";const J={title:"steps/ArbeidIUtlandet",component:m},o=()=>(...r)=>(d("button-click")(...r),Promise.resolve()),S=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],f=({mellomlagreSøknadOgNaviger:r=o(),gåTilNesteSide:l=d("button-click")})=>(p(),t.jsx(v,{initialEntries:[g.ARBEID_I_UTLANDET],children:t.jsx(b,{onDispatch:l,initialState:{[i.INNTEKTSINFORMASJON]:{harHattArbeidIUtlandet:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[i.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:t.jsx(m,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:o(),arbeidsforhold:S})})})),e=f.bind({});var a,n,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(s=(n=e.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const j=["Default"];export{e as Default,j as __namedExportsOrder,J as default};
