import{j as r}from"./jsx-runtime-_e34SzbC.js";import{a as p}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{d as u,I as N}from"./Tidsperioden-Dc48v2NC.js";import"./index--IHLcpuH.js";import{M as c,B as b}from"./index-BI6FGWNT.js";import"./index-DVXBtNgz.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{i as A}from"./infobox.module-BoTlAVoT.js";import{F as D,C as e}from"./FpDataContext-BcznBdmF.js";import{S as F}from"./useFpNavigator-BVm3PuGT.js";import{I as S}from"./Inntektsinformasjon-t21CxZoa.js";import"./v4-CQkTLCs1.js";import"./index-Dcs0RV0A.js";import"./Link-SOWRV7cb.js";import"./index-Cbx7Fas8.js";import"./links-F23LOZ2f.js";import"./VStack-DueXo9sZ.js";import"./message-DeLtoR4y.js";import"./amplitude.esm-BThBy0fb.js";import"./iframe-Dm-ziG0t.js";import"../sb-preview/runtime.js";import"./Accordion-XXN9VWkr.js";import"./extends-CF3RwP-h.js";import"./dateFormValidation-DGvKuQ3S.js";import"./innsendingsType-DprMYF-V.js";import"./attachmentMetadataType-B9XvXCfe.js";import"./Næring-dZU69vqH.js";import"./barnUtils-Cse01oDj.js";import"./InteractiveListElement-5w5kzfjn.js";import"./vedleggUtils-wDY9CnAe.js";import"./FormikFileUploader-C8AzdX1D.js";import"./globalUtil-YXU3vkGe.js";import"./apiInterceptor-ChqlQpSB.js";import"./AttachmentList-nz-V904R.js";import"./Attachment-DBQ_k8W9.js";import"./validationUtil-Dz5sUzcp.js";import"./dateUtils-DYxGlc-2.js";const I=()=>(...o)=>(p("button-click")(...o),Promise.resolve()),h={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},pn={title:"steps/Inntektsinformasjon",component:S},g=({arbeidsforhold:o=[],gåTilNesteSide:x,mellomlagreSøknadOgNaviger:f=I(),utenlandsopphold:T=h})=>(A(),r.jsx(c,{initialEntries:[F.INNTEKTSINFORMASJON],children:r.jsx(D,{onDispatch:x,initialState:{[e.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[e.OM_BARNET]:{type:b.FØDT,fødselsdatoer:[u().format(N)],antallBarn:1},[e.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,harHattAnnenInntektSiste10Mnd:void 0},[e.UTENLANDSOPPHOLD]:T},children:r.jsx(S,{arbeidsforhold:o,mellomlagreSøknadOgNaviger:f,avbrytSøknad:p("button-click")})})})),t=g.bind({}),n=g.bind({});n.args={arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]};var i,a,s;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(m=(l=n.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const Sn=["HarIkkeArbeidsforhold","HarArbeidsforhold"];export{n as HarArbeidsforhold,t as HarIkkeArbeidsforhold,Sn as __namedExportsOrder,pn as default};
