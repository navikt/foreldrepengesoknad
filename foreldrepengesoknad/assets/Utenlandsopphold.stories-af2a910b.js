import{j as r}from"./jsx-runtime-2c139190.js";import{w as a}from"./withIntl-c7b55499.js";import{w as c}from"./withRouter-811d5514.js";import{w as d,F as k}from"./ForeldrepengerStateMock-64041fcc.js";import{A as l}from"./AxiosMock-f9f6d3e3.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as M}from"./soknadMedEttBarn-66625a0c.js";import{U as i}from"./Utenlandsopphold-9fa840f2.js";import"./index-b14cf94f.js";import"./IntlProvider-2564294f.js";import"./validationUtils-8c57b3bf.js";import"./index-4d501b15.js";import"./Link-bafd8a7d.js";import"./clsx.m-266f4de0.js";import"./extends-3f1aa0c7.js";import"./index-99a37931.js";import"./index-7e4e529b.js";import"./Label-3bb7eadc.js";import"./v4-a960c1f4.js";import"./useSøknad-cee0c345.js";import"./dateUtils-895c9068.js";import"./getTypedFormComponents-5434d462.js";import"./mapSøkerinfoDTO-99b445cd.js";import"./useFortsettSøknadSenere-3971a100.js";import"./amplitude-7714a9b7.js";import"./api-b5f14cd5.js";import"./apiInterceptor-f5dabb2f.js";import"./globalUtil-9d9e0ee4.js";import"./useOnValidSubmit-9c291a6c.js";import"./useSaveLoadedRoute-04255621.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-a4e8332d.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-b94779f9.js";import"./Periodene-e5213d70.js";import"./index-47edccfa.js";import"./formUtils-47e5b872.js";const x=f,u=M,eo={title:"steps/Utenlandsopphold",component:i,decorators:[c,a,d]},h=({context:n,søkerinfo:s})=>r(l,{mock:m=>{m.onPost("/storage").reply(200,void 0)},children:r(k,{søknad:n,søkerinfo:s,children:r(i,{})})}),o=h.bind({});o.args={context:u,søkerinfo:x};var t,e,p;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Utenlandsopphold.stories-af2a910b.js.map
