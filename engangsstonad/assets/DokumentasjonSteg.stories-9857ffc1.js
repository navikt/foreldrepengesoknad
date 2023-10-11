import{j as r}from"./jsx-runtime-69eee039.js";import{a}from"./chunk-AY7I2SME-331d03ca.js";import{D as E,M as A,a as B}from"./DokumentasjonSteg-38f467d0.js";import{P as s}from"./paths-77448497.js";import{w as b}from"./withRouter-7bb73ddf.js";import{E as h}from"./EsContextStorybookHelper-8340a800.js";import{E as D}from"./useEsNavigator-196eef3f.js";import{I as M}from"./IntlProvider-6b2e8efe.js";import{i as P}from"./amplitude-a97f1527.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./index.es-1c07523a.js";import"./Attachment-03ccfb9d.js";import"./valideringsregler-4276fa64.js";import"./extends-2f8ee675.js";import"./index-ecbee218.js";import"./index-b3a39e30.js";const z={title:"DokumentasjonSteg",component:E,decorators:[b]},i=({gåTilNesteSide:f,omBarnet:T,skalFeileOpplasting:y=!1})=>{P();const n=new A(B);return y||(n.onPost("/storage/vedlegg").reply(200),n.onPost("http://localhost:8888/rest/storage/vedlegg").reply(200)),r.jsx(M,{språkkode:"nb",children:r.jsx(h,{onDispatch:f,initialState:{[D.OM_BARNET]:T},children:r.jsx(E,{})})})},e=i.bind({});e.args={gåTilNesteSide:a("button-click"),routerDecoratorInitUrl:s.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"}};const t=i.bind({});t.args={gåTilNesteSide:a("button-click"),routerDecoratorInitUrl:s.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};const o=i.bind({});o.args={gåTilNesteSide:a("button-click"),skalFeileOpplasting:!0,routerDecoratorInitUrl:s.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};var l,p,d;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`({
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

  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper onDispatch={gåTilNesteSide} initialState={{
      [EsDataType.OM_BARNET]: omBarnet
    }}>
                <DokumentasjonSteg />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(d=(p=e.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var c,m,g;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`({
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

  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper onDispatch={gåTilNesteSide} initialState={{
      [EsDataType.OM_BARNET]: omBarnet
    }}>
                <DokumentasjonSteg />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(g=(m=t.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var k,S,u;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`({
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

  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper onDispatch={gåTilNesteSide} initialState={{
      [EsDataType.OM_BARNET]: omBarnet
    }}>
                <DokumentasjonSteg />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(u=(S=o.parameters)==null?void 0:S.docs)==null?void 0:u.source}}};const G=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,o as FeilerOpplastinger,e as Terminbekreftelse,G as __namedExportsOrder,z as default};
//# sourceMappingURL=DokumentasjonSteg.stories-9857ffc1.js.map
