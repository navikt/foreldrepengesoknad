import{i as D,j as o}from"./dateFormValidation-C4vNXfJB.js";import{a as x}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{P as s,M as f,E as y,C as B}from"./useEsNavigator-C6IfX4IG.js";import{D as M,M as N}from"./DokumentasjonSteg-F_P0maxE.js";import"./index-DVXBtNgz.js";import{g as T}from"./apiInterceptor-DZtTMO6M.js";import"./index-Dcs0RV0A.js";import"./tslib.es6-CMwweBXX.js";import"./index-Cbx7Fas8.js";import"./v4-CQkTLCs1.js";import"./ErrorSummaryHookForm-CgDLDL7i.js";import"./OmBarnet-BV6De4cI.js";const v=()=>(...a)=>(x("button-click")(...a),Promise.resolve()),q={title:"DokumentasjonSteg",component:M},r=({gåTilNesteSide:a=x("button-click"),mellomlagreOgNaviger:O=v(),omBarnet:A,skalFeileOpplasting:S=!1,path:h})=>{D();const i=new N(T());return S||(i.onPost("/rest/storage/engangsstonad/vedlegg").reply(200),i.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200)),o.jsx(f,{initialEntries:[h],children:o.jsx(y,{onDispatch:a,initialState:{[B.OM_BARNET]:A},children:o.jsx(M,{mellomlagreOgNaviger:O})})})},e=r.bind({});e.args={path:s.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"}};const t=r.bind({});t.args={path:s.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};const n=r.bind({});n.args={skalFeileOpplasting:!0,path:s.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};var l,p,g;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`({
  gåTilNesteSide = action('button-click'),
  mellomlagreOgNaviger = promiseAction(),
  omBarnet,
  skalFeileOpplasting = false,
  path
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //story
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
  const apiMock = new MockAdapter(getAxiosInstance());
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/engangsstonad/vedlegg').reply(200); //test
  }
  return <MemoryRouter initialEntries={[path]}>
            <EsDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.OM_BARNET]: omBarnet
    }}>
                <DokumentasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,E,k;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`({
  gåTilNesteSide = action('button-click'),
  mellomlagreOgNaviger = promiseAction(),
  omBarnet,
  skalFeileOpplasting = false,
  path
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/engangsstonad/vedlegg').reply(200); //test
  }
  return <MemoryRouter initialEntries={[path]}>
            <EsDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.OM_BARNET]: omBarnet
    }}>
                <DokumentasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(k=(E=n.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};const z=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,n as FeilerOpplastinger,e as Terminbekreftelse,z as __namedExportsOrder,q as default};
