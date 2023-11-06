import{j as c}from"./jsx-runtime-69eee039.js";import{w as E}from"./withRouter-a172066d.js";import{w as _,F as P}from"./ForeldrepengerStateMock-c0a24792.js";import{A as j}from"./AxiosMock-2e314ed2.js";import{R as L}from"./api-cf202c98.js";import{_ as D,a as y,b as v,c as H}from"./soknadFarSøkerAdopsjon-fb110671.js";import{s as p,a as k}from"./stønadskonto80-8e203d8f.js";import{U as T}from"./UttaksplanInfo-f672bba3.js";import"./index-7c191284.js";import"./useSøknad-26978d9c.js";import"./Tidsperioden-bc4aa89e.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-23fed2f2.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-2e481752.js";import"./amplitude-e7683f28.js";import"./submitUtils-97d75fe7.js";import"./Periodene-3e3b4ab3.js";import"./apiInterceptor-7ea9ce80.js";import"./leggTilPeriode-197d6712.js";import"./Uttaksplan-a64516f8.js";import"./FormikFileUploader-1e1345f2.js";import"./AttachmentList-6bd7cc9e.js";import"./Attachment-3a7d5334.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-5ef2b738.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./formUtils-9352967f.js";import"./message-0de53699.js";import"./useSøkerinfo-417aa154.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-72c7ff20.js";import"./useOnValidSubmit-f79aa596.js";import"./dateUtils-9225f718.js";import"./eksisterendeSakUtils-8584b6d5.js";import"./velkommenUtils-9f3647ff.js";const K="/innsyn/v2/annenPartVedtak",S="/konto",n=D,a=y,h=v,l=H,xe={title:"steps/uttaksplan-info/MorFarAnnenForelderHarRettIEØS",component:T,decorators:[E,_]},i=s=>{const x=d=>{d.onPost(K).replyOnce(200,void 0,L.FINISHED),d.onGet(S).replyOnce(200,s.stønadskonto100),d.onGet(S).replyOnce(200,s.stønadskonto80)};return c.jsx(j,{mock:x,children:c.jsx(P,{søknad:s.context,søkerinfo:s.søkerinfo,children:c.jsx(T,{})})})},e=i.bind({});e.args={stønadskonto100:p,stønadskonto80:k,context:{...n,søknad:{...n.søknad,annenForelder:{fornavn:"Far",etternavn:"EØS",fnr:"1111UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}}},søkerinfo:h};const r=i.bind({});r.args={stønadskonto100:p,stønadskonto80:k,context:{...a,søknad:{...a.søknad,annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}}},søkerinfo:l};const o=i.bind({});o.args={stønadskonto100:p,stønadskonto80:k,context:{...a,søknad:{...a.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{...a.søknad.barn,fødselsdatoer:["2022-06-14","2022-06-14"],antallBarn:2,adopsjonsdato:void 0,adoptertIUtlandet:void 0},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}}},søkerinfo:l};const t=i.bind({});t.args={stønadskonto100:p,stønadskonto80:k,context:{...n,søknad:{...n.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{...n.søknad.barn,fødselsdatoer:["2022-06-14"],termindato:["2022-08-14"],antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:"født"},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}}},søkerinfo:l};var m,f,M;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(N=(A=o.parameters)==null?void 0:A.docs)==null?void 0:N.source}}};var u,R,I;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(I=(R=t.parameters)==null?void 0:R.docs)==null?void 0:I.source}}};const Ee=["UttaksplanAdopsjonMorSøkerFarHarRettIEOS","UttaksplanAdopsjonFarSøkerMorHarRettIEOS","UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger","UttaksplanFødselMorSøkerFarHarRettIEOSPrematur"];export{r as UttaksplanAdopsjonFarSøkerMorHarRettIEOS,e as UttaksplanAdopsjonMorSøkerFarHarRettIEOS,o as UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger,t as UttaksplanFødselMorSøkerFarHarRettIEOSPrematur,Ee as __namedExportsOrder,xe as default};
//# sourceMappingURL=MorFarAnnenForelderHarRettIEOS.stories-80adba96.js.map
