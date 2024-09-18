import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as k,a as c}from"./useQuery-CY6KkctN.js";import{h as g,H as d}from"./index-C1uWNzPf.js";import{O as s}from"./routes-Run26EI7.js";import{Y as f}from"./Ytelse-7td-ciMh.js";import{E as o}from"./ForeldrepengeoversiktRoutes-D4_hoZk_.js";import{M as h,R as E,a as S}from"./index-BK5YD3Eg.js";import"./index-CTjT7uj6.js";import"./decorators-DP8eTBZN.js";import"./Uttaksdagen-Bkz5oXqd.js";import"./dates-DUtd6zgH.js";import"./Snarveier-B0i30urM.js";import"./index-DnmOyZDY.js";import"./links-BegG-28I.js";import"./useSelectedSak-DMNwml2H.js";import"./api-BmJ5658F.js";import"./sakerUtils-S3oFvgqY.js";import"./_baseIteratee-CPBdszNX.js";import"./_getTag-Bh8w3XMl.js";import"./isFunction-CCU-qS27.js";import"./_overArg-w2jqAdKJ.js";import"./dateUtils-BIf_z0Mz.js";import"./Label-DI1hapHN.js";import"./LinkPanel-BH3zccDo.js";import"./ChevronRight-Cbq2_cV6.js";import"./useId-BFxX0aRd.js";import"./ContentSection-DEhOJ2zx.js";import"./Header-V_RN9OGW.js";import"./react-DKFOadDt.js";import"./Breadcrumb-ClKoZ4RL.js";import"./index-BD0lb3_z.js";import"./index-CYM-y3Gt.js";import"./Link-DOX29Uo4.js";import"./useId-BHtrcvnP.js";import"./StatusTag-kq4Xscpa.js";import"./Tag-DySx6g-E.js";import"./HGrid-c4MUBGlc.js";import"./VStack-DAdWZtn3.js";import"./useMergeRefs-Dg7ETiim.js";import"./Dokument-BSb8lqHF.js";import"./dokumenterUtils-DnduGNvw.js";import"./GrupperteDokumenter-Dhg-9S-W.js";import"./guid-CsArkN6i.js";import"./Accordion-Crybvfb9.js";import"./ChevronDown-CjGECSJR.js";import"./composeEventHandlers-DeH74NdU.js";import"./NoeGikkGalt-DyvSN5dH.js";import"./Alert-VUqTQ4T6.js";import"./XMarkOctagonFill-BgBREcbx.js";import"./useBackgroundColor-D4ksQeHz.js";import"./MinidialogSkjema-DwKA6Y5S.js";import"./VeiviserPage-C4GqGTMy.js";import"./message-CHiw6Zgx.js";import"./ExclamationmarkTriangle-CrbIB9PM.js";import"./index-BRV0Se7Z.js";import"./colors-BgDiWhW9.js";import"./BekreftelseSendtSøknad-8DuQDwxk.js";import"./KontonummerInfo-DU_1Eksx.js";import"./HarIkkeSaker-C1D14_ST.js";import"./HarSaker-BrNxKoxu.js";import"./stringUtils-avxv7LF_.js";import"./SakLink-a1pF-klk.js";import"./EttersendDokumenter-Sa1taJTn.js";import"./SeDokumenter-DRrVuUAY.js";import"./SeHeleProsessen-B3X1ANaL.js";import"./PeriodeListe-B9jb4F4i.js";import"./IconBox-i7pE5Y5l.js";import"./Oppgaver-WdKsW25C.js";import"./OppgaveLenkepanel-zV8zh3YZ.js";import"./KontaktOss-COX08eNX.js";const j=new k,Qt={title:"EttersendingPage",component:o,render:u=>t.jsx(c,{client:j,children:t.jsx(h,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(E,{children:t.jsx(S,{element:t.jsx(o,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[g.post("/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:f.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[g.post("/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:r.args};var p,n,a;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('/rest/storage/engangsstonad/vedlegg', () => new HttpResponse(null, {
        status: 200
      }))]
    }
  },
  args: {
    saker: {
      engangsstønad: [{
        ytelse: Ytelse.ENGANGSSTØNAD,
        saksnummer: '1',
        sakAvsluttet: false,
        gjelderAdopsjon: false,
        familiehendelse: {
          fødselsdato: '2020-01-01',
          antallBarn: 1
        },
        oppdatertTidspunkt: '2024-02-28T21:19:08.911'
      }],
      foreldrepenger: [],
      svangerskapspenger: []
    }
  }
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};var i,m,l;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('/rest/storage/engangsstonad/vedlegg', () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(l=(m=e.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const Yt=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,r as SkalIkkeFeileOpplasting,Yt as __namedExportsOrder,Qt as default};
