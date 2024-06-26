import{j as r}from"./jsx-runtime-_e34SzbC.js";import{a as p}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{d as u,I as N}from"./Tidsperioden-DmCisrTt.js";import"./index--IHLcpuH.js";import{M as c,B as b}from"./index-BI6FGWNT.js";import"./index-DVXBtNgz.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{i as A}from"./infobox.module-CdWUUUyR.js";import{F as D,C as e}from"./FpDataContext-BcznBdmF.js";import{S as F}from"./useFpNavigator-EsU1mNm4.js";import{I as S}from"./Inntektsinformasjon-CHTSRgNs.js";import"./v4-CQkTLCs1.js";import"./index-Dcs0RV0A.js";import"./Link-SOWRV7cb.js";import"./index-Cbx7Fas8.js";import"./links-F23LOZ2f.js";import"./VStack-DueXo9sZ.js";import"./message-C9Fhq2i9.js";import"./amplitude.esm-BThBy0fb.js";import"./iframe-D8VfiF_S.js";import"../sb-preview/runtime.js";import"./Accordion-BkjCJ-yH.js";import"./extends-CF3RwP-h.js";import"./dateFormValidation-BoZCAL21.js";import"./innsendingsType-DprMYF-V.js";import"./attachmentMetadataType-B9XvXCfe.js";import"./Næring-B_2qz7CP.js";import"./barnUtils-N7CfEEfC.js";import"./InteractiveListElement-DDSgC4YI.js";import"./vedleggUtils-DcENnM-W.js";import"./FormikFileUploader-BZSYoybP.js";import"./globalUtil-DypC6FaF.js";import"./apiInterceptor-ChqlQpSB.js";import"./AttachmentList-BRRFjKyQ.js";import"./Attachment-BCswNgyx.js";import"./validationUtil-ZB0dzgzz.js";import"./dateUtils-Ds_aF-Cb.js";import"./numberUtils-DnoB-1sH.js";const I=()=>(...o)=>(p("button-click")(...o),Promise.resolve()),h={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},Sn={title:"steps/Inntektsinformasjon",component:S},g=({arbeidsforhold:o=[],gåTilNesteSide:x,mellomlagreSøknadOgNaviger:f=I(),utenlandsopphold:T=h})=>(A(),r.jsx(c,{initialEntries:[F.INNTEKTSINFORMASJON],children:r.jsx(D,{onDispatch:x,initialState:{[e.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[e.OM_BARNET]:{type:b.FØDT,fødselsdatoer:[u().format(N)],antallBarn:1},[e.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,harHattAnnenInntektSiste10Mnd:void 0},[e.UTENLANDSOPPHOLD]:T},children:r.jsx(S,{arbeidsforhold:o,mellomlagreSøknadOgNaviger:f,avbrytSøknad:p("button-click")})})})),t=g.bind({}),n=g.bind({});n.args={arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]};var i,a,s;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};var d,m,l;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
}`,...(l=(m=n.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const gn=["HarIkkeArbeidsforhold","HarArbeidsforhold"];export{n as HarArbeidsforhold,t as HarIkkeArbeidsforhold,gn as __namedExportsOrder,Sn as default};
