import{j as t}from"./jsx-runtime-69eee039.js";import{w as c}from"./withRouter-56232b1a.js";import{w as d,F as k}from"./ForeldrepengerStateMock-482e9843.js";import{A as l}from"./AxiosMock-8e9101d3.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as x}from"./soknadMedEttBarn-66625a0c.js";import{U as s}from"./UtenlandsoppholdSteg-9e6e8aec.js";import"./index-7c191284.js";import"./useSøknad-04b7b25e.js";import"./Tidsperioden-4a2706b8.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-839b6817.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-39f09b2c.js";import"./amplitude-e7683f28.js";import"./api-ddd1803f.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-26f9dee8.js";import"./Periodene-c0dd0109.js";import"./TidligereUtenlandsoppholdPanel-b735e2cd.js";import"./provider-90367d3a.js";import"./useOnValidSubmit-19c0082d.js";import"./message-a0ddcb00.js";const g=f,M=x,Q={title:"steps/UtenlandsoppholdSteg",component:s,decorators:[c,d]},u=({context:p,søkerinfo:i})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return t.jsx(l,{mock:m,children:t.jsx(k,{søknad:p,søkerinfo:i,children:t.jsx(s,{})})})},o=u.bind({});o.args={context:M,søkerinfo:g};var r,e,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
//# sourceMappingURL=UtenlandsoppholdSteg.stories-2faa43af.js.map
