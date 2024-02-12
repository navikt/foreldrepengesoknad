import{j as g}from"./jsx-runtime-1caa8f64.js";import{d as e}from"./Tidsperioden-d1902d25.js";import{B as o}from"./barnUtils-7cbd95bf.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as nn}from"./IntlProvider-73307a5a.js";import{a as V}from"./chunk-WFFRPTHA-80d37c1b.js";import{F as en,C as m}from"./FpDataContext-939a8168.js";import{S as rn}from"./useFpNavigator-7e9e8eb3.js";import{A as tn}from"./AxiosMock-f85117c7.js";import{A as Y}from"./AnnenForelder-530653ed.js";import{M as on}from"./dateFormValidation-0494f3da.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./dates-329dcbbc.js";import"./amplitude.esm-2809efde.js";import"./createIntl-c9f2f516.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./FormikFileUploader-c68dc375.js";import"./AttachmentList-8f5e0d70.js";import"./Attachment-423ea8c4.js";import"./ExpansionCard-67831c32.js";import"./isFarEllerMedmor-120238ea.js";import"./index-cc1e5841.js";import"./links-4d39192e.js";import"./index-bda11f3a.js";import"./RegistrertePersonalia-651ecccc.js";import"./stringUtils-a1ef16c8.js";import"./validationUtil-468a419f.js";var q=(n=>(n.UOPPGITT="UOPPGITT",n.UGIFT="UGIFT",n.GIFT="GIFT",n.ENKE_ELLER_ENKEMANN="ENKE_ELLER_ENKEMANN",n.SKILT="SKILT",n.SEPARERT="SEPARERT",n.REGISTRERT_PARTNER="REGISTRERT_PARTNER",n.SEPARERT_PARTNER="SEPARERT_PARTNER",n.SKILT_PARTNER="SKILT_PARTNER",n.GJENLEVENDE_PARTNER="GJENLEVENDE_PARTNER",n))(q||{});const an=()=>(...n)=>(V("button-click")(...n),Promise.resolve()),r={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},Hn={title:"steps/AnnenForelder",component:Y},t=({søker:n,søkersituasjon:w={situasjon:"fødsel",rolle:"mor"},barn:z={type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:void 0,dokumentasjonAvAleneomsorg:[]},annenForelder:Q={kanIkkeOppgis:!0},gåTilNesteSide:W,mellomlagreSøknadOgNaviger:X=an(),avbrytSøknad:Z=V("button-click")})=>{nn();const $=S=>{S.onPost("/storage/foreldrepenger/vedlegg").reply(200,{data:{}},{location:""}),S.onPost("/storage/foreldrepenger").reply(200,void 0)};return g.jsx(on,{initialEntries:[rn.ANNEN_FORELDER],children:g.jsx(tn,{mock:$,children:g.jsx(en,{onDispatch:W,initialState:{[m.SØKERSITUASJON]:w,[m.OM_BARNET]:z,[m.ANNEN_FORELDER]:Q,[m.SØKER_DATA]:{harHattAnnenInntektSiste10Mnd:void 0,harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,erAleneOmOmsorg:void 0}},children:g.jsx(Y,{søker:n,mellomlagreSøknadOgNaviger:X,avbrytSøknad:Z})})})})},a=t.bind({});a.args={barn:{type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:e("2021-03-15").toDate(),dokumentasjonAvAleneomsorg:[],fnr:["21091981146"]},søker:r};const s=t.bind({});s.args={annenForelder:{kanIkkeOppgis:!1},søker:{...r,barn:[]}};const i=t.bind({});i.args={annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1},søker:{...r,barn:[]}};const d=t.bind({});d.args={annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1},søker:{...r,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"}}]}};const l=t.bind({});l.args={barn:{type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:e("2021-03-15").toDate(),dokumentasjonAvAleneomsorg:[],fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{...r,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]}};const k=t.bind({});k.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!1},søker:{...r,barn:[]}};const p=t.bind({});p.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},annenForelder:{kanIkkeOppgis:!1},søker:{...r,kjønn:"K",barn:[]}};const F=t.bind({});F.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søker:{...r,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]}};const x=t.bind({});x.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søker:{...r,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:q.GIFT}}};var O,c,T;a.parameters={...a.parameters,docs:{...(O=a.parameters)==null?void 0:O.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harHattAnnenInntektSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomFrilansSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          erAleneOmOmsorg: undefined
        }
      }}>
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(T=(c=a.parameters)==null?void 0:c.docs)==null?void 0:T.source}}};var u,A,D;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harHattAnnenInntektSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomFrilansSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          erAleneOmOmsorg: undefined
        }
      }}>
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(D=(A=s.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var E,R,y;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harHattAnnenInntektSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomFrilansSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          erAleneOmOmsorg: undefined
        }
      }}>
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(y=(R=i.parameters)==null?void 0:R.docs)==null?void 0:y.source}}};var f,N,M;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harHattAnnenInntektSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomFrilansSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          erAleneOmOmsorg: undefined
        }
      }}>
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(M=(N=d.parameters)==null?void 0:N.docs)==null?void 0:M.source}}};var b,v,j;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harHattAnnenInntektSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomFrilansSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          erAleneOmOmsorg: undefined
        }
      }}>
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(j=(v=l.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var C,_,I;k.parameters={...k.parameters,docs:{...(C=k.parameters)==null?void 0:C.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harHattAnnenInntektSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomFrilansSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          erAleneOmOmsorg: undefined
        }
      }}>
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(I=(_=k.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var B,P,L;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harHattAnnenInntektSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomFrilansSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          erAleneOmOmsorg: undefined
        }
      }}>
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(L=(P=p.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var h,K,U;F.parameters={...F.parameters,docs:{...(h=F.parameters)==null?void 0:h.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harHattAnnenInntektSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomFrilansSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          erAleneOmOmsorg: undefined
        }
      }}>
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(U=(K=F.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var J,G,H;x.parameters={...x.parameters,docs:{...(J=x.parameters)==null?void 0:J.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harHattAnnenInntektSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomFrilansSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
          // @ts-ignore TODO (TOR) Fiks Søker-typen
          erAleneOmOmsorg: undefined
        }
      }}>
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(H=(G=x.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};const Vn=["Default","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{a as Default,x as FarGiftUfødtBarn,F as FarUfødtBarn,l as ForFar,p as MedmorUfødtBarn,k as MorUfødtBarn,s as SkalOppgiPersonalia,d as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,i as SkalOppgiPersonaliaNavnMangler,Vn as __namedExportsOrder,Hn as default};
