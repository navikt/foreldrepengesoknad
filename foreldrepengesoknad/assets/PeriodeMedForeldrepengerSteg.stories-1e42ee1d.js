import{j as N}from"./jsx-runtime-d079401a.js";import{d as e}from"./Tidsperioden-2f191506.js";import{A as ve}from"./AxiosMock-07682dd6.js";import{a as me}from"./chunk-WFFRPTHA-80d37c1b.js";import{B as n}from"./barnUtils-42471e8d.js";import{D as ye}from"./eksisterendeSakUtils-e1f0846a.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{P as ce}from"./PeriodeMedForeldrepengerSteg-e8b186f0.js";import{F as Le,C as O}from"./FpDataContext-6d6d78b0.js";import{F as fe}from"./useFpApiData-7196599a.js";import{E as _e}from"./apiInterceptor-716e24db.js";import"./index-b580f7e8.js";import"./Link-13f307fd.js";import"./index-c74c9f7f.js";import"./v4-4a60fe23.js";import"./index-54751434.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./dateUtils-0d76b092.js";import"./timezone-29fa0fe3.js";import"./Perioden-756f4214.js";import"./leggTilPeriode-bd13d552.js";import"./Periodene-93f75033.js";import"./uttaksPlanStatus-931b1d24.js";import"./stringUtils-e263f9a0.js";import"./velkommenUtils-76cff43a.js";import"./index-47edccfa.js";import"./Tag-01a82302.js";import"./validation-631bcf6e.js";import"./dateFormValidation-f3ff7428.js";import"./dates-584a13c3.js";import"./stepsConfig-f1dbaf58.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-7ba66c63.js";import"./useRequest-1bc7422a.js";import"./ErrorSummaryHookForm-9ac5db85.js";import"./isNativeReflectConstruct-81b4d0cb.js";import"./IntlProvider-5022d65e.js";import"./Alert-ea771e10.js";import"./provider-1018c8f1.js";import"./uttaksplanHarForMangeFlerbarnsuker-1b4dfbbf.js";import"./stønadskontoer-1088bac0.js";import"./isFarEllerMedmor-120238ea.js";const Pe="/innsyn/v2/annenPartVedtak",T=`${_e.REST_API_URL}/konto`,Ce=()=>(...A)=>(me("button-click")(...A),Promise.resolve()),t={kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:80,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},a={kontoer:{MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:90,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},Ue={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},Ln={title:"steps/PeriodeMedForeldrepengerSteg",component:ce},o=({mellomlagreSøknadOgNaviger:A=Ce(),avbrytSøknad:ge=me("button-click"),gåTilNesteSide:De,søkersituasjon:Ne,annenForelder:Oe,barnet:Ae,stønadskonto100:Re,stønadskonto80:Te,erAleneOmOmsorg:Me=!1,annenPartVedtak:be})=>{const ue=R=>{R.onPost(Pe).replyOnce(200,be),R.onGet(T).replyOnce(200,Te),R.onGet(T).replyOnce(200,Re)};return N.jsx(ve,{mock:ue,children:N.jsx(fe,{children:N.jsx(Le,{onDispatch:De,initialState:{[O.SØKERSITUASJON]:Ne,[O.OM_BARNET]:Ae,[O.SØKER]:{erAleneOmOmsorg:Me,språkkode:"nb",harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[O.ANNEN_FORELDER]:Oe},children:N.jsx(ce,{mellomlagreSøknadOgNaviger:A,avbrytSøknad:ge})})})})},r=o.bind({});r.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,fødselsdatoer:[e("2022-03-01").toDate()],antallBarn:1,termindato:e("2022-03-24").toDate()},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:t,stønadskonto80:a};const s=o.bind({});s.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.UFØDT,antallBarn:1,termindato:e("2022-03-24").toDate()},annenForelder:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0},stønadskonto100:t,stønadskonto80:a};const d=o.bind({});d.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,fødselsdatoer:[e("2022-03-01").toDate()],antallBarn:1,termindato:e("2022-03-24").toDate()},annenForelder:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,erInformertOmSøknaden:!1},stønadskonto100:{...t,kontoer:{FORELDREPENGER:200}},stønadskonto80:{...a,kontoer:{FORELDREPENGER:250}}};const i=o.bind({});i.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:e("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:{...t,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...a,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const l=o.bind({});l.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:e("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{...t,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...a,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const k=o.bind({});k.args={søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:e("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{...t,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...a,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const p=o.bind({});p.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:e("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},stønadskonto100:{...t,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...a,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const F=o.bind({});F.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{dokumentasjonAvAleneomsorg:[],fødselsdatoer:[e("2022-06-14").toDate()],termindato:e("2022-08-14").toDate(),antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:n.FØDT},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},stønadskonto100:{...t,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...a,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const S=o.bind({});S.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:{...t,kontoer:{FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...a,kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15}}};const x=o.bind({});x.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[e("2021-01-11").toDate()],termindato:e("2021-03-11").toDate()},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:t,stønadskonto80:a};const E=o.bind({});E.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[e("2021-01-11").toDate()],termindato:e("2021-03-11").toDate()},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:{...t,kontoer:{FORELDREPENGER:273,FORELDREPENGER_FØR_FØDSEL:15}},stønadskonto80:{...a,kontoer:{FORELDREPENGER:323,FORELDREPENGER_FØR_FØDSEL:15}}};const m=o.bind({});m.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:t,stønadskonto80:a};const c=o.bind({});c.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:2,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{...t,kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85}},stønadskonto80:{...a,kontoer:{MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105}}};const g=o.bind({});g.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:3,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},stønadskonto100:{...t,kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85}},stønadskonto80:{...a,kontoer:{MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105}}};const D=o.bind({});D.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:2,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},annenPartVedtak:{perioder:[Ue],dekningsgrad:ye.HUNDRE_PROSENT},stønadskonto100:t,stønadskonto80:a};var M,b,u;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(u=(b=r.parameters)==null?void 0:b.docs)==null?void 0:u.source}}};var v,y,L;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(L=(y=s.parameters)==null?void 0:y.docs)==null?void 0:L.source}}};var f,_,P;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(P=(_=d.parameters)==null?void 0:_.docs)==null?void 0:P.source}}};var C,U,j;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(j=(U=i.parameters)==null?void 0:U.docs)==null?void 0:j.source}}};var K,I,h;l.parameters={...l.parameters,docs:{...(K=l.parameters)==null?void 0:K.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(h=(I=l.parameters)==null?void 0:I.docs)==null?void 0:h.source}}};var G,J,V;k.parameters={...k.parameters,docs:{...(G=k.parameters)==null?void 0:G.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(V=(J=k.parameters)==null?void 0:J.docs)==null?void 0:V.source}}};var B,H,w;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(w=(H=p.parameters)==null?void 0:H.docs)==null?void 0:w.source}}};var $,q,z;F.parameters={...F.parameters,docs:{...($=F.parameters)==null?void 0:$.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(z=(q=F.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var Q,W,X;S.parameters={...S.parameters,docs:{...(Q=S.parameters)==null?void 0:Q.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(X=(W=S.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var Y,Z,ee;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(ee=(Z=x.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ne,te,ae;E.parameters={...E.parameters,docs:{...(ne=E.parameters)==null?void 0:ne.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(ae=(te=E.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var oe,re,se;m.parameters={...m.parameters,docs:{...(oe=m.parameters)==null?void 0:oe.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(se=(re=m.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var de,ie,le;c.parameters={...c.parameters,docs:{...(de=c.parameters)==null?void 0:de.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(le=(ie=c.parameters)==null?void 0:ie.docs)==null?void 0:le.source}}};var ke,pe,Fe;g.parameters={...g.parameters,docs:{...(ke=g.parameters)==null?void 0:ke.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(Fe=(pe=g.parameters)==null?void 0:pe.docs)==null?void 0:Fe.source}}};var Se,xe,Ee;D.parameters={...D.parameters,docs:{...(Se=D.parameters)==null?void 0:Se.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto100,
  stønadskonto80,
  erAleneOmOmsorg = false,
  annenPartVedtak
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barnet,
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg,
          språkkode: 'nb',
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: annenForelder
      }}>
                    <PeriodeMedForeldrepengerSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>;
}`,...(Ee=(xe=D.parameters)==null?void 0:xe.docs)==null?void 0:Ee.source}}};const fn=["FarEllerMedmorAleneomsorgFødsel","FarEllerMedmorFødselBeggeHarRett","FarEllerMedmorFødselOgMorHarIkkeRett","MorSøkerAdopsjonMedAleneomsorg","MorSøkerAdopsjonMedDeltUttak","FarSøkerAdopsjonMedDeltUttak","MorSøkerAdopsjonDerFarHarRettIEOS","MorSøkerFodselDerFarHarRettIEOS","MorAleneomsorgFødsel","MorFødselDeltUttakPrematurFødsel","MorAleneomsorgPrematurFødsel","MorFødselDeltUttak","MorFødselMedTvillingFlerbarnsuker","MorFødselAleneomsorgMedTrillingFlerbarnsuker","FarEllerMedmorSøkerOgMorHarLagetUttaksplan"];export{r as FarEllerMedmorAleneomsorgFødsel,s as FarEllerMedmorFødselBeggeHarRett,d as FarEllerMedmorFødselOgMorHarIkkeRett,D as FarEllerMedmorSøkerOgMorHarLagetUttaksplan,k as FarSøkerAdopsjonMedDeltUttak,S as MorAleneomsorgFødsel,E as MorAleneomsorgPrematurFødsel,g as MorFødselAleneomsorgMedTrillingFlerbarnsuker,m as MorFødselDeltUttak,x as MorFødselDeltUttakPrematurFødsel,c as MorFødselMedTvillingFlerbarnsuker,p as MorSøkerAdopsjonDerFarHarRettIEOS,i as MorSøkerAdopsjonMedAleneomsorg,l as MorSøkerAdopsjonMedDeltUttak,F as MorSøkerFodselDerFarHarRettIEOS,fn as __namedExportsOrder,Ln as default};
