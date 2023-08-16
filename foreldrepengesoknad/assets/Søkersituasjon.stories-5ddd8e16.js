import{j as t}from"./jsx-runtime-2c139190.js";import{w as M}from"./withIntl-68c16c87.js";import{w as x}from"./withRouter-811d5514.js";import{w as g,F as j}from"./ForeldrepengerStateMock-64041fcc.js";import{A as S}from"./AxiosMock-f9f6d3e3.js";import{_ as F}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{S as c}from"./Søkersituasjon-b724e20c.js";import"./index-b14cf94f.js";import"./IntlProvider-4cddb1e3.js";import"./validationUtils-8c57b3bf.js";import"./index-4d501b15.js";import"./Link-bafd8a7d.js";import"./clsx.m-266f4de0.js";import"./extends-3f1aa0c7.js";import"./index-99a37931.js";import"./index-7e4e529b.js";import"./Label-3bb7eadc.js";import"./v4-a960c1f4.js";import"./useSøknad-cee0c345.js";import"./dateUtils-895c9068.js";import"./getTypedFormComponents-5434d462.js";import"./mapSøkerinfoDTO-99b445cd.js";import"./useFortsettSøknadSenere-3971a100.js";import"./amplitude-7714a9b7.js";import"./api-b5f14cd5.js";import"./apiInterceptor-f5dabb2f.js";import"./globalUtil-9d9e0ee4.js";import"./useOnValidSubmit-9c291a6c.js";import"./useSaveLoadedRoute-04255621.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-a4e8332d.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-b94779f9.js";import"./Periodene-e5213d70.js";import"./index-47edccfa.js";import"./useSøkerinfo-669dfaf1.js";const A=4,_="/soknad/uttaksplan-info",h={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{rolle:"",situasjon:""}},version:A,currentRoute:_,søknadGjelderEtNyttBarn:!0},m=F,k=h,po={title:"steps/Søkersituasjon",component:c,decorators:[x,M,g]},d=({context:u,søkerinfo:f})=>t(S,{mock:l=>{l.onPost("/storage").reply(200,void 0)},children:t(j,{søknad:u,søkerinfo:f,children:t(c,{})})}),o=d.bind({});o.args={context:k,søkerinfo:m,kjønn:"K"};const r=d.bind({});r.args={context:k,søkerinfo:{søker:{...m,kjønn:"M"}},kjønn:"M"};var e,n,s;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Søkersituasjon />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(s=(n=o.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var i,a,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Søkersituasjon />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(p=(a=r.parameters)==null?void 0:a.docs)==null?void 0:p.source}}};const co=["Default","Far"];export{o as Default,r as Far,co as __namedExportsOrder,po as default};
//# sourceMappingURL=Søkersituasjon.stories-5ddd8e16.js.map
