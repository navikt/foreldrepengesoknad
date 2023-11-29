import{j as e}from"./jsx-runtime-69eee039.js";import{w as x}from"./withRouter-92fc33ca.js";import{w as j,F as g}from"./ForeldrepengerStateMock-6bee6c3f.js";import{A as S}from"./AxiosMock-93151916.js";import{_ as F}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{S as p}from"./Søkersituasjon-913ed0b0.js";import"./index-7c191284.js";import"./useSøknad-68f2101b.js";import"./Tidsperioden-34456269.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-4d14a9e9.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-4a411548.js";import"./amplitude-e7683f28.js";import"./api-c9fff41c.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-ad49f018.js";import"./Periodene-b9b510c3.js";import"./useOnValidSubmit-a8ea9520.js";import"./index-47edccfa.js";import"./useSøkerinfo-3dc1f3b8.js";const A=4,_="/soknad/uttaksplan-info",h={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{rolle:"",situasjon:""}},version:A,currentRoute:_,søknadGjelderEtNyttBarn:!0},k=F,m=h,Y={title:"steps/Søkersituasjon",component:p,decorators:[x,j]},d=({context:u,søkerinfo:f})=>{const l=M=>{M.onPost("/storage").reply(200,void 0)};return e.jsx(S,{mock:l,children:e.jsx(g,{søknad:u,søkerinfo:f,children:e.jsx(p,{})})})},o=d.bind({});o.args={context:m,søkerinfo:k,kjønn:"K"};const r=d.bind({});r.args={context:m,søkerinfo:{søker:{...k,kjønn:"M"}},kjønn:"M"};var t,n,s;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
}`,...(c=(a=r.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};const Z=["Default","Far"];export{o as Default,r as Far,Z as __namedExportsOrder,Y as default};
//# sourceMappingURL=Søkersituasjon.stories-56a47bbc.js.map
