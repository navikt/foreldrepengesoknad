import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withIntl-17b5525d.js";import{w as d}from"./withRouter-83360639.js";import{w as k,F as l}from"./ForeldrepengerStateMock-3c85b779.js";import{A as f}from"./AxiosMock-a909d7a1.js";import{_ as x}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as M}from"./soknadMedEttBarn-66625a0c.js";import{U as i}from"./Utenlandsopphold-d9dd7be1.js";import"./index-7c191284.js";import"./IntlProvider-f163e949.js";import"./validationUtils-5694e48a.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-4b034f0e.js";import"./dateUtils-34a1bc56.js";import"./Environment-07523402.js";import"./mapSøkerinfoDTO-b5a3a065.js";import"./useSaveLoadedRoute-6c82e269.js";import"./amplitude-bdf1e125.js";import"./api-2c42af4e.js";import"./apiInterceptor-dfae0758.js";import"./globalUtil-c820f73d.js";import"./submitUtils-8db703e8.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-9787ac0f.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-db5d7350.js";import"./Periodene-9940b200.js";import"./useOnValidSubmit-4b0f9523.js";import"./index-47edccfa.js";import"./formUtils-ac00ed39.js";const u=x,h=M,eo={title:"steps/Utenlandsopphold",component:i,decorators:[d,c,k]},g=({context:n,søkerinfo:s})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(f,{mock:m,children:r.jsx(l,{søknad:n,søkerinfo:s,children:r.jsx(i,{})})})},o=g.bind({});o.args={context:h,søkerinfo:u};var t,e,p;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Utenlandsopphold.stories-a520b845.js.map
