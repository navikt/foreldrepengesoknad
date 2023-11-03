import{j as e}from"./jsx-runtime-69eee039.js";import{w as x}from"./withRouter-ab431e13.js";import{w as j,F as g}from"./ForeldrepengerStateMock-ae7feae9.js";import{A as S}from"./AxiosMock-5a6f61ee.js";import{_ as F}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{S as p}from"./Søkersituasjon-113d53d7.js";import"./index-7c191284.js";import"./useSøknad-e5916e1e.js";import"./validationUtils-024c2399.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-1fb11dfb.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-695a75e8.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-b612c2e3.js";import"./amplitude-e7683f28.js";import"./api-6765dbc0.js";import"./apiInterceptor-7ea9ce80.js";import"./submitUtils-db323592.js";import"./Periodene-7d2fd09b.js";import"./useOnValidSubmit-63822350.js";import"./useSøkerinfo-17a18f9b.js";const A=4,_="/soknad/uttaksplan-info",h={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{rolle:"",situasjon:""}},version:A,currentRoute:_,søknadGjelderEtNyttBarn:!0},k=F,m=h,X={title:"steps/Søkersituasjon",component:p,decorators:[x,j]},d=({context:u,søkerinfo:f})=>{const l=M=>{M.onPost("/storage").reply(200,void 0)};return e.jsx(S,{mock:l,children:e.jsx(g,{søknad:u,søkerinfo:f,children:e.jsx(p,{})})})},o=d.bind({});o.args={context:m,søkerinfo:k,kjønn:"K"};const r=d.bind({});r.args={context:m,søkerinfo:{søker:{...k,kjønn:"M"}},kjønn:"M"};var t,n,s;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
}`,...(s=(n=o.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var i,a,c;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(c=(a=r.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};const Y=["Default","Far"];export{o as Default,r as Far,Y as __namedExportsOrder,X as default};
//# sourceMappingURL=Søkersituasjon.stories-345c9077.js.map
