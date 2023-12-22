import{j as r}from"./jsx-runtime-d079401a.js";import{a as g}from"./chunk-WFFRPTHA-80d37c1b.js";import{w as T}from"./withRouter-056ed14f.js";import{A as u}from"./AxiosMock-b335a275.js";import{_ as b}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-21abc7d8.js";import{F as v,C as o}from"./FpDataContext-fc20d236.js";import{m as A}from"./mapSøkerinfoDTO-d0c19276.js";import"./Tidsperioden-5c018ee5.js";import{B as M}from"./barnUtils-4f67c377.js";import"./index-2d278ef6.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-aa2fc0fb.js";import"./index-c74c9f7f.js";import"./index-7358cd3c.js";import"./apiInterceptor-87eb5c75.js";import"./validation-631bcf6e.js";import"./dateFormValidation-ab672986.js";import"./dates-533c16bb.js";import"./isFarEllerMedmor-120238ea.js";import"./arbeidsforholdUtils-0941c07c.js";import"./uttaksPlanStatus-4bdd2373.js";import"./Perioden-5c608f1b.js";import"./stringUtils-e4a92736.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./routes-9effe5a6.js";import"./stepsConfig-af72f4f3.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./InteractiveListElement-f9828880.js";import"./Link-13f307fd.js";import"./Tag-01a82302.js";import"./Næring-8f64fd19.js";import"./FormikFileUploader-5acbdd4f.js";import"./AttachmentList-10b10bff.js";import"./Attachment-2af9db68.js";import"./IntlProvider-a88ad053.js";import"./Alert-403824b2.js";import"./provider-fcac13f7.js";import"./ExpansionCard-df6dc809.js";import"./BackButton-b6b1ba0f.js";import"./index-47edccfa.js";import"./dateUtils-bf2e6d4b.js";import"./validationUtil-697db032.js";import"./links-b36d21ab.js";import"./index-b580f7e8.js";const N=()=>(...t)=>(g("button-click")(...t),Promise.resolve()),f=b,h={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},Ne={title:"steps/Inntektsinformasjon",component:c,decorators:[T]},k=({søkerinfo:t,gåTilNesteSide:x,mellomlagreSøknadOgNaviger:S=N(),utenlandsopphold:F=h})=>{const D=i=>{i.onPost("/storage/foreldrepenger/vedlegg").reply(200,{data:{}},{location:""}),i.onPost("/storage/foreldrepenger").reply(200,void 0)};return r.jsx(u,{mock:D,children:r.jsx(v,{onDispatch:x,initialState:{[o.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[o.OM_BARNET]:{type:M.FØDT,fødselsdatoer:[new Date],antallBarn:1},[o.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,harHattAnnenInntektSiste10Mnd:void 0},[o.UTENLANDSOPPHOLD]:F},children:r.jsx(c,{søkerInfo:A(t),mellomlagreSøknadOgNaviger:S,avbrytSøknad:g("button-click")})})})},e=k.bind({});e.args={søkerinfo:f};const n=k.bind({});n.args={søkerinfo:{søker:{...f},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var a,s,p;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
