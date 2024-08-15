import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{a as l}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{d as u,I as N}from"./Uttaksdagen-CXktmUXL.js";import"./Tidsperioden-Dtf7_zpz.js";import"./index-CCQ3W5xA.js";import{M as c,F as b,C as n,B as A}from"./FpDataContext-DMa8S1I2.js";import"./index-CTjT7uj6.js";import"./_baseToString-Cq6MbKF_.js";import"./_createSet-D2BJ0WVx.js";import{i as D}from"./ByttBrowserModal-aPNs2Z13.js";import{S as F}from"./useFpNavigator-D7zey6P3.js";import{I as S}from"./Inntektsinformasjon-CKHfXYpR.js";import"./v4-CQkTLCs1.js";import"./index-BRV0Se7Z.js";import"./index-DSgjoNiG.js";import"./tslib.es6-CcC3cBMT.js";import"./Link-D0RLsnK2.js";import"./Label-C_UMiHsP.js";import"./index-9r8iugjR.js";import"./links-BGW0SL1u.js";import"./useId-Dah_zW8v.js";import"./message-CjkJih2D.js";import"./bemUtils-DmNyTjfb.js";import"./iframe-CDqqb6l7.js";import"../sb-preview/runtime.js";import"./guid-CsArkN6i.js";import"./_baseForOwn-_34OS4c-.js";import"./_baseUniq-BwrlAMKh.js";import"./Accordion-moKZKf2O.js";import"./dateFormValidation-CHGPS-b7.js";import"./innsendingsType-DprMYF-V.js";import"./attachmentMetadataType-B9XvXCfe.js";import"./Næring-DNtbzUnM.js";import"./barnUtils-BRzjB5Pv.js";import"./InteractiveListElement-DYmrzwMz.js";import"./vedleggUtils-bEzzXB5v.js";import"./FormikFileUploader-CQkI4k9w.js";import"./globalUtil-BOzJJo7V.js";import"./apiInterceptor-D-WKbiXB.js";import"./AttachmentList-BKyOUhm6.js";import"./Attachment-CfjOpjU5.js";import"./validationUtil-CXrMF4p1.js";import"./dateUtils-maJKoiYn.js";import"./numberUtils-DnoB-1sH.js";const I=()=>(...o)=>(l("button-click")(...o),Promise.resolve()),h={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},ft={title:"steps/Inntektsinformasjon",component:S},g=({arbeidsforhold:o=[],gåTilNesteSide:x,mellomlagreSøknadOgNaviger:T=I(),utenlandsopphold:f=h})=>(D(),r.jsx(c,{initialEntries:[F.INNTEKTSINFORMASJON],children:r.jsx(b,{onDispatch:x,initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[n.OM_BARNET]:{type:A.FØDT,fødselsdatoer:[u().format(N)],antallBarn:1},[n.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,harHattAnnenInntektSiste10Mnd:void 0},[n.UTENLANDSOPPHOLD]:f},children:r.jsx(S,{arbeidsforhold:o,mellomlagreSøknadOgNaviger:T,avbrytSøknad:l("button-click")})})})),e=g.bind({}),t=g.bind({});t.args={arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]};var i,a,s;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(s=(a=e.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};var d,m,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const ut=["HarIkkeArbeidsforhold","HarArbeidsforhold"];export{t as HarArbeidsforhold,e as HarIkkeArbeidsforhold,ut as __namedExportsOrder,ft as default};
