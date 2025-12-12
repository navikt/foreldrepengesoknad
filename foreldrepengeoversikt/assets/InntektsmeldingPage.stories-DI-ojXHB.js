import{k as j,j as n}from"./iframe-DCfPTw-c.js";import{h as e,H as t}from"./index-V5pJY-H_.js";import{s as c}from"./saker-thaWTfcA.js";import{A as r}from"./queries-DbQrLqEA.js";import{O as o}from"./routes-BgSQQwXh.js";import{I as g}from"./ForeldrepengeoversiktRoutes-Dr_YXoXt.js";import{M as f,R as k,a as R}from"./chunk-WWGJGFF6-C4IWAZFG.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-CvcTTtwc.js";import"./useSelectedSak-LyZK9yHg.js";import"./useQuery-BV_PWbiX.js";import"./sakerUtils-eyzmF0Xq.js";import"./Snarveier-CXoOAnvW.js";import"./LenkePanel-rrQRxxG4.js";import"./index-D5Lcjf7J.js";import"./Header-CT0wyEzs.js";import"./LayoutWrapper-Cw4-ix99.js";import"./StatusTag-D7OPk3cl.js";import"./Tag-o9Q1uDLS.js";import"./Stroller-Wn2oHOKp.js";import"./BabyWrapped-Be1_NonE.js";import"./NoeGikkGalt-BhbjOqxI.js";import"./skjemanummer-BJ3hGUiX.js";import"./MinidialogSkjema-DVacgVHE.js";import"./HarIkkeSaker-D-svYXUz.js";import"./SøkelenkerPanel-COk7Z_aw.js";import"./HarSaker-DFPwRLMU.js";import"./SakLink-CF8RmjQr.js";import"./guid-CsArkN6i.js";import"./ContentSection-hxNnlhoU.js";import"./BekreftelseSendtSøknad-C7rbz3fa.js";import"./tidslinjeUtils-CwkElmLX.js";import"./KontonummerInfo-BqW7zvsd.js";import"./Accordion-Dah-TQt_.js";import"./Svangerskapspenger-DfRViNuZ.js";import"./DinPlan-DKAEI5oP.js";import"./Oppgaver-G8RIfiRr.js";import"./OppgaveLenkepanel-33QFqsWK.js";import"./Tidslinje-Czepa4Vn.js";import"./Paperplane-BD4m2lJm.js";import"./KontaktOss-B2N8AcJa.js";const I=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:40000.78,refusjonPrMnd:4e3,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[{fomDato:"2024-09-10",tomDato:"9999-12-31",beløpPerMnd:998,type:"FRI_TRANSPORT"}],refusjonsperioder:[]}],N=[{versjon:2,erAktiv:!0,stillingsprosent:80,inntektPrMnd:4e4,refusjonPrMnd:4e3,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[{fomDato:"2024-09-10",tomDato:"2024-10-11",beløpPerMnd:998,type:"FRI_TRANSPORT"},{fomDato:"2024-12-12",tomDato:"2024-12-24",beløpPerMnd:998,type:"FRI_TRANSPORT"},{fomDato:"2025-01-01",tomDato:"9999-12-31",beløpPerMnd:200,type:"ELEKTRISK_KOMMUNIKASJON"}],refusjonsperioder:[]}],v=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:1e5,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],P=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:14e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],S=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:11e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[{fomDato:"2024-10-12",refusjonsbeløpMnd:3e4},{fomDato:"2024-10-13",refusjonsbeløpMnd:0},{fomDato:"2024-10-14",refusjonsbeløpMnd:14e4}]}],D=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],ue={title:"Inntektsmelding",decorators:[j],render:u=>n.jsx(f,{initialEntries:[`${o.SAKSOVERSIKT}/${u.saksnummer}/${o.INNTEKTSMELDING}/${u.journalpostId}`],children:n.jsx(k,{children:n.jsx(R,{element:n.jsx(g,{}),path:`${o.SAKSOVERSIKT}/:saksnummer/${o.INNTEKTSMELDING}/:journalpostId`})})})},s=[e.get(r.saker,()=>t.json(c))],a={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(I))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},m={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(N))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},i={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(D))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},p={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(v))])}},args:{saksnummer:"308",journalpostId:"1017115920"}},d={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(P))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},l={parameters:{msw:{handlers:s.concat([e.get(r.inntektsmelding,()=>t.json(S))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
