import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withIntl-902881a4.js";import{w as d}from"./withRouter-79d071e3.js";import{w as k,F as l}from"./ForeldrepengerStateMock-890b5f79.js";import{A as f}from"./AxiosMock-c30d8940.js";import{_ as x}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as M}from"./soknadMedEttBarn-66625a0c.js";import{U as i}from"./Utenlandsopphold-81dc376c.js";import"./index-7c191284.js";import"./IntlProvider-a6625fc8.js";import"./validationUtils-52801e0e.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-298af852.js";import"./dateUtils-a4ce83a0.js";import"./Environment-07523402.js";import"./mapSøkerinfoDTO-fba55ae3.js";import"./useSaveLoadedRoute-c0ec6c65.js";import"./amplitude-bdf1e125.js";import"./api-3c6c36ba.js";import"./apiInterceptor-dfae0758.js";import"./globalUtil-c820f73d.js";import"./submitUtils-e43e4b36.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-fe89b468.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-1f66382d.js";import"./Periodene-98e86dd9.js";import"./useOnValidSubmit-44488e46.js";import"./index-47edccfa.js";import"./formUtils-3000cdf9.js";const u=x,h=M,eo={title:"steps/Utenlandsopphold",component:i,decorators:[d,c,k]},g=({context:n,søkerinfo:s})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(f,{mock:m,children:r.jsx(l,{søknad:n,søkerinfo:s,children:r.jsx(i,{})})})},o=g.bind({});o.args={context:h,søkerinfo:u};var t,e,p;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Utenlandsopphold.stories-6d51de37.js.map
