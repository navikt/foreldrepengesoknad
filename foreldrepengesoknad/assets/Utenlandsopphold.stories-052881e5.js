import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withIntl-62bb03b8.js";import{w as d}from"./withRouter-50e5a3a8.js";import{w as k,F as l}from"./ForeldrepengerStateMock-5e97e270.js";import{A as f}from"./AxiosMock-84c9c037.js";import{_ as x}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as M}from"./soknadMedEttBarn-66625a0c.js";import{U as i}from"./Utenlandsopphold-80f4969b.js";import"./index-7c191284.js";import"./IntlProvider-1400e4d8.js";import"./validationUtils-0c7fa3e5.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-a6eb7500.js";import"./dateUtils-2cd75fe4.js";import"./Environment-07523402.js";import"./mapSøkerinfoDTO-c91ff169.js";import"./useSaveLoadedRoute-be1eb81e.js";import"./amplitude-bdf1e125.js";import"./api-7b722a65.js";import"./apiInterceptor-dfae0758.js";import"./globalUtil-c820f73d.js";import"./submitUtils-c3cad064.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-3d0150ec.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-07636938.js";import"./Periodene-255b16d1.js";import"./useOnValidSubmit-bd5aa797.js";import"./index-47edccfa.js";import"./formUtils-d5863e5c.js";const u=x,h=M,eo={title:"steps/Utenlandsopphold",component:i,decorators:[d,c,k]},g=({context:n,søkerinfo:s})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(f,{mock:m,children:r.jsx(l,{søknad:n,søkerinfo:s,children:r.jsx(i,{})})})},o=g.bind({});o.args={context:h,søkerinfo:u};var t,e,p;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Utenlandsopphold.stories-052881e5.js.map
