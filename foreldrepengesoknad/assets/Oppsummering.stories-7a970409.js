import{j as u}from"./jsx-runtime-1caa8f64.js";import{a as Ee}from"./chunk-WFFRPTHA-80d37c1b.js";import{I as a,d as T,e as m}from"./dates-37291467.js";import{A as Ce}from"./AxiosMock-f85117c7.js";import{B as De}from"./barnUtils-aeabd763.js";import{D as ve}from"./Dekningsgrad-fced8842.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import{S as e}from"./skjemanummer-4d711b8d.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as _e}from"./IntlProvider-067bcbb8.js";import{F as be,C as t}from"./FpDataContext-9c963fd7.js";import{N as Fe,A as ge}from"./Næring-70dab7fe.js";import{S as Ge}from"./useFpNavigator-aed5ab8f.js";import{O as ue}from"./Oppsummering-48624427.js";import{M as Ke}from"./dateFormValidation-a676b58d.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./amplitude.esm-2809efde.js";import"./createIntl-3a69cb36.js";import"./uttaksPlanStatus-b4a351f3.js";import"./Perioden-e5e2ab84.js";import"./stringUtils-d2289bbc.js";import"./Accordion-81709660.js";import"./Box-4e1f06ee.js";import"./isFarEllerMedmor-120238ea.js";import"./dateUtils-191f81f7.js";import"./Arbeidsform-a1ff9760.js";const He=()=>(...f)=>(Ee("button-click")(...f),Promise.resolve()),Te={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},je={type:De.FØDT,fødselsdatoer:[a("2021-03-15")],antallBarn:1,datoForAleneomsorg:a("2021-03-15"),dokumentasjonAvAleneomsorg:[]},Be={situasjon:"fødsel",rolle:"mor"},Je={kanIkkeOppgis:!0},Ve={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!0},we={},Ze=[{id:"0",type:"uttak",forelder:"mor",konto:"FORELDREPENGER_FØR_FØDSEL",tidsperiode:{fom:new Date("2021-11-23T23:00:00.000Z"),tom:new Date("2021-12-13T23:00:00.000Z")}},{id:"1",type:"utsettelse",årsak:"INSTITUSJONSOPPHOLD_SØKER",tidsperiode:{fom:new Date("2021-12-14T23:00:00.000Z"),tom:new Date("2022-01-24T23:00:00.000Z")}},{id:"2",type:"periodeUtenUttak",tidsperiode:{fom:new Date("2022-01-25T23:00:00.000Z"),tom:new Date("2022-03-28T23:00:00.000Z")}},{id:"3",type:"uttak",forelder:"mor",konto:"FELLESPERIODE",tidsperiode:{fom:new Date("2022-03-29T23:00:00.000Z"),tom:new Date("2022-06-06T23:00:00.000Z")},ønskerSamtidigUttak:!1,gradert:!1}],Ye={[e.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],[e.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],[e.DOK_INNLEGGELSE_BARN]:[],[e.DOK_INNLEGGELSE_MOR]:[],[e.DOK_INNLEGGELSE_FAR]:[],[e.DOK_SYKDOM_MOR]:[],[e.DOK_SYKDOM_FAR]:[],[e.DOK_ARBEID_MOR]:[],[e.DOK_UTDANNING_MOR]:[],[e.DOK_UTDANNING_OG_ARBEID_MOR]:[],[e.OMSORGSOVERTAKELSE]:[],[e.DOK_AV_ALENEOMSORG]:[],[e.TERMINBEKREFTELSE]:[],[e.DOK_MILITÆR_SILVIL_TJENESTE]:[],[e.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[]},Un={title:"steps/Oppsummering",component:ue},n=({søkerinfo:f=Te,søkersituasjon:me=Be,søkerData:Ne=we,annenForelder:fe=Je,barn:Ae=je,utenlandsopphold:Oe=Ve,utenlandsoppholdSenere:ce,utenlandsoppholdTidligere:Re,erEndringssøknad:Me=!1,mellomlagreSøknadOgNaviger:ye=He(),gåTilNesteSide:Pe,avbrytSøknad:Ue=Ee("button-click"),sendSøknad:Le=()=>Promise.resolve()})=>{_e();const he=Ie=>{Ie.onPost("/storage/foreldrepenger").reply(200,void 0)};return u.jsx(Ke,{initialEntries:[Ge.OPPSUMMERING],children:u.jsx(Ce,{mock:he,children:u.jsx(be,{onDispatch:Pe,initialState:{[t.SØKER_DATA]:Ne,[t.ANNEN_FORELDER]:fe,[t.SØKERSITUASJON]:me,[t.UTTAKSPLAN_METADATA]:{ønskerJustertUttakVedFødsel:!1,harUttaksplanBlittSlettet:!1,antallUkerIUttaksplan:1},[t.OM_BARNET]:Ae,[t.UTENLANDSOPPHOLD]:Oe,[t.UTENLANDSOPPHOLD_SENERE]:ce,[t.UTENLANDSOPPHOLD_TIDLIGERE]:Re,[t.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:ve.HUNDRE_PROSENT},[t.UTTAKSPLAN]:Ze,[t.VEDLEGG]:Ye},children:u.jsx(ue,{erEndringssøknad:Me,sendSøknad:Le,søkerInfo:f,avbrytSøknad:Ue,mellomlagreSøknadOgNaviger:ye})})})})},N=n.bind({}),r=n.bind({});r.args={søkerData:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}};const o=n.bind({});o.args={søkerData:{erAleneOmOmsorg:!0,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{fornavn:"Ingen",etternavn:"Omsorg",fnr:"1212121313",kanIkkeOppgis:!1}};const s=n.bind({});s.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerData:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Eline",etternavn:"Utvikler",fnr:"1515151616",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1,erUfør:!0}};const d=n.bind({});d.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerData:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}};const l=n.bind({});l.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerData:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1}};const i=n.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerData:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Frida",etternavn:"Norsk",fnr:"01010012345",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}};const p=n.bind({});p.args={søkersituasjon:{rolle:"mor",situasjon:"adopsjon"},barn:{type:De.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:a("2021-10-01"),fødselsdatoer:[a("2021-01-01")],adoptertIUtlandet:!1,omsorgsovertakelse:[]}};const k=n.bind({});k.args={utenlandsopphold:{iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},utenlandsoppholdSenere:{senereOpphold:[{land:"SE",tidsperiode:{fom:T().format(m),tom:T().add(100,"days").format(m)}}]},utenlandsoppholdTidligere:{tidligereOpphold:[{land:"SE",tidsperiode:{fom:T().subtract(10,"months").format(m),tom:T().subtract(1,"days").format(m)}}]}};const x=n.bind({});x.args={søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!0,frilansInformasjon:{jobberFremdelesSomFrilans:!0,oppstart:a("2019-01-01")},harHattAnnenInntektSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkerinfo:{søker:Te.søker,arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};const S=n.bind({});S.args={søkerData:{erAleneOmOmsorg:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:a("2018-01-01"),tom:a("2021-01-01")},næringstyper:[Fe.FISKER],organisasjonsnummer:"123",næringsinntekt:1e6,registrertINorge:!0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!0,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0,endringAvNæringsinntektInformasjon:{dato:a("2019-01-01"),næringsinntektEtterEndring:1e6,forklaring:"Jobbar beinhardt!"}}],harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1}};const E=n.bind({});E.args={søkerData:{erAleneOmOmsorg:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:a("2018-01-01"),tom:a("2021-01-01")},næringstyper:[Fe.FISKER],registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!1}],harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1}};const D=n.bind({});D.args={søkerData:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:ge.JOBB_I_UTLANDET,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},arbeidsgiverNavn:"Statoil",land:"SE"}],harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1}};const F=n.bind({});F.args={søkerData:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:ge.MILITÆRTJENESTE,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"}}],harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1}};const g=n.bind({});g.args={erEndringssøknad:!0,søkerData:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}};var A,O,c;N.parameters={...N.parameters,docs:{...(A=N.parameters)==null?void 0:A.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(c=(O=N.parameters)==null?void 0:O.docs)==null?void 0:c.source}}};var R,M,y;r.parameters={...r.parameters,docs:{...(R=r.parameters)==null?void 0:R.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(y=(M=r.parameters)==null?void 0:M.docs)==null?void 0:y.source}}};var P,U,L;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(L=(U=o.parameters)==null?void 0:U.docs)==null?void 0:L.source}}};var h,I,C;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(C=(I=s.parameters)==null?void 0:I.docs)==null?void 0:C.source}}};var v,_,b;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(b=(_=d.parameters)==null?void 0:_.docs)==null?void 0:b.source}}};var G,K,H;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(H=(K=l.parameters)==null?void 0:K.docs)==null?void 0:H.source}}};var j,B,J;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(J=(B=i.parameters)==null?void 0:B.docs)==null?void 0:J.source}}};var V,w,Z;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Z=(w=p.parameters)==null?void 0:w.docs)==null?void 0:Z.source}}};var Y,q,z;k.parameters={...k.parameters,docs:{...(Y=k.parameters)==null?void 0:Y.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(z=(q=k.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var Q,W,X;x.parameters={...x.parameters,docs:{...(Q=x.parameters)==null?void 0:Q.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(X=(W=x.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var $,ee,ne;S.parameters={...S.parameters,docs:{...($=S.parameters)==null?void 0:$.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(ne=(ee=S.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var te,ae,re;E.parameters={...E.parameters,docs:{...(te=E.parameters)==null?void 0:te.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(re=(ae=E.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var oe,se,de;D.parameters={...D.parameters,docs:{...(oe=D.parameters)==null?void 0:oe.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(de=(se=D.parameters)==null?void 0:se.docs)==null?void 0:de.source}}};var le,ie,pe;F.parameters={...F.parameters,docs:{...(le=F.parameters)==null?void 0:le.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(pe=(ie=F.parameters)==null?void 0:ie.docs)==null?void 0:pe.source}}};var ke,xe,Se;g.parameters={...g.parameters,docs:{...(ke=g.parameters)==null?void 0:ke.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfo,
  søkersituasjon = defaultSøkersituasjon,
  søkerData = defaultSøker,
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
        [ContextDataType.SØKER_DATA]: søkerData,
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
        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
        [ContextDataType.VEDLEGG]: defaultVedlegg
      }}>
                    <Oppsummering erEndringssøknad={erEndringssøknad} sendSøknad={sendSøknad} søkerInfo={søkerinfo} avbrytSøknad={avbrytSøknad} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Se=(xe=g.parameters)==null?void 0:xe.docs)==null?void 0:Se.source}}};const Ln=["Default","MedAnnenForelder","MedAleneOmsorg","FarMedUførMor","FarMedMorSomHarRettIEØS","FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS","FarMedMorSomHarRettINorge","MedAdoptertBarn","MedUtenlandsopphold","MedArbeidsforholdOgAndreInntekter","MedSelvstendigNæringsdrivende","MedSelvstendigNæringsdrivendeUtenDiverse","MedAndreInntekterJobbIUtlandet","MedAndreInntekterMilitærtjeneste","ErEndringssøknad"];export{N as Default,g as ErEndringssøknad,l as FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS,d as FarMedMorSomHarRettIEØS,i as FarMedMorSomHarRettINorge,s as FarMedUførMor,p as MedAdoptertBarn,o as MedAleneOmsorg,D as MedAndreInntekterJobbIUtlandet,F as MedAndreInntekterMilitærtjeneste,r as MedAnnenForelder,x as MedArbeidsforholdOgAndreInntekter,S as MedSelvstendigNæringsdrivende,E as MedSelvstendigNæringsdrivendeUtenDiverse,k as MedUtenlandsopphold,Ln as __namedExportsOrder,Un as default};
