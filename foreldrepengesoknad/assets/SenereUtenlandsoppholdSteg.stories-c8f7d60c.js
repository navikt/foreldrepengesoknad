import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withRouter-07d4d255.js";import{w as d,F as k}from"./ForeldrepengerStateMock-877a4dc2.js";import{A as l}from"./AxiosMock-6d22f902.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as x}from"./soknadMedEttBarn-66625a0c.js";import{S as s}from"./SenereUtenlandsoppholdSteg-9342f90a.js";import"./index-7c191284.js";import"./useSøknad-21fd1dca.js";import"./Tidsperioden-4a2706b8.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-a41d39b4.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-cba3e87e.js";import"./amplitude-e7683f28.js";import"./api-ddd1803f.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-c2450d86.js";import"./Periodene-c0dd0109.js";import"./TidligereUtenlandsoppholdPanel-4f27df01.js";import"./provider-90367d3a.js";import"./useOnValidSubmit-7c76a5c0.js";import"./message-a0ddcb00.js";const S=f,g=x,Q={title:"steps/SenereUtenlandsoppholdSteg",component:s,decorators:[c,d]},M=({context:p,søkerinfo:i})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(l,{mock:m,children:r.jsx(k,{søknad:p,søkerinfo:i,children:r.jsx(s,{})})})},o=M.bind({});o.args={context:g,søkerinfo:S};var t,e,n;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=SenereUtenlandsoppholdSteg.stories-c8f7d60c.js.map
