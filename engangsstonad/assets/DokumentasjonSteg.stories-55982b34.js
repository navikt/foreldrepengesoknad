import{j as o}from"./dates-a54b7688.js";import{a as h}from"./chunk-WFFRPTHA-a68c42c5.js";import{P as r,i as D,M as f,E as y,C as B}from"./useEsNavigator-9078f7eb.js";import{D as M,M as N}from"./DokumentasjonSteg-950f4ae7.js";import"./index-f1f2c4b1.js";import{a as T}from"./OmBarnet-c086ae82.js";import"./index-b580f7e8.js";import"./index-c74c9f7f.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./ErrorSummaryHookForm-214b1ce2.js";import"./customParseFormat-61b655e4.js";import"./isNativeReflectConstruct-554b52b6.js";import"./fridagerUtils-1041562e.js";import"./useControllableState-e0bf3f38.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import"./ExpansionCard-38f1f044.js";const v=()=>(...n)=>(h("button-click")(...n),Promise.resolve()),V={title:"DokumentasjonSteg",component:M},s=({gåTilNesteSide:n=h("button-click"),mellomlagreOgNaviger:O=v(),omBarnet:A,skalFeileOpplasting:S=!1,path:x})=>{D();const i=new N(T);return S||(i.onPost("/storage/engangsstonad/vedlegg").reply(200),i.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200)),o.jsx(f,{initialEntries:[x],children:o.jsx(y,{onDispatch:n,initialState:{[B.OM_BARNET]:A},children:o.jsx(M,{mellomlagreOgNaviger:O})})})},e=s.bind({});e.args={path:r.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"}};const t=s.bind({});t.args={path:r.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};const a=s.bind({});a.args={skalFeileOpplasting:!0,path:r.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};var l,p,m;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`({
  gåTilNesteSide = action('button-click'),
  mellomlagreOgNaviger = promiseAction(),
  omBarnet,
  skalFeileOpplasting = false,
  path
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/storage/engangsstonad/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/engangsstonad/vedlegg').reply(200); //test
  }
  return <MemoryRouter initialEntries={[path]}>
            <EsDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.OM_BARNET]: omBarnet
    }}>
                <DokumentasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var g,c,d;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`({
  gåTilNesteSide = action('button-click'),
  mellomlagreOgNaviger = promiseAction(),
  omBarnet,
  skalFeileOpplasting = false,
  path
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/storage/engangsstonad/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/engangsstonad/vedlegg').reply(200); //test
  }
  return <MemoryRouter initialEntries={[path]}>
            <EsDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.OM_BARNET]: omBarnet
    }}>
                <DokumentasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,E,k;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`({
  gåTilNesteSide = action('button-click'),
  mellomlagreOgNaviger = promiseAction(),
  omBarnet,
  skalFeileOpplasting = false,
  path
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/storage/engangsstonad/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/engangsstonad/vedlegg').reply(200); //test
  }
  return <MemoryRouter initialEntries={[path]}>
            <EsDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.OM_BARNET]: omBarnet
    }}>
                <DokumentasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(k=(E=a.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};const W=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,a as FeilerOpplastinger,e as Terminbekreftelse,W as __namedExportsOrder,V as default};
