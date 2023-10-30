import{j as r}from"./jsx-runtime-69eee039.js";import{a}from"./chunk-AY7I2SME-331d03ca.js";import{D as E,M as A}from"./DokumentasjonSteg-bb5a87d2.js";import{P as s,E as B}from"./useEsNavigator-96d67a58.js";import{w as b}from"./withRouter-590efb2b.js";import"./index-7c191284.js";import{a as h}from"./Attachment-512881c1.js";import{E as D}from"./EsContextStorybookHelper-df37dab2.js";import{i as M,I as P}from"./IntlProvider-e904c8b8.js";import"./v4-a960c1f4.js";import"./ErrorSummaryHookForm-be19365a.js";import"./_baseToString-8992fead.js";import"./_createSet-409f46e6.js";import"./index-b3a39e30.js";const U={title:"DokumentasjonSteg",component:E,decorators:[b]},i=({gåTilNesteSide:f,omBarnet:T,skalFeileOpplasting:y=!1})=>{M();const n=new A(h);return y||(n.onPost("/storage/vedlegg").reply(200),n.onPost("http://localhost:8888/rest/storage/vedlegg").reply(200)),r.jsx(P,{språkkode:"nb",children:r.jsx(D,{onDispatch:f,initialState:{[B.OM_BARNET]:T},children:r.jsx(E,{})})})},e=i.bind({});e.args={gåTilNesteSide:a("button-click"),routerDecoratorInitUrl:s.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"}};const t=i.bind({});t.args={gåTilNesteSide:a("button-click"),routerDecoratorInitUrl:s.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};const o=i.bind({});o.args={gåTilNesteSide:a("button-click"),skalFeileOpplasting:!0,routerDecoratorInitUrl:s.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};var l,p,d;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`({
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
}`,...(u=(S=o.parameters)==null?void 0:S.docs)==null?void 0:u.source}}};const J=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,o as FeilerOpplastinger,e as Terminbekreftelse,J as __namedExportsOrder,U as default};
//# sourceMappingURL=DokumentasjonSteg.stories-9fa88619.js.map
