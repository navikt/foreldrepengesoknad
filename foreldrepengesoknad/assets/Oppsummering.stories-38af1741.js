import{j as E}from"./jsx-runtime-d079401a.js";import{a as xe}from"./chunk-WFFRPTHA-80d37c1b.js";import{I as t}from"./Tidsperioden-c7c469a7.js";import{B as ge}from"./barnUtils-0a7beb48.js";import{D as be}from"./Periodene-73c34e76.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{A as Re}from"./AxiosMock-3df40305.js";import{w as Le}from"./withRouter-d9926836.js";import{N as Se,A as Fe}from"./Næring-b23e2526.js";import{_ as Ce}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{m as Ie}from"./mapSøkerinfoDTO-f8d3f6d6.js";import{O as Te}from"./Oppsummering-0033d745.js";import{F as _e,C as a}from"./FpDataContext-fc20d236.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-b580f7e8.js";import"./Link-13f307fd.js";import"./index-c74c9f7f.js";import"./Perioden-1f3f8ca0.js";import"./uttaksPlanStatus-fe18f64e.js";import"./stringUtils-7a5d7d65.js";import"./index-54751434.js";import"./apiInterceptor-d706a9c9.js";import"./index-cdc86f56.js";import"./validation-631bcf6e.js";import"./dateFormValidation-c51310cf.js";import"./dates-af043b32.js";import"./stepsConfig-ab908a62.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-9effe5a6.js";import"./isFarEllerMedmor-120238ea.js";import"./Tag-01a82302.js";import"./dateUtils-de29fba0.js";import"./Uttaksplan-8efc2f05.js";import"./FormikFileUploader-2d256b86.js";import"./AttachmentList-e829e220.js";import"./Attachment-33f4575d.js";import"./IntlProvider-6f6ec735.js";import"./Alert-d624eb67.js";import"./provider-4d9680fc.js";import"./ExpansionCard-cdfa7095.js";import"./links-4d39192e.js";import"./leggTilPeriode-d6793749.js";import"./arbeidsforholdUtils-aebcba96.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./index-47edccfa.js";import"./BackButton-bce098ee.js";const He=()=>(...u)=>(xe("button-click")(...u),Promise.resolve()),wn={title:"steps/Oppsummering",component:Te,decorators:[Le]},e=Ce,je={type:ge.FØDT,fødselsdatoer:[t("2021-03-15")],antallBarn:1,datoForAleneomsorg:t("2021-03-15"),dokumentasjonAvAleneomsorg:[]},Ke={situasjon:"fødsel",rolle:"mor"},Je={kanIkkeOppgis:!0},Be={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!0},Ve={},Ge=[{id:"0",type:"uttak",forelder:"mor",konto:"FORELDREPENGER_FØR_FØDSEL",tidsperiode:{fom:new Date("2021-11-23T23:00:00.000Z"),tom:new Date("2021-12-13T23:00:00.000Z")}},{id:"1",type:"utsettelse",årsak:"INSTITUSJONSOPPHOLD_SØKER",tidsperiode:{fom:new Date("2021-12-14T23:00:00.000Z"),tom:new Date("2022-01-24T23:00:00.000Z")}},{id:"2",type:"periodeUtenUttak",tidsperiode:{fom:new Date("2022-01-25T23:00:00.000Z"),tom:new Date("2022-03-28T23:00:00.000Z")}},{id:"3",type:"uttak",forelder:"mor",konto:"FELLESPERIODE",tidsperiode:{fom:new Date("2022-03-29T23:00:00.000Z"),tom:new Date("2022-06-06T23:00:00.000Z")},ønskerSamtidigUttak:!1,gradert:!1}],n=({søkerinfo:u,søkersituasjon:De=Ke,søker:me=Ve,annenForelder:ue=Je,tilleggsopplysninger:Ee,barn:fe=je,utenlandsopphold:Ne=Be,utenlandsoppholdSenere:ce,utenlandsoppholdTidligere:Ae,erEndringssøknad:Oe=!1,mellomlagreSøknadOgNaviger:ye=He(),gåTilNesteSide:Ue,avbrytSøknad:Me=xe("button-click"),sendSøknad:he=()=>Promise.resolve()})=>{const Pe=ve=>{ve.onPost("/storage/foreldrepenger").reply(200,void 0)};return E.jsx(Re,{mock:Pe,children:E.jsx(_e,{onDispatch:Ue,initialState:{[a.SØKER]:me,[a.ANNEN_FORELDER]:ue,[a.SØKERSITUASJON]:De,[a.UTTAKSPLAN_METADATA]:{tilleggsopplysninger:Ee,dekningsgrad:be.HUNDRE_PROSENT,ønskerJustertUttakVedFødsel:!1,harUttaksplanBlittSlettet:!1,antallUkerIUttaksplan:1},[a.OM_BARNET]:fe,[a.UTENLANDSOPPHOLD]:Ne,[a.UTENLANDSOPPHOLD_SENERE]:ce,[a.UTENLANDSOPPHOLD_TIDLIGERE]:Ae,[a.UTTAKSPLAN]:Ge},children:E.jsx(Te,{erEndringssøknad:Oe,sendSøknad:he,søkerInfo:Ie(u),avbrytSøknad:Me,mellomlagreSøknadOgNaviger:ye})})})},o=n.bind({});o.args={søkerinfo:e};const s=n.bind({});s.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:e};const d=n.bind({});d.args={søker:{erAleneOmOmsorg:!0,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{fornavn:"Ingen",etternavn:"Omsorg",fnr:"1212121313",kanIkkeOppgis:!1},søkerinfo:e};const l=n.bind({});l.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Eline",etternavn:"Utvikler",fnr:"1515151616",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1,erUfør:!0},tilleggsopplysninger:{begrunnelseForSenEndring:{tekst:"Utsettelsesgrunn"}},søkerinfo:e};const r=n.bind({});r.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søkerinfo:e};const m=n.bind({});r.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1},søkerinfo:e};const i=n.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Frida",etternavn:"Norsk",fnr:"01010012345",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:e};const p=n.bind({});p.args={søkersituasjon:{rolle:"mor",situasjon:"adopsjon"},barn:{type:ge.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:t("2021-10-01"),fødselsdatoer:[t("2021-01-01")],adoptertIUtlandet:!1,omsorgsovertakelse:[]},søkerinfo:e};const k=n.bind({});k.args={utenlandsopphold:{iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},utenlandsoppholdSenere:{senereOpphold:[{land:"SE",tidsperiode:{fom:"2021-01-01",tom:"2021-12-31"}}]},utenlandsoppholdTidligere:{tidligereOpphold:[{land:"SE",tidsperiode:{fom:"2020-01-01",tom:"2020-12-31"}}]},søkerinfo:e};const x=n.bind({});x.args={søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!0,frilansInformasjon:{jobberFremdelesSomFrilans:!0,oppstart:t("2019-01-01")},harHattAnnenInntektSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkerinfo:{søker:{...e.søker},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};const g=n.bind({});g.args={søker:{erAleneOmOmsorg:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:t("2018-01-01"),tom:t("2021-01-01")},næringstyper:[Se.FISKER],organisasjonsnummer:"123",næringsinntekt:1e6,registrertINorge:!0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!0,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0,endringAvNæringsinntektInformasjon:{dato:t("2019-01-01"),næringsinntektEtterEndring:1e6,forklaring:"Jobbar beinhardt!"}}],harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1},søkerinfo:e};const S=n.bind({});S.args={søker:{erAleneOmOmsorg:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:t("2018-01-01"),tom:t("2021-01-01")},næringstyper:[Se.FISKER],registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!1}],harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1},søkerinfo:e};const F=n.bind({});F.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:Fe.JOBB_I_UTLANDET,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},arbeidsgiverNavn:"Statoil",land:"SE",vedlegg:[]}],harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkerinfo:e};const T=n.bind({});T.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:Fe.MILITÆRTJENESTE,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},vedlegg:[{id:"1",url:"Dette er en url",filename:"Filnavn"}]}],harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkerinfo:e};const D=n.bind({});D.args={erEndringssøknad:!0,søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:e};var f,N,c;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...(c=(N=o.parameters)==null?void 0:N.docs)==null?void 0:c.source}}};var A,O,y;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...(y=(O=s.parameters)==null?void 0:O.docs)==null?void 0:y.source}}};var U,M,h;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...(h=(M=d.parameters)==null?void 0:M.docs)==null?void 0:h.source}}};var P,v,b;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...(b=(v=l.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var R,L,C;r.parameters={...r.parameters,docs:{...(R=r.parameters)==null?void 0:R.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...(C=(L=r.parameters)==null?void 0:L.docs)==null?void 0:C.source}}};var I,_,H;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...(H=(_=m.parameters)==null?void 0:_.docs)==null?void 0:H.source}}};var j,K,J;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...(J=(K=i.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};var B,V,G;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...(G=(V=p.parameters)==null?void 0:V.docs)==null?void 0:G.source}}};var w,Z,Y;k.parameters={...k.parameters,docs:{...(w=k.parameters)==null?void 0:w.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...(Y=(Z=k.parameters)==null?void 0:Z.docs)==null?void 0:Y.source}}};var q,z,Q;x.parameters={...x.parameters,docs:{...(q=x.parameters)==null?void 0:q.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...(Q=(z=x.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,$;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...($=(X=g.parameters)==null?void 0:X.docs)==null?void 0:$.source}}};var ee,ne,te;S.parameters={...S.parameters,docs:{...(ee=S.parameters)==null?void 0:ee.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...(te=(ne=S.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var ae,re,oe;F.parameters={...F.parameters,docs:{...(ae=F.parameters)==null?void 0:ae.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...(oe=(re=F.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var se,de,le;T.parameters={...T.parameters,docs:{...(se=T.parameters)==null?void 0:se.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...(le=(de=T.parameters)==null?void 0:de.docs)==null?void 0:le.source}}};var ie,pe,ke;D.parameters={...D.parameters,docs:{...(ie=D.parameters)==null?void 0:ie.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
  tilleggsopplysninger,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  avbrytSøknad = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKER]: søker,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.UTTAKSPLAN_METADATA]: {
        tilleggsopplysninger,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        ønskerJustertUttakVedFødsel: false,
        harUttaksplanBlittSlettet: false,
        antallUkerIUttaksplan: 1
      },
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
      [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
      [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
    }}>
                <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
            </FpDataContext>
        </AxiosMock>;
}`,...(ke=(pe=D.parameters)==null?void 0:pe.docs)==null?void 0:ke.source}}};const Zn=["Default","MedAnnenForelder","MedAleneOmsorg","FarMedUførMor","FarMedMorSomHarRettIEØS","FarMedMorSomHaroppholdsSegIEØSMenIkkeHarRettIEØS","FarMedMorSomHarRettINorge","MedAdoptertBarn","MedUtenlandsopphold","MedArbeidsforholdOgAndreInntekter","MedSelvstendigNæringsdrivende","MedSelvstendigNæringsdrivendeUtenDiverse","MedAndreInntekterJobbIUtlandet","MedAndreInntekterMilitærtjeneste","ErEndringssøknad"];export{o as Default,D as ErEndringssøknad,r as FarMedMorSomHarRettIEØS,i as FarMedMorSomHarRettINorge,m as FarMedMorSomHaroppholdsSegIEØSMenIkkeHarRettIEØS,l as FarMedUførMor,p as MedAdoptertBarn,d as MedAleneOmsorg,F as MedAndreInntekterJobbIUtlandet,T as MedAndreInntekterMilitærtjeneste,s as MedAnnenForelder,x as MedArbeidsforholdOgAndreInntekter,g as MedSelvstendigNæringsdrivende,S as MedSelvstendigNæringsdrivendeUtenDiverse,k as MedUtenlandsopphold,Zn as __namedExportsOrder,wn as default};
