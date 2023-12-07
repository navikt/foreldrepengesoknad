import{j as o}from"./jsx-runtime-69eee039.js";import{a as l}from"./chunk-AY7I2SME-331d03ca.js";import{w as c}from"./withRouter-f0df7a0f.js";import{A as g}from"./AxiosMock-ee1c53ff.js";import{T as n}from"./TidligereUtenlandsoppholdSteg-624ce7b2.js";import{F as k,C as u}from"./FpDataContext-75ac2616.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./Tidsperioden-a95d044c.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./TidligereUtenlandsoppholdPanel-da6de2ad.js";import"./ErrorSummaryHookForm-ec860d4c.js";import"./dateFormValidation-fedc3c4d.js";import"./provider-621cc7ef.js";import"./exports-70c8b745.js";import"./amplitude-140e185d.js";import"./stepsConfig-527b68d8.js";import"./routes-9effe5a6.js";import"./validation-631bcf6e.js";import"./message-650a43cb.js";const I={title:"steps/TidligereUtenlandsoppholdSteg",component:n,decorators:[c]},S=({mellomlagreSøknadOgNaviger:a=l("button-click"),gåTilNesteSide:p,utenlandsopphold:s={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(g,{mock:m,children:o.jsx(k,{onDispatch:p,initialState:{[u.UTENLANDSOPPHOLD]:s},children:o.jsx(n,{mellomlagreSøknadOgNaviger:a,avbrytSøknad:()=>{}})})})},t=S.bind({});var e,r,i;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = action('button-click'),
  gåTilNesteSide,
  utenlandsopphold = {
    iNorgeNeste12Mnd: true,
    iNorgeSiste12Mnd: false
  }
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold
    }}>
                <TidligereUtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(i=(r=t.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const J=["Default"];export{t as Default,J as __namedExportsOrder,I as default};
//# sourceMappingURL=TidligereUtenlandsoppholdSteg.stories-c7929b8d.js.map
