import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withIntl-399c5617.js";import{w as d}from"./withRouter-301aa323.js";import{w as k,F as l}from"./ForeldrepengerStateMock-ab70662c.js";import{A as f}from"./AxiosMock-b3174e3d.js";import{_ as x}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as M}from"./soknadMedEttBarn-66625a0c.js";import{U as i}from"./Utenlandsopphold-1daa603a.js";import"./index-7c191284.js";import"./IntlProvider-5610d1ac.js";import"./validationUtils-5cf0875a.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-4276ca26.js";import"./dateUtils-b148e0a6.js";import"./Environment-07523402.js";import"./mapSøkerinfoDTO-3498614f.js";import"./useSaveLoadedRoute-a887bf0a.js";import"./amplitude-bdf1e125.js";import"./api-265d54eb.js";import"./apiInterceptor-dfae0758.js";import"./globalUtil-c820f73d.js";import"./submitUtils-8627933a.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-c6c4eae6.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-e561e2d9.js";import"./Periodene-bb5ac21b.js";import"./useOnValidSubmit-e4075478.js";import"./index-47edccfa.js";import"./formUtils-1c3c4c72.js";const u=x,h=M,eo={title:"steps/Utenlandsopphold",component:i,decorators:[d,c,k]},g=({context:n,søkerinfo:s})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(f,{mock:m,children:r.jsx(l,{søknad:n,søkerinfo:s,children:r.jsx(i,{})})})},o=g.bind({});o.args={context:h,søkerinfo:u};var t,e,p;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
}`,...(p=(e=o.parameters)==null?void 0:e.docs)==null?void 0:p.source}}};const po=["Default"];export{o as Default,po as __namedExportsOrder,eo as default};
//# sourceMappingURL=Utenlandsopphold.stories-6f27fbbf.js.map
