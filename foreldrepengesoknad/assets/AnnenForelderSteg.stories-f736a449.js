import{j as m}from"./jsx-runtime-1caa8f64.js";import{a as E}from"./chunk-WFFRPTHA-80d37c1b.js";import"./Tidsperioden-5bf2b704.js";import{B as a,M as X}from"./dateFormValidation-749eb76f.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as Z}from"./Step-304af930.js";import{F as $,C as k}from"./FpDataContext-91c673b7.js";import{S as nn}from"./useFpNavigator-fd3e6371.js";import{A as V}from"./AnnenForelderSteg-0df2bda4.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-daf33b80.js";import"./Link-1e7d9fc8.js";import"./index-a01a9712.js";import"./links-022380bf.js";import"./amplitude.esm-2809efde.js";import"./createIntl-4b54006a.js";import"./ErrorSummaryHookForm-27755f63.js";import"./ConfirmationPanel-7b500121.js";import"./barnUtils-1347596c.js";import"./RegistrertePersonalia-d79faae5.js";import"./BabyWrapped-782da392.js";import"./index-42c02581.js";import"./validationUtil-6fbce280.js";var Y=(n=>(n.UOPPGITT="UOPPGITT",n.UGIFT="UGIFT",n.GIFT="GIFT",n.ENKE_ELLER_ENKEMANN="ENKE_ELLER_ENKEMANN",n.SKILT="SKILT",n.SEPARERT="SEPARERT",n.REGISTRERT_PARTNER="REGISTRERT_PARTNER",n.SEPARERT_PARTNER="SEPARERT_PARTNER",n.SKILT_PARTNER="SKILT_PARTNER",n.GJENLEVENDE_PARTNER="GJENLEVENDE_PARTNER",n))(Y||{});const en=()=>(...n)=>(E("button-click")(...n),Promise.resolve()),e={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},jn={title:"steps/AnnenForelderSteg",component:V},r=({søker:n,søkersituasjon:q={situasjon:"fødsel",rolle:"mor"},barn:w={type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:z,gåTilNesteSide:H=E("button-click"),mellomlagreSøknadOgNaviger:Q=en(),avbrytSøknad:W=E("button-click")})=>(Z(),m.jsx(X,{initialEntries:[nn.ANNEN_FORELDER],children:m.jsx($,{onDispatch:H,initialState:{[k.SØKERSITUASJON]:q,[k.OM_BARNET]:w,[k.ANNEN_FORELDER]:z},children:m.jsx(V,{søkerInfo:{søker:n,arbeidsforhold:[]},mellomlagreSøknadOgNaviger:Q,avbrytSøknad:W})})})),t=r.bind({});t.args={barn:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søker:e};const o=r.bind({});o.args={annenForelder:{kanIkkeOppgis:!1},søker:{...e,barn:[]}};const s=r.bind({});s.args={annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1},søker:{...e,barn:[]}};const i=r.bind({});i.args={annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1},søker:{...e,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"}}]}};const l=r.bind({});l.args={barn:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{...e,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]}};const d=r.bind({});d.args={barn:{type:a.UFØDT,antallBarn:1,termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!1},søker:{...e,barn:[]}};const F=r.bind({});F.args={barn:{type:a.UFØDT,antallBarn:1,termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},annenForelder:{kanIkkeOppgis:!1},søker:{...e,kjønn:"K",barn:[]}};const x=r.bind({});x.args={barn:{type:a.UFØDT,antallBarn:1,termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søker:{...e,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]}};const p=r.bind({});p.args={barn:{type:a.UFØDT,antallBarn:1,termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søker:{...e,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:Y.GIFT}}};var S,c,N;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: ['2021-03-15'],
    antallBarn: 1
  },
  annenForelder,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder
    }}>
                <AnnenForelderSteg søkerInfo={{
        søker,
        arbeidsforhold: []
      }} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(N=(c=t.parameters)==null?void 0:c.docs)==null?void 0:N.source}}};var g,u,R;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: ['2021-03-15'],
    antallBarn: 1
  },
  annenForelder,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder
    }}>
                <AnnenForelderSteg søkerInfo={{
        søker,
        arbeidsforhold: []
      }} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(R=(u=o.parameters)==null?void 0:u.docs)==null?void 0:R.source}}};var T,D,f;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: ['2021-03-15'],
    antallBarn: 1
  },
  annenForelder,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder
    }}>
                <AnnenForelderSteg søkerInfo={{
        søker,
        arbeidsforhold: []
      }} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(f=(D=s.parameters)==null?void 0:D.docs)==null?void 0:f.source}}};var A,b,y;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: ['2021-03-15'],
    antallBarn: 1
  },
  annenForelder,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder
    }}>
                <AnnenForelderSteg søkerInfo={{
        søker,
        arbeidsforhold: []
      }} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(y=(b=i.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var O,v,B;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: ['2021-03-15'],
    antallBarn: 1
  },
  annenForelder,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder
    }}>
                <AnnenForelderSteg søkerInfo={{
        søker,
        arbeidsforhold: []
      }} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(B=(v=l.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var j,C,L;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: ['2021-03-15'],
    antallBarn: 1
  },
  annenForelder,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder
    }}>
                <AnnenForelderSteg søkerInfo={{
        søker,
        arbeidsforhold: []
      }} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(L=(C=d.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var M,_,I;F.parameters={...F.parameters,docs:{...(M=F.parameters)==null?void 0:M.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: ['2021-03-15'],
    antallBarn: 1
  },
  annenForelder,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder
    }}>
                <AnnenForelderSteg søkerInfo={{
        søker,
        arbeidsforhold: []
      }} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(I=(_=F.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var U,P,K;x.parameters={...x.parameters,docs:{...(U=x.parameters)==null?void 0:U.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: ['2021-03-15'],
    antallBarn: 1
  },
  annenForelder,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder
    }}>
                <AnnenForelderSteg søkerInfo={{
        søker,
        arbeidsforhold: []
      }} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(K=(P=x.parameters)==null?void 0:P.docs)==null?void 0:K.source}}};var h,G,J;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: ['2021-03-15'],
    antallBarn: 1
  },
  annenForelder,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder
    }}>
                <AnnenForelderSteg søkerInfo={{
        søker,
        arbeidsforhold: []
      }} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(J=(G=p.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};const Cn=["AnnenForelderFraOppgittBarn","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{t as AnnenForelderFraOppgittBarn,p as FarGiftUfødtBarn,x as FarUfødtBarn,l as ForFar,F as MedmorUfødtBarn,d as MorUfødtBarn,o as SkalOppgiPersonalia,i as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,s as SkalOppgiPersonaliaNavnMangler,Cn as __namedExportsOrder,jn as default};
