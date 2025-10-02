import{i as u,j as s}from"./iframe-DZqmX2Pl.js";import{h as e,H as r}from"./index-2sm9E9gI.js";import{s as j}from"./saker-C1ybsR4h.js";import{D as c}from"./api-briH8RE4.js";import{O as n}from"./routes-C7yRzVAD.js";import{I as g}from"./ForeldrepengeoversiktRoutes-CYQHXBRx.js";import{M as f,R as k,a as R}from"./chunk-TMI4QPZX-BpI84etn.js";import"./preload-helper-D9Z9MdNV.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-QWf0HCgM.js";import"./useSelectedSak-DGDe2O2X.js";import"./useQuery-CCpOkbfR.js";import"./sakerUtils-D2AYwurK.js";import"./Snarveier-Dr_WZSEU.js";import"./LenkePanel-lTqdE-pC.js";import"./index-BKKzYOzq.js";import"./Dokument-CpGOsjS0.js";import"./dokumenterUtils-CbHZzTLn.js";import"./Tag-BkwNHn-l.js";import"./GrupperteDokumenter-DJm52qaa.js";import"./guid-CsArkN6i.js";import"./Accordion-HyT86eUs.js";import"./Header-BEwOGZzE.js";import"./LayoutWrapper-BR__bP6e.js";import"./StatusTag-B3hvntiM.js";import"./Stroller-fXTzZUVj.js";import"./NoeGikkGalt-uVYKNhA9.js";import"./MinidialogSkjema-BoSZc5ks.js";import"./skjemanummer-BWSC44tl.js";import"./BekreftelseSendtSøknad-z6BEHama.js";import"./KontonummerInfo-I4DzilRh.js";import"./HarIkkeSaker-BVTZa_nv.js";import"./SøkelenkerPanel-BXHoQPgc.js";import"./HarSaker-DMXytBeX.js";import"./SakLink-IhweO2mY.js";import"./ContentSection-Bh0vEia0.js";import"./Svangerskapspenger-tGCqdka6.js";import"./DinPlan-DbSd-Kzp.js";import"./Oppgaver-R5THg7ql.js";import"./OppgaveLenkepanel-y4VRXyM5.js";import"./KontaktOss-qDor53HB.js";const v=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:40000.78,refusjonPrMnd:4e3,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[{fomDato:"2024-09-10",tomDato:"9999-12-31",beløpPerMnd:998,type:"FRI_TRANSPORT"}],refusjonsperioder:[]}],I=[{versjon:2,erAktiv:!0,stillingsprosent:80,inntektPrMnd:4e4,refusjonPrMnd:4e3,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[{fomDato:"2024-09-10",tomDato:"2024-10-11",beløpPerMnd:998,type:"FRI_TRANSPORT"},{fomDato:"2024-12-12",tomDato:"2024-12-24",beløpPerMnd:998,type:"FRI_TRANSPORT"},{fomDato:"2025-01-01",tomDato:"9999-12-31",beløpPerMnd:200,type:"ELEKTRISK_KOMMUNIKASJON"}],refusjonsperioder:[]}],N=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:1e5,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],S=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:14e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],y=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:11e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[{fomDato:"2024-10-12",refusjonsbeløpMnd:3e4},{fomDato:"2024-10-13",refusjonsbeløpMnd:0},{fomDato:"2024-10-14",refusjonsbeløpMnd:14e4}]}],D=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],ue={title:"Inntektsmelding",decorators:[u],render:l=>s.jsx(f,{initialEntries:[`${n.SAKSOVERSIKT}/${l.saksnummer}/${n.INNTEKTSMELDING}/${l.journalpostId}`],children:s.jsx(k,{children:s.jsx(R,{element:s.jsx(g,{}),path:`${n.SAKSOVERSIKT}/:saksnummer/${n.INNTEKTSMELDING}/:journalpostId`})})})},t=[e.get(".//rest/innsyn/v2/saker",()=>r.json(j)),e.get(".//rest/satser",()=>r.json(c))],o={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(v))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},a={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(I))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},i={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(D))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},m={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(N))])}},args:{saksnummer:"308",journalpostId:"1017115920"}},p={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(S))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},d={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(y))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger\`, () => HttpResponse.json(enBortfaltNaturalytelse))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger\`, () => HttpResponse.json(flereBortfalteNaturalytelser))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger\`, () => HttpResponse.json(utenRefusjon))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...i.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger\`, () => HttpResponse.json(medDelvisRefusjon))])
    }
  },
  args: {
    saksnummer: '308',
    journalpostId: '1017115920'
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger\`, () => HttpResponse.json(medRefusjon))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger\`, () => HttpResponse.json(medRefusjonsPerioder))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...d.parameters?.docs?.source}}};const je=["EnBortfaltNaturalytelse","FlereBortfalteNaturalytelser","UtenRefusjon","DelvisRefusjon","MedRefusjon","Refusjonsperioder"];export{m as DelvisRefusjon,o as EnBortfaltNaturalytelse,a as FlereBortfalteNaturalytelser,p as MedRefusjon,d as Refusjonsperioder,i as UtenRefusjon,je as __namedExportsOrder,ue as default};
