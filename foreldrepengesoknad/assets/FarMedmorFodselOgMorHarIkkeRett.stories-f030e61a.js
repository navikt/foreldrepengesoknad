import{j as a}from"./jsx-runtime-1caa8f64.js";import{A as O}from"./AxiosMock-ed819255.js";import{F as M,U as A}from"./UttaksplanInfo-5112a340.js";import{R as u}from"./useRequest-a00d1ba3.js";import{F as y,C as n}from"./FpDataContext-c0784ba8.js";import{m as I}from"./mapSøkerinfoDTO-21812b8a.js";import{d as k}from"./Tidsperioden-d3b158ba.js";import{B as U}from"./barnUtils-e770e0b5.js";import{D as N}from"./Periodene-56628acc.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{S as P}from"./useFpNavigator-381c5d5e.js";import{i as _}from"./amplitude-bd015a1c.js";import{M as v}from"./dateFormValidation-13e10f67.js";import"./index-bcca6cba.js";import"./apiInterceptor-716e24db.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-15fa5ae3.js";import"./Perioden-96b8bac4.js";import"./uttaksPlanStatus-8d09fa26.js";import"./stringUtils-c070ccf5.js";import"./IntlProvider-669da569.js";import"./dates-471e2cce.js";import"./Link-d47e444a.js";import"./provider-5ffabb65.js";import"./uttaksplanInfoUtils-dec46c13.js";import"./uttaksplanHarForMangeFlerbarnsuker-2f023a86.js";import"./eksisterendeSakUtils-42f6657b.js";import"./dateUtils-ddd25b9f.js";import"./timezone-b3f5c703.js";import"./velkommenUtils-df400331.js";import"./index-47edccfa.js";import"./Tag-70ce2969.js";import"./Uttaksplan-8eff4722.js";import"./FormikFileUploader-157247b6.js";import"./AttachmentList-52ab744a.js";import"./Attachment-c443651d.js";import"./ExpansionCard-cfae3f50.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-f72d8814.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./formUtils-1eaa45b4.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-ce19e30a.js";import"./Ingress-f6f9f70c.js";import"./InfoOmSøknaden-d6e5a39d.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";const L={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},K={FORELDREPENGER:250},b={farRundtFødsel:0,generellMinsterett:0,toTette:0},i={kontoer:K,minsteretter:b},C={FORELDREPENGER:200},h={farRundtFødsel:0,generellMinsterett:0,toTette:0},d={kontoer:C,minsteretter:h},H="/innsyn/v2/annenPartVedtak",m="/konto",l=L,He={title:"steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett",component:M},p=e=>{_();const T=s=>{s.onPost(H).replyOnce(200,void 0,u.FINISHED),s.onGet(m).replyOnce(200,e.stønadskonto100),s.onGet(m).replyOnce(200,e.stønadskonto80)};return a.jsx(v,{initialEntries:[P.UTTAKSPLAN_INFO],children:a.jsx(O,{mock:T,children:a.jsx(y,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:{type:U.FØDT,fødselsdatoer:[k("2021-07-01").toDate()],antallBarn:1,termindato:k("2021-07-01").toDate()},[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad},[n.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.ANNEN_FORELDER]:e.annenForelder},children:a.jsx(A,{søkerInfo:I(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=p.bind({});t.args={stønadskonto100:d,stønadskonto80:i,søkerinfo:l,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:N.HUNDRE_PROSENT};const r=p.bind({});r.args={stønadskonto100:d,stønadskonto80:i,søkerinfo:l,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:N.ÅTTI_PROSENT};const o=p.bind({});o.args={stønadskonto100:d,stønadskonto80:i,søkerinfo:l,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1}};var f,g,F;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
}`,...(c=(E=o.parameters)==null?void 0:E.docs)==null?void 0:c.source}}};const je=["UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad100","UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad80","UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør"];export{t as UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad100,r as UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad80,o as UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør,je as __namedExportsOrder,He as default};
