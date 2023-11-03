import{j as p}from"./jsx-runtime-69eee039.js";import{w as T}from"./withRouter-ab431e13.js";import{w as U,F as D}from"./ForeldrepengerStateMock-ae7feae9.js";import{A as L}from"./AxiosMock-5a6f61ee.js";import{R as _}from"./api-6765dbc0.js";import{s as x,a as P}from"./stønadskonto80-8e203d8f.js";import{s as I,a as G}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as N}from"./UttaksplanInfo-e8ef205c.js";import"./index-7c191284.js";import"./useSøknad-e5916e1e.js";import"./validationUtils-024c2399.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-1fb11dfb.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-695a75e8.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-b612c2e3.js";import"./amplitude-e7683f28.js";import"./submitUtils-db323592.js";import"./Periodene-7d2fd09b.js";import"./apiInterceptor-7ea9ce80.js";import"./leggTilPeriode-e3e6dffd.js";import"./Uttaksplan-ed9a705f.js";import"./index-dfb6bae5.js";import"./FormikFileUploader-8915696f.js";import"./AttachmentList-f19a2777.js";import"./Attachment-a9115a99.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-d8402a3d.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-5ffc9a17.js";import"./formUtils-a66fbbf6.js";import"./useSøkerinfo-17a18f9b.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-642a1e87.js";import"./useOnValidSubmit-63822350.js";import"./dateUtils-df7c4084.js";import"./eksisterendeSakUtils-f13344d6.js";import"./velkommenUtils-4288805c.js";const K={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},y=4,v="/soknad/uttaksplan-info",b={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{type:"født",fødselsdatoer:["2021-03-15"],antallBarn:1,datoForAleneomsorg:"",dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{språkkode:"nb"},informasjonOmUtenlandsopphold:{tidligereOpphold:[],senereOpphold:[]},erEndringssøknad:!1,tilleggsopplysninger:{}},version:y,currentRoute:v,søknadGjelderEtNyttBarn:!0},j={FORELDREPENGER:273,FORELDREPENGER_FØR_FØDSEL:15},h={farRundtFødsel:0,generellMinsterett:0,toTette:0},B={kontoer:j,minsteretter:h},V={FORELDREPENGER:323,FORELDREPENGER_FØR_FØDSEL:15},$={farRundtFødsel:0,generellMinsterett:0,toTette:0},q={kontoer:V,minsteretter:$},C={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105},H={farRundtFødsel:0,generellMinsterett:0,toTette:0},w={kontoer:C,minsteretter:H},Y={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},z={farRundtFødsel:0,generellMinsterett:0,toTette:0},J={kontoer:Y,minsteretter:z},Q="/innsyn/v2/annenPartVedtak",i="/konto",a=K,e=b,he={title:"steps/uttaksplan-info/MorFødsel",component:N,decorators:[T,U]},k=s=>{const A=d=>{d.onPost(Q).replyOnce(200,void 0,_.FINISHED),d.onGet(i).replyOnce(200,s.stønadskonto100),d.onGet(i).replyOnce(200,s.stønadskonto80)};return p.jsx(L,{mock:A,children:p.jsx(D,{søknad:s.context,søkerinfo:s.søkerinfo,children:p.jsx(N,{})})})},t=k.bind({});t.args={stønadskonto100:x,stønadskonto80:P,context:e,søkerinfo:a};const n=k.bind({});n.args={stønadskonto100:B,stønadskonto80:q,context:{...e,søknad:{...e.søknad,barn:{...e.søknad.barn,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"}}},søkerinfo:a};const o=k.bind({});o.args={stønadskonto100:I,stønadskonto80:G,context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:a};const r=k.bind({});r.args={stønadskonto100:J,stønadskonto80:w,context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,erAleneOmOmsorg:!1},barn:{...e.søknad.barn,antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:a};var c,l,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var E,R,f;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
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
}`,...(f=(R=n.parameters)==null?void 0:R.docs)==null?void 0:f.source}}};var g,M,S;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(F=(u=r.parameters)==null?void 0:u.docs)==null?void 0:F.source}}};const Be=["UttaksplanMedAleneomsorg","UttaksplanMedPrematurFødsel","UttaksplanMedDeltUttak","UttaksplanMedFlerbarnsukerTvillinger"];export{t as UttaksplanMedAleneomsorg,o as UttaksplanMedDeltUttak,r as UttaksplanMedFlerbarnsukerTvillinger,n as UttaksplanMedPrematurFødsel,Be as __namedExportsOrder,he as default};
//# sourceMappingURL=MorFodsel.stories-9c59f9f8.js.map
