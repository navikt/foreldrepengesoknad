import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as n}from"./useQuery-D_fvW0PL.js";import{u as p}from"./index-ghK6WsM8.js";import{m}from"./api-BmJ5658F.js";import{C as g}from"./ContentSection-B_6Fjlwm.js";import{g as l}from"./guid-CsArkN6i.js";import{O as d}from"./OppgaveLenkepanel-DIFOFety.js";import{B as f}from"./Label-BeJqMiuK.js";import{V as c}from"./VStack-CwyBm8Pa.js";import"./index-CTjT7uj6.js";const u=({saksnummer:a})=>{const i=n({...m(),select:o=>o.filter(({saksnr:s})=>s===a)}),r=p();if(i.isError)return e.jsx(g,{heading:r.formatMessage({id:"saksoversikt.oppgaver"}),className:"bg-orange-100 border-orange-500 border-2",children:e.jsx(f,{children:r.formatMessage({id:"oppgaver.feilVedHentingAvOppgaver"})})});const t=i.data??[];return(t??[]).length===0?null:e.jsx(c,{gap:"2",children:t.map(o=>e.jsx(d,{tittel:r.formatMessage({id:"oppgaver.tittel.tilbakebetaling"}),minidialogInnslag:o},l()))})};u.__docgenInfo={description:"",methods:[],displayName:"Oppgaver"};export{u as O};
