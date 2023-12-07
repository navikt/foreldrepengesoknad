import{j as N}from"./jsx-runtime-69eee039.js";import{a as c}from"./chunk-AY7I2SME-331d03ca.js";import{I as t}from"./Tidsperioden-a95d044c.js";import{B as ge}from"./barnUtils-6056f31e.js";import{D as Re}from"./Periodene-e4e7892a.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import{A as Le}from"./AxiosMock-ee1c53ff.js";import{w as Ce}from"./withRouter-f0df7a0f.js";import{N as Se,A as Te}from"./Næring-07a1ac31.js";import{_ as Fe}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{m as Ie}from"./mapSøkerinfoDTO-268f32cb.js";import{O as ue}from"./Oppsummering-6f396223.js";import{F as _e,C as a}from"./FpDataContext-75ac2616.js";import"./v4-a960c1f4.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./Perioden-f9b2043e.js";import"./uttaksPlanStatus-38959b58.js";import"./stringUtils-f4190696.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./index-7e40074d.js";import"./validation-631bcf6e.js";import"./dateFormValidation-fedc3c4d.js";import"./stepsConfig-527b68d8.js";import"./amplitude-140e185d.js";import"./routes-9effe5a6.js";import"./isFarEllerMedmor-120238ea.js";import"./message-650a43cb.js";import"./dateUtils-e2f5989d.js";import"./arbeidsforholdUtils-a9257065.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./leggTilPeriode-514e4bf5.js";import"./Uttaksplan-dd72c95e.js";import"./FormikFileUploader-4b48adc4.js";import"./AttachmentList-9dfeda58.js";import"./Attachment-267e6f8e.js";import"./links-b36d21ab.js";import"./index-47edccfa.js";import"./BackButton-302225b0.js";const Fn={title:"steps/Oppsummering",component:ue,decorators:[Ce]},e=Fe,He={type:ge.FØDT,fødselsdatoer:[t("2021-03-15")],antallBarn:1,datoForAleneomsorg:t("2021-03-15"),dokumentasjonAvAleneomsorg:[]},je={situasjon:"fødsel",rolle:"mor"},Ke={kanIkkeOppgis:!0},Je={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!0},Be={},Ve=[{id:"0",type:"uttak",forelder:"mor",konto:"FORELDREPENGER_FØR_FØDSEL",tidsperiode:{fom:new Date("2021-11-23T23:00:00.000Z"),tom:new Date("2021-12-13T23:00:00.000Z")}},{id:"1",type:"utsettelse",årsak:"INSTITUSJONSOPPHOLD_SØKER",tidsperiode:{fom:new Date("2021-12-14T23:00:00.000Z"),tom:new Date("2022-01-24T23:00:00.000Z")}},{id:"2",type:"periodeUtenUttak",tidsperiode:{fom:new Date("2022-01-25T23:00:00.000Z"),tom:new Date("2022-03-28T23:00:00.000Z")}},{id:"3",type:"uttak",forelder:"mor",konto:"FELLESPERIODE",tidsperiode:{fom:new Date("2022-03-29T23:00:00.000Z"),tom:new Date("2022-06-06T23:00:00.000Z")},ønskerSamtidigUttak:!1,gradert:!1}],n=({søkerinfo:De,søkersituasjon:me=je,søker:fe=Be,annenForelder:Ne=Ke,tilleggsopplysninger:ce,barn:Ee=He,utenlandsopphold:Ae=Je,utenlandsoppholdSenere:Oe,utenlandsoppholdTidligere:ye,erEndringssøknad:Ue=!1,mellomlagreSøknadOgNaviger:Me=c("button-click"),gåTilNesteSide:he,avbrytSøknad:xe=c("button-click"),sendSøknad:Pe=()=>Promise.resolve()})=>{const be=ve=>{ve.onPost("/storage/foreldrepenger").reply(200,void 0)};return N.jsx(Le,{mock:be,children:N.jsx(_e,{onDispatch:he,initialState:{[a.SØKER]:fe,[a.ANNEN_FORELDER]:Ne,[a.SØKERSITUASJON]:me,[a.UTTAKSPLAN_METADATA]:{tilleggsopplysninger:ce,dekningsgrad:Re.HUNDRE_PROSENT,ønskerJustertUttakVedFødsel:!1,harUttaksplanBlittSlettet:!1,antallUkerIUttaksplan:1},[a.OM_BARNET]:Ee,[a.UTENLANDSOPPHOLD]:Ae,[a.UTENLANDSOPPHOLD_SENERE]:Oe,[a.UTENLANDSOPPHOLD_TIDLIGERE]:ye,[a.UTTAKSPLAN]:Ve},children:N.jsx(ue,{erEndringssøknad:Ue,sendSøknad:Pe,søkerInfo:Ie(De),avbrytSøknad:xe,mellomlagreSøknadOgNaviger:Me})})})},o=n.bind({});o.args={søkerinfo:e};const s=n.bind({});s.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:e};const d=n.bind({});d.args={søker:{erAleneOmOmsorg:!0,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{fornavn:"Ingen",etternavn:"Omsorg",fnr:"1212121313",kanIkkeOppgis:!1},søkerinfo:e};const l=n.bind({});l.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Eline",etternavn:"Utvikler",fnr:"1515151616",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1,erUfør:!0},tilleggsopplysninger:{begrunnelseForSenEndring:{tekst:"Utsettelsesgrunn"}},søkerinfo:e};const r=n.bind({});r.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søkerinfo:e};const f=n.bind({});r.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1},søkerinfo:e};const i=n.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Frida",etternavn:"Norsk",fnr:"01010012345",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:e};const p=n.bind({});p.args={søkersituasjon:{rolle:"mor",situasjon:"adopsjon"},barn:{type:ge.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:t("2021-10-01"),fødselsdatoer:[t("2021-01-01")],adoptertIUtlandet:!1,omsorgsovertakelse:[]},søkerinfo:e};const k=n.bind({});k.args={utenlandsopphold:{iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},utenlandsoppholdSenere:{senereOpphold:[{land:"SE",tidsperiode:{fom:"2021-01-01",tom:"2021-12-31"}}]},utenlandsoppholdTidligere:{tidligereOpphold:[{land:"SE",tidsperiode:{fom:"2020-01-01",tom:"2020-12-31"}}]},søkerinfo:e};const g=n.bind({});g.args={søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!0,frilansInformasjon:{jobberFremdelesSomFrilans:!0,oppstart:t("2019-01-01")},harHattAnnenInntektSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkerinfo:{søker:{...e.søker},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};const S=n.bind({});S.args={søker:{erAleneOmOmsorg:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:t("2018-01-01"),tom:t("2021-01-01")},næringstyper:[Se.FISKER],organisasjonsnummer:"123",næringsinntekt:1e6,registrertINorge:!0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!0,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0,endringAvNæringsinntektInformasjon:{dato:t("2019-01-01"),næringsinntektEtterEndring:1e6,forklaring:"Jobbar beinhardt!"}}],harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1},søkerinfo:e};const T=n.bind({});T.args={søker:{erAleneOmOmsorg:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:t("2018-01-01"),tom:t("2021-01-01")},næringstyper:[Se.FISKER],registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!1}],harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1},søkerinfo:e};const u=n.bind({});u.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:Te.JOBB_I_UTLANDET,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},arbeidsgiverNavn:"Statoil",land:"SE",vedlegg:[]}],harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkerinfo:e};const D=n.bind({});D.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:Te.MILITÆRTJENESTE,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},vedlegg:[{id:"1",url:"Dette er en url",filename:"Filnavn"}]}],harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkerinfo:e};const m=n.bind({});m.args={erEndringssøknad:!0,søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:e};var E,A,O;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`({
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
}`,...(P=(x=d.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};var b,v,R;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`({
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
}`,...(R=(v=l.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};var L,C,F;r.parameters={...r.parameters,docs:{...(L=r.parameters)==null?void 0:L.docs,source:{originalSource:`({
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
}`,...(te=(ne=T.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var ae,re,oe;u.parameters={...u.parameters,docs:{...(ae=u.parameters)==null?void 0:ae.docs,source:{originalSource:`({
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
}`,...(oe=(re=u.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var se,de,le;D.parameters={...D.parameters,docs:{...(se=D.parameters)==null?void 0:se.docs,source:{originalSource:`({
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
}`,...(le=(de=D.parameters)==null?void 0:de.docs)==null?void 0:le.source}}};var ie,pe,ke;m.parameters={...m.parameters,docs:{...(ie=m.parameters)==null?void 0:ie.docs,source:{originalSource:`({
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
  mellomlagreSøknadOgNaviger = action('button-click'),
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
}`,...(ke=(pe=m.parameters)==null?void 0:pe.docs)==null?void 0:ke.source}}};const In=["Default","MedAnnenForelder","MedAleneOmsorg","FarMedUførMor","FarMedMorSomHarRettIEØS","FarMedMorSomHaroppholdsSegIEØSMenIkkeHarRettIEØS","FarMedMorSomHarRettINorge","MedAdoptertBarn","MedUtenlandsopphold","MedArbeidsforholdOgAndreInntekter","MedSelvstendigNæringsdrivende","MedSelvstendigNæringsdrivendeUtenDiverse","MedAndreInntekterJobbIUtlandet","MedAndreInntekterMilitærtjeneste","ErEndringssøknad"];export{o as Default,m as ErEndringssøknad,r as FarMedMorSomHarRettIEØS,i as FarMedMorSomHarRettINorge,f as FarMedMorSomHaroppholdsSegIEØSMenIkkeHarRettIEØS,l as FarMedUførMor,p as MedAdoptertBarn,d as MedAleneOmsorg,u as MedAndreInntekterJobbIUtlandet,D as MedAndreInntekterMilitærtjeneste,s as MedAnnenForelder,g as MedArbeidsforholdOgAndreInntekter,S as MedSelvstendigNæringsdrivende,T as MedSelvstendigNæringsdrivendeUtenDiverse,k as MedUtenlandsopphold,In as __namedExportsOrder,Fn as default};
//# sourceMappingURL=Oppsummering.stories-8231496f.js.map
