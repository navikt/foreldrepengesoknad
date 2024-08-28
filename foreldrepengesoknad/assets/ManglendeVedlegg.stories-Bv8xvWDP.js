import{j as g}from"./tslib.es6-BMc9PpVS.js";import{a as p}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as U}from"./index-DfkQcp4z.js";import"./index-BP8_t0zE.js";import{g as P}from"./apiInterceptor-D-WKbiXB.js";import"./Tidsperioden-CRlAJzBJ.js";import"./Uttaksdagen-CHlL4_FN.js";import{B as k,M as B,F as J,C as e}from"./FpDataContext-wT6-gpAc.js";import"./_baseToString-7VaozA17.js";import"./_createSet-1Wr4uFiM.js";import{i as H}from"./ErrorSummaryHookForm-B_LopTqh.js";import{A as i,S as G}from"./useFpNavigator-CdYY8cCo.js";import{M as b}from"./ManglendeVedlegg-CRJIkAf9.js";import"./v4-CQkTLCs1.js";import"./index-Snk9MO9S.js";import"./index-BxmsGmlx.js";import"./dateFormValidation-B567oMpk.js";import"./bemUtils-DTdo7NuC.js";import"./links-BegG-28I.js";import"./iframe-Cn5AZTru.js";import"../sb-preview/runtime.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-Bi7npIOr.js";import"./util-gRW07hoZ.js";import"./barnUtils-DfbV6eO6.js";const V=()=>(...d)=>(p("button-click")(...d),Promise.resolve()),s={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},M={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1},w={antallBarn:1,type:k.FØDT,fødselsdatoer:["2024-01-01"]},Y={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},Ne={title:"steps/ManglendeVedlegg",component:b},l=({søkerInfo:d,situasjon:v="fødsel",annenForelder:h=M,barn:K=w,arbeidsforholdOgInntekt:C=Y,annenInntekt:L,gåTilNesteSide:_=p("button-click"),mellomlagreSøknadOgNaviger:j=V()})=>{H();const m=new U(P());return m.onPost("/rest/storage/foreldrepenger/vedlegg").reply(200),m.onPost("http://localhost:8888/rest/storage/foreldrepenger/vedlegg").reply(200),g.jsx(B,{initialEntries:[G.DOKUMENTASJON],children:g.jsx(J,{onDispatch:_,initialState:{[e.UTTAKSPLAN]:[],[e.ANNEN_FORELDER]:h,[e.OM_BARNET]:K,[e.ARBEIDSFORHOLD_OG_INNTEKT]:C,[e.ANDRE_INNTEKTSKILDER]:L,[e.SØKERSITUASJON]:{rolle:"mor",situasjon:v}},children:g.jsx(b,{søkerInfo:d,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:j,avbrytSøknad:p("button-click")})})})},n=l.bind({});n.args={søkerInfo:s,barn:{antallBarn:1,type:k.UFØDT,termindato:"2024-01-01"}};const t=l.bind({});t.args={søkerInfo:s,situasjon:"adopsjon",barn:{antallBarn:1,type:k.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}};const r=l.bind({});r.args={søkerInfo:s,annenForelder:{...M,datoForAleneomsorg:"2024-01-01"}};const a=l.bind({});a.args={søkerInfo:s,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",pågående:!1,type:i.MILITÆRTJENESTE},{fom:"2024-05-01",pågående:!0,type:i.MILITÆRTJENESTE}]};const o=l.bind({});o.args={søkerInfo:s,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",type:i.SLUTTPAKKE},{fom:"2024-05-01",tom:"2024-07-01",type:i.SLUTTPAKKE}]};var c,f,T;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  annenInntekt,
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
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
      [ContextDataType.ANDRE_INNTEKTSKILDER]: annenInntekt,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(T=(f=n.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var x,N,E;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  annenInntekt,
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
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
      [ContextDataType.ANDRE_INNTEKTSKILDER]: annenInntekt,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(E=(N=t.parameters)==null?void 0:N.docs)==null?void 0:E.source}}};var S,A,I;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  annenInntekt,
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
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
      [ContextDataType.ANDRE_INNTEKTSKILDER]: annenInntekt,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(I=(A=r.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var u,F,D;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  annenInntekt,
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
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
      [ContextDataType.ANDRE_INNTEKTSKILDER]: annenInntekt,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(D=(F=a.parameters)==null?void 0:F.docs)==null?void 0:D.source}}};var O,y,R;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  annenInntekt,
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
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
      [ContextDataType.ANDRE_INNTEKTSKILDER]: annenInntekt,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(R=(y=o.parameters)==null?void 0:y.docs)==null?void 0:R.source}}};const Ee=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon","HarAndreInntektskilderMilitærtjeneste","HarAndreInntektskilderEtterlønn"];export{r as Aleneomsorgdokumentasjon,o as HarAndreInntektskilderEtterlønn,a as HarAndreInntektskilderMilitærtjeneste,t as Omsorgsovertakelsedokumentasjon,n as Termindatodokumentasjon,Ee as __namedExportsOrder,Ne as default};
