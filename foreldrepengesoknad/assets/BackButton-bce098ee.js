import{Y as a,B as l,b as u}from"./Tidsperioden-c7c469a7.js";import{j as n}from"./jsx-runtime-d079401a.js";import"./index-f1f2c4b1.js";import{a as d,C as i}from"./FpDataContext-fc20d236.js";const v=e=>e===!0?a.YES:e===!1?a.NO:a.UNANSWERED,f=e=>{if(e===a.YES)return!0;if(e!==a.UNANSWERED)return!1},o=({route:e,mellomlagreSøknadOgNaviger:t})=>{const r=d(i.APP_ROUTE),s=async()=>{r(e),t()};return n.jsx(l,{type:"button",variant:"secondary",onClick:s,children:n.jsx(u,{id:"backlink.label"})})};try{o.displayName="BackButton",o.__docgenInfo={description:"",displayName:"BackButton",props:{route:{defaultValue:null,description:"",name:"route",required:!0,type:{name:"enum",value:[{value:'"/"'},{value:'"/soknad/sokersituasjon"'},{value:'"/soknad/om-barnet"'},{value:'"/soknad/annen-forelder"'},{value:'"/soknad/uttaksplan-info"'},{value:'"/soknad/uttaksplan"'},{value:'"/soknad/utenlandsopphold"'},{value:'"/soknad/tidligere-utenlandsopphold"'},{value:'"/soknad/senere-utenlandsopphold"'},{value:'"/soknad/inntektsinformasjon"'},{value:'"/soknad/manglende-vedlegg"'},{value:'"/soknad/oppsummering"'},{value:'"/soknad/soknad-sendt"'},{value:'"ikke-myndig"'}]}},mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => void"}}}}}catch{}export{o as B,f as a,v as c};