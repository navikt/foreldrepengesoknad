import{j as e}from"./index-DDg3ir62.js";import{a as j}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{c as U,a as p,S as Z,C as s,T as J}from"./routes-BC9Z9msW.js";import{e as T,I}from"./RegisterdataUtdatert-OCsnkJ_Y.js";import{E as k,N as P}from"./minMax-rTBP9J_7.js";import{M as $,R as q,d as w,F as V}from"./useSvpNavigator-nz51zV2n.js";import{T as c}from"./TilretteleggingSteg-C6WhOWt8.js";import"./index-CR__hKHy.js";import"./index-CtmzRm2p.js";import"./v4-CtRu48qb.js";import"./ErrorSummaryHookForm-Bv91-LyL.js";import"./Checkbox-C_-kuLV3.js";import"./dateUtils-DnPHK_Lp.js";import"./Bedriftsbanner-B3j37ROA.js";import"./numberUtils-sHqsSnTP.js";import"./validationUtils-BVGBANPC.js";import"./ReadMore-BLe69GQT.js";import"./ExpansionCard-DbwTLXtZ.js";const E=()=>(...d)=>(j("button-click")(...d),Promise.resolve()),a="990322244",B="975326209",z=[{arbeidsgiverId:B,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:a,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100}],Ir={title:"steps/TilretteleggingSteg",component:c,render:({gåTilNesteSide:d=j("button-click"),frilans:l,egenNæring:m,valgteArbeidsforhold:H,valgtTilretteleggingId:C,...K})=>e.jsx($,{initialEntries:[U(p.TILRETTELEGGING,C)],children:e.jsx(Z,{onDispatch:d,initialState:{[s.FRILANS]:l,[s.EGEN_NÆRING]:m,[s.VALGTE_ARBEIDSFORHOLD]:H,[s.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!!l,harJobbetSomSelvstendigNæringsdrivende:!!m},[s.OM_BARNET]:{erBarnetFødt:!1,termindato:T().add(45,"days").format(I),fødselsdato:T().add(45,"days").format(I)}},children:e.jsx(q,{children:e.jsx(w,{element:e.jsx(c,{...K}),path:`/${p.TILRETTELEGGING}/${J}`})})})})},r={args:{mellomlagreSøknadOgNaviger:E(),avbrytSøknad:E(),arbeidsforhold:z,valgtTilretteleggingId:a}},i={args:{...r.args,valgteArbeidsforhold:[a,B]}},t={args:{...r.args,arbeidsforhold:[],valgtTilretteleggingId:V,frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2024-01-01"}}},n={args:{...t.args,valgteArbeidsforhold:[V,a]}},o={args:{...r.args,arbeidsforhold:[],valgtTilretteleggingId:k,egenNæring:{fom:"2024-01-01",tom:"2024-10-01",pågående:!1,registrertINorge:!0,næringstype:P.FISKER}}},g={args:{...o.args,valgteArbeidsforhold:[k,a]}};var N,G,f;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    valgtTilretteleggingId: VALGT_TILRETTELEGGING_ID
  }
}`,...(f=(G=r.parameters)==null?void 0:G.docs)==null?void 0:f.source}}};var A,S,b;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    valgteArbeidsforhold: [VALGT_TILRETTELEGGING_ID, ANNEN_TILRETTELEGGING_ID]
  }
}`,...(b=(S=i.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var F,R,_;t.parameters={...t.parameters,docs:{...(F=t.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    arbeidsforhold: [],
    valgtTilretteleggingId: FRILANS_ID,
    frilans: {
      jobberFremdelesSomFrilans: true,
      oppstart: '2024-01-01'
    }
  }
}`,...(_=(R=t.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};var L,u,v;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    ...Frilanser.args,
    valgteArbeidsforhold: [FRILANS_ID, VALGT_TILRETTELEGGING_ID]
  }
}`,...(v=(u=n.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var h,D,O;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    arbeidsforhold: [],
    valgtTilretteleggingId: EGEN_NÆRING_ID,
    egenNæring: {
      fom: '2024-01-01',
      tom: '2024-10-01',
      pågående: false,
      registrertINorge: true,
      næringstype: Næringstype.FISKER
    }
  }
}`,...(O=(D=o.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var y,x,M;g.parameters={...g.parameters,docs:{...(y=g.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    ...SelvstendigNæring.args,
    valgteArbeidsforhold: [EGEN_NÆRING_ID, VALGT_TILRETTELEGGING_ID]
  }
}`,...(M=(x=g.parameters)==null?void 0:x.docs)==null?void 0:M.source}}};const cr=["ForArbeidsforhold","ForArbeidsforholdMedFlereTilrettelegginger","Frilanser","FrilanserMedFlereTilrettelegginger","SelvstendigNæring","SelvstendigNæringMedFlereTilrettelegginger"];export{r as ForArbeidsforhold,i as ForArbeidsforholdMedFlereTilrettelegginger,t as Frilanser,n as FrilanserMedFlereTilrettelegginger,o as SelvstendigNæring,g as SelvstendigNæringMedFlereTilrettelegginger,cr as __namedExportsOrder,Ir as default};
