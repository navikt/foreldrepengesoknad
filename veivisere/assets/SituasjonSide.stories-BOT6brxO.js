import{j as t}from"./tslib.es6-D_L490Ab.js";import{i as m,M as p,F as u}from"./useVeiviserNavigator-D0esO-EZ.js";import{a as i}from"./SituasjonSide-B45mVb7w.js";import"./index-CTjT7uj6.js";import"./Infobox-KszxaRaJ.js";import"./Link-C68dz1QV.js";import"./index-BRV0Se7Z.js";import"./TextField-Djl2Qs_9.js";import"./useScrollBehaviour-BdI_sZf3.js";import"./currencyUtils-0adIj7Qw.js";import"./VeiviserPage-CLzlUu1p.js";import"./Calendar-BTqLh_b9.js";import"./BlueRadioGroup-B8pr08JQ.js";import"./Wallet-C2zPzk5G.js";import"./BabyWrapped-Bx8t1--1.js";const l={engangstønad:[{fom:"01.01.2023",verdi:92648}],grunnbeløp:[{fom:"01.05.2024",verdi:124028}]},_={title:"fpEllerEs/SituasjonSide",component:i},r={render:({satser:n=l,setFpEllerEsSituasjon:a=()=>{}})=>(m(),t.jsx(p,{initialEntries:[u.SITUASJON],children:t.jsx(i,{satser:n,setFpEllerEsSituasjon:a})}))};var e,o,s;r.parameters={...r.parameters,docs:{...(e=r.parameters)==null?void 0:e.docs,source:{originalSource:`{
  render: ({
    satser = DEFAULT_SATSER,
    setFpEllerEsSituasjon = () => undefined
  }) => {
    initAmplitude();
    return <MemoryRouter initialEntries={[FpEllerEsRoutes.SITUASJON]}>
                <SituasjonSide satser={satser} setFpEllerEsSituasjon={setFpEllerEsSituasjon} />
            </MemoryRouter>;
  }
}`,...(s=(o=r.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const v=["Default"];export{r as Default,v as __namedExportsOrder,_ as default};
