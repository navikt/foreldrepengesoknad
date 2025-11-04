import{r as m,d as S,a as R,R as c,o as x,b as A,B as j,p as I,S as U,n as N,j as h}from"./iframe-q9sff2B2.js";import{P as T,B as u}from"./PeriodeListeItem-Bq0nACvE.js";import{c as C,U as w,a as f}from"./TidsperiodeSpørsmål-CDxZH77I.js";import"./preload-helper-D9Z9MdNV.js";const _=m.createContext({headingSize:"small",size:"medium",openItems:[],mounted:!1});var B=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const b=m.createContext(null),L=m.forwardRef((n,a)=>{var{children:o,className:e,open:r,defaultOpen:d=!1,onOpenChange:i}=n,l=B(n,["children","className","open","defaultOpen","onOpenChange"]);const[t,p]=S({defaultValue:d,value:r,onChange:i}),s=m.useContext(_),{cn:O}=R(),M=m.useRef(!(r||d)),F=()=>{p(k=>!k),M.current=!0};return s?.mounted||console.error("<Accordion.Item> has to be used within an <Accordion>"),c.createElement("div",Object.assign({className:O("navds-accordion__item",e,{"navds-accordion__item--open":t,"navds-accordion__item--neutral":s?.variant==="neutral","navds-accordion__item--no-animation":!M.current}),"data-expanded":t,ref:a},x(l,["onClick"])),c.createElement(b.Provider,{value:{open:t,toggleOpen:F}},o))});var z=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const H=m.forwardRef((n,a)=>{var{children:o,className:e}=n,r=z(n,["children","className"]);const d=m.useContext(b),i=A(!1),{cn:l}=R();return d===null?(console.error("<Accordion.Content> has to be used within an <Accordion.Item>"),null):c.createElement(j,Object.assign({},r,{as:"div",ref:a,className:l("navds-accordion__content",{"navds-accordion__content--closed":!d.open},e),"aria-hidden":!d.open||void 0}),i?.isDarkside?c.createElement("div",{className:l("navds-accordion__content-inner")},o):o)});var K=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const V=m.forwardRef((n,a)=>{var o,{children:e,className:r,onClick:d}=n,i=K(n,["children","className","onClick"]);const l=m.useContext(b),t=m.useContext(_),p=A(!1),{cn:s}=R();if(l===null)return console.error("<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>"),null;let O=(o=t?.headingSize)!==null&&o!==void 0?o:"small";return p?.isDarkside&&(O=t?.size==="small"?"xsmall":"small"),c.createElement("button",Object.assign({ref:a},i,{className:s("navds-accordion__header",r),onClick:I(d,l.toggleOpen),"aria-expanded":l.open,type:"button"}),c.createElement("span",{className:s("navds-accordion__icon-wrapper")},c.createElement(U,{className:s("navds-accordion__header-chevron"),"aria-hidden":!0})),c.createElement(N,{size:O,as:"span",className:s("navds-accordion__header-content")},e))});var G=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const D=m.forwardRef((n,a)=>{var{className:o,variant:e="default",headingSize:r="small",size:d="medium",indent:i=!0}=n,l=G(n,["className","variant","headingSize","size","indent"]);const{cn:t}=R();return c.createElement(_.Provider,{value:{variant:e,headingSize:r,size:d,mounted:!0}},c.createElement("div",Object.assign({},l,{className:t("navds-accordion",o,`navds-accordion--${d}`,{"navds-accordion--indent":i}),ref:a})))});D.Header=V;D.Content=H;D.Item=L;const $=({erFarEllerMedmor:n,erFamiliehendelse:a,permisjonsperiode:o,familiehendelsedato:e,erAleneOmOmsorg:r,handleAddPeriode:d,handleUpdatePeriode:i,handleDeletePeriode:l,handleDeletePerioder:t,barn:p})=>h.jsx(w,{initialState:{[f.ER_FAR_ELLER_MEDMOR]:n,[f.BARN]:p,[f.FAMILIEHENDELSEDATO]:e,[f.FAMILIESITUASJON]:"fødsel",[f.ALENE_OM_OMSORG]:r,[f.MODUS]:"planlegger",[f.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:h.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:h.jsx(D,{children:h.jsx(T,{handleAddPeriode:d,handleUpdatePeriode:i,handleDeletePeriode:l,handleDeletePerioder:t,erFamiliehendelse:a,permisjonsperiode:o})})})}),X={title:"components/PeriodeListeItem",component:T,render:$},E={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:u.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:"MOR",perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-30",forelder:"MOR",kontoType:"MØDREKVOTE",readOnly:!1}]}}},y={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:u.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:"MOR",perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:"MOR",kontoType:"MØDREKVOTE",readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:"MOR",kontoType:"FELLESPERIODE",readOnly:!1}]}}},P={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:u.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:"MOR",perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",kontoType:"MØDREKVOTE",readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:"MOR",kontoType:"FELLESPERIODE",readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-29",tom:"2024-08-23",forelder:"MOR",kontoType:"FELLESPERIODE",gradering:{aktivitet:{type:"ORDINÆRT_ARBEID",arbeidsgiver:{id:"1",type:"ORGANISASJON"}},arbeidstidprosent:50},readOnly:!1}]}}},v={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:u.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!0,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-28"},forelder:"FAR_MEDMOR",perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE",readOnly:!1}]}}},g={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-08-01"],type:u.FØDT,termindato:"2024-08-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-08-01",permisjonsperiode:{erPeriodeUtenUttak:!0,tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-08-01",tom:"2024-08-31",readOnly:!1,periodeHullÅrsak:C.PERIODE_UTEN_UTTAK}]}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
              id: '1',
              type: 'ORGANISASJON'
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
}`,...g.parameters?.docs?.source}}};const Y=["UttaksperiodeMor","UttaksperiodeMorFlerePerioder","UttaksperiodeMorFlerePerioderInkludererGradering","UttaksperiodeFar","PeriodeUtenUttak"];export{g as PeriodeUtenUttak,v as UttaksperiodeFar,E as UttaksperiodeMor,y as UttaksperiodeMorFlerePerioder,P as UttaksperiodeMorFlerePerioderInkludererGradering,Y as __namedExportsOrder,X as default};
