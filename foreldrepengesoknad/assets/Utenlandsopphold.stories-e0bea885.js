import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withIntl-4043b8b4.js";import{w as d}from"./withRouter-2e2c6e6b.js";import{w as k,F as l}from"./ForeldrepengerStateMock-8c04d332.js";import{A as f}from"./AxiosMock-e7ccc573.js";import{_ as x}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as M}from"./soknadMedEttBarn-66625a0c.js";import{U as s}from"./Utenlandsopphold-6cd8ffaa.js";import"./index-7c191284.js";import"./IntlProvider-7d7f37e2.js";import"./validationUtils-3923a44f.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-32a27317.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./useSøknad-bb41a340.js";import"./mapSøkerinfoDTO-f0b0bc3c.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-44907666.js";import"./amplitude-bdf1e125.js";import"./api-39fe6dcd.js";import"./apiInterceptor-7ea9ce80.js";import"./submitUtils-deb96a79.js";import"./Periodene-7b9c80a7.js";import"./useOnValidSubmit-aae2fccb.js";import"./formUtils-f08b9c6b.js";const u=x,h=M,V={title:"steps/Utenlandsopphold",component:s,decorators:[d,c,k]},g=({context:p,søkerinfo:i})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(f,{mock:m,children:r.jsx(l,{søknad:p,søkerinfo:i,children:r.jsx(s,{})})})},o=g.bind({});o.args={context:h,søkerinfo:u};var t,e,n;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Utenlandsopphold.stories-e0bea885.js.map
