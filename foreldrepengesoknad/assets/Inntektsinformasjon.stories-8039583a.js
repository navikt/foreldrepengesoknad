import{j as r}from"./jsx-runtime-1caa8f64.js";import"./Tidsperioden-1f4512e5.js";import{B as N}from"./barnUtils-a1c59311.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as c}from"./IntlProvider-c27c4fed.js";import{a as p}from"./chunk-WFFRPTHA-80d37c1b.js";import{F as T,C as n}from"./FpDataContext-939a8168.js";import{S as b}from"./useFpNavigator-45cc79cf.js";import{I as S}from"./Inntektsinformasjon-f87e8cd1.js";import{M as D}from"./dateFormValidation-2912aeab.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./dates-73c77ff4.js";import"./amplitude.esm-2809efde.js";import"./createIntl-f7f642b5.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./isFarEllerMedmor-120238ea.js";import"./Næring-fbf14bd8.js";import"./uttaksPlanStatus-02a1b7a2.js";import"./Perioden-ca2a3b5d.js";import"./stringUtils-322285c5.js";import"./InteractiveListElement-b9a9e585.js";import"./Tag-3d686a5d.js";import"./FormikFileUploader-8a83489b.js";import"./apiInterceptor-d1094a41.js";import"./AttachmentList-eeb33f45.js";import"./Attachment-8705a58d.js";import"./ExpansionCard-726422bd.js";import"./index-bb915f46.js";import"./dateUtils-4bfbba32.js";import"./validationUtil-95befcbf.js";import"./links-4d39192e.js";const A=()=>(...o)=>(p("button-click")(...o),Promise.resolve()),F={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},de={title:"steps/Inntektsinformasjon",component:S},g=({arbeidsforhold:o=[],gåTilNesteSide:x,mellomlagreSøknadOgNaviger:f=A(),utenlandsopphold:u=F})=>(c(),r.jsx(D,{initialEntries:[b.INNTEKTSINFORMASJON],children:r.jsx(T,{onDispatch:x,initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[n.OM_BARNET]:{type:N.FØDT,fødselsdatoer:[new Date],antallBarn:1},[n.SØKER_DATA]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,harHattAnnenInntektSiste10Mnd:void 0},[n.UTENLANDSOPPHOLD]:u},children:r.jsx(S,{arbeidsforhold:o,mellomlagreSøknadOgNaviger:f,avbrytSøknad:p("button-click")})})})),t=g.bind({}),e=g.bind({});e.args={arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]};var i,a,s;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
  arbeidsforhold = [],
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  utenlandsopphold = defaultUtenlandsopphold
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.INNTEKTSINFORMASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'mor'
      },
      [ContextDataType.OM_BARNET]: {
        type: BarnType.FØDT,
        fødselsdatoer: [new Date()],
        antallBarn: 1
      },
      [ContextDataType.SØKER_DATA]: {
        erAleneOmOmsorg: false,
        // @ts-ignore FIX
        harJobbetSomFrilansSiste10Mnd: undefined,
        // @ts-ignore FIX
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
        // @ts-ignore FIX
        harHattAnnenInntektSiste10Mnd: undefined
      },
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold
    }}>
                <Inntektsinformasjon arbeidsforhold={arbeidsforhold} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};var d,l,m;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`({
  arbeidsforhold = [],
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  utenlandsopphold = defaultUtenlandsopphold
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.INNTEKTSINFORMASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'mor'
      },
      [ContextDataType.OM_BARNET]: {
        type: BarnType.FØDT,
        fødselsdatoer: [new Date()],
        antallBarn: 1
      },
      [ContextDataType.SØKER_DATA]: {
        erAleneOmOmsorg: false,
        // @ts-ignore FIX
        harJobbetSomFrilansSiste10Mnd: undefined,
        // @ts-ignore FIX
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
        // @ts-ignore FIX
        harHattAnnenInntektSiste10Mnd: undefined
      },
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold
    }}>
                <Inntektsinformasjon arbeidsforhold={arbeidsforhold} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(m=(l=e.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const le=["HarIkkeArbeidsforhold","HarArbeidsforhold"];export{e as HarArbeidsforhold,t as HarIkkeArbeidsforhold,le as __namedExportsOrder,de as default};
