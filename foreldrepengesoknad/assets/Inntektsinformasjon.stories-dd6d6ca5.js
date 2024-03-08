import{j as r}from"./jsx-runtime-1caa8f64.js";import{d as u,I as N}from"./dates-3e7e1342.js";import{M as c,B as A}from"./dateFormValidation-fa09613b.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as b}from"./IntlProvider-c123bdc0.js";import{a as p}from"./chunk-WFFRPTHA-80d37c1b.js";import{F as D,C as n}from"./FpDataContext-91c673b7.js";import{I as S}from"./Inntektsinformasjon-ad934373.js";import{S as F}from"./useFpNavigator-283c2ed8.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";import"./createIntl-5b3378a9.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./skjemanummer-4d711b8d.js";import"./AttachmentMetadata-003d83db.js";import"./Næring-0752aa2b.js";import"./barnUtils-441d9631.js";import"./InteractiveListElement-ce0b0215.js";import"./attachmentType-1d378a15.js";import"./FormikFileUploader-2483e29a.js";import"./ExpansionCard-f4140baf.js";import"./axios-91b57d60.js";import"./apiInterceptor-7536bacb.js";import"./AttachmentList-5a98cfe1.js";import"./Attachment-99140bbb.js";import"./validationUtil-3c89f521.js";import"./dateUtils-f600dec0.js";import"./links-4d39192e.js";const O=()=>(...o)=>(p("button-click")(...o),Promise.resolve()),I={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},se={title:"steps/Inntektsinformasjon",component:S},g=({arbeidsforhold:o=[],gåTilNesteSide:f,mellomlagreSøknadOgNaviger:x=O(),utenlandsopphold:T=I})=>(b(),r.jsx(c,{initialEntries:[F.INNTEKTSINFORMASJON],children:r.jsx(D,{onDispatch:f,initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[n.OM_BARNET]:{type:A.FØDT,fødselsdatoer:[u().format(N)],antallBarn:1},[n.SØKER_DATA]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,harHattAnnenInntektSiste10Mnd:void 0},[n.UTENLANDSOPPHOLD]:T},children:r.jsx(S,{arbeidsforhold:o,mellomlagreSøknadOgNaviger:x,avbrytSøknad:p("button-click")})})})),t=g.bind({}),e=g.bind({});e.args={arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]};var a,i,s;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
        fødselsdatoer: [dayjs().format(ISO_DATE_FORMAT)],
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
}`,...(s=(i=t.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var d,l,m;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
        fødselsdatoer: [dayjs().format(ISO_DATE_FORMAT)],
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
}`,...(m=(l=e.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const de=["HarIkkeArbeidsforhold","HarArbeidsforhold"];export{e as HarArbeidsforhold,t as HarIkkeArbeidsforhold,de as __namedExportsOrder,se as default};
