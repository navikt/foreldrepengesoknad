import{j as k}from"./jsx-runtime-1caa8f64.js";import{d as j}from"./Tidsperioden-2edd4148.js";import{B as C}from"./barnUtils-52ce16f5.js";import{D as i}from"./Periodene-26fdbd1a.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{F as K,C as n}from"./FpDataContext-c0784ba8.js";import{S as b}from"./useFpNavigator-69795839.js";import{R as B}from"./useRequest-ec5ef0e8.js";import{m as G}from"./mapSøkerinfoDTO-841a9926.js";import{_ as h,a as J}from"./søkerinfoMorSøker-48ed1da7.js";import{s as U,a as I}from"./stønadskonto80-8e203d8f.js";import{s as l,a as m}from"./stønadskontoDeltUttak100-ce558aaf.js";import{A as H}from"./AxiosMock-35a08809.js";import{U as P}from"./UttaksplanInfo-c7808d3a.js";import{i as q}from"./IntlProvider-a8c70ab6.js";import{M as Y}from"./dateFormValidation-a2e086c0.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./Perioden-d4423375.js";import"./uttaksPlanStatus-a016cddc.js";import"./stringUtils-892c6b46.js";import"./apiInterceptor-71cf49c7.js";import"./timezone-b3f5c703.js";import"./index-146fc9b8.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-b51188e1.js";import"./uttaksplanInfoUtils-6aff1898.js";import"./uttaksplanHarForMangeFlerbarnsuker-f72c5d5f.js";import"./eksisterendeSakUtils-3c30ae52.js";import"./dateUtils-aaf70588.js";import"./velkommenUtils-0811350f.js";import"./index-042e2270.js";import"./Uttaksplan-a48fb3ac.js";import"./FormikFileUploader-453f8676.js";import"./AttachmentList-18346586.js";import"./Attachment-dbc88813.js";import"./dates-dc70e840.js";import"./ExpansionCard-8a507139.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-1617bc0e.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-e71fa182.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-e0010f66.js";import"./amplitude.esm-2809efde.js";import"./createIntl-d056f555.js";const V="/innsyn/v2/annenPartVedtak",g="/konto",v=h,S=J,Ve={title:"steps/uttaksplan-info/MorFarAdopsjon",component:P},d=e=>{q();const L=p=>{p.onPost(V).replyOnce(200,void 0,B.FINISHED),p.onGet(g).replyOnce(200,e.stønadskonto100),p.onGet(g).replyOnce(200,e.stønadskonto80)};return k.jsx(Y,{initialEntries:[b.UTTAKSPLAN_INFO],children:k.jsx(H,{mock:L,children:k.jsx(K,{initialState:{[n.SØKERSITUASJON]:{situasjon:"adopsjon",rolle:e.erMor?"mor":"far"},[n.OM_BARNET]:{type:C.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:j("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad},[n.SØKER]:e.søker,[n.ANNEN_FORELDER]:e.annenForelder},children:k.jsx(P,{søkerInfo:G(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=d.bind({});t.args={stønadskonto100:U,stønadskonto80:I,søkerinfo:S,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:i.HUNDRE_PROSENT};const o=d.bind({});o.args={stønadskonto100:U,stønadskonto80:I,søkerinfo:S,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:i.ÅTTI_PROSENT};const r=d.bind({});r.args={stønadskonto100:l,stønadskonto80:m,erMor:!0,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:S,dekningsgrad:i.HUNDRE_PROSENT};const a=d.bind({});a.args={stønadskonto100:l,stønadskonto80:m,erMor:!1,annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:v,dekningsgrad:i.HUNDRE_PROSENT};const s=d.bind({});s.args={stønadskonto100:l,stønadskonto80:m,erMor:!1,annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:v,dekningsgrad:i.ÅTTI_PROSENT};var N,D,x;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: 1,
          adopsjonsdato: dayjs('2021-03-15').toDate(),
          adoptertIUtlandet: false,
          dokumentasjonAvAleneomsorg: [],
          fødselsdatoer: [],
          omsorgsovertakelse: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER]: args.søker,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(x=(D=t.parameters)==null?void 0:D.docs)==null?void 0:x.source}}};var T,A,E;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: 1,
          adopsjonsdato: dayjs('2021-03-15').toDate(),
          adoptertIUtlandet: false,
          dokumentasjonAvAleneomsorg: [],
          fødselsdatoer: [],
          omsorgsovertakelse: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER]: args.søker,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(E=(A=o.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var F,c,f;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: 1,
          adopsjonsdato: dayjs('2021-03-15').toDate(),
          adoptertIUtlandet: false,
          dokumentasjonAvAleneomsorg: [],
          fødselsdatoer: [],
          omsorgsovertakelse: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER]: args.søker,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(f=(c=r.parameters)==null?void 0:c.docs)==null?void 0:f.source}}};var R,O,M;a.parameters={...a.parameters,docs:{...(R=a.parameters)==null?void 0:R.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: 1,
          adopsjonsdato: dayjs('2021-03-15').toDate(),
          adoptertIUtlandet: false,
          dokumentasjonAvAleneomsorg: [],
          fødselsdatoer: [],
          omsorgsovertakelse: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER]: args.søker,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(M=(O=a.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var u,y,_;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: 1,
          adopsjonsdato: dayjs('2021-03-15').toDate(),
          adoptertIUtlandet: false,
          dokumentasjonAvAleneomsorg: [],
          fødselsdatoer: [],
          omsorgsovertakelse: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER]: args.søker,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(_=(y=s.parameters)==null?void 0:y.docs)==null?void 0:_.source}}};const we=["UttaksplanMedAleneomsorgDekningsgrad100","UttaksplanMedAleneomsorgDekningsgrad80","UttaksplanMedDeltUttakDerMorSøker","UttaksplanMedDeltUttakDerFarSøker100","UttaksplanMedDeltUttakDerFarSøker80"];export{t as UttaksplanMedAleneomsorgDekningsgrad100,o as UttaksplanMedAleneomsorgDekningsgrad80,a as UttaksplanMedDeltUttakDerFarSøker100,s as UttaksplanMedDeltUttakDerFarSøker80,r as UttaksplanMedDeltUttakDerMorSøker,we as __namedExportsOrder,Ve as default};
