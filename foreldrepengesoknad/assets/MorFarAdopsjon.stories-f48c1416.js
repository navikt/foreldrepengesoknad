import{j as a}from"./jsx-runtime-69eee039.js";import{w as F}from"./withRouter-5da68677.js";import{w as T,F as D}from"./ForeldrepengerStateMock-e822428a.js";import{A as _}from"./AxiosMock-264d8999.js";import{R}from"./api-06957017.js";import{_ as L,a as I,c as y,b as E}from"./soknadFarSøkerAdopsjon-fb110671.js";import{s as j,a as K}from"./stønadskonto80-8e203d8f.js";import{s as N,a as O}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U}from"./UttaksplanInfo-10f55d3c.js";import"./index-7c191284.js";import"./useSøknad-b4078322.js";import"./Tidsperioden-297a98ae.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-5b982ed5.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-1e0d0b3f.js";import"./amplitude-e7683f28.js";import"./submitUtils-814eb1c0.js";import"./Periodene-a3aa2caf.js";import"./apiInterceptor-565c1682.js";import"./leggTilPeriode-c7579a43.js";import"./Uttaksplan-cbad47ce.js";import"./FormikFileUploader-b07a358a.js";import"./AttachmentList-75d0cccd.js";import"./Attachment-5e96a78f.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-981c48c4.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./index-47edccfa.js";import"./formUtils-b05c92fb.js";import"./message-ebd688c0.js";import"./useSøkerinfo-c2fc08ca.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-3cf3f976.js";import"./useOnValidSubmit-2f04562e.js";import"./dateUtils-92fccdda.js";import"./eksisterendeSakUtils-c6ec9ec6.js";import"./velkommenUtils-4774fd23.js";const P="/innsyn/v2/annenPartVedtak",i="/konto",n=L,k=I,G=y,u=E,Ro={title:"steps/uttaksplan-info/MorFarAdopsjon",component:U,decorators:[F,T]},p=r=>{const x=s=>{s.onPost(P).replyOnce(200,void 0,R.FINISHED),s.onGet(i).replyOnce(200,r.stønadskonto100),s.onGet(i).replyOnce(200,r.stønadskonto80)};return a.jsx(_,{mock:x,children:a.jsx(D,{søknad:r.context,søkerinfo:r.søkerinfo,children:a.jsx(U,{})})})},o=p.bind({});o.args={stønadskonto100:j,stønadskonto80:K,context:n,søkerinfo:u};const e=p.bind({});e.args={stønadskonto100:N,stønadskonto80:O,context:{...n,søknad:{...n.søknad,søker:{...n.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:u};const t=p.bind({});t.args={stønadskonto100:N,stønadskonto80:O,context:{...k,søknad:{...k.søknad,søker:{...k.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:G};var c,d,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
}`,...(g=(A=t.parameters)==null?void 0:A.docs)==null?void 0:g.source}}};const Lo=["UttaksplanMedAleneomsorg","UttaksplanMedDeltUttakDerMorSøker","UttaksplanMedDeltUttakDerFarSøker"];export{o as UttaksplanMedAleneomsorg,t as UttaksplanMedDeltUttakDerFarSøker,e as UttaksplanMedDeltUttakDerMorSøker,Lo as __namedExportsOrder,Ro as default};
//# sourceMappingURL=MorFarAdopsjon.stories-f48c1416.js.map
