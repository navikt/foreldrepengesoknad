import{j as r}from"./jsx-runtime-_e34SzbC.js";import{a as p}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{d as u,I as N}from"./Tidsperioden-JQeTBW8H.js";import"./index--IHLcpuH.js";import{M as c,B as b}from"./index-BI6FGWNT.js";import"./index-DVXBtNgz.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{i as A}from"./infobox.module-CVZyvidf.js";import{F as D,C as t}from"./FpDataContext-BcznBdmF.js";import{S as F}from"./useFpNavigator-CnR-1yS3.js";import{I as S}from"./Inntektsinformasjon-CYfORBBd.js";import"./v4-CQkTLCs1.js";import"./index-Dcs0RV0A.js";import"./Link-SOWRV7cb.js";import"./index-Cbx7Fas8.js";import"./links-BFd19Kxc.js";import"./VStack-DueXo9sZ.js";import"./message-B0EXjA4g.js";import"./amplitude.esm-BThBy0fb.js";import"./iframe-GirJKqMw.js";import"../sb-preview/runtime.js";import"./Accordion-CumIhRkK.js";import"./extends-CF3RwP-h.js";import"./dateFormValidation-CArkorQM.js";import"./innsendingsType-DprMYF-V.js";import"./attachmentMetadataType-B9XvXCfe.js";import"./Næring-oJHCraZr.js";import"./barnUtils-YoT_baD_.js";import"./InteractiveListElement-GA0rrv9X.js";import"./vedleggUtils-CzjK0XaI.js";import"./FormikFileUploader-xvmzlEQW.js";import"./globalUtil-CIAeW626.js";import"./Environment-O62Hvuhd.js";import"./apiInterceptor--4RFSKox.js";import"./axios-B4uVmeYG.js";import"./AttachmentList-C-qn5MUe.js";import"./Attachment-Cnq-YR0D.js";import"./validationUtil-BhNDpQMs.js";import"./dateUtils-DJ95X-Fx.js";const I=()=>(...o)=>(p("button-click")(...o),Promise.resolve()),h={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},gn={title:"steps/Inntektsinformasjon",component:S},g=({arbeidsforhold:o=[],gåTilNesteSide:x,mellomlagreSøknadOgNaviger:f=I(),utenlandsopphold:T=h})=>(A(),r.jsx(c,{initialEntries:[F.INNTEKTSINFORMASJON],children:r.jsx(D,{onDispatch:x,initialState:{[t.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[t.OM_BARNET]:{type:b.FØDT,fødselsdatoer:[u().format(N)],antallBarn:1},[t.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,harHattAnnenInntektSiste10Mnd:void 0},[t.UTENLANDSOPPHOLD]:T},children:r.jsx(S,{arbeidsforhold:o,mellomlagreSøknadOgNaviger:f,avbrytSøknad:p("button-click")})})})),e=g.bind({}),n=g.bind({});n.args={arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]};var i,a,s;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(s=(a=e.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};var d,m,l;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
}`,...(l=(m=n.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const xn=["HarIkkeArbeidsforhold","HarArbeidsforhold"];export{n as HarArbeidsforhold,e as HarIkkeArbeidsforhold,xn as __namedExportsOrder,gn as default};
