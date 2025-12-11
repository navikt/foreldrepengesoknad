import{l as e}from"./iframe-CYRyeYZG.js";import{F as s,C as i}from"./FpDataContext-5I4LczUc.js";import{M as l,S as c}from"./useFpNavigator-BE7lOU3L.js";import{E as o}from"./EgenNæringSteg-D4zT5vmy.js";import"./preload-helper-PPVm8Dsz.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,m=()=>()=>(r("button-click")(),Promise.resolve()),_={title:"steps/EgenNæringSteg",component:o,render:({gåTilNesteSide:a=r("button-click"),...n})=>e.jsx(l,{initialEntries:[c.EGEN_NÆRING],children:e.jsx(s,{onDispatch:a,initialState:{[i.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomSelvstendigNæringsdrivende:!0,harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1}},children:e.jsx(o,{...n})})})},t={args:{mellomlagreSøknadOgNaviger:m(),avbrytSøknad:()=>r("button-click"),arbeidsforhold:[]}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: () => action('button-click'),
    arbeidsforhold: []
  }
}`,...t.parameters?.docs?.source}}};const b=["Default"];export{t as Default,b as __namedExportsOrder,_ as default};
