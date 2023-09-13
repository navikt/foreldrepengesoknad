import{j as a}from"./jsx-runtime-69eee039.js";import{w as F}from"./withIntl-e58a24a5.js";import{w as T}from"./withRouter-7855e4ba.js";import{w as D,F as _}from"./ForeldrepengerStateMock-3005dbc2.js";import{A as R}from"./AxiosMock-17aa2afc.js";import{R as L}from"./api-758ba7aa.js";import{_ as I,a as y,c as E,b as P}from"./soknadFarSøkerAdopsjon-fb110671.js";import{s as j,a as K}from"./stønadskonto80-8e203d8f.js";import{s as N,a as O}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U}from"./UttaksplanInfo-f8b2a09b.js";import"./index-7c191284.js";import"./IntlProvider-81e30403.js";import"./validationUtils-98d33cd3.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./extends-fed75772.js";import"./index-ecbee218.js";import"./index-e13aeee6.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-73e632aa.js";import"./dateUtils-3d3f8269.js";import"./getTypedFormComponents-b55cb5c1.js";import"./mapSøkerinfoDTO-d68bd2d0.js";import"./useSaveLoadedRoute-952bea34.js";import"./amplitude-bdf1e125.js";import"./globalUtil-c820f73d.js";import"./submitUtils-6c106b54.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-7a6031f5.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-09efc595.js";import"./Periodene-393eac0e.js";import"./apiInterceptor-d433db8f.js";import"./personUtils-3b6d427a.js";import"./Personkort-69e10f4f.js";import"./Dekningsgrad-fced8842.js";import"./useSøkerinfo-a62987d5.js";import"./index-47edccfa.js";import"./annenForelderUtils-c5a9f33a.js";import"./constants-c4bc2eb8.js";import"./LenkeKnapp-2a36bcd6.js";import"./InfoOmSøknaden-3a76676e.js";import"./Sirkelmaske-229c502e.js";import"./Foreldrepar-cfed28e8.js";import"./InnholdMedIllustrasjon-2174ca3a.js";import"./links-b36d21ab.js";import"./useOnValidSubmit-6a51f59a.js";import"./eksisterendeSakUtils-1a72f3c6.js";import"./velkommenUtils-0901e514.js";import"./Fieldset-2a6c6c1b.js";import"./formUtils-17a5d191.js";const G="/innsyn/v2/annenPartVedtak",i="/uttak-url/konto",n=I,p=y,v=E,u=P,ho={title:"steps/uttaksplan-info/MorFarAdopsjon",component:U,decorators:[T,F,D]},k=r=>{const x=s=>{s.onPost(G).replyOnce(200,void 0,L.FINISHED),s.onGet(i).replyOnce(200,r.stønadskonto100),s.onGet(i).replyOnce(200,r.stønadskonto80)};return a.jsx(R,{mock:x,children:a.jsx(_,{søknad:r.context,søkerinfo:r.søkerinfo,children:a.jsx(U,{})})})},o=k.bind({});o.args={stønadskonto100:j,stønadskonto80:K,context:n,søkerinfo:u};const t=k.bind({});t.args={stønadskonto100:N,stønadskonto80:O,context:{...n,søknad:{...n.søknad,søker:{...n.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:u};const e=k.bind({});e.args={stønadskonto100:N,stønadskonto80:O,context:{...p,søknad:{...p.søknad,søker:{...p.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:v};var c,m,d;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
//# sourceMappingURL=MorFarAdopsjon.stories-d9704f08.js.map
