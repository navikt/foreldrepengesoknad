import{j as r}from"./jsx-runtime-670450c2.js";import{w as a}from"./withIntl-386fbff7.js";import{w as c}from"./withRouter-28f7e065.js";import{w as d,F as k}from"./ForeldrepengerStateMock-2db4abe4.js";import{A as l}from"./AxiosMock-c2718ae9.js";import{_ as f}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{_ as M}from"./soknadMedEttBarn-66625a0c.js";import{U as i}from"./Utenlandsopphold-cd027470.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./IntlProvider-c8b29a86.js";import"./validationUtils-00d66cf2.js";import"./index-4d501b15.js";import"./Link-40b5f3c6.js";import"./clsx.m-266f4de0.js";import"./index-7e4e529b.js";import"./Label-bbf0f831.js";import"./index-96c5f47c.js";import"./extends-98964cd2.js";import"./useSøknad-54892a90.js";import"./dateUtils-becbdc23.js";import"./getTypedFormComponents-a42e978b.js";import"./mapSøkerinfoDTO-adbe2fb9.js";import"./useFortsettSøknadSenere-d27349ce.js";import"./amplitude-982d123d.js";import"./api-dc1b3239.js";import"./apiInterceptor-0530a171.js";import"./globalUtil-9d9e0ee4.js";import"./useOnValidSubmit-0d8cf87d.js";import"./useSaveLoadedRoute-352242ea.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-c5e558a5.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-1a4dc73e.js";import"./Periodene-dd720f95.js";import"./index-47edccfa.js";import"./formUtils-b1c6ed9d.js";const x=f,u=M,eo={title:"steps/Utenlandsopphold",component:i,decorators:[c,a,d]},h=({context:n,søkerinfo:s})=>r(l,{mock:m=>{m.onPost("/storage").reply(200,void 0)},children:r(k,{søknad:n,søkerinfo:s,children:r(i,{})})}),o=h.bind({});o.args={context:u,søkerinfo:x};var t,e,p;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Utenlandsopphold.stories-9203eb33.js.map
