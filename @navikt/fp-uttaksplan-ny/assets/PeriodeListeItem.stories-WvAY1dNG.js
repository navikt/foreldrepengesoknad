import{r as m,f as F,g as v,R as c,o as S,h as k,i as j,k as x,S as U,e as I,j as O}from"./iframe-BQraM7f2.js";import{B as p,P as N,U as C}from"./UttaksplanDataContext-DV0t4HTq.js";import{P as T}from"./PeriodeListeItem-BwhcrKAd.js";import"./preload-helper-PPVm8Dsz.js";import"./dateTomValidators-2NDoIOH_.js";import"./TidsperiodeSpørsmål-BNAB6Zmk.js";import"./validation-DDy9fb4p.js";const D=m.createContext({headingSize:"small",size:"medium",openItems:[],mounted:!1});var w=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const A=m.createContext(null),B=m.forwardRef((n,a)=>{var{children:o,className:e,open:r,defaultOpen:l=!1,onOpenChange:s}=n,d=w(n,["children","className","open","defaultOpen","onOpenChange"]);const[t,f]=F({defaultValue:l,value:r,onChange:s}),i=m.useContext(D),{cn:u}=v(),b=m.useRef(!(r||l)),M=()=>{f(_=>!_),b.current=!0};return i?.mounted||console.error("<Accordion.Item> has to be used within an <Accordion>"),c.createElement("div",Object.assign({className:u("navds-accordion__item",e,{"navds-accordion__item--open":t,"navds-accordion__item--neutral":i?.variant==="neutral","navds-accordion__item--no-animation":!b.current}),"data-expanded":t,ref:a},S(d,["onClick"])),c.createElement(A.Provider,{value:{open:t,toggleOpen:M}},o))});var L=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const K=m.forwardRef((n,a)=>{var{children:o,className:e}=n,r=L(n,["children","className"]);const l=m.useContext(A),s=k(!1),{cn:d}=v();return l===null?(console.error("<Accordion.Content> has to be used within an <Accordion.Item>"),null):c.createElement(j,Object.assign({},r,{as:"div",ref:a,className:d("navds-accordion__content",{"navds-accordion__content--closed":!l.open},e),"aria-hidden":!l.open||void 0}),s?.isDarkside?c.createElement("div",{className:d("navds-accordion__content-inner")},o):o)});var H=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const V=m.forwardRef((n,a)=>{var o,{children:e,className:r,onClick:l}=n,s=H(n,["children","className","onClick"]);const d=m.useContext(A),t=m.useContext(D),f=k(!1),{cn:i}=v();if(d===null)return console.error("<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>"),null;let u=(o=t?.headingSize)!==null&&o!==void 0?o:"small";return f?.isDarkside&&(u=t?.size==="large"?"small":"xsmall"),c.createElement("button",Object.assign({ref:a},s,{className:i("navds-accordion__header",r),onClick:x(l,d.toggleOpen),"aria-expanded":d.open,type:"button"}),c.createElement("span",{className:i("navds-accordion__icon-wrapper")},c.createElement(U,{className:i("navds-accordion__header-chevron"),"aria-hidden":!0})),c.createElement(I,{size:u,as:"span",className:i("navds-accordion__header-content")},e))});var z=function(n,a){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const R=m.forwardRef((n,a)=>{var{className:o,variant:e="default",headingSize:r="small",size:l="medium",indent:s=!0}=n,d=z(n,["className","variant","headingSize","size","indent"]);const{cn:t}=v();return c.createElement(D.Provider,{value:{variant:e,headingSize:r,size:l,mounted:!0}},c.createElement("div",Object.assign({},d,{className:t("navds-accordion",o,`navds-accordion--${l}`,{"navds-accordion--indent":s}),ref:a})))});R.Header=V;R.Content=K;R.Item=B;const G={kontoer:[{konto:"FELLESPERIODE",dager:80},{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}},$=({erFarEllerMedmor:n,erFamiliehendelse:a,permisjonsperiode:o,erAleneOmOmsorg:e,handleAddPeriode:r,handleUpdatePeriode:l,handleDeletePeriode:s,handleDeletePerioder:d,barn:t})=>O.jsx(C,{erFarEllerMedmor:n,barn:t,aleneOmOmsorg:e,modus:"planlegger",navnPåForeldre:{farMedmor:"Far",mor:"Mor"},valgtStønadskonto:G,erMedmorDelAvSøknaden:!0,bareFarMedmorHarRett:!1,harAktivitetskravIPeriodeUtenUttak:!1,erDeltUttak:!0,saksperioder:[],children:O.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:O.jsx(R,{children:O.jsx(T,{handleAddPeriode:r,handleUpdatePeriode:l,handleDeletePeriode:s,handleDeletePerioder:d,erFamiliehendelse:a,permisjonsperiode:o})})})}),ee={title:"components/PeriodeListeItem",component:T,render:$},E={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:p.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:"MOR",perioder:[{erAnnenPartEøs:!1,id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-30",forelder:"MOR",kontoType:"MØDREKVOTE",readOnly:!1}]}}},h={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:p.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:"MOR",perioder:[{erAnnenPartEøs:!1,id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:"MOR",kontoType:"MØDREKVOTE",readOnly:!1},{erAnnenPartEøs:!1,id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:"MOR",kontoType:"FELLESPERIODE",readOnly:!1}]}}},P={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:p.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:"MOR",perioder:[{erAnnenPartEøs:!1,id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",kontoType:"MØDREKVOTE",readOnly:!1},{erAnnenPartEøs:!1,id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:"MOR",kontoType:"FELLESPERIODE",readOnly:!1},{erAnnenPartEøs:!1,id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-29",tom:"2024-08-23",forelder:"MOR",kontoType:"FELLESPERIODE",gradering:{aktivitet:{type:"ORDINÆRT_ARBEID",arbeidsgiver:{id:"1",type:"ORGANISASJON"}},arbeidstidprosent:50},readOnly:!1}]}}},y={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:p.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!0,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-28"},forelder:"FAR_MEDMOR",perioder:[{erAnnenPartEøs:!1,id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE",readOnly:!1}]}}},g={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-08-01"],type:p.FØDT,termindato:"2024-08-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-08-01",permisjonsperiode:{erPeriodeUtenUttak:!0,tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},perioder:[{erAnnenPartEøs:!1,id:"88638814-3912-1440-03308-2381934996836",fom:"2024-08-01",tom:"2024-08-31",readOnly:!1,periodeHullÅrsak:N.PERIODE_UTEN_UTTAK}]}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
        erAnnenPartEøs: false,
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-30',
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
        readOnly: false
      }]
    }
  }
}`,...E.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
        erAnnenPartEøs: false,
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-28',
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
        readOnly: false
      }, {
        erAnnenPartEøs: false,
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-01',
        tom: '2024-07-26',
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        readOnly: false
      }]
    }
  }
}`,...h.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
        erAnnenPartEøs: false,
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-28',
        kontoType: 'MØDREKVOTE',
        readOnly: false
      }, {
        erAnnenPartEøs: false,
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-07-01',
        tom: '2024-07-26',
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        readOnly: false
      }, {
        erAnnenPartEøs: false,
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
}`,...P.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
        erAnnenPartEøs: false,
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-06-01',
        tom: '2024-06-28',
        forelder: 'FAR_MEDMOR',
        kontoType: 'FEDREKVOTE',
        readOnly: false
      }]
    }
  }
}`,...y.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
        erAnnenPartEøs: false,
        id: '88638814-3912-1440-03308-2381934996836',
        fom: '2024-08-01',
        tom: '2024-08-31',
        readOnly: false,
        periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK
      }]
    }
  }
}`,...g.parameters?.docs?.source}}};const ne=["UttaksperiodeMor","UttaksperiodeMorFlerePerioder","UttaksperiodeMorFlerePerioderInkludererGradering","UttaksperiodeFar","PeriodeUtenUttak"];export{g as PeriodeUtenUttak,y as UttaksperiodeFar,E as UttaksperiodeMor,h as UttaksperiodeMorFlerePerioder,P as UttaksperiodeMorFlerePerioderInkludererGradering,ne as __namedExportsOrder,ee as default};
