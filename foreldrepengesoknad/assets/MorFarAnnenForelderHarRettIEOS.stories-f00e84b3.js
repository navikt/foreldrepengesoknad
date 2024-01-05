import{j as m}from"./jsx-runtime-d079401a.js";import{w as I}from"./withRouter-d9926836.js";import{A as v}from"./AxiosMock-3df40305.js";import{R as y}from"./api-1c24fad2.js";import{a as _,_ as b}from"./søkerinfoFarSøker-922c6b69.js";import{s as i,a as p}from"./stønadskonto80-8e203d8f.js";import{U as u}from"./UttaksplanInfo-e41da42b.js";import{F as j,C as s}from"./FpDataContext-fc20d236.js";import{m as P}from"./mapSøkerinfoDTO-316e2028.js";import{d as r}from"./Tidsperioden-71468199.js";import{B as d}from"./barnUtils-60ad9128.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./index-cdc86f56.js";import"./index-c74c9f7f.js";import"./index-54751434.js";import"./apiInterceptor-d706a9c9.js";import"./validation-631bcf6e.js";import"./dateFormValidation-8c43a610.js";import"./dates-7606e4ef.js";import"./Periodene-b6fd03fb.js";import"./Perioden-0b967748.js";import"./uttaksPlanStatus-69ecc948.js";import"./stringUtils-2538a4ea.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-0a9305c6.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-9effe5a6.js";import"./Uttaksplan-b07bb19a.js";import"./FormikFileUploader-5c434aae.js";import"./AttachmentList-fcbe49a5.js";import"./Attachment-337027e3.js";import"./Link-13f307fd.js";import"./IntlProvider-5721e0cc.js";import"./Alert-6cb625ce.js";import"./provider-ab3864c0.js";import"./ExpansionCard-6cb9278e.js";import"./links-b36d21ab.js";import"./leggTilPeriode-68dcef08.js";import"./arbeidsforholdUtils-3f6cf4ae.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./index-47edccfa.js";import"./BackButton-ba2bcb9d.js";import"./LenkeKnapp-9b88ce13.js";import"./InfoOmSøknaden-ce0dcaf6.js";import"./dateUtils-a5a4b101.js";import"./Ingress-6c1bbb1b.js";import"./eksisterendeSakUtils-1e410dc1.js";import"./velkommenUtils-55fb765a.js";import"./Tag-01a82302.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";const C="/innsyn/v2/annenPartVedtak",F="/konto",K=_,S=b,He={title:"steps/uttaksplan-info/MorFarAnnenForelderHarRettIEØS",component:u,decorators:[I]},l=e=>{const U=k=>{k.onPost(C).replyOnce(200,void 0,y.FINISHED),k.onGet(F).replyOnce(200,e.stønadskonto100),k.onGet(F).replyOnce(200,e.stønadskonto80)};return m.jsx(v,{mock:U,children:m.jsx(j,{initialState:{[s.SØKERSITUASJON]:e.søkersituasjon,[s.OM_BARNET]:e.barn,[s.SØKER]:e.søker,[s.ANNEN_FORELDER]:e.annenForelder},children:m.jsx(u,{søkerInfo:P(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},t=l.bind({});t.args={stønadskonto100:i,stønadskonto80:p,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,type:d.ADOPTERT_ANNET_BARN,adopsjonsdato:r("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},annenForelder:{fornavn:"Far",etternavn:"EØS",fnr:"1111UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:K};const n=l.bind({});n.args={stønadskonto100:i,stønadskonto80:p,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barn:{antallBarn:1,type:d.ADOPTERT_ANNET_BARN,adopsjonsdato:r("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:S};const o=l.bind({});o.args={stønadskonto100:i,stønadskonto80:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{type:d.ADOPTERT_ANNET_BARN,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[r("2022-06-14").toDate(),r("2022-06-14").toDate()],antallBarn:2,adopsjonsdato:void 0,adoptertIUtlandet:void 0},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:S};const a=l.bind({});a.args={stønadskonto100:i,stønadskonto80:p,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{dokumentasjonAvAleneomsorg:[],fødselsdatoer:[r("2022-06-14").toDate()],termindato:r("2022-08-14").toDate(),antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:d.FØDT},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:S};var x,f,c;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
