import{j as i}from"./index-0dcb57ee.js";import{a as n}from"./chunk-AY7I2SME-331d03ca.js";import{D as E,M as A}from"./DokumentasjonSteg-fe822377.js";import{P as r,i as B,g as D}from"./useEsNavigator-60ac581c.js";import{w as M}from"./withRouter-11978fbf.js";import"./index-7c191284.js";import{a as h}from"./attachmentApi-249da397.js";import{E as O}from"./EsContextStorybookHelper-674339d0.js";import"./tslib.es6-c380bd65.js";import"./v4-a960c1f4.js";import"./ErrorSummaryHookForm-7e8b1411.js";import"./_baseToString-8992fead.js";import"./_createSet-216b1892.js";import"./index-b3a39e30.js";const L={title:"DokumentasjonSteg",component:E,decorators:[M]},a=({gåTilNesteSide:f,omBarnet:T,skalFeileOpplasting:y=!1})=>{B();const s=new A(h);return y||(s.onPost("/storage/vedlegg").reply(200),s.onPost("http://localhost:8888/rest/storage/vedlegg").reply(200)),i.jsx(O,{onDispatch:f,initialState:{[D.OM_BARNET]:T},children:i.jsx(E,{})})},e=a.bind({});e.args={gåTilNesteSide:n("button-click"),routerDecoratorInitUrl:r.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"}};const t=a.bind({});t.args={gåTilNesteSide:n("button-click"),routerDecoratorInitUrl:r.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};const o=a.bind({});o.args={gåTilNesteSide:n("button-click"),skalFeileOpplasting:!0,routerDecoratorInitUrl:r.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};var l,p,c;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`({
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
}`,...(u=(S=o.parameters)==null?void 0:S.docs)==null?void 0:u.source}}};const U=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,o as FeilerOpplastinger,e as Terminbekreftelse,U as __namedExportsOrder,L as default};
//# sourceMappingURL=DokumentasjonSteg.stories-2a570543.js.map
