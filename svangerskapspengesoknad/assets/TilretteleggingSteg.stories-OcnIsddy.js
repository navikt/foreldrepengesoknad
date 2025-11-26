import{aK as p,j as e,a1 as c,aY as m}from"./iframe-CLKvCa0D.js";import{f as F,c as f,S as I,T as L,C as s}from"./routes-buBlAeEm.js";import{F as N,M as R,R as u,c as v}from"./useSvpNavigator-BskB-s_a.js";import{T as E}from"./TilretteleggingSteg-DHoIa1t2.js";import"./preload-helper-D9Z9MdNV.js";import"./dateUtils-Do4W2wmH.js";import"./Bedriftsbanner-0NyChfNG.js";import"./numberUtils-C8dm__ZJ.js";import"./validationUtils-5OhKuZIK.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,h=()=>()=>(l("button-click")(),Promise.resolve()),o="990322244",G="975326209",D=[{arbeidsgiverId:G,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:o,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100}],K={title:"steps/TilretteleggingSteg",component:E,render:({gåTilNesteSide:_=l("button-click"),frilans:d,egenNæring:T,valgteArbeidsforhold:A,valgtTilretteleggingId:S,...b})=>e.jsx(R,{initialEntries:[F(I.TILRETTELEGGING,S)],children:e.jsx(f,{onDispatch:_,initialState:{[s.FRILANS]:d,[s.EGEN_NÆRING]:T,[s.VALGTE_ARBEIDSFORHOLD]:A,[s.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!!d,harJobbetSomSelvstendigNæringsdrivende:!!T},[s.OM_BARNET]:{erBarnetFødt:!1,termindato:c().add(45,"days").format(m),fødselsdato:c().add(45,"days").format(m)}},children:e.jsx(u,{children:e.jsx(v,{element:e.jsx(E,{...b}),path:`/${I.TILRETTELEGGING}/${L}`})})})})},r={args:{mellomlagreSøknadOgNaviger:h(),avbrytSøknad:()=>l("button-click"),arbeidsforhold:D,valgtTilretteleggingId:o}},n={args:{...r.args,valgteArbeidsforhold:[o,G]}},t={args:{...r.args,arbeidsforhold:[],valgtTilretteleggingId:N,frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2024-01-01"}}},i={args:{...t.args,valgteArbeidsforhold:[N,o]}},a={args:{...r.args,arbeidsforhold:[],valgtTilretteleggingId:p,egenNæring:{fom:"2024-01-01",tom:"2024-10-01",registrertINorge:!0,næringstype:"FISKE"}}},g={args:{...a.args,valgteArbeidsforhold:[p,o]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: () => action('button-click'),
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
}`,...g.parameters?.docs?.source}}};const C=["ForArbeidsforhold","ForArbeidsforholdMedFlereTilrettelegginger","Frilanser","FrilanserMedFlereTilrettelegginger","SelvstendigNæring","SelvstendigNæringMedFlereTilrettelegginger"];export{r as ForArbeidsforhold,n as ForArbeidsforholdMedFlereTilrettelegginger,t as Frilanser,i as FrilanserMedFlereTilrettelegginger,a as SelvstendigNæring,g as SelvstendigNæringMedFlereTilrettelegginger,C as __namedExportsOrder,K as default};
