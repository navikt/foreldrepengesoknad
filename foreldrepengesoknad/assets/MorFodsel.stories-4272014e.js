import{j as p}from"./jsx-runtime-69eee039.js";import{w as U}from"./withRouter-f0df7a0f.js";import{A as L}from"./AxiosMock-ee1c53ff.js";import{R as y}from"./api-f9eb18d1.js";import{s as x,a as _}from"./stønadskonto80-8e203d8f.js";import{s as v,a as b}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as M}from"./UttaksplanInfo-c257ae88.js";import{F as I,C as s}from"./FpDataContext-75ac2616.js";import{m as K}from"./mapSøkerinfoDTO-268f32cb.js";import{d as a}from"./Tidsperioden-a95d044c.js";import{B as i}from"./barnUtils-6056f31e.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./validation-631bcf6e.js";import"./dateFormValidation-fedc3c4d.js";import"./Periodene-e4e7892a.js";import"./Perioden-f9b2043e.js";import"./uttaksPlanStatus-38959b58.js";import"./stringUtils-f4190696.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-527b68d8.js";import"./amplitude-140e185d.js";import"./routes-9effe5a6.js";import"./Uttaksplan-dd72c95e.js";import"./FormikFileUploader-4b48adc4.js";import"./AttachmentList-9dfeda58.js";import"./Attachment-267e6f8e.js";import"./Link-b834ea2b.js";import"./links-b36d21ab.js";import"./leggTilPeriode-514e4bf5.js";import"./arbeidsforholdUtils-a9257065.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./index-47edccfa.js";import"./BackButton-302225b0.js";import"./message-650a43cb.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-efcbcd44.js";import"./dateUtils-e2f5989d.js";import"./eksisterendeSakUtils-ef126668.js";import"./velkommenUtils-7e7dde66.js";import"./exports-70c8b745.js";import"./index-b3a39e30.js";import"./v4-a960c1f4.js";const C={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},P={FORELDREPENGER:273,FORELDREPENGER_FØR_FØDSEL:15},G={farRundtFødsel:0,generellMinsterett:0,toTette:0},h={kontoer:P,minsteretter:G},j={FORELDREPENGER:323,FORELDREPENGER_FØR_FØDSEL:15},B={farRundtFødsel:0,generellMinsterett:0,toTette:0},J={kontoer:j,minsteretter:B},H={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105},w={farRundtFødsel:0,generellMinsterett:0,toTette:0},$={kontoer:H,minsteretter:w},q={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},V={farRundtFødsel:0,generellMinsterett:0,toTette:0},Y={kontoer:q,minsteretter:V},z="/innsyn/v2/annenPartVedtak",m="/konto",d=C,$e={title:"steps/uttaksplan-info/MorFødsel",component:M,decorators:[U]},l=e=>{const u=k=>{k.onPost(z).replyOnce(200,void 0,y.FINISHED),k.onGet(m).replyOnce(200,e.stønadskonto100),k.onGet(m).replyOnce(200,e.stønadskonto80)};return p.jsx(L,{mock:u,children:p.jsx(I,{initialState:{[s.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[s.OM_BARNET]:e.barn,[s.SØKER]:e.søker,[s.ANNEN_FORELDER]:e.annenForelder},children:p.jsx(M,{søkerInfo:K(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>{},avbrytSøknad:()=>{}})})})},n=l.bind({});n.args={stønadskonto100:x,stønadskonto80:_,søkerinfo:d,barn:{type:i.FØDT,fødselsdatoer:[a("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1}};const t=l.bind({});t.args={stønadskonto100:h,stønadskonto80:J,barn:{type:i.FØDT,antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[a("2021-01-11").toDate()],termindato:a("2021-03-11").toDate()},annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:d};const o=l.bind({});o.args={stønadskonto100:v,stønadskonto80:b,barn:{type:i.FØDT,fødselsdatoer:[a("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:d};const r=l.bind({});r.args={stønadskonto100:Y,stønadskonto80:$,barn:{type:i.FØDT,fødselsdatoer:[a("2021-03-15").toDate()],antallBarn:2,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:d};var S,c,E;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
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
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => undefined} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(E=(c=n.parameters)==null?void 0:c.docs)==null?void 0:E.source}}};var f,N,R;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => undefined} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(R=(N=t.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var g,D,T;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => undefined} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(T=(D=o.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var O,A,F;r.parameters={...r.parameters,docs:{...(O=r.parameters)==null?void 0:O.docs,source:{originalSource:`args => {
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
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => undefined} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(F=(A=r.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};const qe=["UttaksplanMedAleneomsorg","UttaksplanMedPrematurFødsel","UttaksplanMedDeltUttak","UttaksplanMedFlerbarnsukerTvillinger"];export{n as UttaksplanMedAleneomsorg,o as UttaksplanMedDeltUttak,r as UttaksplanMedFlerbarnsukerTvillinger,t as UttaksplanMedPrematurFødsel,qe as __namedExportsOrder,$e as default};
//# sourceMappingURL=MorFodsel.stories-4272014e.js.map
