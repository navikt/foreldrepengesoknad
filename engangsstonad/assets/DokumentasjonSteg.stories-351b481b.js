import{j as i}from"./fridagerUtils-3abe5ab3.js";import{a as o}from"./chunk-AY7I2SME-331d03ca.js";import{D as S,M as A}from"./DokumentasjonSteg-9a4c8029.js";import{P as n,i as B,E as M,b as h}from"./useEsNavigator-7abcbb8a.js";import"./_baseToString-53b0dbb2.js";import{a as O}from"./OmBarnet-2901dea5.js";import{w as j}from"./withRouter-18fd03bb.js";import"./_createSet-a1fd5098.js";import"./index-b613d0ba.js";import"./v4-a960c1f4.js";import"./ErrorSummaryHookForm-7fd48743.js";const I={title:"DokumentasjonSteg",component:S,decorators:[j]},s=({gåTilNesteSide:D,omBarnet:f,skalFeileOpplasting:T=!1})=>{B();const r=new A(O);return T||(r.onPost("/storage/vedlegg").reply(200),r.onPost("http://localhost:8888/rest/storage/vedlegg").reply(200)),i.jsx(M,{onDispatch:D,initialState:{[h.OM_BARNET]:f},children:i.jsx(S,{})})},t=s.bind({});t.args={gåTilNesteSide:o("button-click"),routerDecoratorInitUrl:n.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"}};const e=s.bind({});e.args={gåTilNesteSide:o("button-click"),routerDecoratorInitUrl:n.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};const a=s.bind({});a.args={gåTilNesteSide:o("button-click"),skalFeileOpplasting:!0,routerDecoratorInitUrl:n.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};var l,p,c;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`({
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

  return <EsDataContext onDispatch={gåTilNesteSide} initialState={{
    [EsDataType.OM_BARNET]: omBarnet
  }}>
            <DokumentasjonSteg />
        </EsDataContext>;
}`,...(c=(p=t.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var m,d,g;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`({
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

  return <EsDataContext onDispatch={gåTilNesteSide} initialState={{
    [EsDataType.OM_BARNET]: omBarnet
  }}>
            <DokumentasjonSteg />
        </EsDataContext>;
}`,...(g=(d=e.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var k,u,E;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:`({
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

  return <EsDataContext onDispatch={gåTilNesteSide} initialState={{
    [EsDataType.OM_BARNET]: omBarnet
  }}>
            <DokumentasjonSteg />
        </EsDataContext>;
}`,...(E=(u=a.parameters)==null?void 0:u.docs)==null?void 0:E.source}}};const K=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{e as Adopsjonsbekreftelse,a as FeilerOpplastinger,t as Terminbekreftelse,K as __namedExportsOrder,I as default};
//# sourceMappingURL=DokumentasjonSteg.stories-351b481b.js.map