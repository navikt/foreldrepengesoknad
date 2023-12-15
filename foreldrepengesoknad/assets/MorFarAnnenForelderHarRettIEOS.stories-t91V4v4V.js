import{j as m}from"./jsx-runtime-DtaoT6pD.js";import{w as I}from"./withRouter-Y7oi-tYz.js";import{A as _}from"./AxiosMock-KQlr1Nb8.js";import{R as v}from"./api-nwdwJ8k1.js";import{a as y,_ as b}from"./søkerinfoFarSøker-mUwmt_aG.js";import{s as i,a as p}from"./stønadskonto80-DK_Zcf7b.js";import{U as u}from"./UttaksplanInfo-1ftd1JtX.js";import{F as j,C as s}from"./FpDataContext-vZKgGA8_.js";import{m as P}from"./mapSøkerinfoDTO-X1iCqeel.js";import{d as r}from"./Tidsperioden-aDyM1aIt.js";import{B as d}from"./barnUtils-YBZ_J5GH.js";import"./index-rOAPTY5O.js";import"./index-OjgoNOWw.js";import"./_baseToString-c7_W74Ua.js";import"./_createSet-hSZRoo1M.js";import"./index-U0S_AV9L.js";import"./index-mQqIOHEI.js";import"./index-8mLkeWaP.js";import"./apiInterceptor-aGCWLuNT.js";import"./validation-zAycEoXM.js";import"./dateFormValidation-LIdg5doX.js";import"./dates-pF37sd5-.js";import"./Periodene-dmpQllk8.js";import"./Perioden-ccnBD1r4.js";import"./uttaksPlanStatus-Ux938-AR.js";import"./stringUtils-m7w95leF.js";import"./isFarEllerMedmor-2H8vc5u5.js";import"./stepsConfig-6IAMv_G2.js";import"./amplitude--qTo3lH-.js";import"./amplitude.esm-OOIXs19H.js";import"./routes-IIwIGa6S.js";import"./Uttaksplan-GZqC5Bsc.js";import"./FormikFileUploader-XFuJ_PjZ.js";import"./AttachmentList-CvR0xonp.js";import"./Attachment-EeWnTSCv.js";import"./Link-IggFwnrW.js";import"./IntlProvider-n6iBafS0.js";import"./Alert-4KefUeFm.js";import"./provider-wwBoMs8b.js";import"./ExpansionCard-On_KGJWn.js";import"./links-BwIVhdNo.js";import"./leggTilPeriode-1WOgGzhw.js";import"./arbeidsforholdUtils-UowGK9vl.js";import"./_baseIteratee-j829L0Q9.js";import"./_baseUniq-2KlOTSab.js";import"./index-w2TxLgAC.js";import"./BackButton--zvB_H1P.js";import"./LenkeKnapp-VMWcRTHZ.js";import"./InfoOmSøknaden-i6kAOb9q.js";import"./dateUtils-C1bi-gXk.js";import"./Ingress-xQnNY-7S.js";import"./eksisterendeSakUtils-jLccwDDy.js";import"./velkommenUtils-omywOvJJ.js";import"./Tag-WODZmQq7.js";import"./index-lbrLmSir.js";import"./v4-yQnnJER4.js";const C="/innsyn/v2/annenPartVedtak",F="/konto",K=y,S=b,He={title:"steps/uttaksplan-info/MorFarAnnenForelderHarRettIEØS",component:u,decorators:[I]},k=e=>{const U=l=>{l.onPost(C).replyOnce(200,void 0,v.FINISHED),l.onGet(F).replyOnce(200,e.stønadskonto100),l.onGet(F).replyOnce(200,e.stønadskonto80)};return m.jsx(_,{mock:U,children:m.jsx(j,{initialState:{[s.SØKERSITUASJON]:e.søkersituasjon,[s.OM_BARNET]:e.barn,[s.SØKER]:e.søker,[s.ANNEN_FORELDER]:e.annenForelder},children:m.jsx(u,{søkerInfo:P(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},t=k.bind({});t.args={stønadskonto100:i,stønadskonto80:p,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,type:d.ADOPTERT_ANNET_BARN,adopsjonsdato:r("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},annenForelder:{fornavn:"Far",etternavn:"EØS",fnr:"1111UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:K};const n=k.bind({});n.args={stønadskonto100:i,stønadskonto80:p,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barn:{antallBarn:1,type:d.ADOPTERT_ANNET_BARN,adopsjonsdato:r("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:S};const o=k.bind({});o.args={stønadskonto100:i,stønadskonto80:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{type:d.ADOPTERT_ANNET_BARN,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[r("2022-06-14").toDate(),r("2022-06-14").toDate()],antallBarn:2,adopsjonsdato:void 0,adoptertIUtlandet:void 0},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:S};const a=k.bind({});a.args={stønadskonto100:i,stønadskonto80:p,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{dokumentasjonAvAleneomsorg:[],fødselsdatoer:[r("2022-06-14").toDate()],termindato:r("2022-08-14").toDate(),antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:d.FØDT},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:S};var x,f,c;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
      [ContextDataType.OM_BARNET]: args.barn,
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(c=(f=t.parameters)==null?void 0:f.docs)==null?void 0:c.source}}};var g,N,A;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
      [ContextDataType.OM_BARNET]: args.barn,
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(A=(N=n.parameters)==null?void 0:N.docs)==null?void 0:A.source}}};var O,T,D;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
      [ContextDataType.OM_BARNET]: args.barn,
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(D=(T=o.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var E,R,M;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
      [ContextDataType.OM_BARNET]: args.barn,
      [ContextDataType.SØKER]: args.søker,
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(M=(R=a.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};const Be=["UttaksplanAdopsjonMorSøkerFarHarRettIEOS","UttaksplanAdopsjonFarSøkerMorHarRettIEOS","UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger","UttaksplanFødselMorSøkerFarHarRettIEOSPrematur"];export{n as UttaksplanAdopsjonFarSøkerMorHarRettIEOS,t as UttaksplanAdopsjonMorSøkerFarHarRettIEOS,o as UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger,a as UttaksplanFødselMorSøkerFarHarRettIEOSPrematur,Be as __namedExportsOrder,He as default};
