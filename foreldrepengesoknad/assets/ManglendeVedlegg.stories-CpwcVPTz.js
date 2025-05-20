import{j as f}from"./jsx-runtime-D_zvdyIk.js";import{a as e}from"./index-B-lxVbXh.js";import{F as D,C as n}from"./FpDataContext-DSKr2VRc.js";import{M as J,S as P}from"./useFpNavigator-DBhKkVe_.js";import{h as H,H as _}from"./index-D5WPyhm7.js";import{A as d}from"./AnnenInntekt-D0302_mv.js";import{B as k}from"./Uttaksplan-Ck9SW5JY.js";import{w as x}from"./withQueryClient-DCst-nT1.js";import{M as p}from"./ManglendeVedlegg-WLAmIEHH.js";import"./v4-CtRu48qb.js";import"./index-75N07mRN.js";import"./dates-iBrNYYBq.js";import"./index-WbI2dTMN.js";import"./decorators-Bnaor6Ku.js";import"./iframe-DRUjc3xa.js";import"./VStack-BnVFMHqA.js";import"./index-M7yiXcen.js";import"./index-Bj-N6E0A.js";import"./index-LfnH_Pao.js";import"./ErrorSummaryHookForm-BN77Qz69.js";import"./barnUtils-b3B0_8Wl.js";import"./uttaksplanInfoUtils-C-hYNTvC.js";import"./guid-CsArkN6i.js";import"./index-2xGjs29g.js";const l=()=>(...m)=>(e("button-click")(...m),Promise.resolve()),i={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},L={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1},w={antallBarn:1,type:k.FØDT,fødselsdatoer:["2024-01-01"]},C={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},cn={title:"steps/ManglendeVedlegg",component:p,decorators:[x],parameters:{msw:{handlers:[H.post(".//rest/storage/foreldrepenger/vedlegg",()=>new _("uuid-test",{status:200,headers:{location:"test.com"}}))]}},render:({situasjon:m="fødsel",annenForelder:R=L,barn:F=w,arbeidsforholdOgInntekt:K=C,annenInntekt:M,gåTilNesteSide:U=e("button-click"),...B})=>f.jsx(J,{initialEntries:[P.DOKUMENTASJON],children:f.jsx(D,{onDispatch:U,initialState:{[n.UTTAKSPLAN]:[],[n.ANNEN_FORELDER]:R,[n.OM_BARNET]:F,[n.ARBEIDSFORHOLD_OG_INNTEKT]:K,[n.ANDRE_INNTEKTSKILDER]:M,[n.SØKERSITUASJON]:{rolle:"mor",situasjon:m}},children:f.jsx(p,{...B})})})},r={args:{søkerInfo:i,barn:{antallBarn:1,type:k.UFØDT,termindato:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:l(),avbrytSøknad:e("button-click")}},t={args:{...r.args,situasjon:"adopsjon",barn:{antallBarn:1,type:k.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}}},a={args:{søkerInfo:i,annenForelder:{...L,datoForAleneomsorg:"2024-01-01",erAleneOmOmsorg:!0},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:l(),avbrytSøknad:e("button-click")}},o={args:{søkerInfo:i,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",pågående:!1,type:d.MILITÆRTJENESTE},{fom:"2024-05-01",pågående:!0,type:d.MILITÆRTJENESTE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:l(),avbrytSøknad:e("button-click")}},s={args:{søkerInfo:i,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",type:d.SLUTTPAKKE},{fom:"2024-05-01",tom:"2024-07-01",type:d.SLUTTPAKKE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:l(),avbrytSøknad:e("button-click")}};var g,c,S;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    søkerInfo: defaultSøkerinfo,
    barn: {
      antallBarn: 1,
      type: BarnType.UFØDT,
      termindato: '2024-01-01'
    },
    erEndringssøknad: false,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(S=(c=r.parameters)==null?void 0:c.docs)==null?void 0:S.source}}};var u,T,E;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    ...Termindatodokumentasjon.args,
    situasjon: 'adopsjon',
    barn: {
      antallBarn: 1,
      type: BarnType.ADOPTERT_ANNET_BARN,
      adopsjonsdato: '2023-01-01',
      adoptertIUtlandet: false,
      fødselsdatoer: ['2022-01-01']
    }
  }
}`,...(E=(T=t.parameters)==null?void 0:T.docs)==null?void 0:E.source}}};var A,I,b;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    søkerInfo: defaultSøkerinfo,
    annenForelder: {
      ...defaultAnnenForelder,
      datoForAleneomsorg: '2024-01-01',
      erAleneOmOmsorg: true
    },
    erEndringssøknad: false,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(b=(I=a.parameters)==null?void 0:I.docs)==null?void 0:b.source}}};var v,N,O;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    søkerInfo: defaultSøkerinfo,
    arbeidsforholdOgInntekt: {
      harHattAndreInntektskilder: true,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    annenInntekt: [{
      fom: '2024-01-01',
      tom: '2024-04-01',
      pågående: false,
      type: AnnenInntektType.MILITÆRTJENESTE
    }, {
      fom: '2024-05-01',
      pågående: true,
      type: AnnenInntektType.MILITÆRTJENESTE
    }],
    erEndringssøknad: false,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(O=(N=o.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};var y,h,j;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    søkerInfo: defaultSøkerinfo,
    arbeidsforholdOgInntekt: {
      harHattAndreInntektskilder: true,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    annenInntekt: [{
      fom: '2024-01-01',
      tom: '2024-04-01',
      type: AnnenInntektType.SLUTTPAKKE
    }, {
      fom: '2024-05-01',
      tom: '2024-07-01',
      type: AnnenInntektType.SLUTTPAKKE
    }],
    erEndringssøknad: false,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(j=(h=s.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};const Sn=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon","HarAndreInntektskilderMilitærtjeneste","HarAndreInntektskilderEtterlønn"];export{a as Aleneomsorgdokumentasjon,s as HarAndreInntektskilderEtterlønn,o as HarAndreInntektskilderMilitærtjeneste,t as Omsorgsovertakelsedokumentasjon,r as Termindatodokumentasjon,Sn as __namedExportsOrder,cn as default};
