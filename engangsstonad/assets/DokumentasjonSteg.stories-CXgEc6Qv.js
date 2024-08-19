import{j as o}from"./tslib.es6-C_-gbNBy.js";import{a as x}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{P as s,M as h,E as D,C as y}from"./useEsNavigator-Ckjo61uk.js";import{D as M,M as B}from"./DokumentasjonSteg-C_iVGPcV.js";import"./index-CTjT7uj6.js";import{g as N}from"./apiInterceptor-D9XpNqGK.js";import{i as T}from"./dateFormValidation-DKgpRshk.js";import"./v4-CQkTLCs1.js";import"./ErrorSummaryHookForm-CcP26DCs.js";import"./index-9r8iugjR.js";import"./OmBarnet-BV6De4cI.js";import"./index-BRV0Se7Z.js";const v=()=>(...a)=>(x("button-click")(...a),Promise.resolve()),q={title:"DokumentasjonSteg",component:M},r=({gåTilNesteSide:a=x("button-click"),mellomlagreOgNaviger:O=v(),omBarnet:A,skalFeileOpplasting:S=!1,path:f})=>{T();const i=new B(N());return S||(i.onPost("/rest/storage/engangsstonad/vedlegg").reply(200),i.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200)),o.jsx(h,{initialEntries:[f],children:o.jsx(D,{onDispatch:a,initialState:{[y.OM_BARNET]:A},children:o.jsx(M,{mellomlagreOgNaviger:O})})})},e=r.bind({});e.args={path:s.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"}};const t=r.bind({});t.args={path:s.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};const n=r.bind({});n.args={skalFeileOpplasting:!0,path:s.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};var l,p,g;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`({
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
