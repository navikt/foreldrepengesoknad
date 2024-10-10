import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{a as e}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{Q as D,a as J}from"./index-DhiUgGeT.js";import{F as P,C as n}from"./FpDataContext-BUlrLNeW.js";import{M as H,S as _}from"./useFpNavigator-BE5a89kk.js";import{h as x,H as C}from"./index-Ey0twAil.js";import{A as l}from"./AnnenInntekt-D0302_mv.js";import{B as f,i as G}from"./Uttaksplan-O1uyt7Yu.js";import{M as k}from"./ManglendeVedlegg-D4KKf7Sd.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./UttaksdagenString-Cr2wfXF3.js";import"./Label-CEor7wE8.js";import"./decorators-86JrGkCj.js";import"./iframe-NZlOt7MH.js";import"../sb-preview/runtime.js";import"./links-SJ-psabG.js";import"./VStack-BNla2fw4.js";import"./index-vZN_Bsf0.js";import"./index-BRV0Se7Z.js";import"./_baseAssignValue-BYq83q8P.js";import"./ErrorSummaryHookForm-y6FfKDxp.js";import"./barnUtils-CtkONWTb.js";import"./uttaksplanInfoUtils-D1gWXJkx.js";import"./guid-CsArkN6i.js";const i=()=>(...p)=>(e("button-click")(...p),Promise.resolve()),m={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},L={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1},w={antallBarn:1,type:f.FØDT,fødselsdatoer:["2024-01-01"]},Q={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},q=new D({defaultOptions:{queries:{retry:!1}}}),En={title:"steps/ManglendeVedlegg",component:k,parameters:{msw:{handlers:[x.post("https://fp/rest/storage/foreldrepenger/vedlegg",()=>new C("uuid-test",{status:200,headers:{location:"test.com"}}))]}},render:({situasjon:p="fødsel",annenForelder:R=L,barn:F=w,arbeidsforholdOgInntekt:K=Q,annenInntekt:M,gåTilNesteSide:U=e("button-click"),...B})=>(G(),t.jsx(J,{client:q,children:t.jsx(H,{initialEntries:[_.DOKUMENTASJON],children:t.jsx(P,{onDispatch:U,initialState:{[n.UTTAKSPLAN]:[],[n.ANNEN_FORELDER]:R,[n.OM_BARNET]:F,[n.ARBEIDSFORHOLD_OG_INNTEKT]:K,[n.ANDRE_INNTEKTSKILDER]:M,[n.SØKERSITUASJON]:{rolle:"mor",situasjon:p}},children:t.jsx(k,{...B})})})}))},r={args:{søkerInfo:m,barn:{antallBarn:1,type:f.UFØDT,termindato:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:i(),avbrytSøknad:e("button-click")}},a={args:{...r.args,situasjon:"adopsjon",barn:{antallBarn:1,type:f.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}}},o={args:{søkerInfo:m,annenForelder:{...L,datoForAleneomsorg:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:i(),avbrytSøknad:e("button-click")}},s={args:{søkerInfo:m,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",pågående:!1,type:l.MILITÆRTJENESTE},{fom:"2024-05-01",pågående:!0,type:l.MILITÆRTJENESTE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:i(),avbrytSøknad:e("button-click")}},d={args:{søkerInfo:m,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",type:l.SLUTTPAKKE},{fom:"2024-05-01",tom:"2024-07-01",type:l.SLUTTPAKKE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:i(),avbrytSøknad:e("button-click")}};var g,c,S;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(j=(h=d.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};const An=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon","HarAndreInntektskilderMilitærtjeneste","HarAndreInntektskilderEtterlønn"];export{o as Aleneomsorgdokumentasjon,d as HarAndreInntektskilderEtterlønn,s as HarAndreInntektskilderMilitærtjeneste,a as Omsorgsovertakelsedokumentasjon,r as Termindatodokumentasjon,An as __namedExportsOrder,En as default};
