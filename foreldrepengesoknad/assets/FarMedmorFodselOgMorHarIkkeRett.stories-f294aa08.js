import{j as l}from"./jsx-runtime-1caa8f64.js";import{A as v}from"./AxiosMock-f85117c7.js";import"./dates-c7d75be6.js";import{B as H}from"./barnUtils-397fbc9c.js";import{D as d}from"./Dekningsgrad-fced8842.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as C}from"./IntlProvider-1d845c21.js";import{F as K,C as n}from"./FpDataContext-9c963fd7.js";import{S as b}from"./useFpNavigator-d887b885.js";import{F as B,U as h}from"./UttaksplanInfo-ea26c88d.js";import{R as G}from"./useRequest-603f2ddc.js";import{M as J}from"./dateFormValidation-996d41a1.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";import"./createIntl-39c77dfb.js";import"./isFarEllerMedmor-120238ea.js";import"./Arbeidsform-a1ff9760.js";import"./Perioden-b1f81fc9.js";import"./uttaksPlanStatus-4d798447.js";import"./stringUtils-17aed94c.js";import"./Periodene-3a8fbd9d.js";import"./uttaksplanInfoUtils-5827423e.js";import"./eksisterendeSakUtils-903321d5.js";import"./velkommenUtils-5f6f1de8.js";import"./dateUtils-3df5aed4.js";import"./index-0bc8900a.js";import"./links-4d39192e.js";import"./Accordion-58d64c3c.js";import"./stønadskontoer-e5e38a52.js";import"./ExpansionCard-52dde959.js";import"./LenkeKnapp-725b4f91.js";import"./Ingress-10c1b249.js";const j={FORELDREPENGER:250},w={farRundtFødsel:0,generellMinsterett:40,toTette:0},U={kontoer:j,minsteretter:w},$={FORELDREPENGER:200},q={farRundtFødsel:0,generellMinsterett:40,toTette:0},P={kontoer:$,minsteretter:q},W={FORELDREPENGER:200},V={generellMinsterett:75,farRundtFødsel:0,toTette:0},F={kontoer:W,minsteretter:V},Y={FORELDREPENGER:200},z={generellMinsterett:75,farRundtFødsel:0,toTette:0},m={kontoer:Y,minsteretter:z},Q={FORELDREPENGER:247},X={farRundtFødsel:0,generellMinsterett:40,toTette:0},g={kontoer:Q,minsteretter:X},Z="/innsyn/v2/annenPartVedtak",f="/konto",k={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},he={title:"steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett",component:B},i=e=>{C();const L=p=>{p.onPost(Z).replyOnce(200,void 0,G.FINISHED),p.onGet(f).replyOnce(200,e.stønadskonto80),p.onGet(f).replyOnce(200,e.stønadskonto100)};return l.jsx(J,{initialEntries:[b.UTTAKSPLAN_INFO],children:l.jsx(v,{mock:L,children:l.jsx(K,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:{type:H.FØDT,fødselsdatoer:e.fødselsdatoer,antallBarn:1,termindato:e.termindato},[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad},[n.SØKER_DATA]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.ANNEN_FORELDER]:e.annenForelder},children:l.jsx(h,{søker:k.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=i.bind({});t.args={stønadskonto100:P,stønadskonto80:U,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:d.HUNDRE_PROSENT,fødselsdatoer:[new Date("2022-08-03")],termindato:new Date("2022-08-03")};const r=i.bind({});r.args={stønadskonto100:P,stønadskonto80:U,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:d.ÅTTI_PROSENT,fødselsdatoer:[new Date("2022-08-03")],termindato:new Date("2022-08-03")};const a=i.bind({});a.args={stønadskonto100:F,stønadskonto80:F,søkerinfo:k,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:d.HUNDRE_PROSENT,fødselsdatoer:[new Date("2022-08-03")],termindato:new Date("2022-08-03")};const o=i.bind({});o.args={stønadskonto100:m,stønadskonto80:m,søkerinfo:k,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:d.HUNDRE_PROSENT,fødselsdatoer:[new Date("2021-09-29")],termindato:new Date("2021-01-29")};const s=i.bind({});s.args={stønadskonto100:g,stønadskonto80:g,søkerinfo:k,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:d.HUNDRE_PROSENT,fødselsdatoer:[new Date("2023-01-25")],termindato:new Date("2023-04-01")};var E,R,S;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
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
          antallBarn: 1,
          termindato: args.termindato
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={søkerinfoFarSøker.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(S=(R=t.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};var x,D,c;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
          antallBarn: 1,
          termindato: args.termindato
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={søkerinfoFarSøker.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(c=(D=r.parameters)==null?void 0:D.docs)==null?void 0:c.source}}};var N,O,T;a.parameters={...a.parameters,docs:{...(N=a.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
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
          antallBarn: 1,
          termindato: args.termindato
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={søkerinfoFarSøker.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(T=(O=a.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var M,A,u;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`args => {
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
          antallBarn: 1,
          termindato: args.termindato
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={søkerinfoFarSøker.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(u=(A=o.parameters)==null?void 0:A.docs)==null?void 0:u.source}}};var y,I,_;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
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
          antallBarn: 1,
          termindato: args.termindato
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={søkerinfoFarSøker.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(_=(I=s.parameters)==null?void 0:I.docs)==null?void 0:_.source}}};const Ge=["BareFarHarRettMorIkkeUførDekningsgrad100EtterWLB","BareFarHarRettMorIkkeUførDekningsgrad80EtterWLB","BareFarHarRettOgMorErUførEtterWLB","BareFarHarRettOgMorErUførFør1Okt2021","BareFarHarRettOgPrematurFødsel"];export{t as BareFarHarRettMorIkkeUførDekningsgrad100EtterWLB,r as BareFarHarRettMorIkkeUførDekningsgrad80EtterWLB,a as BareFarHarRettOgMorErUførEtterWLB,o as BareFarHarRettOgMorErUførFør1Okt2021,s as BareFarHarRettOgPrematurFødsel,Ge as __namedExportsOrder,he as default};
