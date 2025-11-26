import{l as e}from"./iframe-Bt6msiSf.js";import{F as s,C as i}from"./FpDataContext-BJAUCuI4.js";import{M as l,S as c}from"./useFpNavigator-C5DK1E9e.js";import{A as o}from"./AndreInntektskilderSteg-CxavXjno.js";import"./preload-helper-D9Z9MdNV.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,d=()=>()=>(r("button-click")(),Promise.resolve()),g={title:"steps/AndreInntektskilderSteg",component:o,render:({gåTilNesteSide:a=r("button-click"),...n})=>e.jsx(l,{initialEntries:[c.ANDRE_INNTEKTER],children:e.jsx(s,{onDispatch:a,initialState:{[i.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1,harHattAndreInntektskilder:!0}},children:e.jsx(o,{...n})})})},t={args:{mellomlagreSøknadOgNaviger:d(),avbrytSøknad:()=>r("button-click"),arbeidsforhold:[]}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: () => action('button-click'),
    arbeidsforhold: []
  }
}`,...t.parameters?.docs?.source}}};const b=["Default"];export{t as Default,b as __namedExportsOrder,g as default};
