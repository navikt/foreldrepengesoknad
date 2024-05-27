import{j as o}from"./jsx-runtime-DoxjgJx5.js";import{a as Ae}from"./chunk-MZXVCX43-DWuJqIWT.js";import{A as Ie}from"./AxiosMock-CeLgoW4g.js";import"./Tidsperioden-BevdMO7W.js";import"./index-C-6Uy6j4.js";import"./index-Cu9bd8lq.js";import{B as e,M as he}from"./index-nutMI9v0.js";import{D as Me}from"./eksisterendeSakUtils-CH7ngdFU.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{i as Ke}from"./calendarLabel.module-CX-ljgLZ.js";import{E as Ge}from"./Environment-O62Hvuhd.js";import{F as je}from"./uttaksplanInfoUtils-DSps9nyK.js";import{F as Je,C as O}from"./FpDataContext-DRW84C1R.js";import{S as Ve}from"./useFpNavigator-C0NBSMeQ.js";import{P as Te}from"./PeriodeMedForeldrepengerSteg-CrLrtEoo.js";import"./v4-D8aEg3BZ.js";import"./index-B_cCgG6K.js";import"./apiInterceptor-D_vgNGab.js";import"./axios-Cm0UX6qg.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-Ckls47V4.js";import"./dateFormValidation--pIUBKYa.js";import"./velkommenUtils-BpRWfCBV.js";import"./dateUtils-BALYmOwX.js";import"./annenForelderUtils-CB0fD7oy.js";import"./barnUtils-Ds8HYmut.js";import"./links-BFd19Kxc.js";import"./message-BSSS8E56.js";import"./amplitude.esm-CWYNo8IU.js";import"./useRequest-Bq8ZCFOD.js";import"./lodash-o8vTUAkc.js";import"./Accordion-BVV-9dzB.js";import"./ErrorSummaryHookForm-L0rfmwnq.js";const Be="/innsyn/v2/annenPartVedtak",T=`${Ge.REST_API_URL}/konto`,He=()=>(...A)=>(Ae("button-click")(...A),Promise.resolve()),n={kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:80,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},t={kontoer:{MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:90,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},ue={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},bn={title:"steps/PeriodeMedForeldrepengerSteg",component:Te},a=({mellomlagreSøknadOgNaviger:A=He(),avbrytSøknad:be=Ae("button-click"),gåTilNesteSide:ye,søkersituasjon:_e,annenForelder:Pe,barnet:fe,stønadskonto100:ve,stønadskonto80:Le,annenPartVedtak:Ce})=>{Ke();const Ue=M=>{M.onPost(Be).replyOnce(200,Ce),M.onGet(T).replyOnce(200,Le),M.onGet(T).replyOnce(200,ve)};return o.jsx(he,{initialEntries:[Ve.PERIODE_MED_FORELDREPENGER],children:o.jsx(Ie,{mock:Ue,children:o.jsx(je,{children:o.jsx(Je,{onDispatch:ye,initialState:{[O.SØKERSITUASJON]:_e,[O.OM_BARNET]:fe,[O.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[O.ANNEN_FORELDER]:Pe},children:o.jsx(Te,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:A,avbrytSøknad:be})})})})})},r=a.bind({});r.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,fødselsdatoer:["2022-03-01"],antallBarn:1,termindato:"2022-03-24"},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:n,stønadskonto80:t};const s=a.bind({});s.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.UFØDT,antallBarn:1,termindato:"2022-03-24"},annenForelder:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1},stønadskonto100:n,stønadskonto80:t};const i=a.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,fødselsdatoer:["2022-03-01"],antallBarn:1,termindato:"2022-03-24"},annenForelder:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,erInformertOmSøknaden:!1,erAleneOmOmsorg:!1},stønadskonto100:{...n,kontoer:{FORELDREPENGER:200}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:250}}};const d=a.bind({});d.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:e.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:{...n,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const l=a.bind({});l.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:e.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:{...n,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const k=a.bind({});k.args={søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:e.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:{...n,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const p=a.bind({});p.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:e.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:{...n,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const E=a.bind({});E.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{fødselsdatoer:["2022-06-14"],termindato:"2022-08-14",antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:e.FØDT},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:{...n,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const F=a.bind({});F.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:{...n,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const S=a.bind({});S.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:n,stønadskonto80:t};const x=a.bind({});x.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:{...n,kontoer:{FORELDREPENGER:273,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:323,FORELDREPENGER_FØR_FØDSEL:15}}};const c=a.bind({});c.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:n,stønadskonto80:t};const R=a.bind({});R.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:{...n,kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85}},stønadskonto80:{...t,kontoer:{MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105}}};const D=a.bind({});D.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:3},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:{...n,kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85}},stønadskonto80:{...t,kontoer:{MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105}}};const m=a.bind({});m.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},annenPartVedtak:{perioder:[ue],dekningsgrad:Me.HUNDRE_PROSENT},stønadskonto100:n,stønadskonto80:t};const N=a.bind({});N.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:n,stønadskonto80:t};const g=a.bind({});g.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},annenPartVedtak:{perioder:[ue],dekningsgrad:Me.ÅTTI_PROSENT},stønadskonto100:n,stønadskonto80:t};var u,b,y;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(y=(b=r.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var _,P,f;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(f=(P=s.parameters)==null?void 0:P.docs)==null?void 0:f.source}}};var v,L,C;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(C=(L=i.parameters)==null?void 0:L.docs)==null?void 0:C.source}}};var U,I,h;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(h=(I=d.parameters)==null?void 0:I.docs)==null?void 0:h.source}}};var K,G,j;l.parameters={...l.parameters,docs:{...(K=l.parameters)==null?void 0:K.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(j=(G=l.parameters)==null?void 0:G.docs)==null?void 0:j.source}}};var J,V,B;k.parameters={...k.parameters,docs:{...(J=k.parameters)==null?void 0:J.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(B=(V=k.parameters)==null?void 0:V.docs)==null?void 0:B.source}}};var H,$,q;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(q=($=p.parameters)==null?void 0:$.docs)==null?void 0:q.source}}};var w,z,Q;E.parameters={...E.parameters,docs:{...(w=E.parameters)==null?void 0:w.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Q=(z=E.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,Y;F.parameters={...F.parameters,docs:{...(W=F.parameters)==null?void 0:W.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Y=(X=F.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,ne;S.parameters={...S.parameters,docs:{...(Z=S.parameters)==null?void 0:Z.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(ne=(ee=S.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var te,ae,oe;x.parameters={...x.parameters,docs:{...(te=x.parameters)==null?void 0:te.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(oe=(ae=x.parameters)==null?void 0:ae.docs)==null?void 0:oe.source}}};var re,se,ie;c.parameters={...c.parameters,docs:{...(re=c.parameters)==null?void 0:re.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(ie=(se=c.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var de,le,ke;R.parameters={...R.parameters,docs:{...(de=R.parameters)==null?void 0:de.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(ke=(le=R.parameters)==null?void 0:le.docs)==null?void 0:ke.source}}};var pe,Ee,Fe;D.parameters={...D.parameters,docs:{...(pe=D.parameters)==null?void 0:pe.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Fe=(Ee=D.parameters)==null?void 0:Ee.docs)==null?void 0:Fe.source}}};var Se,xe,ce;m.parameters={...m.parameters,docs:{...(Se=m.parameters)==null?void 0:Se.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(ce=(xe=m.parameters)==null?void 0:xe.docs)==null?void 0:ce.source}}};var Re,De,me;N.parameters={...N.parameters,docs:{...(Re=N.parameters)==null?void 0:Re.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(me=(De=N.parameters)==null?void 0:De.docs)==null?void 0:me.source}}};var Ne,ge,Oe;g.parameters={...g.parameters,docs:{...(Ne=g.parameters)==null?void 0:Ne.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext onDispatch={gåTilNesteSide} initialState={{
          [ContextDataType.SØKERSITUASJON]: søkersituasjon,
          [ContextDataType.OM_BARNET]: barnet,
          [ContextDataType.SØKER_DATA]: {
            harJobbetSomFrilansSiste10Mnd: false,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
            harHattAnnenInntektSiste10Mnd: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Oe=(ge=g.parameters)==null?void 0:ge.docs)==null?void 0:Oe.source}}};const yn=["FarEllerMedmorAleneomsorgFødsel","FarEllerMedmorFødselBeggeHarRett","FarEllerMedmorFødselOgMorHarIkkeRett","MorSøkerAdopsjonMedAleneomsorg","MorSøkerAdopsjonMedDeltUttak","FarSøkerAdopsjonMedDeltUttak","MorSøkerAdopsjonDerFarHarRettIEOS","MorSøkerFodselDerFarHarRettIEOS","MorAleneomsorgFødsel","MorFødselDeltUttakPrematurFødsel","MorAleneomsorgPrematurFødsel","MorFødselDeltUttak","MorFødselMedTvillingFlerbarnsuker","MorFødselAleneomsorgMedTrillingFlerbarnsuker","FarEllerMedmorSøkerOgMorHarLagetUttaksplan","FarMedMorMedTermin1Juli2024","MorMedTermin1Juli2024OgFarsSøknad"];export{r as FarEllerMedmorAleneomsorgFødsel,s as FarEllerMedmorFødselBeggeHarRett,i as FarEllerMedmorFødselOgMorHarIkkeRett,m as FarEllerMedmorSøkerOgMorHarLagetUttaksplan,N as FarMedMorMedTermin1Juli2024,k as FarSøkerAdopsjonMedDeltUttak,F as MorAleneomsorgFødsel,x as MorAleneomsorgPrematurFødsel,D as MorFødselAleneomsorgMedTrillingFlerbarnsuker,c as MorFødselDeltUttak,S as MorFødselDeltUttakPrematurFødsel,R as MorFødselMedTvillingFlerbarnsuker,g as MorMedTermin1Juli2024OgFarsSøknad,p as MorSøkerAdopsjonDerFarHarRettIEOS,d as MorSøkerAdopsjonMedAleneomsorg,l as MorSøkerAdopsjonMedDeltUttak,E as MorSøkerFodselDerFarHarRettIEOS,yn as __namedExportsOrder,bn as default};
