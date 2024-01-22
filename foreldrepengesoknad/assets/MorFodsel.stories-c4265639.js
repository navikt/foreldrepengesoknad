import{j as g}from"./jsx-runtime-d079401a.js";import{w as v}from"./withRouter-d9926836.js";import{A as b}from"./AxiosMock-07682dd6.js";import{R as C}from"./useRequest-1bc7422a.js";import{s as y,a as L}from"./stønadskonto80-8e203d8f.js";import{s as K,a as G}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as I}from"./UttaksplanInfo-723ff517.js";import{F as h,C as t}from"./FpDataContext-6d6d78b0.js";import{m as j}from"./mapSøkerinfoDTO-7324950a.js";import{d as n}from"./Tidsperioden-2f191506.js";import{B as d}from"./barnUtils-42471e8d.js";import{D as k}from"./Periodene-93f75033.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./index-cdc86f56.js";import"./index-c74c9f7f.js";import"./index-54751434.js";import"./apiInterceptor-716e24db.js";import"./validation-631bcf6e.js";import"./dateFormValidation-f3ff7428.js";import"./dates-584a13c3.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-f1dbaf58.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-7ba66c63.js";import"./uttaksplanHarForMangeFlerbarnsuker-1b4dfbbf.js";import"./Perioden-756f4214.js";import"./uttaksPlanStatus-931b1d24.js";import"./stringUtils-e263f9a0.js";import"./useFpApiData-7196599a.js";import"./eksisterendeSakUtils-e1f0846a.js";import"./dateUtils-0d76b092.js";import"./timezone-29fa0fe3.js";import"./leggTilPeriode-bd13d552.js";import"./velkommenUtils-76cff43a.js";import"./index-47edccfa.js";import"./Tag-01a82302.js";import"./Link-13f307fd.js";import"./Uttaksplan-4220f9b0.js";import"./FormikFileUploader-06af9077.js";import"./AttachmentList-65372876.js";import"./Attachment-2a8e1687.js";import"./IntlProvider-5022d65e.js";import"./Alert-ea771e10.js";import"./provider-1018c8f1.js";import"./ExpansionCard-e912aff3.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-3cbd31df.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./BackButton-2183a9fc.js";import"./LenkeKnapp-9b88ce13.js";import"./stønadskontoer-1088bac0.js";import"./Ingress-6c1bbb1b.js";import"./InfoOmSøknaden-dc520488.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";const B={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},J={FORELDREPENGER:273,FORELDREPENGER_FØR_FØDSEL:15},H={farRundtFødsel:0,generellMinsterett:0,toTette:0},w={kontoer:J,minsteretter:H},q={FORELDREPENGER:323,FORELDREPENGER_FØR_FØDSEL:15},$={farRundtFødsel:0,generellMinsterett:0,toTette:0},V={kontoer:q,minsteretter:$},Y={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105},z={farRundtFødsel:0,generellMinsterett:0,toTette:0},Q={kontoer:Y,minsteretter:z},W={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},X={farRundtFødsel:0,generellMinsterett:0,toTette:0},Z={kontoer:W,minsteretter:X},ee="/innsyn/v2/annenPartVedtak",E="/konto",l=B,dn={title:"steps/uttaksplan-info/MorFødsel",component:I,decorators:[v]},p=e=>{const P=m=>{m.onPost(ee).replyOnce(200,void 0,C.FINISHED),m.onGet(E).replyOnce(200,e.stønadskonto100),m.onGet(E).replyOnce(200,e.stønadskonto80)};return g.jsx(b,{mock:P,children:g.jsx(h,{initialState:{[t.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[t.OM_BARNET]:e.barn,[t.SØKER]:e.søker,[t.ANNEN_FORELDER]:e.annenForelder,[t.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad}},children:g.jsx(I,{søkerInfo:j(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},r=p.bind({});r.args={stønadskonto100:y,stønadskonto80:L,søkerinfo:l,barn:{type:d.FØDT,fødselsdatoer:[n("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:k.HUNDRE_PROSENT};const o=p.bind({});o.args={stønadskonto100:y,stønadskonto80:L,søkerinfo:l,barn:{type:d.FØDT,fødselsdatoer:[n("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:k.ÅTTI_PROSENT};const a=p.bind({});a.args={stønadskonto100:w,stønadskonto80:V,barn:{type:d.FØDT,antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[n("2021-01-11").toDate()],termindato:n("2021-03-11").toDate()},annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:l,dekningsgrad:k.HUNDRE_PROSENT};const s=p.bind({});s.args={stønadskonto100:K,stønadskonto80:G,barn:{type:d.FØDT,fødselsdatoer:[n("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:l,dekningsgrad:k.HUNDRE_PROSENT};const i=p.bind({});i.args={stønadskonto100:Z,stønadskonto80:Q,barn:{type:d.FØDT,fødselsdatoer:[n("2021-03-15").toDate()],antallBarn:2,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:l,dekningsgrad:k.HUNDRE_PROSENT};var D,F,S;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'mor'
      },
      [ContextDataType.OM_BARNET]: args.barn,
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
      [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
        dekningsgrad: args.dekningsgrad
      }
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(S=(F=r.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};var c,x,R;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'mor'
      },
      [ContextDataType.OM_BARNET]: args.barn,
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
      [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
        dekningsgrad: args.dekningsgrad
      }
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(R=(x=o.parameters)==null?void 0:x.docs)==null?void 0:R.source}}};var N,O,T;a.parameters={...a.parameters,docs:{...(N=a.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'mor'
      },
      [ContextDataType.OM_BARNET]: args.barn,
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
      [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
        dekningsgrad: args.dekningsgrad
      }
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(T=(O=a.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var f,A,M;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'mor'
      },
      [ContextDataType.OM_BARNET]: args.barn,
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
      [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
        dekningsgrad: args.dekningsgrad
      }
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(M=(A=s.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var u,_,U;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'mor'
      },
      [ContextDataType.OM_BARNET]: args.barn,
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
      [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
        dekningsgrad: args.dekningsgrad
      }
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(U=(_=i.parameters)==null?void 0:_.docs)==null?void 0:U.source}}};const kn=["UttaksplanMedAleneomsorgDekningsgrad100","UttaksplanMedAleneomsorgDekningsgrad80","UttaksplanMedPrematurFødselDekningsgrad100","UttaksplanMedDeltUttakDekningsgrad100","UttaksplanMedFlerbarnsukerTvillingerDekningsgrad100"];export{r as UttaksplanMedAleneomsorgDekningsgrad100,o as UttaksplanMedAleneomsorgDekningsgrad80,s as UttaksplanMedDeltUttakDekningsgrad100,i as UttaksplanMedFlerbarnsukerTvillingerDekningsgrad100,a as UttaksplanMedPrematurFødselDekningsgrad100,kn as __namedExportsOrder,dn as default};
