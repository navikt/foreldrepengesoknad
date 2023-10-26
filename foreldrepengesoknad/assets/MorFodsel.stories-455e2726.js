import{j as p}from"./jsx-runtime-69eee039.js";import{w as T}from"./withIntl-38d35964.js";import{w as U}from"./withRouter-15cc08d4.js";import{w as D,F as L}from"./ForeldrepengerStateMock-2ca64e3f.js";import{A as _}from"./AxiosMock-9c813813.js";import{R as x}from"./api-02a26928.js";import{s as P,a as I}from"./stønadskonto80-8e203d8f.js";import{s as G,a as K}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as N}from"./UttaksplanInfo-1e87ebb3.js";import"./index-7c191284.js";import"./IntlProvider-b5f77251.js";import"./validationUtils-3e3f35a1.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-32a27317.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./useSøknad-67949f34.js";import"./mapSøkerinfoDTO-c2e267b6.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-ccd0af0e.js";import"./amplitude-bdf1e125.js";import"./submitUtils-3190d349.js";import"./Periodene-52ff0d39.js";import"./apiInterceptor-c6c2844c.js";import"./leggTilPeriode-6be5dfc1.js";import"./Uttaksplan-063eebcd.js";import"./FormikFileUploader-a3627c10.js";import"./AttachmentList-ca8f0ac5.js";import"./Attachment-f47bbeea.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-ee247546.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-e5198354.js";import"./formUtils-628645da.js";import"./useSøkerinfo-7098b049.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-50e7887d.js";import"./useOnValidSubmit-9255204e.js";import"./dateUtils-5eafd83c.js";import"./eksisterendeSakUtils-39804c4a.js";import"./velkommenUtils-8cac9cb6.js";const v={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},y=4,b="/soknad/uttaksplan-info",j={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{type:"født",fødselsdatoer:["2021-03-15"],antallBarn:1,datoForAleneomsorg:"",dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{språkkode:"nb"},informasjonOmUtenlandsopphold:{tidligereOpphold:[],senereOpphold:[]},erEndringssøknad:!1,tilleggsopplysninger:{}},version:y,currentRoute:b,søknadGjelderEtNyttBarn:!0},h={FORELDREPENGER:273,FORELDREPENGER_FØR_FØDSEL:15},w={farRundtFødsel:0,generellMinsterett:0,toTette:0},B={kontoer:h,minsteretter:w},V={FORELDREPENGER:323,FORELDREPENGER_FØR_FØDSEL:15},$={farRundtFødsel:0,generellMinsterett:0,toTette:0},q={kontoer:V,minsteretter:$},C={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105},H={farRundtFødsel:0,generellMinsterett:0,toTette:0},Y={kontoer:C,minsteretter:H},z={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},J={farRundtFødsel:0,generellMinsterett:0,toTette:0},Q={kontoer:z,minsteretter:J},W="/innsyn/v2/annenPartVedtak",i="/konto",a=v,e=j,Be={title:"steps/uttaksplan-info/MorFødsel",component:N,decorators:[U,T,D]},k=s=>{const A=d=>{d.onPost(W).replyOnce(200,void 0,x.FINISHED),d.onGet(i).replyOnce(200,s.stønadskonto100),d.onGet(i).replyOnce(200,s.stønadskonto80)};return p.jsx(_,{mock:A,children:p.jsx(L,{søknad:s.context,søkerinfo:s.søkerinfo,children:p.jsx(N,{})})})},t=k.bind({});t.args={stønadskonto100:P,stønadskonto80:I,context:e,søkerinfo:a};const n=k.bind({});n.args={stønadskonto100:B,stønadskonto80:q,context:{...e,søknad:{...e.søknad,barn:{...e.søknad.barn,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"}}},søkerinfo:a};const o=k.bind({});o.args={stønadskonto100:G,stønadskonto80:K,context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:a};const r=k.bind({});r.args={stønadskonto100:Q,stønadskonto80:Y,context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,erAleneOmOmsorg:!1},barn:{...e.søknad.barn,antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:a};var c,l,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={(args.context as ForeldrepengesøknadContextState)} søkerinfo={(args.søkerinfo as SøkerinfoDTO)}>
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var E,f,R;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={(args.context as ForeldrepengesøknadContextState)} søkerinfo={(args.søkerinfo as SøkerinfoDTO)}>
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(R=(f=n.parameters)==null?void 0:f.docs)==null?void 0:R.source}}};var g,M,S;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={(args.context as ForeldrepengesøknadContextState)} søkerinfo={(args.søkerinfo as SøkerinfoDTO)}>
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(S=(M=o.parameters)==null?void 0:M.docs)==null?void 0:S.source}}};var O,u,F;r.parameters={...r.parameters,docs:{...(O=r.parameters)==null?void 0:O.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={(args.context as ForeldrepengesøknadContextState)} søkerinfo={(args.søkerinfo as SøkerinfoDTO)}>
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(F=(u=r.parameters)==null?void 0:u.docs)==null?void 0:F.source}}};const Ve=["UttaksplanMedAleneomsorg","UttaksplanMedPrematurFødsel","UttaksplanMedDeltUttak","UttaksplanMedFlerbarnsukerTvillinger"];export{t as UttaksplanMedAleneomsorg,o as UttaksplanMedDeltUttak,r as UttaksplanMedFlerbarnsukerTvillinger,n as UttaksplanMedPrematurFødsel,Ve as __namedExportsOrder,Be as default};
//# sourceMappingURL=MorFodsel.stories-455e2726.js.map
