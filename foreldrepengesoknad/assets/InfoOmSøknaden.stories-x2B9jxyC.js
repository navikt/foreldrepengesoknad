import{j as r}from"./jsx-runtime-DoxjgJx5.js";import{d}from"./Tidsperioden-DCn00dy0.js";import{B as N}from"./index-DhGyt4I6.js";import"./index-C-6Uy6j4.js";import"./index-Cu9bd8lq.js";import{D as E,P as I,B as c,S as _}from"./index-CdaWxK5t.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{F as y,C as e}from"./FpDataContext-CjNulmBK.js";import{I as m}from"./InfoOmSøknaden-DPpZXkoi.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-Ckls47V4.js";import"./dateFormValidation-CPrZc7L7.js";import"./links-dJHPeQm3.js";import"./stønadskontoer-CFcPnUZJ.js";import"./barnUtils-Cq84rcwD.js";import"./message-D9M6PiyE.js";const R=s=>r.jsx(N,{children:r.jsx(s,{})}),A=R;R.__docgenInfo={description:"",methods:[],displayName:"withRouterProvider"};const U={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},V={title:"components/InfoOmSøknaden",component:m,decorators:[A]},o=({annenForelder:s,søkerData:f,søkersituasjon:T,erIUttaksplanenSteg:u=!0,ekisterendeSak:O})=>r.jsx(y,{initialState:{[e.OM_BARNET]:{type:c.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},[e.ANNEN_FORELDER]:s,[e.SØKER_DATA]:f,[e.SØKERSITUASJON]:T,[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:E.HUNDRE_PROSENT}},children:r.jsx(m,{tilgjengeligeStønadskontoer:[{konto:_.Mødrekvote,dager:50}],eksisterendeSak:O,erIUttaksplanenSteg:u,søker:U})}),n=o.bind({});n.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!0},søkerData:{}};const t=o.bind({});t.args={søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}};const a=o.bind({});a.args={søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Olga",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},ekisterendeSak:{erAnnenPartsSak:!0,grunnlag:{dekningsgrad:E.HUNDRE_PROSENT},uttaksplan:[{type:I.Uttak,gradert:!0,stillingsprosent:"100",ønskerSamtidigUttak:!0,samtidigUttakProsent:"50",tidsperiode:{fom:d("2021-01-01").toDate(),tom:d("2021-01-10").toDate()}}]},erIUttaksplanenSteg:!1};var i,k,p;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`({
  annenForelder,
  søkerData,
  søkersituasjon,
  erIUttaksplanenSteg = true,
  ekisterendeSak
}) => {
  return <FpDataContext initialState={{
    [ContextDataType.OM_BARNET]: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1
    },
    [ContextDataType.ANNEN_FORELDER]: annenForelder,
    [ContextDataType.SØKER_DATA]: søkerData,
    [ContextDataType.SØKERSITUASJON]: søkersituasjon,
    [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    }
  }}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} søker={søker} />
        </FpDataContext>;
}`,...(p=(k=n.parameters)==null?void 0:k.docs)==null?void 0:p.source}}};var l,S,D;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`({
  annenForelder,
  søkerData,
  søkersituasjon,
  erIUttaksplanenSteg = true,
  ekisterendeSak
}) => {
  return <FpDataContext initialState={{
    [ContextDataType.OM_BARNET]: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1
    },
    [ContextDataType.ANNEN_FORELDER]: annenForelder,
    [ContextDataType.SØKER_DATA]: søkerData,
    [ContextDataType.SØKERSITUASJON]: søkersituasjon,
    [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    }
  }}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} søker={søker} />
        </FpDataContext>;
}`,...(D=(S=t.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var x,g,F;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`({
  annenForelder,
  søkerData,
  søkersituasjon,
  erIUttaksplanenSteg = true,
  ekisterendeSak
}) => {
  return <FpDataContext initialState={{
    [ContextDataType.OM_BARNET]: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1
    },
    [ContextDataType.ANNEN_FORELDER]: annenForelder,
    [ContextDataType.SØKER_DATA]: søkerData,
    [ContextDataType.SØKERSITUASJON]: søkersituasjon,
    [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    }
  }}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} søker={søker} />
        </FpDataContext>;
}`,...(F=(g=a.parameters)==null?void 0:g.docs)==null?void 0:F.source}}};const W=["Default","AnnenForelder","InfoOmMorsSak"];export{t as AnnenForelder,n as Default,a as InfoOmMorsSak,W as __namedExportsOrder,V as default};
