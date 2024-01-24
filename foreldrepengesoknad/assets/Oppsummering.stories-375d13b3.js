import{j as T}from"./jsx-runtime-1caa8f64.js";import{a as xe}from"./chunk-WFFRPTHA-80d37c1b.js";import{I as a}from"./Tidsperioden-3740d843.js";import{B as Se}from"./barnUtils-422ebf13.js";import{D as he}from"./Periodene-929c4e05.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{A as Ie}from"./AxiosMock-ed819255.js";import{N as Fe,A as Ee}from"./Næring-7802bed3.js";import{_ as ve}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{m as Le}from"./mapSøkerinfoDTO-739a59ed.js";import{O as ge}from"./Oppsummering-446650c6.js";import{F as Ce,C as t}from"./FpDataContext-c0784ba8.js";import{S as be}from"./useFpNavigator-f31fd526.js";import{i as _e}from"./amplitude-db41cfb9.js";import{M as He}from"./dateFormValidation-bfde5cde.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./Perioden-c95d8939.js";import"./uttaksPlanStatus-4880748a.js";import"./stringUtils-ee6805af.js";import"./index-bcca6cba.js";import"./apiInterceptor-716e24db.js";import"./timezone-b3f5c703.js";import"./Uttaksplan-8003b46c.js";import"./FormikFileUploader-a4d3b0c4.js";import"./AttachmentList-36ade0db.js";import"./Attachment-46d026a8.js";import"./IntlProvider-4448d7ec.js";import"./dates-096df86f.js";import"./provider-40d4318a.js";import"./ExpansionCard-7ff5568c.js";import"./links-4d39192e.js";import"./leggTilPeriode-3fe99876.js";import"./arbeidsforholdUtils-05558051.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./uttaksplanHarForMangeFlerbarnsuker-bfdd82b6.js";import"./index-47edccfa.js";import"./formUtils-28f62441.js";import"./isFarEllerMedmor-120238ea.js";import"./Tag-70ce2969.js";import"./dateUtils-dfe049d0.js";import"./amplitude.esm-2809efde.js";const je=()=>(...m)=>(xe("button-click")(...m),Promise.resolve()),Gn={title:"steps/Oppsummering",component:ge},e=ve,Ke={type:Se.FØDT,fødselsdatoer:[a("2021-03-15")],antallBarn:1,datoForAleneomsorg:a("2021-03-15"),dokumentasjonAvAleneomsorg:[]},Je={situasjon:"fødsel",rolle:"mor"},Be={kanIkkeOppgis:!0},Ge={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!0},Ve={},we=[{id:"0",type:"uttak",forelder:"mor",konto:"FORELDREPENGER_FØR_FØDSEL",tidsperiode:{fom:new Date("2021-11-23T23:00:00.000Z"),tom:new Date("2021-12-13T23:00:00.000Z")}},{id:"1",type:"utsettelse",årsak:"INSTITUSJONSOPPHOLD_SØKER",tidsperiode:{fom:new Date("2021-12-14T23:00:00.000Z"),tom:new Date("2022-01-24T23:00:00.000Z")}},{id:"2",type:"periodeUtenUttak",tidsperiode:{fom:new Date("2022-01-25T23:00:00.000Z"),tom:new Date("2022-03-28T23:00:00.000Z")}},{id:"3",type:"uttak",forelder:"mor",konto:"FELLESPERIODE",tidsperiode:{fom:new Date("2022-03-29T23:00:00.000Z"),tom:new Date("2022-06-06T23:00:00.000Z")},ønskerSamtidigUttak:!1,gradert:!1}],n=({søkerinfo:m,søkersituasjon:De=Je,søker:Te=Ve,annenForelder:ue=Be,barn:me=Ke,utenlandsopphold:Ne=Ge,utenlandsoppholdSenere:fe,utenlandsoppholdTidligere:Ae,erEndringssøknad:ce=!1,mellomlagreSøknadOgNaviger:Oe=je(),gåTilNesteSide:Me,avbrytSøknad:Re=xe("button-click"),sendSøknad:ye=()=>Promise.resolve()})=>{_e();const Pe=Ue=>{Ue.onPost("/storage/foreldrepenger").reply(200,void 0)};return T.jsx(He,{initialEntries:[be.OPPSUMMERING],children:T.jsx(Ie,{mock:Pe,children:T.jsx(Ce,{onDispatch:Me,initialState:{[t.SØKER]:Te,[t.ANNEN_FORELDER]:ue,[t.SØKERSITUASJON]:De,[t.UTTAKSPLAN_METADATA]:{ønskerJustertUttakVedFødsel:!1,harUttaksplanBlittSlettet:!1,antallUkerIUttaksplan:1},[t.OM_BARNET]:me,[t.UTENLANDSOPPHOLD]:Ne,[t.UTENLANDSOPPHOLD_SENERE]:fe,[t.UTENLANDSOPPHOLD_TIDLIGERE]:Ae,[t.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:he.HUNDRE_PROSENT},[t.UTTAKSPLAN]:we},children:T.jsx(ge,{erEndringssøknad:ce,sendSøknad:ye,søkerInfo:Le(m),avbrytSøknad:Re,mellomlagreSøknadOgNaviger:Oe})})})})},o=n.bind({});o.args={søkerinfo:e};const s=n.bind({});s.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:e};const d=n.bind({});d.args={søker:{erAleneOmOmsorg:!0,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{fornavn:"Ingen",etternavn:"Omsorg",fnr:"1212121313",kanIkkeOppgis:!1},søkerinfo:e};const l=n.bind({});l.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Eline",etternavn:"Utvikler",fnr:"1515151616",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1,erUfør:!0},søkerinfo:e};const r=n.bind({});r.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søkerinfo:e};const u=n.bind({});r.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1},søkerinfo:e};const i=n.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Frida",etternavn:"Norsk",fnr:"01010012345",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:e};const p=n.bind({});p.args={søkersituasjon:{rolle:"mor",situasjon:"adopsjon"},barn:{type:Se.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:a("2021-10-01"),fødselsdatoer:[a("2021-01-01")],adoptertIUtlandet:!1,omsorgsovertakelse:[]},søkerinfo:e};const k=n.bind({});k.args={utenlandsopphold:{iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},utenlandsoppholdSenere:{senereOpphold:[{land:"SE",tidsperiode:{fom:"2021-01-01",tom:"2021-12-31"}}]},utenlandsoppholdTidligere:{tidligereOpphold:[{land:"SE",tidsperiode:{fom:"2020-01-01",tom:"2020-12-31"}}]},søkerinfo:e};const x=n.bind({});x.args={søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!0,frilansInformasjon:{jobberFremdelesSomFrilans:!0,oppstart:a("2019-01-01")},harHattAnnenInntektSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkerinfo:{søker:{...e.søker},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};const S=n.bind({});S.args={søker:{erAleneOmOmsorg:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:a("2018-01-01"),tom:a("2021-01-01")},næringstyper:[Fe.FISKER],organisasjonsnummer:"123",næringsinntekt:1e6,registrertINorge:!0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!0,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0,endringAvNæringsinntektInformasjon:{dato:a("2019-01-01"),næringsinntektEtterEndring:1e6,forklaring:"Jobbar beinhardt!"}}],harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1},søkerinfo:e};const F=n.bind({});F.args={søker:{erAleneOmOmsorg:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:a("2018-01-01"),tom:a("2021-01-01")},næringstyper:[Fe.FISKER],registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!1}],harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1},søkerinfo:e};const E=n.bind({});E.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:Ee.JOBB_I_UTLANDET,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},arbeidsgiverNavn:"Statoil",land:"SE",vedlegg:[]}],harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkerinfo:e};const g=n.bind({});g.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:Ee.MILITÆRTJENESTE,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},vedlegg:[{id:"1",url:"Dette er en url",filename:"Filnavn"}]}],harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkerinfo:e};const D=n.bind({});D.args={erEndringssøknad:!0,søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:e};var N,f,A;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(A=(f=o.parameters)==null?void 0:f.docs)==null?void 0:A.source}}};var c,O,M;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(M=(O=s.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var R,y,P;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(P=(y=d.parameters)==null?void 0:y.docs)==null?void 0:P.source}}};var U,h,I;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(I=(h=l.parameters)==null?void 0:h.docs)==null?void 0:I.source}}};var v,L,C;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(C=(L=r.parameters)==null?void 0:L.docs)==null?void 0:C.source}}};var b,_,H;u.parameters={...u.parameters,docs:{...(b=u.parameters)==null?void 0:b.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(H=(_=u.parameters)==null?void 0:_.docs)==null?void 0:H.source}}};var j,K,J;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(J=(K=i.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};var B,G,V;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(V=(G=p.parameters)==null?void 0:G.docs)==null?void 0:V.source}}};var w,Z,Y;k.parameters={...k.parameters,docs:{...(w=k.parameters)==null?void 0:w.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Y=(Z=k.parameters)==null?void 0:Z.docs)==null?void 0:Y.source}}};var q,z,Q;x.parameters={...x.parameters,docs:{...(q=x.parameters)==null?void 0:q.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Q=(z=x.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,$;S.parameters={...S.parameters,docs:{...(W=S.parameters)==null?void 0:W.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...($=(X=S.parameters)==null?void 0:X.docs)==null?void 0:$.source}}};var ee,ne,te;F.parameters={...F.parameters,docs:{...(ee=F.parameters)==null?void 0:ee.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(te=(ne=F.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var ae,re,oe;E.parameters={...E.parameters,docs:{...(ae=E.parameters)==null?void 0:ae.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(oe=(re=E.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var se,de,le;g.parameters={...g.parameters,docs:{...(se=g.parameters)==null?void 0:se.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(le=(de=g.parameters)==null?void 0:de.docs)==null?void 0:le.source}}};var ie,pe,ke;D.parameters={...D.parameters,docs:{...(ie=D.parameters)==null?void 0:ie.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søker = defaultSøker,
  annenForelder = defaultAnnenForelder,
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKER]: søker,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
          ønskerJustertUttakVedFødsel: false,
          harUttaksplanBlittSlettet: false,
          antallUkerIUttaksplan: 1
        },
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
        },
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(ke=(pe=D.parameters)==null?void 0:pe.docs)==null?void 0:ke.source}}};const Vn=["Default","MedAnnenForelder","MedAleneOmsorg","FarMedUførMor","FarMedMorSomHarRettIEØS","FarMedMorSomHaroppholdsSegIEØSMenIkkeHarRettIEØS","FarMedMorSomHarRettINorge","MedAdoptertBarn","MedUtenlandsopphold","MedArbeidsforholdOgAndreInntekter","MedSelvstendigNæringsdrivende","MedSelvstendigNæringsdrivendeUtenDiverse","MedAndreInntekterJobbIUtlandet","MedAndreInntekterMilitærtjeneste","ErEndringssøknad"];export{o as Default,D as ErEndringssøknad,r as FarMedMorSomHarRettIEØS,i as FarMedMorSomHarRettINorge,u as FarMedMorSomHaroppholdsSegIEØSMenIkkeHarRettIEØS,l as FarMedUførMor,p as MedAdoptertBarn,d as MedAleneOmsorg,E as MedAndreInntekterJobbIUtlandet,g as MedAndreInntekterMilitærtjeneste,s as MedAnnenForelder,x as MedArbeidsforholdOgAndreInntekter,S as MedSelvstendigNæringsdrivende,F as MedSelvstendigNæringsdrivendeUtenDiverse,k as MedUtenlandsopphold,Vn as __namedExportsOrder,Gn as default};
