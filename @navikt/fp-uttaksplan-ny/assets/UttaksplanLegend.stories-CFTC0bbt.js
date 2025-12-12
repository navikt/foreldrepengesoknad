import{j as o}from"./iframe-Cqjle6a9.js";import{B as a,U as s}from"./UttaksplanDataContext-oykLc5so.js";import{U as n}from"./UttaksplanLegend-DmQ6ThFW.js";import"./preload-helper-PPVm8Dsz.js";import"./validation-BzwUFDHf.js";import"./dateFormValidation-Bq8CS3Hz.js";import"./permisjonsperiodeUtils-PUbuM9Ml.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,m={farRundtFødsel:10,toTette:0},O={title:"UttaksplanLegend",component:n,args:{modus:"søknad",valgtStønadskonto:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:m},aleneOmOmsorg:!1,erMedmorDelAvSøknaden:!1,navnPåForeldre:{mor:"Hanne",farMedmor:"Hans"},children:null,selectLegend:l("select-legend"),skjulTekstSomDefault:!1},render:e=>o.jsx(s,{barn:e.barn,erFarEllerMedmor:e.erFarEllerMedmor,navnPåForeldre:e.navnPåForeldre,modus:e.modus,valgtStønadskonto:e.valgtStønadskonto,aleneOmOmsorg:e.aleneOmOmsorg||!1,erMedmorDelAvSøknaden:e.erMedmorDelAvSøknaden||!1,bareFarMedmorHarRett:e.bareFarMedmorHarRett||!1,harAktivitetskravIPeriodeUtenUttak:!1,erDeltUttak:e.erDeltUttak||!1,saksperioder:e.saksperioder,children:o.jsx(n,{perioderForKalendervisning:e.perioderForKalendervisning,selectLegend:e.selectLegend,readOnly:e.readOnly,skjulTekstSomDefault:e.skjulTekstSomDefault})})},t={args:{perioderForKalendervisning:[{fom:"2024-03-14",tom:"2024-04-03",color:"PINK",srText:"Termindato"},{fom:"2024-04-04",tom:"2024-04-18",color:"BLUE",srText:"Mors del"},{fom:"2024-05-17",tom:"2024-05-23",color:"GREEN",srText:"Fars del"},{fom:"2024-05-31",tom:"2024-06-13",color:"LIGHTGREENBLUE",srText:"Samtidig uttak"},{fom:"2024-04-19",tom:"2024-05-15",color:"BLACK",srText:"Tapte dager"},{fom:"2024-06-14",tom:"2024-06-27",color:"BLACK",srText:"Tapte dager"},{fom:"2024-06-28",tom:"2024-07-02",color:"GREENOUTLINE",srText:"Mors del, gradert"},{fom:"2024-06-28",tom:"2024-07-02",color:"BLUEOUTLINE",srText:"Utsettelse"},{fom:"2024-07-03",tom:"2024-07-15",color:"GREENSTRIPED",srText:"Fars del, aktivitetsfri"}],saksperioder:[{fom:"2024-04-04",tom:"2024-04-18",forelder:"MOR",kontoType:"MØDREKVOTE"},{fom:"2024-05-17",tom:"2024-05-23",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE"},{fom:"2024-05-31",tom:"2024-06-13",kontoType:"FELLESPERIODE",forelder:"MOR",samtidigUttak:50},{fom:"2024-05-31",tom:"2024-06-13",kontoType:"FELLESPERIODE",forelder:"FAR_MEDMOR",samtidigUttak:50},{fom:"2024-06-28",tom:"2024-07-02",forelder:"MOR",kontoType:"MØDREKVOTE",gradering:{arbeidstidprosent:80,aktivitet:{type:"ANNET"}}},{fom:"2024-06-28",tom:"2024-07-02",forelder:"FAR_MEDMOR",utsettelseÅrsak:"LOVBESTEMT_FERIE"},{fom:"2024-07-03",tom:"2024-07-15",forelder:"FAR_MEDMOR",morsAktivitet:"IKKE_OPPGITT",kontoType:"FORELDREPENGER"}],barn:{type:a.FØDT,fødselsdatoer:["2024-04-04"],antallBarn:1},erDeltUttak:!0,erFarEllerMedmor:!1,harAktivitetskravIPeriodeUtenUttak:!1,bareFarMedmorHarRett:!1,readOnly:!1}},r={args:{...t.args,skjulTekstSomDefault:!0,readOnly:!0}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    perioderForKalendervisning: [{
      fom: '2024-03-14',
      tom: '2024-04-03',
      color: 'PINK',
      srText: 'Termindato'
    }, {
      fom: '2024-04-04',
      tom: '2024-04-18',
      color: 'BLUE',
      srText: 'Mors del'
    }, {
      fom: '2024-05-17',
      tom: '2024-05-23',
      color: 'GREEN',
      srText: 'Fars del'
    }, {
      fom: '2024-05-31',
      tom: '2024-06-13',
      color: 'LIGHTGREENBLUE',
      srText: 'Samtidig uttak'
    }, {
      fom: '2024-04-19',
      tom: '2024-05-15',
      color: 'BLACK',
      srText: 'Tapte dager'
    }, {
      fom: '2024-06-14',
      tom: '2024-06-27',
      color: 'BLACK',
      srText: 'Tapte dager'
    }, {
      fom: '2024-06-28',
      tom: '2024-07-02',
      color: 'GREENOUTLINE',
      srText: 'Mors del, gradert'
    }, {
      fom: '2024-06-28',
      tom: '2024-07-02',
      color: 'BLUEOUTLINE',
      srText: 'Utsettelse'
    }, {
      fom: '2024-07-03',
      tom: '2024-07-15',
      color: 'GREENSTRIPED',
      srText: 'Fars del, aktivitetsfri'
    }],
    saksperioder: [{
      fom: '2024-04-04',
      tom: '2024-04-18',
      forelder: 'MOR',
      kontoType: 'MØDREKVOTE'
    }, {
      fom: '2024-05-17',
      tom: '2024-05-23',
      forelder: 'FAR_MEDMOR',
      kontoType: 'FEDREKVOTE'
    }, {
      fom: '2024-05-31',
      tom: '2024-06-13',
      kontoType: 'FELLESPERIODE',
      forelder: 'MOR',
      samtidigUttak: 50
    }, {
      fom: '2024-05-31',
      tom: '2024-06-13',
      kontoType: 'FELLESPERIODE',
      forelder: 'FAR_MEDMOR',
      samtidigUttak: 50
    }, {
      fom: '2024-06-28',
      tom: '2024-07-02',
      forelder: 'MOR',
      kontoType: 'MØDREKVOTE',
      gradering: {
        arbeidstidprosent: 80,
        aktivitet: {
          type: 'ANNET'
        }
      }
    }, {
      fom: '2024-06-28',
      tom: '2024-07-02',
      forelder: 'FAR_MEDMOR',
      utsettelseÅrsak: 'LOVBESTEMT_FERIE'
    }, {
      fom: '2024-07-03',
      tom: '2024-07-15',
      forelder: 'FAR_MEDMOR',
      morsAktivitet: 'IKKE_OPPGITT',
      kontoType: 'FORELDREPENGER'
    }],
    barn: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2024-04-04'],
      antallBarn: 1
    },
    erDeltUttak: true,
    erFarEllerMedmor: false,
    harAktivitetskravIPeriodeUtenUttak: false,
    bareFarMedmorHarRett: false,
    readOnly: false
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...VisAlleMedTekst.args,
    skjulTekstSomDefault: true,
    readOnly: true
  }
}`,...r.parameters?.docs?.source}}};const p=["VisAlleMedTekst","VisAlleUtenTekst"];export{t as VisAlleMedTekst,r as VisAlleUtenTekst,p as __namedExportsOrder,O as default};
