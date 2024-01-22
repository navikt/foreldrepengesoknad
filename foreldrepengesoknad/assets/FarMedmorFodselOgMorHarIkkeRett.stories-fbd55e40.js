import{j as s}from"./jsx-runtime-d079401a.js";import{w as T}from"./withRouter-d9926836.js";import{A as M}from"./AxiosMock-07682dd6.js";import{F as A,U as I}from"./UttaksplanInfo-723ff517.js";import{R as y}from"./useRequest-1bc7422a.js";import{F as u,C as n}from"./FpDataContext-6d6d78b0.js";import{m as U}from"./mapSøkerinfoDTO-7324950a.js";import{d as k}from"./Tidsperioden-2f191506.js";import{B as P}from"./barnUtils-42471e8d.js";import{D as N}from"./Periodene-93f75033.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./index-cdc86f56.js";import"./index-c74c9f7f.js";import"./index-54751434.js";import"./apiInterceptor-716e24db.js";import"./validation-631bcf6e.js";import"./dateFormValidation-f3ff7428.js";import"./dates-584a13c3.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-f1dbaf58.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-7ba66c63.js";import"./uttaksplanHarForMangeFlerbarnsuker-1b4dfbbf.js";import"./Perioden-756f4214.js";import"./uttaksPlanStatus-931b1d24.js";import"./stringUtils-e263f9a0.js";import"./useFpApiData-7196599a.js";import"./eksisterendeSakUtils-e1f0846a.js";import"./dateUtils-0d76b092.js";import"./timezone-29fa0fe3.js";import"./leggTilPeriode-bd13d552.js";import"./velkommenUtils-76cff43a.js";import"./index-47edccfa.js";import"./Tag-01a82302.js";import"./Link-13f307fd.js";import"./Uttaksplan-4220f9b0.js";import"./FormikFileUploader-06af9077.js";import"./AttachmentList-65372876.js";import"./Attachment-2a8e1687.js";import"./IntlProvider-5022d65e.js";import"./Alert-ea771e10.js";import"./provider-1018c8f1.js";import"./ExpansionCard-e912aff3.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-3cbd31df.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./BackButton-2183a9fc.js";import"./LenkeKnapp-9b88ce13.js";import"./stønadskontoer-1088bac0.js";import"./Ingress-6c1bbb1b.js";import"./InfoOmSøknaden-dc520488.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";const _={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},v={FORELDREPENGER:250},L={farRundtFødsel:0,generellMinsterett:0,toTette:0},i={kontoer:v,minsteretter:L},b={FORELDREPENGER:200},C={farRundtFødsel:0,generellMinsterett:0,toTette:0},d={kontoer:b,minsteretter:C},K="/innsyn/v2/annenPartVedtak",m="/konto",p=_,Be={title:"steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett",component:A,decorators:[T]},l=e=>{const O=a=>{a.onPost(K).replyOnce(200,void 0,y.FINISHED),a.onGet(m).replyOnce(200,e.stønadskonto100),a.onGet(m).replyOnce(200,e.stønadskonto80)};return s.jsx(M,{mock:O,children:s.jsx(u,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:{type:P.FØDT,fødselsdatoer:[k("2021-07-01").toDate()],antallBarn:1,termindato:k("2021-07-01").toDate()},[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad},[n.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.ANNEN_FORELDER]:e.annenForelder},children:s.jsx(I,{søkerInfo:U(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},t=l.bind({});t.args={stønadskonto100:d,stønadskonto80:i,søkerinfo:p,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:N.HUNDRE_PROSENT};const r=l.bind({});r.args={stønadskonto100:d,stønadskonto80:i,søkerinfo:p,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1},dekningsgrad:N.ÅTTI_PROSENT};const o=l.bind({});o.args={stønadskonto100:d,stønadskonto80:i,søkerinfo:p,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1}};var f,g,F;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
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
        </AxiosMock>;
}`,...(F=(g=t.parameters)==null?void 0:g.docs)==null?void 0:F.source}}};var D,S,x;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
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
        </AxiosMock>;
}`,...(x=(S=r.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var E,c,R;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
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
        </AxiosMock>;
}`,...(R=(c=o.parameters)==null?void 0:c.docs)==null?void 0:R.source}}};const Je=["UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad100","UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad80","UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør"];export{t as UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad100,r as UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad80,o as UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør,Je as __namedExportsOrder,Be as default};
