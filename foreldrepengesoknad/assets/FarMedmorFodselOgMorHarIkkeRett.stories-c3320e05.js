import{j as a}from"./jsx-runtime-d079401a.js";import{w as D}from"./withRouter-d9926836.js";import{A as N}from"./AxiosMock-07682dd6.js";import{F as T,U as M}from"./UttaksplanInfo-34ab77b5.js";import{R as O}from"./api-528cc177.js";import{F as R,C as r}from"./FpDataContext-fc20d236.js";import{m as E}from"./mapSøkerinfoDTO-86909ed5.js";import{d as s}from"./Tidsperioden-549a8241.js";import{B as A}from"./barnUtils-b4236b13.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./index-cdc86f56.js";import"./index-c74c9f7f.js";import"./index-54751434.js";import"./apiInterceptor-716e24db.js";import"./validation-631bcf6e.js";import"./dateFormValidation-a64a0967.js";import"./dates-ecaf3b81.js";import"./Periodene-443651a8.js";import"./Perioden-d0dc26e6.js";import"./uttaksPlanStatus-ac6850fa.js";import"./stringUtils-9f2698e1.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-584efc2f.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-9effe5a6.js";import"./Uttaksplan-5a058351.js";import"./FormikFileUploader-de9be667.js";import"./AttachmentList-fe789eb5.js";import"./Attachment-e940458b.js";import"./Link-13f307fd.js";import"./IntlProvider-9aafa776.js";import"./Alert-5aba7491.js";import"./provider-c07240b2.js";import"./ExpansionCard-a365c285.js";import"./links-4d39192e.js";import"./leggTilPeriode-39d94d59.js";import"./arbeidsforholdUtils-ed15d40e.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./index-47edccfa.js";import"./BackButton-13b1ac63.js";import"./LenkeKnapp-9b88ce13.js";import"./InfoOmSøknaden-9f7af3a1.js";import"./dateUtils-dc03d1f4.js";import"./Ingress-6c1bbb1b.js";import"./eksisterendeSakUtils-85625905.js";import"./velkommenUtils-a29d5515.js";import"./Tag-01a82302.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";const I={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},y={FORELDREPENGER:250},u={farRundtFødsel:0,generellMinsterett:0,toTette:0},F={kontoer:y,minsteretter:u},v={FORELDREPENGER:200},U={farRundtFødsel:0,generellMinsterett:0,toTette:0},S={kontoer:v,minsteretter:U},P="/innsyn/v2/annenPartVedtak",i="/konto",c=I,_e={title:"steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett",component:T,decorators:[D]},x=n=>{const g=o=>{o.onPost(P).replyOnce(200,void 0,O.FINISHED),o.onGet(i).replyOnce(200,n.stønadskonto100),o.onGet(i).replyOnce(200,n.stønadskonto80)};return a.jsx(N,{mock:g,children:a.jsx(R,{initialState:{[r.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[r.OM_BARNET]:{type:A.FØDT,fødselsdatoer:[s("2021-07-01").toDate()],antallBarn:1,termindato:s("2021-07-01").toDate()},[r.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[r.ANNEN_FORELDER]:n.annenForelder},children:a.jsx(M,{søkerInfo:E(n.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},e=x.bind({});e.args={stønadskonto100:S,stønadskonto80:F,søkerinfo:c,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1}};const t=x.bind({});t.args={stønadskonto100:S,stønadskonto80:F,søkerinfo:c,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1}};var p,d,l;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(l=(d=e.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var m,k,f;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(f=(k=t.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};const Le=["UttaksplanDerMorIkkeHarRettPåForeldrepenger","UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør"];export{e as UttaksplanDerMorIkkeHarRettPåForeldrepenger,t as UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør,Le as __namedExportsOrder,_e as default};
