import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withIntl-38d35964.js";import{w as d}from"./withRouter-15cc08d4.js";import{w as k,F as l}from"./ForeldrepengerStateMock-2ca64e3f.js";import{A as f}from"./AxiosMock-9c813813.js";import{_ as x}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as M}from"./soknadMedEttBarn-66625a0c.js";import{U as s}from"./Utenlandsopphold-c71865b0.js";import"./index-7c191284.js";import"./IntlProvider-b5f77251.js";import"./validationUtils-3e3f35a1.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-32a27317.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./useSøknad-67949f34.js";import"./mapSøkerinfoDTO-c2e267b6.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-ccd0af0e.js";import"./amplitude-bdf1e125.js";import"./api-02a26928.js";import"./apiInterceptor-c6c2844c.js";import"./submitUtils-3190d349.js";import"./Periodene-52ff0d39.js";import"./useOnValidSubmit-9255204e.js";import"./formUtils-628645da.js";const u=x,h=M,V={title:"steps/Utenlandsopphold",component:s,decorators:[d,c,k]},g=({context:p,søkerinfo:i})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(f,{mock:m,children:r.jsx(l,{søknad:p,søkerinfo:i,children:r.jsx(s,{})})})},o=g.bind({});o.args={context:h,søkerinfo:u};var t,e,n;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Utenlandsopphold />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(n=(e=o.parameters)==null?void 0:e.docs)==null?void 0:n.source}}};const W=["Default"];export{o as Default,W as __namedExportsOrder,V as default};
//# sourceMappingURL=Utenlandsopphold.stories-cff84b95.js.map
