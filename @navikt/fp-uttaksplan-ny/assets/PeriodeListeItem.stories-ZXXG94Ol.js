import{j as n}from"./_createSet-C5YXYpiT.js";import{P as j,F as e,a as r,S as o,b as R,U as v,c as m,A as T}from"./PeriodeListeItem-CeCUePZN.js";import"./index-RYns6xqu.js";var E=(t=>(t.arbeidstaker="ARBEIDSTAKER",t.frilans="FRILANS",t.selvstendignæringsdrivende="SELVSTENDIG_NÆRINGSDRIVENDE",t))(E||{});const _=({permisjonsperiode:t})=>n.jsx(v,{initialState:{[m.ER_FAR_ELLER_MEDMOR]:!0,[m.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:n.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:n.jsx(T,{children:n.jsx(j,{permisjonsperiode:t,familiehendelsedato:"2024-06-01"})})})}),A={title:"components/PeriodeListeItem",component:j,render:_},d={args:{permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-30")},forelder:e.mor,konto:o.Mødrekvote}]}}},i={args:{permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-28")},forelder:e.mor,konto:o.Mødrekvote},{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-07-01"),tom:new Date("2024-07-26")},forelder:e.mor,konto:o.Fellesperiode}]}}},a={args:{permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-28")},forelder:e.mor,konto:o.Mødrekvote},{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-07-01"),tom:new Date("2024-07-26")},forelder:e.mor,konto:o.Fellesperiode},{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-07-29"),tom:new Date("2024-08-23")},forelder:e.mor,konto:o.Fellesperiode,gradert:!0,arbeidsformer:[E.arbeidstaker],stillingsprosent:"50"}]}}},s={args:{permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-28"},forelder:e.farMedmor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-28")},forelder:e.farMedmor,konto:o.Fedrekvote}]}}},p={args:{permisjonsperiode:{erPeriodeUtenUttak:!0,tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Hull,tidsperiode:{fom:new Date("2024-08-01"),tom:new Date("2024-08-31")},årsak:R.fridag}]}}};var l,k,f;d.parameters={...d.parameters,docs:{...(l=d.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(f=(k=d.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};var c,F,D;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(D=(F=i.parameters)==null?void 0:F.docs)==null?void 0:D.source}}};var y,U,w;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        type: Periodetype.Uttak,
        tidsperiode: {
          fom: new Date('2024-07-29'),
          tom: new Date('2024-08-23')
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
        gradert: true,
        arbeidsformer: [Arbeidsform.arbeidstaker],
        stillingsprosent: '50'
      }]
    }
  }
}`,...(w=(U=a.parameters)==null?void 0:U.docs)==null?void 0:w.source}}};var u,g,x;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(x=(g=s.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var P,M,S;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(S=(M=p.parameters)==null?void 0:M.docs)==null?void 0:S.source}}};const b=["UttaksperiodeMor","UttaksperiodeMorFlerePerioder","UttaksperiodeMorFlerePerioderInkludererGradering","UttaksperiodeFar","PeriodeUtenUttak"];export{p as PeriodeUtenUttak,s as UttaksperiodeFar,d as UttaksperiodeMor,i as UttaksperiodeMorFlerePerioder,a as UttaksperiodeMorFlerePerioderInkludererGradering,b as __namedExportsOrder,A as default};
