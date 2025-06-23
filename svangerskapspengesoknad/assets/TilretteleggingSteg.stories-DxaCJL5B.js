import{aB as j,j as e,G as m,aP as c}from"./iframe-BfiIbe-y.js";import{f as U,c as P,S as I,T as Z,C as s}from"./routes-C_WEv7UZ.js";import{F as k,M as J,R as $,c as Y}from"./useSvpNavigator-CPfwI-Tn.js";import{T as E}from"./TilretteleggingSteg-DmRuM5wS.js";import"./dateUtils-BF5JAprC.js";import"./Bedriftsbanner-BD9vwHUD.js";import"./numberUtils-DCxWcr3S.js";import"./validationUtils-DeDmQqAn.js";const{action:B}=__STORYBOOK_MODULE_ACTIONS__,p=()=>(...d)=>(B("button-click")(...d),Promise.resolve()),o="990322244",V="975326209",q=[{arbeidsgiverId:V,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:o,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100}],tr={title:"steps/TilretteleggingSteg",component:E,render:({gåTilNesteSide:d=B("button-click"),frilans:l,egenNæring:T,valgteArbeidsforhold:H,valgtTilretteleggingId:C,...K})=>e.jsx(J,{initialEntries:[U(I.TILRETTELEGGING,C)],children:e.jsx(P,{onDispatch:d,initialState:{[s.FRILANS]:l,[s.EGEN_NÆRING]:T,[s.VALGTE_ARBEIDSFORHOLD]:H,[s.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!!l,harJobbetSomSelvstendigNæringsdrivende:!!T},[s.OM_BARNET]:{erBarnetFødt:!1,termindato:m().add(45,"days").format(c),fødselsdato:m().add(45,"days").format(c)}},children:e.jsx($,{children:e.jsx(Y,{element:e.jsx(E,{...K}),path:`/${I.TILRETTELEGGING}/${Z}`})})})})},r={args:{mellomlagreSøknadOgNaviger:p(),avbrytSøknad:p(),arbeidsforhold:q,valgtTilretteleggingId:o}},n={args:{...r.args,valgteArbeidsforhold:[o,V]}},t={args:{...r.args,arbeidsforhold:[],valgtTilretteleggingId:k,frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2024-01-01"}}},i={args:{...t.args,valgteArbeidsforhold:[k,o]}},a={args:{...r.args,arbeidsforhold:[],valgtTilretteleggingId:j,egenNæring:{fom:"2024-01-01",tom:"2024-10-01",registrertINorge:!0,næringstype:"FISKE"}}},g={args:{...a.args,valgteArbeidsforhold:[j,o]}};var N,G,_;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    valgtTilretteleggingId: VALGT_TILRETTELEGGING_ID
  }
}`,...(_=(G=r.parameters)==null?void 0:G.docs)==null?void 0:_.source}}};var A,S,b;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    valgteArbeidsforhold: [VALGT_TILRETTELEGGING_ID, ANNEN_TILRETTELEGGING_ID]
  }
}`,...(b=(S=n.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var F,f,L;t.parameters={...t.parameters,docs:{...(F=t.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    arbeidsforhold: [],
    valgtTilretteleggingId: FRILANS_ID,
    frilans: {
      jobberFremdelesSomFrilans: true,
      oppstart: '2024-01-01'
    }
  }
}`,...(L=(f=t.parameters)==null?void 0:f.docs)==null?void 0:L.source}}};var R,u,v;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    ...Frilanser.args,
    valgteArbeidsforhold: [FRILANS_ID, VALGT_TILRETTELEGGING_ID]
  }
}`,...(v=(u=i.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var h,D,O;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(O=(D=a.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var y,M,x;g.parameters={...g.parameters,docs:{...(y=g.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    ...SelvstendigNæring.args,
    valgteArbeidsforhold: [EGEN_NÆRING_ID, VALGT_TILRETTELEGGING_ID]
  }
}`,...(x=(M=g.parameters)==null?void 0:M.docs)==null?void 0:x.source}}};const ar=["ForArbeidsforhold","ForArbeidsforholdMedFlereTilrettelegginger","Frilanser","FrilanserMedFlereTilrettelegginger","SelvstendigNæring","SelvstendigNæringMedFlereTilrettelegginger"];export{r as ForArbeidsforhold,n as ForArbeidsforholdMedFlereTilrettelegginger,t as Frilanser,i as FrilanserMedFlereTilrettelegginger,a as SelvstendigNæring,g as SelvstendigNæringMedFlereTilrettelegginger,ar as __namedExportsOrder,tr as default};
