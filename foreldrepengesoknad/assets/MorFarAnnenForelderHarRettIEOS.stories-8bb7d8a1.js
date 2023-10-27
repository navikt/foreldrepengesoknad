import{j as c}from"./jsx-runtime-69eee039.js";import{w as E}from"./withIntl-4043b8b4.js";import{w as _}from"./withRouter-2e2c6e6b.js";import{w as P,F as j}from"./ForeldrepengerStateMock-8c04d332.js";import{A as L}from"./AxiosMock-e7ccc573.js";import{R as D}from"./api-39fe6dcd.js";import{_ as v,a as y,b as H,c as K}from"./soknadFarSøkerAdopsjon-fb110671.js";import{s as p,a as k}from"./stønadskonto80-8e203d8f.js";import{U as T}from"./UttaksplanInfo-d7c496c5.js";import"./index-7c191284.js";import"./IntlProvider-7d7f37e2.js";import"./validationUtils-3923a44f.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-32a27317.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./useSøknad-bb41a340.js";import"./mapSøkerinfoDTO-f0b0bc3c.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-44907666.js";import"./amplitude-bdf1e125.js";import"./submitUtils-deb96a79.js";import"./Periodene-7b9c80a7.js";import"./apiInterceptor-7ea9ce80.js";import"./leggTilPeriode-23ab0ec4.js";import"./Uttaksplan-e691a8f5.js";import"./FormikFileUploader-2fb5425e.js";import"./AttachmentList-bc8c7263.js";import"./Attachment-31710907.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-667b1f29.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-e5198354.js";import"./formUtils-f08b9c6b.js";import"./useSøkerinfo-ae49b1f5.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-b1b47928.js";import"./useOnValidSubmit-aae2fccb.js";import"./dateUtils-8d5a81ce.js";import"./eksisterendeSakUtils-327b3d6a.js";import"./velkommenUtils-44e78e8f.js";const h="/innsyn/v2/annenPartVedtak",S="/konto",n=v,a=y,G=H,l=K,_e={title:"steps/uttaksplan-info/MorFarAnnenForelderHarRettIEØS",component:T,decorators:[_,E,P]},i=s=>{const x=d=>{d.onPost(h).replyOnce(200,void 0,D.FINISHED),d.onGet(S).replyOnce(200,s.stønadskonto100),d.onGet(S).replyOnce(200,s.stønadskonto80)};return c.jsx(L,{mock:x,children:c.jsx(j,{søknad:s.context,søkerinfo:s.søkerinfo,children:c.jsx(T,{})})})},e=i.bind({});e.args={stønadskonto100:p,stønadskonto80:k,context:{...n,søknad:{...n.søknad,annenForelder:{fornavn:"Far",etternavn:"EØS",fnr:"1111UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}}},søkerinfo:G};const r=i.bind({});r.args={stønadskonto100:p,stønadskonto80:k,context:{...a,søknad:{...a.søknad,annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}}},søkerinfo:l};const o=i.bind({});o.args={stønadskonto100:p,stønadskonto80:k,context:{...a,søknad:{...a.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{...a.søknad.barn,fødselsdatoer:["2022-06-14","2022-06-14"],antallBarn:2,adopsjonsdato:void 0,adoptertIUtlandet:void 0},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}}},søkerinfo:l};const t=i.bind({});t.args={stønadskonto100:p,stønadskonto80:k,context:{...n,søknad:{...n.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{...n.søknad.barn,fødselsdatoer:["2022-06-14"],termindato:["2022-08-14"],antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:"født"},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}}},søkerinfo:l};var m,f,M;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(M=(f=e.parameters)==null?void 0:f.docs)==null?void 0:M.source}}};var g,U,F;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(F=(U=r.parameters)==null?void 0:U.docs)==null?void 0:F.source}}};var O,A,N;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`args => {
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
}`,...(N=(A=o.parameters)==null?void 0:A.docs)==null?void 0:N.source}}};var u,I,R;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(I=t.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};const Pe=["UttaksplanAdopsjonMorSøkerFarHarRettIEOS","UttaksplanAdopsjonFarSøkerMorHarRettIEOS","UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger","UttaksplanFødselMorSøkerFarHarRettIEOSPrematur"];export{r as UttaksplanAdopsjonFarSøkerMorHarRettIEOS,e as UttaksplanAdopsjonMorSøkerFarHarRettIEOS,o as UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger,t as UttaksplanFødselMorSøkerFarHarRettIEOSPrematur,Pe as __namedExportsOrder,_e as default};
//# sourceMappingURL=MorFarAnnenForelderHarRettIEOS.stories-8bb7d8a1.js.map
