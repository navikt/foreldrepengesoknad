import{j as a}from"./jsx-runtime-69eee039.js";import{w as F}from"./withIntl-9db7cf2b.js";import{w as T}from"./withRouter-5479545e.js";import{w as D,F as _}from"./ForeldrepengerStateMock-b6ff45d9.js";import{A as R}from"./AxiosMock-614edbac.js";import{R as L}from"./api-76fc5e42.js";import{_ as I,a as y,c as E,b as P}from"./soknadFarSøkerAdopsjon-fb110671.js";import{s as j,a as K}from"./stønadskonto80-8e203d8f.js";import{s as N,a as O}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U}from"./UttaksplanInfo-da2a79e9.js";import"./index-7c191284.js";import"./IntlProvider-cd45b197.js";import"./validationUtils-68fdb7d5.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-58e1e63c.js";import"./dateUtils-81ed5d0d.js";import"./Environment-07523402.js";import"./mapSøkerinfoDTO-41fd83b3.js";import"./useSaveLoadedRoute-595bc55d.js";import"./amplitude-bdf1e125.js";import"./globalUtil-c820f73d.js";import"./submitUtils-aa948b10.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-e0adc417.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-f6466e89.js";import"./Periodene-56662112.js";import"./apiInterceptor-dfae0758.js";import"./personUtils-12a1f4b0.js";import"./Personkort-c39a73e0.js";import"./Dekningsgrad-fced8842.js";import"./useSøkerinfo-28fd1ed5.js";import"./index-47edccfa.js";import"./annenForelderUtils-76f6911a.js";import"./constants-c4bc2eb8.js";import"./LenkeKnapp-2a36bcd6.js";import"./InfoOmSøknaden-c8798e09.js";import"./Sirkelmaske-f7986cd5.js";import"./Foreldrepar-9948f0a5.js";import"./InnholdMedIllustrasjon-59b4e30d.js";import"./links-b36d21ab.js";import"./useOnValidSubmit-b1178fb5.js";import"./eksisterendeSakUtils-173b191f.js";import"./velkommenUtils-84427324.js";import"./Fieldset-2a6c6c1b.js";import"./formUtils-6989130f.js";const G="/innsyn/v2/annenPartVedtak",i="/uttak-url/konto",n=I,p=y,v=E,u=P,ho={title:"steps/uttaksplan-info/MorFarAdopsjon",component:U,decorators:[T,F,D]},k=r=>{const x=s=>{s.onPost(G).replyOnce(200,void 0,L.FINISHED),s.onGet(i).replyOnce(200,r.stønadskonto100),s.onGet(i).replyOnce(200,r.stønadskonto80)};return a.jsx(R,{mock:x,children:a.jsx(_,{søknad:r.context,søkerinfo:r.søkerinfo,children:a.jsx(U,{})})})},o=k.bind({});o.args={stønadskonto100:j,stønadskonto80:K,context:n,søkerinfo:u};const t=k.bind({});t.args={stønadskonto100:N,stønadskonto80:O,context:{...n,søknad:{...n.søknad,søker:{...n.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:u};const e=k.bind({});e.args={stønadskonto100:N,stønadskonto80:O,context:{...p,søknad:{...p.søknad,søker:{...p.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:v};var c,m,d;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
}`,...(d=(m=o.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var l,S,M;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
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
}`,...(M=(S=t.parameters)==null?void 0:S.docs)==null?void 0:M.source}}};var f,A,g;e.parameters={...e.parameters,docs:{...(f=e.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
}`,...(g=(A=e.parameters)==null?void 0:A.docs)==null?void 0:g.source}}};const wo=["UttaksplanMedAleneomsorg","UttaksplanMedDeltUttakDerMorSøker","UttaksplanMedDeltUttakDerFarSøker"];export{o as UttaksplanMedAleneomsorg,e as UttaksplanMedDeltUttakDerFarSøker,t as UttaksplanMedDeltUttakDerMorSøker,wo as __namedExportsOrder,ho as default};
//# sourceMappingURL=MorFarAdopsjon.stories-06491007.js.map
