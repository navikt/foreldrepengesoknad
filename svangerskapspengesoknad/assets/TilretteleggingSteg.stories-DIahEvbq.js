import{aP as U,aB as j,j as r,G as m,aQ as c}from"./iframe-BSp1CvC8.js";import{f as P,c as Z,S as I,T as J,C as s}from"./routes-CXQ4cg5P.js";import{F as k,M as $,R as Q,c as Y}from"./useSvpNavigator-ChfwGIwN.js";import{T as p}from"./TilretteleggingSteg-BLSCuerR.js";import"./dateUtils-0WTq_E6P.js";import"./Bedriftsbanner-BiNfp86U.js";import"./numberUtils-DCxWcr3S.js";import"./validationUtils-Df8YZX1H.js";const{action:B}=__STORYBOOK_MODULE_ACTIONS__,E=()=>(...d)=>(B("button-click")(...d),Promise.resolve()),o="990322244",V="975326209",q=[{arbeidsgiverId:V,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:o,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100}],te={title:"steps/TilretteleggingSteg",component:p,render:({gåTilNesteSide:d=B("button-click"),frilans:l,egenNæring:T,valgteArbeidsforhold:H,valgtTilretteleggingId:C,...K})=>r.jsx($,{initialEntries:[P(I.TILRETTELEGGING,C)],children:r.jsx(Z,{onDispatch:d,initialState:{[s.FRILANS]:l,[s.EGEN_NÆRING]:T,[s.VALGTE_ARBEIDSFORHOLD]:H,[s.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!!l,harJobbetSomSelvstendigNæringsdrivende:!!T},[s.OM_BARNET]:{erBarnetFødt:!1,termindato:m().add(45,"days").format(c),fødselsdato:m().add(45,"days").format(c)}},children:r.jsx(Q,{children:r.jsx(Y,{element:r.jsx(p,{...K}),path:`/${I.TILRETTELEGGING}/${J}`})})})})},e={args:{mellomlagreSøknadOgNaviger:E(),avbrytSøknad:E(),arbeidsforhold:q,valgtTilretteleggingId:o}},n={args:{...e.args,valgteArbeidsforhold:[o,V]}},a={args:{...e.args,arbeidsforhold:[],valgtTilretteleggingId:k,frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2024-01-01"}}},i={args:{...a.args,valgteArbeidsforhold:[k,o]}},t={args:{...e.args,arbeidsforhold:[],valgtTilretteleggingId:j,egenNæring:{fom:"2024-01-01",tom:"2024-10-01",pågående:!1,registrertINorge:!0,næringstype:U.FISKER}}},g={args:{...t.args,valgteArbeidsforhold:[j,o]}};var N,G,_;e.parameters={...e.parameters,docs:{...(N=e.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    valgtTilretteleggingId: VALGT_TILRETTELEGGING_ID
  }
}`,...(_=(G=e.parameters)==null?void 0:G.docs)==null?void 0:_.source}}};var A,S,f;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    valgteArbeidsforhold: [VALGT_TILRETTELEGGING_ID, ANNEN_TILRETTELEGGING_ID]
  }
}`,...(f=(S=n.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var R,b,F;a.parameters={...a.parameters,docs:{...(R=a.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    ...ForArbeidsforhold.args,
    arbeidsforhold: [],
    valgtTilretteleggingId: FRILANS_ID,
    frilans: {
      jobberFremdelesSomFrilans: true,
      oppstart: '2024-01-01'
    }
  }
}`,...(F=(b=a.parameters)==null?void 0:b.docs)==null?void 0:F.source}}};var L,u,v;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    ...Frilanser.args,
    valgteArbeidsforhold: [FRILANS_ID, VALGT_TILRETTELEGGING_ID]
  }
}`,...(v=(u=i.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var h,D,O;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(O=(D=t.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var y,M,x;g.parameters={...g.parameters,docs:{...(y=g.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    ...SelvstendigNæring.args,
    valgteArbeidsforhold: [EGEN_NÆRING_ID, VALGT_TILRETTELEGGING_ID]
  }
}`,...(x=(M=g.parameters)==null?void 0:M.docs)==null?void 0:x.source}}};const oe=["ForArbeidsforhold","ForArbeidsforholdMedFlereTilrettelegginger","Frilanser","FrilanserMedFlereTilrettelegginger","SelvstendigNæring","SelvstendigNæringMedFlereTilrettelegginger"];export{e as ForArbeidsforhold,n as ForArbeidsforholdMedFlereTilrettelegginger,a as Frilanser,i as FrilanserMedFlereTilrettelegginger,t as SelvstendigNæring,g as SelvstendigNæringMedFlereTilrettelegginger,oe as __namedExportsOrder,te as default};
