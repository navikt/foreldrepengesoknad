import{j as r}from"./iframe-IkPTTmJd.js";import{S as d,c as m,C as t}from"./routes-6rTD9hWv.js";import{A as a}from"./ArbeidIUtlandetSteg-xKd3MGxP.js";import{M as l}from"./useSvpNavigator-CjpeLAg3.js";import"./preload-helper-D9Z9MdNV.js";import"./ArbeidIUtlandet-BK3pFOD4.js";import"./validationUtils-D7pOxVDd.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,o=()=>()=>(s("button-click")(),Promise.resolve()),c=[{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",from:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],_={title:"steps/ArbeidIUtlandetSteg",component:a,render:({gåTilNesteSide:n=s("button-click"),...i})=>r.jsx(l,{initialEntries:[d.ARBEID_I_UTLANDET],children:r.jsx(m,{onDispatch:n,initialState:{[t.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[t.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:r.jsx(a,{...i})})})},e={args:{arbeidsforhold:c,mellomlagreSøknadOgNaviger:o(),avbrytSøknad:o()}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction()
  }
}`,...e.parameters?.docs?.source}}};const u=["Default"];export{e as Default,u as __namedExportsOrder,_ as default};
