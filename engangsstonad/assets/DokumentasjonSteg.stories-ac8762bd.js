import{j as o}from"./fridagerUtils-04c9cbd9.js";import{a as h}from"./chunk-AY7I2SME-331d03ca.js";import{D as M,M as f}from"./DokumentasjonSteg-341ee371.js";import{P as s,i as y,M as B,E as N,b as T}from"./useEsNavigator-19e51dfb.js";import"./_baseToString-474f5ca2.js";import{a as v}from"./OmBarnet-0cd42a30.js";import"./_createSet-6d88ee94.js";import"./index-c4a10118.js";import"./v4-a960c1f4.js";import"./ErrorSummaryHookForm-6b08840c.js";import"./isNativeReflectConstruct-0525dbfe.js";import"./ExpansionCard-a1bb8d3b.js";const x=()=>(...n)=>(h("button-click")(...n),Promise.resolve()),q={title:"DokumentasjonSteg",component:M},r=({gåTilNesteSide:n=h("button-click"),mellomlagreOgNaviger:O=x(),omBarnet:A,skalFeileOpplasting:S=!1,path:D})=>{y();const i=new f(v);return S||(i.onPost("/storage/engangsstonad/vedlegg").reply(200),i.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200)),o.jsx(B,{initialEntries:[D],children:o.jsx(N,{onDispatch:n,initialState:{[T.OM_BARNET]:A},children:o.jsx(M,{mellomlagreOgNaviger:O})})})},e=r.bind({});e.args={path:s.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"}};const t=r.bind({});t.args={path:s.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};const a=r.bind({});a.args={skalFeileOpplasting:!0,path:s.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};var l,p,g;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`({
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
}`,...(g=(p=e.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var m,c,d;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`({
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
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,k,E;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`({
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
}`,...(E=(k=a.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};const z=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,a as FeilerOpplastinger,e as Terminbekreftelse,z as __namedExportsOrder,q as default};
//# sourceMappingURL=DokumentasjonSteg.stories-ac8762bd.js.map
