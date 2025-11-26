import{j as e}from"./iframe-CLKvCa0D.js";import{S as i,c as l,C as a}from"./routes-buBlAeEm.js";import{E as o}from"./EgenNæringSteg-og08yLgw.js";import{M as c}from"./useSvpNavigator-BskB-s_a.js";import"./preload-helper-D9Z9MdNV.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,m=()=>()=>(r("button-click")(),Promise.resolve()),b={title:"steps/EgenNæringSteg",component:o,render:({gåTilNesteSide:n=r("button-click"),...s})=>e.jsx(c,{initialEntries:[i.NÆRING],children:e.jsx(l,{onDispatch:n,initialState:{[a.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomSelvstendigNæringsdrivende:!0,harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1},[a.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:e.jsx(o,{...s})})})},t={args:{arbeidsforhold:[],mellomlagreSøknadOgNaviger:m(),avbrytSøknad:()=>r("button-click")}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: () => action('button-click')
  }
}`,...t.parameters?.docs?.source}}};const f=["Default"];export{t as Default,f as __namedExportsOrder,b as default};
