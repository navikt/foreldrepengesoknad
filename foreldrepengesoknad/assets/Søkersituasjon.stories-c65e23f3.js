import{j as t}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-902881a4.js";import{w as j}from"./withRouter-79d071e3.js";import{w as g,F as S}from"./ForeldrepengerStateMock-890b5f79.js";import{A as F}from"./AxiosMock-c30d8940.js";import{_ as A}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{S as c}from"./Søkersituasjon-bb866fee.js";import"./index-7c191284.js";import"./IntlProvider-a6625fc8.js";import"./validationUtils-52801e0e.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-298af852.js";import"./dateUtils-a4ce83a0.js";import"./Environment-07523402.js";import"./mapSøkerinfoDTO-fba55ae3.js";import"./useSaveLoadedRoute-c0ec6c65.js";import"./amplitude-bdf1e125.js";import"./api-3c6c36ba.js";import"./apiInterceptor-dfae0758.js";import"./globalUtil-c820f73d.js";import"./submitUtils-e43e4b36.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-fe89b468.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-1f66382d.js";import"./Periodene-98e86dd9.js";import"./useOnValidSubmit-44488e46.js";import"./index-47edccfa.js";import"./useSøkerinfo-51e3a0e2.js";const _=4,h="/soknad/uttaksplan-info",w={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{rolle:"",situasjon:""}},version:_,currentRoute:h,søknadGjelderEtNyttBarn:!0},m=A,k=w,po={title:"steps/Søkersituasjon",component:c,decorators:[j,x,g]},d=({context:u,søkerinfo:f})=>{const l=M=>{M.onPost("/storage").reply(200,void 0)};return t.jsx(F,{mock:l,children:t.jsx(S,{søknad:u,søkerinfo:f,children:t.jsx(c,{})})})},o=d.bind({});o.args={context:k,søkerinfo:m,kjønn:"K"};const r=d.bind({});r.args={context:k,søkerinfo:{søker:{...m,kjønn:"M"}},kjønn:"M"};var e,n,s;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Søkersituasjon />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(s=(n=o.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var i,a,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Søkersituasjon />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(p=(a=r.parameters)==null?void 0:a.docs)==null?void 0:p.source}}};const co=["Default","Far"];export{o as Default,r as Far,co as __namedExportsOrder,po as default};
//# sourceMappingURL=Søkersituasjon.stories-c65e23f3.js.map
