import{j as x}from"./jsx-runtime-1caa8f64.js";import{a as Y}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as $}from"./AxiosMock-35a08809.js";import{_ as nn}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{A as q}from"./AnnenForelder-0d79b7e7.js";import{F as en,C as m}from"./FpDataContext-c0784ba8.js";import{m as rn}from"./mapSøkerinfoDTO-b63f3b29.js";import{d as e}from"./Tidsperioden-0ce27701.js";import{B as o}from"./barnUtils-0a149fde.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{S as on}from"./useFpNavigator-35d501ad.js";import{i as tn}from"./IntlProvider-3646511b.js";import{M as an}from"./dateFormValidation-58034f6f.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-71cf49c7.js";import"./index-569d4880.js";import"./index-a01a9712.js";import"./FormikFileUploader-7eda86b2.js";import"./AttachmentList-afd7fd7b.js";import"./Attachment-c0740781.js";import"./Link-d47e444a.js";import"./dates-11179115.js";import"./ExpansionCard-c322da11.js";import"./isFarEllerMedmor-120238ea.js";import"./index-b0efaffd.js";import"./links-4d39192e.js";import"./stringUtils-5b767063.js";import"./validationUtil-21bd813d.js";import"./RegistrertePersonalia-9fc12607.js";import"./timezone-b3f5c703.js";import"./index-daf33b80.js";import"./amplitude.esm-2809efde.js";import"./createIntl-53be0640.js";const sn=()=>(...g)=>(Y("button-click")(...g),Promise.resolve()),n=nn,zn={title:"steps/AnnenForelder",component:q},r=({søkerinfo:g,søkersituasjon:w={situasjon:"fødsel",rolle:"mor"},barn:z={type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:void 0,dokumentasjonAvAleneomsorg:[]},annenForelder:Q={kanIkkeOppgis:!0},gåTilNesteSide:V,mellomlagreSøknadOgNaviger:W=sn(),avbrytSøknad:X=Y("button-click")})=>{tn();const Z=S=>{S.onPost("/storage/foreldrepenger/vedlegg").reply(200,{data:{}},{location:""}),S.onPost("/storage/foreldrepenger").reply(200,void 0)};return x.jsx(an,{initialEntries:[on.ANNEN_FORELDER],children:x.jsx($,{mock:Z,children:x.jsx(en,{onDispatch:V,initialState:{[m.SØKERSITUASJON]:w,[m.OM_BARNET]:z,[m.ANNEN_FORELDER]:Q,[m.SØKER]:{harHattAnnenInntektSiste10Mnd:void 0,harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,erAleneOmOmsorg:void 0}},children:x.jsx(q,{søkerInfo:rn(g),mellomlagreSøknadOgNaviger:W,avbrytSøknad:X})})})})},t=r.bind({});t.args={barn:{type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:e("2021-03-15").toDate(),dokumentasjonAvAleneomsorg:[],fnr:["21091981146"]},søkerinfo:n};const a=r.bind({});a.args={annenForelder:{kanIkkeOppgis:!1},søkerinfo:{søker:{...n,barn:[]}}};const s=r.bind({});s.args={annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1},søkerinfo:{søker:{...n,barn:[]}}};const i=r.bind({});i.args={annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1},søkerinfo:{søker:{...n,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999"}}]}}};const d=r.bind({});d.args={barn:{type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:e("2021-03-15").toDate(),dokumentasjonAvAleneomsorg:[],fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerinfo:{søker:{...n.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]}}};const l=r.bind({});l.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,barn:[]}}};const k=r.bind({});k.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,kjønn:"K",barn:[]}}};const p=r.bind({});p.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]}}};const F=r.bind({});F.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:"GIFT"}}}};var O,c,f;t.parameters={...t.parameters,docs:{...(O=t.parameters)==null?void 0:O.docs,source:{originalSource:`({
  søkerinfo,
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
        [ContextDataType.SØKER]: {
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
                    <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(f=(c=t.parameters)==null?void 0:c.docs)==null?void 0:f.source}}};var u,T,D;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`({
  søkerinfo,
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
        [ContextDataType.SØKER]: {
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
                    <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(D=(T=a.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var y,A,M;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`({
  søkerinfo,
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
        [ContextDataType.SØKER]: {
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
                    <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(M=(A=s.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var E,N,R;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`({
  søkerinfo,
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
        [ContextDataType.SØKER]: {
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
                    <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(R=(N=i.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var b,v,j;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`({
  søkerinfo,
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
        [ContextDataType.SØKER]: {
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
                    <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(j=(v=d.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var C,B,I;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`({
  søkerinfo,
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
        [ContextDataType.SØKER]: {
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
                    <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(I=(B=l.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};var h,_,P;k.parameters={...k.parameters,docs:{...(h=k.parameters)==null?void 0:h.docs,source:{originalSource:`({
  søkerinfo,
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
        [ContextDataType.SØKER]: {
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
                    <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(P=(_=k.parameters)==null?void 0:_.docs)==null?void 0:P.source}}};var J,L,U;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{originalSource:`({
  søkerinfo,
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
        [ContextDataType.SØKER]: {
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
                    <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(U=(L=p.parameters)==null?void 0:L.docs)==null?void 0:U.source}}};var K,H,G;F.parameters={...F.parameters,docs:{...(K=F.parameters)==null?void 0:K.docs,source:{originalSource:`({
  søkerinfo,
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
        [ContextDataType.SØKER]: {
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
                    <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(G=(H=F.parameters)==null?void 0:H.docs)==null?void 0:G.source}}};const Qn=["Default","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{t as Default,F as FarGiftUfødtBarn,p as FarUfødtBarn,d as ForFar,k as MedmorUfødtBarn,l as MorUfødtBarn,a as SkalOppgiPersonalia,i as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,s as SkalOppgiPersonaliaNavnMangler,Qn as __namedExportsOrder,zn as default};
