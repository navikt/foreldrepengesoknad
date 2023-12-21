import{j as k}from"./jsx-runtime-d079401a.js";import{w as u}from"./withRouter-056ed14f.js";import{A as U}from"./AxiosMock-b335a275.js";import{R as L}from"./api-012e6225.js";import{s as v,a as y}from"./stønadskonto80-8e203d8f.js";import{s as _,a as b}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as A}from"./UttaksplanInfo-bfd9a8b0.js";import{F as I,C as s}from"./FpDataContext-fc20d236.js";import{m as K}from"./mapSøkerinfoDTO-7e411b72.js";import{d as a}from"./Tidsperioden-3002fbcf.js";import{B as i}from"./barnUtils-8c22398e.js";import"./index-2d278ef6.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./index-aa2fc0fb.js";import"./index-c74c9f7f.js";import"./index-7358cd3c.js";import"./apiInterceptor-87eb5c75.js";import"./validation-631bcf6e.js";import"./dateFormValidation-d4e4c2de.js";import"./dates-e23605ab.js";import"./Periodene-eb4acb3d.js";import"./Perioden-a73e7b2e.js";import"./uttaksPlanStatus-37602e5d.js";import"./stringUtils-cd9fb11b.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-b6e898fd.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-9effe5a6.js";import"./Uttaksplan-60d1b751.js";import"./FormikFileUploader-3e2ae5ac.js";import"./AttachmentList-9086cb42.js";import"./Attachment-7f8cbc4d.js";import"./Link-13f307fd.js";import"./IntlProvider-59fbacb9.js";import"./Alert-9862fade.js";import"./provider-b0315b4d.js";import"./ExpansionCard-4dcdeb60.js";import"./links-b36d21ab.js";import"./leggTilPeriode-fb11b07f.js";import"./arbeidsforholdUtils-3b137883.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./index-47edccfa.js";import"./BackButton-4d0e617c.js";import"./LenkeKnapp-9b88ce13.js";import"./InfoOmSøknaden-e4246c8a.js";import"./dateUtils-3c2e894e.js";import"./Ingress-6c1bbb1b.js";import"./eksisterendeSakUtils-e0da6232.js";import"./velkommenUtils-fefe7e6b.js";import"./Tag-01a82302.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";const P={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},C={FORELDREPENGER:273,FORELDREPENGER_FØR_FØDSEL:15},G={farRundtFødsel:0,generellMinsterett:0,toTette:0},h={kontoer:C,minsteretter:G},j={FORELDREPENGER:323,FORELDREPENGER_FØR_FØDSEL:15},B={farRundtFødsel:0,generellMinsterett:0,toTette:0},J={kontoer:j,minsteretter:B},H={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105},w={farRundtFødsel:0,generellMinsterett:0,toTette:0},$={kontoer:H,minsteretter:w},q={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},V={farRundtFødsel:0,generellMinsterett:0,toTette:0},Y={kontoer:q,minsteretter:V},z="/innsyn/v2/annenPartVedtak",m="/konto",l=P,Xe={title:"steps/uttaksplan-info/MorFødsel",component:A,decorators:[u]},d=e=>{const M=p=>{p.onPost(z).replyOnce(200,void 0,L.FINISHED),p.onGet(m).replyOnce(200,e.stønadskonto100),p.onGet(m).replyOnce(200,e.stønadskonto80)};return k.jsx(U,{mock:M,children:k.jsx(I,{initialState:{[s.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[s.OM_BARNET]:e.barn,[s.SØKER]:e.søker,[s.ANNEN_FORELDER]:e.annenForelder},children:k.jsx(A,{søkerInfo:K(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},n=d.bind({});n.args={stønadskonto100:v,stønadskonto80:y,søkerinfo:l,barn:{type:i.FØDT,fødselsdatoer:[a("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1}};const t=d.bind({});t.args={stønadskonto100:h,stønadskonto80:J,barn:{type:i.FØDT,antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[a("2021-01-11").toDate()],termindato:a("2021-03-11").toDate()},annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:l};const o=d.bind({});o.args={stønadskonto100:_,stønadskonto80:b,barn:{type:i.FØDT,fødselsdatoer:[a("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:l};const r=d.bind({});r.args={stønadskonto100:Y,stønadskonto80:$,barn:{type:i.FØDT,fødselsdatoer:[a("2021-03-15").toDate()],antallBarn:2,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:l};var F,S,c;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
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
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(c=(S=n.parameters)==null?void 0:S.docs)==null?void 0:c.source}}};var E,x,D;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
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
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(D=(x=t.parameters)==null?void 0:x.docs)==null?void 0:D.source}}};var f,N,R;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(R=(N=o.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var g,T,O;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(O=(T=r.parameters)==null?void 0:T.docs)==null?void 0:O.source}}};const Ze=["UttaksplanMedAleneomsorg","UttaksplanMedPrematurFødsel","UttaksplanMedDeltUttak","UttaksplanMedFlerbarnsukerTvillinger"];export{n as UttaksplanMedAleneomsorg,o as UttaksplanMedDeltUttak,r as UttaksplanMedFlerbarnsukerTvillinger,t as UttaksplanMedPrematurFødsel,Ze as __namedExportsOrder,Xe as default};
