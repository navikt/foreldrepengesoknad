import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withRouter-c9426938.js";import{w as d,F as k}from"./ForeldrepengerStateMock-52472ab7.js";import{A as l}from"./AxiosMock-5e424b87.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as x}from"./soknadMedEttBarn-66625a0c.js";import{U as s}from"./Utenlandsopphold-5a0b4269.js";import"./index-7c191284.js";import"./useSøknad-6273a8f6.js";import"./Tidsperioden-f1b2e608.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-f28ff869.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-f92b3634.js";import"./amplitude-e7683f28.js";import"./api-c3a2edb1.js";import"./apiInterceptor-7ea9ce80.js";import"./submitUtils-9aa0c51a.js";import"./Periodene-16568c49.js";import"./useOnValidSubmit-b52fc2a5.js";import"./message-ad1f1800.js";import"./formUtils-9ef342c5.js";const M=f,u=x,N={title:"steps/Utenlandsopphold",component:s,decorators:[c,d]},g=({context:p,søkerinfo:i})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(l,{mock:m,children:r.jsx(k,{søknad:p,søkerinfo:i,children:r.jsx(s,{})})})},o=g.bind({});o.args={context:u,søkerinfo:M};var t,e,n;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Utenlandsopphold.stories-b799dbfc.js.map
