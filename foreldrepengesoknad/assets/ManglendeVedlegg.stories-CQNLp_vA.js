import{j as a}from"./jsx-runtime-CexXSJP5.js";import{a as s}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as y}from"./index-DfkQcp4z.js";import"./index-BP8_t0zE.js";import{g as O}from"./apiInterceptor-D-WKbiXB.js";import"./Tidsperioden-aPvVQaRz.js";import"./index-CSpfAsmC.js";import{B as i,M as R}from"./index-BiY12grZ.js";import"./_baseToString-7VaozA17.js";import"./_createSet-W-93wHM-.js";import{i as j}from"./CalendarLabel-Cwj7ViES.js";import{F as I,C as o}from"./FpDataContext-QYm6HSmG.js";import{S as b}from"./useFpNavigator-eSxQ499P.js";import{M as T}from"./ManglendeVedlegg-mtWc0Ns6.js";import"./v4-CQkTLCs1.js";import"./index-Snk9MO9S.js";import"./Link-DYtqBS4e.js";import"./index-BxmsGmlx.js";import"./links-BP9VcYJA.js";import"./VStack-CyTP2Yd3.js";import"./message-BuQN_KsK.js";import"./amplitude.esm-6vgTx8-c.js";import"./iframe-Ckp-55YK.js";import"../sb-preview/runtime.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-DaL16s-J.js";import"./Accordion-CNWkh_cy.js";import"./dateFormValidation-C6MyJzWm.js";import"./ErrorSummaryHookForm-Bvf3Qqig.js";import"./innsendingsType-DprMYF-V.js";import"./barnUtils-BZO7i_Vi.js";import"./vedleggUtils-Bz0UBFyR.js";import"./attachmentMetadataType-B9XvXCfe.js";import"./util-C8Rv9aLP.js";const C=()=>(...r)=>(s("button-click")(...r),Promise.resolve()),l={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},A={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1},U={antallBarn:1,type:i.FØDT,fødselsdatoer:["2024-01-01"]},ke={title:"steps/ManglendeVedlegg",component:T},d=({søkerInfo:r,situasjon:N="fødsel",annenForelder:E=A,barn:M=U,gåTilNesteSide:D=s("button-click"),mellomlagreSøknadOgNaviger:v=C()})=>{j();const p=new y(O());return p.onPost("/rest/storage/foreldrepenger/vedlegg").reply(200),p.onPost("http://localhost:8888/rest/storage/foreldrepenger/vedlegg").reply(200),a.jsx(R,{initialEntries:[b.DOKUMENTASJON],children:a.jsx(I,{onDispatch:D,initialState:{[o.UTTAKSPLAN]:[],[o.ANNEN_FORELDER]:E,[o.OM_BARNET]:M,[o.SØKERSITUASJON]:{rolle:"mor",situasjon:N}},children:a.jsx(T,{søkerInfo:r,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:v,avbrytSøknad:s("button-click")})})})},e=d.bind({});e.args={søkerInfo:l,barn:{antallBarn:1,type:i.UFØDT,termindato:"2024-01-01"}};const n=d.bind({});n.args={søkerInfo:l,situasjon:"adopsjon",barn:{antallBarn:1,type:i.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}};const t=d.bind({});t.args={søkerInfo:l,annenForelder:{...A,datoForAleneomsorg:"2024-01-01"}};var m,g,c;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`({
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
}`,...(S=(F=t.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};const xe=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon"];export{t as Aleneomsorgdokumentasjon,n as Omsorgsovertakelsedokumentasjon,e as Termindatodokumentasjon,xe as __namedExportsOrder,ke as default};
