import{o as n}from"./index-jBo6h7uD.js";import{P as E,F as e,a as r,S as o,b as v,U as x,c as m,A as T}from"./PeriodeListeItem-DK7gqrK6.js";import"./index-DJO9vBfz.js";var R=(t=>(t.arbeidstaker="ARBEIDSTAKER",t.frilans="FRILANS",t.selvstendignæringsdrivende="SELVSTENDIG_NÆRINGSDRIVENDE",t))(R||{});const _=({permisjonsperiode:t})=>n.jsx(x,{initialState:{[m.ER_FAR_ELLER_MEDMOR]:!0,[m.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:n.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:n.jsx(T,{children:n.jsx(E,{permisjonsperiode:t,familiehendelsedato:"2024-06-01"})})})}),A={title:"components/PeriodeListeItem",component:E,render:_},d={args:{permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-30")},forelder:e.mor,konto:o.Mødrekvote}]}}},i={args:{permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-28")},forelder:e.mor,konto:o.Mødrekvote},{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-07-01"),tom:new Date("2024-07-26")},forelder:e.mor,konto:o.Fellesperiode}]}}},a={args:{permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:e.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-28")},forelder:e.mor,konto:o.Mødrekvote},{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-07-01"),tom:new Date("2024-07-26")},forelder:e.mor,konto:o.Fellesperiode},{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-07-29"),tom:new Date("2024-08-23")},forelder:e.mor,konto:o.Fellesperiode,gradert:!0,arbeidsformer:[R.arbeidstaker],stillingsprosent:"50"}]}}},s={args:{permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-28"},forelder:e.farMedmor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Uttak,tidsperiode:{fom:new Date("2024-06-01"),tom:new Date("2024-06-28")},forelder:e.farMedmor,konto:o.Fedrekvote}]}}},p={args:{permisjonsperiode:{erPeriodeUtenUttak:!0,tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},perioder:[{id:"88638814-3912-1440-03308-2381934996836",type:r.Hull,tidsperiode:{fom:new Date("2024-08-01"),tom:new Date("2024-08-31")},årsak:v.fridag}]}}};var l,k,f;d.parameters={...d.parameters,docs:{...(l=d.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(f=(k=d.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};var c,D,y;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(y=(D=i.parameters)==null?void 0:D.docs)==null?void 0:y.source}}};var U,w,u;a.parameters={...a.parameters,docs:{...(U=a.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(u=(w=a.parameters)==null?void 0:w.docs)==null?void 0:u.source}}};var F,g,P;s.parameters={...s.parameters,docs:{...(F=s.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(P=(g=s.parameters)==null?void 0:g.docs)==null?void 0:P.source}}};var M,S,j;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(j=(S=p.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};const b=["UttaksperiodeMor","UttaksperiodeMorFlerePerioder","UttaksperiodeMorFlerePerioderInkludererGradering","UttaksperiodeFar","PeriodeUtenUttak"];export{p as PeriodeUtenUttak,s as UttaksperiodeFar,d as UttaksperiodeMor,i as UttaksperiodeMorFlerePerioder,a as UttaksperiodeMorFlerePerioderInkludererGradering,b as __namedExportsOrder,A as default};
