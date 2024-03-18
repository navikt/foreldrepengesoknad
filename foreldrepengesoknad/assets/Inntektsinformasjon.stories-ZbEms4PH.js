import{j as r}from"./jsx-runtime-DoxjgJx5.js";import{a as p}from"./chunk-MZXVCX43-DWuJqIWT.js";import{d as u,I as N}from"./Tidsperioden-C8HcA-rk.js";import"./index-C-6Uy6j4.js";import"./index-Cu9bd8lq.js";import{M as c,B as b}from"./dateFormValidation-A9ng-RC0.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{i as A}from"./Step-DMjU3ety.js";import{F as D,C as e}from"./FpDataContext-CjNulmBK.js";import{S as F}from"./useFpNavigator-CnrN-bhH.js";import{I as S}from"./Inntektsinformasjon-Cvm7FSX2.js";import"./v4-D8aEg3BZ.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-Ckls47V4.js";import"./links-dJHPeQm3.js";import"./message-BTv7u0RP.js";import"./amplitude.esm-CWYNo8IU.js";import"./createIntl-DjMHtdaC.js";import"./lodash-o8vTUAkc.js";import"./AttachmentMetadata-B9XvXCfe.js";import"./Attachment-DprMYF-V.js";import"./Næring-Dn1pZuPL.js";import"./barnUtils-DSjWg_x2.js";import"./InteractiveListElement-N0-Ub9O6.js";import"./vedleggUtils-Deszdclf.js";import"./FormikFileUploader-BBkOVduE.js";import"./globalUtil-BtRYWUdG.js";import"./axios-Dg6gsKS0.js";import"./apiInterceptor-BlveB6PB.js";import"./AttachmentList-C8AcxsEr.js";import"./Attachment-Ciz7DF4h.js";import"./validationUtil-KbyHXhDX.js";import"./dateUtils-BR3fTdjz.js";const I=()=>(...o)=>(p("button-click")(...o),Promise.resolve()),h={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},dn={title:"steps/Inntektsinformasjon",component:S},g=({arbeidsforhold:o=[],gåTilNesteSide:x,mellomlagreSøknadOgNaviger:f=I(),utenlandsopphold:T=h})=>(A(),r.jsx(c,{initialEntries:[F.INNTEKTSINFORMASJON],children:r.jsx(D,{onDispatch:x,initialState:{[e.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[e.OM_BARNET]:{type:b.FØDT,fødselsdatoer:[u().format(N)],antallBarn:1},[e.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,harHattAnnenInntektSiste10Mnd:void 0},[e.UTENLANDSOPPHOLD]:T},children:r.jsx(S,{arbeidsforhold:o,mellomlagreSøknadOgNaviger:f,avbrytSøknad:p("button-click")})})})),t=g.bind({}),n=g.bind({});n.args={arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]};var i,a,s;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(m=(l=n.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const ln=["HarIkkeArbeidsforhold","HarArbeidsforhold"];export{n as HarArbeidsforhold,t as HarIkkeArbeidsforhold,ln as __namedExportsOrder,dn as default};
