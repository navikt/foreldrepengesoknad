import{i as p,j as t}from"./ByttBrowserModal-B0_Lz7to.js";import{a as d}from"./chunk-454WOBUV-CM0pFb8Z.js";import{a as g,S as b,C as i}from"./routes-E6r3g9EM.js";import{V as l}from"./VelgArbeid-v1C1NiaJ.js";import{M as v}from"./useSvpNavigator-DoJmEIyW.js";import"./index-CTjT7uj6.js";import"./index-BRV0Se7Z.js";import"./index-CYM-y3Gt.js";import"./v4-CQkTLCs1.js";import"./minMax-DvJ4k8UE.js";import"./Checkbox-EHX0GevH.js";import"./velgArbeidFormUtils-CAKio3sC.js";import"./FrilansPanel-ClnpQ31W.js";import"./EgenNæring-BaE2fK_g.js";import"./_baseUniq-CD0pQQ78.js";import"./_overArg-BRHtLdyz.js";const G={title:"steps/VelgArbeid",component:l},a=()=>(...r)=>(d("button-click")(...r),Promise.resolve()),T=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],f=({mellomlagreSøknadOgNaviger:r=a(),gåTilNesteSide:m=d("button-click")})=>(p(),t.jsx(v,{initialEntries:[g.VELG_ARBEID],children:t.jsx(b,{onDispatch:m,initialState:{[i.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[i.TILRETTELEGGINGER]:[],[i.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:t.jsx(l,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:a(),arbeidsforhold:T})})})),e=f.bind({});var o,s,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.VELG_ARBEID]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
        harHattArbeidIUtlandet: false,
        harJobbetSomFrilans: false,
        harJobbetSomSelvstendigNæringsdrivende: false
      },
      [ContextDataType.TILRETTELEGGINGER]: [],
      [ContextDataType.OM_BARNET]: {
        erBarnetFødt: false,
        termindato: '2024-02-18',
        fødselsdato: '2024-02-18'
      }
    }}>
                <VelgArbeid mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const Z=["Default"];export{e as Default,Z as __namedExportsOrder,G as default};
