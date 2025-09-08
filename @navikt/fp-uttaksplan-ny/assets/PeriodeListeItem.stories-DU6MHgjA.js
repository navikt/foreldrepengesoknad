import{r as i,c as M,a as A,R as m,o as I,d as D,B as N,t as R,S as C,s as w,l as v}from"./iframe-lLcTmg4I.js";import{P as x,F as c,B as O}from"./PeriodeListeItem-CnmarwPo.js";import{S as u,U as B,g as z,a as H,b as f}from"./TidsperiodeSpørsmål-CyjUvlYs.js";import{A as L}from"./ArbeidsgiverInfoType-An3cd7W6.js";import"./preload-helper-D9Z9MdNV.js";const _=i.createContext({headingSize:"small",size:"medium",openItems:[],mounted:!1});var G=function(n,t){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&t.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const F=i.createContext(null),$=i.forwardRef((n,t)=>{var{children:o,className:e,open:r,defaultOpen:d=!1,onOpenChange:p}=n,l=G(n,["children","className","open","defaultOpen","onOpenChange"]);const[a,y]=M({defaultValue:d,value:r,onChange:p}),s=i.useContext(_),{cn:h}=A(),S=i.useRef(!(r||d)),U=()=>{y(j=>!j),S.current=!0};return s?.mounted||console.error("<Accordion.Item> has to be used within an <Accordion>"),m.createElement("div",Object.assign({className:h("navds-accordion__item",e,{"navds-accordion__item--open":a,"navds-accordion__item--neutral":s?.variant==="neutral","navds-accordion__item--no-animation":!S.current}),"data-expanded":a,ref:t},I(l,["onClick"])),m.createElement(F.Provider,{value:{open:a,toggleOpen:U}},o))});var J=function(n,t){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&t.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const K=i.forwardRef((n,t)=>{var{children:o,className:e}=n,r=J(n,["children","className"]);const d=i.useContext(F),p=D(!1),{cn:l}=A();return d===null?(console.error("<Accordion.Content> has to be used within an <Accordion.Item>"),null):m.createElement(N,Object.assign({},r,{as:"div",ref:t,className:l("navds-accordion__content",{"navds-accordion__content--closed":!d.open},e),"aria-hidden":!d.open||void 0}),p?m.createElement("div",{className:l("navds-accordion__content-inner")},o):o)});var V=function(n,t){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&t.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const Y=i.forwardRef((n,t)=>{var o,{children:e,className:r,onClick:d}=n,p=V(n,["children","className","onClick"]);const l=i.useContext(F),a=i.useContext(_),y=D(!1),{cn:s}=A();if(l===null)return console.error("<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>"),null;let h=(o=a?.headingSize)!==null&&o!==void 0?o:"small";return y&&(h=a?.size==="small"?"xsmall":"small"),m.createElement("button",Object.assign({ref:t},p,{className:s("navds-accordion__header",r),onClick:R(d,l.toggleOpen),"aria-expanded":l.open,type:"button"}),m.createElement("span",{className:s("navds-accordion__icon-wrapper")},m.createElement(C,{className:s("navds-accordion__header-chevron"),"aria-hidden":!0})),m.createElement(w,{size:h,as:"span",className:s("navds-accordion__header-content")},e))});var W=function(n,t){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&t.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const E=i.forwardRef((n,t)=>{var{className:o,variant:e="default",headingSize:r="small",size:d="medium",indent:p=!0}=n,l=W(n,["className","variant","headingSize","size","indent"]);const{cn:a}=A();return m.createElement(_.Provider,{value:{variant:e,headingSize:r,size:d,mounted:!0}},m.createElement("div",Object.assign({},l,{className:a("navds-accordion",o,`navds-accordion--${d}`,{"navds-accordion--indent":p}),ref:t})))});E.Header=Y;E.Content=K;E.Item=$;const q=({erFarEllerMedmor:n,erFamiliehendelse:t,permisjonsperiode:o,familiehendelsedato:e,erAleneOmOmsorg:r,handleAddPeriode:d,handleUpdatePeriode:p,handleDeletePeriode:l,handleDeletePerioder:a,barn:y})=>v.jsx(H,{initialState:{[f.ER_FAR_ELLER_MEDMOR]:n,[f.BARN]:y,[f.FAMILIEHENDELSEDATO]:e,[f.FAMILIESITUASJON]:"fødsel",[f.ALENE_OM_OMSORG]:r,[f.MODUS]:"planlegger",[f.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:v.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:v.jsx(E,{children:v.jsx(x,{handleAddPeriode:d,handleUpdatePeriode:p,handleDeletePeriode:l,handleDeletePerioder:a,erFamiliehendelse:t,permisjonsperiode:o})})})}),re={title:"components/PeriodeListeItem",component:x,render:q},g={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:O.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:c.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-30",forelder:c.mor,kontoType:u.Mødrekvote,readOnly:!1}]}}},P={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:O.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:c.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:c.mor,kontoType:u.Mødrekvote,readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:c.mor,kontoType:u.Fellesperiode,readOnly:!1}]}}},T={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:O.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:c.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",kontoType:u.Mødrekvote,readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:c.mor,kontoType:u.Fellesperiode,readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-29",tom:"2024-08-23",forelder:c.mor,kontoType:u.Fellesperiode,gradering:{aktivitet:{type:B.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:L.ORGANISASJON}},arbeidstidprosent:50},readOnly:!1}]}}},b={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:O.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!0,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-28"},forelder:c.farMedmor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:c.farMedmor,kontoType:u.Fedrekvote,readOnly:!1}]}}},k={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-08-01"],type:O.FØDT,termindato:"2024-08-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-08-01",permisjonsperiode:{erPeriodeUtenUttak:!0,tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-08-01",tom:"2024-08-31",readOnly:!1,periodeHullÅrsak:z.PERIODE_UTEN_UTTAK}]}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    handleAddPeriode: () => null,
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
    barn: {
      antallBarn: 1,
      fødselsdatoer: ['2024-06-01'],
      type: BarnType.FØDT,
      termindato: '2024-06-01'
    },
    erAleneOmOmsorg: false,
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-06-01',
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-06-30'
      },
      forelder: Forelder.mor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-30',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Mødrekvote,
        readOnly: false
      }]
    }
  }
}`,...g.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    handleAddPeriode: () => null,
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
    barn: {
      antallBarn: 1,
      fødselsdatoer: ['2024-06-01'],
      type: BarnType.FØDT,
      termindato: '2024-06-01'
    },
    erAleneOmOmsorg: false,
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-06-01',
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-07-26'
      },
      forelder: Forelder.mor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-28',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Mødrekvote,
        readOnly: false
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-01',
        tom: '2024-07-26',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        readOnly: false
      }]
    }
  }
}`,...P.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    handleAddPeriode: () => null,
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
    barn: {
      antallBarn: 1,
      fødselsdatoer: ['2024-06-01'],
      type: BarnType.FØDT,
      termindato: '2024-06-01'
    },
    erAleneOmOmsorg: false,
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-06-01',
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-07-26'
      },
      forelder: Forelder.mor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-28',
        kontoType: StønadskontoType.Mødrekvote,
        readOnly: false
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-01',
        tom: '2024-07-26',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        readOnly: false
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-29',
        tom: '2024-08-23',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        gradering: {
          aktivitet: {
            type: UttakArbeidType.ORDINÆRT_ARBEID,
            arbeidsgiver: {
              id: '1',
              navn: 'TESTY TEST',
              type: ArbeidsgiverInfoType.ORGANISASJON
            }
          },
          arbeidstidprosent: 50
        },
        readOnly: false
      }]
    }
  }
}`,...T.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    handleAddPeriode: () => null,
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
    barn: {
      antallBarn: 1,
      fødselsdatoer: ['2024-06-01'],
      type: BarnType.FØDT,
      termindato: '2024-06-01'
    },
    erAleneOmOmsorg: false,
    erFarEllerMedmor: true,
    familiehendelsedato: '2024-06-01',
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-06-28'
      },
      forelder: Forelder.farMedmor,
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-28',
        forelder: Forelder.farMedmor,
        kontoType: StønadskontoType.Fedrekvote,
        readOnly: false
      }]
    }
  }
}`,...b.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    handleAddPeriode: () => null,
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
    barn: {
      antallBarn: 1,
      fødselsdatoer: ['2024-08-01'],
      type: BarnType.FØDT,
      termindato: '2024-08-01'
    },
    erAleneOmOmsorg: false,
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-08-01',
    permisjonsperiode: {
      erPeriodeUtenUttak: true,
      tidsperiode: {
        fom: '2024-08-01',
        tom: '2024-08-31'
      },
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-08-01',
        tom: '2024-08-31',
        readOnly: false,
        periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK
      }]
    }
  }
}`,...k.parameters?.docs?.source}}};const oe=["UttaksperiodeMor","UttaksperiodeMorFlerePerioder","UttaksperiodeMorFlerePerioderInkludererGradering","UttaksperiodeFar","PeriodeUtenUttak"];export{k as PeriodeUtenUttak,b as UttaksperiodeFar,g as UttaksperiodeMor,P as UttaksperiodeMorFlerePerioder,T as UttaksperiodeMorFlerePerioderInkludererGradering,oe as __namedExportsOrder,re as default};
