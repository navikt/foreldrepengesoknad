import{j as l}from"./jsx-runtime-1caa8f64.js";import{A as v}from"./AxiosMock-9ec34b5d.js";import"./dates-3e7e1342.js";import{D as d,M as C,B as b}from"./dateFormValidation-fa09613b.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as K}from"./IntlProvider-c123bdc0.js";import{F as h,C as e}from"./FpDataContext-91c673b7.js";import{S as G}from"./useFpNavigator-283c2ed8.js";import{R as B}from"./useRequest-84d89b79.js";import{U as L}from"./UttaksplanInfo-cc255da5.js";import"./index-146fc9b8.js";import"./apiInterceptor-7536bacb.js";import"./axios-91b57d60.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";import"./createIntl-5b3378a9.js";import"./links-4d39192e.js";import"./barnUtils-441d9631.js";import"./uttaksplanInfoUtils-7a4a761f.js";import"./eksisterendeSakUtils-1f5e75b3.js";import"./velkommenUtils-41d64fdc.js";import"./dateUtils-f600dec0.js";import"./stønadskontoer-c466c291.js";import"./BabyWrapped-cd5fe4ef.js";import"./ExpansionCard-f4140baf.js";import"./LenkeKnapp-725b4f91.js";import"./Ingress-10c1b249.js";const J={FORELDREPENGER:280},H={generellMinsterett:0,farRundtFødsel:10,toTette:0},p={kontoer:J,minsteretter:H},j={FORELDREPENGER:230},q={generellMinsterett:0,farRundtFødsel:10,toTette:0},g={kontoer:j,minsteretter:q},$={FORELDREPENGER:272},V={generellMinsterett:0,farRundtFødsel:10,toTette:0},F={kontoer:$,minsteretter:V},Y={FORELDREPENGER:460,FORELDREPENGER_FØR_FØDSEL:15},w={generellMinsterett:0,farRundtFødsel:10,toTette:0},S={kontoer:Y,minsteretter:w},z="/innsyn/v2/annenPartVedtak",x="test/konto",n={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[]},arbeidsforhold:[]},In={title:"steps/uttaksplan-info/FarMedmorFødselAleneomsorg",component:L},i=k=>{K();const U=m=>{m.onPost(z).replyOnce(200,void 0,B.FINISHED),m.onGet(x).replyOnce(200,k.stønadskonto80),m.onGet(x).replyOnce(200,k.stønadskonto100)};return l.jsx(C,{initialEntries:[G.UTTAKSPLAN_INFO],children:l.jsx(v,{mock:U,children:l.jsx(h,{initialState:{[e.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[e.OM_BARNET]:{type:b.FØDT,fødselsdatoer:["2022-03-01"],antallBarn:1},[e.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:k.dekningsgrad},[e.ANNEN_FORELDER]:{datoForAleneomsorg:"2022-03-24",erAleneOmOmsorg:!0,etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:l.jsx(L,{søkerInfo:n,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=i.bind({});t.args={stønadskonto100:g,stønadskonto80:p,søkerinfo:n,dekningsgrad:d.HUNDRE_PROSENT,antallBarn:1,fødselsdatoer:["2022-03-01"]};const r=i.bind({});r.args={stønadskonto100:g,stønadskonto80:p,søkerinfo:n,dekningsgrad:d.ÅTTI_PROSENT,antallBarn:1,fødselsdatoer:["2022-03-01"]};const o=i.bind({});o.args={stønadskonto100:g,stønadskonto80:p,søkerinfo:n,dekningsgrad:d.ÅTTI_PROSENT,antallBarn:1,fødselsdatoer:["2021-09-30"]};const a=i.bind({});a.args={stønadskonto100:S,stønadskonto80:S,søkerinfo:n,dekningsgrad:d.HUNDRE_PROSENT,antallBarn:3,fødselsdatoer:["2023-01-04"]};const s=i.bind({});s.args={stønadskonto100:F,stønadskonto80:F,søkerinfo:n,dekningsgrad:d.HUNDRE_PROSENT,antallBarn:1,fødselsdatoer:["2023-01-25"],termindato:"2023-04-01"};var E,f,c;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
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
          fødselsdatoer: ['2022-03-01'],
          antallBarn: 1
        },
        [ContextDataType.SØKER_DATA]: {
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.ANNEN_FORELDER]: {
          datoForAleneomsorg: '2022-03-24',
          erAleneOmOmsorg: true,
          etternavn: 'dfg',
          fornavn: 'dfg',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søkerInfo={søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(c=(f=t.parameters)==null?void 0:f.docs)==null?void 0:c.source}}};var N,D,R;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
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
          fødselsdatoer: ['2022-03-01'],
          antallBarn: 1
        },
        [ContextDataType.SØKER_DATA]: {
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.ANNEN_FORELDER]: {
          datoForAleneomsorg: '2022-03-24',
          erAleneOmOmsorg: true,
          etternavn: 'dfg',
          fornavn: 'dfg',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søkerInfo={søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(R=(D=r.parameters)==null?void 0:D.docs)==null?void 0:R.source}}};var A,O,T;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
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
          fødselsdatoer: ['2022-03-01'],
          antallBarn: 1
        },
        [ContextDataType.SØKER_DATA]: {
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.ANNEN_FORELDER]: {
          datoForAleneomsorg: '2022-03-24',
          erAleneOmOmsorg: true,
          etternavn: 'dfg',
          fornavn: 'dfg',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søkerInfo={søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(T=(O=o.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var u,M,y;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
          fødselsdatoer: ['2022-03-01'],
          antallBarn: 1
        },
        [ContextDataType.SØKER_DATA]: {
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.ANNEN_FORELDER]: {
          datoForAleneomsorg: '2022-03-24',
          erAleneOmOmsorg: true,
          etternavn: 'dfg',
          fornavn: 'dfg',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søkerInfo={søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(y=(M=a.parameters)==null?void 0:M.docs)==null?void 0:y.source}}};var _,I,P;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
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
          fødselsdatoer: ['2022-03-01'],
          antallBarn: 1
        },
        [ContextDataType.SØKER_DATA]: {
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.ANNEN_FORELDER]: {
          datoForAleneomsorg: '2022-03-24',
          erAleneOmOmsorg: true,
          etternavn: 'dfg',
          fornavn: 'dfg',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søkerInfo={søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(P=(I=s.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};const Pn=["FarMedmorFødselAleneomsorgDekningsgrad100","FarMedmorFødselAleneomsorgDekningsgrad80","FarMedmorFødselAleneomsorgFør1Okt2021","FarMedmorFødselAleneomsorgEtter1Okt2021Trillinger","FarMedmorFødselAleneomsorgPrematureUker"];export{t as FarMedmorFødselAleneomsorgDekningsgrad100,r as FarMedmorFødselAleneomsorgDekningsgrad80,a as FarMedmorFødselAleneomsorgEtter1Okt2021Trillinger,o as FarMedmorFødselAleneomsorgFør1Okt2021,s as FarMedmorFødselAleneomsorgPrematureUker,Pn as __namedExportsOrder,In as default};
