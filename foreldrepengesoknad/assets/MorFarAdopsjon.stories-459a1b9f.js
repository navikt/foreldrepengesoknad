import{j as s}from"./jsx-runtime-d079401a.js";import{d as M}from"./Tidsperioden-230fda20.js";import{B as O}from"./barnUtils-2bd29a1c.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{w as E}from"./withRouter-d9926836.js";import{A as R}from"./AxiosMock-07682dd6.js";import{R as u}from"./api-acf7fa45.js";import{_ as y,a as U}from"./søkerinfoFarSøker-922c6b69.js";import{s as _,a as v}from"./stønadskonto80-8e203d8f.js";import{s as A,a as T}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as D}from"./UttaksplanInfo-9513b04c.js";import{F as I,C as r}from"./FpDataContext-fc20d236.js";import{m as j}from"./mapSøkerinfoDTO-14d7e333.js";import"./index-b580f7e8.js";import"./Link-13f307fd.js";import"./index-c74c9f7f.js";import"./v4-4a60fe23.js";import"./index-cdc86f56.js";import"./index-54751434.js";import"./apiInterceptor-716e24db.js";import"./validation-631bcf6e.js";import"./dateFormValidation-dddb5e20.js";import"./dates-4e4840c2.js";import"./Periodene-c958b678.js";import"./Perioden-31b9a852.js";import"./uttaksPlanStatus-7c2b8508.js";import"./stringUtils-eb3a9bfa.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-9affe22d.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-9effe5a6.js";import"./Uttaksplan-191651b0.js";import"./FormikFileUploader-f71fd35e.js";import"./AttachmentList-30f0a3a2.js";import"./Attachment-6600bf58.js";import"./IntlProvider-bd7bfcec.js";import"./Alert-9b19f8ec.js";import"./provider-43a10218.js";import"./ExpansionCard-c8bb15c3.js";import"./links-4d39192e.js";import"./leggTilPeriode-b40b5c44.js";import"./arbeidsforholdUtils-07ae7a31.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./index-47edccfa.js";import"./BackButton-9bb476a6.js";import"./LenkeKnapp-9b88ce13.js";import"./InfoOmSøknaden-6c0b19f3.js";import"./dateUtils-0320eb73.js";import"./Ingress-6c1bbb1b.js";import"./eksisterendeSakUtils-5631da04.js";import"./velkommenUtils-41157145.js";import"./Tag-01a82302.js";const L="/innsyn/v2/annenPartVedtak",p="/konto",C=y,F=U,Be={title:"steps/uttaksplan-info/MorFarAdopsjon",component:D,decorators:[E]},i=e=>{const g=a=>{a.onPost(L).replyOnce(200,void 0,u.FINISHED),a.onGet(p).replyOnce(200,e.stønadskonto100),a.onGet(p).replyOnce(200,e.stønadskonto80)};return s.jsx(R,{mock:g,children:s.jsx(I,{initialState:{[r.SØKERSITUASJON]:{situasjon:"adopsjon",rolle:e.erMor?"mor":"far"},[r.OM_BARNET]:{type:O.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:M("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},[r.SØKER]:e.søker,[r.ANNEN_FORELDER]:e.annenForelder},children:s.jsx(D,{søkerInfo:j(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},n=i.bind({});n.args={stønadskonto100:_,stønadskonto80:v,søkerinfo:F,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1}};const o=i.bind({});o.args={stønadskonto100:A,stønadskonto80:T,erMor:!0,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:F};const t=i.bind({});t.args={stønadskonto100:A,stønadskonto80:T,erMor:!1,annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:C};var d,k,m;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
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
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(m=(k=n.parameters)==null?void 0:k.docs)==null?void 0:m.source}}};var l,S,f;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
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
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(f=(S=o.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var c,x,N;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(N=(x=t.parameters)==null?void 0:x.docs)==null?void 0:N.source}}};const he=["UttaksplanMedAleneomsorg","UttaksplanMedDeltUttakDerMorSøker","UttaksplanMedDeltUttakDerFarSøker"];export{n as UttaksplanMedAleneomsorg,t as UttaksplanMedDeltUttakDerFarSøker,o as UttaksplanMedDeltUttakDerMorSøker,he as __namedExportsOrder,Be as default};
