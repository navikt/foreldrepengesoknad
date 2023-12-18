import{j as r}from"./jsx-runtime-DtaoT6pD.js";import{a as g}from"./chunk-WFFRPTHA-4hQ1D0Dg.js";import{w as T}from"./withRouter-Y7oi-tYz.js";import{A as u}from"./AxiosMock-KQlr1Nb8.js";import{_ as b}from"./søkerinfoKvinneMedEttBarn-A8PP0pIk.js";import{I as c}from"./Inntektsinformasjon-xiFOVmbH.js";import{F as v,C as o}from"./FpDataContext-vZKgGA8_.js";import{m as A}from"./mapSøkerinfoDTO-X1iCqeel.js";import"./Tidsperioden-aDyM1aIt.js";import{B as M}from"./barnUtils-YBZ_J5GH.js";import"./index-rOAPTY5O.js";import"./index-OjgoNOWw.js";import"./_baseToString-c7_W74Ua.js";import"./_createSet-hSZRoo1M.js";import"./preview-errors-UTk86sAa.js";import"./index-PPLHz8o0.js";import"./v4-yQnnJER4.js";import"./index-U0S_AV9L.js";import"./index-mQqIOHEI.js";import"./index-8mLkeWaP.js";import"./apiInterceptor-aGCWLuNT.js";import"./validation-zAycEoXM.js";import"./dateFormValidation-LIdg5doX.js";import"./dates-pF37sd5-.js";import"./isFarEllerMedmor-2H8vc5u5.js";import"./arbeidsforholdUtils-UowGK9vl.js";import"./uttaksPlanStatus-Ux938-AR.js";import"./Perioden-ccnBD1r4.js";import"./stringUtils-m7w95leF.js";import"./_baseIteratee-j829L0Q9.js";import"./_baseUniq-2KlOTSab.js";import"./routes-IIwIGa6S.js";import"./stepsConfig-6IAMv_G2.js";import"./amplitude--qTo3lH-.js";import"./amplitude.esm-OOIXs19H.js";import"./InteractiveListElement-4pJGDB7r.js";import"./Link-IggFwnrW.js";import"./Tag-WODZmQq7.js";import"./Næring-hUbJACXZ.js";import"./FormikFileUploader-XFuJ_PjZ.js";import"./AttachmentList-CvR0xonp.js";import"./Attachment-EeWnTSCv.js";import"./IntlProvider-n6iBafS0.js";import"./Alert-4KefUeFm.js";import"./provider-wwBoMs8b.js";import"./ExpansionCard-On_KGJWn.js";import"./BackButton--zvB_H1P.js";import"./index-w2TxLgAC.js";import"./dateUtils-C1bi-gXk.js";import"./validationUtil-qIbH9BGe.js";import"./links-BwIVhdNo.js";import"./index-lbrLmSir.js";const N=()=>(...t)=>(g("button-click")(...t),Promise.resolve()),f=b,h={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},Ne={title:"steps/Inntektsinformasjon",component:c,decorators:[T]},k=({søkerinfo:t,gåTilNesteSide:x,mellomlagreSøknadOgNaviger:S=N(),utenlandsopphold:F=h})=>{const D=i=>{i.onPost("/storage/foreldrepenger/vedlegg").reply(200,{data:{}},{location:""}),i.onPost("/storage/foreldrepenger").reply(200,void 0)};return r.jsx(u,{mock:D,children:r.jsx(v,{onDispatch:x,initialState:{[o.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[o.OM_BARNET]:{type:M.FØDT,fødselsdatoer:[new Date],antallBarn:1},[o.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,harHattAnnenInntektSiste10Mnd:void 0},[o.UTENLANDSOPPHOLD]:F},children:r.jsx(c,{søkerInfo:A(t),mellomlagreSøknadOgNaviger:S,avbrytSøknad:g("button-click")})})})},e=k.bind({});e.args={søkerinfo:f};const n=k.bind({});n.args={søkerinfo:{søker:{...f},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var a,s,p;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
