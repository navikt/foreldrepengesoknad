import{T as z,f,j as m,g as Q}from"./_createSet-DFXqJ-zJ.js";import{d as s,i as X,b as Z,c as $,e as ee,f as te,g as re,h as oe,A as ne,P as v,j as P,k as r,F as d,U as de,a as M}from"./PeriodeListeItem-D5tVpEE_.js";import"./index-RYns6xqu.js";var G=(e=>(e.FØDT="født",e.UFØDT="ufødt",e.ADOPTERT_STEBARN="adoptertStebarn",e.ADOPTERT_ANNET_BARN="adoptertAnnetBarn",e.IKKE_UTFYLT="ikkeUtfylt",e))(G||{});const ae=e=>e.type==="ufødt",ie=e=>e.type==="adoptertStebarn"||e.type==="adoptertAnnetBarn";var a=(e=>(e.Mødrekvote="MØDREKVOTE",e.Fedrekvote="FEDREKVOTE",e.Fellesperiode="FELLESPERIODE",e.Foreldrepenger="FORELDREPENGER",e.ForeldrepengerFørFødsel="FORELDREPENGER_FØR_FØDSEL",e.Flerbarnsdager="FLERBARNSDAGER",e.AktivitetsfriKvote="AKTIVITETSFRI_KVOTE",e))(a||{}),J=(e=>(e.Ferie="LOVBESTEMT_FERIE",e.Arbeid="ARBEID",e.Sykdom="SYKDOM",e.InstitusjonSøker="INSTITUSJONSOPPHOLD_SØKER",e.InstitusjonBarnet="INSTITUSJONSOPPHOLD_BARNET",e.HvØvelse="HV_OVELSE",e.NavTiltak="NAV_TILTAK",e.Fri="FRI",e))(J||{}),Y=(e=>(e.fridag="fridag",e.avslåttPeriode="avslåttPeriode",e))(Y||{});const se=(e,i,n)=>!i||!e?!1:!!(f(e.tidsperiode.tom).isBefore(n)&&f(i.tidsperiode.tom).isBefore(n)),me=(e,i,n)=>!i||!e?!1:!!(f(e.tidsperiode.fom).isSameOrAfter(n)&&f(i.tidsperiode.fom).isSameOrAfter(n)),pe=(e,i,n)=>me(e,i,n)||se(e,i,n),le=(e,i)=>{const n=[];if(e.length===0)return n;let o,p,l=!1;return e.forEach((t,y)=>{const x=y+1;let k;if(l){l=!1;return}x<e.length?k=e[x]:k=void 0;const W=pe(o,t,i);if(k!==void 0&&(l=z(t.tidsperiode).erLik(k.tidsperiode)),l&&k!==void 0){o={perioder:[{...t},{...k}],tidsperiode:{fom:s(t.tidsperiode.fom),tom:s(t.tidsperiode.tom)},samtidigUttak:!0},n.push(o),o=void 0,p=void 0,l=!0;return}if(X(t)||Z(t)||$(t)||ee(t)){const S=t.forelder;o?p===t.forelder&&W?(o.perioder=[...o.perioder,{...t}],o.tidsperiode.tom=s(t.tidsperiode.tom)):o={forelder:S,perioder:[{...t}],tidsperiode:{fom:s(t.tidsperiode.fom),tom:s(t.tidsperiode.tom)}}:o={forelder:S,perioder:[{...t}],tidsperiode:{fom:s(t.tidsperiode.fom),tom:s(t.tidsperiode.tom)}},n.includes(o)||n.push(o),p=t.forelder;return}te(t)&&(o={perioder:[{...t}],tidsperiode:{fom:s(t.tidsperiode.fom),tom:s(t.tidsperiode.tom)},erPeriodeUtenUttak:!0},n.push(o),p=void 0,o=void 0),re(t)&&(o={perioder:[{...t}],tidsperiode:{fom:s(t.tidsperiode.fom),tom:s(t.tidsperiode.tom)},erUtsettelse:!0},n.push(o),p=void 0,o=void 0),oe(t)&&(o={perioder:[{...t}],tidsperiode:{fom:s(t.tidsperiode.fom),tom:s(t.tidsperiode.tom)},erHull:!0},n.push(o),p=void 0,o=void 0)}),n},ke=(e,i)=>e.findIndex(n=>Q(n.tidsperiode)&&f(n.tidsperiode.fom).isSameOrAfter(i,"d")),fe=e=>ae(e)?P.TERM:ie(e)?P.ADOPSJON:P.FØDSEL,c=({perioder:e,familiehendelsedato:i,barn:n})=>{const o=le(e,i),p=ke(o,i),l=fe(n);return m.jsx("div",{children:m.jsx(ne,{children:o.map((t,y)=>m.jsxs(m.Fragment,{children:[p===y?m.jsx(v,{permisjonsperiode:t,familiehendelsedato:i,erFamiliehendelse:!0,familiehendelseType:l}):null,m.jsx(v,{permisjonsperiode:t,familiehendelsedato:i})]}))})})};c.__docgenInfo={description:"",methods:[],displayName:"PeriodeListe",props:{perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},familiehendelsedato:{required:!0,tsType:{name:"string"},description:""},barn:{required:!0,tsType:{name:"union",raw:"FødtBarn | UfødtBarn | AdoptertBarn | AdoptertStebarn | AdoptertAnnetBarn | IkkeUtfyltTypeBarn",elements:[{name:"FødtBarn"},{name:"UfødtBarn"},{name:"AdoptertBarn"},{name:"AdoptertStebarn"},{name:"AdoptertAnnetBarn"},{name:"IkkeUtfyltTypeBarn"}]},description:""}}};const Fe=({perioder:e,familiehendelsedato:i})=>m.jsx(de,{initialState:{[M.ER_FAR_ELLER_MEDMOR]:!0,[M.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:m.jsx("div",{style:{maxWidth:"704px",margin:"1rem auto 4rem"},children:m.jsx(c,{perioder:e,familiehendelsedato:i,barn:{type:G.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]}})})}),ue={title:"components/PeriodeListe",component:c,render:Fe},F={name:"Mor søker",args:{familiehendelsedato:"2024-04-22",perioder:[{id:"1",tidsperiode:{fom:new Date("2024-04-01"),tom:new Date("2024-04-19")},type:r.Uttak,konto:a.ForeldrepengerFørFødsel,forelder:d.mor},{id:"2",tidsperiode:{fom:new Date("2024-04-22"),tom:new Date("2024-05-31")},type:r.Uttak,konto:a.Mødrekvote,forelder:d.mor},{id:"3",tidsperiode:{fom:new Date("2024-06-03"),tom:new Date("2024-06-10")},type:r.PeriodeUtenUttak},{id:"4",tidsperiode:{fom:new Date("2024-06-11"),tom:new Date("2024-06-28")},type:r.Uttak,konto:a.Fellesperiode,forelder:d.mor,ønskerSamtidigUttak:!0,samtidigUttakProsent:"50"},{id:"5",tidsperiode:{fom:new Date("2024-07-01"),tom:new Date("2024-07-02")},type:r.Uttak,konto:a.Fedrekvote,forelder:d.mor},{id:"6",tidsperiode:{fom:new Date("2024-07-03"),tom:new Date("2024-07-10")},type:r.Uttak,konto:a.Mødrekvote,forelder:d.mor,gradert:!0,stillingsprosent:"20"}]}},D={name:"Mor og far med samtidig uttak",args:{familiehendelsedato:"2024-04-22",perioder:[{id:"1",tidsperiode:{fom:new Date("2024-04-01"),tom:new Date("2024-04-19")},type:r.Uttak,konto:a.ForeldrepengerFørFødsel,forelder:d.mor},{id:"2",tidsperiode:{fom:new Date("2024-04-22"),tom:new Date("2024-05-03")},type:r.Uttak,konto:a.Mødrekvote,forelder:d.mor,samtidigUttakProsent:"100"},{id:"3",tidsperiode:{fom:new Date("2024-04-22"),tom:new Date("2024-05-03")},type:r.Uttak,konto:a.Fedrekvote,forelder:d.farMedmor,samtidigUttakProsent:"100"},{id:"4",tidsperiode:{fom:new Date("2024-05-06"),tom:new Date("2024-05-31")},type:r.Uttak,konto:a.Mødrekvote,forelder:d.mor},{id:"5",tidsperiode:{fom:new Date("2024-06-03"),tom:new Date("2024-06-28")},type:r.Uttak,konto:a.Fedrekvote,forelder:d.farMedmor},{id:"6",tidsperiode:{fom:new Date("2024-07-01"),tom:new Date("2024-07-08")},type:r.Uttak,konto:a.Fellesperiode,forelder:d.farMedmor}]}},U={name:"Far søker og mor har ikke rett",args:{familiehendelsedato:"2024-05-01",perioder:[{id:"1",tidsperiode:{fom:new Date("2024-05-01"),tom:new Date("2024-08-21")},type:r.Uttak,konto:a.Foreldrepenger,forelder:d.farMedmor},{id:"2",tidsperiode:{fom:new Date("2024-08-22"),tom:new Date("2024-08-29")},type:r.Uttak,konto:a.AktivitetsfriKvote,forelder:d.farMedmor},{id:"2",tidsperiode:{fom:new Date("2024-08-30"),tom:new Date("2024-09-13")},type:r.PeriodeUtenUttak},{id:"2",tidsperiode:{fom:new Date("2024-09-16"),tom:new Date("2024-09-23")},type:r.Uttak,konto:a.Foreldrepenger,forelder:d.farMedmor,gradert:!0,stillingsprosent:"80"}]}},g={name:"Mor og far med flerbarnsdager og samtidig uttak",args:{familiehendelsedato:"2024-04-22",perioder:[{id:"1",tidsperiode:{fom:new Date("2024-04-01"),tom:new Date("2024-04-19")},type:r.Uttak,konto:a.ForeldrepengerFørFødsel,forelder:d.mor},{id:"2",tidsperiode:{fom:new Date("2024-04-22"),tom:new Date("2024-05-31")},type:r.Uttak,konto:a.Mødrekvote,forelder:d.mor,ønskerFlerbarnsdager:!0,samtidigUttakProsent:"100"},{id:"3",tidsperiode:{fom:new Date("2024-04-22"),tom:new Date("2024-05-31")},type:r.Uttak,konto:a.Fedrekvote,forelder:d.farMedmor,ønskerFlerbarnsdager:!0,samtidigUttakProsent:"100"}]}},u={name:"Mor har ikke lagt inn uttak første seks uker",args:{familiehendelsedato:"2024-04-22",perioder:[{id:"1",tidsperiode:{fom:new Date("2024-04-01"),tom:new Date("2024-04-19")},type:r.Uttak,konto:a.ForeldrepengerFørFødsel,forelder:d.mor},{id:"2",tidsperiode:{fom:new Date("2024-04-22"),tom:new Date("2024-05-31")},type:r.Hull,årsak:Y.fridag},{id:"3",tidsperiode:{fom:new Date("2024-06-03"),tom:new Date("2024-06-28")},type:r.Uttak,konto:a.Mødrekvote,forelder:d.mor}]}},w={name:"Mor er innlagt første seks uker",args:{familiehendelsedato:"2024-04-22",perioder:[{id:"1",tidsperiode:{fom:new Date("2024-04-01"),tom:new Date("2024-04-19")},type:r.Uttak,konto:a.ForeldrepengerFørFødsel,forelder:d.mor},{id:"2",tidsperiode:{fom:new Date("2024-04-22"),tom:new Date("2024-05-31")},type:r.Utsettelse,årsak:J.InstitusjonSøker,erArbeidstaker:!0,forelder:d.mor},{id:"3",tidsperiode:{fom:new Date("2024-06-03"),tom:new Date("2024-06-28")},type:r.Uttak,konto:a.Mødrekvote,forelder:d.mor}]}};var E,T,A;F.parameters={...F.parameters,docs:{...(E=F.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: 'Mor søker',
  args: {
    familiehendelsedato: '2024-04-22',
    perioder: [{
      id: '1',
      tidsperiode: {
        fom: new Date('2024-04-01'),
        tom: new Date('2024-04-19')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-04-22'),
        tom: new Date('2024-05-31')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor
    }, {
      id: '3',
      tidsperiode: {
        fom: new Date('2024-06-03'),
        tom: new Date('2024-06-10')
      },
      type: Periodetype.PeriodeUtenUttak
    }, {
      id: '4',
      tidsperiode: {
        fom: new Date('2024-06-11'),
        tom: new Date('2024-06-28')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Fellesperiode,
      forelder: Forelder.mor,
      ønskerSamtidigUttak: true,
      samtidigUttakProsent: '50'
    }, {
      id: '5',
      tidsperiode: {
        fom: new Date('2024-07-01'),
        tom: new Date('2024-07-02')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Fedrekvote,
      forelder: Forelder.mor
    }, {
      id: '6',
      tidsperiode: {
        fom: new Date('2024-07-03'),
        tom: new Date('2024-07-10')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      gradert: true,
      stillingsprosent: '20'
    }]
  }
}`,...(A=(T=F.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};var h,O,I;D.parameters={...D.parameters,docs:{...(h=D.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: 'Mor og far med samtidig uttak',
  args: {
    familiehendelsedato: '2024-04-22',
    perioder: [{
      id: '1',
      tidsperiode: {
        fom: new Date('2024-04-01'),
        tom: new Date('2024-04-19')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-04-22'),
        tom: new Date('2024-05-03')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      samtidigUttakProsent: '100'
    }, {
      id: '3',
      tidsperiode: {
        fom: new Date('2024-04-22'),
        tom: new Date('2024-05-03')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor,
      samtidigUttakProsent: '100'
    }, {
      id: '4',
      tidsperiode: {
        fom: new Date('2024-05-06'),
        tom: new Date('2024-05-31')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor
    }, {
      id: '5',
      tidsperiode: {
        fom: new Date('2024-06-03'),
        tom: new Date('2024-06-28')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor
    }, {
      id: '6',
      tidsperiode: {
        fom: new Date('2024-07-01'),
        tom: new Date('2024-07-08')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Fellesperiode,
      forelder: Forelder.farMedmor
    }]
  }
}`,...(I=(O=D.parameters)==null?void 0:O.docs)==null?void 0:I.source}}};var R,B,_;U.parameters={...U.parameters,docs:{...(R=U.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: 'Far søker og mor har ikke rett',
  args: {
    familiehendelsedato: '2024-05-01',
    perioder: [{
      id: '1',
      tidsperiode: {
        fom: new Date('2024-05-01'),
        tom: new Date('2024-08-21')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Foreldrepenger,
      forelder: Forelder.farMedmor
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-08-22'),
        tom: new Date('2024-08-29')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.AktivitetsfriKvote,
      forelder: Forelder.farMedmor
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-08-30'),
        tom: new Date('2024-09-13')
      },
      type: Periodetype.PeriodeUtenUttak
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-09-16'),
        tom: new Date('2024-09-23')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Foreldrepenger,
      forelder: Forelder.farMedmor,
      gradert: true,
      stillingsprosent: '80'
    }]
  }
}`,...(_=(B=U.parameters)==null?void 0:B.docs)==null?void 0:_.source}}};var b,L,j;g.parameters={...g.parameters,docs:{...(b=g.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: 'Mor og far med flerbarnsdager og samtidig uttak',
  args: {
    familiehendelsedato: '2024-04-22',
    perioder: [{
      id: '1',
      tidsperiode: {
        fom: new Date('2024-04-01'),
        tom: new Date('2024-04-19')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-04-22'),
        tom: new Date('2024-05-31')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      ønskerFlerbarnsdager: true,
      samtidigUttakProsent: '100'
    }, {
      id: '3',
      tidsperiode: {
        fom: new Date('2024-04-22'),
        tom: new Date('2024-05-31')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor,
      ønskerFlerbarnsdager: true,
      samtidigUttakProsent: '100'
    }]
  }
}`,...(j=(L=g.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};var N,K,H;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: 'Mor har ikke lagt inn uttak første seks uker',
  args: {
    familiehendelsedato: '2024-04-22',
    perioder: [{
      id: '1',
      tidsperiode: {
        fom: new Date('2024-04-01'),
        tom: new Date('2024-04-19')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-04-22'),
        tom: new Date('2024-05-31')
      },
      type: Periodetype.Hull,
      årsak: PeriodeHullÅrsak.fridag
    }, {
      id: '3',
      tidsperiode: {
        fom: new Date('2024-06-03'),
        tom: new Date('2024-06-28')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor
    }]
  }
}`,...(H=(K=u.parameters)==null?void 0:K.docs)==null?void 0:H.source}}};var V,C,q;w.parameters={...w.parameters,docs:{...(V=w.parameters)==null?void 0:V.docs,source:{originalSource:`{
  name: 'Mor er innlagt første seks uker',
  args: {
    familiehendelsedato: '2024-04-22',
    perioder: [{
      id: '1',
      tidsperiode: {
        fom: new Date('2024-04-01'),
        tom: new Date('2024-04-19')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor
    }, {
      id: '2',
      tidsperiode: {
        fom: new Date('2024-04-22'),
        tom: new Date('2024-05-31')
      },
      type: Periodetype.Utsettelse,
      årsak: UtsettelseÅrsakType.InstitusjonSøker,
      erArbeidstaker: true,
      forelder: Forelder.mor
    }, {
      id: '3',
      tidsperiode: {
        fom: new Date('2024-06-03'),
        tom: new Date('2024-06-28')
      },
      type: Periodetype.Uttak,
      konto: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor
    }]
  }
}`,...(q=(C=w.parameters)==null?void 0:C.docs)==null?void 0:q.source}}};const we=["UttaksperioderMor","UttaksperioderMorOgFar","UttaksperioderFarMorIkkeRett","UttaksperioderMorOgFarFlerbarnsdager","UttaksperioderMorIkkeSøktFørsteSeksUker","UttaksperioderMorInnlagtFørsteSeksUker"];export{U as UttaksperioderFarMorIkkeRett,F as UttaksperioderMor,u as UttaksperioderMorIkkeSøktFørsteSeksUker,w as UttaksperioderMorInnlagtFørsteSeksUker,D as UttaksperioderMorOgFar,g as UttaksperioderMorOgFarFlerbarnsdager,we as __namedExportsOrder,ue as default};
