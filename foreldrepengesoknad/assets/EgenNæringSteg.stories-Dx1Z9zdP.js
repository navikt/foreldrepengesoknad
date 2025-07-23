import{_ as r}from"./iframe-DB3LpkTd.js";import{F as i,C as m}from"./FpDataContext-BVX6iKZ4.js";import{M as l,S as c}from"./useFpNavigator-CCRyr9PR.js";import{E as t}from"./EgenNæringSteg-CZenvOCu.js";const{action:o}=__STORYBOOK_MODULE_ACTIONS__,a=()=>()=>(o("button-click")(),Promise.resolve()),u={title:"steps/EgenNæringSteg",component:t,render:({gåTilNesteSide:n=o("button-click"),...s})=>r.jsx(l,{initialEntries:[c.EGEN_NÆRING],children:r.jsx(i,{onDispatch:n,initialState:{[m.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomSelvstendigNæringsdrivende:!0,harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1}},children:r.jsx(t,{...s})})})},e={args:{mellomlagreSøknadOgNaviger:a(),avbrytSøknad:a(),arbeidsforhold:[]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    arbeidsforhold: []
  }
}`,...e.parameters?.docs?.source}}};const _=["Default"];export{e as Default,_ as __namedExportsOrder,u as default};
