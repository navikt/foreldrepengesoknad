import{j as r}from"./jsx-runtime-69eee039.js";import{w as c}from"./withIntl-e58a24a5.js";import{w as d}from"./withRouter-7855e4ba.js";import{w as k,F as l}from"./ForeldrepengerStateMock-3005dbc2.js";import{A as f}from"./AxiosMock-17aa2afc.js";import{_ as x}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as M}from"./soknadMedEttBarn-66625a0c.js";import{U as i}from"./Utenlandsopphold-c498f631.js";import"./index-7c191284.js";import"./IntlProvider-81e30403.js";import"./validationUtils-98d33cd3.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./extends-fed75772.js";import"./index-ecbee218.js";import"./index-e13aeee6.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-73e632aa.js";import"./dateUtils-3d3f8269.js";import"./getTypedFormComponents-b55cb5c1.js";import"./mapSøkerinfoDTO-d68bd2d0.js";import"./useSaveLoadedRoute-952bea34.js";import"./amplitude-bdf1e125.js";import"./api-758ba7aa.js";import"./apiInterceptor-d433db8f.js";import"./globalUtil-c820f73d.js";import"./submitUtils-6c106b54.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-7a6031f5.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-09efc595.js";import"./Periodene-393eac0e.js";import"./useOnValidSubmit-6a51f59a.js";import"./index-47edccfa.js";import"./formUtils-17a5d191.js";const u=x,h=M,eo={title:"steps/Utenlandsopphold",component:i,decorators:[d,c,k]},g=({context:n,søkerinfo:s})=>{const m=a=>{a.onPost("/storage").reply(200,void 0)};return r.jsx(f,{mock:m,children:r.jsx(l,{søknad:n,søkerinfo:s,children:r.jsx(i,{})})})},o=g.bind({});o.args={context:h,søkerinfo:u};var t,e,p;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Utenlandsopphold.stories-ac75d3b8.js.map
