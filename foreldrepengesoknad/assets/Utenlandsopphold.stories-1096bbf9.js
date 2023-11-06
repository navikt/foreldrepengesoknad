import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withRouter-abe5f971.js";import{w as d,F as k}from"./ForeldrepengerStateMock-2da5e9a6.js";import{A as l}from"./AxiosMock-030c8bf1.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as x}from"./soknadMedEttBarn-66625a0c.js";import{U as s}from"./Utenlandsopphold-9c8d97b0.js";import"./index-7c191284.js";import"./useSøknad-05357384.js";import"./validationUtils-5499fd9f.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-1fb11dfb.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-2a26cc46.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-2f0f23d4.js";import"./amplitude-e7683f28.js";import"./api-586fa5a6.js";import"./apiInterceptor-7ea9ce80.js";import"./submitUtils-ed03f05c.js";import"./Periodene-b35d6a88.js";import"./useOnValidSubmit-793544df.js";import"./formUtils-a1fa05f4.js";const M=f,u=x,L={title:"steps/Utenlandsopphold",component:s,decorators:[c,d]},g=({context:p,søkerinfo:i})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(l,{mock:m,children:r.jsx(k,{søknad:p,søkerinfo:i,children:r.jsx(s,{})})})},o=g.bind({});o.args={context:u,søkerinfo:M};var t,e,n;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Utenlandsopphold.stories-1096bbf9.js.map
