import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withIntl-34c91a9f.js";import{w as d}from"./withRouter-025ea7c0.js";import{w as k,F as l}from"./ForeldrepengerStateMock-14e379f5.js";import{A as f}from"./AxiosMock-6b1c8141.js";import{_ as x}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as M}from"./soknadMedEttBarn-66625a0c.js";import{U as i}from"./Utenlandsopphold-20eef3e2.js";import"./index-7c191284.js";import"./IntlProvider-703d2280.js";import"./validationUtils-52801e0e.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-d91e9ba5.js";import"./dateUtils-04b407de.js";import"./mapSøkerinfoDTO-3b9336f6.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-66d41ce7.js";import"./amplitude-bdf1e125.js";import"./api-9c727c36.js";import"./apiInterceptor-c6c2844c.js";import"./globalUtil-c820f73d.js";import"./submitUtils-11ed6e7a.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-fe89b468.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-604aac1e.js";import"./Periodene-21fb5519.js";import"./useOnValidSubmit-afa78197.js";import"./index-47edccfa.js";import"./formUtils-3000cdf9.js";const u=x,h=M,eo={title:"steps/Utenlandsopphold",component:i,decorators:[d,c,k]},g=({context:n,søkerinfo:s})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(f,{mock:m,children:r.jsx(l,{søknad:n,søkerinfo:s,children:r.jsx(i,{})})})},o=g.bind({});o.args={context:h,søkerinfo:u};var t,e,p;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Utenlandsopphold.stories-67d67d73.js.map
