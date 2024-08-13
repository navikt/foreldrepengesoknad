import{j as r}from"./jsx-runtime-CexXSJP5.js";import{a as p}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{d as u,I as N}from"./Tidsperioden-3yUk3KJR.js";import"./index-CSpfAsmC.js";import{M as c,F as b,C as e,B as A}from"./FpDataContext-BTc1vbhf.js";import"./index-BP8_t0zE.js";import"./_baseToString-7VaozA17.js";import"./_createSet-W-93wHM-.js";import{i as D}from"./ByttBrowserModal-DayHb9LT.js";import{S as F}from"./useFpNavigator-CdWkr2RF.js";import{I as S}from"./Inntektsinformasjon-07ljfo6X.js";import"./v4-CQkTLCs1.js";import"./index-Snk9MO9S.js";import"./Link-DYtqBS4e.js";import"./index-BxmsGmlx.js";import"./links-BP9VcYJA.js";import"./VStack-CEp4cwmC.js";import"./message-Qnk54Yzy.js";import"./iframe-CyFZgjRx.js";import"../sb-preview/runtime.js";import"./guid-CsArkN6i.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-DaL16s-J.js";import"./Accordion-DgSYGbzJ.js";import"./dateFormValidation-CLVJHkB9.js";import"./innsendingsType-DprMYF-V.js";import"./attachmentMetadataType-B9XvXCfe.js";import"./Næring-CMmn6UCw.js";import"./barnUtils-DaStBxFh.js";import"./InteractiveListElement-CEYizLuG.js";import"./vedleggUtils-BWE0kxlk.js";import"./FormikFileUploader-C2n_VArc.js";import"./globalUtil-Bra3V6J6.js";import"./apiInterceptor-D-WKbiXB.js";import"./AttachmentList-CT6P1m_Y.js";import"./Attachment-CgnD-s6M.js";import"./validationUtil-Di9tcODF.js";import"./dateUtils-D-n46EPp.js";import"./numberUtils-DnoB-1sH.js";const I=()=>(...o)=>(p("button-click")(...o),Promise.resolve()),h={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},Sn={title:"steps/Inntektsinformasjon",component:S},g=({arbeidsforhold:o=[],gåTilNesteSide:x,mellomlagreSøknadOgNaviger:T=I(),utenlandsopphold:f=h})=>(D(),r.jsx(c,{initialEntries:[F.INNTEKTSINFORMASJON],children:r.jsx(b,{onDispatch:x,initialState:{[e.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[e.OM_BARNET]:{type:A.FØDT,fødselsdatoer:[u().format(N)],antallBarn:1},[e.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,harHattAnnenInntektSiste10Mnd:void 0},[e.UTENLANDSOPPHOLD]:f},children:r.jsx(S,{arbeidsforhold:o,mellomlagreSøknadOgNaviger:T,avbrytSøknad:p("button-click")})})})),t=g.bind({}),n=g.bind({});n.args={arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]};var i,a,s;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};var d,l,m;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
}`,...(m=(l=n.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const gn=["HarIkkeArbeidsforhold","HarArbeidsforhold"];export{n as HarArbeidsforhold,t as HarIkkeArbeidsforhold,gn as __namedExportsOrder,Sn as default};
