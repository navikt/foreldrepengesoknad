import{j as k}from"./jsx-runtime-Cw0GR0a5.js";import{a as e}from"./chunk-454WOBUV-CM0pFb8Z.js";import{M as J}from"./index-D6lQcMct.js";import"./index-CTjT7uj6.js";import{g as P}from"./apiInterceptor-BCtLUnPl.js";import{B as f,i as _}from"./Uttaksplan-BNLrPXqp.js";import{F as H,C as n}from"./FpDataContext-DbGuQRR8.js";import{M as x,S as G,A as d}from"./useFpNavigator-DfIqg2gN.js";import{M as g}from"./ManglendeVedlegg-C5dQ0EZT.js";import"./v4-CQkTLCs1.js";import"./Uttaksdagen-Uuolrvsk.js";import"./Label-DlDsESPM.js";import"./iframe-DX-DcUCh.js";import"../sb-preview/runtime.js";import"./links-DsaZ4ja0.js";import"./VStack-CrTlUGgl.js";import"./index-CYM-y3Gt.js";import"./index-BRV0Se7Z.js";import"./_baseAssignValue-BQNUR2Ll.js";import"./_overArg-BaVEvwpy.js";import"./ErrorSummaryHookForm-Du_dc4Cz.js";import"./util-DGSc1-zE.js";import"./barnUtils-D91UoMPO.js";import"./guid-CsArkN6i.js";const l=()=>(...m)=>(e("button-click")(...m),Promise.resolve()),i={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},F={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1},C={antallBarn:1,type:f.FØDT,fødselsdatoer:["2024-01-01"]},Y={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},Sn={component:g,render:({situasjon:m="fødsel",annenForelder:M=F,barn:R=C,arbeidsforholdOgInntekt:K=Y,annenInntekt:U,gåTilNesteSide:B=e("button-click"),...D})=>{_();const p=new J(P());return p.onPost("/rest/storage/foreldrepenger/vedlegg").reply(200),p.onPost("http://localhost:8888/rest/storage/foreldrepenger/vedlegg").reply(200),k.jsx(x,{initialEntries:[G.DOKUMENTASJON],children:k.jsx(H,{onDispatch:B,initialState:{[n.UTTAKSPLAN]:[],[n.ANNEN_FORELDER]:M,[n.OM_BARNET]:R,[n.ARBEIDSFORHOLD_OG_INNTEKT]:K,[n.ANDRE_INNTEKTSKILDER]:U,[n.SØKERSITUASJON]:{rolle:"mor",situasjon:m}},children:k.jsx(g,{...D})})})}},r={args:{søkerInfo:i,barn:{antallBarn:1,type:f.UFØDT,termindato:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:l(),avbrytSøknad:e("button-click")}},t={args:{...r.args,situasjon:"adopsjon",barn:{antallBarn:1,type:f.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}}},a={args:{søkerInfo:i,annenForelder:{...F,datoForAleneomsorg:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:l(),avbrytSøknad:e("button-click")}},o={args:{søkerInfo:i,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",pågående:!1,type:d.MILITÆRTJENESTE},{fom:"2024-05-01",pågående:!0,type:d.MILITÆRTJENESTE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:l(),avbrytSøknad:e("button-click")}},s={args:{søkerInfo:i,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",type:d.SLUTTPAKKE},{fom:"2024-05-01",tom:"2024-07-01",type:d.SLUTTPAKKE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:l(),avbrytSøknad:e("button-click")}};var c,S,T;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(T=(S=r.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var u,A,E;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(E=(A=t.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var I,b,v;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(v=(b=a.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var N,y,O;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(O=(y=o.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};var h,j,L;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(L=(j=s.parameters)==null?void 0:j.docs)==null?void 0:L.source}}};const Tn=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon","HarAndreInntektskilderMilitærtjeneste","HarAndreInntektskilderEtterlønn"];export{a as Aleneomsorgdokumentasjon,s as HarAndreInntektskilderEtterlønn,o as HarAndreInntektskilderMilitærtjeneste,t as Omsorgsovertakelsedokumentasjon,r as Termindatodokumentasjon,Tn as __namedExportsOrder,Sn as default};
