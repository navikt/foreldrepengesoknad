import{j as S}from"./Uttaksdagen-CVi1UdfS.js";import{a as g}from"./chunk-454WOBUV-CM0pFb8Z.js";import{B as a,i as X}from"./Uttaksplan-C-q_5N0-.js";import{S as Y}from"./sivilstandType-DxfjzFEG.js";import{M as Z,F as $,C as c}from"./FpDataContext-Bw3l41n2.js";import{S as nn}from"./useFpNavigator-BE1soRC3.js";import{A as q}from"./AnnenForelderSteg-DhfkXDWE.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./Label-D9yH3wXA.js";import"./iframe-Dr6P14DD.js";import"../sb-preview/runtime.js";import"./links-D6IYREgS.js";import"./Modal-Bf7Xci8e.js";import"./index-BVEwUaSm.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./ErrorSummaryHookForm-BSEElhq_.js";import"./barnUtils-CCEXbVV1.js";import"./RegistrertePersonalia-F4IEVWiz.js";import"./BabyWrapped-CoLh0SDU.js";import"./index-B8L1lb2f.js";const en=()=>(...m)=>(g("button-click")(...m),Promise.resolve()),n={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},On={title:"steps/AnnenForelderSteg",component:q},e=({søker:m=n,søkersituasjon:w={situasjon:"fødsel",rolle:"mor"},barn:z={type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:H,gåTilNesteSide:Q=g("button-click"),mellomlagreSøknadOgNaviger:V=en(),avbrytSøknad:W=g("button-click")})=>(X(),S.jsx(Z,{initialEntries:[nn.ANNEN_FORELDER],children:S.jsx($,{onDispatch:Q,initialState:{[c.SØKERSITUASJON]:w,[c.OM_BARNET]:z,[c.ANNEN_FORELDER]:H},children:S.jsx(q,{søkerInfo:{søker:m,arbeidsforhold:[]},mellomlagreSøknadOgNaviger:V,avbrytSøknad:W})})})),r=e.bind({});r.args={barn:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},sivilstand:Y.UGIFT};const t=e.bind({});t.args={annenForelder:{kanIkkeOppgis:!1},søker:{...n,barn:[]}};const o=e.bind({});o.args={annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1},søker:{...n,barn:[]}};const s=e.bind({});s.args={annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1},søker:{...n,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"}}]}};const i=e.bind({});i.args={barn:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]}};const l=e.bind({});l.args={barn:{type:a.UFØDT,antallBarn:1,termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!1},søker:{...n,barn:[]}};const d=e.bind({});d.args={barn:{type:a.UFØDT,antallBarn:1,termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},annenForelder:{kanIkkeOppgis:!1},søker:{...n,kjønn:"K",barn:[]}};const p=e.bind({});p.args={barn:{type:a.UFØDT,antallBarn:1,termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]}};const k=e.bind({});k.args={barn:{type:a.UFØDT,antallBarn:1,termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:Y.GIFT}}};var u,N,F;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`({
  søker = defaultSøker,
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
}`,...(F=(N=r.parameters)==null?void 0:N.docs)==null?void 0:F.source}}};var f,E,T;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`({
  søker = defaultSøker,
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
}`,...(T=(E=t.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var y,b,D;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`({
  søker = defaultSøker,
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
}`,...(D=(b=o.parameters)==null?void 0:b.docs)==null?void 0:D.source}}};var R,O,A;s.parameters={...s.parameters,docs:{...(R=s.parameters)==null?void 0:R.docs,source:{originalSource:`({
  søker = defaultSøker,
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
}`,...(A=(O=s.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var v,B,x;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`({
  søker = defaultSøker,
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
}`,...(x=(B=i.parameters)==null?void 0:B.docs)==null?void 0:x.source}}};var j,C,M;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`({
  søker = defaultSøker,
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
}`,...(M=(C=l.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var L,U,_;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`({
  søker = defaultSøker,
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
}`,...(_=(U=d.parameters)==null?void 0:U.docs)==null?void 0:_.source}}};var I,h,K;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`({
  søker = defaultSøker,
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
}`,...(K=(h=p.parameters)==null?void 0:h.docs)==null?void 0:K.source}}};var P,G,J;k.parameters={...k.parameters,docs:{...(P=k.parameters)==null?void 0:P.docs,source:{originalSource:`({
  søker = defaultSøker,
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
}`,...(J=(G=k.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};const An=["AnnenForelderFraOppgittBarn","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{r as AnnenForelderFraOppgittBarn,k as FarGiftUfødtBarn,p as FarUfødtBarn,i as ForFar,d as MedmorUfødtBarn,l as MorUfødtBarn,t as SkalOppgiPersonalia,s as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,o as SkalOppgiPersonaliaNavnMangler,An as __namedExportsOrder,On as default};
