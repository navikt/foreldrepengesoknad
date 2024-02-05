import{j as o}from"./jsx-runtime-1caa8f64.js";import{a as g}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as T}from"./AxiosMock-35a08809.js";import{_ as N}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-0459e200.js";import{F as M,C as t}from"./FpDataContext-c0784ba8.js";import{m as D}from"./mapSøkerinfoDTO-b63f3b29.js";import"./Tidsperioden-0ce27701.js";import{B as A}from"./barnUtils-0a149fde.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{S as O}from"./useFpNavigator-138d866e.js";import{i as I}from"./IntlProvider-34dbadb5.js";import{M as b}from"./dateFormValidation-58034f6f.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-71cf49c7.js";import"./isFarEllerMedmor-120238ea.js";import"./arbeidsforholdUtils-c017f5d8.js";import"./uttaksPlanStatus-0cdf8ab7.js";import"./Perioden-6bc73957.js";import"./stringUtils-5b767063.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./dates-11179115.js";import"./InteractiveListElement-2cb8fae6.js";import"./Tag-3d686a5d.js";import"./Link-d47e444a.js";import"./Næring-58ec7cb9.js";import"./FormikFileUploader-b1f419c9.js";import"./AttachmentList-afd7fd7b.js";import"./Attachment-c0740781.js";import"./ExpansionCard-c322da11.js";import"./index-b0efaffd.js";import"./dateUtils-b6bb763e.js";import"./timezone-b3f5c703.js";import"./validationUtil-21bd813d.js";import"./links-4d39192e.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./amplitude.esm-2809efde.js";import"./createIntl-53be0640.js";const v=()=>(...r)=>(g("button-click")(...r),Promise.resolve()),f=N,y={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},Me={title:"steps/Inntektsinformasjon",component:c},S=({søkerinfo:r,gåTilNesteSide:k,mellomlagreSøknadOgNaviger:x=v(),utenlandsopphold:u=y})=>{I();const F=i=>{i.onPost("/storage/foreldrepenger/vedlegg").reply(200,{data:{}},{location:""}),i.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(b,{initialEntries:[O.INNTEKTSINFORMASJON],children:o.jsx(T,{mock:F,children:o.jsx(M,{onDispatch:k,initialState:{[t.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[t.OM_BARNET]:{type:A.FØDT,fødselsdatoer:[new Date],antallBarn:1},[t.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,harHattAnnenInntektSiste10Mnd:void 0},[t.UTENLANDSOPPHOLD]:u},children:o.jsx(c,{søkerInfo:D(r),mellomlagreSøknadOgNaviger:x,avbrytSøknad:g("button-click")})})})})},e=S.bind({});e.args={søkerinfo:f};const n=S.bind({});n.args={søkerinfo:{søker:{...f},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var a,s,d;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
  søkerinfo,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  utenlandsopphold = defaultUtenlandsopphold
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.INNTEKTSINFORMASJON]}>
            <AxiosMock mock={restMock}>
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
            </AxiosMock>
        </MemoryRouter>;
}`,...(d=(s=e.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};var p,m,l;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`({
  søkerinfo,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  utenlandsopphold = defaultUtenlandsopphold
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.INNTEKTSINFORMASJON]}>
            <AxiosMock mock={restMock}>
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
            </AxiosMock>
        </MemoryRouter>;
}`,...(l=(m=n.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const De=["HarIkkeArbeidsforhold","HarArbeidsforhold"];export{n as HarArbeidsforhold,e as HarIkkeArbeidsforhold,De as __namedExportsOrder,Me as default};
