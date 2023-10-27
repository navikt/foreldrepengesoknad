import{j as e}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-4043b8b4.js";import{w as j}from"./withRouter-2e2c6e6b.js";import{w as g,F as S}from"./ForeldrepengerStateMock-8c04d332.js";import{A as F}from"./AxiosMock-f4313c42.js";import{_ as A}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{S as p}from"./Søkersituasjon-487dcf30.js";import"./index-7c191284.js";import"./IntlProvider-7d7f37e2.js";import"./validationUtils-3923a44f.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-32a27317.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./useSøknad-bb41a340.js";import"./mapSøkerinfoDTO-f0b0bc3c.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-d6f51789.js";import"./amplitude-bdf1e125.js";import"./api-38cb33cc.js";import"./apiInterceptor-c6c2844c.js";import"./submitUtils-4c286eb0.js";import"./Periodene-7b9c80a7.js";import"./useOnValidSubmit-6a5c6f7b.js";import"./useSøkerinfo-ae49b1f5.js";const _=4,h="/soknad/uttaksplan-info",w={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{rolle:"",situasjon:""}},version:_,currentRoute:h,søknadGjelderEtNyttBarn:!0},k=A,m=w,$={title:"steps/Søkersituasjon",component:p,decorators:[j,x,g]},d=({context:u,søkerinfo:f})=>{const l=M=>{M.onPost("/storage").reply(200,void 0)};return e.jsx(F,{mock:l,children:e.jsx(S,{søknad:u,søkerinfo:f,children:e.jsx(p,{})})})},o=d.bind({});o.args={context:m,søkerinfo:k,kjønn:"K"};const r=d.bind({});r.args={context:m,søkerinfo:{søker:{...k,kjønn:"M"}},kjønn:"M"};var t,n,s;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
}`,...(s=(n=o.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var i,a,c;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(c=(a=r.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};const oo=["Default","Far"];export{o as Default,r as Far,oo as __namedExportsOrder,$ as default};
//# sourceMappingURL=Søkersituasjon.stories-9a55bfff.js.map
