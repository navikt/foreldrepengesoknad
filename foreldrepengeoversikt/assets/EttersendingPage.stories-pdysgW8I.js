import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as u,a as c}from"./useQuery-nySqyMyB.js";import{h as d,H as g}from"./index-B7jImiY8.js";import{O as o}from"./routes-Run26EI7.js";import{Y as k}from"./Ytelse-7td-ciMh.js";import{E as s}from"./ForeldrepengeoversiktRoutes-CljsoqHW.js";import{M as f,R as h,a as E}from"./index-DqI3wG_s.js";import"./index-CTjT7uj6.js";import"./decorators-DP8eTBZN.js";import"./Uttaksdagen-Bkz5oXqd.js";import"./dates-DUtd6zgH.js";import"./Snarveier-COn9woOy.js";import"./index-76BUWsog.js";import"./tslib.es6-C7pnyCjR.js";import"./links-BegG-28I.js";import"./useSelectedSak-Dcyju7m3.js";import"./api-2OGBCUqn.js";import"./sakerUtils-UJ_qs9hm.js";import"./_baseForOwn-BzfXl0Ph.js";import"./_getTag-Dwi3bFUE.js";import"./dateUtils-BIf_z0Mz.js";import"./Label-C_2a564_.js";import"./LinkPanel-Cpparcb1.js";import"./ChevronRight-Cbq2_cV6.js";import"./useId-BFxX0aRd.js";import"./ContentSection-Bg1AkEed.js";import"./Header-B2cINGkX.js";import"./react-B8sD8P77.js";import"./Breadcrumb-BjwUn-5H.js";import"./index-BQoWABHE.js";import"./index-9r8iugjR.js";import"./Link-D59AnNQS.js";import"./useId-BHtrcvnP.js";import"./StatusTag-MRVr4YUs.js";import"./Tag-SdNSLzrn.js";import"./HGrid-PWs16Klb.js";import"./VStack-CQ8vh05t.js";import"./useMergeRefs-Dg7ETiim.js";import"./Dokument-Ae-C8ili.js";import"./dokumenterUtils-BFmXBiiW.js";import"./GrupperteDokumenter-V2jibHLZ.js";import"./guid-CsArkN6i.js";import"./Accordion-BttdNS4q.js";import"./ChevronDown-CjGECSJR.js";import"./composeEventHandlers-DeH74NdU.js";import"./NoeGikkGalt-BM16JNz3.js";import"./Alert--vXQkOFI.js";import"./XMarkOctagonFill-BgBREcbx.js";import"./useBackgroundColor-Ci-Tlzwo.js";import"./MinidialogSkjema-C3Z_tKuK.js";import"./ByttBrowserModal-n9O1zc1F.js";import"./message-CSTrsXrr.js";import"./ExclamationmarkTriangle-CrbIB9PM.js";import"./index-BRV0Se7Z.js";import"./colors-BgDiWhW9.js";import"./BekreftelseSendtSøknad-AtI2Ep16.js";import"./KontonummerInfo-CMtP9mta.js";import"./HarIkkeSaker-DcrMXxdk.js";import"./HarSaker-BL_WBxoT.js";import"./stringUtils-avxv7LF_.js";import"./SakLink-BkhSG5BF.js";import"./EttersendDokumenter-DbmMYW8J.js";import"./SeDokumenter-nfZiz0hb.js";import"./SeHeleProsessen-DZWY8XbZ.js";import"./PeriodeListe-BOk3uM5n.js";import"./IconBox-i7pE5Y5l.js";import"./Oppgaver-CEgpTIbu.js";import"./OppgaveLenkepanel-ISX2J8TJ.js";import"./KontaktOss-k4fQ1MGR.js";const R=new u,Qt={title:"EttersendingPage",component:s,render:()=>t.jsx(c,{client:R,children:t.jsx(f,{initialEntries:[`/${o.ETTERSEND}/1`],children:t.jsx(h,{children:t.jsx(E,{element:t.jsx(s,{saker:{engangsstønad:[{ytelse:k.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}),path:`/${o.ETTERSEND}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[d.post("/rest/storage/engangsstonad/vedlegg",()=>new g(null,{status:200}))]}}},e={parameters:{msw:{handlers:[d.post("/rest/storage/engangsstonad/vedlegg",()=>new g(null,{status:400}))]}}};var p,m,i;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('/rest/storage/engangsstonad/vedlegg', () => new HttpResponse(null, {
        status: 200
      }))]
    }
  }
}`,...(i=(m=r.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var a,n,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('/rest/storage/engangsstonad/vedlegg', () => new HttpResponse(null, {
        status: 400
      }))]
    }
  }
}`,...(l=(n=e.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};const Gt=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,r as SkalIkkeFeileOpplasting,Gt as __namedExportsOrder,Qt as default};
