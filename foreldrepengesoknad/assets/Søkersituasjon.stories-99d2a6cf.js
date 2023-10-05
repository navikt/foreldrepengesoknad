import{j as t}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-7a85e670.js";import{w as j}from"./withRouter-83360639.js";import{w as g,F as S}from"./ForeldrepengerStateMock-3c85b779.js";import{A as F}from"./AxiosMock-a909d7a1.js";import{_ as A}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{S as c}from"./Søkersituasjon-b74642b1.js";import"./index-7c191284.js";import"./IntlProvider-d593fb8e.js";import"./validationUtils-5694e48a.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-4b034f0e.js";import"./dateUtils-34a1bc56.js";import"./Environment-07523402.js";import"./mapSøkerinfoDTO-b5a3a065.js";import"./useSaveLoadedRoute-6c82e269.js";import"./amplitude-bdf1e125.js";import"./api-2c42af4e.js";import"./apiInterceptor-dfae0758.js";import"./globalUtil-c820f73d.js";import"./submitUtils-8db703e8.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-9787ac0f.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-db5d7350.js";import"./Periodene-9940b200.js";import"./useOnValidSubmit-4b0f9523.js";import"./index-47edccfa.js";import"./useSøkerinfo-be784377.js";const _=4,h="/soknad/uttaksplan-info",w={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{rolle:"",situasjon:""}},version:_,currentRoute:h,søknadGjelderEtNyttBarn:!0},m=A,k=w,po={title:"steps/Søkersituasjon",component:c,decorators:[j,x,g]},d=({context:u,søkerinfo:f})=>{const l=M=>{M.onPost("/storage").reply(200,void 0)};return t.jsx(F,{mock:l,children:t.jsx(S,{søknad:u,søkerinfo:f,children:t.jsx(c,{})})})},o=d.bind({});o.args={context:k,søkerinfo:m,kjønn:"K"};const r=d.bind({});r.args={context:k,søkerinfo:{søker:{...m,kjønn:"M"}},kjønn:"M"};var e,n,s;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`({
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
//# sourceMappingURL=Søkersituasjon.stories-99d2a6cf.js.map
