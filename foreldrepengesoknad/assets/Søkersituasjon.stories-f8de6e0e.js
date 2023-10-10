import{j as t}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-9db7cf2b.js";import{w as j}from"./withRouter-5479545e.js";import{w as g,F as S}from"./ForeldrepengerStateMock-b6ff45d9.js";import{A as F}from"./AxiosMock-614edbac.js";import{_ as A}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{S as c}from"./Søkersituasjon-a209979a.js";import"./index-7c191284.js";import"./IntlProvider-cd45b197.js";import"./validationUtils-68fdb7d5.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-58e1e63c.js";import"./dateUtils-81ed5d0d.js";import"./Environment-07523402.js";import"./mapSøkerinfoDTO-41fd83b3.js";import"./useSaveLoadedRoute-595bc55d.js";import"./amplitude-bdf1e125.js";import"./api-76fc5e42.js";import"./apiInterceptor-dfae0758.js";import"./globalUtil-c820f73d.js";import"./submitUtils-aa948b10.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-e0adc417.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-f6466e89.js";import"./Periodene-56662112.js";import"./useOnValidSubmit-b1178fb5.js";import"./index-47edccfa.js";import"./useSøkerinfo-28fd1ed5.js";const _=4,h="/soknad/uttaksplan-info",w={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{rolle:"",situasjon:""}},version:_,currentRoute:h,søknadGjelderEtNyttBarn:!0},m=A,k=w,po={title:"steps/Søkersituasjon",component:c,decorators:[j,x,g]},d=({context:u,søkerinfo:f})=>{const l=M=>{M.onPost("/storage").reply(200,void 0)};return t.jsx(F,{mock:l,children:t.jsx(S,{søknad:u,søkerinfo:f,children:t.jsx(c,{})})})},o=d.bind({});o.args={context:k,søkerinfo:m,kjønn:"K"};const r=d.bind({});r.args={context:k,søkerinfo:{søker:{...m,kjønn:"M"}},kjønn:"M"};var e,n,s;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`({
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
//# sourceMappingURL=Søkersituasjon.stories-f8de6e0e.js.map
