import{j as a}from"./jsx-runtime-1caa8f64.js";import{A as O}from"./AxiosMock-35a08809.js";import{F as M,U as A}from"./UttaksplanInfo-bc7e13b9.js";import{R as u}from"./useRequest-ec5ef0e8.js";import{F as y,C as n}from"./FpDataContext-c0784ba8.js";import{m as I}from"./mapSøkerinfoDTO-b63f3b29.js";import{d as k}from"./Tidsperioden-0ce27701.js";import{B as U}from"./barnUtils-0a149fde.js";import{D as N}from"./Periodene-5d5e48f7.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{S as P}from"./useFpNavigator-138d866e.js";import{i as _}from"./IntlProvider-34dbadb5.js";import{M as v}from"./dateFormValidation-58034f6f.js";import"./index-146fc9b8.js";import"./apiInterceptor-71cf49c7.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-2052f1ab.js";import"./Perioden-b354436c.js";import"./uttaksPlanStatus-48a1e3e7.js";import"./stringUtils-5b767063.js";import"./uttaksplanInfoUtils-5344ac5a.js";import"./uttaksplanHarForMangeFlerbarnsuker-6abde0e5.js";import"./eksisterendeSakUtils-6fb999bf.js";import"./dateUtils-9797eed0.js";import"./timezone-b3f5c703.js";import"./velkommenUtils-b2263ef8.js";import"./index-b0efaffd.js";import"./Uttaksplan-00bf8ea3.js";import"./FormikFileUploader-b1f419c9.js";import"./AttachmentList-afd7fd7b.js";import"./Attachment-c0740781.js";import"./Link-d47e444a.js";import"./dates-11179115.js";import"./ExpansionCard-c322da11.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-6406233a.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-2be88c6a.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-7d3ec5e2.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";import"./createIntl-53be0640.js";const L={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},K={FORELDREPENGER:250},b={farRundtFødsel:0,generellMinsterett:0,toTette:0},i={kontoer:K,minsteretter:b},C={FORELDREPENGER:200},h={farRundtFødsel:0,generellMinsterett:0,toTette:0},d={kontoer:C,minsteretter:h},H="/innsyn/v2/annenPartVedtak",m="/konto",l=L,be={title:"steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett",component:M},p=e=>{_();const T=s=>{s.onPost(H).replyOnce(200,void 0,u.FINISHED),s.onGet(m).replyOnce(200,e.stønadskonto100),s.onGet(m).replyOnce(200,e.stønadskonto80)};return a.jsx(v,{initialEntries:[P.UTTAKSPLAN_INFO],children:a.jsx(O,{mock:T,children:a.jsx(y,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:{type:U.FØDT,fødselsdatoer:[k("2021-07-01").toDate()],antallBarn:1,termindato:k("2021-07-01").toDate()},[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad},[n.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.ANNEN_FORELDER]:e.annenForelder},children:a.jsx(A,{søkerInfo:I(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=p.bind({});t.args={stønadskonto100:d,stønadskonto80:i,søkerinfo:l,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:N.HUNDRE_PROSENT};const r=p.bind({});r.args={stønadskonto100:d,stønadskonto80:i,søkerinfo:l,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:N.ÅTTI_PROSENT};const o=p.bind({});o.args={stønadskonto100:d,stønadskonto80:i,søkerinfo:l,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1}};var f,g,F;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(F=(g=t.parameters)==null?void 0:g.docs)==null?void 0:F.source}}};var S,D,x;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
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
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(x=(D=r.parameters)==null?void 0:D.docs)==null?void 0:x.source}}};var R,E,c;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`args => {
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
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(c=(E=o.parameters)==null?void 0:E.docs)==null?void 0:c.source}}};const Ce=["UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad100","UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad80","UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør"];export{t as UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad100,r as UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad80,o as UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør,Ce as __namedExportsOrder,be as default};
