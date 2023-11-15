import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withRouter-ea3f6473.js";import{w as d,F as k}from"./ForeldrepengerStateMock-1c985e4b.js";import{A as l}from"./AxiosMock-3d8f63c0.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as x}from"./soknadMedEttBarn-66625a0c.js";import{U as s}from"./Utenlandsopphold-85e379f4.js";import"./index-7c191284.js";import"./useSøknad-db05d405.js";import"./Tidsperioden-e35adfd7.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-96a11041.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-45925dc3.js";import"./amplitude-e7683f28.js";import"./api-b9d2cb87.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-fb70e088.js";import"./Periodene-9d7718bb.js";import"./useOnValidSubmit-e296e560.js";import"./message-14dee22d.js";import"./formUtils-f30217dc.js";const M=f,u=x,N={title:"steps/Utenlandsopphold",component:s,decorators:[c,d]},g=({context:p,søkerinfo:i})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(l,{mock:m,children:r.jsx(k,{søknad:p,søkerinfo:i,children:r.jsx(s,{})})})},o=g.bind({});o.args={context:u,søkerinfo:M};var t,e,n;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Utenlandsopphold.stories-eb68cd14.js.map
