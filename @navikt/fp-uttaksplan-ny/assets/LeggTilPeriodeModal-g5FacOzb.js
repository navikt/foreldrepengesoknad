import{j as e}from"./jsx-runtime-CLpGMVip.js";import{r as A}from"./index-CR__hKHy.js";import{j as S,k as K,l as U,H as y,R as D,V as _,m as z,o as b,p as B,q as G,r as W,M as P,F as v,b as E,P as L,s as x,t as k,v as g,n as $,u as Y,a as J,w as Q,S as j,x as q,y as X}from"./stønadskontoerUtils-B-IaulAN.js";import{u as V}from"./index-DVv2q3CG.js";const Z="_headerContent_ivs7f_1",ee="_header_ivs7f_1",te="_modal_ivs7f_12",w={headerContent:Z,header:ee,modal:te},O=({modalData:t,setModalData:i,closeModal:d,familiehendelsedato:r,handleAddPeriode:p,erBarnetFødt:l,gjelderAdopsjon:o})=>{const s=V(),{fom:m,tom:f,kontoType:u,forelder:a,årsak:n}=t,h=S({defaultValues:{fom:m??"",tom:f??""}}),c=h.watch("fom"),F=h.watch("tom"),R=()=>{p({fom:c,tom:F,id:`${c} - ${F} - ${u}`,readOnly:!1,kontoType:u,forelder:a||v.mor,utsettelseÅrsak:n===E.Ferie?n:void 0,periodeHullÅrsak:n===L.PERIODE_UTEN_UTTAK?n:void 0}),d()},T=K({årsak:n,kontoType:u,familiehendelsedato:r,gjelderAdopsjon:o}),M=U({familiehendelsedato:r,kontoType:u});return e.jsxs(e.Fragment,{children:[e.jsx(y,{size:"medium",children:"Hvilke datoer skal perioden være?"}),e.jsx(D,{formMethods:h,onSubmit:R,id:"skjema",children:e.jsxs(_,{gap:"4",children:[e.jsxs(z,{gap:"4",children:[e.jsx(b,{showMonthAndYearDropdowns:!0,minDate:T,maxDate:M,validate:B({intl:s,familiehendelsedato:r,kontoType:u,tomValue:F,erBarnetFødt:l,minDate:T,maxDate:M,årsak:n,gjelderAdopsjon:o}),disableWeekends:!0,label:"Fra og med dato",name:"fom",defaultMonth:G(c)?r:c}),e.jsx(b,{showMonthAndYearDropdowns:!0,minDate:T,maxDate:M,validate:W({intl:s,familiehendelsedato:r,kontoType:u,fomValue:c,erBarnetFødt:l,minDate:T,maxDate:M,årsak:n,gjelderAdopsjon:o}),disableWeekends:!0,label:"Til og med dato",name:"tom",defaultMonth:G(c)?r:c})]}),e.jsx(P,{onCancel:d,onGoPreviousStep:()=>{i({...t,currentStep:"step2"})},isFinalStep:!1})]})})]})};O.__docgenInfo={description:"",methods:[],displayName:"EndreTidsperiodeModalStep",props:{modalData:{required:!0,tsType:{name:"ModalData"},description:""},setModalData:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: ModalData) => void",signature:{arguments:[{type:{name:"ModalData"},name:"data"}],return:{name:"void"}}},description:""},closeModal:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},familiehendelsedato:{required:!0,tsType:{name:"string"},description:""},handleAddPeriode:{required:!0,tsType:{name:"signature",type:"function",raw:"(periode: Planperiode) => void",signature:{arguments:[{type:{name:"Planperiode"},name:"periode"}],return:{name:"void"}}},description:""},erBarnetFødt:{required:!0,tsType:{name:"boolean"},description:""},gjelderAdopsjon:{required:!0,tsType:{name:"boolean"},description:""}}};var I=(t=>(t.LEGG_TIL_PERIODE="leggTilPeriode",t.LEGG_TIL_OPPHOLD="leggTilOpphold",t))(I||{});const N=({modalData:t,setModalData:i,closeModal:d})=>{const r=V(),p=S({defaultValues:{hvaVilDuGjøre:t.hvaVilDuGjøre}}),l=o=>{i({...t,hvaVilDuGjøre:o.hvaVilDuGjøre,currentStep:"step2"})};return e.jsxs(e.Fragment,{children:[e.jsx(y,{size:"medium",children:"Hva vil du legge til?"}),e.jsx(D,{formMethods:p,onSubmit:l,id:"skjema",children:e.jsxs(_,{gap:"4",children:[e.jsxs(x,{name:"hvaVilDuGjøre",validate:[k(r.formatMessage({id:"leggTilPeriodeModal.hvaVilDuGjøre.påkrevd"}))],children:[e.jsx(g,{value:"leggTilPeriode",children:"Legge til periode med foreldrepenger"}),e.jsx(g,{value:"leggTilOpphold",children:"Legge til ferie eller periode uten foreldrepenger"})]}),e.jsx(P,{onCancel:d,isFinalStep:!1})]})})]})};N.__docgenInfo={description:"",methods:[],displayName:"ValgModalStep",props:{modalData:{required:!0,tsType:{name:"ModalData"},description:""},setModalData:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: ModalData) => void",signature:{arguments:[{type:{name:"ModalData"},name:"data"}],return:{name:"void"}}},description:""},closeModal:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const C=({modalData:t,closeModal:i,setModalData:d})=>{const r=V(),p=$(Y(J.VALGT_STØNADSKONTO)),{forelder:l,kontoType:o}=t,s=S({defaultValues:{forelder:l??void 0,kontoType:o??void 0}}),m=s.watch("kontoType"),f=(a,n)=>{switch(a){case j.Fedrekvote:return v.farMedmor;case j.Mødrekvote:case j.ForeldrepengerFørFødsel:return v.mor;default:return n}},u=a=>{d({...t,kontoType:a.kontoType,currentStep:"step3",forelder:f(a.kontoType,a.forelder)})};return e.jsx(D,{formMethods:s,onSubmit:u,id:"skjema",children:e.jsxs(_,{gap:"4",children:[e.jsx(y,{size:"medium",children:"Hvilken del av foreldrepengene vil du bruke?"}),e.jsx(x,{validate:[k(r.formatMessage({id:"leggTilPeriodeModal.kontoType.påkrevd"}))],label:"Velg kontotype",name:"kontoType",children:p.kontoer.map(a=>e.jsx(g,{value:a.konto,children:Q(r,a.konto)},a.konto))}),m===j.Fellesperiode&&e.jsxs(x,{validate:[k(r.formatMessage({id:"leggTilPeriodeModal.forelder.påkrevd"}))],label:"Hvem gjelder fellesperioden?",name:"forelder",children:[e.jsx(g,{value:v.mor,children:"Mor"}),e.jsx(g,{value:v.farMedmor,children:"Far eller medmor"})]}),e.jsx(P,{onCancel:i,onGoPreviousStep:()=>{d({...t,currentStep:"step1"})},isFinalStep:!1})]})})};C.__docgenInfo={description:"",methods:[],displayName:"VelgKontotypeModalStep",props:{modalData:{required:!0,tsType:{name:"ModalData"},description:""},closeModal:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},setModalData:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: ModalData) => void",signature:{arguments:[{type:{name:"ModalData"},name:"data"}],return:{name:"void"}}},description:""}}};const H=({modalData:t,setModalData:i,closeModal:d})=>{const r=V(),p=S({defaultValues:{årsak:t.årsak}}),l=o=>{i({...t,årsak:o.årsak,currentStep:"step3"})};return e.jsxs(e.Fragment,{children:[e.jsx(y,{size:"medium",children:"Hva vil du legge til?"}),e.jsx(D,{formMethods:p,onSubmit:l,id:"skjema",children:e.jsxs(_,{gap:"4",children:[e.jsxs(x,{name:"årsak",validate:[k(r.formatMessage({id:"leggTilPeriodeModal.hvaVilDuGjøre.påkrevd"}))],children:[e.jsx(g,{value:E.Ferie,children:"Ferie"}),e.jsx(g,{value:L.PERIODE_UTEN_UTTAK,children:"Periode uten foreldrepenger"})]}),e.jsx(P,{onCancel:d,isFinalStep:!1,onGoPreviousStep:()=>{i({...t,currentStep:"step1"})}})]})})]})};H.__docgenInfo={description:"",methods:[],displayName:"VelgOppholdsårsakModalStep",props:{modalData:{required:!0,tsType:{name:"ModalData"},description:""},closeModal:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},setModalData:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: ModalData) => void",signature:{arguments:[{type:{name:"ModalData"},name:"data"}],return:{name:"void"}}},description:""}}};const re=({closeModal:t,handleAddPeriode:i,familiehendelsedato:d,isModalOpen:r,erBarnetFødt:p,gjelderAdopsjon:l})=>{const o={hvaVilDuGjøre:void 0,fom:void 0,tom:void 0,currentStep:"step1",kontoType:void 0,forelder:void 0},[s,m]=A.useState(o),{currentStep:f}=s,{hvaVilDuGjøre:u}=s,a="legg-til-periode-modal-heading",n=()=>{m(o),t()},h=()=>{switch(f){case"step1":return e.jsx(N,{modalData:s,setModalData:m,closeModal:n});case"step2":return u===I.LEGG_TIL_OPPHOLD?e.jsx(H,{modalData:s,setModalData:m,closeModal:n}):e.jsx(C,{modalData:s,setModalData:m,closeModal:n});case"step3":return e.jsx(O,{modalData:s,setModalData:m,closeModal:n,familiehendelsedato:d,handleAddPeriode:i,erBarnetFødt:p,gjelderAdopsjon:l});default:return null}};return e.jsxs(q,{className:w.modal,open:r,"aria-labelledby":a,onClose:n,children:[e.jsx(q.Header,{className:w.header,closeButton:!1,children:e.jsxs("div",{className:w.headerContent,children:[e.jsx(X,{"aria-hidden":!0,width:24,height:24}),e.jsx(y,{size:"medium",id:a,children:"Legg til periode"})]})}),e.jsx(q.Body,{children:h()})]})};re.__docgenInfo={description:"",methods:[],displayName:"LeggTilPeriodeModal",props:{closeModal:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void | undefined",signature:{arguments:[],return:{name:"union",raw:"void | undefined",elements:[{name:"void"},{name:"undefined"}]}}},description:""},handleAddPeriode:{required:!0,tsType:{name:"signature",type:"function",raw:"(oppdatertPeriode: Planperiode) => void",signature:{arguments:[{type:{name:"Planperiode"},name:"oppdatertPeriode"}],return:{name:"void"}}},description:""},familiehendelsedato:{required:!0,tsType:{name:"string"},description:""},isModalOpen:{required:!0,tsType:{name:"boolean"},description:""},erBarnetFødt:{required:!0,tsType:{name:"boolean"},description:""},gjelderAdopsjon:{required:!0,tsType:{name:"boolean"},description:""}}};export{re as L};
