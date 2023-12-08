import{j as r}from"./jsx-runtime-69eee039.js";import{a as c}from"./chunk-AY7I2SME-331d03ca.js";import{w as D}from"./withRouter-f0df7a0f.js";import{A as v}from"./AxiosMock-ee1c53ff.js";import{_ as A}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as g}from"./Inntektsinformasjon-1d45b72a.js";import{F as M,C as o}from"./FpDataContext-75ac2616.js";import{m as N}from"./mapSøkerinfoDTO-268f32cb.js";import"./Tidsperioden-a95d044c.js";import{B as h}from"./barnUtils-6056f31e.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./validation-631bcf6e.js";import"./dateFormValidation-fedc3c4d.js";import"./isFarEllerMedmor-120238ea.js";import"./arbeidsforholdUtils-a9257065.js";import"./uttaksPlanStatus-38959b58.js";import"./Perioden-f9b2043e.js";import"./stringUtils-f4190696.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./routes-9effe5a6.js";import"./stepsConfig-527b68d8.js";import"./amplitude-140e185d.js";import"./InteractiveListElement-8a6312bf.js";import"./Link-b834ea2b.js";import"./Næring-07a1ac31.js";import"./FormikFileUploader-4b48adc4.js";import"./AttachmentList-9dfeda58.js";import"./Attachment-267e6f8e.js";import"./BackButton-302225b0.js";import"./message-650a43cb.js";import"./index-47edccfa.js";import"./dateUtils-e2f5989d.js";import"./validationUtil-d6eeeaa6.js";import"./links-b36d21ab.js";import"./index-b3a39e30.js";const O=()=>(...t)=>(c("button-click")(...t),Promise.resolve()),f=A,x={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},Te={title:"steps/Inntektsinformasjon",component:g,decorators:[D]},k=({søkerinfo:t,gåTilNesteSide:S,mellomlagreSøknadOgNaviger:T=O(),utenlandsopphold:u=x})=>{const b=a=>{a.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),a.onPost("/storage/foreldrepenger").reply(200,void 0)};return r.jsx(v,{mock:b,children:r.jsx(M,{onDispatch:S,initialState:{[o.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[o.OM_BARNET]:{type:h.FØDT,fødselsdatoer:[new Date],antallBarn:1},[o.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,harHattAnnenInntektSiste10Mnd:void 0},[o.UTENLANDSOPPHOLD]:u},children:r.jsx(g,{søkerInfo:N(t),mellomlagreSøknadOgNaviger:T,avbrytSøknad:c("button-click")})})})},e=k.bind({});e.args={søkerinfo:f};const n=k.bind({});n.args={søkerinfo:{søker:{...f},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var i,s,d;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`({
  søkerinfo,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  utenlandsopphold = defaultUtenlandsopphold
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/vedlegg').reply(200, {
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
}`,...(d=(s=e.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};var p,l,m;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`({
  søkerinfo,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  utenlandsopphold = defaultUtenlandsopphold
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/vedlegg').reply(200, {
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
}`,...(m=(l=n.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const ue=["HarIkkeArbeidsforhold","HarArbeidsforhold"];export{n as HarArbeidsforhold,e as HarIkkeArbeidsforhold,ue as __namedExportsOrder,Te as default};
//# sourceMappingURL=Inntektsinformasjon.stories-cf05104a.js.map
