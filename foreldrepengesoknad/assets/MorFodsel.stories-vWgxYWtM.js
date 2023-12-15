import{j as k}from"./jsx-runtime-DtaoT6pD.js";import{w as u}from"./withRouter-Y7oi-tYz.js";import{A as U}from"./AxiosMock-KQlr1Nb8.js";import{R as _}from"./api-nwdwJ8k1.js";import{s as L,a as v}from"./stønadskonto80-DK_Zcf7b.js";import{s as y,a as b}from"./stønadskontoDeltUttak100-vHgwH-1x.js";import{U as A}from"./UttaksplanInfo-1ftd1JtX.js";import{F as I,C as s}from"./FpDataContext-vZKgGA8_.js";import{m as K}from"./mapSøkerinfoDTO-X1iCqeel.js";import{d as a}from"./Tidsperioden-aDyM1aIt.js";import{B as i}from"./barnUtils-YBZ_J5GH.js";import"./index-rOAPTY5O.js";import"./index-OjgoNOWw.js";import"./_baseToString-c7_W74Ua.js";import"./_createSet-hSZRoo1M.js";import"./index-U0S_AV9L.js";import"./index-mQqIOHEI.js";import"./index-8mLkeWaP.js";import"./apiInterceptor-aGCWLuNT.js";import"./validation-zAycEoXM.js";import"./dateFormValidation-LIdg5doX.js";import"./dates-pF37sd5-.js";import"./Periodene-dmpQllk8.js";import"./Perioden-ccnBD1r4.js";import"./uttaksPlanStatus-Ux938-AR.js";import"./stringUtils-m7w95leF.js";import"./isFarEllerMedmor-2H8vc5u5.js";import"./stepsConfig-6IAMv_G2.js";import"./amplitude--qTo3lH-.js";import"./amplitude.esm-OOIXs19H.js";import"./routes-IIwIGa6S.js";import"./Uttaksplan-GZqC5Bsc.js";import"./FormikFileUploader-XFuJ_PjZ.js";import"./AttachmentList-CvR0xonp.js";import"./Attachment-EeWnTSCv.js";import"./Link-IggFwnrW.js";import"./IntlProvider-n6iBafS0.js";import"./Alert-4KefUeFm.js";import"./provider-wwBoMs8b.js";import"./ExpansionCard-On_KGJWn.js";import"./links-BwIVhdNo.js";import"./leggTilPeriode-1WOgGzhw.js";import"./arbeidsforholdUtils-UowGK9vl.js";import"./_baseIteratee-j829L0Q9.js";import"./_baseUniq-2KlOTSab.js";import"./index-w2TxLgAC.js";import"./BackButton--zvB_H1P.js";import"./LenkeKnapp-VMWcRTHZ.js";import"./InfoOmSøknaden-i6kAOb9q.js";import"./dateUtils-C1bi-gXk.js";import"./Ingress-xQnNY-7S.js";import"./eksisterendeSakUtils-jLccwDDy.js";import"./velkommenUtils-omywOvJJ.js";import"./Tag-WODZmQq7.js";import"./index-lbrLmSir.js";import"./v4-yQnnJER4.js";const P={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},C={FORELDREPENGER:273,FORELDREPENGER_FØR_FØDSEL:15},G={farRundtFødsel:0,generellMinsterett:0,toTette:0},h={kontoer:C,minsteretter:G},j={FORELDREPENGER:323,FORELDREPENGER_FØR_FØDSEL:15},B={farRundtFødsel:0,generellMinsterett:0,toTette:0},J={kontoer:j,minsteretter:B},H={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105},w={farRundtFødsel:0,generellMinsterett:0,toTette:0},$={kontoer:H,minsteretter:w},q={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},V={farRundtFødsel:0,generellMinsterett:0,toTette:0},Y={kontoer:q,minsteretter:V},z="/innsyn/v2/annenPartVedtak",m="/konto",l=P,Xe={title:"steps/uttaksplan-info/MorFødsel",component:A,decorators:[u]},d=e=>{const M=p=>{p.onPost(z).replyOnce(200,void 0,_.FINISHED),p.onGet(m).replyOnce(200,e.stønadskonto100),p.onGet(m).replyOnce(200,e.stønadskonto80)};return k.jsx(U,{mock:M,children:k.jsx(I,{initialState:{[s.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[s.OM_BARNET]:e.barn,[s.SØKER]:e.søker,[s.ANNEN_FORELDER]:e.annenForelder},children:k.jsx(A,{søkerInfo:K(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},n=d.bind({});n.args={stønadskonto100:L,stønadskonto80:v,søkerinfo:l,barn:{type:i.FØDT,fødselsdatoer:[a("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1}};const t=d.bind({});t.args={stønadskonto100:h,stønadskonto80:J,barn:{type:i.FØDT,antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[a("2021-01-11").toDate()],termindato:a("2021-03-11").toDate()},annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:l};const o=d.bind({});o.args={stønadskonto100:y,stønadskonto80:b,barn:{type:i.FØDT,fødselsdatoer:[a("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:l};const r=d.bind({});r.args={stønadskonto100:Y,stønadskonto80:$,barn:{type:i.FØDT,fødselsdatoer:[a("2021-03-15").toDate()],antallBarn:2,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:l};var F,S,c;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
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
