import{j as o}from"./jsx-runtime-CexXSJP5.js";import{a as Le}from"./chunk-454WOBUV-CM0pFb8Z.js";import{A as ze}from"./AxiosMock-DWv_wXoA.js";import{S as e,B as n,i as Qe}from"./Uttaksplan-CIx8nvnt.js";import{D as he}from"./eksisterendeSakUtils-Bgt8U1Qa.js";import"./Uttaksdagen-3vFTugDi.js";import{F as We}from"./getStønadskontoParams-DQ_HYnub.js";import{M as Xe,F as Ye,C as b}from"./FpDataContext-CLfRphv-.js";import{S as Ze}from"./useFpNavigator-CX4xXzw_.js";import{P as Ue}from"./PeriodeMedForeldrepengerSteg-DRY-HZ3r.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DkNKrNHd.js";import"./apiInterceptor-BCtLUnPl.js";import"./Label-D9yH3wXA.js";import"./iframe-CZEZfifu.js";import"../sb-preview/runtime.js";import"./links-D6IYREgS.js";import"./VStack-BiLf-1IQ.js";import"./index-BVEwUaSm.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./barnUtils-D6v-3sw-.js";import"./guid-CsArkN6i.js";import"./ErrorSummaryHookForm-CVY6T7Su.js";import"./stønadskontoerUtils-BYeCz9P4.js";const $e="/rest/innsyn/v2/annenPartVedtak",en="/rest/konto",nn=()=>(...y)=>(Le("button-click")(...y),Promise.resolve()),t={kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},r={kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},je={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},xn={title:"steps/PeriodeMedForeldrepengerSteg",component:Ue},a=({mellomlagreSøknadOgNaviger:y=nn(),avbrytSøknad:Ke=Le("button-click"),gåTilNesteSide:Be,søkersituasjon:Je,annenForelder:He,barnet:Ve,stønadskonto:Ge,annenPartVedtak:qe})=>{Qe();const we=f=>{f.onPost($e).replyOnce(200,qe),f.onPost(en).replyOnce(200,Ge)};return o.jsx(Xe,{initialEntries:[Ze.PERIODE_MED_FORELDREPENGER],children:o.jsx(ze,{mock:we,children:o.jsx(We,{children:o.jsx(Ye,{onDispatch:Be,initialState:{[b.SØKERSITUASJON]:Je,[b.OM_BARNET]:Ve,[b.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[b.ANNEN_FORELDER]:He},children:o.jsx(Ue,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:y,avbrytSøknad:Ke})})})})})},s=a.bind({});s.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,fødselsdatoer:["2022-03-01"],antallBarn:1,termindato:"2022-03-24"},annenForelder:{kanIkkeOppgis:!0},stønadskonto:{100:t,80:r}};const i=a.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.UFØDT,antallBarn:1,termindato:"2022-03-24"},annenForelder:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1},stønadskonto:{100:t,80:r}};const d=a.bind({});d.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2024-06-30"],termindato:"2024-06-30"},annenForelder:{etternavn:"Pettersen",fornavn:"Hans",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1},stønadskonto:{100:t,80:r}};const l=a.bind({});l.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.UFØDT,antallBarn:1,termindato:"2024-06-30"},annenForelder:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1},stønadskonto:{100:t,80:r}};const k=a.bind({});k.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-07-01",fødselsdatoer:["2024-07-01"]},annenForelder:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1},stønadskonto:{100:t,80:r}};const p=a.bind({});p.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,fødselsdatoer:["2022-03-01"],antallBarn:1,termindato:"2022-03-24"},annenForelder:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,erInformertOmSøknaden:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:200}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:250}]}}};const g=a.bind({});g.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{kanIkkeOppgis:!0},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const c=a.bind({});c.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const m=a.bind({});m.args={søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const S=a.bind({});S.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const N=a.bind({});N.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{fødselsdatoer:["2022-06-14"],termindato:"2022-08-14",antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:n.FØDT},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const F=a.bind({});F.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{kanIkkeOppgis:!0},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}};const O=a.bind({});O.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...t,tillegg:{prematur:43,flerbarn:0}},80:{...r,tillegg:{prematur:43,flerbarn:0}}}};const A=a.bind({});A.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{kanIkkeOppgis:!0},stønadskonto:{100:{...t,kontoer:[{konto:e.Foreldrepenger,dager:273},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:43,flerbarn:0}},80:{...r,kontoer:[{konto:e.Foreldrepenger,dager:323},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:43,flerbarn:0}}}};const E=a.bind({});E.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:t,80:r}};const D=a.bind({});D.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...t,kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:165},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:85}},80:{...r,kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Foreldrepenger,dager:195},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:105}}}};const R=a.bind({});R.args={erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:3},annenForelder:{kanIkkeOppgis:!0},stønadskonto:{100:{...t,kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:165},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:230}},80:{...r,kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:195},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:280}}}};const T=a.bind({});T.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},annenPartVedtak:{perioder:[je],dekningsgrad:he.HUNDRE_PROSENT},stønadskonto:{100:t,80:r}};const u=a.bind({});u.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:t,80:r}};const M=a.bind({});M.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},annenPartVedtak:{perioder:[je],dekningsgrad:he.ÅTTI_PROSENT},stønadskonto:{100:t,80:r}};var v,x,_;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(_=(x=s.parameters)==null?void 0:x.docs)==null?void 0:_.source}}};var P,C,I;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(I=(C=i.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var L,h,U;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(U=(h=d.parameters)==null?void 0:h.docs)==null?void 0:U.source}}};var j,K,B;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(B=(K=l.parameters)==null?void 0:K.docs)==null?void 0:B.source}}};var J,H,V;k.parameters={...k.parameters,docs:{...(J=k.parameters)==null?void 0:J.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(w=(q=p.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};var z,Q,W;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(W=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Y,Z;c.parameters={...c.parameters,docs:{...(X=c.parameters)==null?void 0:X.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Z=(Y=c.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,ne;m.parameters={...m.parameters,docs:{...($=m.parameters)==null?void 0:$.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(ne=(ee=m.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var te,re,ae;S.parameters={...S.parameters,docs:{...(te=S.parameters)==null?void 0:te.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(ae=(re=S.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var oe,se,ie;N.parameters={...N.parameters,docs:{...(oe=N.parameters)==null?void 0:oe.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(ie=(se=N.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var de,le,ke;F.parameters={...F.parameters,docs:{...(de=F.parameters)==null?void 0:de.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(ke=(le=F.parameters)==null?void 0:le.docs)==null?void 0:ke.source}}};var pe,ge,ce;O.parameters={...O.parameters,docs:{...(pe=O.parameters)==null?void 0:pe.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(ce=(ge=O.parameters)==null?void 0:ge.docs)==null?void 0:ce.source}}};var me,Se,Ne;A.parameters={...A.parameters,docs:{...(me=A.parameters)==null?void 0:me.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Ne=(Se=A.parameters)==null?void 0:Se.docs)==null?void 0:Ne.source}}};var Fe,Oe,Ae;E.parameters={...E.parameters,docs:{...(Fe=E.parameters)==null?void 0:Fe.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Ae=(Oe=E.parameters)==null?void 0:Oe.docs)==null?void 0:Ae.source}}};var Ee,De,Re;D.parameters={...D.parameters,docs:{...(Ee=D.parameters)==null?void 0:Ee.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Re=(De=D.parameters)==null?void 0:De.docs)==null?void 0:Re.source}}};var Te,ue,Me;R.parameters={...R.parameters,docs:{...(Te=R.parameters)==null?void 0:Te.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Me=(ue=R.parameters)==null?void 0:ue.docs)==null?void 0:Me.source}}};var be,ye,fe;T.parameters={...T.parameters,docs:{...(be=T.parameters)==null?void 0:be.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(fe=(ye=T.parameters)==null?void 0:ye.docs)==null?void 0:fe.source}}};var ve,xe,_e;u.parameters={...u.parameters,docs:{...(ve=u.parameters)==null?void 0:ve.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(_e=(xe=u.parameters)==null?void 0:xe.docs)==null?void 0:_e.source}}};var Pe,Ce,Ie;M.parameters={...M.parameters,docs:{...(Pe=M.parameters)==null?void 0:Pe.docs,source:{originalSource:`({
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
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattAndreInntektskilder: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false
          },
          [ContextDataType.ANNEN_FORELDER]: annenForelder
        }}>
                        <PeriodeMedForeldrepengerSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Ie=(Ce=M.parameters)==null?void 0:Ce.docs)==null?void 0:Ie.source}}};const _n=["FarEllerMedmorAleneomsorgFødsel","FarEllerMedmorFødselBeggeHarRett","MorFødselBeggeHarRettFødselFør1Juli2024","FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024","MorBeggeHarRettAdopsjonEtter1Juli2024","FarEllerMedmorFødselOgMorHarIkkeRett","MorSøkerAdopsjonMedAleneomsorg","MorSøkerAdopsjonMedDeltUttak","FarSøkerAdopsjonMedDeltUttak","MorSøkerAdopsjonDerFarHarRettIEOS","MorSøkerFodselDerFarHarRettIEOS","MorAleneomsorgFødsel","MorFødselDeltUttakPrematurFødsel","MorAleneomsorgPrematurFødsel","MorFødselDeltUttak","MorFødselMedTvillingFlerbarnsuker","MorFødselAleneomsorgMedTrillingFlerbarnsuker","FarEllerMedmorSøkerOgMorHarLagetUttaksplan","FarMedMorMedTermin1Juli2024","MorMedTermin1Juli2024OgFarsSøknad"];export{s as FarEllerMedmorAleneomsorgFødsel,i as FarEllerMedmorFødselBeggeHarRett,l as FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024,p as FarEllerMedmorFødselOgMorHarIkkeRett,T as FarEllerMedmorSøkerOgMorHarLagetUttaksplan,u as FarMedMorMedTermin1Juli2024,m as FarSøkerAdopsjonMedDeltUttak,F as MorAleneomsorgFødsel,A as MorAleneomsorgPrematurFødsel,k as MorBeggeHarRettAdopsjonEtter1Juli2024,R as MorFødselAleneomsorgMedTrillingFlerbarnsuker,d as MorFødselBeggeHarRettFødselFør1Juli2024,E as MorFødselDeltUttak,O as MorFødselDeltUttakPrematurFødsel,D as MorFødselMedTvillingFlerbarnsuker,M as MorMedTermin1Juli2024OgFarsSøknad,S as MorSøkerAdopsjonDerFarHarRettIEOS,g as MorSøkerAdopsjonMedAleneomsorg,c as MorSøkerAdopsjonMedDeltUttak,N as MorSøkerFodselDerFarHarRettIEOS,_n as __namedExportsOrder,xn as default};
