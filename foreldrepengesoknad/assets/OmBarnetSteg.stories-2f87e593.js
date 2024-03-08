import{j as F}from"./jsx-runtime-1caa8f64.js";import"./dates-3e7e1342.js";import{B as x,M as V}from"./dateFormValidation-fa09613b.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as W}from"./IntlProvider-c123bdc0.js";import{a as p}from"./chunk-WFFRPTHA-80d37c1b.js";import{F as X,C as u}from"./FpDataContext-91c673b7.js";import{S as Z}from"./useFpNavigator-283c2ed8.js";import{O as Y}from"./OmBarnetSteg-a2f4d6a7.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";import"./createIntl-5b3378a9.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./links-4d39192e.js";import"./ErrorSummaryHookForm-1b45a718.js";import"./isNativeReflectConstruct-554b52b6.js";import"./velkommenUtils-41d64fdc.js";import"./barnUtils-441d9631.js";import"./dateUtils-f600dec0.js";import"./RegistrertePersonalia-fae19360.js";import"./Box-3dd1780a.js";import"./BabyWrapped-cd5fe4ef.js";import"./File-2c558d9c.js";const $=()=>(...k)=>(p("button-click")(...k),Promise.resolve()),n={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},An={title:"steps/OmBarnetSteg",component:Y},e=({søkerinfo:k,søkersituasjon:H={situasjon:"fødsel",rolle:"mor"},barn:q,søknadGjelderEtNyttBarn:w=!0,gåTilNesteSide:z=p("button-click"),mellomlagreSøknadOgNaviger:Q=$()})=>(W(),F.jsx(V,{initialEntries:[Z.OM_BARNET],children:F.jsx(X,{onDispatch:z,initialState:{[u.SØKERSITUASJON]:H,[u.OM_BARNET]:q},children:F.jsx(Y,{søkerInfo:k,søknadGjelderNyttBarn:w,mellomlagreSøknadOgNaviger:Q,avbrytSøknad:p("button-click")})})})),t=e.bind({});t.args={barn:void 0,søkerinfo:n};const r=e.bind({});r.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:void 0,søkerinfo:{...n,søker:{...n.søker,kjønn:"M"}}};const a=e.bind({});a.args={søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},barn:void 0,søkerinfo:n};const o=e.bind({});o.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},søkerinfo:n};const s=e.bind({});s.args={søknadGjelderEtNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:["2021-03-15"],type:x.FØDT},søkerinfo:n};const i=e.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:2,fnr:["31091981146","31091981147"],fødselsdatoer:["2022-08-02","2022-08-02"],type:x.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:n};const l=e.bind({});l.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:["2021-03-15"],type:x.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:n};const d=e.bind({});d.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:3,fnr:["21091981146","31091981147","31091981148"],fødselsdatoer:["2023-01-02"],type:x.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:{søker:{fnr:"21430354032",fornavn:"Hes",etternavn:"Mandagsbil",kjønn:"K",fødselsdato:"2003-03-21",bankkonto:{kontonummer:"",banknavn:""},barn:[{fnr:"21091981146",fødselsdato:"2023-03-01",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981148",fødselsdato:"2023-03-01",dødsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"},{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"}]}};const m=e.bind({});m.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:1,fnr:void 0,fødselsdatoer:["2023-01-02"],type:x.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:{...n,søker:{...n.søker,barn:[]}}};var c,g,S;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = true,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnetSteg søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(S=(g=t.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};var f,N,E;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = true,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnetSteg søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(E=(N=r.parameters)==null?void 0:N.docs)==null?void 0:E.source}}};var T,j,B;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = true,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnetSteg søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(B=(j=a.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var y,b,v;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = true,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnetSteg søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(v=(b=o.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var O,R,D;s.parameters={...s.parameters,docs:{...(O=s.parameters)==null?void 0:O.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = true,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnetSteg søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(D=(R=s.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var A,M,C;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = true,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnetSteg søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(C=(M=i.parameters)==null?void 0:M.docs)==null?void 0:C.source}}};var G,I,U;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = true,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnetSteg søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(U=(I=l.parameters)==null?void 0:I.docs)==null?void 0:U.source}}};var K,_,L;d.parameters={...d.parameters,docs:{...(K=d.parameters)==null?void 0:K.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = true,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnetSteg søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(L=(_=d.parameters)==null?void 0:_.docs)==null?void 0:L.source}}};var P,h,J;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = true,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnetSteg søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(J=(h=m.parameters)==null?void 0:h.docs)==null?void 0:J.source}}};const Mn=["MorFødsel","FarFødsel","MedmorFødsel","ForAdopsjon","RegistrertBarnFødselFar","RegistrertBarnFødselMor","RegistrertBarnAdopsjonMor","RegistrertBarnTrillingerDerEnErDød","SøknadPåUregistrertBarnSomErFødt"];export{r as FarFødsel,o as ForAdopsjon,a as MedmorFødsel,t as MorFødsel,l as RegistrertBarnAdopsjonMor,s as RegistrertBarnFødselFar,i as RegistrertBarnFødselMor,d as RegistrertBarnTrillingerDerEnErDød,m as SøknadPåUregistrertBarnSomErFødt,Mn as __namedExportsOrder,An as default};
