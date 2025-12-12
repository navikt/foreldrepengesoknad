import{k as j,j as n}from"./iframe-MIqGeC9m.js";import{h as e,H as t}from"./index-DZOqqEyC.js";import{s as c}from"./saker-thaWTfcA.js";import{A as r}from"./queries-DMzMUvNU.js";import{O as o}from"./routes-BgSQQwXh.js";import{I as g}from"./ForeldrepengeoversiktRoutes-BZN4XF1q.js";import{M as f,R as k,a as R}from"./chunk-WWGJGFF6-oGz4_dZK.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-B52uFNEx.js";import"./useSelectedSak-BSeBidXV.js";import"./useQuery-BaQizPdv.js";import"./sakerUtils-BQgTwYJW.js";import"./Snarveier-C0ccWU1l.js";import"./LenkePanel-BJ2KmPRL.js";import"./index-DPHOv5Hm.js";import"./Header-BpBtnxIn.js";import"./LayoutWrapper-HOh4mSTL.js";import"./StatusTag-DlgNLC0H.js";import"./Tag-BxMBA5hR.js";import"./Stroller-VI2Uo1lH.js";import"./BabyWrapped-BVInueab.js";import"./NoeGikkGalt-C7BgT4Xz.js";import"./skjemanummer-Bk-RcDnh.js";import"./MinidialogSkjema-DDuEVEEN.js";import"./HarIkkeSaker-BiOUOmJ9.js";import"./SøkelenkerPanel-JRfqtsUP.js";import"./HarSaker-BB7V48ZK.js";import"./SakLink-Dw_s533-.js";import"./guid-CsArkN6i.js";import"./ContentSection-b0H51EEW.js";import"./BekreftelseSendtSøknad-CXwq-ih1.js";import"./tidslinjeUtils-CUNsLpp3.js";import"./KontonummerInfo-D6eWfKc4.js";import"./Accordion-Dzd8TR3z.js";import"./Svangerskapspenger-CacauUHH.js";import"./DinPlan-Dl7H-Bkq.js";import"./Oppgaver-B_dZhs6O.js";import"./OppgaveLenkepanel-DA31YWdj.js";import"./Tidslinje-u4D4I1VY.js";import"./Paperplane-BGd48BmA.js";import"./KontaktOss-DvdgtRVB.js";const I=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:40000.78,refusjonPrMnd:4e3,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[{fomDato:"2024-09-10",tomDato:"9999-12-31",beløpPerMnd:998,type:"FRI_TRANSPORT"}],refusjonsperioder:[]}],N=[{versjon:2,erAktiv:!0,stillingsprosent:80,inntektPrMnd:4e4,refusjonPrMnd:4e3,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[{fomDato:"2024-09-10",tomDato:"2024-10-11",beløpPerMnd:998,type:"FRI_TRANSPORT"},{fomDato:"2024-12-12",tomDato:"2024-12-24",beløpPerMnd:998,type:"FRI_TRANSPORT"},{fomDato:"2025-01-01",tomDato:"9999-12-31",beløpPerMnd:200,type:"ELEKTRISK_KOMMUNIKASJON"}],refusjonsperioder:[]}],v=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:1e5,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],P=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:14e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],S=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:11e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[{fomDato:"2024-10-12",refusjonsbeløpMnd:3e4},{fomDato:"2024-10-13",refusjonsbeløpMnd:0},{fomDato:"2024-10-14",refusjonsbeløpMnd:14e4}]}],D=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],ue={title:"Inntektsmelding",decorators:[j],render:u=>n.jsx(f,{initialEntries:[`${o.SAKSOVERSIKT}/${u.saksnummer}/${o.INNTEKTSMELDING}/${u.journalpostId}`],children:n.jsx(k,{children:n.jsx(R,{element:n.jsx(g,{}),path:`${o.SAKSOVERSIKT}/:saksnummer/${o.INNTEKTSMELDING}/:journalpostId`})})})},s=[e.get(r.saker,()=>t.json(c))],a={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(I))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},m={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(N))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},i={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(D))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},p={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(v))])}},args:{saksnummer:"308",journalpostId:"1017115920"}},d={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(P))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},l={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(S))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const je=["EnBortfaltNaturalytelse","FlereBortfalteNaturalytelser","UtenRefusjon","DelvisRefusjon","MedRefusjon","Refusjonsperioder"];export{p as DelvisRefusjon,a as EnBortfaltNaturalytelse,m as FlereBortfalteNaturalytelser,d as MedRefusjon,l as Refusjonsperioder,i as UtenRefusjon,je as __namedExportsOrder,ue as default};
