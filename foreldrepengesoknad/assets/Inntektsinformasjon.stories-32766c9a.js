import{j as r}from"./jsx-runtime-d079401a.js";import{a as g}from"./chunk-WFFRPTHA-80d37c1b.js";import{w as T}from"./withRouter-d9926836.js";import{A as u}from"./AxiosMock-07682dd6.js";import{_ as b}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-d31ef242.js";import{F as v,C as o}from"./FpDataContext-fc20d236.js";import{m as A}from"./mapSøkerinfoDTO-86909ed5.js";import"./Tidsperioden-549a8241.js";import{B as M}from"./barnUtils-b4236b13.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-cdc86f56.js";import"./index-c74c9f7f.js";import"./index-54751434.js";import"./apiInterceptor-716e24db.js";import"./validation-631bcf6e.js";import"./dateFormValidation-a64a0967.js";import"./dates-ecaf3b81.js";import"./isFarEllerMedmor-120238ea.js";import"./arbeidsforholdUtils-ed15d40e.js";import"./uttaksPlanStatus-ac6850fa.js";import"./Perioden-d0dc26e6.js";import"./stringUtils-9f2698e1.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./routes-9effe5a6.js";import"./stepsConfig-584efc2f.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./InteractiveListElement-a57a9a59.js";import"./Link-13f307fd.js";import"./Tag-01a82302.js";import"./Næring-e1557493.js";import"./FormikFileUploader-de9be667.js";import"./AttachmentList-fe789eb5.js";import"./Attachment-e940458b.js";import"./IntlProvider-9aafa776.js";import"./Alert-5aba7491.js";import"./provider-c07240b2.js";import"./ExpansionCard-a365c285.js";import"./BackButton-13b1ac63.js";import"./index-47edccfa.js";import"./dateUtils-dc03d1f4.js";import"./validationUtil-f7567623.js";import"./links-4d39192e.js";import"./index-b580f7e8.js";const N=()=>(...t)=>(g("button-click")(...t),Promise.resolve()),f=b,h={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},Ne={title:"steps/Inntektsinformasjon",component:c,decorators:[T]},k=({søkerinfo:t,gåTilNesteSide:x,mellomlagreSøknadOgNaviger:S=N(),utenlandsopphold:F=h})=>{const D=i=>{i.onPost("/storage/foreldrepenger/vedlegg").reply(200,{data:{}},{location:""}),i.onPost("/storage/foreldrepenger").reply(200,void 0)};return r.jsx(u,{mock:D,children:r.jsx(v,{onDispatch:x,initialState:{[o.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[o.OM_BARNET]:{type:M.FØDT,fødselsdatoer:[new Date],antallBarn:1},[o.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,harHattAnnenInntektSiste10Mnd:void 0},[o.UTENLANDSOPPHOLD]:F},children:r.jsx(c,{søkerInfo:A(t),mellomlagreSøknadOgNaviger:S,avbrytSøknad:g("button-click")})})})},e=k.bind({});e.args={søkerinfo:f};const n=k.bind({});n.args={søkerinfo:{søker:{...f},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var a,s,p;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
  søkerinfo,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  utenlandsopphold = defaultUtenlandsopphold
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
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
      [ContextDataType.SØKER]: {
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
                <Inntektsinformasjon søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(p=(s=e.parameters)==null?void 0:s.docs)==null?void 0:p.source}}};var d,m,l;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`({
  søkerinfo,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  utenlandsopphold = defaultUtenlandsopphold
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
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
      [ContextDataType.SØKER]: {
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
                <Inntektsinformasjon søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(l=(m=n.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const he=["HarIkkeArbeidsforhold","HarArbeidsforhold"];export{n as HarArbeidsforhold,e as HarIkkeArbeidsforhold,he as __namedExportsOrder,Ne as default};
