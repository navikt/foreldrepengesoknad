import{j as c}from"./jsx-runtime-69eee039.js";import{w as E}from"./withIntl-902881a4.js";import{w as _}from"./withRouter-025ea7c0.js";import{w as P,F as j}from"./ForeldrepengerStateMock-14e379f5.js";import{A as L}from"./AxiosMock-3c197b57.js";import{R as D}from"./api-e34d46b4.js";import{_ as v,a as y,b as H,c as K}from"./soknadFarSøkerAdopsjon-fb110671.js";import{s as p,a as k}from"./stønadskonto80-8e203d8f.js";import{U as T}from"./UttaksplanInfo-eec86834.js";import"./index-7c191284.js";import"./IntlProvider-a6625fc8.js";import"./validationUtils-52801e0e.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-d91e9ba5.js";import"./dateUtils-04b407de.js";import"./mapSøkerinfoDTO-3b9336f6.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-184f3bcf.js";import"./amplitude-bdf1e125.js";import"./globalUtil-c820f73d.js";import"./submitUtils-8bf94c09.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-fe89b468.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-604aac1e.js";import"./Periodene-21fb5519.js";import"./apiInterceptor-9746ae07.js";import"./personUtils-6d894d58.js";import"./Personkort-71988985.js";import"./Dekningsgrad-fced8842.js";import"./useSøkerinfo-1c6ac28b.js";import"./index-47edccfa.js";import"./annenForelderUtils-98162410.js";import"./constants-c4bc2eb8.js";import"./LenkeKnapp-2a36bcd6.js";import"./InfoOmSøknaden-f39cfb7e.js";import"./Sirkelmaske-3353d4e4.js";import"./Foreldrepar-8addd8ac.js";import"./InnholdMedIllustrasjon-d53ad229.js";import"./links-b36d21ab.js";import"./useOnValidSubmit-c8d74cc2.js";import"./eksisterendeSakUtils-d0984916.js";import"./velkommenUtils-20ee9317.js";import"./Fieldset-2a6c6c1b.js";import"./formUtils-3000cdf9.js";const h="/innsyn/v2/annenPartVedtak",m="/uttak-url/konto",n=v,a=y,G=H,l=K,hr={title:"steps/uttaksplan-info/MorFarAnnenForelderHarRettIEØS",component:T,decorators:[_,E,P]},i=s=>{const x=d=>{d.onPost(h).replyOnce(200,void 0,D.FINISHED),d.onGet(m).replyOnce(200,s.stønadskonto100),d.onGet(m).replyOnce(200,s.stønadskonto80)};return c.jsx(L,{mock:x,children:c.jsx(j,{søknad:s.context,søkerinfo:s.søkerinfo,children:c.jsx(T,{})})})},r=i.bind({});r.args={stønadskonto100:p,stønadskonto80:k,context:{...n,søknad:{...n.søknad,annenForelder:{fornavn:"Far",etternavn:"EØS",fnr:"1111UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}}},søkerinfo:G};const e=i.bind({});e.args={stønadskonto100:p,stønadskonto80:k,context:{...a,søknad:{...a.søknad,annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}}},søkerinfo:l};const o=i.bind({});o.args={stønadskonto100:p,stønadskonto80:k,context:{...a,søknad:{...a.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{...a.søknad.barn,fødselsdatoer:["2022-06-14","2022-06-14"],antallBarn:2,adopsjonsdato:void 0,adoptertIUtlandet:void 0},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}}},søkerinfo:l};const t=i.bind({});t.args={stønadskonto100:p,stønadskonto80:k,context:{...n,søknad:{...n.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{...n.søknad.barn,fødselsdatoer:["2022-06-14"],termindato:["2022-08-14"],antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:"født"},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1}}},søkerinfo:l};var S,f,M;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
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
}`,...(M=(f=r.parameters)==null?void 0:f.docs)==null?void 0:M.source}}};var g,U,F;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(F=(U=e.parameters)==null?void 0:U.docs)==null?void 0:F.source}}};var O,A,u;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`args => {
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
}`,...(u=(A=o.parameters)==null?void 0:A.docs)==null?void 0:u.source}}};var N,I,R;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
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
}`,...(R=(I=t.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};const Gr=["UttaksplanAdopsjonMorSøkerFarHarRettIEOS","UttaksplanAdopsjonFarSøkerMorHarRettIEOS","UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger","UttaksplanFødselMorSøkerFarHarRettIEOSPrematur"];export{e as UttaksplanAdopsjonFarSøkerMorHarRettIEOS,r as UttaksplanAdopsjonMorSøkerFarHarRettIEOS,o as UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger,t as UttaksplanFødselMorSøkerFarHarRettIEOSPrematur,Gr as __namedExportsOrder,hr as default};
//# sourceMappingURL=MorFarAnnenForelderHarRettIEOS.stories-d5ee20fe.js.map
