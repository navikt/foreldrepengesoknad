import{j as r}from"./jsx-runtime-1caa8f64.js";import{d as s}from"./Tidsperioden-431803a3.js";import{B as N}from"./barnUtils-1eb911f4.js";import{D as f}from"./Periodene-e7e8efe3.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{A as E}from"./AxiosMock-f85117c7.js";import{R as c}from"./useRequest-603f2ddc.js";import{s as S,a as F}from"./stønadskontoDeltUttak80-23916c37.js";import{F as O,C as n}from"./FpDataContext-939a8168.js";import{U as A}from"./UttaksplanInfo-84116d1f.js";import{S as T}from"./useFpNavigator-c18c735a.js";import{i as R}from"./IntlProvider-878fd20a.js";import{M as u}from"./dateFormValidation-ac039f93.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./dates-24d080e0.js";import"./Perioden-bb61ea85.js";import"./uttaksPlanStatus-d46e622d.js";import"./stringUtils-20940293.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-ef4a3bf4.js";import"./uttaksplanInfoUtils-e0a7c3d5.js";import"./uttaksplanHarForMangeFlerbarnsuker-b16d96e2.js";import"./eksisterendeSakUtils-54056f17.js";import"./dateUtils-b9a49e0e.js";import"./velkommenUtils-1823a489.js";import"./index-11b9ef60.js";import"./Uttaksplan-6bd179a9.js";import"./FormikFileUploader-8c7ea1e4.js";import"./AttachmentList-6e7a275e.js";import"./Attachment-242300d9.js";import"./ExpansionCard-a02df0b4.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-4394051d.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-777154dc.js";import"./amplitude.esm-2809efde.js";import"./createIntl-d5120824.js";const M="/innsyn/v2/annenPartVedtak",i="test/konto",y={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[]},arbeidsforhold:[]},cn={title:"steps/uttaksplan-info/FarMedmorFødselAleneomsorg",component:A},x=o=>{R();const D=a=>{a.onPost(M).replyOnce(200,void 0,c.FINISHED),a.onGet(i).replyOnce(200,o.stønadskonto80),a.onGet(i).replyOnce(200,o.stønadskonto100)};return r.jsx(u,{initialEntries:[T.UTTAKSPLAN_INFO],children:r.jsx(E,{mock:D,children:r.jsx(O,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:{type:N.FØDT,fødselsdatoer:[s("2022-03-01").toDate()],antallBarn:1,datoForAleneomsorg:s("2022-03-24").toDate(),dokumentasjonAvAleneomsorg:[]},[n.SØKER_DATA]:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:o.dekningsgrad},[n.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:r.jsx(A,{søker:y.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},e=x.bind({});e.args={stønadskonto100:S,stønadskonto80:F,dekningsgrad:f.HUNDRE_PROSENT};const t=x.bind({});t.args={stønadskonto100:S,stønadskonto80:F,dekningsgrad:f.ÅTTI_PROSENT};var d,m,l;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.FØDT,
          fødselsdatoer: [dayjs('2022-03-01').toDate()],
          antallBarn: 1,
          datoForAleneomsorg: dayjs('2022-03-24').toDate(),
          dokumentasjonAvAleneomsorg: []
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: true,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'dfg',
          fornavn: 'dfg',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søker={søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(l=(m=e.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var p,k,g;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.FØDT,
          fødselsdatoer: [dayjs('2022-03-01').toDate()],
          antallBarn: 1,
          datoForAleneomsorg: dayjs('2022-03-24').toDate(),
          dokumentasjonAvAleneomsorg: []
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: true,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'dfg',
          fornavn: 'dfg',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søker={søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(g=(k=t.parameters)==null?void 0:k.docs)==null?void 0:g.source}}};const On=["UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad100","UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad80"];export{e as UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad100,t as UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad80,On as __namedExportsOrder,cn as default};
