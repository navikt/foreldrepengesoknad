import{j as a}from"./iframe-DNaNtQpS.js";import{S,c as v,C as e}from"./routes-BY5dy9Vi.js";import{V as n}from"./VelgArbeidSteg-DPnPZ3Vl.js";import{M as c}from"./useSvpNavigator-D1o1YeyF.js";import"./preload-helper-D9Z9MdNV.js";import"./useTilretteleggingerHelper-vma7dd1I.js";import"./List-B8h-mSAq.js";const{action:i}=__STORYBOOK_MODULE_ACTIONS__,o=()=>()=>(i("button-click")(),Promise.resolve()),I=[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",from:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,to:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",from:"2018-04-09T00:00:00.000Z",stillingsprosent:0,to:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",from:"2018-06-25T00:00:00.000Z",stillingsprosent:80,to:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",from:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",from:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",from:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],F={title:"steps/VelgArbeidSteg",component:n,render:({gåTilNesteSide:d=i("button-click"),arbeidsforholdOgInntekt:l,tilrettelegginger:g,valgteArbeidsforhold:b,egenNæring:m,frilans:p,...f})=>a.jsx(c,{initialEntries:[S.VELG_ARBEID],children:a.jsx(v,{onDispatch:d,initialState:{[e.ARBEIDSFORHOLD_OG_INNTEKT]:l,[e.TILRETTELEGGINGER]:g,[e.VALGTE_ARBEIDSFORHOLD]:b,[e.EGEN_NÆRING]:m,[e.FRILANS]:p,[e.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:a.jsx(n,{...f})})})},r={args:{mellomlagreSøknadOgNaviger:o(),avbrytSøknad:o(),arbeidsforhold:I,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1}}},s={args:{...r.args,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!0},egenNæring:{fom:"2024-01-01",tom:"2024-10-01",registrertINorge:!0,næringstype:"FISKE"}}},t={args:{...r.args,arbeidsforholdOgInntekt:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!1},frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2024-01-01"}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};const D=["Default","MedNæringsvalg","MedFrilansvalg"];export{r as Default,t as MedFrilansvalg,s as MedNæringsvalg,D as __namedExportsOrder,F as default};
