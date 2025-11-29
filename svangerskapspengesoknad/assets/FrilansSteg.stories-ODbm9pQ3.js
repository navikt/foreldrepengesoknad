import{j as e}from"./iframe-B86yT5i_.js";import{S as i,c as l,C as a}from"./routes-Cv1H6l9K.js";import{F as o}from"./FrilansSteg-B6ySwCj4.js";import{M as c}from"./useSvpNavigator-Cd-cAiS-.js";import"./preload-helper-PPVm8Dsz.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,m=()=>()=>(r("button-click")(),Promise.resolve()),f={title:"steps/FrilansSteg",component:o,render:({gåTilNesteSide:n=r("button-click"),...s})=>e.jsx(c,{initialEntries:[i.FRILANS],children:e.jsx(l,{onDispatch:n,initialState:{[a.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomFrilans:!0,harHattArbeidIUtlandet:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[a.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:e.jsx(o,{...s})})})},t={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:m(),avbrytSøknad:()=>r("button-click")}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: () => action('button-click')
  }
}`,...t.parameters?.docs?.source}}};const g=["Default"];export{t as Default,g as __namedExportsOrder,f as default};
