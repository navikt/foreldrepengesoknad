import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withRouter-b443adb0.js";import{w as d,F as k}from"./ForeldrepengerStateMock-2b2feb9e.js";import{A as l}from"./AxiosMock-79cf94ea.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as x}from"./soknadMedEttBarn-66625a0c.js";import{U as s}from"./Utenlandsopphold-80cb1c78.js";import"./index-7c191284.js";import"./useSøknad-5c5bca2e.js";import"./validationUtils-481ea31b.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-a53deccd.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-dbaf167a.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-aa81b91f.js";import"./amplitude-bdf1e125.js";import"./api-b158b98d.js";import"./apiInterceptor-7ea9ce80.js";import"./submitUtils-3b67bade.js";import"./Periodene-bb8992e3.js";import"./useOnValidSubmit-626a50a3.js";import"./formUtils-29ccf6bd.js";const M=f,u=x,L={title:"steps/Utenlandsopphold",component:s,decorators:[c,d]},g=({context:p,søkerinfo:i})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(l,{mock:m,children:r.jsx(k,{søknad:p,søkerinfo:i,children:r.jsx(s,{})})})},o=g.bind({});o.args={context:u,søkerinfo:M};var t,e,n;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Utenlandsopphold.stories-ee23e70c.js.map
