import{i as j,j as n}from"./iframe-BGOG44DK.js";import{h as e,H as t}from"./index-B4Zy9ehy.js";import{s as c}from"./saker-DWfdw2la.js";import{A as r,D as g}from"./api-CnpsdBLC.js";import{O as o}from"./routes-C7yRzVAD.js";import{I as f}from"./ForeldrepengeoversiktRoutes-CwDnOYXa.js";import{M as R,R as k,a as I}from"./chunk-TMI4QPZX-QwzuWtG2.js";import"./preload-helper-D9Z9MdNV.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BifAu8VF.js";import"./useSelectedSak-CCMmAbnx.js";import"./useQuery-DT5RNUV5.js";import"./sakerUtils-DK21Rf3m.js";import"./Snarveier-CEI87XI_.js";import"./LenkePanel-Di4qeYeX.js";import"./index-D28VsQrH.js";import"./Dokument-CxVxFRKr.js";import"./dokumenterUtils-BidHPh0H.js";import"./Tag-C68Ae1Iw.js";import"./GrupperteDokumenter-u1UxH7B6.js";import"./guid-CsArkN6i.js";import"./Accordion-T2WuaQdM.js";import"./Header-BBAbsDgm.js";import"./LayoutWrapper-C63bbq19.js";import"./StatusTag-DYtpwxFh.js";import"./Stroller-BJyaYKJ8.js";import"./NoeGikkGalt-BA43qCks.js";import"./MinidialogSkjema-BNydc6-4.js";import"./skjemanummer-7iJeax4r.js";import"./BekreftelseSendtSøknad-DIsN4R13.js";import"./KontonummerInfo-CYE4uGvD.js";import"./HarIkkeSaker-BpHRxS4X.js";import"./SøkelenkerPanel-SL3qVlsq.js";import"./HarSaker-B-ktagMa.js";import"./SakLink-BZizAoAU.js";import"./ContentSection-RFVCnIcd.js";import"./Svangerskapspenger-CrLk9Oqd.js";import"./DinPlan-BPzKKye2.js";import"./Oppgaver-Cs3AcBdD.js";import"./OppgaveLenkepanel-CchuefCj.js";import"./KontaktOss-C-AsUdZv.js";const N=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:40000.78,refusjonPrMnd:4e3,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[{fomDato:"2024-09-10",tomDato:"9999-12-31",beløpPerMnd:998,type:"FRI_TRANSPORT"}],refusjonsperioder:[]}],v=[{versjon:2,erAktiv:!0,stillingsprosent:80,inntektPrMnd:4e4,refusjonPrMnd:4e3,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[{fomDato:"2024-09-10",tomDato:"2024-10-11",beløpPerMnd:998,type:"FRI_TRANSPORT"},{fomDato:"2024-12-12",tomDato:"2024-12-24",beløpPerMnd:998,type:"FRI_TRANSPORT"},{fomDato:"2025-01-01",tomDato:"9999-12-31",beløpPerMnd:200,type:"ELEKTRISK_KOMMUNIKASJON"}],refusjonsperioder:[]}],S=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:1e5,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],P=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:14e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],D=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:11e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[{fomDato:"2024-10-12",refusjonsbeløpMnd:3e4},{fomDato:"2024-10-13",refusjonsbeløpMnd:0},{fomDato:"2024-10-14",refusjonsbeløpMnd:14e4}]}],A=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],je={title:"Inntektsmelding",decorators:[j],render:u=>n.jsx(R,{initialEntries:[`${o.SAKSOVERSIKT}/${u.saksnummer}/${o.INNTEKTSMELDING}/${u.journalpostId}`],children:n.jsx(k,{children:n.jsx(I,{element:n.jsx(f,{}),path:`${o.SAKSOVERSIKT}/:saksnummer/${o.INNTEKTSMELDING}/:journalpostId`})})})},s=[e.get(r.saker,()=>t.json(c)),e.get(r.satser,()=>t.json(g))],a={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(N))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},m={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(v))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},i={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(A))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},p={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(S))])}},args:{saksnummer:"308",journalpostId:"1017115920"}},d={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(P))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},l={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(D))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(API_URLS.inntektsmelding, () => HttpResponse.json(enBortfaltNaturalytelse))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...a.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(API_URLS.inntektsmelding, () => HttpResponse.json(flereBortfalteNaturalytelser))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...m.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(API_URLS.inntektsmelding, () => HttpResponse.json(utenRefusjon))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(API_URLS.inntektsmelding, () => HttpResponse.json(medDelvisRefusjon))])
    }
  },
  args: {
    saksnummer: '308',
    journalpostId: '1017115920'
  }
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(API_URLS.inntektsmelding, () => HttpResponse.json(medRefusjon))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(API_URLS.inntektsmelding, () => HttpResponse.json(medRefusjonsPerioder))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...l.parameters?.docs?.source}}};const ce=["EnBortfaltNaturalytelse","FlereBortfalteNaturalytelser","UtenRefusjon","DelvisRefusjon","MedRefusjon","Refusjonsperioder"];export{p as DelvisRefusjon,a as EnBortfaltNaturalytelse,m as FlereBortfalteNaturalytelser,d as MedRefusjon,l as Refusjonsperioder,i as UtenRefusjon,ce as __namedExportsOrder,je as default};
