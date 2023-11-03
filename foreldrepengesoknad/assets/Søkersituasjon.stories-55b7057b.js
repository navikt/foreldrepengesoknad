import{j as e}from"./jsx-runtime-69eee039.js";import{w as x}from"./withRouter-b443adb0.js";import{w as j,F as g}from"./ForeldrepengerStateMock-2b2feb9e.js";import{A as S}from"./AxiosMock-79cf94ea.js";import{_ as F}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{S as p}from"./Søkersituasjon-ecafde23.js";import"./index-7c191284.js";import"./useSøknad-5c5bca2e.js";import"./validationUtils-481ea31b.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-a53deccd.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-dbaf167a.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-aa81b91f.js";import"./amplitude-bdf1e125.js";import"./api-b158b98d.js";import"./apiInterceptor-7ea9ce80.js";import"./submitUtils-3b67bade.js";import"./Periodene-bb8992e3.js";import"./useOnValidSubmit-626a50a3.js";import"./useSøkerinfo-d70607f2.js";const A=4,_="/soknad/uttaksplan-info",h={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{rolle:"",situasjon:""}},version:A,currentRoute:_,søknadGjelderEtNyttBarn:!0},k=F,m=h,X={title:"steps/Søkersituasjon",component:p,decorators:[x,j]},d=({context:u,søkerinfo:f})=>{const l=M=>{M.onPost("/storage").reply(200,void 0)};return e.jsx(S,{mock:l,children:e.jsx(g,{søknad:u,søkerinfo:f,children:e.jsx(p,{})})})},o=d.bind({});o.args={context:m,søkerinfo:k,kjønn:"K"};const r=d.bind({});r.args={context:m,søkerinfo:{søker:{...k,kjønn:"M"}},kjønn:"M"};var t,n,s;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
//# sourceMappingURL=Søkersituasjon.stories-55b7057b.js.map
