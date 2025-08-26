import{r as i,c as M,a as k,R as m,o as I,d as D,B as N,y as R,S as C,w,l as h}from"./iframe-DzPuuaWY.js";import{P as x,F as c,B as y}from"./PeriodeListeItem-wJrgHasm.js";import{S as u,U as B,P as z,a as H,b as f}from"./TidsperiodeSpørsmål-W0GvlJQR.js";import{A as L}from"./ArbeidsgiverInfoType-An3cd7W6.js";import"./preload-helper-D9Z9MdNV.js";const F=i.createContext({headingSize:"small",size:"medium",openItems:[],mounted:!1});var G=function(n,t){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&t.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const S=i.createContext(null),$=i.forwardRef((n,t)=>{var{children:o,className:e,open:r,defaultOpen:d=!1,onOpenChange:p}=n,l=G(n,["children","className","open","defaultOpen","onOpenChange"]);const[a,_]=M({defaultValue:d,value:r,onChange:p}),s=i.useContext(F),{cn:O}=k(),A=i.useRef(!(r||d)),U=()=>{_(j=>!j),A.current=!0};return s?.mounted||console.error("<Accordion.Item> has to be used within an <Accordion>"),m.createElement("div",Object.assign({className:O("navds-accordion__item",e,{"navds-accordion__item--open":a,"navds-accordion__item--neutral":s?.variant==="neutral","navds-accordion__item--no-animation":!A.current}),"data-expanded":a,ref:t},I(l,["onClick"])),m.createElement(S.Provider,{value:{open:a,toggleOpen:U}},o))});var J=function(n,t){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&t.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const K=i.forwardRef((n,t)=>{var{children:o,className:e}=n,r=J(n,["children","className"]);const d=i.useContext(S),p=D(!1),{cn:l}=k();return d===null?(console.error("<Accordion.Content> has to be used within an <Accordion.Item>"),null):m.createElement(N,Object.assign({},r,{as:"div",ref:t,className:l("navds-accordion__content",{"navds-accordion__content--closed":!d.open},e),"aria-hidden":!d.open||void 0}),p?m.createElement("div",{className:l("navds-accordion__content-inner")},o):o)});var V=function(n,t){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&t.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const Y=i.forwardRef((n,t)=>{var o,{children:e,className:r,onClick:d}=n,p=V(n,["children","className","onClick"]);const l=i.useContext(S),a=i.useContext(F),_=D(!1),{cn:s}=k();if(l===null)return console.error("<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>"),null;let O=(o=a?.headingSize)!==null&&o!==void 0?o:"small";return _&&(O=a?.size==="small"?"xsmall":"small"),m.createElement("button",Object.assign({ref:t},p,{className:s("navds-accordion__header",r),onClick:R(d,l.toggleOpen),"aria-expanded":l.open,type:"button"}),m.createElement("span",{className:s("navds-accordion__icon-wrapper")},m.createElement(C,{className:s("navds-accordion__header-chevron"),"aria-hidden":!0})),m.createElement(w,{size:O,as:"span",className:s("navds-accordion__header-content")},e))});var W=function(n,t){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&t.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const E=i.forwardRef((n,t)=>{var{className:o,variant:e="default",headingSize:r="small",size:d="medium",indent:p=!0}=n,l=W(n,["className","variant","headingSize","size","indent"]);const{cn:a}=k();return m.createElement(F.Provider,{value:{variant:e,headingSize:r,size:d,mounted:!0}},m.createElement("div",Object.assign({},l,{className:a("navds-accordion",o,`navds-accordion--${d}`,{"navds-accordion--indent":p}),ref:t})))});E.Header=Y;E.Content=K;E.Item=$;const q=({erFarEllerMedmor:n,erFamiliehendelse:t,permisjonsperiode:o,familiehendelsedato:e,erAleneOmOmsorg:r,handleUpdatePeriode:d,handleDeletePeriode:p,handleDeletePerioder:l,barn:a})=>h.jsx(H,{initialState:{[f.ER_FAR_ELLER_MEDMOR]:n,[f.BARN]:a,[f.FAMILIEHENDELSEDATO]:e,[f.FAMILIESITUASJON]:"fødsel",[f.ALENE_OM_OMSORG]:r,[f.MODUS]:"planlegger",[f.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:h.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:h.jsx(E,{children:h.jsx(x,{handleUpdatePeriode:d,handleDeletePeriode:p,handleDeletePerioder:l,erFamiliehendelse:t,permisjonsperiode:o})})})}),re={title:"components/PeriodeListeItem",component:x,render:q},v={args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:y.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:c.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-30",forelder:c.mor,kontoType:u.Mødrekvote,readOnly:!1}]}}},g={args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:y.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:c.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:c.mor,kontoType:u.Mødrekvote,readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:c.mor,kontoType:u.Fellesperiode,readOnly:!1}]}}},T={args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:y.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:c.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",kontoType:u.Mødrekvote,readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:c.mor,kontoType:u.Fellesperiode,readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-29",tom:"2024-08-23",forelder:c.mor,kontoType:u.Fellesperiode,gradering:{aktivitet:{type:B.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:L.ORGANISASJON}},arbeidstidprosent:50},readOnly:!1}]}}},P={args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:y.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!0,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-28"},forelder:c.farMedmor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:c.farMedmor,kontoType:u.Fedrekvote,readOnly:!1}]}}},b={args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-08-01"],type:y.FØDT,termindato:"2024-08-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-08-01",permisjonsperiode:{erPeriodeUtenUttak:!0,tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-08-01",tom:"2024-08-31",readOnly:!1,periodeHullÅrsak:z.PERIODE_UTEN_UTTAK}]}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
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
}`,...v.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
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
}`,...g.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
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
}`,...T.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
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
}`,...P.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
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
}`,...b.parameters?.docs?.source}}};const oe=["UttaksperiodeMor","UttaksperiodeMorFlerePerioder","UttaksperiodeMorFlerePerioderInkludererGradering","UttaksperiodeFar","PeriodeUtenUttak"];export{b as PeriodeUtenUttak,P as UttaksperiodeFar,v as UttaksperiodeMor,g as UttaksperiodeMorFlerePerioder,T as UttaksperiodeMorFlerePerioderInkludererGradering,oe as __namedExportsOrder,re as default};
