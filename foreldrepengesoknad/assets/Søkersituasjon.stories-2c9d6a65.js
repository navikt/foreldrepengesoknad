import{j as t}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-399c5617.js";import{w as j}from"./withRouter-301aa323.js";import{w as g,F as S}from"./ForeldrepengerStateMock-ab70662c.js";import{A as F}from"./AxiosMock-b3174e3d.js";import{_ as A}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{S as c}from"./Søkersituasjon-4246e90d.js";import"./index-7c191284.js";import"./IntlProvider-5610d1ac.js";import"./validationUtils-5cf0875a.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-4276ca26.js";import"./dateUtils-b148e0a6.js";import"./Environment-07523402.js";import"./mapSøkerinfoDTO-3498614f.js";import"./useSaveLoadedRoute-a887bf0a.js";import"./amplitude-bdf1e125.js";import"./api-265d54eb.js";import"./apiInterceptor-dfae0758.js";import"./globalUtil-c820f73d.js";import"./submitUtils-8627933a.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-c6c4eae6.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-e561e2d9.js";import"./Periodene-bb5ac21b.js";import"./useOnValidSubmit-e4075478.js";import"./index-47edccfa.js";import"./useSøkerinfo-68255a72.js";const _=4,h="/soknad/uttaksplan-info",w={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{rolle:"",situasjon:""}},version:_,currentRoute:h,søknadGjelderEtNyttBarn:!0},m=A,k=w,po={title:"steps/Søkersituasjon",component:c,decorators:[j,x,g]},d=({context:u,søkerinfo:f})=>{const l=M=>{M.onPost("/storage").reply(200,void 0)};return t.jsx(F,{mock:l,children:t.jsx(S,{søknad:u,søkerinfo:f,children:t.jsx(c,{})})})},o=d.bind({});o.args={context:k,søkerinfo:m,kjønn:"K"};const r=d.bind({});r.args={context:k,søkerinfo:{søker:{...m,kjønn:"M"}},kjønn:"M"};var e,n,s;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`({
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
//# sourceMappingURL=Søkersituasjon.stories-2c9d6a65.js.map
