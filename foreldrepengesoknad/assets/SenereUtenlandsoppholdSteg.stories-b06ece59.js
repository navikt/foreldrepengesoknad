import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withRouter-92fc33ca.js";import{w as d,F as k}from"./ForeldrepengerStateMock-6bee6c3f.js";import{A as l}from"./AxiosMock-93151916.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as x}from"./soknadMedEttBarn-66625a0c.js";import{S as s}from"./SenereUtenlandsoppholdSteg-3f5e9c4d.js";import"./index-7c191284.js";import"./useSøknad-68f2101b.js";import"./Tidsperioden-34456269.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-4d14a9e9.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-4a411548.js";import"./amplitude-e7683f28.js";import"./api-c9fff41c.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-ad49f018.js";import"./Periodene-b9b510c3.js";import"./TidligereUtenlandsoppholdPanel-678ffe58.js";import"./provider-be657796.js";import"./useOnValidSubmit-a8ea9520.js";import"./message-46ff19cd.js";const S=f,g=x,Q={title:"steps/SenereUtenlandsoppholdSteg",component:s,decorators:[c,d]},M=({context:p,søkerinfo:i})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(l,{mock:m,children:r.jsx(k,{søknad:p,søkerinfo:i,children:r.jsx(s,{})})})},o=M.bind({});o.args={context:g,søkerinfo:S};var t,e,n;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=SenereUtenlandsoppholdSteg.stories-b06ece59.js.map
