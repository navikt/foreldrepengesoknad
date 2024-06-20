import{j as o}from"./jsx-runtime-_e34SzbC.js";import{a as Ie}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as ze}from"./AxiosMock-C4Zycm12.js";import"./Tidsperioden-Dc48v2NC.js";import"./index--IHLcpuH.js";import{B as n,M as Qe}from"./index-BI6FGWNT.js";import{D as Ue}from"./eksisterendeSakUtils-C7KwgQ5o.js";import"./index-DVXBtNgz.js";import{a as e,S as We}from"./useFpNavigator-42lKl5QZ.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{i as Xe}from"./infobox.module-BoTlAVoT.js";import{F as Ye}from"./uttaksplanInfoUtils-B-JPMi5h.js";import{F as Ze,C as T}from"./FpDataContext-BcznBdmF.js";import{P as je}from"./PeriodeMedForeldrepengerSteg-DvuD9RxH.js";import"./v4-CQkTLCs1.js";import"./index-C4x6kqll.js";import"./apiInterceptor-ChqlQpSB.js";import"./index-Dcs0RV0A.js";import"./Link-SOWRV7cb.js";import"./index-Cbx7Fas8.js";import"./velkommenUtils-CBm3W8rY.js";import"./dateUtils-DmrEVRSb.js";import"./barnUtils-Cse01oDj.js";import"./iframe-BoWCV_e5.js";import"../sb-preview/runtime.js";import"./message-DeLtoR4y.js";import"./links-F23LOZ2f.js";import"./Accordion-XXN9VWkr.js";import"./extends-CF3RwP-h.js";import"./VStack-DueXo9sZ.js";import"./dateFormValidation-DGvKuQ3S.js";import"./amplitude.esm-BThBy0fb.js";import"./useRequest-DZS6KsAA.js";import"./ErrorSummaryHookForm-BYt55YmF.js";const $e="/rest/innsyn/v2/annenPartVedtak",en="/rest/konto",nn=()=>(...b)=>(Ie("button-click")(...b),Promise.resolve()),t={kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},r={kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},Le={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},Ln={title:"steps/PeriodeMedForeldrepengerSteg",component:je},a=({mellomlagreSøknadOgNaviger:b=nn(),avbrytSøknad:Ke=Ie("button-click"),gåTilNesteSide:Je,søkersituasjon:Be,annenForelder:He,barnet:Ve,stønadskonto:Ge,annenPartVedtak:qe})=>{Xe();const we=y=>{y.onPost($e).replyOnce(200,qe),y.onPost(en).replyOnce(200,Ge)};return o.jsx(Qe,{initialEntries:[We.PERIODE_MED_FORELDREPENGER],children:o.jsx(ze,{mock:we,children:o.jsx(Ye,{children:o.jsx(Ze,{onDispatch:Je,initialState:{[T.SØKERSITUASJON]:Be,[T.OM_BARNET]:Ve,[T.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[T.ANNEN_FORELDER]:He},children:o.jsx(je,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:b,avbrytSøknad:Ke})})})})})},s=a.bind({});s.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,fødselsdatoer:["2022-03-01"],antallBarn:1,termindato:"2022-03-24"},annenForelder:{kanIkkeOppgis:!0},stønadskonto:{100:t,80:r}};const i=a.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.UFØDT,antallBarn:1,termindato:"2022-03-24"},annenForelder:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1},stønadskonto:{100:t,80:r}};const d=a.bind({});d.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2024-06-30"],termindato:"2024-06-30"},annenForelder:{etternavn:"Pettersen",fornavn:"Hans",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1},stønadskonto:{100:t,80:r}};const l=a.bind({});l.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.UFØDT,antallBarn:1,termindato:"2024-06-30"},annenForelder:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1},stønadskonto:{100:t,80:r}};const k=a.bind({});k.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-07-01",fødselsdatoer:["2024-07-01"]},annenForelder:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1},stønadskonto:{100:t,80:r}};const p=a.bind({});p.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,fødselsdatoer:["2022-03-01"],antallBarn:1,termindato:"2022-03-24"},annenForelder:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,erInformertOmSøknaden:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:200}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:250}]}}};const F=a.bind({});F.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{kanIkkeOppgis:!0},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const g=a.bind({});g.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const x=a.bind({});x.args={søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const S=a.bind({});S.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const c=a.bind({});c.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{fødselsdatoer:["2022-06-14"],termindato:"2022-08-14",antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:n.FØDT},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const m=a.bind({});m.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{kanIkkeOppgis:!0},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const E=a.bind({});E.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:t,80:r}};const A=a.bind({});A.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{kanIkkeOppgis:!0},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:273},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:323},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const D=a.bind({});D.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:t,80:r}};const N=a.bind({});N.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...t,kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:165},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Foreldrepenger,dager:195},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const M=a.bind({});M.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:3},annenForelder:{kanIkkeOppgis:!0},stønadskonto:{100:{...t,kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:165},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:195},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const R=a.bind({});R.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},annenPartVedtak:{perioder:[Le],dekningsgrad:Ue.HUNDRE_PROSENT},stønadskonto:{100:t,80:r}};const O=a.bind({});O.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:t,80:r}};const u=a.bind({});u.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},annenPartVedtak:{perioder:[Le],dekningsgrad:Ue.ÅTTI_PROSENT},stønadskonto:{100:t,80:r}};var v,f,P;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(P=(f=s.parameters)==null?void 0:f.docs)==null?void 0:P.source}}};var _,C,h;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(h=(C=i.parameters)==null?void 0:C.docs)==null?void 0:h.source}}};var I,U,j;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(j=(U=d.parameters)==null?void 0:U.docs)==null?void 0:j.source}}};var L,K,J;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(J=(K=l.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};var B,H,V;k.parameters={...k.parameters,docs:{...(B=k.parameters)==null?void 0:B.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(V=(H=k.parameters)==null?void 0:H.docs)==null?void 0:V.source}}};var G,q,w;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(W=(Q=F.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Y,Z;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,ne;x.parameters={...x.parameters,docs:{...($=x.parameters)==null?void 0:$.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(ne=(ee=x.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var te,re,ae;S.parameters={...S.parameters,docs:{...(te=S.parameters)==null?void 0:te.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(ae=(re=S.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var oe,se,ie;c.parameters={...c.parameters,docs:{...(oe=c.parameters)==null?void 0:oe.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(ie=(se=c.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var de,le,ke;m.parameters={...m.parameters,docs:{...(de=m.parameters)==null?void 0:de.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(ke=(le=m.parameters)==null?void 0:le.docs)==null?void 0:ke.source}}};var pe,Fe,ge;E.parameters={...E.parameters,docs:{...(pe=E.parameters)==null?void 0:pe.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(ge=(Fe=E.parameters)==null?void 0:Fe.docs)==null?void 0:ge.source}}};var xe,Se,ce;A.parameters={...A.parameters,docs:{...(xe=A.parameters)==null?void 0:xe.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(ce=(Se=A.parameters)==null?void 0:Se.docs)==null?void 0:ce.source}}};var me,Ee,Ae;D.parameters={...D.parameters,docs:{...(me=D.parameters)==null?void 0:me.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(Ae=(Ee=D.parameters)==null?void 0:Ee.docs)==null?void 0:Ae.source}}};var De,Ne,Me;N.parameters={...N.parameters,docs:{...(De=N.parameters)==null?void 0:De.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(Me=(Ne=N.parameters)==null?void 0:Ne.docs)==null?void 0:Me.source}}};var Re,Oe,ue;M.parameters={...M.parameters,docs:{...(Re=M.parameters)==null?void 0:Re.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(ue=(Oe=M.parameters)==null?void 0:Oe.docs)==null?void 0:ue.source}}};var Te,be,ye;R.parameters={...R.parameters,docs:{...(Te=R.parameters)==null?void 0:Te.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(ye=(be=R.parameters)==null?void 0:be.docs)==null?void 0:ye.source}}};var ve,fe,Pe;O.parameters={...O.parameters,docs:{...(ve=O.parameters)==null?void 0:ve.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(Pe=(fe=O.parameters)==null?void 0:fe.docs)==null?void 0:Pe.source}}};var _e,Ce,he;u.parameters={...u.parameters,docs:{...(_e=u.parameters)==null?void 0:_e.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide,
  søkersituasjon,
  annenForelder,
  barnet,
  stønadskonto,
  annenPartVedtak
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
    apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
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
}`,...(he=(Ce=u.parameters)==null?void 0:Ce.docs)==null?void 0:he.source}}};const Kn=["FarEllerMedmorAleneomsorgFødsel","FarEllerMedmorFødselBeggeHarRett","MorFødselBeggeHarRettFødselFør1Juli2024","FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024","MorBeggeHarRettAdopsjonEtter1Juli2024","FarEllerMedmorFødselOgMorHarIkkeRett","MorSøkerAdopsjonMedAleneomsorg","MorSøkerAdopsjonMedDeltUttak","FarSøkerAdopsjonMedDeltUttak","MorSøkerAdopsjonDerFarHarRettIEOS","MorSøkerFodselDerFarHarRettIEOS","MorAleneomsorgFødsel","MorFødselDeltUttakPrematurFødsel","MorAleneomsorgPrematurFødsel","MorFødselDeltUttak","MorFødselMedTvillingFlerbarnsuker","MorFødselAleneomsorgMedTrillingFlerbarnsuker","FarEllerMedmorSøkerOgMorHarLagetUttaksplan","FarMedMorMedTermin1Juli2024","MorMedTermin1Juli2024OgFarsSøknad"];export{s as FarEllerMedmorAleneomsorgFødsel,i as FarEllerMedmorFødselBeggeHarRett,l as FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024,p as FarEllerMedmorFødselOgMorHarIkkeRett,R as FarEllerMedmorSøkerOgMorHarLagetUttaksplan,O as FarMedMorMedTermin1Juli2024,x as FarSøkerAdopsjonMedDeltUttak,m as MorAleneomsorgFødsel,A as MorAleneomsorgPrematurFødsel,k as MorBeggeHarRettAdopsjonEtter1Juli2024,M as MorFødselAleneomsorgMedTrillingFlerbarnsuker,d as MorFødselBeggeHarRettFødselFør1Juli2024,D as MorFødselDeltUttak,E as MorFødselDeltUttakPrematurFødsel,N as MorFødselMedTvillingFlerbarnsuker,u as MorMedTermin1Juli2024OgFarsSøknad,S as MorSøkerAdopsjonDerFarHarRettIEOS,F as MorSøkerAdopsjonMedAleneomsorg,g as MorSøkerAdopsjonMedDeltUttak,c as MorSøkerFodselDerFarHarRettIEOS,Kn as __namedExportsOrder,Ln as default};
