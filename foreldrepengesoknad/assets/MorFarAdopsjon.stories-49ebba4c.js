import{j as a}from"./jsx-runtime-69eee039.js";import{w as F}from"./withRouter-a172066d.js";import{w as T,F as D}from"./ForeldrepengerStateMock-c0a24792.js";import{A as _}from"./AxiosMock-5d611184.js";import{R}from"./api-32ec0d49.js";import{_ as L,a as I,c as y,b as E}from"./soknadFarSøkerAdopsjon-fb110671.js";import{s as j,a as K}from"./stønadskonto80-8e203d8f.js";import{s as N,a as O}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U}from"./UttaksplanInfo-8cbd9c6f.js";import"./index-7c191284.js";import"./useSøknad-26978d9c.js";import"./Tidsperioden-bc4aa89e.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-23fed2f2.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-03fa3834.js";import"./amplitude-e7683f28.js";import"./submitUtils-3b298622.js";import"./Periodene-3e3b4ab3.js";import"./apiInterceptor-565c1682.js";import"./leggTilPeriode-197d6712.js";import"./Uttaksplan-2cb6efb2.js";import"./FormikFileUploader-5c0e4e48.js";import"./AttachmentList-6bd7cc9e.js";import"./Attachment-3a7d5334.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-5ef2b738.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./formUtils-9352967f.js";import"./message-0de53699.js";import"./useSøkerinfo-417aa154.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-72c7ff20.js";import"./useOnValidSubmit-1caa3e37.js";import"./dateUtils-9225f718.js";import"./eksisterendeSakUtils-9faa4d73.js";import"./velkommenUtils-67ca2dfd.js";const P="/innsyn/v2/annenPartVedtak",i="/konto",n=L,k=I,G=y,u=E,_o={title:"steps/uttaksplan-info/MorFarAdopsjon",component:U,decorators:[F,T]},p=r=>{const x=s=>{s.onPost(P).replyOnce(200,void 0,R.FINISHED),s.onGet(i).replyOnce(200,r.stønadskonto100),s.onGet(i).replyOnce(200,r.stønadskonto80)};return a.jsx(_,{mock:x,children:a.jsx(D,{søknad:r.context,søkerinfo:r.søkerinfo,children:a.jsx(U,{})})})},o=p.bind({});o.args={stønadskonto100:j,stønadskonto80:K,context:n,søkerinfo:u};const e=p.bind({});e.args={stønadskonto100:N,stønadskonto80:O,context:{...n,søknad:{...n.søknad,søker:{...n.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:u};const t=p.bind({});t.args={stønadskonto100:N,stønadskonto80:O,context:{...k,søknad:{...k.søknad,søker:{...k.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:G};var c,d,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
//# sourceMappingURL=MorFarAdopsjon.stories-49ebba4c.js.map
