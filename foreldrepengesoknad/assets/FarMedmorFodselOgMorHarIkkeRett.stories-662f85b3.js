import{j as l}from"./jsx-runtime-1caa8f64.js";import{A as v}from"./AxiosMock-9ec34b5d.js";import"./Tidsperioden-5bf2b704.js";import{D as d,M as H,B as C}from"./dateFormValidation-749eb76f.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as K}from"./Step-304af930.js";import{F as b,C as n}from"./FpDataContext-91c673b7.js";import{S as B}from"./useFpNavigator-5d184dca.js";import{F as h,U as G}from"./UttaksplanInfo-a4e0ad18.js";import{R as J}from"./useRequest-84d89b79.js";import"./index-146fc9b8.js";import"./apiInterceptor-7536bacb.js";import"./axios-91b57d60.js";import"./index-daf33b80.js";import"./Link-1e7d9fc8.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./links-022380bf.js";import"./amplitude.esm-2809efde.js";import"./createIntl-4b54006a.js";import"./barnUtils-1347596c.js";import"./uttaksplanInfoUtils-e36d9f2c.js";import"./eksisterendeSakUtils-89bd2ba5.js";import"./velkommenUtils-4be388ea.js";import"./dateUtils-0170394e.js";import"./stønadskontoer-38788965.js";import"./ExpansionCard-2df8fb91.js";import"./BabyWrapped-782da392.js";import"./LenkeKnapp-d085fb45.js";const j={FORELDREPENGER:250},$={farRundtFødsel:0,generellMinsterett:40,toTette:0},U={kontoer:j,minsteretter:$},q={FORELDREPENGER:200},W={farRundtFødsel:0,generellMinsterett:40,toTette:0},P={kontoer:q,minsteretter:W},V={FORELDREPENGER:200},Y={generellMinsterett:75,farRundtFødsel:0,toTette:0},F={kontoer:V,minsteretter:Y},w={FORELDREPENGER:200},z={generellMinsterett:75,farRundtFødsel:0,toTette:0},g={kontoer:w,minsteretter:z},Q={FORELDREPENGER:247},X={farRundtFødsel:0,generellMinsterett:40,toTette:0},f={kontoer:Q,minsteretter:X},Z="/innsyn/v2/annenPartVedtak",m="/konto",k={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},Pe={title:"steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett",component:h},i=e=>{K();const L=p=>{p.onPost(Z).replyOnce(200,void 0,J.FINISHED),p.onGet(m).replyOnce(200,e.stønadskonto80),p.onGet(m).replyOnce(200,e.stønadskonto100)};return l.jsx(H,{initialEntries:[B.UTTAKSPLAN_INFO],children:l.jsx(v,{mock:L,children:l.jsx(b,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:{type:C.FØDT,fødselsdatoer:e.fødselsdatoer,antallBarn:1,termindato:e.termindato},[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad},[n.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.ANNEN_FORELDER]:e.annenForelder},children:l.jsx(G,{søkerInfo:k,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=i.bind({});t.args={stønadskonto100:P,stønadskonto80:U,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erMorUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,erAleneOmOmsorg:!1},dekningsgrad:d.HUNDRE_PROSENT,fødselsdatoer:["2022-08-03"],termindato:"2022-08-03"};const r=i.bind({});r.args={stønadskonto100:P,stønadskonto80:U,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erMorUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,erAleneOmOmsorg:!1},dekningsgrad:d.ÅTTI_PROSENT,fødselsdatoer:["2022-08-03"],termindato:"2022-08-03"};const a=i.bind({});a.args={stønadskonto100:F,stønadskonto80:F,søkerinfo:k,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erMorUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,erAleneOmOmsorg:!1},dekningsgrad:d.HUNDRE_PROSENT,fødselsdatoer:["2022-08-03"],termindato:"2022-08-03"};const o=i.bind({});o.args={stønadskonto100:g,stønadskonto80:g,søkerinfo:k,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erMorUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,erAleneOmOmsorg:!1},dekningsgrad:d.HUNDRE_PROSENT,fødselsdatoer:["2021-09-29"],termindato:"2021-01-29"};const s=i.bind({});s.args={stønadskonto100:f,stønadskonto80:f,søkerinfo:k,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erMorUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,erAleneOmOmsorg:!1},dekningsgrad:d.HUNDRE_PROSENT,fødselsdatoer:["2023-01-25"],termindato:"2023-04-01"};var E,R,S;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
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
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={søkerinfoFarSøker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(S=(R=t.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};var x,c,N;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={søkerinfoFarSøker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(N=(c=r.parameters)==null?void 0:c.docs)==null?void 0:N.source}}};var D,M,T;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
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
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={søkerinfoFarSøker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(T=(M=a.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};var O,A,u;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`args => {
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
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={søkerinfoFarSøker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(u=(A=o.parameters)==null?void 0:A.docs)==null?void 0:u.source}}};var I,y,_;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
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
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={søkerinfoFarSøker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(_=(y=s.parameters)==null?void 0:y.docs)==null?void 0:_.source}}};const Le=["BareFarHarRettMorIkkeUførDekningsgrad100EtterWLB","BareFarHarRettMorIkkeUførDekningsgrad80EtterWLB","BareFarHarRettOgMorErUførEtterWLB","BareFarHarRettOgMorErUførFør1Okt2021","BareFarHarRettOgPrematurFødsel"];export{t as BareFarHarRettMorIkkeUførDekningsgrad100EtterWLB,r as BareFarHarRettMorIkkeUførDekningsgrad80EtterWLB,a as BareFarHarRettOgMorErUførEtterWLB,o as BareFarHarRettOgMorErUførFør1Okt2021,s as BareFarHarRettOgPrematurFødsel,Le as __namedExportsOrder,Pe as default};
