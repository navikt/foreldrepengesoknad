import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as c,a as k}from"./useQuery-D_fvW0PL.js";import{h as g,H as d}from"./index-Ey0twAil.js";import{O as s}from"./routes-Run26EI7.js";import{Y as f}from"./Ytelse-7td-ciMh.js";import{E as o}from"./ForeldrepengeoversiktRoutes-DfYkN-WV.js";import{M as h,R as E,a as S}from"./index-DOF3ycNb.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./dates-CTHUhP43.js";import"./Uttaksdagen-DdeI22r2.js";import"./index-CCQ3W5xA.js";import"./useBackgroundColor-DZK0wgKA.js";import"./Snarveier-B2xdo_Qg.js";import"./index-BdgkEI3a.js";import"./links-BegG-28I.js";import"./LenkePanel-BGBOHCDb.js";import"./index-Cn00N9t0.js";import"./index-vZN_Bsf0.js";import"./VStack-Dvme46cy.js";import"./Label-BeJqMiuK.js";import"./useMergeRefs-Dg7ETiim.js";import"./useId-BFxX0aRd.js";import"./api-DZHAPXBN.js";import"./sakerUtils-Bz7j-Zl6.js";import"./_baseIteratee-CNgr-98l.js";import"./_getTag-COHPfPRs.js";import"./dateUtils-D0G77c6u.js";import"./HGrid-BWUy42vz.js";import"./ContentSection-B_6Fjlwm.js";import"./Header-WBttiIpv.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./StatusTag-Crc04EW3.js";import"./Tag-DNMWbfh9.js";import"./Responsive-DRfM8C-c.js";import"./Stroller-JY-nL-ik.js";import"./Dokument-CmAt_1Bt.js";import"./dokumenterUtils-BQYuG4-b.js";import"./useId-BHtrcvnP.js";import"./Link-gwHVuC8x.js";import"./GrupperteDokumenter-BegOh4j2.js";import"./guid-CsArkN6i.js";import"./Accordion-JjU6DK1h.js";import"./ChevronDown-CjGECSJR.js";import"./composeEventHandlers-DeH74NdU.js";import"./NoeGikkGalt-DlxC0nx3.js";import"./Alert-CUYZmdUX.js";import"./Button-DnTWC_fD.js";import"./XMarkOctagonFill-BgBREcbx.js";import"./MinidialogSkjema-8_Xkr-hK.js";import"./VeiviserPage-DtLnhV2B.js";import"./bemUtils-DmNyTjfb.js";import"./message-AOa8Q-86.js";import"./ExclamationmarkTriangle-CrbIB9PM.js";import"./index-BRV0Se7Z.js";import"./colors-BgDiWhW9.js";import"./BekreftelseSendtSøknad-DtqAtifY.js";import"./stringUtils-avxv7LF_.js";import"./KontonummerInfo-B49ZpyU4.js";import"./HarIkkeSaker-D1nBz5eS.js";import"./HarSaker-ujvHy7lx.js";import"./SakLink-DW4OkW_q.js";import"./PeriodeListe-HDXh6Kdy.js";import"./IconBox-BoYJFxkf.js";import"./Oppgaver--aEolQ4N.js";import"./OppgaveLenkepanel-30fTfveI.js";import"./KontaktOss-pPVQo36n.js";const j=new c({defaultOptions:{queries:{retry:!1}}}),Ct={title:"EttersendingPage",component:o,render:u=>t.jsx(k,{client:j,children:t.jsx(h,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(E,{children:t.jsx(S,{element:t.jsx(o,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},e={parameters:{msw:{handlers:[g.post("/rest/storage/engangsstonad/vedlegg",()=>(console.log("test"),new d(null,{status:200})))]}},args:{saker:{engangsstønad:[{ytelse:f.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[g.post("/rest/storage/engangsstonad/vedlegg",()=>(console.log("test skal feile"),new d(null,{status:400})))]}},args:e.args};var n,p,a;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('/rest/storage/engangsstonad/vedlegg', () => {
        console.log('test');
        return new HttpResponse(null, {
          status: 200
        });
      })]
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
}`,...(a=(p=e.parameters)==null?void 0:p.docs)==null?void 0:a.source}}};var i,m,l;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('/rest/storage/engangsstonad/vedlegg', () => {
        console.log('test skal feile');
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(l=(m=r.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const It=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,It as __namedExportsOrder,Ct as default};
