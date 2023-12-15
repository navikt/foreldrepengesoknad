import{j as E}from"./jsx-runtime-69eee039.js";import{a as ge}from"./chunk-AY7I2SME-331d03ca.js";import{I as t}from"./Tidsperioden-f06b1fb0.js";import{B as Se}from"./barnUtils-6ca83891.js";import{D as Re}from"./Periodene-0a8f4fdf.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import{A as Le}from"./AxiosMock-ee1c53ff.js";import{w as Ce}from"./withRouter-f0df7a0f.js";import{N as Te,A as me}from"./Næring-573a7e38.js";import{_ as Fe}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{m as Ie}from"./mapSøkerinfoDTO-d9686cf0.js";import{O as ue}from"./Oppsummering-480f6c2a.js";import{F as _e,C as a}from"./FpDataContext-75ac2616.js";import"./v4-a960c1f4.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./Perioden-258f0205.js";import"./uttaksPlanStatus-eb75c060.js";import"./stringUtils-050465ad.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./index-7e40074d.js";import"./validation-631bcf6e.js";import"./dateFormValidation-53d645a6.js";import"./dates-53ab5347.js";import"./stepsConfig-38f20682.js";import"./amplitude-3a5afcfb.js";import"./amplitude.esm-b6594747.js";import"./routes-9effe5a6.js";import"./isFarEllerMedmor-120238ea.js";import"./message-42800413.js";import"./dateUtils-d252c747.js";import"./arbeidsforholdUtils-25b9ff22.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./leggTilPeriode-6d2e14ee.js";import"./Uttaksplan-d2370d7d.js";import"./FormikFileUploader-ca4a285b.js";import"./AttachmentList-0916f102.js";import"./Attachment-22089457.js";import"./IntlProvider-de2a8c87.js";import"./provider-679c532c.js";import"./links-b36d21ab.js";import"./index-47edccfa.js";import"./BackButton-9cb8c0d5.js";const He=()=>(...N)=>(ge("button-click")(...N),Promise.resolve()),Kn={title:"steps/Oppsummering",component:ue,decorators:[Ce]},e=Fe,je={type:Se.FØDT,fødselsdatoer:[t("2021-03-15")],antallBarn:1,datoForAleneomsorg:t("2021-03-15"),dokumentasjonAvAleneomsorg:[]},Ke={situasjon:"fødsel",rolle:"mor"},Je={kanIkkeOppgis:!0},Be={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!0},Ve={},Ge=[{id:"0",type:"uttak",forelder:"mor",konto:"FORELDREPENGER_FØR_FØDSEL",tidsperiode:{fom:new Date("2021-11-23T23:00:00.000Z"),tom:new Date("2021-12-13T23:00:00.000Z")}},{id:"1",type:"utsettelse",årsak:"INSTITUSJONSOPPHOLD_SØKER",tidsperiode:{fom:new Date("2021-12-14T23:00:00.000Z"),tom:new Date("2022-01-24T23:00:00.000Z")}},{id:"2",type:"periodeUtenUttak",tidsperiode:{fom:new Date("2022-01-25T23:00:00.000Z"),tom:new Date("2022-03-28T23:00:00.000Z")}},{id:"3",type:"uttak",forelder:"mor",konto:"FELLESPERIODE",tidsperiode:{fom:new Date("2022-03-29T23:00:00.000Z"),tom:new Date("2022-06-06T23:00:00.000Z")},ønskerSamtidigUttak:!1,gradert:!1}],n=({søkerinfo:N,søkersituasjon:De=Ke,søker:fe=Ve,annenForelder:Ne=Je,tilleggsopplysninger:Ee,barn:ce=je,utenlandsopphold:Ae=Be,utenlandsoppholdSenere:Oe,utenlandsoppholdTidligere:ye,erEndringssøknad:Ue=!1,mellomlagreSøknadOgNaviger:Me=He(),gåTilNesteSide:he,avbrytSøknad:xe=ge("button-click"),sendSøknad:Pe=()=>Promise.resolve()})=>{const ve=be=>{be.onPost("/storage/foreldrepenger").reply(200,void 0)};return E.jsx(Le,{mock:ve,children:E.jsx(_e,{onDispatch:he,initialState:{[a.SØKER]:fe,[a.ANNEN_FORELDER]:Ne,[a.SØKERSITUASJON]:De,[a.UTTAKSPLAN_METADATA]:{tilleggsopplysninger:Ee,dekningsgrad:Re.HUNDRE_PROSENT,ønskerJustertUttakVedFødsel:!1,harUttaksplanBlittSlettet:!1,antallUkerIUttaksplan:1},[a.OM_BARNET]:ce,[a.UTENLANDSOPPHOLD]:Ae,[a.UTENLANDSOPPHOLD_SENERE]:Oe,[a.UTENLANDSOPPHOLD_TIDLIGERE]:ye,[a.UTTAKSPLAN]:Ge},children:E.jsx(ue,{erEndringssøknad:Ue,sendSøknad:Pe,søkerInfo:Ie(N),avbrytSøknad:xe,mellomlagreSøknadOgNaviger:Me})})})},o=n.bind({});o.args={søkerinfo:e};const s=n.bind({});s.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:e};const d=n.bind({});d.args={søker:{erAleneOmOmsorg:!0,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{fornavn:"Ingen",etternavn:"Omsorg",fnr:"1212121313",kanIkkeOppgis:!1},søkerinfo:e};const l=n.bind({});l.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Eline",etternavn:"Utvikler",fnr:"1515151616",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1,erUfør:!0},tilleggsopplysninger:{begrunnelseForSenEndring:{tekst:"Utsettelsesgrunn"}},søkerinfo:e};const r=n.bind({});r.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søkerinfo:e};const f=n.bind({});r.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1},søkerinfo:e};const i=n.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Frida",etternavn:"Norsk",fnr:"01010012345",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:e};const p=n.bind({});p.args={søkersituasjon:{rolle:"mor",situasjon:"adopsjon"},barn:{type:Se.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:t("2021-10-01"),fødselsdatoer:[t("2021-01-01")],adoptertIUtlandet:!1,omsorgsovertakelse:[]},søkerinfo:e};const k=n.bind({});k.args={utenlandsopphold:{iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},utenlandsoppholdSenere:{senereOpphold:[{land:"SE",tidsperiode:{fom:"2021-01-01",tom:"2021-12-31"}}]},utenlandsoppholdTidligere:{tidligereOpphold:[{land:"SE",tidsperiode:{fom:"2020-01-01",tom:"2020-12-31"}}]},søkerinfo:e};const g=n.bind({});g.args={søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!0,frilansInformasjon:{jobberFremdelesSomFrilans:!0,oppstart:t("2019-01-01")},harHattAnnenInntektSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkerinfo:{søker:{...e.søker},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};const S=n.bind({});S.args={søker:{erAleneOmOmsorg:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:t("2018-01-01"),tom:t("2021-01-01")},næringstyper:[Te.FISKER],organisasjonsnummer:"123",næringsinntekt:1e6,registrertINorge:!0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!0,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0,endringAvNæringsinntektInformasjon:{dato:t("2019-01-01"),næringsinntektEtterEndring:1e6,forklaring:"Jobbar beinhardt!"}}],harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1},søkerinfo:e};const T=n.bind({});T.args={søker:{erAleneOmOmsorg:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:t("2018-01-01"),tom:t("2021-01-01")},næringstyper:[Te.FISKER],registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!1}],harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1},søkerinfo:e};const m=n.bind({});m.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:me.JOBB_I_UTLANDET,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},arbeidsgiverNavn:"Statoil",land:"SE",vedlegg:[]}],harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkerinfo:e};const u=n.bind({});u.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:me.MILITÆRTJENESTE,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},vedlegg:[{id:"1",url:"Dette er en url",filename:"Filnavn"}]}],harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkerinfo:e};const D=n.bind({});D.args={erEndringssøknad:!0,søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:e};var c,A,O;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`({
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
}`,...(O=(A=o.parameters)==null?void 0:A.docs)==null?void 0:O.source}}};var y,U,M;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`({
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
}`,...(M=(U=s.parameters)==null?void 0:U.docs)==null?void 0:M.source}}};var h,x,P;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`({
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
}`,...(P=(x=d.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};var v,b,R;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`({
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
}`,...(R=(b=l.parameters)==null?void 0:b.docs)==null?void 0:R.source}}};var L,C,F;r.parameters={...r.parameters,docs:{...(L=r.parameters)==null?void 0:L.docs,source:{originalSource:`({
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
}`,...(F=(C=r.parameters)==null?void 0:C.docs)==null?void 0:F.source}}};var I,_,H;f.parameters={...f.parameters,docs:{...(I=f.parameters)==null?void 0:I.docs,source:{originalSource:`({
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
}`,...(H=(_=f.parameters)==null?void 0:_.docs)==null?void 0:H.source}}};var j,K,J;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`({
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
}`,...(Y=(Z=k.parameters)==null?void 0:Z.docs)==null?void 0:Y.source}}};var q,z,Q;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`({
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
}`,...(Q=(z=g.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,$;S.parameters={...S.parameters,docs:{...(W=S.parameters)==null?void 0:W.docs,source:{originalSource:`({
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
}`,...($=(X=S.parameters)==null?void 0:X.docs)==null?void 0:$.source}}};var ee,ne,te;T.parameters={...T.parameters,docs:{...(ee=T.parameters)==null?void 0:ee.docs,source:{originalSource:`({
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
}`,...(te=(ne=T.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var ae,re,oe;m.parameters={...m.parameters,docs:{...(ae=m.parameters)==null?void 0:ae.docs,source:{originalSource:`({
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
}`,...(oe=(re=m.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var se,de,le;u.parameters={...u.parameters,docs:{...(se=u.parameters)==null?void 0:se.docs,source:{originalSource:`({
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
}`,...(le=(de=u.parameters)==null?void 0:de.docs)==null?void 0:le.source}}};var ie,pe,ke;D.parameters={...D.parameters,docs:{...(ie=D.parameters)==null?void 0:ie.docs,source:{originalSource:`({
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
}`,...(ke=(pe=D.parameters)==null?void 0:pe.docs)==null?void 0:ke.source}}};const Jn=["Default","MedAnnenForelder","MedAleneOmsorg","FarMedUførMor","FarMedMorSomHarRettIEØS","FarMedMorSomHaroppholdsSegIEØSMenIkkeHarRettIEØS","FarMedMorSomHarRettINorge","MedAdoptertBarn","MedUtenlandsopphold","MedArbeidsforholdOgAndreInntekter","MedSelvstendigNæringsdrivende","MedSelvstendigNæringsdrivendeUtenDiverse","MedAndreInntekterJobbIUtlandet","MedAndreInntekterMilitærtjeneste","ErEndringssøknad"];export{o as Default,D as ErEndringssøknad,r as FarMedMorSomHarRettIEØS,i as FarMedMorSomHarRettINorge,f as FarMedMorSomHaroppholdsSegIEØSMenIkkeHarRettIEØS,l as FarMedUførMor,p as MedAdoptertBarn,d as MedAleneOmsorg,m as MedAndreInntekterJobbIUtlandet,u as MedAndreInntekterMilitærtjeneste,s as MedAnnenForelder,g as MedArbeidsforholdOgAndreInntekter,S as MedSelvstendigNæringsdrivende,T as MedSelvstendigNæringsdrivendeUtenDiverse,k as MedUtenlandsopphold,Jn as __namedExportsOrder,Kn as default};
//# sourceMappingURL=Oppsummering.stories-d7446c11.js.map
