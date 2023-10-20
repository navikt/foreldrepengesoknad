import{j as a}from"./jsx-runtime-69eee039.js";import{w as F}from"./withIntl-34c91a9f.js";import{w as T}from"./withRouter-025ea7c0.js";import{w as D,F as _}from"./ForeldrepengerStateMock-14e379f5.js";import{A as R}from"./AxiosMock-6b1c8141.js";import{R as L}from"./api-9c727c36.js";import{_ as I,a as y,c as E,b as P}from"./soknadFarSøkerAdopsjon-fb110671.js";import{s as j,a as K}from"./stønadskonto80-8e203d8f.js";import{s as N,a as O}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U}from"./UttaksplanInfo-f1eb948d.js";import"./index-7c191284.js";import"./IntlProvider-703d2280.js";import"./validationUtils-52801e0e.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-d91e9ba5.js";import"./dateUtils-04b407de.js";import"./mapSøkerinfoDTO-3b9336f6.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-66d41ce7.js";import"./amplitude-bdf1e125.js";import"./globalUtil-c820f73d.js";import"./submitUtils-11ed6e7a.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-fe89b468.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-604aac1e.js";import"./Periodene-21fb5519.js";import"./apiInterceptor-c6c2844c.js";import"./personUtils-6d894d58.js";import"./Personkort-1e618102.js";import"./Dekningsgrad-fced8842.js";import"./useSøkerinfo-1c6ac28b.js";import"./index-47edccfa.js";import"./annenForelderUtils-98162410.js";import"./constants-c4bc2eb8.js";import"./LenkeKnapp-4a871682.js";import"./InfoOmSøknaden-a9c61b87.js";import"./Sirkelmaske-3353d4e4.js";import"./Foreldrepar-8addd8ac.js";import"./InnholdMedIllustrasjon-09301804.js";import"./links-b36d21ab.js";import"./useOnValidSubmit-afa78197.js";import"./eksisterendeSakUtils-9c55f90c.js";import"./velkommenUtils-635e27c3.js";import"./Fieldset-2a6c6c1b.js";import"./formUtils-3000cdf9.js";const G="/innsyn/v2/annenPartVedtak",i="/konto",n=I,p=y,v=E,u=P,ho={title:"steps/uttaksplan-info/MorFarAdopsjon",component:U,decorators:[T,F,D]},k=r=>{const x=s=>{s.onPost(G).replyOnce(200,void 0,L.FINISHED),s.onGet(i).replyOnce(200,r.stønadskonto100),s.onGet(i).replyOnce(200,r.stønadskonto80)};return a.jsx(R,{mock:x,children:a.jsx(_,{søknad:r.context,søkerinfo:r.søkerinfo,children:a.jsx(U,{})})})},o=k.bind({});o.args={stønadskonto100:j,stønadskonto80:K,context:n,søkerinfo:u};const e=k.bind({});e.args={stønadskonto100:N,stønadskonto80:O,context:{...n,søknad:{...n.søknad,søker:{...n.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:u};const t=k.bind({});t.args={stønadskonto100:N,stønadskonto80:O,context:{...p,søknad:{...p.søknad,søker:{...p.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:v};var c,m,d;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
}`,...(d=(m=o.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var l,S,M;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
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
}`,...(g=(A=t.parameters)==null?void 0:A.docs)==null?void 0:g.source}}};const wo=["UttaksplanMedAleneomsorg","UttaksplanMedDeltUttakDerMorSøker","UttaksplanMedDeltUttakDerFarSøker"];export{o as UttaksplanMedAleneomsorg,t as UttaksplanMedDeltUttakDerFarSøker,e as UttaksplanMedDeltUttakDerMorSøker,wo as __namedExportsOrder,ho as default};
//# sourceMappingURL=MorFarAdopsjon.stories-5afb3ccf.js.map
