import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withRouter-a172066d.js";import{w as d,F as k}from"./ForeldrepengerStateMock-c0a24792.js";import{A as l}from"./AxiosMock-fa099c59.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as x}from"./soknadMedEttBarn-66625a0c.js";import{U as s}from"./Utenlandsopphold-e54b3250.js";import"./index-7c191284.js";import"./useSøknad-26978d9c.js";import"./Tidsperioden-bc4aa89e.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-23fed2f2.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-798afdb6.js";import"./amplitude-e7683f28.js";import"./api-f185354c.js";import"./apiInterceptor-7ea9ce80.js";import"./submitUtils-ec131b19.js";import"./Periodene-3e3b4ab3.js";import"./useOnValidSubmit-6ae715f6.js";import"./message-0de53699.js";import"./formUtils-9352967f.js";const M=f,u=x,N={title:"steps/Utenlandsopphold",component:s,decorators:[c,d]},g=({context:p,søkerinfo:i})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(l,{mock:m,children:r.jsx(k,{søknad:p,søkerinfo:i,children:r.jsx(s,{})})})},o=g.bind({});o.args={context:u,søkerinfo:M};var t,e,n;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
}`,...(n=(e=o.parameters)==null?void 0:e.docs)==null?void 0:n.source}}};const Q=["Default"];export{o as Default,Q as __namedExportsOrder,N as default};
//# sourceMappingURL=Utenlandsopphold.stories-3e220f7f.js.map
