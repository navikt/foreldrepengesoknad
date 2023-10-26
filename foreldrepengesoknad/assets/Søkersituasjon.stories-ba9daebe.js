import{j as e}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-38d35964.js";import{w as j}from"./withRouter-15cc08d4.js";import{w as g,F as S}from"./ForeldrepengerStateMock-2ca64e3f.js";import{A as F}from"./AxiosMock-9c813813.js";import{_ as A}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{S as p}from"./Søkersituasjon-280d0b1a.js";import"./index-7c191284.js";import"./IntlProvider-b5f77251.js";import"./validationUtils-3e3f35a1.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-32a27317.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./useSøknad-67949f34.js";import"./mapSøkerinfoDTO-c2e267b6.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-ccd0af0e.js";import"./amplitude-bdf1e125.js";import"./api-02a26928.js";import"./apiInterceptor-c6c2844c.js";import"./submitUtils-3190d349.js";import"./Periodene-52ff0d39.js";import"./useOnValidSubmit-9255204e.js";import"./useSøkerinfo-7098b049.js";const _=4,h="/soknad/uttaksplan-info",w={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{rolle:"",situasjon:""}},version:_,currentRoute:h,søknadGjelderEtNyttBarn:!0},k=A,m=w,$={title:"steps/Søkersituasjon",component:p,decorators:[j,x,g]},d=({context:u,søkerinfo:f})=>{const l=M=>{M.onPost("/storage").reply(200,void 0)};return e.jsx(F,{mock:l,children:e.jsx(S,{søknad:u,søkerinfo:f,children:e.jsx(p,{})})})},o=d.bind({});o.args={context:m,søkerinfo:k,kjønn:"K"};const r=d.bind({});r.args={context:m,søkerinfo:{søker:{...k,kjønn:"M"}},kjønn:"M"};var t,n,s;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Søkersituasjon.stories-ba9daebe.js.map
