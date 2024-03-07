import{j as g}from"./jsx-runtime-1caa8f64.js";import{d as e}from"./dates-c7d75be6.js";import{s as F,a as x}from"./stønadskontoDeltUttak80-23916c37.js";import{s as C,a as K,b as D}from"./stønadskontoDeltUttak100WLB-4f8cea3b.js";import{A as G}from"./AxiosMock-f85117c7.js";import{B as t}from"./barnUtils-397fbc9c.js";import{D as a}from"./Dekningsgrad-fced8842.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as J}from"./IntlProvider-1d845c21.js";import{F as j,C as o}from"./FpDataContext-9c963fd7.js";import{S as W}from"./useFpNavigator-d887b885.js";import{R as q}from"./useRequest-603f2ddc.js";import{U as B}from"./UttaksplanInfo-0968e963.js";import{M as w}from"./dateFormValidation-996d41a1.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./amplitude.esm-2809efde.js";import"./createIntl-39c77dfb.js";import"./isFarEllerMedmor-120238ea.js";import"./Arbeidsform-a1ff9760.js";import"./Perioden-b1f81fc9.js";import"./uttaksPlanStatus-4d798447.js";import"./stringUtils-17aed94c.js";import"./Periodene-3a8fbd9d.js";import"./uttaksplanInfoUtils-5827423e.js";import"./eksisterendeSakUtils-903321d5.js";import"./velkommenUtils-5f6f1de8.js";import"./dateUtils-3df5aed4.js";import"./index-0bc8900a.js";import"./links-4d39192e.js";import"./Accordion-58d64c3c.js";import"./stønadskontoer-e5e38a52.js";import"./ExpansionCard-52dde959.js";import"./LenkeKnapp-725b4f91.js";import"./Ingress-10c1b249.js";const V="/innsyn/v2/annenPartVedtak",E="/konto",n={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},Cn={title:"steps/uttaksplan-info/FarMedmorFødselBeggeHarRett",component:B},r=m=>{J();const h=S=>{S.onPost(V).replyOnce(200,void 0,q.FINISHED),S.onGet(E).replyOnce(200,m.stønadskonto80),S.onGet(E).replyOnce(200,m.stønadskonto100)};return g.jsx(w,{initialEntries:[W.UTTAKSPLAN_INFO],children:g.jsx(G,{mock:h,children:g.jsx(j,{initialState:{[o.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[o.OM_BARNET]:m.barn,[o.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:m.dekningsgrad},[o.SØKER_DATA]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[o.ANNEN_FORELDER]:{etternavn:"Hanson",fornavn:"Hanne",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:g.jsx(B,{søker:n.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},s=r.bind({});s.args={stønadskonto100:F,stønadskonto80:x,barn:{type:t.FØDT,fødselsdatoer:[e("2022-08-01").toDate()],antallBarn:1},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};const i=r.bind({});i.args={stønadskonto100:C,stønadskonto80:K,barn:{type:t.FØDT,fødselsdatoer:[e("2022-08-03").toDate()],antallBarn:1},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};const d=r.bind({});d.args={stønadskonto100:C,stønadskonto80:K,barn:{type:t.UFØDT,termindato:new Date("2022-08-31"),antallBarn:1},søkerinfo:n,dekningsgrad:a.ÅTTI_PROSENT};const l=r.bind({});l.args={stønadskonto100:F,stønadskonto80:x,barn:{type:t.FØDT,fødselsdatoer:[e("2021-09-02").toDate()],antallBarn:1},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};const k=r.bind({});k.args={stønadskonto100:F,stønadskonto80:x,barn:{type:t.FØDT,fødselsdatoer:[e("2022-09-02").toDate()],antallBarn:2},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};const p=r.bind({});p.args={stønadskonto100:D,stønadskonto80:D,barn:{type:t.FØDT,fødselsdatoer:[e("2023-01-25").toDate()],termindato:e("2023-04-01").toDate(),antallBarn:1},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};var N,R,c;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
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
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'Hanson',
          fornavn: 'Hanne',
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
}`,...(c=(R=s.parameters)==null?void 0:R.docs)==null?void 0:c.source}}};var f,O,T;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'Hanson',
          fornavn: 'Hanne',
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
}`,...(T=(O=i.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var A,M,u;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
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
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'Hanson',
          fornavn: 'Hanne',
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
}`,...(u=(M=d.parameters)==null?void 0:M.docs)==null?void 0:u.source}}};var y,_,I;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
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
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'Hanson',
          fornavn: 'Hanne',
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
}`,...(I=(_=l.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var L,P,U;k.parameters={...k.parameters,docs:{...(L=k.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
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
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'Hanson',
          fornavn: 'Hanne',
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
}`,...(U=(P=k.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};var v,b,H;p.parameters={...p.parameters,docs:{...(v=p.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
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
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'Hanson',
          fornavn: 'Hanne',
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
}`,...(H=(b=p.parameters)==null?void 0:b.docs)==null?void 0:H.source}}};const Kn=["FarMedmorFødselBeggeHarRettDekningsgrad100FørWLB","FarMedmorFødselBeggeHarRettDekningsgrad100EtterWLB","FarMedmorFødselBeggeHarRettDekningsgrad80EtterWLBTermin","FarMedmorFødselBeggeHarRettFødselFør1Okt2021","FarMedmorFødselBeggeHarRettTvillinger","FarMedmorPrematurFødselBeggeHarRettPrematur"];export{i as FarMedmorFødselBeggeHarRettDekningsgrad100EtterWLB,s as FarMedmorFødselBeggeHarRettDekningsgrad100FørWLB,d as FarMedmorFødselBeggeHarRettDekningsgrad80EtterWLBTermin,l as FarMedmorFødselBeggeHarRettFødselFør1Okt2021,k as FarMedmorFødselBeggeHarRettTvillinger,p as FarMedmorPrematurFødselBeggeHarRettPrematur,Kn as __namedExportsOrder,Cn as default};
