import{j as a}from"./jsx-runtime-Cw0GR0a5.js";import{u as n}from"./index-BXq8hJNt.js";import"./UttaksdagenString-DBxOpWvb.js";import"./dates-JCHAmx_r.js";import"./index-CTjT7uj6.js";import"./index-CCQ3W5xA.js";import{c as l}from"./stringUtils-BhrNUKGk.js";import{S as d}from"./SakLink-BsA5gPkH.js";import{u as c}from"./useBackgroundColor-Cz-TGjGB.js";import{g as p}from"./guid-CsArkN6i.js";import{a as f}from"./sakerUtils-BUhIC3g1.js";import{H as h,V as j}from"./VStack-Cmqt2b2v.js";import{H as u,B as x}from"./Label-BeJqMiuK.js";const k=({grupperteSaker:e,harMinstEttArbeidsforhold:r})=>{const s=n();return c("blue"),a.jsx(a.Fragment,{children:e.map(t=>{const{tittel:i,undertittel:o}=f({barngruppering:t.barn,familiehendelsedato:t.familiehendelsedato,intl:s,antallBarn:t.antallBarn,situasjon:t.type});return a.jsxs("div",{children:[a.jsxs(h,{gap:"2",align:"baseline",children:[a.jsx(u,{size:"small",level:"2",spacing:!0,children:i}),a.jsx(x,{children:l(o)})]}),a.jsx(j,{gap:"2",children:t.saker.map(m=>a.jsx(d,{sak:m,harMinstEttArbeidsforhold:r},p()))})]},t.familiehendelsedato)})})};k.__docgenInfo={description:"",methods:[],displayName:"HarSaker"};export{k as H};
