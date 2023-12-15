import{j as r}from"./jsx-runtime-69eee039.js";import{a as g}from"./chunk-AY7I2SME-331d03ca.js";import{w as D}from"./withRouter-f0df7a0f.js";import{A as v}from"./AxiosMock-ee1c53ff.js";import{_ as A}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-c9a5dbf8.js";import{F as M,C as o}from"./FpDataContext-75ac2616.js";import{m as N}from"./mapSøkerinfoDTO-97167608.js";import"./Tidsperioden-d85ef78f.js";import{B as h}from"./barnUtils-499d6ba0.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-a6e67bdd.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./validation-631bcf6e.js";import"./dateFormValidation-7b994c51.js";import"./dates-6a016f0f.js";import"./isFarEllerMedmor-120238ea.js";import"./arbeidsforholdUtils-93d6b9aa.js";import"./uttaksPlanStatus-735e5d33.js";import"./Perioden-3b91fa00.js";import"./stringUtils-0142dcf8.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1c52f6e3.js";import"./routes-9effe5a6.js";import"./stepsConfig-50aeac0b.js";import"./amplitude-3a5afcfb.js";import"./amplitude.esm-b6594747.js";import"./InteractiveListElement-c767be03.js";import"./Link-11d7c909.js";import"./Tag-8c31ae50.js";import"./Næring-8479d3b6.js";import"./FormikFileUploader-5a8cca88.js";import"./AttachmentList-44783354.js";import"./Attachment-0c980428.js";import"./IntlProvider-788f10d0.js";import"./Alert-d5660280.js";import"./provider-91e4eed5.js";import"./ExpansionCard-24c428ff.js";import"./BackButton-f1649e6f.js";import"./message-5ceb38b3.js";import"./index-47edccfa.js";import"./dateUtils-eb722a91.js";import"./validationUtil-db8589fd.js";import"./links-b36d21ab.js";import"./index-b3a39e30.js";const O=()=>(...t)=>(g("button-click")(...t),Promise.resolve()),f=A,x={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},Ne={title:"steps/Inntektsinformasjon",component:c,decorators:[D]},k=({søkerinfo:t,gåTilNesteSide:S,mellomlagreSøknadOgNaviger:T=O(),utenlandsopphold:u=x})=>{const b=i=>{i.onPost("/storage/foreldrepenger/vedlegg").reply(200,{data:{}},{location:""}),i.onPost("/storage/foreldrepenger").reply(200,void 0)};return r.jsx(v,{mock:b,children:r.jsx(M,{onDispatch:S,initialState:{[o.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[o.OM_BARNET]:{type:h.FØDT,fødselsdatoer:[new Date],antallBarn:1},[o.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,harHattAnnenInntektSiste10Mnd:void 0},[o.UTENLANDSOPPHOLD]:u},children:r.jsx(c,{søkerInfo:N(t),mellomlagreSøknadOgNaviger:T,avbrytSøknad:g("button-click")})})})},e=k.bind({});e.args={søkerinfo:f};const n=k.bind({});n.args={søkerinfo:{søker:{...f},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var a,s,p;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
//# sourceMappingURL=Inntektsinformasjon.stories-56b93068.js.map
