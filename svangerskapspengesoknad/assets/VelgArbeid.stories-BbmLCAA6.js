import{j as n}from"./jsx-runtime-Cw0GR0a5.js";import{a as I}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{a as E,S as F,C as e}from"./routes-B1fb87EI.js";import{i as O}from"./VeiviserPage-DPeYfbGG.js";import{N as R}from"./minMax-BeRBV8CB.js";import{V as i}from"./VelgArbeid-jWp7KI50.js";import{M as y}from"./useSvpNavigator-yfJ1o2OX.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-BRV0Se7Z.js";import"./index-vZN_Bsf0.js";import"./useTilretteleggingerHelper-D-6BeEDu.js";import"./ErrorSummaryHookForm-C03QHvL8.js";import"./Checkbox-BLvctaFa.js";import"./_baseUniq-BRhi2-IM.js";const o=()=>(...a)=>(I("button-click")(...a),Promise.resolve()),D=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],P={title:"steps/VelgArbeid",component:i,render:({gåTilNesteSide:a=I("button-click"),arbeidsforholdOgInntekt:c,tilrettelegginger:u,valgteArbeidsforhold:h,egenNæring:N,frilans:T,...A})=>(O(),n.jsx(y,{initialEntries:[E.VELG_ARBEID],children:n.jsx(F,{onDispatch:a,initialState:{[e.ARBEIDSFORHOLD_OG_INNTEKT]:c,[e.TILRETTELEGGINGER]:u,[e.VALGTE_ARBEIDSFORHOLD]:h,[e.EGEN_NÆRING]:N,[e.FRILANS]:T,[e.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:n.jsx(i,{...A})})}))},r={args:{mellomlagreSøknadOgNaviger:o(),avbrytSøknad:o(),arbeidsforhold:D,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1}}},t={args:{...r.args,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!0},egenNæring:{fom:"2024-01-01",tom:"2024-10-01",pågående:!1,registrertINorge:!0,næringstype:R.FISKER}}},s={args:{...r.args,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!1},frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2024-01-01"}}};var d,l,g;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(g=(l=r.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var m,b,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
      pågående: false,
      registrertINorge: true,
      næringstype: Næringstype.FISKER
    }
  }
}`,...(p=(b=t.parameters)==null?void 0:b.docs)==null?void 0:p.source}}};var f,v,S;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(S=(v=s.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};const q=["Default","MedNæringsvalg","MedFrilansvalg"];export{r as Default,s as MedFrilansvalg,t as MedNæringsvalg,q as __namedExportsOrder,P as default};
