import{j as t}from"./jsx-runtime-CLpGMVip.js";import{a as e}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{Q as D,a as J}from"./index-0JiJ8puv.js";import{F as P,C as n}from"./FpDataContext-DWIUkGg8.js";import{M as H,S as _}from"./useFpNavigator-kBrIS16a.js";import{h as x,H as C}from"./index-B-Pz4-0B.js";import{A as l}from"./AnnenInntekt-D0302_mv.js";import{B as k}from"./Uttaksplan-R8uyWRL5.js";import{M as p}from"./ManglendeVedlegg-Cre2QU5h.js";import"./v4-CtRu48qb.js";import"./index-DI2V0i71.js";import"./dates-AkG-ZPn6.js";import"./List-CllE7Dzf.js";import"./decorators-DIzpaN6C.js";import"./iframe-CSc0Umzw.js";import"./VStack-CblYb0Xi.js";import"./index-Go8-pri6.js";import"./index-DNwIpxWs.js";import"./ErrorSummaryHookForm-B17hkftd.js";import"./ConfirmationPanel-BsekZZI4.js";import"./barnUtils-CKaP_q01.js";import"./uttaksplanInfoUtils-Bus8Vu1t.js";import"./guid-CsArkN6i.js";const i=()=>(...f)=>(e("button-click")(...f),Promise.resolve()),m={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},L={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1},G={antallBarn:1,type:k.FØDT,fødselsdatoer:["2024-01-01"]},w={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},Q=new D({defaultOptions:{queries:{retry:!1}}}),Sn={title:"steps/ManglendeVedlegg",component:p,parameters:{msw:{handlers:[x.post(".//rest/storage/foreldrepenger/vedlegg",()=>new C("uuid-test",{status:200,headers:{location:"test.com"}}))]}},render:({situasjon:f="fødsel",annenForelder:R=L,barn:F=G,arbeidsforholdOgInntekt:K=w,annenInntekt:M,gåTilNesteSide:U=e("button-click"),...B})=>t.jsx(J,{client:Q,children:t.jsx(H,{initialEntries:[_.DOKUMENTASJON],children:t.jsx(P,{onDispatch:U,initialState:{[n.UTTAKSPLAN]:[],[n.ANNEN_FORELDER]:R,[n.OM_BARNET]:F,[n.ARBEIDSFORHOLD_OG_INNTEKT]:K,[n.ANDRE_INNTEKTSKILDER]:M,[n.SØKERSITUASJON]:{rolle:"mor",situasjon:f}},children:t.jsx(p,{...B})})})})},r={args:{søkerInfo:m,barn:{antallBarn:1,type:k.UFØDT,termindato:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:i(),avbrytSøknad:e("button-click")}},a={args:{...r.args,situasjon:"adopsjon",barn:{antallBarn:1,type:k.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}}},o={args:{søkerInfo:m,annenForelder:{...L,datoForAleneomsorg:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:i(),avbrytSøknad:e("button-click")}},s={args:{søkerInfo:m,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",pågående:!1,type:l.MILITÆRTJENESTE},{fom:"2024-05-01",pågående:!0,type:l.MILITÆRTJENESTE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:i(),avbrytSøknad:e("button-click")}},d={args:{søkerInfo:m,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",type:l.SLUTTPAKKE},{fom:"2024-05-01",tom:"2024-07-01",type:l.SLUTTPAKKE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:i(),avbrytSøknad:e("button-click")}};var g,c,S;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(S=(c=r.parameters)==null?void 0:c.docs)==null?void 0:S.source}}};var u,T,E;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(E=(T=a.parameters)==null?void 0:T.docs)==null?void 0:E.source}}};var A,I,b;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    søkerInfo: defaultSøkerinfo,
    annenForelder: {
      ...defaultAnnenForelder,
      datoForAleneomsorg: '2024-01-01'
    },
    erEndringssøknad: false,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(b=(I=o.parameters)==null?void 0:I.docs)==null?void 0:b.source}}};var v,N,y;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(y=(N=s.parameters)==null?void 0:N.docs)==null?void 0:y.source}}};var O,h,j;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(j=(h=d.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};const un=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon","HarAndreInntektskilderMilitærtjeneste","HarAndreInntektskilderEtterlønn"];export{o as Aleneomsorgdokumentasjon,d as HarAndreInntektskilderEtterlønn,s as HarAndreInntektskilderMilitærtjeneste,a as Omsorgsovertakelsedokumentasjon,r as Termindatodokumentasjon,un as __namedExportsOrder,Sn as default};
