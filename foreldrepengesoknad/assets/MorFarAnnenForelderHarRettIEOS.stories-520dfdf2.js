import{j as S}from"./jsx-runtime-d079401a.js";import{w as _}from"./withRouter-d9926836.js";import{A as y}from"./AxiosMock-07682dd6.js";import{R as v}from"./useRequest-1bc7422a.js";import{a as P,_ as b}from"./søkerinfoFarSøker-922c6b69.js";import{s as i,a as p}from"./stønadskonto80-8e203d8f.js";import{U as u}from"./UttaksplanInfo-723ff517.js";import{F as j,C as r}from"./FpDataContext-6d6d78b0.js";import{m as C}from"./mapSøkerinfoDTO-7324950a.js";import{d as n}from"./Tidsperioden-2f191506.js";import{B as d}from"./barnUtils-42471e8d.js";import{D as k}from"./Periodene-93f75033.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./index-cdc86f56.js";import"./index-c74c9f7f.js";import"./index-54751434.js";import"./apiInterceptor-716e24db.js";import"./validation-631bcf6e.js";import"./dateFormValidation-f3ff7428.js";import"./dates-584a13c3.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-f1dbaf58.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-7ba66c63.js";import"./uttaksplanHarForMangeFlerbarnsuker-1b4dfbbf.js";import"./Perioden-756f4214.js";import"./uttaksPlanStatus-931b1d24.js";import"./stringUtils-e263f9a0.js";import"./useFpApiData-7196599a.js";import"./eksisterendeSakUtils-e1f0846a.js";import"./dateUtils-0d76b092.js";import"./timezone-29fa0fe3.js";import"./leggTilPeriode-bd13d552.js";import"./velkommenUtils-76cff43a.js";import"./index-47edccfa.js";import"./Tag-01a82302.js";import"./Link-13f307fd.js";import"./Uttaksplan-4220f9b0.js";import"./FormikFileUploader-06af9077.js";import"./AttachmentList-65372876.js";import"./Attachment-2a8e1687.js";import"./IntlProvider-5022d65e.js";import"./Alert-ea771e10.js";import"./provider-1018c8f1.js";import"./ExpansionCard-e912aff3.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-3cbd31df.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./BackButton-2183a9fc.js";import"./LenkeKnapp-9b88ce13.js";import"./stønadskontoer-1088bac0.js";import"./Ingress-6c1bbb1b.js";import"./InfoOmSøknaden-dc520488.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";const L="/innsyn/v2/annenPartVedtak",E="/konto",K=P,g=b,we={title:"steps/uttaksplan-info/MorFarAnnenForelderHarRettIEØS",component:u,decorators:[_]},l=e=>{const I=m=>{m.onPost(L).replyOnce(200,void 0,v.FINISHED),m.onGet(E).replyOnce(200,e.stønadskonto100),m.onGet(E).replyOnce(200,e.stønadskonto80)};return S.jsx(y,{mock:I,children:S.jsx(j,{initialState:{[r.SØKERSITUASJON]:e.søkersituasjon,[r.OM_BARNET]:e.barn,[r.SØKER]:e.søker,[r.ANNEN_FORELDER]:e.annenForelder,[r.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad}},children:S.jsx(u,{søkerInfo:C(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},t=l.bind({});t.args={stønadskonto100:i,stønadskonto80:p,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,type:d.ADOPTERT_ANNET_BARN,adopsjonsdato:n("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},annenForelder:{fornavn:"Far",etternavn:"EØS",fnr:"1111UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:K,dekningsgrad:k.HUNDRE_PROSENT};const a=l.bind({});a.args={stønadskonto100:i,stønadskonto80:p,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barn:{antallBarn:1,type:d.ADOPTERT_ANNET_BARN,adopsjonsdato:n("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:k.HUNDRE_PROSENT};const o=l.bind({});o.args={stønadskonto100:i,stønadskonto80:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{type:d.ADOPTERT_ANNET_BARN,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[n("2022-06-14").toDate(),n("2022-06-14").toDate()],antallBarn:2,adopsjonsdato:void 0,adoptertIUtlandet:void 0},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:k.HUNDRE_PROSENT};const s=l.bind({});s.args={stønadskonto100:i,stønadskonto80:p,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{dokumentasjonAvAleneomsorg:[],fødselsdatoer:[n("2022-06-14").toDate()],termindato:n("2022-08-14").toDate(),antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:d.FØDT},annenForelder:{fornavn:"Espen",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:k.HUNDRE_PROSENT};var F,x,N;t.parameters={...t.parameters,docs:{...(F=t.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
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
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
      [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
        dekningsgrad: args.dekningsgrad
      }
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(N=(x=t.parameters)==null?void 0:x.docs)==null?void 0:N.source}}};var f,D,c;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
      [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
        dekningsgrad: args.dekningsgrad
      }
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(c=(D=a.parameters)==null?void 0:D.docs)==null?void 0:c.source}}};var R,O,T;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`args => {
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
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
      [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
        dekningsgrad: args.dekningsgrad
      }
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(T=(O=o.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var A,M,U;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
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
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
      [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
        dekningsgrad: args.dekningsgrad
      }
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(U=(M=s.parameters)==null?void 0:M.docs)==null?void 0:U.source}}};const Ve=["UttaksplanAdopsjonMorSøkerFarHarRettIEOS","UttaksplanAdopsjonFarSøkerMorHarRettIEOS","UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger","UttaksplanFødselMorSøkerFarHarRettIEOSPrematur"];export{a as UttaksplanAdopsjonFarSøkerMorHarRettIEOS,t as UttaksplanAdopsjonMorSøkerFarHarRettIEOS,o as UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger,s as UttaksplanFødselMorSøkerFarHarRettIEOSPrematur,Ve as __namedExportsOrder,we as default};
