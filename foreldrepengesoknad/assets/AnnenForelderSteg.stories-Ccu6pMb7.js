import{j as m}from"./jsx-runtime-_e34SzbC.js";import{a as S}from"./chunk-MZXVCX43-CM0pFb8Z.js";import"./Tidsperioden-C_23aXzj.js";import"./index--IHLcpuH.js";import{B as a,M as X}from"./index-BI6FGWNT.js";import"./index-DVXBtNgz.js";import{S as Y}from"./sivilstandType-DxfjzFEG.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{i as Z}from"./infobox.module-D7sfBC3W.js";import{F as $,C as k}from"./FpDataContext-BcznBdmF.js";import{S as nn}from"./useFpNavigator-DsbQUcIz.js";import{A as q}from"./AnnenForelderSteg-Csiahatb.js";import"./v4-CQkTLCs1.js";import"./index-Dcs0RV0A.js";import"./Link-SOWRV7cb.js";import"./index-Cbx7Fas8.js";import"./links-F23LOZ2f.js";import"./VStack-DueXo9sZ.js";import"./message-8qBTI_mw.js";import"./amplitude.esm-BThBy0fb.js";import"./iframe-Dv96JzY5.js";import"../sb-preview/runtime.js";import"./Accordion-Bh_hxzC-.js";import"./extends-CF3RwP-h.js";import"./dateFormValidation-bXK329AM.js";import"./ErrorSummaryHookForm-B64SztqR.js";import"./barnUtils-D08d1SRa.js";import"./RegistrertePersonalia-CXSaC0Mg.js";import"./BabyWrapped-CUre04v-.js";import"./index-B7VFGchK.js";import"./validationUtil-BfyiOpJ7.js";const en=()=>(...p)=>(S("button-click")(...p),Promise.resolve()),n={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},Un={title:"steps/AnnenForelderSteg",component:q},e=({søker:p,søkersituasjon:w={situasjon:"fødsel",rolle:"mor"},barn:z={type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:H,gåTilNesteSide:Q=S("button-click"),mellomlagreSøknadOgNaviger:V=en(),avbrytSøknad:W=S("button-click")})=>(Z(),m.jsx(X,{initialEntries:[nn.ANNEN_FORELDER],children:m.jsx($,{onDispatch:Q,initialState:{[k.SØKERSITUASJON]:w,[k.OM_BARNET]:z,[k.ANNEN_FORELDER]:H},children:m.jsx(q,{søkerInfo:{søker:p,arbeidsforhold:[]},mellomlagreSøknadOgNaviger:V,avbrytSøknad:W})})})),r=e.bind({});r.args={barn:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søker:n,sivilstand:Y.UGIFT};const t=e.bind({});t.args={annenForelder:{kanIkkeOppgis:!1},søker:{...n,barn:[]}};const o=e.bind({});o.args={annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1},søker:{...n,barn:[]}};const s=e.bind({});s.args={annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1},søker:{...n,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"}}]}};const i=e.bind({});i.args={barn:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]}};const l=e.bind({});l.args={barn:{type:a.UFØDT,antallBarn:1,termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!1},søker:{...n,barn:[]}};const d=e.bind({});d.args={barn:{type:a.UFØDT,antallBarn:1,termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},annenForelder:{kanIkkeOppgis:!1},søker:{...n,kjønn:"K",barn:[]}};const F=e.bind({});F.args={barn:{type:a.UFØDT,antallBarn:1,termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]}};const x=e.bind({});x.args={barn:{type:a.UFØDT,antallBarn:1,termindato:"2023-05-05"},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:Y.GIFT}}};var c,g,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`({
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
}`,...(u=(g=r.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var N,E,D;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`({
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
}`,...(D=(E=t.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var T,f,y;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`({
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
}`,...(y=(f=o.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var b,R,O;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`({
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
}`,...(O=(R=s.parameters)==null?void 0:R.docs)==null?void 0:O.source}}};var A,v,B;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`({
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
}`,...(B=(v=i.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var j,C,M;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`({
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
}`,...(M=(C=l.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var L,U,_;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`({
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
}`,...(_=(U=d.parameters)==null?void 0:U.docs)==null?void 0:_.source}}};var I,h,K;F.parameters={...F.parameters,docs:{...(I=F.parameters)==null?void 0:I.docs,source:{originalSource:`({
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
}`,...(K=(h=F.parameters)==null?void 0:h.docs)==null?void 0:K.source}}};var P,G,J;x.parameters={...x.parameters,docs:{...(P=x.parameters)==null?void 0:P.docs,source:{originalSource:`({
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
}`,...(J=(G=x.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};const _n=["AnnenForelderFraOppgittBarn","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{r as AnnenForelderFraOppgittBarn,x as FarGiftUfødtBarn,F as FarUfødtBarn,i as ForFar,d as MedmorUfødtBarn,l as MorUfødtBarn,t as SkalOppgiPersonalia,s as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,o as SkalOppgiPersonaliaNavnMangler,_n as __namedExportsOrder,Un as default};
