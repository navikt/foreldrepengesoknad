import{l as r}from"./iframe-DKz9hZwM.js";import{F as s,C as i}from"./FpDataContext-BLgiPrVx.js";import{M as l,S as c}from"./useFpNavigator-DHOvKUin.js";import{F as a}from"./FrilansSteg-BbY5JRX0.js";import"./preload-helper-D9Z9MdNV.js";const{action:e}=__STORYBOOK_MODULE_ACTIONS__,m=()=>()=>(e("button-click")(),Promise.resolve()),b={title:"steps/FrilansSteg",component:a,render:({gåTilNesteSide:o=e("button-click"),...n})=>r.jsx(l,{initialEntries:[c.FRILANS],children:r.jsx(s,{onDispatch:o,initialState:{[i.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!1,harHattAndreInntektskilder:!1}},children:r.jsx(a,{...n})})})},t={args:{mellomlagreSøknadOgNaviger:m(),avbrytSøknad:()=>e("button-click"),arbeidsforhold:[]}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: () => action('button-click'),
    arbeidsforhold: []
  }
}`,...t.parameters?.docs?.source}}};const f=["Default"];export{t as Default,f as __namedExportsOrder,b as default};
