import{d as R,I,j as c}from"./Uttaksdagen-CVi1UdfS.js";import{a as Re}from"./chunk-454WOBUV-CM0pFb8Z.js";import{A as Ve}from"./AxiosMock-DWv_wXoA.js";import{B as m,i as Je,D as we}from"./Uttaksplan-C-q_5N0-.js";import{S as n}from"./util-BCxaJ6Qu.js";import{S as M}from"./sivilstandType-DxfjzFEG.js";import{M as Ze,F as Ye,C as t}from"./FpDataContext-Bw3l41n2.js";import{S as qe}from"./useFpNavigator-BE1soRC3.js";import{O as Ie,A as ce}from"./Oppsummering-DoNLJKd2.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DkNKrNHd.js";import"./apiInterceptor-BCtLUnPl.js";import"./Label-D9yH3wXA.js";import"./iframe-Dr6P14DD.js";import"../sb-preview/runtime.js";import"./links-D6IYREgS.js";import"./Modal-Bf7Xci8e.js";import"./index-BVEwUaSm.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./BoIUtlandetOppsummeringspunkt-BvQ7sH8p.js";import"./Block-07daPjv9.js";import"./barnUtils-CCEXbVV1.js";import"./ArbeidsforholdOgInntektPanel-DTpnACS9.js";import"./ErrorSummaryHookForm-BSEElhq_.js";import"./ExpansionCard-Dtc-vcar.js";import"./arbeidsforholdUtils-BVfcHmdO.js";import"./stønadskontoerUtils-3PPLnDF0.js";import"./guid-CsArkN6i.js";var x=(a=>(a.FISKER="FISKE",a.JORDBRUK="JORDBRUK_SKOGBRUK",a.DAGMAMMA="DAGMAMMA",a.ANNET="ANNEN",a))(x||{});const ze=()=>(...a)=>(Re("button-click")(...a),Promise.resolve()),r={søker:{fnr:"02520489226",fornavn:"MOR",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"08099017784",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}],sivilstand:{type:M.GIFT}},arbeidsforhold:[]},o={søker:{fnr:"08099017784",fornavn:"FAR",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}],sivilstand:{type:M.UGIFT}},arbeidsforhold:[]},Qe={type:m.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,datoForAleneomsorg:"2021-03-15",dokumentasjonAvAleneomsorg:[]},We={situasjon:"fødsel",rolle:"mor"},s={kanIkkeOppgis:!0},Xe={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!0},$e=[{id:"0",type:"uttak",forelder:"mor",konto:"FORELDREPENGER_FØR_FØDSEL",tidsperiode:{fom:new Date("2021-11-23T23:00:00.000Z"),tom:new Date("2021-12-13T23:00:00.000Z")}},{id:"1",type:"utsettelse",årsak:"INSTITUSJONSOPPHOLD_SØKER",tidsperiode:{fom:new Date("2021-12-14T23:00:00.000Z"),tom:new Date("2022-01-24T23:00:00.000Z")}},{id:"2",type:"periodeUtenUttak",tidsperiode:{fom:new Date("2022-01-25T23:00:00.000Z"),tom:new Date("2022-03-28T23:00:00.000Z")}},{id:"3",type:"uttak",forelder:"mor",konto:"FELLESPERIODE",tidsperiode:{fom:new Date("2022-03-29T23:00:00.000Z"),tom:new Date("2022-06-06T23:00:00.000Z")},ønskerSamtidigUttak:!1,gradert:!1}],en={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},nn={[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],[n.DOK_INNLEGGELSE_BARN]:[],[n.DOK_INNLEGGELSE_MOR]:[],[n.DOK_INNLEGGELSE_FAR]:[],[n.DOK_SYKDOM_MOR]:[],[n.DOK_SYKDOM_FAR]:[],[n.DOK_ARBEID_MOR]:[],[n.DOK_UTDANNING_MOR]:[],[n.DOK_UTDANNING_OG_ARBEID_MOR]:[],[n.OMSORGSOVERTAKELSE]:[],[n.DOK_AV_ALENEOMSORG]:[],[n.TERMINBEKREFTELSE]:[],[n.DOK_MILITÆR_SILVIL_TJENESTE]:[],[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[]},_n={title:"steps/Oppsummering",component:Ie},e=({søkerinfo:a=r,søkersituasjon:ye=We,annenForelder:Me=s,barn:xe=Qe,utenlandsopphold:Le=Xe,utenlandsoppholdSenere:Pe,utenlandsoppholdTidligere:Ue,erEndringssøknad:Ce=!1,arbeidsforholdOgInntekt:he=en,frilans:_e,egenNæring:Fe,andreInntekter:be,mellomlagreSøknadOgNaviger:ve=ze(),gåTilNesteSide:Ge,avbrytSøknad:Ke=Re("button-click"),sendSøknad:He=()=>Promise.resolve()})=>{Je();const Be=je=>{je.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return c.jsx(Ze,{initialEntries:[qe.OPPSUMMERING],children:c.jsx(Ve,{mock:Be,children:c.jsx(Ye,{onDispatch:Ge,initialState:{[t.ARBEIDSFORHOLD_OG_INNTEKT]:he,[t.FRILANS]:_e,[t.EGEN_NÆRING]:Fe,[t.ANDRE_INNTEKTSKILDER]:be,[t.ANNEN_FORELDER]:Me,[t.SØKERSITUASJON]:ye,[t.UTTAKSPLAN_METADATA]:{ønskerJustertUttakVedFødsel:!1,harUttaksplanBlittSlettet:!1,antallUkerIUttaksplan:1},[t.OM_BARNET]:xe,[t.UTENLANDSOPPHOLD]:Le,[t.UTENLANDSOPPHOLD_SENERE]:Pe,[t.UTENLANDSOPPHOLD_TIDLIGERE]:Ue,[t.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:we.HUNDRE_PROSENT},[t.UTTAKSPLAN]:$e,[t.VEDLEGG]:nn},children:c.jsx(Ie,{erEndringssøknad:Ce,sendSøknad:He,søkerInfo:a,avbrytSøknad:Ke,mellomlagreSøknadOgNaviger:ve})})})})},y=e.bind({}),d=e.bind({});d.args={annenForelder:{erAleneOmOmsorg:!1,fornavn:"Espen",etternavn:"Utvikler",fnr:"08099017784",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},barn:{type:m.UFØDT,antallBarn:1,termindato:"2025-10-01"},søkerinfo:{...r,søker:{...r.søker,sivilstand:{type:M.UGIFT}}}};const l=e.bind({});l.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Ingen",etternavn:"Omsorg",fnr:"08099017784",kanIkkeOppgis:!1}};const i=e.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerinfo:{...o},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Ingen",etternavn:"Omsorg",fnr:"02520489226",kanIkkeOppgis:!1},barn:{type:m.UFØDT,antallBarn:2,termindato:"2025-10-01"}};const p=e.bind({});p.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Eline",etternavn:"Utvikler",fnr:"02520489226",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1,erMorUfør:!0},søkerinfo:{...o,søker:{...o.søker,sivilstand:{type:M.UGIFT}}},barn:{type:m.UFØDT,antallBarn:1,termindato:"2025-10-01"}};const k=e.bind({});k.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Anne",etternavn:"Forelder",fnr:"02520489226",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søkerinfo:{...o}};const E=e.bind({});E.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Anne",etternavn:"Forelder",fnr:"02520489226",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1},søkerinfo:{...o}};const g=e.bind({});g.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Frida",etternavn:"Norsk",fnr:"02520489226",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:{...o}};const D=e.bind({});D.args={søkersituasjon:{rolle:"mor",situasjon:"adopsjon"},barn:{type:m.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2021-10-01",fødselsdatoer:["2021-01-01"],adoptertIUtlandet:!1,omsorgsovertakelse:[]}};const S=e.bind({});S.args={utenlandsopphold:{iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},utenlandsoppholdSenere:{senereOpphold:[{land:"SE",tidsperiode:{fom:R().format(I),tom:R().add(100,"days").format(I)}}]},utenlandsoppholdTidligere:{tidligereOpphold:[{land:"SE",tidsperiode:{fom:R().subtract(10,"months").format(I),tom:R().subtract(1,"days").format(I)}}]}};const T=e.bind({});T.args={arbeidsforholdOgInntekt:{harJobbetSomFrilans:!0,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!1},frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2019-01-01"},annenForelder:{...s,erAleneOmOmsorg:!1},søkerinfo:{søker:r.søker,arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};const N=e.bind({});N.args={arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!0},egenNæring:{navnPåNæringen:"Fiske",pågående:!1,fomDato:"2018-01-01",tomDato:"2021-01-01",næringstype:x.FISKER,organisasjonsnummer:"123",næringsinntekt:1e6,registrertINorge:!0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!0,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0},annenForelder:{...s,erAleneOmOmsorg:!1},søkerinfo:r};const u=e.bind({});u.args={arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!0},egenNæring:{navnPåNæringen:"Fiske",pågående:!1,fomDato:"2018-01-01",tomDato:"2021-01-01",næringstype:x.FISKER,registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!1},annenForelder:{...s,erAleneOmOmsorg:!1},søkerinfo:r};const f=e.bind({});f.args={arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!0,harJobbetSomSelvstendigNæringsdrivende:!1},andreInntekter:[{type:ce.JOBB_I_UTLANDET,pågående:!1,fom:"2018-01-01",tom:"2021-01-01",arbeidsgiverNavn:"Statoil",land:"SE"}],annenForelder:{...s,erAleneOmOmsorg:!1},søkerinfo:r};const O=e.bind({});O.args={arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!0,harJobbetSomSelvstendigNæringsdrivende:!1},andreInntekter:[{type:ce.MILITÆRTJENESTE,pågående:!1,fom:"2018-01-01",tom:"2021-01-01"}],annenForelder:{...s,erAleneOmOmsorg:!1},søkerinfo:r};const A=e.bind({});A.args={erEndringssøknad:!0,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}};var L,P,U;y.parameters={...y.parameters,docs:{...(L=y.parameters)==null?void 0:L.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(U=(P=y.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};var C,h,_;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(_=(h=d.parameters)==null?void 0:h.docs)==null?void 0:_.source}}};var F,b,v;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(v=(b=l.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var G,K,H;i.parameters={...i.parameters,docs:{...(G=i.parameters)==null?void 0:G.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(H=(K=i.parameters)==null?void 0:K.docs)==null?void 0:H.source}}};var B,j,V;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(V=(j=p.parameters)==null?void 0:j.docs)==null?void 0:V.source}}};var J,w,Z;k.parameters={...k.parameters,docs:{...(J=k.parameters)==null?void 0:J.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(Z=(w=k.parameters)==null?void 0:w.docs)==null?void 0:Z.source}}};var Y,q,z;E.parameters={...E.parameters,docs:{...(Y=E.parameters)==null?void 0:Y.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(z=(q=E.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var Q,W,X;g.parameters={...g.parameters,docs:{...(Q=g.parameters)==null?void 0:Q.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(X=(W=g.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var $,ee,ne;D.parameters={...D.parameters,docs:{...($=D.parameters)==null?void 0:$.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(ne=(ee=D.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var te,ae,re;S.parameters={...S.parameters,docs:{...(te=S.parameters)==null?void 0:te.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(re=(ae=S.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var oe,se,de;T.parameters={...T.parameters,docs:{...(oe=T.parameters)==null?void 0:oe.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(de=(se=T.parameters)==null?void 0:se.docs)==null?void 0:de.source}}};var le,ie,pe;N.parameters={...N.parameters,docs:{...(le=N.parameters)==null?void 0:le.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(pe=(ie=N.parameters)==null?void 0:ie.docs)==null?void 0:pe.source}}};var ke,Ee,ge;u.parameters={...u.parameters,docs:{...(ke=u.parameters)==null?void 0:ke.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(ge=(Ee=u.parameters)==null?void 0:Ee.docs)==null?void 0:ge.source}}};var De,Se,Te;f.parameters={...f.parameters,docs:{...(De=f.parameters)==null?void 0:De.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(Te=(Se=f.parameters)==null?void 0:Se.docs)==null?void 0:Te.source}}};var Ne,ue,fe;O.parameters={...O.parameters,docs:{...(Ne=O.parameters)==null?void 0:Ne.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(fe=(ue=O.parameters)==null?void 0:ue.docs)==null?void 0:fe.source}}};var Oe,Ae,me;A.parameters={...A.parameters,docs:{...(Oe=A.parameters)==null?void 0:Oe.docs,source:{originalSource:`({
  søkerinfo = defaultSøkerinfoMor,
  søkersituasjon = defaultSøkersituasjon,
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  utenlandsopphold = defaultUtenlandsopphold,
  utenlandsoppholdSenere,
  utenlandsoppholdTidligere,
  erEndringssøknad = false,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  frilans,
  egenNæring,
  andreInntekter,
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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
        [ContextDataType.FRILANS]: frilans,
        [ContextDataType.EGEN_NÆRING]: egenNæring,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
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
}`,...(me=(Ae=A.parameters)==null?void 0:Ae.docs)==null?void 0:me.source}}};const Fn=["Default","MorMedAnnenForelderUgift","MorMedAleneOmsorg","FarMedAleneOmsorg","FarMedUførMorUgift","FarMedMorSomHarRettIEØS","FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS","FarMedMorSomHarRettINorge","MorMedAdoptertBarn","MorMedUtenlandsopphold","MorMedArbeidsforholdOgAndreInntekter","MorMedSelvstendigNæringsdrivende","MorMedSelvstendigNæringsdrivendeUtenDiverse","MorMedAndreInntekterJobbIUtlandet","MorMedAndreInntekterMilitærtjeneste","ErEndringssøknad"];export{y as Default,A as ErEndringssøknad,i as FarMedAleneOmsorg,E as FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS,k as FarMedMorSomHarRettIEØS,g as FarMedMorSomHarRettINorge,p as FarMedUførMorUgift,D as MorMedAdoptertBarn,l as MorMedAleneOmsorg,f as MorMedAndreInntekterJobbIUtlandet,O as MorMedAndreInntekterMilitærtjeneste,d as MorMedAnnenForelderUgift,T as MorMedArbeidsforholdOgAndreInntekter,N as MorMedSelvstendigNæringsdrivende,u as MorMedSelvstendigNæringsdrivendeUtenDiverse,S as MorMedUtenlandsopphold,Fn as __namedExportsOrder,_n as default};
