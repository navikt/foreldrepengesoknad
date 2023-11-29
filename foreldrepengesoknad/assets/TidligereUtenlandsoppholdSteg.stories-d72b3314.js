import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withRouter-9e2d0a61.js";import{w as d,F as l}from"./ForeldrepengerStateMock-a4e94e19.js";import{A as k}from"./AxiosMock-edaed87d.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as g}from"./soknadMedEttBarn-66625a0c.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-72d5f31b.js";import"./index-7c191284.js";import"./useSøknad-495634b0.js";import"./Tidsperioden-297a98ae.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-e8a2d00e.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-0daceb5a.js";import"./amplitude-e7683f28.js";import"./api-06957017.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-76592a05.js";import"./Periodene-a3aa2caf.js";import"./TidligereUtenlandsoppholdPanel-8d90de01.js";import"./provider-ce5e3c55.js";import"./useOnValidSubmit-150f610e.js";import"./message-ebd688c0.js";const x=f,M=g,Q={title:"steps/TidligereUtenlandsoppholdSteg",component:s,decorators:[c,d]},u=({context:i,søkerinfo:p})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(k,{mock:m,children:r.jsx(l,{søknad:i,søkerinfo:p,children:r.jsx(s,{})})})},o=u.bind({});o.args={context:M,søkerinfo:x};var t,e,n;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=TidligereUtenlandsoppholdSteg.stories-d72b3314.js.map
