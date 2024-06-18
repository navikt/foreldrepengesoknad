import{j as A}from"./jsx-runtime-_e34SzbC.js";import{a as Ae}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{d as O,I as M,c as r}from"./Tidsperioden-CBU4jtV4.js";import{A as je}from"./AxiosMock-C4Zycm12.js";import"./index--IHLcpuH.js";import{B as N,M as Be}from"./index-BI6FGWNT.js";import{S as Je,D as Ve}from"./useFpNavigator-BfAbrm23.js";import"./index-DVXBtNgz.js";import{S as n}from"./innsendingsType-DprMYF-V.js";import{S as R}from"./sivilstandType-DxfjzFEG.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{i as we}from"./infobox.module-CEohyy7k.js";import{F as Ze,C as t}from"./FpDataContext-BcznBdmF.js";import{N as Oe,A as Me}from"./Næring-P01WlNGB.js";import{O as ce}from"./Oppsummering-DliMbM8D.js";import"./v4-CQkTLCs1.js";import"./index-Dcs0RV0A.js";import"./Link-SOWRV7cb.js";import"./index-Cbx7Fas8.js";import"./index-C4x6kqll.js";import"./apiInterceptor-ChqlQpSB.js";import"./iframe-_8KDTttG.js";import"../sb-preview/runtime.js";import"./message-7S5F936x.js";import"./links-BFd19Kxc.js";import"./Accordion-BnHB9JsT.js";import"./extends-CF3RwP-h.js";import"./VStack-DueXo9sZ.js";import"./dateFormValidation-Bmatx0XA.js";import"./amplitude.esm-BThBy0fb.js";import"./SøkerOppsummeringspunkt-L9UuIjJB.js";import"./barnUtils-CzrFcN1F.js";import"./util-D1KT6Dul.js";import"./dateUtils-Dv5-apgV.js";import"./File-BVGB9iEn.js";import"./globalUtil-Qzbk2gO0.js";const Ye=()=>(...y)=>(Ae("button-click")(...y),Promise.resolve()),a={søker:{fnr:"02520489226",fornavn:"MOR",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"08099017784",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}],sivilstand:{type:R.GIFT}},arbeidsforhold:[]},o={søker:{fnr:"08099017784",fornavn:"FAR",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}],sivilstand:{type:R.UGIFT}},arbeidsforhold:[]},qe={type:N.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,datoForAleneomsorg:"2021-03-15",dokumentasjonAvAleneomsorg:[]},ze={situasjon:"fødsel",rolle:"mor"},s={kanIkkeOppgis:!0},Qe={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!0},We={},Xe=[{id:"0",type:"uttak",forelder:"mor",konto:"FORELDREPENGER_FØR_FØDSEL",tidsperiode:{fom:new Date("2021-11-23T23:00:00.000Z"),tom:new Date("2021-12-13T23:00:00.000Z")}},{id:"1",type:"utsettelse",årsak:"INSTITUSJONSOPPHOLD_SØKER",tidsperiode:{fom:new Date("2021-12-14T23:00:00.000Z"),tom:new Date("2022-01-24T23:00:00.000Z")}},{id:"2",type:"periodeUtenUttak",tidsperiode:{fom:new Date("2022-01-25T23:00:00.000Z"),tom:new Date("2022-03-28T23:00:00.000Z")}},{id:"3",type:"uttak",forelder:"mor",konto:"FELLESPERIODE",tidsperiode:{fom:new Date("2022-03-29T23:00:00.000Z"),tom:new Date("2022-06-06T23:00:00.000Z")},ønskerSamtidigUttak:!1,gradert:!1}],$e={[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],[n.DOK_INNLEGGELSE_BARN]:[],[n.DOK_INNLEGGELSE_MOR]:[],[n.DOK_INNLEGGELSE_FAR]:[],[n.DOK_SYKDOM_MOR]:[],[n.DOK_SYKDOM_FAR]:[],[n.DOK_ARBEID_MOR]:[],[n.DOK_UTDANNING_MOR]:[],[n.DOK_UTDANNING_OG_ARBEID_MOR]:[],[n.OMSORGSOVERTAKELSE]:[],[n.DOK_AV_ALENEOMSORG]:[],[n.TERMINBEKREFTELSE]:[],[n.DOK_MILITÆR_SILVIL_TJENESTE]:[],[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[]},Gn={title:"steps/Oppsummering",component:ce},e=({søkerinfo:y=a,søkersituasjon:Re=ze,søkerData:ye=We,annenForelder:Pe=s,barn:Ue=qe,utenlandsopphold:Le=Qe,utenlandsoppholdSenere:Ie,utenlandsoppholdTidligere:he,erEndringssøknad:ve=!1,mellomlagreSøknadOgNaviger:Ce=Ye(),gåTilNesteSide:_e,avbrytSøknad:be=Ae("button-click"),sendSøknad:Ge=()=>Promise.resolve()})=>{we();const Ke=He=>{He.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return A.jsx(Be,{initialEntries:[Je.OPPSUMMERING],children:A.jsx(je,{mock:Ke,children:A.jsx(Ze,{onDispatch:_e,initialState:{[t.SØKER_DATA]:ye,[t.ANNEN_FORELDER]:Pe,[t.SØKERSITUASJON]:Re,[t.UTTAKSPLAN_METADATA]:{ønskerJustertUttakVedFødsel:!1,harUttaksplanBlittSlettet:!1,antallUkerIUttaksplan:1},[t.OM_BARNET]:Ue,[t.UTENLANDSOPPHOLD]:Le,[t.UTENLANDSOPPHOLD_SENERE]:Ie,[t.UTENLANDSOPPHOLD_TIDLIGERE]:he,[t.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:Ve.HUNDRE_PROSENT},[t.UTTAKSPLAN]:Xe,[t.VEDLEGG]:$e},children:A.jsx(ce,{erEndringssøknad:ve,sendSøknad:Ge,søkerInfo:y,avbrytSøknad:be,mellomlagreSøknadOgNaviger:Ce})})})})},c=e.bind({}),d=e.bind({});d.args={søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Espen",etternavn:"Utvikler",fnr:"08099017784",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},barn:{type:N.UFØDT,antallBarn:1,termindato:"2025-10-01"},søkerinfo:{...a,søker:{...a.søker,sivilstand:{type:R.UGIFT}}}};const l=e.bind({});l.args={søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Ingen",etternavn:"Omsorg",fnr:"08099017784",kanIkkeOppgis:!1}};const i=e.bind({});i.args={søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerinfo:{...o},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Ingen",etternavn:"Omsorg",fnr:"02520489226",kanIkkeOppgis:!1},barn:{type:N.UFØDT,antallBarn:2,termindato:"2025-10-01"}};const p=e.bind({});p.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Eline",etternavn:"Utvikler",fnr:"02520489226",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1,erMorUfør:!0},søkerinfo:{...o,søker:{...o.søker,sivilstand:{type:R.UGIFT}}},barn:{type:N.UFØDT,antallBarn:1,termindato:"2025-10-01"}};const k=e.bind({});k.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Anne",etternavn:"Forelder",fnr:"02520489226",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søkerinfo:{...o}};const x=e.bind({});x.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Anne",etternavn:"Forelder",fnr:"02520489226",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1},søkerinfo:{...o}};const S=e.bind({});S.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Frida",etternavn:"Norsk",fnr:"02520489226",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:{...o}};const E=e.bind({});E.args={søkersituasjon:{rolle:"mor",situasjon:"adopsjon"},barn:{type:N.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2021-10-01",fødselsdatoer:["2021-01-01"],adoptertIUtlandet:!1,omsorgsovertakelse:[]}};const D=e.bind({});D.args={utenlandsopphold:{iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},utenlandsoppholdSenere:{senereOpphold:[{land:"SE",tidsperiode:{fom:O().format(M),tom:O().add(100,"days").format(M)}}]},utenlandsoppholdTidligere:{tidligereOpphold:[{land:"SE",tidsperiode:{fom:O().subtract(10,"months").format(M),tom:O().subtract(1,"days").format(M)}}]}};const F=e.bind({});F.args={søkerData:{harJobbetSomFrilansSiste10Mnd:!0,frilansInformasjon:{jobberFremdelesSomFrilans:!0,oppstart:r("2019-01-01")},harHattAnnenInntektSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{...s,erAleneOmOmsorg:!1},søkerinfo:{søker:a.søker,arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};const g=e.bind({});g.args={søkerData:{harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:r("2018-01-01"),tom:r("2021-01-01")},næringstyper:[Oe.FISKER],organisasjonsnummer:"123",næringsinntekt:1e6,registrertINorge:!0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!0,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0,endringAvNæringsinntektInformasjon:{dato:r("2019-01-01"),næringsinntektEtterEndring:1e6,forklaring:"Jobbar beinhardt!"}}],harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1},annenForelder:{...s,erAleneOmOmsorg:!1},søkerinfo:a};const T=e.bind({});T.args={søkerData:{harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:r("2018-01-01"),tom:r("2021-01-01")},næringstyper:[Oe.FISKER],registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!1}],harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1},annenForelder:{...s,erAleneOmOmsorg:!1},søkerinfo:a};const u=e.bind({});u.args={søkerData:{harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:Me.JOBB_I_UTLANDET,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},arbeidsgiverNavn:"Statoil",land:"SE"}],harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{...s,erAleneOmOmsorg:!1},søkerinfo:a};const m=e.bind({});m.args={søkerData:{harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:Me.MILITÆRTJENESTE,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"}}],harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{...s,erAleneOmOmsorg:!1},søkerinfo:a};const f=e.bind({});f.args={erEndringssøknad:!0,søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}};var P,U,L;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(L=(U=c.parameters)==null?void 0:U.docs)==null?void 0:L.source}}};var I,h,v;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(v=(h=d.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var C,_,b;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(b=(_=l.parameters)==null?void 0:_.docs)==null?void 0:b.source}}};var G,K,H;i.parameters={...i.parameters,docs:{...(G=i.parameters)==null?void 0:G.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(H=(K=i.parameters)==null?void 0:K.docs)==null?void 0:H.source}}};var j,B,J;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(J=(B=p.parameters)==null?void 0:B.docs)==null?void 0:J.source}}};var V,w,Z;k.parameters={...k.parameters,docs:{...(V=k.parameters)==null?void 0:V.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(Z=(w=k.parameters)==null?void 0:w.docs)==null?void 0:Z.source}}};var Y,q,z;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(z=(q=x.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var Q,W,X;S.parameters={...S.parameters,docs:{...(Q=S.parameters)==null?void 0:Q.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(X=(W=S.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var $,ee,ne;E.parameters={...E.parameters,docs:{...($=E.parameters)==null?void 0:$.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(ne=(ee=E.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var te,ae,re;D.parameters={...D.parameters,docs:{...(te=D.parameters)==null?void 0:te.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(re=(ae=D.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var oe,se,de;F.parameters={...F.parameters,docs:{...(oe=F.parameters)==null?void 0:oe.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(de=(se=F.parameters)==null?void 0:se.docs)==null?void 0:de.source}}};var le,ie,pe;g.parameters={...g.parameters,docs:{...(le=g.parameters)==null?void 0:le.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(pe=(ie=g.parameters)==null?void 0:ie.docs)==null?void 0:pe.source}}};var ke,xe,Se;T.parameters={...T.parameters,docs:{...(ke=T.parameters)==null?void 0:ke.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(Se=(xe=T.parameters)==null?void 0:xe.docs)==null?void 0:Se.source}}};var Ee,De,Fe;u.parameters={...u.parameters,docs:{...(Ee=u.parameters)==null?void 0:Ee.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(Fe=(De=u.parameters)==null?void 0:De.docs)==null?void 0:Fe.source}}};var ge,Te,ue;m.parameters={...m.parameters,docs:{...(ge=m.parameters)==null?void 0:ge.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(ue=(Te=m.parameters)==null?void 0:Te.docs)==null?void 0:ue.source}}};var me,fe,Ne;f.parameters={...f.parameters,docs:{...(me=f.parameters)==null?void 0:me.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
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
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(Ne=(fe=f.parameters)==null?void 0:fe.docs)==null?void 0:Ne.source}}};const Kn=["Default","MorMedAnnenForelderUgift","MorMedAleneOmsorg","FarMedAleneOmsorg","FarMedUførMorUgift","FarMedMorSomHarRettIEØS","FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS","FarMedMorSomHarRettINorge","MorMedAdoptertBarn","MorMedUtenlandsopphold","MorMedArbeidsforholdOgAndreInntekter","MorMedSelvstendigNæringsdrivende","MorMedSelvstendigNæringsdrivendeUtenDiverse","MorMedAndreInntekterJobbIUtlandet","MorMedAndreInntekterMilitærtjeneste","ErEndringssøknad"];export{c as Default,f as ErEndringssøknad,i as FarMedAleneOmsorg,x as FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS,k as FarMedMorSomHarRettIEØS,S as FarMedMorSomHarRettINorge,p as FarMedUførMorUgift,E as MorMedAdoptertBarn,l as MorMedAleneOmsorg,u as MorMedAndreInntekterJobbIUtlandet,m as MorMedAndreInntekterMilitærtjeneste,d as MorMedAnnenForelderUgift,F as MorMedArbeidsforholdOgAndreInntekter,g as MorMedSelvstendigNæringsdrivende,T as MorMedSelvstendigNæringsdrivendeUtenDiverse,D as MorMedUtenlandsopphold,Kn as __namedExportsOrder,Gn as default};
