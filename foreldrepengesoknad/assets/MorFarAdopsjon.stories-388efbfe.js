import{j as k}from"./jsx-runtime-d079401a.js";import{d as C}from"./Tidsperioden-2f191506.js";import{B as j}from"./barnUtils-42471e8d.js";import{D as i}from"./Periodene-93f75033.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{w as b}from"./withRouter-d9926836.js";import{A as K}from"./AxiosMock-07682dd6.js";import{R as B}from"./useRequest-1bc7422a.js";import{_ as G,a as h}from"./søkerinfoFarSøker-922c6b69.js";import{s as U,a as I}from"./stønadskonto80-8e203d8f.js";import{s as l,a as m}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as v}from"./UttaksplanInfo-723ff517.js";import{F as J,C as n}from"./FpDataContext-6d6d78b0.js";import{m as H}from"./mapSøkerinfoDTO-7324950a.js";import"./index-b580f7e8.js";import"./Link-13f307fd.js";import"./index-c74c9f7f.js";import"./v4-4a60fe23.js";import"./Perioden-756f4214.js";import"./uttaksPlanStatus-931b1d24.js";import"./stringUtils-e263f9a0.js";import"./index-cdc86f56.js";import"./index-54751434.js";import"./apiInterceptor-716e24db.js";import"./validation-631bcf6e.js";import"./dateFormValidation-f3ff7428.js";import"./dates-584a13c3.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-f1dbaf58.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-7ba66c63.js";import"./uttaksplanHarForMangeFlerbarnsuker-1b4dfbbf.js";import"./useFpApiData-7196599a.js";import"./eksisterendeSakUtils-e1f0846a.js";import"./dateUtils-0d76b092.js";import"./timezone-29fa0fe3.js";import"./leggTilPeriode-bd13d552.js";import"./velkommenUtils-76cff43a.js";import"./index-47edccfa.js";import"./Tag-01a82302.js";import"./Uttaksplan-4220f9b0.js";import"./FormikFileUploader-06af9077.js";import"./AttachmentList-65372876.js";import"./Attachment-2a8e1687.js";import"./IntlProvider-5022d65e.js";import"./Alert-ea771e10.js";import"./provider-1018c8f1.js";import"./ExpansionCard-e912aff3.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-3cbd31df.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./BackButton-2183a9fc.js";import"./LenkeKnapp-9b88ce13.js";import"./stønadskontoer-1088bac0.js";import"./Ingress-6c1bbb1b.js";import"./InfoOmSøknaden-dc520488.js";const q="/innsyn/v2/annenPartVedtak",S="/konto",P=G,g=h,Ze={title:"steps/uttaksplan-info/MorFarAdopsjon",component:v,decorators:[b]},d=e=>{const L=p=>{p.onPost(q).replyOnce(200,void 0,B.FINISHED),p.onGet(S).replyOnce(200,e.stønadskonto100),p.onGet(S).replyOnce(200,e.stønadskonto80)};return k.jsx(K,{mock:L,children:k.jsx(J,{initialState:{[n.SØKERSITUASJON]:{situasjon:"adopsjon",rolle:e.erMor?"mor":"far"},[n.OM_BARNET]:{type:j.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:C("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad},[n.SØKER]:e.søker,[n.ANNEN_FORELDER]:e.annenForelder},children:k.jsx(v,{søkerInfo:H(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},t=d.bind({});t.args={stønadskonto100:U,stønadskonto80:I,søkerinfo:g,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:i.HUNDRE_PROSENT};const o=d.bind({});o.args={stønadskonto100:U,stønadskonto80:I,søkerinfo:g,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:i.ÅTTI_PROSENT};const r=d.bind({});r.args={stønadskonto100:l,stønadskonto80:m,erMor:!0,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:i.HUNDRE_PROSENT};const a=d.bind({});a.args={stønadskonto100:l,stønadskonto80:m,erMor:!1,annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:P,dekningsgrad:i.HUNDRE_PROSENT};const s=d.bind({});s.args={stønadskonto100:l,stønadskonto80:m,erMor:!1,annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:P,dekningsgrad:i.ÅTTI_PROSENT};var D,x,N;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'adopsjon',
        rolle: args.erMor ? 'mor' : 'far'
      },
      [ContextDataType.OM_BARNET]: {
        type: BarnType.ADOPTERT_ANNET_BARN,
        antallBarn: 1,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [],
        omsorgsovertakelse: []
      },
      [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
        dekningsgrad: args.dekningsgrad
      },
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(N=(x=t.parameters)==null?void 0:x.docs)==null?void 0:N.source}}};var T,c,E;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'adopsjon',
        rolle: args.erMor ? 'mor' : 'far'
      },
      [ContextDataType.OM_BARNET]: {
        type: BarnType.ADOPTERT_ANNET_BARN,
        antallBarn: 1,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [],
        omsorgsovertakelse: []
      },
      [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
        dekningsgrad: args.dekningsgrad
      },
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(E=(c=o.parameters)==null?void 0:c.docs)==null?void 0:E.source}}};var f,F,A;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'adopsjon',
        rolle: args.erMor ? 'mor' : 'far'
      },
      [ContextDataType.OM_BARNET]: {
        type: BarnType.ADOPTERT_ANNET_BARN,
        antallBarn: 1,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [],
        omsorgsovertakelse: []
      },
      [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
        dekningsgrad: args.dekningsgrad
      },
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(A=(F=r.parameters)==null?void 0:F.docs)==null?void 0:A.source}}};var O,R,M;a.parameters={...a.parameters,docs:{...(O=a.parameters)==null?void 0:O.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'adopsjon',
        rolle: args.erMor ? 'mor' : 'far'
      },
      [ContextDataType.OM_BARNET]: {
        type: BarnType.ADOPTERT_ANNET_BARN,
        antallBarn: 1,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [],
        omsorgsovertakelse: []
      },
      [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
        dekningsgrad: args.dekningsgrad
      },
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(M=(R=a.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var _,u,y;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'adopsjon',
        rolle: args.erMor ? 'mor' : 'far'
      },
      [ContextDataType.OM_BARNET]: {
        type: BarnType.ADOPTERT_ANNET_BARN,
        antallBarn: 1,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [],
        omsorgsovertakelse: []
      },
      [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
        dekningsgrad: args.dekningsgrad
      },
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(y=(u=s.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};const $e=["UttaksplanMedAleneomsorgDekningsgrad100","UttaksplanMedAleneomsorgDekningsgrad80","UttaksplanMedDeltUttakDerMorSøker","UttaksplanMedDeltUttakDerFarSøker100","UttaksplanMedDeltUttakDerFarSøker80"];export{t as UttaksplanMedAleneomsorgDekningsgrad100,o as UttaksplanMedAleneomsorgDekningsgrad80,a as UttaksplanMedDeltUttakDerFarSøker100,s as UttaksplanMedDeltUttakDerFarSøker80,r as UttaksplanMedDeltUttakDerMorSøker,$e as __namedExportsOrder,Ze as default};
