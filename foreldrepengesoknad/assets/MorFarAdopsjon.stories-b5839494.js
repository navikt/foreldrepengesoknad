import{j as p}from"./jsx-runtime-1caa8f64.js";import{d as j}from"./Tidsperioden-17ce50bb.js";import{B as C}from"./barnUtils-83c58311.js";import{D as i}from"./Periodene-dea6e734.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{F as K,C as n}from"./FpDataContext-c0784ba8.js";import{S as b}from"./useFpNavigator-84241c56.js";import{R as B}from"./useRequest-ec5ef0e8.js";import{m as G}from"./mapSøkerinfoDTO-27dc6acb.js";import{_ as h,a as J}from"./søkerinfoMorSøker-48ed1da7.js";import{s as U,a as I}from"./stønadskonto80-8e203d8f.js";import{s as l,a as m}from"./stønadskontoDeltUttak100-ce558aaf.js";import{A as H}from"./AxiosMock-35a08809.js";import{U as P}from"./UttaksplanInfo-39168f65.js";import{i as q}from"./amplitude-0b5405b7.js";import{M as Y}from"./dateFormValidation-46b46a42.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./Perioden-56036cec.js";import"./uttaksPlanStatus-640e4161.js";import"./stringUtils-a9168712.js";import"./apiInterceptor-71cf49c7.js";import"./timezone-b3f5c703.js";import"./index-146fc9b8.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-e4065a96.js";import"./IntlProvider-5ccc1ca9.js";import"./dates-01028c04.js";import"./createIntl-bf1d8c16.js";import"./uttaksplanInfoUtils-cc16af4c.js";import"./uttaksplanHarForMangeFlerbarnsuker-7b6d3f11.js";import"./eksisterendeSakUtils-412a6125.js";import"./dateUtils-8c5fa214.js";import"./velkommenUtils-24f8c4c3.js";import"./index-47edccfa.js";import"./Tag-3d686a5d.js";import"./Uttaksplan-dfd0a3e2.js";import"./FormikFileUploader-64cc17d7.js";import"./AttachmentList-ba6bbc3b.js";import"./Attachment-2e83e825.js";import"./ExpansionCard-1aa9e169.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-37e4afdd.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./formUtils-86bf2e8b.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-eca8f236.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-b684306a.js";import"./amplitude.esm-2809efde.js";const V="/innsyn/v2/annenPartVedtak",g="/konto",v=h,S=J,Qe={title:"steps/uttaksplan-info/MorFarAdopsjon",component:P},d=e=>{q();const L=k=>{k.onPost(V).replyOnce(200,void 0,B.FINISHED),k.onGet(g).replyOnce(200,e.stønadskonto100),k.onGet(g).replyOnce(200,e.stønadskonto80)};return p.jsx(Y,{initialEntries:[b.UTTAKSPLAN_INFO],children:p.jsx(H,{mock:L,children:p.jsx(K,{initialState:{[n.SØKERSITUASJON]:{situasjon:"adopsjon",rolle:e.erMor?"mor":"far"},[n.OM_BARNET]:{type:C.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:j("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad},[n.SØKER]:e.søker,[n.ANNEN_FORELDER]:e.annenForelder},children:p.jsx(P,{søkerInfo:G(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=d.bind({});t.args={stønadskonto100:U,stønadskonto80:I,søkerinfo:S,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:i.HUNDRE_PROSENT};const o=d.bind({});o.args={stønadskonto100:U,stønadskonto80:I,søkerinfo:S,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:i.ÅTTI_PROSENT};const r=d.bind({});r.args={stønadskonto100:l,stønadskonto80:m,erMor:!0,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:S,dekningsgrad:i.HUNDRE_PROSENT};const a=d.bind({});a.args={stønadskonto100:l,stønadskonto80:m,erMor:!1,annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:v,dekningsgrad:i.HUNDRE_PROSENT};const s=d.bind({});s.args={stønadskonto100:l,stønadskonto80:m,erMor:!1,annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:v,dekningsgrad:i.ÅTTI_PROSENT};var N,D,x;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
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
}`,...(_=(y=s.parameters)==null?void 0:y.docs)==null?void 0:_.source}}};const We=["UttaksplanMedAleneomsorgDekningsgrad100","UttaksplanMedAleneomsorgDekningsgrad80","UttaksplanMedDeltUttakDerMorSøker","UttaksplanMedDeltUttakDerFarSøker100","UttaksplanMedDeltUttakDerFarSøker80"];export{t as UttaksplanMedAleneomsorgDekningsgrad100,o as UttaksplanMedAleneomsorgDekningsgrad80,a as UttaksplanMedDeltUttakDerFarSøker100,s as UttaksplanMedDeltUttakDerFarSøker80,r as UttaksplanMedDeltUttakDerMorSøker,We as __namedExportsOrder,Qe as default};
