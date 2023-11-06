import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withRouter-300d4136.js";import{w as d,F as k}from"./ForeldrepengerStateMock-3e3aa0d2.js";import{A as l}from"./AxiosMock-4a00635f.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as x}from"./soknadMedEttBarn-66625a0c.js";import{U as s}from"./Utenlandsopphold-e2c7ad29.js";import"./index-7c191284.js";import"./useSøknad-7a4f4355.js";import"./validationUtils-12868324.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-1fb11dfb.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-2a30620a.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-1b40cfe9.js";import"./amplitude-e7683f28.js";import"./api-f40a3af6.js";import"./apiInterceptor-7ea9ce80.js";import"./submitUtils-47cd0f64.js";import"./Periodene-2c8badc5.js";import"./useOnValidSubmit-054d434a.js";import"./formUtils-f076150c.js";const M=f,u=x,L={title:"steps/Utenlandsopphold",component:s,decorators:[c,d]},g=({context:p,søkerinfo:i})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(l,{mock:m,children:r.jsx(k,{søknad:p,søkerinfo:i,children:r.jsx(s,{})})})},o=g.bind({});o.args={context:u,søkerinfo:M};var t,e,n;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
}`,...(n=(e=o.parameters)==null?void 0:e.docs)==null?void 0:n.source}}};const N=["Default"];export{o as Default,N as __namedExportsOrder,L as default};
//# sourceMappingURL=Utenlandsopphold.stories-3659c1c1.js.map
