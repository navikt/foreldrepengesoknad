import{j as a}from"./jsx-runtime-69eee039.js";import{w as F}from"./withRouter-b443adb0.js";import{w as T,F as D}from"./ForeldrepengerStateMock-2b2feb9e.js";import{A as _}from"./AxiosMock-79cf94ea.js";import{R}from"./api-b158b98d.js";import{_ as L,a as I,c as y,b as E}from"./soknadFarSøkerAdopsjon-fb110671.js";import{s as j,a as K}from"./stønadskonto80-8e203d8f.js";import{s as N,a as O}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U}from"./UttaksplanInfo-2d69d631.js";import"./index-7c191284.js";import"./useSøknad-5c5bca2e.js";import"./validationUtils-481ea31b.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-a53deccd.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-dbaf167a.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-aa81b91f.js";import"./amplitude-bdf1e125.js";import"./submitUtils-3b67bade.js";import"./Periodene-bb8992e3.js";import"./apiInterceptor-7ea9ce80.js";import"./leggTilPeriode-e7d72d5c.js";import"./Uttaksplan-95167d8c.js";import"./index-f5a253d5.js";import"./FormikFileUploader-9cabf58c.js";import"./AttachmentList-8e6ebcfc.js";import"./Attachment-a20808c3.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-9eed17db.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-b203cb38.js";import"./formUtils-29ccf6bd.js";import"./useSøkerinfo-d70607f2.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-14062de2.js";import"./useOnValidSubmit-626a50a3.js";import"./dateUtils-38a630e5.js";import"./eksisterendeSakUtils-3bcd6ced.js";import"./velkommenUtils-4b72f618.js";const P="/innsyn/v2/annenPartVedtak",i="/konto",n=L,k=I,G=y,u=E,_o={title:"steps/uttaksplan-info/MorFarAdopsjon",component:U,decorators:[F,T]},p=r=>{const x=s=>{s.onPost(P).replyOnce(200,void 0,R.FINISHED),s.onGet(i).replyOnce(200,r.stønadskonto100),s.onGet(i).replyOnce(200,r.stønadskonto80)};return a.jsx(_,{mock:x,children:a.jsx(D,{søknad:r.context,søkerinfo:r.søkerinfo,children:a.jsx(U,{})})})},o=p.bind({});o.args={stønadskonto100:j,stønadskonto80:K,context:n,søkerinfo:u};const e=p.bind({});e.args={stønadskonto100:N,stønadskonto80:O,context:{...n,søknad:{...n.søknad,søker:{...n.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:u};const t=p.bind({});t.args={stønadskonto100:N,stønadskonto80:O,context:{...k,søknad:{...k.søknad,søker:{...k.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"TALENTFULL",etternavn:"MYGG",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:G};var c,d,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
//# sourceMappingURL=MorFarAdopsjon.stories-187c142b.js.map
