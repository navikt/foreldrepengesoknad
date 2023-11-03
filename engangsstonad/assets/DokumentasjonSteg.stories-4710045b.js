import{j as i}from"./index-552ad868.js";import{a as n}from"./chunk-AY7I2SME-331d03ca.js";import{D as E,M as A}from"./DokumentasjonSteg-dc558893.js";import{P as a,i as B,E as D}from"./useEsNavigator-bbc25890.js";import{w as M}from"./withRouter-e8512c69.js";import"./_baseToString-4ec4abc0.js";import{a as h}from"./attachmentApi-249da397.js";import{E as O}from"./EsContextStorybookHelper-eda3df1e.js";import"./index-99bae1ec.js";import"./_createSet-60a7752f.js";import"./v4-a960c1f4.js";import"./ErrorSummaryHookForm-7c5df48f.js";const I={title:"DokumentasjonSteg",component:E,decorators:[M]},r=({gåTilNesteSide:f,omBarnet:T,skalFeileOpplasting:y=!1})=>{B();const s=new A(h);return y||(s.onPost("/storage/vedlegg").reply(200),s.onPost("http://localhost:8888/rest/storage/vedlegg").reply(200)),i.jsx(O,{onDispatch:f,initialState:{[D.OM_BARNET]:T},children:i.jsx(E,{})})},e=r.bind({});e.args={gåTilNesteSide:n("button-click"),routerDecoratorInitUrl:a.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"}};const t=r.bind({});t.args={gåTilNesteSide:n("button-click"),routerDecoratorInitUrl:a.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};const o=r.bind({});o.args={gåTilNesteSide:n("button-click"),skalFeileOpplasting:!0,routerDecoratorInitUrl:a.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};var l,p,c;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`({
  gåTilNesteSide,
  omBarnet,
  skalFeileOpplasting = false
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/storage/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/vedlegg').reply(200); //test
  }

  return <EsContextStorybookHelper onDispatch={gåTilNesteSide} initialState={{
    [EsDataType.OM_BARNET]: omBarnet
  }}>
            <DokumentasjonSteg />
        </EsContextStorybookHelper>;
}`,...(c=(p=e.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var m,d,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`({
  gåTilNesteSide,
  omBarnet,
  skalFeileOpplasting = false
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/storage/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/vedlegg').reply(200); //test
  }

  return <EsContextStorybookHelper onDispatch={gåTilNesteSide} initialState={{
    [EsDataType.OM_BARNET]: omBarnet
  }}>
            <DokumentasjonSteg />
        </EsContextStorybookHelper>;
}`,...(g=(d=t.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var k,S,u;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`({
  gåTilNesteSide,
  omBarnet,
  skalFeileOpplasting = false
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/storage/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/vedlegg').reply(200); //test
  }

  return <EsContextStorybookHelper onDispatch={gåTilNesteSide} initialState={{
    [EsDataType.OM_BARNET]: omBarnet
  }}>
            <DokumentasjonSteg />
        </EsContextStorybookHelper>;
}`,...(u=(S=o.parameters)==null?void 0:S.docs)==null?void 0:u.source}}};const K=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,o as FeilerOpplastinger,e as Terminbekreftelse,K as __namedExportsOrder,I as default};
//# sourceMappingURL=DokumentasjonSteg.stories-4710045b.js.map
