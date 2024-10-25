import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{a as j}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{c as U,a as p,S as Z,C as s,T as J}from"./routes-Cd7jN6RC.js";import{i as P,f as T,I}from"./VeiviserPage-DPeYfbGG.js";import{E as k,N as $}from"./minMax-CbBRSovR.js";import{M as q,R as w,d as z,F as V}from"./useSvpNavigator-CUscQPym.js";import{T as c}from"./TilretteleggingSteg-De9UduYQ.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-BRV0Se7Z.js";import"./index-vZN_Bsf0.js";import"./_baseUniq-BRhi2-IM.js";import"./ErrorSummaryHookForm-C03QHvL8.js";import"./Checkbox-BLvctaFa.js";import"./dateUtils-DnafmBGO.js";import"./Bedriftsbanner-DLTvnzi8.js";import"./numberUtils-DCxWcr3S.js";import"./validationUtils-DBpovSOd.js";import"./ReadMore-CJAWNmD8.js";import"./ExpansionCard-B7xf9_hO.js";const E=()=>(...d)=>(j("button-click")(...d),Promise.resolve()),a="990322244",B="975326209",Q=[{arbeidsgiverId:B,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:a,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100}],Nr={title:"steps/TilretteleggingSteg",component:c,render:({gåTilNesteSide:d=j("button-click"),frilans:l,egenNæring:m,valgteArbeidsforhold:H,valgtTilretteleggingId:C,...K})=>(P(),e.jsx(q,{initialEntries:[U(p.TILRETTELEGGING,C)],children:e.jsx(Z,{onDispatch:d,initialState:{[s.FRILANS]:l,[s.EGEN_NÆRING]:m,[s.VALGTE_ARBEIDSFORHOLD]:H,[s.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!!l,harJobbetSomSelvstendigNæringsdrivende:!!m},[s.OM_BARNET]:{erBarnetFødt:!1,termindato:T().add(45,"days").format(I),fødselsdato:T().add(45,"days").format(I)}},children:e.jsx(w,{children:e.jsx(z,{element:e.jsx(c,{...K}),path:`/${p.TILRETTELEGGING}/${J}`})})})}))},r={args:{mellomlagreSøknadOgNaviger:E(),avbrytSøknad:E(),arbeidsforhold:Q,valgtTilretteleggingId:a}},i={args:{...r.args,valgteArbeidsforhold:[a,B]}},t={args:{...r.args,arbeidsforhold:[],valgtTilretteleggingId:V,frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2024-01-01"}}},n={args:{...t.args,valgteArbeidsforhold:[V,a]}},o={args:{...r.args,arbeidsforhold:[],valgtTilretteleggingId:k,egenNæring:{fom:"2024-01-01",tom:"2024-10-01",pågående:!1,registrertINorge:!0,næringstype:$.FISKER}}},g={args:{...o.args,valgteArbeidsforhold:[k,a]}};var N,G,f;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(M=(x=g.parameters)==null?void 0:x.docs)==null?void 0:M.source}}};const Gr=["ForArbeidsforhold","ForArbeidsforholdMedFlereTilrettelegginger","Frilanser","FrilanserMedFlereTilrettelegginger","SelvstendigNæring","SelvstendigNæringMedFlereTilrettelegginger"];export{r as ForArbeidsforhold,i as ForArbeidsforholdMedFlereTilrettelegginger,t as Frilanser,n as FrilanserMedFlereTilrettelegginger,o as SelvstendigNæring,g as SelvstendigNæringMedFlereTilrettelegginger,Gr as __namedExportsOrder,Nr as default};
