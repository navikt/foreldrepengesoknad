import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as k,a as c}from"./useQuery-D_fvW0PL.js";import{h as g,H as d}from"./index-CQPv6-if.js";import{O as s}from"./routes-Run26EI7.js";import{Y as f}from"./Ytelse-7td-ciMh.js";import{E as o}from"./ForeldrepengeoversiktRoutes-BRSlKW1H.js";import{M as h,R as E,a as S}from"./index-DOF3ycNb.js";import"./index-CTjT7uj6.js";import"./decorators-Bo_HQzC9.js";import"./Uttaksdagen-DwtUqmsK.js";import"./dates-DUtd6zgH.js";import"./Snarveier-DVwRXHoE.js";import"./index-ghK6WsM8.js";import"./links-BegG-28I.js";import"./useSelectedSak-BWvfacv1.js";import"./api-BmJ5658F.js";import"./sakerUtils-CFuCOq9V.js";import"./_baseIteratee-CNgr-98l.js";import"./_getTag-COHPfPRs.js";import"./dateUtils-C9nG-ATC.js";import"./Label-BeJqMiuK.js";import"./LinkPanel-8JOQjw2Y.js";import"./ChevronRight-Cbq2_cV6.js";import"./useId-BFxX0aRd.js";import"./ContentSection-lsJTM0CJ.js";import"./Header-BnnqTva6.js";import"./react-DKFOadDt.js";import"./Breadcrumb-BkZm16I2.js";import"./index-Cn00N9t0.js";import"./index-vZN_Bsf0.js";import"./Link-gwHVuC8x.js";import"./useId-BHtrcvnP.js";import"./StatusTag-CDsYV62f.js";import"./Tag-DNMWbfh9.js";import"./HGrid-Coi4quVK.js";import"./VStack-CislUPit.js";import"./useMergeRefs-Dg7ETiim.js";import"./Dokument-J-w-nvx7.js";import"./dokumenterUtils-DnduGNvw.js";import"./GrupperteDokumenter-40kCl1zf.js";import"./guid-CsArkN6i.js";import"./Accordion-JjU6DK1h.js";import"./ChevronDown-CjGECSJR.js";import"./composeEventHandlers-DeH74NdU.js";import"./NoeGikkGalt-C1fqRRjt.js";import"./Alert-CVpGPMbJ.js";import"./XMarkOctagonFill-BgBREcbx.js";import"./useBackgroundColor-D4ksQeHz.js";import"./MinidialogSkjema-BVZHSpui.js";import"./VeiviserPage-DBPyyJ_p.js";import"./message-CSZdADn6.js";import"./ExclamationmarkTriangle-CrbIB9PM.js";import"./index-BRV0Se7Z.js";import"./colors-BgDiWhW9.js";import"./BekreftelseSendtSøknad-BfxcD1qn.js";import"./KontonummerInfo-DiJWAh76.js";import"./HarIkkeSaker-DIkJBe9a.js";import"./HarSaker-DPpepLvp.js";import"./stringUtils-avxv7LF_.js";import"./SakLink-O0TqAPJc.js";import"./EttersendDokumenter-5ZLtHUDI.js";import"./SeDokumenter-ZrXfLbEH.js";import"./SeHeleProsessen-CEEJQaX9.js";import"./PeriodeListe-DF2gM7C-.js";import"./IconBox-8BY7_NEg.js";import"./Oppgaver-DS0SBK4D.js";import"./OppgaveLenkepanel-rqPLm3ig.js";import"./KontaktOss-DfmDqRcv.js";const j=new k,It={title:"EttersendingPage",component:o,render:u=>t.jsx(c,{client:j,children:t.jsx(h,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(E,{children:t.jsx(S,{element:t.jsx(o,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[g.post("/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:f.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[g.post("/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:r.args};var p,n,a;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(l=(m=e.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const Pt=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,r as SkalIkkeFeileOpplasting,Pt as __namedExportsOrder,It as default};
