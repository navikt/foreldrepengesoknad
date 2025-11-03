import{r as m,d as I,a as b,R as c,o as U,b as k,B as j,p as M,S as N,n as C,j as y}from"./iframe-CEGyY0Uc.js";import{F as p}from"./Forelder-NrmuaHZ4.js";import{k as S,B as O}from"./PeriodeListeItem-BtQy1Vmx.js";import{A as w}from"./ArbeidsgiverInfoType-An3cd7W6.js";import{U as B,d as L,a as z,b as u}from"./TidsperiodeSpørsmål-CdO67uir.js";import"./preload-helper-D9Z9MdNV.js";const A=m.createContext({headingSize:"small",size:"medium",openItems:[],mounted:!1});var H=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const _=m.createContext(null),K=m.forwardRef((n,a)=>{var{children:o,className:e,open:r,defaultOpen:d=!1,onOpenChange:i}=n,l=H(n,["children","className","open","defaultOpen","onOpenChange"]);const[t,f]=I({defaultValue:d,value:r,onChange:i}),s=m.useContext(A),{cn:h}=b(),F=m.useRef(!(r||d)),R=()=>{f(x=>!x),F.current=!0};return s?.mounted||console.error("<Accordion.Item> has to be used within an <Accordion>"),c.createElement("div",Object.assign({className:h("navds-accordion__item",e,{"navds-accordion__item--open":t,"navds-accordion__item--neutral":s?.variant==="neutral","navds-accordion__item--no-animation":!F.current}),"data-expanded":t,ref:a},U(l,["onClick"])),c.createElement(_.Provider,{value:{open:t,toggleOpen:R}},o))});var V=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const G=m.forwardRef((n,a)=>{var{children:o,className:e}=n,r=V(n,["children","className"]);const d=m.useContext(_),i=k(!1),{cn:l}=b();return d===null?(console.error("<Accordion.Content> has to be used within an <Accordion.Item>"),null):c.createElement(j,Object.assign({},r,{as:"div",ref:a,className:l("navds-accordion__content",{"navds-accordion__content--closed":!d.open},e),"aria-hidden":!d.open||void 0}),i?.isDarkside?c.createElement("div",{className:l("navds-accordion__content-inner")},o):o)});var $=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const J=m.forwardRef((n,a)=>{var o,{children:e,className:r,onClick:d}=n,i=$(n,["children","className","onClick"]);const l=m.useContext(_),t=m.useContext(A),f=k(!1),{cn:s}=b();if(l===null)return console.error("<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>"),null;let h=(o=t?.headingSize)!==null&&o!==void 0?o:"small";return f?.isDarkside&&(h=t?.size==="small"?"xsmall":"small"),c.createElement("button",Object.assign({ref:a},i,{className:s("navds-accordion__header",r),onClick:M(d,l.toggleOpen),"aria-expanded":l.open,type:"button"}),c.createElement("span",{className:s("navds-accordion__icon-wrapper")},c.createElement(N,{className:s("navds-accordion__header-chevron"),"aria-hidden":!0})),c.createElement(C,{size:h,as:"span",className:s("navds-accordion__header-content")},e))});var Y=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const D=m.forwardRef((n,a)=>{var{className:o,variant:e="default",headingSize:r="small",size:d="medium",indent:i=!0}=n,l=Y(n,["className","variant","headingSize","size","indent"]);const{cn:t}=b();return c.createElement(A.Provider,{value:{variant:e,headingSize:r,size:d,mounted:!0}},c.createElement("div",Object.assign({},l,{className:t("navds-accordion",o,`navds-accordion--${d}`,{"navds-accordion--indent":i}),ref:a})))});D.Header=J;D.Content=G;D.Item=K;const W=({erFarEllerMedmor:n,erFamiliehendelse:a,permisjonsperiode:o,familiehendelsedato:e,erAleneOmOmsorg:r,handleAddPeriode:d,handleUpdatePeriode:i,handleDeletePeriode:l,handleDeletePerioder:t,barn:f})=>y.jsx(z,{initialState:{[u.ER_FAR_ELLER_MEDMOR]:n,[u.BARN]:f,[u.FAMILIEHENDELSEDATO]:e,[u.FAMILIESITUASJON]:"fødsel",[u.ALENE_OM_OMSORG]:r,[u.MODUS]:"planlegger",[u.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:y.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:y.jsx(D,{children:y.jsx(S,{handleAddPeriode:d,handleUpdatePeriode:i,handleDeletePeriode:l,handleDeletePerioder:t,erFamiliehendelse:a,permisjonsperiode:o})})})}),re={title:"components/PeriodeListeItem",component:S,render:W},E={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:O.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:p.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-30",forelder:p.mor,kontoType:"MØDREKVOTE",readOnly:!1}]}}},P={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:O.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:p.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:p.mor,kontoType:"MØDREKVOTE",readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:p.mor,kontoType:"FELLESPERIODE",readOnly:!1}]}}},v={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:O.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:p.mor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",kontoType:"MØDREKVOTE",readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:p.mor,kontoType:"FELLESPERIODE",readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-29",tom:"2024-08-23",forelder:p.mor,kontoType:"FELLESPERIODE",gradering:{aktivitet:{type:B.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:w.ORGANISASJON}},arbeidstidprosent:50},readOnly:!1}]}}},g={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:O.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!0,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-28"},forelder:p.farMedmor,perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:p.farMedmor,kontoType:"FEDREKVOTE",readOnly:!1}]}}},T={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-08-01"],type:O.FØDT,termindato:"2024-08-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-08-01",permisjonsperiode:{erPeriodeUtenUttak:!0,tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-08-01",tom:"2024-08-31",readOnly:!1,periodeHullÅrsak:L.PERIODE_UTEN_UTTAK}]}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
        kontoType: 'MØDREKVOTE',
        readOnly: false
      }]
    }
  }
}`,...E.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
        kontoType: 'MØDREKVOTE',
        readOnly: false
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-01',
        tom: '2024-07-26',
        forelder: Forelder.mor,
        kontoType: 'FELLESPERIODE',
        readOnly: false
      }]
    }
  }
}`,...P.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
        kontoType: 'MØDREKVOTE',
        readOnly: false
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-01',
        tom: '2024-07-26',
        forelder: Forelder.mor,
        kontoType: 'FELLESPERIODE',
        readOnly: false
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-29',
        tom: '2024-08-23',
        forelder: Forelder.mor,
        kontoType: 'FELLESPERIODE',
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
}`,...v.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
        kontoType: 'FEDREKVOTE',
        readOnly: false
      }]
    }
  }
}`,...g.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}};const oe=["UttaksperiodeMor","UttaksperiodeMorFlerePerioder","UttaksperiodeMorFlerePerioderInkludererGradering","UttaksperiodeFar","PeriodeUtenUttak"];export{T as PeriodeUtenUttak,g as UttaksperiodeFar,E as UttaksperiodeMor,P as UttaksperiodeMorFlerePerioder,v as UttaksperiodeMorFlerePerioderInkludererGradering,oe as __namedExportsOrder,re as default};
