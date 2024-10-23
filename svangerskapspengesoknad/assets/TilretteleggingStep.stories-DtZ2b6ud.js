import{j as l}from"./jsx-runtime-Cw0GR0a5.js";import{a as y}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{a as K,S as U,C as e}from"./routes-B1fb87EI.js";import{i as Z,f as d,I as m}from"./VeiviserPage-DPeYfbGG.js";import{E as M,N as J}from"./minMax-BeRBV8CB.js";import{M as P,F as x}from"./useSvpNavigator-yfJ1o2OX.js";import{T as p}from"./TilretteleggingStep-Lqqg0z7n.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-BRV0Se7Z.js";import"./index-vZN_Bsf0.js";import"./_baseUniq-BRhi2-IM.js";import"./ErrorSummaryHookForm-C03QHvL8.js";import"./Checkbox-BLvctaFa.js";import"./dateUtils-DnafmBGO.js";import"./Bedriftsbanner-pytk0qyo.js";import"./numberUtils-DCxWcr3S.js";import"./validationUtils-CUnokTVc.js";import"./ReadMore-CJAWNmD8.js";import"./ExpansionCard-B7xf9_hO.js";const I=()=>(...g)=>(y("button-click")(...g),Promise.resolve()),o="990322244",V="975326209",q=[{arbeidsgiverId:V,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:o,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100}],Ir={title:"steps/TilretteleggingStep",component:p,render:({gåTilNesteSide:g=y("button-click"),frilans:j,egenNæring:k,valgteArbeidsforhold:B,valgtTilretteleggingId:H,...C})=>(Z(),l.jsx(P,{initialEntries:[K.TILRETTELEGGING],children:l.jsx(U,{onDispatch:g,initialState:{[e.VALGT_TILRETTELEGGING_ID]:H,[e.FRILANS]:j,[e.EGEN_NÆRING]:k,[e.VALGTE_ARBEIDSFORHOLD]:B,[e.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[e.OM_BARNET]:{erBarnetFødt:!1,termindato:d().add(45,"days").format(m),fødselsdato:d().add(45,"days").format(m)}},children:l.jsx(p,{...C})})}))},r={args:{mellomlagreSøknadOgNaviger:I(),avbrytSøknad:I(),arbeidsforhold:q,valgtTilretteleggingId:o}},a={args:{...r.args,valgteArbeidsforhold:[o,V]}},s={args:{...r.args,valgtTilretteleggingId:x,frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2024-01-01"}}},i={args:{...s.args,valgteArbeidsforhold:[x,o]}},t={args:{...r.args,valgtTilretteleggingId:M,egenNæring:{fom:"2024-01-01",tom:"2024-10-01",pågående:!1,registrertINorge:!0,næringstype:J.FISKER}}},n={args:{...t.args,valgteArbeidsforhold:[M,o]}};var T,c,E;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    valgtTilretteleggingId: VALGT_TILRETTELEGGING_ID
  }
}`,...(E=(c=r.parameters)==null?void 0:c.docs)==null?void 0:E.source}}};var N,G,f;a.parameters={...a.parameters,docs:{...(N=a.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    valgteArbeidsforhold: [VALGT_TILRETTELEGGING_ID, ANNEN_TILRETTELEGGING_ID]
  }
}`,...(f=(G=a.parameters)==null?void 0:G.docs)==null?void 0:f.source}}};var A,S,_;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    valgtTilretteleggingId: FRILANS_ID,
    frilans: {
      jobberFremdelesSomFrilans: true,
      oppstart: '2024-01-01'
    }
  }
}`,...(_=(S=s.parameters)==null?void 0:S.docs)==null?void 0:_.source}}};var F,L,b;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    ...Frilanser.args,
    valgteArbeidsforhold: [FRILANS_ID, VALGT_TILRETTELEGGING_ID]
  }
}`,...(b=(L=i.parameters)==null?void 0:L.docs)==null?void 0:b.source}}};var v,u,R;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    valgtTilretteleggingId: EGEN_NÆRING_ID,
    egenNæring: {
      fom: '2024-01-01',
      tom: '2024-10-01',
      pågående: false,
      registrertINorge: true,
      næringstype: Næringstype.FISKER
    }
  }
}`,...(R=(u=t.parameters)==null?void 0:u.docs)==null?void 0:R.source}}};var D,h,O;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    ...SelvstendigNæring.args,
    valgteArbeidsforhold: [EGEN_NÆRING_ID, VALGT_TILRETTELEGGING_ID]
  }
}`,...(O=(h=n.parameters)==null?void 0:h.docs)==null?void 0:O.source}}};const Tr=["ForArbeidsforhold","ForArbeidsforholdMedFlereTilrettelegginger","Frilanser","FrilanserMedFlereTilrettelegginger","SelvstendigNæring","SelvstendigNæringMedFlereTilrettelegginger"];export{r as ForArbeidsforhold,a as ForArbeidsforholdMedFlereTilrettelegginger,s as Frilanser,i as FrilanserMedFlereTilrettelegginger,t as SelvstendigNæring,n as SelvstendigNæringMedFlereTilrettelegginger,Tr as __namedExportsOrder,Ir as default};
