import{i as u,j as s}from"./iframe-DqYsnEnB.js";import{h as e,H as r}from"./index-md76Z-Y7.js";import{s as j}from"./saker-Bq29SDf7.js";import{D as c}from"./api-B2G0MWey.js";import{O as n}from"./routes-C7yRzVAD.js";import{I as g}from"./ForeldrepengeoversiktRoutes-2MY0sRYP.js";import{M as f,R as k,a as R}from"./chunk-UH6JLGW7-By06e2eO.js";import"./preload-helper-D9Z9MdNV.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-clP1J7vy.js";import"./useSelectedSak-qVpfCZze.js";import"./useQuery-B_E6v8l_.js";import"./sakerUtils-BTKdORNo.js";import"./Snarveier-B94lT8bI.js";import"./LenkePanel-DIzA5O_F.js";import"./index-CyoqsWOn.js";import"./Dokument-Cbzw1uj2.js";import"./dokumenterUtils-B3_q2EWV.js";import"./Tag-BRq6W16p.js";import"./GrupperteDokumenter-B8hrhdAp.js";import"./guid-CsArkN6i.js";import"./Accordion-BhBDAzyO.js";import"./Header-Cqhy_UJT.js";import"./LayoutWrapper-BwDpqrGY.js";import"./StatusTag-DkNz2Yza.js";import"./Stroller-2OawaaZm.js";import"./NoeGikkGalt-B4Cxx3Lo.js";import"./MinidialogSkjema-D47C-zv2.js";import"./skjemanummer-jwZpTz2Y.js";import"./BekreftelseSendtSøknad-O_ZVpnbT.js";import"./KontonummerInfo-DD86AF2h.js";import"./HarIkkeSaker-q2cNbk5x.js";import"./SøkelenkerPanel-BVlaU57L.js";import"./HarSaker-D1e3lckm.js";import"./SakLink-HOHbrb-q.js";import"./ContentSection-DP-YOFoP.js";import"./Svangerskapspenger-CQ1l_kUQ.js";import"./DinPlan-j6_HvjOv.js";import"./Oppgaver-QIqeoIt1.js";import"./OppgaveLenkepanel-w_JnV8dH.js";import"./KontaktOss-hVbnr1YL.js";const v=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:40000.78,refusjonPrMnd:4e3,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[{fomDato:"2024-09-10",tomDato:"9999-12-31",beløpPerMnd:998,type:"FRI_TRANSPORT"}],refusjonsperioder:[]}],I=[{versjon:2,erAktiv:!0,stillingsprosent:80,inntektPrMnd:4e4,refusjonPrMnd:4e3,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[{fomDato:"2024-09-10",tomDato:"2024-10-11",beløpPerMnd:998,type:"FRI_TRANSPORT"},{fomDato:"2024-12-12",tomDato:"2024-12-24",beløpPerMnd:998,type:"FRI_TRANSPORT"},{fomDato:"2025-01-01",tomDato:"9999-12-31",beløpPerMnd:200,type:"ELEKTRISK_KOMMUNIKASJON"}],refusjonsperioder:[]}],N=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:1e5,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],S=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:14e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],y=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:11e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[{fomDato:"2024-10-12",refusjonsbeløpMnd:3e4},{fomDato:"2024-10-13",refusjonsbeløpMnd:0},{fomDato:"2024-10-14",refusjonsbeløpMnd:14e4}]}],D=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],ue={title:"Inntektsmelding",decorators:[u],render:l=>s.jsx(f,{initialEntries:[`${n.SAKSOVERSIKT}/${l.saksnummer}/${n.INNTEKTSMELDING}/${l.journalpostId}`],children:s.jsx(k,{children:s.jsx(R,{element:s.jsx(g,{}),path:`${n.SAKSOVERSIKT}/:saksnummer/${n.INNTEKTSMELDING}/:journalpostId`})})})},t=[e.get(".//rest/innsyn/v2/saker",()=>r.json(j)),e.get(".//rest/satser",()=>r.json(c))],o={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(v))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},a={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(I))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},i={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(D))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},m={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(N))])}},args:{saksnummer:"308",journalpostId:"1017115920"}},p={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(S))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},d={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(y))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
