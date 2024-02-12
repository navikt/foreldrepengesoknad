import{j as o}from"./jsx-runtime-1caa8f64.js";import{A as T}from"./AxiosMock-f85117c7.js";import{F as M,U as O}from"./UttaksplanInfo-9c50cf47.js";import{R as A}from"./useRequest-603f2ddc.js";import{F as u,C as e}from"./FpDataContext-939a8168.js";import{d as k}from"./Tidsperioden-d1902d25.js";import{B as y}from"./barnUtils-7cbd95bf.js";import{D as c}from"./Periodene-27013d32.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{S as I}from"./useFpNavigator-7e9e8eb3.js";import{i as _}from"./IntlProvider-73307a5a.js";import{M as U}from"./dateFormValidation-0494f3da.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-1e4cf574.js";import"./Perioden-9714515e.js";import"./uttaksPlanStatus-60c32f6e.js";import"./stringUtils-a1ef16c8.js";import"./uttaksplanInfoUtils-73e16250.js";import"./uttaksplanHarForMangeFlerbarnsuker-75636a63.js";import"./eksisterendeSakUtils-e7e07b57.js";import"./dateUtils-eac0c79d.js";import"./velkommenUtils-a69d30e7.js";import"./index-cc1e5841.js";import"./Uttaksplan-3148a5c0.js";import"./FormikFileUploader-c68dc375.js";import"./AttachmentList-8f5e0d70.js";import"./Attachment-423ea8c4.js";import"./Link-d47e444a.js";import"./dates-329dcbbc.js";import"./ExpansionCard-67831c32.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-37949f0b.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-83adba99.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";import"./createIntl-c9f2f516.js";const P={FORELDREPENGER:250},v={farRundtFødsel:0,generellMinsterett:0,toTette:0},i={kontoer:P,minsteretter:v},L={FORELDREPENGER:200},K={farRundtFødsel:0,generellMinsterett:0,toTette:0},d={kontoer:L,minsteretter:K},b="/innsyn/v2/annenPartVedtak",p="/konto",C={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},Ie={title:"steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett",component:M},l=a=>{_();const N=s=>{s.onPost(b).replyOnce(200,void 0,A.FINISHED),s.onGet(p).replyOnce(200,a.stønadskonto100),s.onGet(p).replyOnce(200,a.stønadskonto80)};return o.jsx(U,{initialEntries:[I.UTTAKSPLAN_INFO],children:o.jsx(T,{mock:N,children:o.jsx(u,{initialState:{[e.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[e.OM_BARNET]:{type:y.FØDT,fødselsdatoer:[k("2021-07-01").toDate()],antallBarn:1,termindato:k("2021-07-01").toDate()},[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:a.dekningsgrad},[e.SØKER_DATA]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[e.ANNEN_FORELDER]:a.annenForelder},children:o.jsx(O,{søker:C.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},n=l.bind({});n.args={stønadskonto100:d,stønadskonto80:i,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:c.HUNDRE_PROSENT};const t=l.bind({});t.args={stønadskonto100:d,stønadskonto80:i,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:c.ÅTTI_PROSENT};const r=l.bind({});r.args={stønadskonto100:d,stønadskonto80:i,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1}};var m,g,F;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
          situasjon: 'fødsel',
          rolle: 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.FØDT,
          fødselsdatoer: [dayjs('2021-07-01').toDate()],
          antallBarn: 1,
          termindato: dayjs('2021-07-01').toDate()
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
}`,...(F=(g=n.parameters)==null?void 0:g.docs)==null?void 0:F.source}}};var f,S,D;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
          situasjon: 'fødsel',
          rolle: 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.FØDT,
          fødselsdatoer: [dayjs('2021-07-01').toDate()],
          antallBarn: 1,
          termindato: dayjs('2021-07-01').toDate()
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
}`,...(D=(S=t.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var x,R,E;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
          situasjon: 'fødsel',
          rolle: 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.FØDT,
          fødselsdatoer: [dayjs('2021-07-01').toDate()],
          antallBarn: 1,
          termindato: dayjs('2021-07-01').toDate()
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
}`,...(E=(R=r.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};const _e=["UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad100","UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad80","UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør"];export{n as UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad100,t as UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad80,r as UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør,_e as __namedExportsOrder,Ie as default};
