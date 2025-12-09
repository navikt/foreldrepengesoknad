import{l as e}from"./iframe-Cflr_egb.js";import{F as s,C as i}from"./FpDataContext-aHYB_q0x.js";import{M as l,S as c}from"./useFpNavigator-TrowrSvL.js";import{A as o}from"./AndreInntektskilderSteg-gNBOQZ-7.js";import"./preload-helper-PPVm8Dsz.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,d=()=>()=>(r("button-click")(),Promise.resolve()),g={title:"steps/AndreInntektskilderSteg",component:o,render:({gåTilNesteSide:a=r("button-click"),...n})=>e.jsx(l,{initialEntries:[c.ANDRE_INNTEKTER],children:e.jsx(s,{onDispatch:a,initialState:{[i.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1,harHattAndreInntektskilder:!0}},children:e.jsx(o,{...n})})})},t={args:{mellomlagreSøknadOgNaviger:d(),avbrytSøknad:()=>r("button-click"),arbeidsforhold:[]}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: () => action('button-click'),
    arbeidsforhold: []
  }
}`,...t.parameters?.docs?.source}}};const b=["Default"];export{t as Default,b as __namedExportsOrder,g as default};
