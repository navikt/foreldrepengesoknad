import{j as o}from"./jsx-runtime-DoxjgJx5.js";import{a as xe}from"./chunk-MZXVCX43-DWuJqIWT.js";import{A as ue}from"./AxiosMock-CeLgoW4g.js";import"./Tidsperioden-BXZJ7Xx1.js";import"./index-C-6Uy6j4.js";import"./index-Cu9bd8lq.js";import{B as e,M as be}from"./index-BUeOcrf5.js";import{D as ye}from"./eksisterendeSakUtils-CUOWh65a.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{i as _e}from"./Step-DS4hjKcq.js";import{E as Pe}from"./Environment-O62Hvuhd.js";import{F as Le}from"./uttaksplanInfoUtils-WZ3xagBp.js";import{F as fe,C as N}from"./FpDataContext-CjNulmBK.js";import{S as ve}from"./useFpNavigator-BZN6AEKG.js";import{P as Re}from"./PeriodeMedForeldrepengerSteg-yw2ck9Pa.js";import"./v4-D8aEg3BZ.js";import"./index-B_cCgG6K.js";import"./apiInterceptor-D_vgNGab.js";import"./axios-Cm0UX6qg.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-Ckls47V4.js";import"./dateFormValidation-ueMUlaIN.js";import"./velkommenUtils-BHyyIiZQ.js";import"./barnUtils-CInKtSjf.js";import"./dateUtils-Cfda7oM8.js";import"./links-dJHPeQm3.js";import"./message-DTV81jgz.js";import"./amplitude.esm-CWYNo8IU.js";import"./useRequest-Bq8ZCFOD.js";import"./lodash-o8vTUAkc.js";import"./Accordion-BoDoOgHB.js";import"./ErrorSummaryHookForm-BNeZLR1K.js";import"./stønadskontoer-D2QURlOs.js";const Ce="/innsyn/v2/annenPartVedtak",A=`${Pe.REST_API_URL}/konto`,Ue=()=>(...g)=>(xe("button-click")(...g),Promise.resolve()),n={kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:80,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},t={kontoer:{MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:90,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},Ie={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},mn={title:"steps/PeriodeMedForeldrepengerSteg",component:Re},a=({mellomlagreSøknadOgNaviger:g=Ue(),avbrytSøknad:De=xe("button-click"),gåTilNesteSide:ce,søkersituasjon:me,annenForelder:Ne,barnet:ge,stønadskonto100:Oe,stønadskonto80:Ae,annenPartVedtak:Me})=>{_e();const Te=O=>{O.onPost(Ce).replyOnce(200,Me),O.onGet(A).replyOnce(200,Ae),O.onGet(A).replyOnce(200,Oe)};return o.jsx(be,{initialEntries:[ve.PERIODE_MED_FORELDREPENGER],children:o.jsx(ue,{mock:Te,children:o.jsx(Le,{children:o.jsx(fe,{onDispatch:ce,initialState:{[N.SØKERSITUASJON]:me,[N.OM_BARNET]:ge,[N.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[N.ANNEN_FORELDER]:Ne},children:o.jsx(Re,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:g,avbrytSøknad:De})})})})})},r=a.bind({});r.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,fødselsdatoer:["2022-03-01"],antallBarn:1,termindato:"2022-03-24"},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:n,stønadskonto80:t};const s=a.bind({});s.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.UFØDT,antallBarn:1,termindato:"2022-03-24"},annenForelder:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1},stønadskonto100:n,stønadskonto80:t};const i=a.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,fødselsdatoer:["2022-03-01"],antallBarn:1,termindato:"2022-03-24"},annenForelder:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,erInformertOmSøknaden:!1,erAleneOmOmsorg:!1},stønadskonto100:{...n,kontoer:{FORELDREPENGER:200}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:250}}};const d=a.bind({});d.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:e.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:{...n,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const l=a.bind({});l.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:e.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:{...n,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const k=a.bind({});k.args={søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:e.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:{...n,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const E=a.bind({});E.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:e.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:{...n,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const p=a.bind({});p.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{fødselsdatoer:["2022-06-14"],termindato:"2022-08-14",antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:e.FØDT},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:{...n,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const F=a.bind({});F.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:{...n,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const S=a.bind({});S.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:n,stønadskonto80:t};const x=a.bind({});x.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:{...n,kontoer:{FORELDREPENGER:273,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...t,kontoer:{FORELDREPENGER:323,FORELDREPENGER_FØR_FØDSEL:15}}};const R=a.bind({});R.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:n,stønadskonto80:t};const D=a.bind({});D.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto100:{...n,kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85}},stønadskonto80:{...t,kontoer:{MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105}}};const c=a.bind({});c.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:3},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:{...n,kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85}},stønadskonto80:{...t,kontoer:{MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105}}};const m=a.bind({});m.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},annenPartVedtak:{perioder:[Ie],dekningsgrad:ye.HUNDRE_PROSENT},stønadskonto100:n,stønadskonto80:t};var M,T,u;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`({
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
}`,...(u=(T=r.parameters)==null?void 0:T.docs)==null?void 0:u.source}}};var b,y,_;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`({
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
}`,...(_=(y=s.parameters)==null?void 0:y.docs)==null?void 0:_.source}}};var P,L,f;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`({
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
}`,...(f=(L=i.parameters)==null?void 0:L.docs)==null?void 0:f.source}}};var v,C,U;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`({
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
}`,...(U=(C=d.parameters)==null?void 0:C.docs)==null?void 0:U.source}}};var I,h,K;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`({
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
}`,...(K=(h=l.parameters)==null?void 0:h.docs)==null?void 0:K.source}}};var G,j,J;k.parameters={...k.parameters,docs:{...(G=k.parameters)==null?void 0:G.docs,source:{originalSource:`({
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
}`,...(J=(j=k.parameters)==null?void 0:j.docs)==null?void 0:J.source}}};var V,B,H;E.parameters={...E.parameters,docs:{...(V=E.parameters)==null?void 0:V.docs,source:{originalSource:`({
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
}`,...(H=(B=E.parameters)==null?void 0:B.docs)==null?void 0:H.source}}};var $,q,w;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`({
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
}`,...(w=(q=p.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};var z,Q,W;F.parameters={...F.parameters,docs:{...(z=F.parameters)==null?void 0:z.docs,source:{originalSource:`({
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
}`,...(W=(Q=F.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Y,Z;S.parameters={...S.parameters,docs:{...(X=S.parameters)==null?void 0:X.docs,source:{originalSource:`({
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
}`,...(Z=(Y=S.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,ne,te;x.parameters={...x.parameters,docs:{...(ee=x.parameters)==null?void 0:ee.docs,source:{originalSource:`({
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
}`,...(te=(ne=x.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var ae,oe,re;R.parameters={...R.parameters,docs:{...(ae=R.parameters)==null?void 0:ae.docs,source:{originalSource:`({
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
}`,...(re=(oe=R.parameters)==null?void 0:oe.docs)==null?void 0:re.source}}};var se,ie,de;D.parameters={...D.parameters,docs:{...(se=D.parameters)==null?void 0:se.docs,source:{originalSource:`({
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
}`,...(de=(ie=D.parameters)==null?void 0:ie.docs)==null?void 0:de.source}}};var le,ke,Ee;c.parameters={...c.parameters,docs:{...(le=c.parameters)==null?void 0:le.docs,source:{originalSource:`({
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
}`,...(Ee=(ke=c.parameters)==null?void 0:ke.docs)==null?void 0:Ee.source}}};var pe,Fe,Se;m.parameters={...m.parameters,docs:{...(pe=m.parameters)==null?void 0:pe.docs,source:{originalSource:`({
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
}`,...(Se=(Fe=m.parameters)==null?void 0:Fe.docs)==null?void 0:Se.source}}};const Nn=["FarEllerMedmorAleneomsorgFødsel","FarEllerMedmorFødselBeggeHarRett","FarEllerMedmorFødselOgMorHarIkkeRett","MorSøkerAdopsjonMedAleneomsorg","MorSøkerAdopsjonMedDeltUttak","FarSøkerAdopsjonMedDeltUttak","MorSøkerAdopsjonDerFarHarRettIEOS","MorSøkerFodselDerFarHarRettIEOS","MorAleneomsorgFødsel","MorFødselDeltUttakPrematurFødsel","MorAleneomsorgPrematurFødsel","MorFødselDeltUttak","MorFødselMedTvillingFlerbarnsuker","MorFødselAleneomsorgMedTrillingFlerbarnsuker","FarEllerMedmorSøkerOgMorHarLagetUttaksplan"];export{r as FarEllerMedmorAleneomsorgFødsel,s as FarEllerMedmorFødselBeggeHarRett,i as FarEllerMedmorFødselOgMorHarIkkeRett,m as FarEllerMedmorSøkerOgMorHarLagetUttaksplan,k as FarSøkerAdopsjonMedDeltUttak,F as MorAleneomsorgFødsel,x as MorAleneomsorgPrematurFødsel,c as MorFødselAleneomsorgMedTrillingFlerbarnsuker,R as MorFødselDeltUttak,S as MorFødselDeltUttakPrematurFødsel,D as MorFødselMedTvillingFlerbarnsuker,E as MorSøkerAdopsjonDerFarHarRettIEOS,d as MorSøkerAdopsjonMedAleneomsorg,l as MorSøkerAdopsjonMedDeltUttak,p as MorSøkerFodselDerFarHarRettIEOS,Nn as __namedExportsOrder,mn as default};
