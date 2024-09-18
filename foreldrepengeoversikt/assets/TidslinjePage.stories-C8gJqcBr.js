import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as l,a as d}from"./useQuery-CY6KkctN.js";import{h as o,H as e}from"./index-C1uWNzPf.js";import{t as g,m as j}from"./tidslinjeHendelser-BDT2VQVF.js";import{s as f}from"./saker-C0JViQRW.js";import{O as i}from"./routes-Run26EI7.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CinrL1EH.js";import{M as k,R as u,a as c}from"./index-BK5YD3Eg.js";import"./index-CTjT7uj6.js";import"./decorators-DP8eTBZN.js";import"./Uttaksdagen-Bkz5oXqd.js";import"./dates-DUtd6zgH.js";import"./Snarveier-B0i30urM.js";import"./index-DnmOyZDY.js";import"./links-BegG-28I.js";import"./useSelectedSak-DMNwml2H.js";import"./api-BmJ5658F.js";import"./sakerUtils-S3oFvgqY.js";import"./_baseIteratee-CPBdszNX.js";import"./_getTag-Bh8w3XMl.js";import"./isFunction-CCU-qS27.js";import"./_overArg-w2jqAdKJ.js";import"./Ytelse-7td-ciMh.js";import"./dateUtils-BIf_z0Mz.js";import"./Label-DI1hapHN.js";import"./LinkPanel-BH3zccDo.js";import"./ChevronRight-Cbq2_cV6.js";import"./useId-BHtrcvnP.js";import"./ContentSection-DEhOJ2zx.js";import"./Header-V_RN9OGW.js";import"./react-DKFOadDt.js";import"./Breadcrumb-ClKoZ4RL.js";import"./index-BD0lb3_z.js";import"./index-CYM-y3Gt.js";import"./Link-DOX29Uo4.js";import"./useId-BFxX0aRd.js";import"./StatusTag-kq4Xscpa.js";import"./Tag-DySx6g-E.js";import"./HGrid-c4MUBGlc.js";import"./VStack-DAdWZtn3.js";import"./useMergeRefs-Dg7ETiim.js";import"./Dokument-BSb8lqHF.js";import"./dokumenterUtils-DnduGNvw.js";import"./GrupperteDokumenter-Dhg-9S-W.js";import"./guid-CsArkN6i.js";import"./Accordion-Crybvfb9.js";import"./ChevronDown-CjGECSJR.js";import"./composeEventHandlers-DeH74NdU.js";import"./NoeGikkGalt-DyvSN5dH.js";import"./Alert-VUqTQ4T6.js";import"./XMarkOctagonFill-BgBREcbx.js";import"./useBackgroundColor-D4ksQeHz.js";import"./MinidialogSkjema-6uWIU6n-.js";import"./VeiviserPage-DQEzWUph.js";import"./message-CHiw6Zgx.js";import"./ExclamationmarkTriangle-CrbIB9PM.js";import"./index-BRV0Se7Z.js";import"./colors-BgDiWhW9.js";import"./BekreftelseSendtSøknad-8DuQDwxk.js";import"./KontonummerInfo-DU_1Eksx.js";import"./HarIkkeSaker-C1D14_ST.js";import"./HarSaker-BrNxKoxu.js";import"./stringUtils-avxv7LF_.js";import"./SakLink-a1pF-klk.js";import"./EttersendDokumenter-Sa1taJTn.js";import"./SeDokumenter-DRrVuUAY.js";import"./SeHeleProsessen-B3X1ANaL.js";import"./PeriodeListe-B9jb4F4i.js";import"./IconBox-i7pE5Y5l.js";import"./Oppgaver-WdKsW25C.js";import"./OppgaveLenkepanel-zV8zh3YZ.js";import"./KontaktOss-COX08eNX.js";const h=new l,Kt={title:"TidslinjePage",component:m,render:a=>t.jsx(d,{client:h,children:t.jsx(k,{initialEntries:[`/${i.TIDSLINJEN}/352011079`],children:t.jsx(u,{children:t.jsx(c,{element:t.jsx(m,{...a}),path:`/${i.TIDSLINJEN}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[o.get("/rest/innsyn/v2/saker",()=>e.json(f)),o.get("/rest/innsyn/tidslinje",()=>e.json(g)),o.get("/rest/historikk/vedlegg",()=>e.json(j))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var s,p,n;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('/rest/innsyn/v2/saker', () => HttpResponse.json(saker)), http.get('/rest/innsyn/tidslinje', () => HttpResponse.json(tidslinjeHendelser)), http.get('/rest/historikk/vedlegg', () => HttpResponse.json(manglendeVedlegg))]
    }
  },
  args: {
    søkersBarn: [{
      fornavn: 'Olga',
      etternavn: 'Utvikler',
      fnr: '23232424',
      fødselsdato: '2024-01-01',
      kjønn: 'K'
    }]
  }
}`,...(n=(p=r.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};const Lt=["Default"];export{r as Default,Lt as __namedExportsOrder,Kt as default};
