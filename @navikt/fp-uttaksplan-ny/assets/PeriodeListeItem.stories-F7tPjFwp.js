import{r as m,d as S,a as R,R as c,o as x,b as _,B as I,p as U,S as j,n as N,j as h}from"./iframe-E9iq-gRa.js";import{P as M,B as u}from"./PeriodeListeItem-CLoFJl4D.js";import{A as C}from"./ArbeidsgiverInfoType-An3cd7W6.js";import{U as w,d as B,a as L,b as f}from"./TidsperiodeSpørsmål-CWQlTv5X.js";import"./preload-helper-D9Z9MdNV.js";const b=m.createContext({headingSize:"small",size:"medium",openItems:[],mounted:!1});var z=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const A=m.createContext(null),H=m.forwardRef((n,a)=>{var{children:o,className:e,open:r,defaultOpen:d=!1,onOpenChange:i}=n,l=z(n,["children","className","open","defaultOpen","onOpenChange"]);const[t,p]=S({defaultValue:d,value:r,onChange:i}),s=m.useContext(b),{cn:O}=R(),T=m.useRef(!(r||d)),F=()=>{p(k=>!k),T.current=!0};return s?.mounted||console.error("<Accordion.Item> has to be used within an <Accordion>"),c.createElement("div",Object.assign({className:O("navds-accordion__item",e,{"navds-accordion__item--open":t,"navds-accordion__item--neutral":s?.variant==="neutral","navds-accordion__item--no-animation":!T.current}),"data-expanded":t,ref:a},x(l,["onClick"])),c.createElement(A.Provider,{value:{open:t,toggleOpen:F}},o))});var K=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const V=m.forwardRef((n,a)=>{var{children:o,className:e}=n,r=K(n,["children","className"]);const d=m.useContext(A),i=_(!1),{cn:l}=R();return d===null?(console.error("<Accordion.Content> has to be used within an <Accordion.Item>"),null):c.createElement(I,Object.assign({},r,{as:"div",ref:a,className:l("navds-accordion__content",{"navds-accordion__content--closed":!d.open},e),"aria-hidden":!d.open||void 0}),i?.isDarkside?c.createElement("div",{className:l("navds-accordion__content-inner")},o):o)});var G=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const $=m.forwardRef((n,a)=>{var o,{children:e,className:r,onClick:d}=n,i=G(n,["children","className","onClick"]);const l=m.useContext(A),t=m.useContext(b),p=_(!1),{cn:s}=R();if(l===null)return console.error("<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>"),null;let O=(o=t?.headingSize)!==null&&o!==void 0?o:"small";return p?.isDarkside&&(O=t?.size==="small"?"xsmall":"small"),c.createElement("button",Object.assign({ref:a},i,{className:s("navds-accordion__header",r),onClick:U(d,l.toggleOpen),"aria-expanded":l.open,type:"button"}),c.createElement("span",{className:s("navds-accordion__icon-wrapper")},c.createElement(j,{className:s("navds-accordion__header-chevron"),"aria-hidden":!0})),c.createElement(N,{size:O,as:"span",className:s("navds-accordion__header-content")},e))});var J=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const D=m.forwardRef((n,a)=>{var{className:o,variant:e="default",headingSize:r="small",size:d="medium",indent:i=!0}=n,l=J(n,["className","variant","headingSize","size","indent"]);const{cn:t}=R();return c.createElement(b.Provider,{value:{variant:e,headingSize:r,size:d,mounted:!0}},c.createElement("div",Object.assign({},l,{className:t("navds-accordion",o,`navds-accordion--${d}`,{"navds-accordion--indent":i}),ref:a})))});D.Header=$;D.Content=V;D.Item=H;const W=({erFarEllerMedmor:n,erFamiliehendelse:a,permisjonsperiode:o,familiehendelsedato:e,erAleneOmOmsorg:r,handleAddPeriode:d,handleUpdatePeriode:i,handleDeletePeriode:l,handleDeletePerioder:t,barn:p})=>h.jsx(L,{initialState:{[f.ER_FAR_ELLER_MEDMOR]:n,[f.BARN]:p,[f.FAMILIEHENDELSEDATO]:e,[f.FAMILIESITUASJON]:"fødsel",[f.ALENE_OM_OMSORG]:r,[f.MODUS]:"planlegger",[f.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:h.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:h.jsx(D,{children:h.jsx(M,{handleAddPeriode:d,handleUpdatePeriode:i,handleDeletePeriode:l,handleDeletePerioder:t,erFamiliehendelse:a,permisjonsperiode:o})})})}),ee={title:"components/PeriodeListeItem",component:M,render:W},y={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:u.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:"MOR",perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-30",forelder:"MOR",kontoType:"MØDREKVOTE",readOnly:!1}]}}},E={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:u.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:"MOR",perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:"MOR",kontoType:"MØDREKVOTE",readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:"MOR",kontoType:"FELLESPERIODE",readOnly:!1}]}}},P={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:u.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:"MOR",perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",kontoType:"MØDREKVOTE",readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:"MOR",kontoType:"FELLESPERIODE",readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-29",tom:"2024-08-23",forelder:"MOR",kontoType:"FELLESPERIODE",gradering:{aktivitet:{type:w.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",type:C.ORGANISASJON}},arbeidstidprosent:50},readOnly:!1}]}}},v={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:u.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!0,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-28"},forelder:"FAR_MEDMOR",perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE",readOnly:!1}]}}},g={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-08-01"],type:u.FØDT,termindato:"2024-08-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-08-01",permisjonsperiode:{erPeriodeUtenUttak:!0,tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-08-01",tom:"2024-08-31",readOnly:!1,periodeHullÅrsak:B.PERIODE_UTEN_UTTAK}]}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
      forelder: 'MOR',
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-30',
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
        readOnly: false
      }]
    }
  }
}`,...y.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
      forelder: 'MOR',
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-28',
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
        readOnly: false
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-01',
        tom: '2024-07-26',
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
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
      forelder: 'MOR',
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
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        readOnly: false
      }, {
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-29',
        tom: '2024-08-23',
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        gradering: {
          aktivitet: {
            type: UttakArbeidType.ORDINÆRT_ARBEID,
            arbeidsgiver: {
              id: '1',
              type: ArbeidsgiverInfoType.ORGANISASJON
            }
          },
          arbeidstidprosent: 50
        },
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
    erFarEllerMedmor: true,
    familiehendelsedato: '2024-06-01',
    permisjonsperiode: {
      tidsperiode: {
        fom: '2024-06-01',
        tom: '2024-06-28'
      },
      forelder: 'FAR_MEDMOR',
      perioder: [{
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-28',
        forelder: 'FAR_MEDMOR',
        kontoType: 'FEDREKVOTE',
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
}`,...g.parameters?.docs?.source}}};const ne=["UttaksperiodeMor","UttaksperiodeMorFlerePerioder","UttaksperiodeMorFlerePerioderInkludererGradering","UttaksperiodeFar","PeriodeUtenUttak"];export{g as PeriodeUtenUttak,v as UttaksperiodeFar,y as UttaksperiodeMor,E as UttaksperiodeMorFlerePerioder,P as UttaksperiodeMorFlerePerioderInkludererGradering,ne as __namedExportsOrder,ee as default};
