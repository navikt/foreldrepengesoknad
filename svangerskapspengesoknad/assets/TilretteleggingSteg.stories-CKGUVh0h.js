import{aG as E,j as e,Z as T,aU as m}from"./iframe-BgGXcUx4.js";import{f,c as L,S as c,T as R,C as s}from"./routes-CiQMQxKt.js";import{F as N,M as u,R as v,c as h}from"./useSvpNavigator-CVhccoqM.js";import{T as I}from"./TilretteleggingSteg-Dqvdr9CU.js";import"./preload-helper-D9Z9MdNV.js";import"./dateUtils-B9RMKKfK.js";import"./Bedriftsbanner-CTRYItT5.js";import"./numberUtils-C8dm__ZJ.js";import"./validationUtils-OXh2jq1V.js";const{action:G}=__STORYBOOK_MODULE_ACTIONS__,p=()=>()=>(G("button-click")(),Promise.resolve()),o="990322244",_="975326209",D=[{arbeidsgiverId:_,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",from:"2018-04-09T00:00:00.000Z",stillingsprosent:0,to:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:o,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",from:"2017-04-05T00:00:00.000Z",stillingsprosent:100}],U={title:"steps/TilretteleggingSteg",component:I,render:({gåTilNesteSide:A=G("button-click"),frilans:d,egenNæring:l,valgteArbeidsforhold:S,valgtTilretteleggingId:b,...F})=>e.jsx(u,{initialEntries:[f(c.TILRETTELEGGING,b)],children:e.jsx(L,{onDispatch:A,initialState:{[s.FRILANS]:d,[s.EGEN_NÆRING]:l,[s.VALGTE_ARBEIDSFORHOLD]:S,[s.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!!d,harJobbetSomSelvstendigNæringsdrivende:!!l},[s.OM_BARNET]:{erBarnetFødt:!1,termindato:T().add(45,"days").format(m),fødselsdato:T().add(45,"days").format(m)}},children:e.jsx(v,{children:e.jsx(h,{element:e.jsx(I,{...F}),path:`/${c.TILRETTELEGGING}/${R}`})})})})},r={args:{mellomlagreSøknadOgNaviger:p(),avbrytSøknad:p(),arbeidsforhold:D,valgtTilretteleggingId:o}},n={args:{...r.args,valgteArbeidsforhold:[o,_]}},t={args:{...r.args,arbeidsforhold:[],valgtTilretteleggingId:N,frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2024-01-01"}}},i={args:{...t.args,valgteArbeidsforhold:[N,o]}},a={args:{...r.args,arbeidsforhold:[],valgtTilretteleggingId:E,egenNæring:{fom:"2024-01-01",tom:"2024-10-01",registrertINorge:!0,næringstype:"FISKE"}}},g={args:{...a.args,valgteArbeidsforhold:[E,o]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    valgtTilretteleggingId: VALGT_TILRETTELEGGING_ID
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    valgteArbeidsforhold: [VALGT_TILRETTELEGGING_ID, ANNEN_TILRETTELEGGING_ID]
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    arbeidsforhold: [],
    valgtTilretteleggingId: FRILANS_ID,
    frilans: {
      jobberFremdelesSomFrilans: true,
      oppstart: '2024-01-01'
    }
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    ...Frilanser.args,
    valgteArbeidsforhold: [FRILANS_ID, VALGT_TILRETTELEGGING_ID]
  }
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    arbeidsforhold: [],
    valgtTilretteleggingId: EGEN_NÆRING_ID,
    egenNæring: {
      fom: '2024-01-01',
      tom: '2024-10-01',
      registrertINorge: true,
      næringstype: 'FISKE'
    }
  }
}`,...a.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...SelvstendigNæring.args,
    valgteArbeidsforhold: [EGEN_NÆRING_ID, VALGT_TILRETTELEGGING_ID]
  }
}`,...g.parameters?.docs?.source}}};const C=["ForArbeidsforhold","ForArbeidsforholdMedFlereTilrettelegginger","Frilanser","FrilanserMedFlereTilrettelegginger","SelvstendigNæring","SelvstendigNæringMedFlereTilrettelegginger"];export{r as ForArbeidsforhold,n as ForArbeidsforholdMedFlereTilrettelegginger,t as Frilanser,i as FrilanserMedFlereTilrettelegginger,a as SelvstendigNæring,g as SelvstendigNæringMedFlereTilrettelegginger,C as __namedExportsOrder,U as default};
