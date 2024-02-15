import{j as k}from"./jsx-runtime-1caa8f64.js";import{d as j}from"./Tidsperioden-9e986206.js";import{B as K}from"./barnUtils-24a73acd.js";import{D as d}from"./Periodene-61c184c8.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{F as C,C as e}from"./FpDataContext-939a8168.js";import{S as b}from"./useFpNavigator-b6dca37b.js";import{R as G}from"./useRequest-603f2ddc.js";import{s as U,a as v}from"./stønadskonto80-8e203d8f.js";import{s as p,a as m}from"./stønadskontoDeltUttak80-23916c37.js";import{A as B}from"./AxiosMock-f85117c7.js";import{U as I}from"./UttaksplanInfo-9cd7435c.js";import{i as h}from"./IntlProvider-b5213292.js";import{M as J}from"./dateFormValidation-a28db7fc.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./dates-a34ba53a.js";import"./Perioden-226b58a8.js";import"./uttaksPlanStatus-28e7517d.js";import"./stringUtils-8514ece2.js";import"./apiInterceptor-d1094a41.js";import"./index-146fc9b8.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-17ea66ac.js";import"./uttaksplanInfoUtils-bf85826d.js";import"./uttaksplanHarForMangeFlerbarnsuker-817828f9.js";import"./eksisterendeSakUtils-723d3db9.js";import"./dateUtils-97af0947.js";import"./velkommenUtils-ed1d7052.js";import"./index-770d096e.js";import"./Uttaksplan-9a163d8e.js";import"./FormikFileUploader-d12b9cf3.js";import"./AttachmentList-9367778d.js";import"./Attachment-a70938ff.js";import"./ExpansionCard-8141c4b0.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-fdb5aba8.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-b3680da2.js";import"./amplitude.esm-2809efde.js";import"./createIntl-3e09be91.js";const H="/innsyn/v2/annenPartVedtak",D="/konto",L={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},g={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},bn={title:"steps/uttaksplan-info/MorFarAdopsjon",component:I},i=n=>{h();const P=l=>{l.onPost(H).replyOnce(200,void 0,G.FINISHED),l.onGet(D).replyOnce(200,n.stønadskonto100),l.onGet(D).replyOnce(200,n.stønadskonto80)};return k.jsx(J,{initialEntries:[b.UTTAKSPLAN_INFO],children:k.jsx(B,{mock:P,children:k.jsx(C,{initialState:{[e.SØKERSITUASJON]:{situasjon:"adopsjon",rolle:n.erMor?"mor":"far"},[e.OM_BARNET]:{type:K.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:j("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:n.dekningsgrad},[e.SØKER_DATA]:n.søkerData,[e.ANNEN_FORELDER]:n.annenForelder},children:k.jsx(I,{søker:n.søkerinfo.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=i.bind({});t.args={stønadskonto100:U,stønadskonto80:v,søkerinfo:g,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:d.HUNDRE_PROSENT};const a=i.bind({});a.args={stønadskonto100:U,stønadskonto80:v,søkerinfo:g,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:d.ÅTTI_PROSENT};const r=i.bind({});r.args={stønadskonto100:p,stønadskonto80:m,erMor:!0,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:d.HUNDRE_PROSENT};const o=i.bind({});o.args={stønadskonto100:p,stønadskonto80:m,erMor:!1,annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:L,dekningsgrad:d.HUNDRE_PROSENT};const s=i.bind({});s.args={stønadskonto100:p,stønadskonto80:m,erMor:!1,annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:L,dekningsgrad:d.ÅTTI_PROSENT};var A,N,S;t.parameters={...t.parameters,docs:{...(A=t.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
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
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(S=(N=t.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var T,E,x;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
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
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(x=(E=a.parameters)==null?void 0:E.docs)==null?void 0:x.source}}};var F,c,R;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
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
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(R=(c=r.parameters)==null?void 0:c.docs)==null?void 0:R.source}}};var M,f,O;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`args => {
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
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(O=(f=o.parameters)==null?void 0:f.docs)==null?void 0:O.source}}};var u,y,_;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(_=(y=s.parameters)==null?void 0:y.docs)==null?void 0:_.source}}};const Gn=["UttaksplanMedAleneomsorgDekningsgrad100","UttaksplanMedAleneomsorgDekningsgrad80","UttaksplanMedDeltUttakDerMorSøker","UttaksplanMedDeltUttakDerFarSøker100","UttaksplanMedDeltUttakDerFarSøker80"];export{t as UttaksplanMedAleneomsorgDekningsgrad100,a as UttaksplanMedAleneomsorgDekningsgrad80,o as UttaksplanMedDeltUttakDerFarSøker100,s as UttaksplanMedDeltUttakDerFarSøker80,r as UttaksplanMedDeltUttakDerMorSøker,Gn as __namedExportsOrder,bn as default};
