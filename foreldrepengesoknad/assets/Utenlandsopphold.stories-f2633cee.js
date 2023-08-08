import{j as r}from"./jsx-runtime-2c139190.js";import{w as a}from"./withIntl-56d3014e.js";import{w as c}from"./withRouter-f5ce0c47.js";import{w as d,F as k}from"./ForeldrepengerStateMock-6cb8bbe3.js";import{A as l}from"./AxiosMock-1d20c8fe.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as M}from"./soknadMedEttBarn-66625a0c.js";import{U as i}from"./Utenlandsopphold-b45a310c.js";import"./index-b14cf94f.js";import"./IntlProvider-8c9095a4.js";import"./validationUtils-749fcdf4.js";import"./index-4d501b15.js";import"./Link-bafd8a7d.js";import"./clsx.m-266f4de0.js";import"./extends-3f1aa0c7.js";import"./index-99a37931.js";import"./index-7e4e529b.js";import"./Label-3bb7eadc.js";import"./v4-a960c1f4.js";import"./useSøknad-958c5a2a.js";import"./dateUtils-c35f161a.js";import"./getTypedFormComponents-d760cc41.js";import"./mapSøkerinfoDTO-ee5c98c4.js";import"./useFortsettSøknadSenere-3c16dad9.js";import"./amplitude-7714a9b7.js";import"./api-b639d329.js";import"./apiInterceptor-53028d2f.js";import"./globalUtil-9d9e0ee4.js";import"./useOnValidSubmit-c90b0d0a.js";import"./useSaveLoadedRoute-fbce50ec.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-40a9f1c3.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-756f8671.js";import"./Periodene-6b5e37b0.js";import"./index-47edccfa.js";import"./formUtils-7620ebbd.js";const x=f,u=M,eo={title:"steps/Utenlandsopphold",component:i,decorators:[c,a,d]},h=({context:n,søkerinfo:s})=>r(l,{mock:m=>{m.onPost("/storage").reply(200,void 0)},children:r(k,{søknad:n,søkerinfo:s,children:r(i,{})})}),o=h.bind({});o.args={context:u,søkerinfo:x};var t,e,p;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Utenlandsopphold.stories-f2633cee.js.map
