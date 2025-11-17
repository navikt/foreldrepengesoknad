import{r as m,d as F,a as v,R as c,o as S,b as T,B as j,n as x,S as U,m as I,j as O}from"./iframe-uy_qZoVa.js";import{B as f,P as N,U as C}from"./UttaksplanDataContext-B60H4GM0.js";import{P as M}from"./PeriodeListeItem-Cx_fzZTn.js";import"./preload-helper-D9Z9MdNV.js";import"./dateTomValidators-B4MOht28.js";import"./TidsperiodeSpørsmål-ZfD_iAUf.js";import"./validation-CiNihW6F.js";const D=m.createContext({headingSize:"small",size:"medium",openItems:[],mounted:!1});var w=function(n,t){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&t.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const b=m.createContext(null),B=m.forwardRef((n,t)=>{var{children:o,className:e,open:r,defaultOpen:d=!1,onOpenChange:i}=n,l=w(n,["children","className","open","defaultOpen","onOpenChange"]);const[a,p]=F({defaultValue:d,value:r,onChange:i}),s=m.useContext(D),{cn:u}=v(),k=m.useRef(!(r||d)),_=()=>{p(A=>!A),k.current=!0};return s?.mounted||console.error("<Accordion.Item> has to be used within an <Accordion>"),c.createElement("div",Object.assign({className:u("navds-accordion__item",e,{"navds-accordion__item--open":a,"navds-accordion__item--neutral":s?.variant==="neutral","navds-accordion__item--no-animation":!k.current}),"data-expanded":a,ref:t},S(l,["onClick"])),c.createElement(b.Provider,{value:{open:a,toggleOpen:_}},o))});var L=function(n,t){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&t.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const K=m.forwardRef((n,t)=>{var{children:o,className:e}=n,r=L(n,["children","className"]);const d=m.useContext(b),i=T(!1),{cn:l}=v();return d===null?(console.error("<Accordion.Content> has to be used within an <Accordion.Item>"),null):c.createElement(j,Object.assign({},r,{as:"div",ref:t,className:l("navds-accordion__content",{"navds-accordion__content--closed":!d.open},e),"aria-hidden":!d.open||void 0}),i?.isDarkside?c.createElement("div",{className:l("navds-accordion__content-inner")},o):o)});var H=function(n,t){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&t.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const V=m.forwardRef((n,t)=>{var o,{children:e,className:r,onClick:d}=n,i=H(n,["children","className","onClick"]);const l=m.useContext(b),a=m.useContext(D),p=T(!1),{cn:s}=v();if(l===null)return console.error("<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>"),null;let u=(o=a?.headingSize)!==null&&o!==void 0?o:"small";return p?.isDarkside&&(u=a?.size==="small"?"xsmall":"small"),c.createElement("button",Object.assign({ref:t},i,{className:s("navds-accordion__header",r),onClick:x(d,l.toggleOpen),"aria-expanded":l.open,type:"button"}),c.createElement("span",{className:s("navds-accordion__icon-wrapper")},c.createElement(U,{className:s("navds-accordion__header-chevron"),"aria-hidden":!0})),c.createElement(I,{size:u,as:"span",className:s("navds-accordion__header-content")},e))});var z=function(n,t){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&t.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(o[e[r]]=n[e[r]]);return o};const R=m.forwardRef((n,t)=>{var{className:o,variant:e="default",headingSize:r="small",size:d="medium",indent:i=!0}=n,l=z(n,["className","variant","headingSize","size","indent"]);const{cn:a}=v();return c.createElement(D.Provider,{value:{variant:e,headingSize:r,size:d,mounted:!0}},c.createElement("div",Object.assign({},l,{className:a("navds-accordion",o,`navds-accordion--${d}`,{"navds-accordion--indent":i}),ref:t})))});R.Header=V;R.Content=K;R.Item=B;const G={kontoer:[{konto:"FELLESPERIODE",dager:80},{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}},$=({erFarEllerMedmor:n,erFamiliehendelse:t,permisjonsperiode:o,erAleneOmOmsorg:e,handleAddPeriode:r,handleUpdatePeriode:d,handleDeletePeriode:i,handleDeletePerioder:l,barn:a})=>O.jsx(C,{erFarEllerMedmor:n,barn:a,aleneOmOmsorg:e,modus:"planlegger",navnPåForeldre:{farMedmor:"Far",mor:"Mor"},valgtStønadskonto:G,erMedmorDelAvSøknaden:!0,bareFarMedmorHarRett:!1,harAktivitetskravIPeriodeUtenUttak:!1,erDeltUttak:!0,saksperioder:[],children:O.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:O.jsx(R,{children:O.jsx(M,{handleAddPeriode:r,handleUpdatePeriode:d,handleDeletePeriode:i,handleDeletePerioder:l,erFamiliehendelse:t,permisjonsperiode:o})})})}),ee={title:"components/PeriodeListeItem",component:M,render:$},h={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:f.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-30"},forelder:"MOR",perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-30",forelder:"MOR",kontoType:"MØDREKVOTE",readOnly:!1}]}}},E={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:f.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:"MOR",perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:"MOR",kontoType:"MØDREKVOTE",readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:"MOR",kontoType:"FELLESPERIODE",readOnly:!1}]}}},y={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:f.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-07-26"},forelder:"MOR",perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",kontoType:"MØDREKVOTE",readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-01",tom:"2024-07-26",forelder:"MOR",kontoType:"FELLESPERIODE",readOnly:!1},{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-07-29",tom:"2024-08-23",forelder:"MOR",kontoType:"FELLESPERIODE",gradering:{aktivitet:{type:"ORDINÆRT_ARBEID",arbeidsgiver:{id:"1",type:"ORGANISASJON"}},arbeidstidprosent:50},readOnly:!1}]}}},P={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-06-01"],type:f.FØDT,termindato:"2024-06-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!0,familiehendelsedato:"2024-06-01",permisjonsperiode:{tidsperiode:{fom:"2024-06-01",tom:"2024-06-28"},forelder:"FAR_MEDMOR",perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-06-01",tom:"2024-06-28",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE",readOnly:!1}]}}},g={args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,barn:{antallBarn:1,fødselsdatoer:["2024-08-01"],type:f.FØDT,termindato:"2024-08-01"},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2024-08-01",permisjonsperiode:{erPeriodeUtenUttak:!0,tidsperiode:{fom:"2024-08-01",tom:"2024-08-31"},perioder:[{id:"88638814-3912-1440-03308-2381934996836",fom:"2024-08-01",tom:"2024-08-31",readOnly:!1,periodeHullÅrsak:N.PERIODE_UTEN_UTTAK}]}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};const ne=["UttaksperiodeMor","UttaksperiodeMorFlerePerioder","UttaksperiodeMorFlerePerioderInkludererGradering","UttaksperiodeFar","PeriodeUtenUttak"];export{g as PeriodeUtenUttak,P as UttaksperiodeFar,h as UttaksperiodeMor,E as UttaksperiodeMorFlerePerioder,y as UttaksperiodeMorFlerePerioderInkludererGradering,ne as __namedExportsOrder,ee as default};
