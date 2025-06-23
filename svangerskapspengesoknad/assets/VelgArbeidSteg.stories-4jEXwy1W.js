import{j as n}from"./iframe-BfiIbe-y.js";import{S as A,c as E,C as e}from"./routes-C_WEv7UZ.js";import{V as i}from"./VelgArbeidSteg-SfZR8Ih7.js";import{M as F}from"./useSvpNavigator-CPfwI-Tn.js";import"./useTilretteleggingerHelper-BJ2UzdDc.js";import"./List-DE_KNqL8.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,o=()=>(...a)=>(c("button-click")(...a),Promise.resolve()),D=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],H={title:"steps/VelgArbeidSteg",component:i,render:({gåTilNesteSide:a=c("button-click"),arbeidsforholdOgInntekt:I,tilrettelegginger:u,valgteArbeidsforhold:h,egenNæring:N,frilans:T,...O})=>n.jsx(F,{initialEntries:[A.VELG_ARBEID],children:n.jsx(E,{onDispatch:a,initialState:{[e.ARBEIDSFORHOLD_OG_INNTEKT]:I,[e.TILRETTELEGGINGER]:u,[e.VALGTE_ARBEIDSFORHOLD]:h,[e.EGEN_NÆRING]:N,[e.FRILANS]:T,[e.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:n.jsx(i,{...O})})})},r={args:{mellomlagreSøknadOgNaviger:o(),avbrytSøknad:o(),arbeidsforhold:D,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1}}},s={args:{...r.args,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!0},egenNæring:{fom:"2024-01-01",tom:"2024-10-01",registrertINorge:!0,næringstype:"FISKE"}}},t={args:{...r.args,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!1},frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2024-01-01"}}};var d,l,g;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    arbeidsforholdOgInntekt: {
      harHattArbeidIUtlandet: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    }
  }
}`,...(g=(l=r.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var m,b,f;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    arbeidsforholdOgInntekt: {
      harHattArbeidIUtlandet: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: true
    },
    egenNæring: {
      fom: '2024-01-01',
      tom: '2024-10-01',
      registrertINorge: true,
      næringstype: 'FISKE'
    }
  }
}`,...(f=(b=s.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var p,S,v;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    arbeidsforholdOgInntekt: {
      harHattArbeidIUtlandet: false,
      harJobbetSomFrilans: true,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    frilans: {
      jobberFremdelesSomFrilans: true,
      oppstart: '2024-01-01'
    }
  }
}`,...(v=(S=t.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};const V=["Default","MedNæringsvalg","MedFrilansvalg"];export{r as Default,t as MedFrilansvalg,s as MedNæringsvalg,V as __namedExportsOrder,H as default};
