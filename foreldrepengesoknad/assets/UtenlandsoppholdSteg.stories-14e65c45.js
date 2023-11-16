import{j as t}from"./jsx-runtime-69eee039.js";import{w as c}from"./withRouter-5da68677.js";import{w as d,F as k}from"./ForeldrepengerStateMock-e822428a.js";import{A as l}from"./AxiosMock-264d8999.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as x}from"./soknadMedEttBarn-66625a0c.js";import{U as s}from"./UtenlandsoppholdSteg-ef0da64d.js";import"./index-7c191284.js";import"./useSøknad-b4078322.js";import"./Tidsperioden-297a98ae.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-5b982ed5.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-1e0d0b3f.js";import"./amplitude-e7683f28.js";import"./api-06957017.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-814eb1c0.js";import"./Periodene-a3aa2caf.js";import"./TidligereUtenlandsoppholdPanel-b83637af.js";import"./provider-ce5e3c55.js";import"./useOnValidSubmit-2f04562e.js";import"./message-ebd688c0.js";const g=f,M=x,Q={title:"steps/UtenlandsoppholdSteg",component:s,decorators:[c,d]},u=({context:p,søkerinfo:i})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return t.jsx(l,{mock:m,children:t.jsx(k,{søknad:p,søkerinfo:i,children:t.jsx(s,{})})})},o=u.bind({});o.args={context:M,søkerinfo:g};var r,e,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <UtenlandsoppholdSteg />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(n=(e=o.parameters)==null?void 0:e.docs)==null?void 0:n.source}}};const V=["Default"];export{o as Default,V as __namedExportsOrder,Q as default};
//# sourceMappingURL=UtenlandsoppholdSteg.stories-14e65c45.js.map
