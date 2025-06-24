import{i as T,j as s}from"./iframe-BJPuNUHF.js";import{h as e,H as r}from"./index-CTFy4nPz.js";import{s as h}from"./satser-CIow2Yri.js";import{s as L}from"./saker-_ozvozbM.js";import{O as n}from"./routes-C7yRzVAD.js";import{I as $}from"./ForeldrepengeoversiktRoutes-IVZn5PBG.js";import{M as H,R as B,a as w}from"./chunk-NL6KNZEE-BMuloYWr.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-B1Ri4vk4.js";import"./useSelectedSak-CWwtc8lr.js";import"./useQuery-DouvvC5V.js";import"./api-D-FHbRRJ.js";import"./sakerUtils-B63kceXc.js";import"./Snarveier-By5BR_J1.js";import"./LenkePanel-BF5pdDjr.js";import"./Dokument-CWaIfXcw.js";import"./dokumenterUtils-DgFEPEDh.js";import"./Tag-BYgfewLn.js";import"./GrupperteDokumenter-Bk-DZq0K.js";import"./guid-CsArkN6i.js";import"./Header-CspJ2vPL.js";import"./LayoutWrapper-D-G3oxuq.js";import"./StatusTag-C18VFXNo.js";import"./Stroller-CntL7pKi.js";import"./NoeGikkGalt-C2_Y01Ob.js";import"./MinidialogSkjema-CDvqdprV.js";import"./skjemanummer-CxJ164Ma.js";import"./BekreftelseSendtSøknad-DQTquzUG.js";import"./KontonummerInfo-DWMeSoxN.js";import"./HarIkkeSaker-BYR_2aiQ.js";import"./SøkelenkerPanel-DneLnnh_.js";import"./HarSaker-DardmTGv.js";import"./SakLink-BfIhcwSD.js";import"./ContentSection-Droutm4m.js";import"./Svangerskapspenger-D8UTGUww.js";import"./DinPlan-BspQs8Va.js";import"./Oppgaver-DmoSvjXJ.js";import"./OppgaveLenkepanel-D7eTu4Jq.js";import"./KontaktOss-CiOvS2RZ.js";const _=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:40000.78,refusjonPrMnd:4e3,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[{fomDato:"2024-09-10",tomDato:"9999-12-31",beløpPerMnd:998,type:"FRI_TRANSPORT"}],refusjonsperioder:[]}],K=[{versjon:2,erAktiv:!0,stillingsprosent:80,inntektPrMnd:4e4,refusjonPrMnd:4e3,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[{fomDato:"2024-09-10",tomDato:"2024-10-11",beløpPerMnd:998,type:"FRI_TRANSPORT"},{fomDato:"2024-12-12",tomDato:"2024-12-24",beløpPerMnd:998,type:"FRI_TRANSPORT"},{fomDato:"2025-01-01",tomDato:"9999-12-31",beløpPerMnd:200,type:"ELEKTRISK_KOMMUNIKASJON"}],refusjonsperioder:[]}],O=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:1e5,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],U=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:14e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],x=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,refusjonPrMnd:11e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[{fomDato:"2024-10-12",refusjonsbeløpMnd:3e4},{fomDato:"2024-10-13",refusjonsbeløpMnd:0},{fomDato:"2024-10-14",refusjonsbeløpMnd:14e4}]}],F=[{versjon:2,erAktiv:!0,stillingsprosent:100,inntektPrMnd:14e4,arbeidsgiverNavn:"Laksinor",arbeidsgiverIdent:"123",journalpostId:"1017115920",mottattTidspunkt:"2024-10-17T00:00:00",startDatoPermisjon:"2024-08-01",bortfalteNaturalytelser:[],refusjonsperioder:[]}],be={title:"Inntektsmelding",decorators:[T],render:l=>s.jsx(H,{initialEntries:[`${n.SAKSOVERSIKT}/${l.saksnummer}/${n.INNTEKTSMELDING}/${l.journalpostId}`],children:s.jsx(B,{children:s.jsx(w,{element:s.jsx($,{}),path:`${n.SAKSOVERSIKT}/:saksnummer/${n.INNTEKTSMELDING}/:journalpostId`})})})},t=[e.get(".//rest/innsyn/v2/saker",()=>r.json(L)),e.get(".//rest/satser",()=>r.json(h))],o={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(_))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},a={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(K))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},i={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(F))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},m={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(O))])}},args:{saksnummer:"308",journalpostId:"1017115920"}},p={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(U))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}},d={parameters:{msw:{handlers:t.concat([e.get(".//rest/innsyn/inntektsmeldinger",()=>r.json(x))])}},args:{saksnummer:"352011079",journalpostId:"1017115920"}};var u,j,c;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger\`, () => HttpResponse.json(enBortfaltNaturalytelse))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...(c=(j=o.parameters)==null?void 0:j.docs)==null?void 0:c.source}}};var g,f,k;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger\`, () => HttpResponse.json(flereBortfalteNaturalytelser))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...(k=(f=a.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var R,v,I;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger\`, () => HttpResponse.json(utenRefusjon))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...(I=(v=i.parameters)==null?void 0:v.docs)==null?void 0:I.source}}};var N,y,S;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger\`, () => HttpResponse.json(medDelvisRefusjon))])
    }
  },
  args: {
    saksnummer: '308',
    journalpostId: '1017115920'
  }
}`,...(S=(y=m.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var D,P,E;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger\`, () => HttpResponse.json(medRefusjon))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...(E=(P=p.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};var M,b,A;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: HANDLERS.concat([http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger\`, () => HttpResponse.json(medRefusjonsPerioder))])
    }
  },
  args: {
    saksnummer: '352011079',
    journalpostId: '1017115920'
  }
}`,...(A=(b=d.parameters)==null?void 0:b.docs)==null?void 0:A.source}}};const Ae=["EnBortfaltNaturalytelse","FlereBortfalteNaturalytelser","UtenRefusjon","DelvisRefusjon","MedRefusjon","Refusjonsperioder"];export{m as DelvisRefusjon,o as EnBortfaltNaturalytelse,a as FlereBortfalteNaturalytelser,p as MedRefusjon,d as Refusjonsperioder,i as UtenRefusjon,Ae as __namedExportsOrder,be as default};
