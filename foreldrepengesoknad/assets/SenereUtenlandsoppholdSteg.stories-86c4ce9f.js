import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withRouter-5da68677.js";import{w as d,F as k}from"./ForeldrepengerStateMock-e822428a.js";import{A as l}from"./AxiosMock-264d8999.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as x}from"./soknadMedEttBarn-66625a0c.js";import{S as s}from"./SenereUtenlandsoppholdSteg-464b12c0.js";import"./index-7c191284.js";import"./useSøknad-b4078322.js";import"./Tidsperioden-297a98ae.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-5b982ed5.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-1e0d0b3f.js";import"./amplitude-e7683f28.js";import"./api-06957017.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-814eb1c0.js";import"./Periodene-a3aa2caf.js";import"./TidligereUtenlandsoppholdPanel-b83637af.js";import"./provider-ce5e3c55.js";import"./useOnValidSubmit-2f04562e.js";import"./message-ebd688c0.js";const S=f,g=x,Q={title:"steps/SenereUtenlandsoppholdSteg",component:s,decorators:[c,d]},M=({context:p,søkerinfo:i})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(l,{mock:m,children:r.jsx(k,{søknad:p,søkerinfo:i,children:r.jsx(s,{})})})},o=M.bind({});o.args={context:g,søkerinfo:S};var t,e,n;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <SenereUtenlandsoppholdSteg />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(n=(e=o.parameters)==null?void 0:e.docs)==null?void 0:n.source}}};const V=["Default"];export{o as Default,V as __namedExportsOrder,Q as default};
//# sourceMappingURL=SenereUtenlandsoppholdSteg.stories-86c4ce9f.js.map
