import{j as a}from"./jsx-runtime-Cw0GR0a5.js";import{a as s}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as y}from"./index-CxzRwX_-.js";import"./index-CTjT7uj6.js";import{g as O}from"./apiInterceptor-D-WKbiXB.js";import"./Tidsperioden-Dtf7_zpz.js";import"./index-CCQ3W5xA.js";import{B as i,M as R,F as j,C as o}from"./FpDataContext-DMa8S1I2.js";import"./Uttaksdagen-CXktmUXL.js";import"./_baseToString-Cq6MbKF_.js";import"./_createSet-D2BJ0WVx.js";import{i as I}from"./ByttBrowserModal-aPNs2Z13.js";import{S as b}from"./useFpNavigator-D7zey6P3.js";import{M as T}from"./ManglendeVedlegg-BRa51XAp.js";import"./v4-CQkTLCs1.js";import"./index-BRV0Se7Z.js";import"./index-DSgjoNiG.js";import"./tslib.es6-CcC3cBMT.js";import"./Link-D0RLsnK2.js";import"./Label-C_UMiHsP.js";import"./index-9r8iugjR.js";import"./links-BGW0SL1u.js";import"./useId-Dah_zW8v.js";import"./message-CjkJih2D.js";import"./bemUtils-DmNyTjfb.js";import"./iframe-CDqqb6l7.js";import"../sb-preview/runtime.js";import"./guid-CsArkN6i.js";import"./_baseForOwn-_34OS4c-.js";import"./_baseUniq-BwrlAMKh.js";import"./Accordion-moKZKf2O.js";import"./dateFormValidation-CHGPS-b7.js";import"./ErrorSummaryHookForm-B8Exz7EF.js";import"./innsendingsType-DprMYF-V.js";import"./barnUtils-BRzjB5Pv.js";import"./vedleggUtils-bEzzXB5v.js";import"./attachmentMetadataType-B9XvXCfe.js";import"./util-D4FJplvi.js";const C=()=>(...r)=>(s("button-click")(...r),Promise.resolve()),l={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},A={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1},U={antallBarn:1,type:i.FØDT,fødselsdatoer:["2024-01-01"]},Se={title:"steps/ManglendeVedlegg",component:T},d=({søkerInfo:r,situasjon:N="fødsel",annenForelder:E=A,barn:M=U,gåTilNesteSide:D=s("button-click"),mellomlagreSøknadOgNaviger:v=C()})=>{I();const p=new y(O());return p.onPost("/rest/storage/foreldrepenger/vedlegg").reply(200),p.onPost("http://localhost:8888/rest/storage/foreldrepenger/vedlegg").reply(200),a.jsx(R,{initialEntries:[b.DOKUMENTASJON],children:a.jsx(j,{onDispatch:D,initialState:{[o.UTTAKSPLAN]:[],[o.ANNEN_FORELDER]:E,[o.OM_BARNET]:M,[o.SØKERSITUASJON]:{rolle:"mor",situasjon:N}},children:a.jsx(T,{søkerInfo:r,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:v,avbrytSøknad:s("button-click")})})})},e=d.bind({});e.args={søkerInfo:l,barn:{antallBarn:1,type:i.UFØDT,termindato:"2024-01-01"}};const n=d.bind({});n.args={søkerInfo:l,situasjon:"adopsjon",barn:{antallBarn:1,type:i.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}};const t=d.bind({});t.args={søkerInfo:l,annenForelder:{...A,datoForAleneomsorg:"2024-01-01"}};var m,g,c;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onPost('/rest/storage/foreldrepenger/vedlegg').reply(200); //story
  apiMock.onPost('http://localhost:8888/rest/storage/foreldrepenger/vedlegg').reply(200); //test

  return <MemoryRouter initialEntries={[SøknadRoutes.DOKUMENTASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTTAKSPLAN]: [],
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(c=(g=e.parameters)==null?void 0:g.docs)==null?void 0:c.source}}};var f,k,x;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onPost('/rest/storage/foreldrepenger/vedlegg').reply(200); //story
  apiMock.onPost('http://localhost:8888/rest/storage/foreldrepenger/vedlegg').reply(200); //test

  return <MemoryRouter initialEntries={[SøknadRoutes.DOKUMENTASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTTAKSPLAN]: [],
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(x=(k=n.parameters)==null?void 0:k.docs)==null?void 0:x.source}}};var u,F,S;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onPost('/rest/storage/foreldrepenger/vedlegg').reply(200); //story
  apiMock.onPost('http://localhost:8888/rest/storage/foreldrepenger/vedlegg').reply(200); //test

  return <MemoryRouter initialEntries={[SøknadRoutes.DOKUMENTASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTTAKSPLAN]: [],
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(S=(F=t.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};const Te=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon"];export{t as Aleneomsorgdokumentasjon,n as Omsorgsovertakelsedokumentasjon,e as Termindatodokumentasjon,Te as __namedExportsOrder,Se as default};
