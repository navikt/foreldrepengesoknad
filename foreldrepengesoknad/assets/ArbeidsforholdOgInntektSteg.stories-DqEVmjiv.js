import{j as i}from"./jsx-runtime-Cw0GR0a5.js";import{a as g}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{S as x,B as b}from"./useFpNavigator-BgoTWwZ3.js";import"./Uttaksdagen-C7qvZjyy.js";import{i as f}from"./ByttBrowserModal-B_8YCR86.js";import{M as v,F as D,C as o}from"./FpDataContext-7C49oNtd.js";import{A as S}from"./ArbeidsforholdOgInntektSteg-C8Wt4QrW.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-DSgjoNiG.js";import"./tslib.es6-CcC3cBMT.js";import"./Tidsperioden-BBrWkrto.js";import"./index-BRV0Se7Z.js";import"./Link-D0RLsnK2.js";import"./Label-C_UMiHsP.js";import"./index-CCQ3W5xA.js";import"./index-9r8iugjR.js";import"./_baseToString-Cq6MbKF_.js";import"./_createSet-D2BJ0WVx.js";import"./iframe-DUfcf0my.js";import"../sb-preview/runtime.js";import"./ErrorSummaryHookForm-D14xGqJh.js";import"./VStack-DmKyg8-d.js";import"./message-CjkJih2D.js";import"./guid-CsArkN6i.js";import"./links-BegG-28I.js";import"./_baseForOwn-_34OS4c-.js";import"./_baseUniq-BwrlAMKh.js";import"./dateFormValidation-DamLOwkK.js";import"./bemUtils-DmNyTjfb.js";import"./arbeidsforholdUtils-Du9z7oYc.js";import"./ArbeidsforholdOgInntektPanel-Ce54Xmoq.js";const re={title:"steps/ArbeidsforholdOgInntektSteg",component:S},k=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],n=()=>(...t)=>(g("button-click")(...t),Promise.resolve()),T=({mellomlagreSøknadOgNaviger:t=n(),gåTilNesteSide:u=g("button-click"),arbeidsforhold:c=k})=>(f(),i.jsx(v,{initialEntries:[x.ARBEID_OG_INNTEKT],children:i.jsx(D,{onDispatch:u,initialState:{[o.SØKERSITUASJON]:{rolle:"mor",situasjon:"fødsel"},[o.OM_BARNET]:{termindato:"2024-02-18",type:b.FØDT,fødselsdatoer:["2024-02-18"],antallBarn:1}},children:i.jsx(S,{mellomlagreSøknadOgNaviger:t,avbrytSøknad:n(),arbeidsforhold:c})})})),r=T.bind({}),e=T.bind({});e.args={arbeidsforhold:[]};var a,s,d;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  arbeidsforhold = DEFAULT_ARBEIDSFORHOLD
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.ARBEID_OG_INNTEKT]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: 'fødsel'
      },
      [ContextDataType.OM_BARNET]: {
        termindato: '2024-02-18',
        type: BarnType.FØDT,
        fødselsdatoer: ['2024-02-18'],
        antallBarn: 1
      }
    }}>
                <ArbeidsforholdOgInntektSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(d=(s=r.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};var m,l,p;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  arbeidsforhold = DEFAULT_ARBEIDSFORHOLD
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.ARBEID_OG_INNTEKT]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: 'fødsel'
      },
      [ContextDataType.OM_BARNET]: {
        termindato: '2024-02-18',
        type: BarnType.FØDT,
        fødselsdatoer: ['2024-02-18'],
        antallBarn: 1
      }
    }}>
                <ArbeidsforholdOgInntektSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(p=(l=e.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const te=["Default","BrukerKanIkkeSøkeVedKunNeiSvar"];export{e as BrukerKanIkkeSøkeVedKunNeiSvar,r as Default,te as __namedExportsOrder,re as default};
