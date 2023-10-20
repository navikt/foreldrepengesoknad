import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withIntl-37694412.js";import{w as d}from"./withRouter-45b25a28.js";import{w as k,F as l}from"./ForeldrepengerStateMock-712e501b.js";import{A as f}from"./AxiosMock-ad51d490.js";import{_ as x}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as M}from"./soknadMedEttBarn-66625a0c.js";import{U as i}from"./Utenlandsopphold-c5c3b3fd.js";import"./index-7c191284.js";import"./IntlProvider-c3950eb6.js";import"./validationUtils-8694f281.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-368a450f.js";import"./dateUtils-af0e9454.js";import"./mapSøkerinfoDTO-248af1a5.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-44666777.js";import"./amplitude-bdf1e125.js";import"./api-98fb1897.js";import"./apiInterceptor-c6c2844c.js";import"./globalUtil-c820f73d.js";import"./submitUtils-90494ef4.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-1fdebe38.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-d5cd0616.js";import"./Periodene-a5e0e5ab.js";import"./useOnValidSubmit-06334c7f.js";import"./index-47edccfa.js";import"./formUtils-1a4b7700.js";const u=x,h=M,eo={title:"steps/Utenlandsopphold",component:i,decorators:[d,c,k]},g=({context:n,søkerinfo:s})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(f,{mock:m,children:r.jsx(l,{søknad:n,søkerinfo:s,children:r.jsx(i,{})})})},o=g.bind({});o.args={context:h,søkerinfo:u};var t,e,p;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Utenlandsopphold.stories-da90912b.js.map
