import{aB as x,j as e,H as T,aP as m}from"./iframe-BkuJwZAo.js";import{f as U,c as P,S as c,T as Z,C as s}from"./routes-B8DAnnZY.js";import{F as j,M as J,R as $,c as Y}from"./useSvpNavigator-BEugIXb2.js";import{T as I}from"./TilretteleggingSteg-CNg6c8ji.js";import"./dateUtils-BTuOb4qL.js";import"./Bedriftsbanner-CydlfCSi.js";import"./numberUtils-DCxWcr3S.js";import"./validationUtils-CX8ohfQO.js";const{action:k}=__STORYBOOK_MODULE_ACTIONS__,E=()=>()=>(k("button-click")(),Promise.resolve()),o="990322244",B="975326209",q=[{arbeidsgiverId:B,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:o,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100}],tr={title:"steps/TilretteleggingSteg",component:I,render:({gåTilNesteSide:V=k("button-click"),frilans:d,egenNæring:l,valgteArbeidsforhold:H,valgtTilretteleggingId:C,...K})=>e.jsx(J,{initialEntries:[U(c.TILRETTELEGGING,C)],children:e.jsx(P,{onDispatch:V,initialState:{[s.FRILANS]:d,[s.EGEN_NÆRING]:l,[s.VALGTE_ARBEIDSFORHOLD]:H,[s.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!!d,harJobbetSomSelvstendigNæringsdrivende:!!l},[s.OM_BARNET]:{erBarnetFødt:!1,termindato:T().add(45,"days").format(m),fødselsdato:T().add(45,"days").format(m)}},children:e.jsx($,{children:e.jsx(Y,{element:e.jsx(I,{...K}),path:`/${c.TILRETTELEGGING}/${Z}`})})})})},r={args:{mellomlagreSøknadOgNaviger:E(),avbrytSøknad:E(),arbeidsforhold:q,valgtTilretteleggingId:o}},n={args:{...r.args,valgteArbeidsforhold:[o,B]}},t={args:{...r.args,arbeidsforhold:[],valgtTilretteleggingId:j,frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2024-01-01"}}},i={args:{...t.args,valgteArbeidsforhold:[j,o]}},a={args:{...r.args,arbeidsforhold:[],valgtTilretteleggingId:x,egenNæring:{fom:"2024-01-01",tom:"2024-10-01",registrertINorge:!0,næringstype:"FISKE"}}},g={args:{...a.args,valgteArbeidsforhold:[x,o]}};var p,N,G;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    valgtTilretteleggingId: VALGT_TILRETTELEGGING_ID
  }
}`,...(G=(N=r.parameters)==null?void 0:N.docs)==null?void 0:G.source}}};var _,A,S;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    valgteArbeidsforhold: [VALGT_TILRETTELEGGING_ID, ANNEN_TILRETTELEGGING_ID]
  }
}`,...(S=(A=n.parameters)==null?void 0:A.docs)==null?void 0:S.source}}};var b,F,f;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    arbeidsforhold: [],
    valgtTilretteleggingId: FRILANS_ID,
    frilans: {
      jobberFremdelesSomFrilans: true,
      oppstart: '2024-01-01'
    }
  }
}`,...(f=(F=t.parameters)==null?void 0:F.docs)==null?void 0:f.source}}};var L,R,u;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    ...Frilanser.args,
    valgteArbeidsforhold: [FRILANS_ID, VALGT_TILRETTELEGGING_ID]
  }
}`,...(u=(R=i.parameters)==null?void 0:R.docs)==null?void 0:u.source}}};var v,h,D;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(D=(h=a.parameters)==null?void 0:h.docs)==null?void 0:D.source}}};var O,y,M;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    ...SelvstendigNæring.args,
    valgteArbeidsforhold: [EGEN_NÆRING_ID, VALGT_TILRETTELEGGING_ID]
  }
}`,...(M=(y=g.parameters)==null?void 0:y.docs)==null?void 0:M.source}}};const ar=["ForArbeidsforhold","ForArbeidsforholdMedFlereTilrettelegginger","Frilanser","FrilanserMedFlereTilrettelegginger","SelvstendigNæring","SelvstendigNæringMedFlereTilrettelegginger"];export{r as ForArbeidsforhold,n as ForArbeidsforholdMedFlereTilrettelegginger,t as Frilanser,i as FrilanserMedFlereTilrettelegginger,a as SelvstendigNæring,g as SelvstendigNæringMedFlereTilrettelegginger,ar as __namedExportsOrder,tr as default};
