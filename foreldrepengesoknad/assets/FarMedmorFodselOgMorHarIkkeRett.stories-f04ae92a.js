import{j as l}from"./jsx-runtime-1caa8f64.js";import{A as v}from"./AxiosMock-f85117c7.js";import{F as H,U as C}from"./UttaksplanInfo-e6a56d47.js";import{R as K}from"./useRequest-603f2ddc.js";import{F as b,C as n}from"./FpDataContext-939a8168.js";import"./Tidsperioden-2d1db4bf.js";import{B}from"./barnUtils-52a07cb3.js";import{D as d}from"./Periodene-030a8cd0.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{S as h}from"./useFpNavigator-80e27ea2.js";import{i as G}from"./IntlProvider-c1bc26a9.js";import{M as J}from"./dateFormValidation-309722c8.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-81869e8b.js";import"./Perioden-8000a589.js";import"./uttaksPlanStatus-70244d59.js";import"./stringUtils-3cea292f.js";import"./uttaksplanInfoUtils-b8e169fd.js";import"./uttaksplanHarForMangeFlerbarnsuker-cf9a12b1.js";import"./eksisterendeSakUtils-6653cd82.js";import"./dateUtils-a998e40b.js";import"./velkommenUtils-135c8c82.js";import"./index-0ccac225.js";import"./Uttaksplan-b501956d.js";import"./Link-d47e444a.js";import"./FormikFileUploader-f447ccef.js";import"./AttachmentList-b7ed599c.js";import"./Attachment-5db4a859.js";import"./dates-1f1d6788.js";import"./ExpansionCard-91e81e8b.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-ab64493e.js";import"./Ingress-10c1b249.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";import"./createIntl-9cf0195b.js";const j={FORELDREPENGER:250},w={farRundtFødsel:0,generellMinsterett:40,toTette:0},U={kontoer:j,minsteretter:w},$={FORELDREPENGER:200},q={farRundtFødsel:0,generellMinsterett:40,toTette:0},P={kontoer:$,minsteretter:q},W={FORELDREPENGER:247},V={farRundtFødsel:0,generellMinsterett:40,toTette:0},F={kontoer:W,minsteretter:V},Y={FORELDREPENGER:200},z={generellMinsterett:75,farRundtFødsel:0,toTette:0},m={kontoer:Y,minsteretter:z},Q={FORELDREPENGER:200},X={generellMinsterett:75,farRundtFødsel:0,toTette:0},g={kontoer:Q,minsteretter:X},Z="/innsyn/v2/annenPartVedtak",f="/konto",k={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},we={title:"steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett",component:H},i=e=>{G();const L=p=>{p.onPost(Z).replyOnce(200,void 0,K.FINISHED),p.onGet(f).replyOnce(200,e.stønadskonto80),p.onGet(f).replyOnce(200,e.stønadskonto100)};return l.jsx(J,{initialEntries:[h.UTTAKSPLAN_INFO],children:l.jsx(v,{mock:L,children:l.jsx(b,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:{type:B.FØDT,fødselsdatoer:e.fødselsdatoer,antallBarn:1,termindato:e.termindato},[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad},[n.SØKER_DATA]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.ANNEN_FORELDER]:e.annenForelder},children:l.jsx(C,{søker:k.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=i.bind({});t.args={stønadskonto100:P,stønadskonto80:U,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:d.HUNDRE_PROSENT,fødselsdatoer:[new Date("2022-08-03")],termindato:new Date("2022-08-03")};const r=i.bind({});r.args={stønadskonto100:P,stønadskonto80:U,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:d.ÅTTI_PROSENT,fødselsdatoer:[new Date("2022-08-03")],termindato:new Date("2022-08-03")};const a=i.bind({});a.args={stønadskonto100:m,stønadskonto80:m,søkerinfo:k,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:d.HUNDRE_PROSENT,fødselsdatoer:[new Date("2022-08-03")],termindato:new Date("2022-08-03")};const o=i.bind({});o.args={stønadskonto100:g,stønadskonto80:g,søkerinfo:k,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:d.HUNDRE_PROSENT,fødselsdatoer:[new Date("2021-09-29")],termindato:new Date("2021-01-29")};const s=i.bind({});s.args={stønadskonto100:F,stønadskonto80:F,søkerinfo:k,annenForelder:{etternavn:"Hanne",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:d.HUNDRE_PROSENT,fødselsdatoer:[new Date("2023-01-25")],termindato:new Date("2023-04-01")};var E,R,S;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
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
}`,...(_=(I=s.parameters)==null?void 0:I.docs)==null?void 0:_.source}}};const $e=["BareFarHarRettMorIkkeUførDekningsgrad100EtterWLB","BareFarHarRettMorIkkeUførDekningsgrad80EtterWLB","BareFarHarRettOgMorErUførEtterWLB","BareFarHarRettOgMorErUførFør1Okt2021","BareFarHarRettOgPrematurFødsel"];export{t as BareFarHarRettMorIkkeUførDekningsgrad100EtterWLB,r as BareFarHarRettMorIkkeUførDekningsgrad80EtterWLB,a as BareFarHarRettOgMorErUførEtterWLB,o as BareFarHarRettOgMorErUførFør1Okt2021,s as BareFarHarRettOgPrematurFødsel,$e as __namedExportsOrder,we as default};
