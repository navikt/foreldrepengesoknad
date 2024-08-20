import{j as o}from"./_createSet-DFXqJ-zJ.js";import{P as p,F as c,U as f,a as t}from"./PeriodeListeItem-D5tVpEE_.js";import"./index-RYns6xqu.js";const u=({permisjonsperiode:l})=>o.jsx(f,{initialState:{[t.ER_FAR_ELLER_MEDMOR]:!0,[t.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:o.jsx("div",{style:{maxWidth:"704px",margin:"1rem auto 4rem"},children:o.jsx(p,{permisjonsperiode:l,familiehendelsedato:"2024-06-01"})})}),E={title:"components/PeriodeListeItem",component:p,render:u},e={args:{permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:c.mor,perioder:[]}}},r={args:{permisjonsperiode:{tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},forelder:c.farMedmor,perioder:[]}}};var s,a,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-06-30'
      },
      forelder: Forelder.mor,
      perioder: []
    }
  }
}`,...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};var d,i,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-08-01',
        tom: '2024-08-31'
      },
      forelder: Forelder.farMedmor,
      perioder: []
    }
  }
}`,...(m=(i=r.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const R=["Uttaksperiode","PeriodeUtenUttak"];export{r as PeriodeUtenUttak,e as Uttaksperiode,R as __namedExportsOrder,E as default};
