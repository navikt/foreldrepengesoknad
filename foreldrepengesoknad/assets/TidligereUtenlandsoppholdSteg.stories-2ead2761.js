import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withRouter-92fc33ca.js";import{w as d,F as l}from"./ForeldrepengerStateMock-6bee6c3f.js";import{A as k}from"./AxiosMock-93151916.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as g}from"./soknadMedEttBarn-66625a0c.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-18a12e0f.js";import"./index-7c191284.js";import"./useSøknad-68f2101b.js";import"./Tidsperioden-34456269.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-4d14a9e9.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-4a411548.js";import"./amplitude-e7683f28.js";import"./api-c9fff41c.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-ad49f018.js";import"./Periodene-b9b510c3.js";import"./TidligereUtenlandsoppholdPanel-678ffe58.js";import"./provider-be657796.js";import"./useOnValidSubmit-a8ea9520.js";import"./message-46ff19cd.js";const x=f,M=g,Q={title:"steps/TidligereUtenlandsoppholdSteg",component:s,decorators:[c,d]},u=({context:i,søkerinfo:p})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(k,{mock:m,children:r.jsx(l,{søknad:i,søkerinfo:p,children:r.jsx(s,{})})})},o=u.bind({});o.args={context:M,søkerinfo:x};var t,e,n;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <TidligereUtenlandsoppholdSteg />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(n=(e=o.parameters)==null?void 0:e.docs)==null?void 0:n.source}}};const V=["Default"];export{o as Default,V as __namedExportsOrder,Q as default};
//# sourceMappingURL=TidligereUtenlandsoppholdSteg.stories-2ead2761.js.map
