import{j as k}from"./jsx-runtime-1caa8f64.js";import{d as n}from"./Tidsperioden-2d1db4bf.js";import{B as C}from"./barnUtils-52a07cb3.js";import{D as l}from"./Periodene-030a8cd0.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{A as b}from"./AxiosMock-f85117c7.js";import{R as K}from"./useRequest-603f2ddc.js";import{F as B,C as r}from"./FpDataContext-939a8168.js";import{U as L}from"./UttaksplanInfo-e6a56d47.js";import{S as h}from"./useFpNavigator-80e27ea2.js";import{i as H}from"./IntlProvider-c1bc26a9.js";import{M as j}from"./dateFormValidation-309722c8.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./dates-1f1d6788.js";import"./Perioden-8000a589.js";import"./uttaksPlanStatus-70244d59.js";import"./stringUtils-3cea292f.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-81869e8b.js";import"./uttaksplanInfoUtils-b8e169fd.js";import"./uttaksplanHarForMangeFlerbarnsuker-cf9a12b1.js";import"./eksisterendeSakUtils-6653cd82.js";import"./dateUtils-a998e40b.js";import"./velkommenUtils-135c8c82.js";import"./index-0ccac225.js";import"./Uttaksplan-b501956d.js";import"./FormikFileUploader-f447ccef.js";import"./AttachmentList-b7ed599c.js";import"./Attachment-5db4a859.js";import"./ExpansionCard-91e81e8b.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-ab64493e.js";import"./Ingress-10c1b249.js";import"./amplitude.esm-2809efde.js";import"./createIntl-9cf0195b.js";const G={FORELDREPENGER:280},J={generellMinsterett:0,farRundtFødsel:10,toTette:0},g={kontoer:G,minsteretter:J},q={FORELDREPENGER:230},$={generellMinsterett:0,farRundtFødsel:10,toTette:0},F={kontoer:q,minsteretter:$},V={FORELDREPENGER:460,FORELDREPENGER_FØR_FØDSEL:15},Y={generellMinsterett:0,farRundtFødsel:10,toTette:0},x={kontoer:V,minsteretter:Y},w={FORELDREPENGER:272},z={generellMinsterett:0,farRundtFødsel:10,toTette:0},S={kontoer:w,minsteretter:z},Q="/innsyn/v2/annenPartVedtak",E="test/konto",t={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[]},arbeidsforhold:[]},Gn={title:"steps/uttaksplan-info/FarMedmorFødselAleneomsorg",component:L},m=e=>{H();const U=p=>{p.onPost(Q).replyOnce(200,void 0,K.FINISHED),p.onGet(E).replyOnce(200,e.stønadskonto80),p.onGet(E).replyOnce(200,e.stønadskonto100)};return k.jsx(j,{initialEntries:[h.UTTAKSPLAN_INFO],children:k.jsx(b,{mock:U,children:k.jsx(B,{initialState:{[r.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[r.OM_BARNET]:{type:C.FØDT,fødselsdatoer:e.fødselsdatoer,termindato:e.termindato,antallBarn:e.antallBarn,datoForAleneomsorg:n("2022-03-24").toDate(),dokumentasjonAvAleneomsorg:[]},[r.SØKER_DATA]:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[r.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad},[r.ANNEN_FORELDER]:{etternavn:"Hanne",fornavn:"Hanson",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:k.jsx(L,{søker:t.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},a=m.bind({});a.args={stønadskonto100:F,stønadskonto80:g,søkerinfo:t,dekningsgrad:l.HUNDRE_PROSENT,antallBarn:1,fødselsdatoer:[n("2022-03-01").toDate()]};const o=m.bind({});o.args={stønadskonto100:F,stønadskonto80:g,søkerinfo:t,dekningsgrad:l.ÅTTI_PROSENT,antallBarn:1,fødselsdatoer:[n("2022-03-01").toDate()]};const s=m.bind({});s.args={stønadskonto100:F,stønadskonto80:g,søkerinfo:t,dekningsgrad:l.ÅTTI_PROSENT,antallBarn:1,fødselsdatoer:[n("2021-09-30").toDate()]};const d=m.bind({});d.args={stønadskonto100:x,stønadskonto80:x,søkerinfo:t,dekningsgrad:l.HUNDRE_PROSENT,antallBarn:3,fødselsdatoer:[n("2023-01-04").toDate()]};const i=m.bind({});i.args={stønadskonto100:S,stønadskonto80:S,søkerinfo:t,dekningsgrad:l.HUNDRE_PROSENT,antallBarn:1,fødselsdatoer:[n("2023-01-25").toDate()],termindato:n("2023-04-01").toDate()};var D,A,c;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
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
          fødselsdatoer: args.fødselsdatoer,
          termindato: args.termindato,
          antallBarn: args.antallBarn,
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
          etternavn: 'Hanne',
          fornavn: 'Hanson',
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
}`,...(c=(A=a.parameters)==null?void 0:A.docs)==null?void 0:c.source}}};var N,R,f;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
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
          fødselsdatoer: args.fødselsdatoer,
          termindato: args.termindato,
          antallBarn: args.antallBarn,
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
          etternavn: 'Hanne',
          fornavn: 'Hanson',
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
}`,...(f=(R=o.parameters)==null?void 0:R.docs)==null?void 0:f.source}}};var O,T,u;s.parameters={...s.parameters,docs:{...(O=s.parameters)==null?void 0:O.docs,source:{originalSource:`args => {
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
          fødselsdatoer: args.fødselsdatoer,
          termindato: args.termindato,
          antallBarn: args.antallBarn,
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
          etternavn: 'Hanne',
          fornavn: 'Hanson',
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
}`,...(u=(T=s.parameters)==null?void 0:T.docs)==null?void 0:u.source}}};var M,y,_;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`args => {
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
          fødselsdatoer: args.fødselsdatoer,
          termindato: args.termindato,
          antallBarn: args.antallBarn,
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
          etternavn: 'Hanne',
          fornavn: 'Hanson',
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
}`,...(_=(y=d.parameters)==null?void 0:y.docs)==null?void 0:_.source}}};var I,P,v;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
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
          fødselsdatoer: args.fødselsdatoer,
          termindato: args.termindato,
          antallBarn: args.antallBarn,
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
          etternavn: 'Hanne',
          fornavn: 'Hanson',
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
}`,...(v=(P=i.parameters)==null?void 0:P.docs)==null?void 0:v.source}}};const Jn=["FarMedmorFødselAleneomsorgDekningsgrad100","FarMedmorFødselAleneomsorgDekningsgrad80","FarMedmorFødselAleneomsorgFør1Okt2021","FarMedmorFødselAleneomsorgEtter1Okt2021Trillinger","FarMedmorFødselAleneomsorgPrematureUker"];export{a as FarMedmorFødselAleneomsorgDekningsgrad100,o as FarMedmorFødselAleneomsorgDekningsgrad80,d as FarMedmorFødselAleneomsorgEtter1Okt2021Trillinger,s as FarMedmorFødselAleneomsorgFør1Okt2021,i as FarMedmorFødselAleneomsorgPrematureUker,Jn as __namedExportsOrder,Gn as default};
