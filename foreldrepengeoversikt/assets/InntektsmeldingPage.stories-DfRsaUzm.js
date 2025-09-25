import{i as u,j as s}from"./iframe-CgprOxAM.js";import{h as e,H as r}from"./index-YwXLezO5.js";import{s as j}from"./saker-CGTZwiJ3.js";import{D as c}from"./api-R5XGfx5z.js";import{O as n}from"./routes-C7yRzVAD.js";import{I as g}from"./ForeldrepengeoversiktRoutes-Desu4i2U.js";import{M as f,R as k,a as R}from"./chunk-TMI4QPZX-CS1iaA-n.js";import"./preload-helper-D9Z9MdNV.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BcuoLzf-.js";import"./useSelectedSak-BVAmFLSi.js";import"./useQuery-DI2C0W1t.js";import"./sakerUtils-BUdt7KwH.js";import"./Snarveier-DfjrDR0f.js";import"./LenkePanel-CxNZ4gE5.js";import"./index-7rL4k3xa.js";import"./Dokument-t8KIc3_h.js";import"./dokumenterUtils-Bzrmt5eI.js";import"./Tag-BLhuv8qC.js";import"./GrupperteDokumenter-DsPGGX7h.js";import"./guid-CsArkN6i.js";import"./Accordion-CqVULU8j.js";import"./Header-VJTGWKqA.js";import"./LayoutWrapper-D9OkmHa8.js";import"./StatusTag-Ca5HeW6L.js";import"./Stroller-L1s-D6Xd.js";import"./NoeGikkGalt-uTDNMWhP.js";import"./MinidialogSkjema-BcAX6xO-.js";import"./skjemanummer-Dqwms7hc.js";import"./BekreftelseSendtSøknad-LOta5joo.js";import"./KontonummerInfo-CaJ1U9ru.js";import"./HarIkkeSaker-Dvy8p9tj.js";import"./SøkelenkerPanel-C0qsLMp-.js";import"./HarSaker-Cx7SDofh.js";import"./SakLink-CapL75Op.js";import"./ContentSection-DSnc54em.js";import"./Svangerskapspenger-D5VMTfeQ.js";import"./DinPlan-CDnSwFS9.js";import"./Oppgaver-BCu297iV.js";import"./OppgaveLenkepanel-qyXhaO5A.js";import"./KontaktOss-fj98O2oM.js";const v=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:40000.78,refusjonPrMnd:4e3,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[{fomDato:"2024-09-10",tomDato:"9999-12-31",beløpPerMnd:998,type:"FRI_TRANSPORT"}],refusjonsperioder:[]}],I=[{versjon:2,erAktiv:!0,stillingsprosent:80,inntektPrMnd:4e4,refusjonPrMnd:4e3,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[{fomDato:"2024-09-10",tomDato:"2024-10-11",beløpPerMnd:998,type:"FRI_TRANSPORT"},{fomDato:"2024-12-12",tomDato:"2024-12-24",beløpPerMnd:998,type:"FRI_TRANSPORT"},{fomDato:"2025-01-01",tomDato:"9999-12-31",beløpPerMnd:200,type:"ELEKTRISK_KOMMUNIKASJON"}],refusjonsperioder:[]}],N=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:1e5,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],S=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:14e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],y=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:11e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[{fomDato:"2024-10-12",refusjonsbeløpMnd:3e4},{fomDato:"2024-10-13",refusjonsbeløpMnd:0},{fomDato:"2024-10-14",refusjonsbeløpMnd:14e4}]}],D=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],ue={title:"Inntektsmelding",decorators:[u],render:l=>s.jsx(f,{initialEntries:[`${n.SAKSOVERSIKT}/${l.saksnummer}/${n.INNTEKTSMELDING}/${l.journalpostId}`],children:s.jsx(k,{children:s.jsx(R,{element:s.jsx(g,{}),path:`${n.SAKSOVERSIKT}/:saksnummer/${n.INNTEKTSMELDING}/:journalpostId`})})})},t=[e.get(".//rest/innsyn/v2/saker",()=>r.json(j)),e.get(".//rest/satser",()=>r.json(c))],o={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(v))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},a={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(I))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},i={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(D))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},m={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(N))])}},args:{saksnummer:"308",journalpostId:"1017115920"}},p={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(S))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},d={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(y))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
