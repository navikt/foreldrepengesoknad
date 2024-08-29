import{j as i}from"./tslib.es6-BMc9PpVS.js";import{a as g}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{S as x,B as b}from"./useFpNavigator-cdVAXfmg.js";import"./Uttaksdagen-B0FM17qM.js";import{i as f}from"./ErrorSummaryHookForm-CpcWKZeM.js";import{M as v,F as D,C as o}from"./FpDataContext-wT6-gpAc.js";import{A as S}from"./ArbeidsforholdOgInntektSteg--7QuQ3-x.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DoedxA3Z.js";import"./index-Snk9MO9S.js";import"./index-BxmsGmlx.js";import"./_baseToString-7VaozA17.js";import"./_createSet-1Wr4uFiM.js";import"./iframe-CnSJsggb.js";import"../sb-preview/runtime.js";import"./links-BegG-28I.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-Bi7npIOr.js";import"./dateFormValidation-CMcKJG1V.js";import"./bemUtils-Cb0-YXpW.js";import"./arbeidsforholdUtils-c3GjDQaT.js";import"./ArbeidsforholdOgInntektPanel-ukCuXiR8.js";import"./ExpansionCard-CQN8G37-.js";const w={title:"steps/ArbeidsforholdOgInntektSteg",component:S},k=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],n=()=>(...t)=>(g("button-click")(...t),Promise.resolve()),T=({mellomlagreSøknadOgNaviger:t=n(),gåTilNesteSide:u=g("button-click"),arbeidsforhold:c=k})=>(f(),i.jsx(v,{initialEntries:[x.ARBEID_OG_INNTEKT],children:i.jsx(D,{onDispatch:u,initialState:{[o.SØKERSITUASJON]:{rolle:"mor",situasjon:"fødsel"},[o.OM_BARNET]:{termindato:"2024-02-18",type:b.FØDT,fødselsdatoer:["2024-02-18"],antallBarn:1}},children:i.jsx(S,{mellomlagreSøknadOgNaviger:t,avbrytSøknad:n(),arbeidsforhold:c})})})),r=T.bind({}),e=T.bind({});e.args={arbeidsforhold:[]};var a,s,d;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(d=(s=r.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};var l,m,p;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`({
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
}`,...(p=(m=e.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const z=["Default","BrukerKanIkkeSøkeVedKunNeiSvar"];export{e as BrukerKanIkkeSøkeVedKunNeiSvar,r as Default,z as __namedExportsOrder,w as default};
