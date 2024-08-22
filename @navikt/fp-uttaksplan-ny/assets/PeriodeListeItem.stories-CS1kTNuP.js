import{j as o}from"./_createSet-C5YXYpiT.js";import{P as x,F as e,a as r,S as s,b as M,U as g,c as i,A as j}from"./PeriodeListeItem-zcCFh_5c.js";import"./index-RYns6xqu.js";const S=({permisjonsperiode:P})=>o.jsx(g,{initialState:{[i.ER_FAR_ELLER_MEDMOR]:!0,[i.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:o.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:o.jsx(j,{children:o.jsx(x,{permisjonsperiode:P,familiehendelsedato:"2024-06-01"})})})}),v={title:"components/PeriodeListeItem",component:x,render:S},t={args:{permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-30")},forelder:e.mor,konto:s.Mødrekvote}]}}},n={args:{permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-28")},forelder:e.mor,konto:s.Mødrekvote},{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-07-01"),tom:new Date("2024-07-26")},forelder:e.mor,konto:s.Fellesperiode}]}}},d={args:{permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-28"},forelder:e.farMedmor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-28")},forelder:e.farMedmor,konto:s.Fedrekvote}]}}},a={args:{permisjonsperiode:{erPeriodeUtenUttak:!0,tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Hull,tidsperiode:{fom:new Date("2024-08-01"),tom:new Date("2024-08-31")},årsak:M.fridag}]}}};var p,m,l;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-06-30'
      },
      forelder: Forelder.mor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        type: Periodetype.Uttak,
        tidsperiode: {
          fom: new Date('2024-06-01'),
          tom: new Date('2024-06-30')
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote
      }]
    }
  }
}`,...(l=(m=t.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var f,k,c;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-07-26'
      },
      forelder: Forelder.mor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        type: Periodetype.Uttak,
        tidsperiode: {
          fom: new Date('2024-06-01'),
          tom: new Date('2024-06-28')
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        type: Periodetype.Uttak,
        tidsperiode: {
          fom: new Date('2024-07-01'),
          tom: new Date('2024-07-26')
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode
      }]
    }
  }
}`,...(c=(k=n.parameters)==null?void 0:k.docs)==null?void 0:c.source}}};var F,U,D;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-06-28'
      },
      forelder: Forelder.farMedmor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        type: Periodetype.Uttak,
        tidsperiode: {
          fom: new Date('2024-06-01'),
          tom: new Date('2024-06-28')
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.Fedrekvote
      }]
    }
  }
}`,...(D=(U=d.parameters)==null?void 0:U.docs)==null?void 0:D.source}}};var u,y,w;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    permisjonsperiode: {
      erPeriodeUtenUttak: true,
      tidsperiode: {
        fom: '2024-08-01',
        tom: '2024-08-31'
      },
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        type: Periodetype.Hull,
        tidsperiode: {
          fom: new Date('2024-08-01'),
          tom: new Date('2024-08-31')
        },
        årsak: PeriodeHullÅrsak.fridag
      }]
    }
  }
}`,...(w=(y=a.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};const T=["UttaksperiodeMor","UttaksperiodeMorFlerePerioder","UttaksperiodeFar","PeriodeUtenUttak"];export{a as PeriodeUtenUttak,d as UttaksperiodeFar,t as UttaksperiodeMor,n as UttaksperiodeMorFlerePerioder,T as __namedExportsOrder,v as default};
