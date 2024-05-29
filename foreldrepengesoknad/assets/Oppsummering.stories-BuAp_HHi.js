import{j as m}from"./jsx-runtime-_e34SzbC.js";import{a as Fe}from"./chunk-MZXVCX43-DWuJqIWT.js";import{d as N,I as f,e as a}from"./Tidsperioden-DXYe3XPH.js";import{A as ve}from"./AxiosMock-CGbRsrix.js";import"./index--IHLcpuH.js";import"./index-DVXBtNgz.js";import{B as ge,M as _e,D as be}from"./index-fVqCcxAQ.js";import{S as e}from"./skjemanummer-CSxM5qit.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{i as Ge}from"./calendarLabel.module-wVQnbKSP.js";import{F as Ke,C as t}from"./FpDataContext-BcznBdmF.js";import{N as ue,A as Te}from"./Næring-Cv23naTT.js";import{S as He}from"./useFpNavigator-7x8FqVW-.js";import{O as me}from"./Oppsummering-DHYOjUHJ.js";import"./v4-D8aEg3BZ.js";import"./index-Dcs0RV0A.js";import"./Link-DySpfMj5.js";import"./index-Cbx7Fas8.js";import"./index-BjQL7UeC.js";import"./apiInterceptor-D_vgNGab.js";import"./axios-Cm0UX6qg.js";import"./Environment-O62Hvuhd.js";import"./dateFormValidation-B82aSwYS.js";import"./links-BFd19Kxc.js";import"./message-EI4tbH6H.js";import"./amplitude.esm-Ko43VyFv.js";import"./Accordion-BO-wEqF4.js";import"./SøkerOppsummeringspunkt-Cf0JuV6W.js";import"./attachmentApi-BZLtCyR0.js";import"./barnUtils-B4myndx0.js";import"./util-o2CQSIAN.js";import"./dateUtils-BhxnNuIk.js";import"./annenForelderUtils-alN3WCz9.js";import"./File-D9oRXi4X.js";import"./globalUtil-SC9aHR2x.js";const je=()=>(...O)=>(Fe("button-click")(...O),Promise.resolve()),r={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},Be={type:ge.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,datoForAleneomsorg:"2021-03-15",dokumentasjonAvAleneomsorg:[]},Je={situasjon:"fødsel",rolle:"mor"},o={kanIkkeOppgis:!0},Ve={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!0},we={},Ze=[{id:"0",type:"uttak",forelder:"mor",konto:"FORELDREPENGER_FØR_FØDSEL",tidsperiode:{fom:new Date("2021-11-23T23:00:00.000Z"),tom:new Date("2021-12-13T23:00:00.000Z")}},{id:"1",type:"utsettelse",årsak:"INSTITUSJONSOPPHOLD_SØKER",tidsperiode:{fom:new Date("2021-12-14T23:00:00.000Z"),tom:new Date("2022-01-24T23:00:00.000Z")}},{id:"2",type:"periodeUtenUttak",tidsperiode:{fom:new Date("2022-01-25T23:00:00.000Z"),tom:new Date("2022-03-28T23:00:00.000Z")}},{id:"3",type:"uttak",forelder:"mor",konto:"FELLESPERIODE",tidsperiode:{fom:new Date("2022-03-29T23:00:00.000Z"),tom:new Date("2022-06-06T23:00:00.000Z")},ønskerSamtidigUttak:!1,gradert:!1}],Ye={[e.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],[e.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],[e.DOK_INNLEGGELSE_BARN]:[],[e.DOK_INNLEGGELSE_MOR]:[],[e.DOK_INNLEGGELSE_FAR]:[],[e.DOK_SYKDOM_MOR]:[],[e.DOK_SYKDOM_FAR]:[],[e.DOK_ARBEID_MOR]:[],[e.DOK_UTDANNING_MOR]:[],[e.DOK_UTDANNING_OG_ARBEID_MOR]:[],[e.OMSORGSOVERTAKELSE]:[],[e.DOK_AV_ALENEOMSORG]:[],[e.TERMINBEKREFTELSE]:[],[e.DOK_MILITÆR_SILVIL_TJENESTE]:[],[e.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[]},Ln={title:"steps/Oppsummering",component:me},n=({søkerinfo:O=r,søkersituasjon:Ne=Je,søkerData:fe=we,annenForelder:Ae=o,barn:Oe=Be,utenlandsopphold:ce=Ve,utenlandsoppholdSenere:Re,utenlandsoppholdTidligere:Me,erEndringssøknad:ye=!1,mellomlagreSøknadOgNaviger:Pe=je(),gåTilNesteSide:Ue,avbrytSøknad:Le=Fe("button-click"),sendSøknad:he=()=>Promise.resolve()})=>{Ge();const Ie=Ce=>{Ce.onPost("/storage/foreldrepenger").reply(200,void 0)};return m.jsx(_e,{initialEntries:[He.OPPSUMMERING],children:m.jsx(ve,{mock:Ie,children:m.jsx(Ke,{onDispatch:Ue,initialState:{[t.SØKER_DATA]:fe,[t.ANNEN_FORELDER]:Ae,[t.SØKERSITUASJON]:Ne,[t.UTTAKSPLAN_METADATA]:{ønskerJustertUttakVedFødsel:!1,harUttaksplanBlittSlettet:!1,antallUkerIUttaksplan:1},[t.OM_BARNET]:Oe,[t.UTENLANDSOPPHOLD]:ce,[t.UTENLANDSOPPHOLD_SENERE]:Re,[t.UTENLANDSOPPHOLD_TIDLIGERE]:Me,[t.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:be.HUNDRE_PROSENT},[t.UTTAKSPLAN]:Ze,[t.VEDLEGG]:Ye},children:m.jsx(me,{erEndringssøknad:ye,sendSøknad:he,søkerInfo:O,avbrytSøknad:Le,mellomlagreSøknadOgNaviger:Pe})})})})},A=n.bind({}),s=n.bind({});s.args={søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}};const d=n.bind({});d.args={søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Ingen",etternavn:"Omsorg",fnr:"1212121313",kanIkkeOppgis:!1}};const l=n.bind({});l.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Eline",etternavn:"Utvikler",fnr:"1515151616",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1,erMorUfør:!0}};const i=n.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}};const p=n.bind({});p.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Anne",etternavn:"Forelder",fnr:"1515151616",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1}};const k=n.bind({});k.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Frida",etternavn:"Norsk",fnr:"01010012345",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}};const x=n.bind({});x.args={søkersituasjon:{rolle:"mor",situasjon:"adopsjon"},barn:{type:ge.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2021-10-01",fødselsdatoer:["2021-01-01"],adoptertIUtlandet:!1,omsorgsovertakelse:[]}};const S=n.bind({});S.args={utenlandsopphold:{iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},utenlandsoppholdSenere:{senereOpphold:[{land:"SE",tidsperiode:{fom:N().format(f),tom:N().add(100,"days").format(f)}}]},utenlandsoppholdTidligere:{tidligereOpphold:[{land:"SE",tidsperiode:{fom:N().subtract(10,"months").format(f),tom:N().subtract(1,"days").format(f)}}]}};const E=n.bind({});E.args={søkerData:{harJobbetSomFrilansSiste10Mnd:!0,frilansInformasjon:{jobberFremdelesSomFrilans:!0,oppstart:a("2019-01-01")},harHattAnnenInntektSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{...o,erAleneOmOmsorg:!1},søkerinfo:{søker:r.søker,arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};const D=n.bind({});D.args={søkerData:{harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:a("2018-01-01"),tom:a("2021-01-01")},næringstyper:[ue.FISKER],organisasjonsnummer:"123",næringsinntekt:1e6,registrertINorge:!0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!0,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0,endringAvNæringsinntektInformasjon:{dato:a("2019-01-01"),næringsinntektEtterEndring:1e6,forklaring:"Jobbar beinhardt!"}}],harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1},annenForelder:{...o,erAleneOmOmsorg:!1},søkerinfo:r};const F=n.bind({});F.args={søkerData:{harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!0,selvstendigNæringsdrivendeInformasjon:[{navnPåNæringen:"Fiske",pågående:!1,tidsperiode:{fom:a("2018-01-01"),tom:a("2021-01-01")},næringstyper:[ue.FISKER],registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!1}],harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1},annenForelder:{...o,erAleneOmOmsorg:!1},søkerinfo:r};const g=n.bind({});g.args={søkerData:{harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:Te.JOBB_I_UTLANDET,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"},arbeidsgiverNavn:"Statoil",land:"SE"}],harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{...o,erAleneOmOmsorg:!1},søkerinfo:r};const u=n.bind({});u.args={søkerData:{harHattAnnenInntektSiste10Mnd:!0,andreInntekterSiste10Mnd:[{type:Te.MILITÆRTJENESTE,pågående:!1,tidsperiode:{fom:"2018-01-01",tom:"2021-01-01"}}],harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{...o,erAleneOmOmsorg:!1},søkerinfo:r};const T=n.bind({});T.args={erEndringssøknad:!0,søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}};var c,R,M;A.parameters={...A.parameters,docs:{...(c=A.parameters)==null?void 0:c.docs,source:{originalSource:`({
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
}`,...(M=(R=A.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var y,P,U;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`({
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
}`,...(U=(P=s.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};var L,h,I;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`({
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
}`,...(I=(h=d.parameters)==null?void 0:h.docs)==null?void 0:I.source}}};var C,v,_;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`({
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
}`,...(_=(v=l.parameters)==null?void 0:v.docs)==null?void 0:_.source}}};var b,G,K;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`({
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
}`,...(K=(G=i.parameters)==null?void 0:G.docs)==null?void 0:K.source}}};var H,j,B;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`({
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
}`,...(B=(j=p.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var J,V,w;k.parameters={...k.parameters,docs:{...(J=k.parameters)==null?void 0:J.docs,source:{originalSource:`({
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
}`,...(w=(V=k.parameters)==null?void 0:V.docs)==null?void 0:w.source}}};var Z,Y,q;x.parameters={...x.parameters,docs:{...(Z=x.parameters)==null?void 0:Z.docs,source:{originalSource:`({
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
}`,...(q=(Y=x.parameters)==null?void 0:Y.docs)==null?void 0:q.source}}};var z,Q,W;S.parameters={...S.parameters,docs:{...(z=S.parameters)==null?void 0:z.docs,source:{originalSource:`({
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
}`,...(W=(Q=S.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,$,ee;E.parameters={...E.parameters,docs:{...(X=E.parameters)==null?void 0:X.docs,source:{originalSource:`({
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
}`,...(ee=($=E.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var ne,te,ae;D.parameters={...D.parameters,docs:{...(ne=D.parameters)==null?void 0:ne.docs,source:{originalSource:`({
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
}`,...(ae=(te=D.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var re,oe,se;F.parameters={...F.parameters,docs:{...(re=F.parameters)==null?void 0:re.docs,source:{originalSource:`({
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
}`,...(se=(oe=F.parameters)==null?void 0:oe.docs)==null?void 0:se.source}}};var de,le,ie;g.parameters={...g.parameters,docs:{...(de=g.parameters)==null?void 0:de.docs,source:{originalSource:`({
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
}`,...(ie=(le=g.parameters)==null?void 0:le.docs)==null?void 0:ie.source}}};var pe,ke,xe;u.parameters={...u.parameters,docs:{...(pe=u.parameters)==null?void 0:pe.docs,source:{originalSource:`({
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
}`,...(xe=(ke=u.parameters)==null?void 0:ke.docs)==null?void 0:xe.source}}};var Se,Ee,De;T.parameters={...T.parameters,docs:{...(Se=T.parameters)==null?void 0:Se.docs,source:{originalSource:`({
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
}`,...(De=(Ee=T.parameters)==null?void 0:Ee.docs)==null?void 0:De.source}}};const hn=["Default","MedAnnenForelder","MedAleneOmsorg","FarMedUførMor","FarMedMorSomHarRettIEØS","FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS","FarMedMorSomHarRettINorge","MedAdoptertBarn","MedUtenlandsopphold","MedArbeidsforholdOgAndreInntekter","MedSelvstendigNæringsdrivende","MedSelvstendigNæringsdrivendeUtenDiverse","MedAndreInntekterJobbIUtlandet","MedAndreInntekterMilitærtjeneste","ErEndringssøknad"];export{A as Default,T as ErEndringssøknad,p as FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS,i as FarMedMorSomHarRettIEØS,k as FarMedMorSomHarRettINorge,l as FarMedUførMor,x as MedAdoptertBarn,d as MedAleneOmsorg,g as MedAndreInntekterJobbIUtlandet,u as MedAndreInntekterMilitærtjeneste,s as MedAnnenForelder,E as MedArbeidsforholdOgAndreInntekter,D as MedSelvstendigNæringsdrivende,F as MedSelvstendigNæringsdrivendeUtenDiverse,S as MedUtenlandsopphold,hn as __namedExportsOrder,Ln as default};
