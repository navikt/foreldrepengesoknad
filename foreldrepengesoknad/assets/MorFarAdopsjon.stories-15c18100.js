import{j as a}from"./jsx-runtime-69eee039.js";import{w as F}from"./withRouter-ab431e13.js";import{w as T,F as D}from"./ForeldrepengerStateMock-ae7feae9.js";import{A as _}from"./AxiosMock-5a6f61ee.js";import{R}from"./api-6765dbc0.js";import{_ as L,a as I,c as y,b as E}from"./soknadFarSøkerAdopsjon-fb110671.js";import{s as j,a as K}from"./stønadskonto80-8e203d8f.js";import{s as N,a as O}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U}from"./UttaksplanInfo-e8ef205c.js";import"./index-7c191284.js";import"./useSøknad-e5916e1e.js";import"./validationUtils-024c2399.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-1fb11dfb.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-695a75e8.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-b612c2e3.js";import"./amplitude-e7683f28.js";import"./submitUtils-db323592.js";import"./Periodene-7d2fd09b.js";import"./apiInterceptor-7ea9ce80.js";import"./leggTilPeriode-e3e6dffd.js";import"./Uttaksplan-ed9a705f.js";import"./index-dfb6bae5.js";import"./FormikFileUploader-8915696f.js";import"./AttachmentList-f19a2777.js";import"./Attachment-a9115a99.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-d8402a3d.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-5ffc9a17.js";import"./formUtils-a66fbbf6.js";import"./useSøkerinfo-17a18f9b.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-642a1e87.js";import"./useOnValidSubmit-63822350.js";import"./dateUtils-df7c4084.js";import"./eksisterendeSakUtils-f13344d6.js";import"./velkommenUtils-4288805c.js";const P="/innsyn/v2/annenPartVedtak",i="/konto",n=L,k=I,G=y,u=E,_o={title:"steps/uttaksplan-info/MorFarAdopsjon",component:U,decorators:[F,T]},p=r=>{const x=s=>{s.onPost(P).replyOnce(200,void 0,R.FINISHED),s.onGet(i).replyOnce(200,r.stønadskonto100),s.onGet(i).replyOnce(200,r.stønadskonto80)};return a.jsx(_,{mock:x,children:a.jsx(D,{søknad:r.context,søkerinfo:r.søkerinfo,children:a.jsx(U,{})})})},o=p.bind({});o.args={stønadskonto100:j,stønadskonto80:K,context:n,søkerinfo:u};const e=p.bind({});e.args={stønadskonto100:N,stønadskonto80:O,context:{...n,søknad:{...n.søknad,søker:{...n.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:u};const t=p.bind({});t.args={stønadskonto100:N,stønadskonto80:O,context:{...k,søknad:{...k.søknad,søker:{...k.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:G};var c,d,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
}`,...(m=(d=o.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var l,S,M;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
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
}`,...(M=(S=e.parameters)==null?void 0:S.docs)==null?void 0:M.source}}};var f,A,g;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
}`,...(g=(A=t.parameters)==null?void 0:A.docs)==null?void 0:g.source}}};const Ro=["UttaksplanMedAleneomsorg","UttaksplanMedDeltUttakDerMorSøker","UttaksplanMedDeltUttakDerFarSøker"];export{o as UttaksplanMedAleneomsorg,t as UttaksplanMedDeltUttakDerFarSøker,e as UttaksplanMedDeltUttakDerMorSøker,Ro as __namedExportsOrder,_o as default};
//# sourceMappingURL=MorFarAdopsjon.stories-15c18100.js.map
