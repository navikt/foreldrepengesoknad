import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as k}from"./useQuery-BqYmVjEi.js";import{h as g,H as d}from"./index-Ey0twAil.js";import{Y as c}from"./Ytelse-7td-ciMh.js";import{O as s}from"./routes-D6j-qr5i.js";import{E as o}from"./ForeldrepengeoversiktRoutes-6E6TH4xC.js";import{M as f,R as h,a as v}from"./index-DROl5W8_.js";import{Q as E}from"./queryClient-dYgOrjC7.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./UttaksdagenString-BgBSX5Ao.js";import"./dates-JCHAmx_r.js";import"./index-CCQ3W5xA.js";import"./api-CiXCA4Ns.js";import"./stringUtils-BhrNUKGk.js";import"./Header-Ct39Br-j.js";import"./index-BXlQ-FBc.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./sakerUtils-BOg5fKiE.js";import"./_baseIteratee-ALi5R95-.js";import"./StatusTag-Dz76bBNV.js";import"./Tag-DNMWbfh9.js";import"./Label-BeJqMiuK.js";import"./HGrid-DG8Yyt2e.js";import"./VStack-BUk9K807.js";import"./useMergeRefs-DE1yqPfQ.js";import"./Responsive-o0xE1PD6.js";import"./Stroller-B-9_9B1W.js";import"./LenkePanel-CZXA2q2z.js";import"./index-bqFtOaxG.js";import"./index-vZN_Bsf0.js";import"./useBackgroundColor-DZK0wgKA.js";import"./Button-DsdktBMU.js";import"./composeEventHandlers-DeH74NdU.js";import"./Alert-BR4lzIiq.js";import"./BekreftelseSendtSøknad-0rmqayvS.js";import"./links-XBeNlE0K.js";import"./bemUtils-DmNyTjfb.js";import"./dokumenterUtils-CWDDNYO0.js";import"./File-CBdzl0Ak.js";import"./Link-gwHVuC8x.js";import"./KontonummerInfo-oYsnyG1L.js";import"./Accordion-b1_l-2oY.js";import"./ChevronDown-CyMHwesb.js";import"./message-Cw_mD2SY.js";import"./Snarveier-ix9j3aKB.js";import"./Dokument-Ty49bUK8.js";import"./GrupperteDokumenter-BaGDdqwN.js";import"./guid-CsArkN6i.js";import"./NoeGikkGalt-D7SXoYtn.js";import"./MinidialogSkjema-DzXBMwIw.js";import"./skjemanummer-CsrY1khI.js";import"./VeiviserPage-D9K_4dnz.js";import"./index-BRV0Se7Z.js";import"./HarIkkeSaker-Da8qothy.js";import"./ContentSection-B_6Fjlwm.js";import"./HarSaker-Br0DIw50.js";import"./SakLink-CRa5Rhh4.js";import"./Oppgaver-Bw6elW2e.js";import"./OppgaveLenkepanel-B1UIVbes.js";import"./KontaktOss-Z6U26xX9.js";const S=new E({defaultOptions:{queries:{retry:!1}}}),Nt={title:"EttersendingPage",component:o,render:u=>t.jsx(k,{client:S,children:t.jsx(f,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(h,{children:t.jsx(v,{element:t.jsx(o,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},e={parameters:{msw:{handlers:[g.post("https://oversikt/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:c.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[g.post("https://oversikt/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:e.args};var n,p,a;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('https://oversikt/rest/storage/engangsstonad/vedlegg', () => {
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
      handlers: [http.post('https://oversikt/rest/storage/engangsstonad/vedlegg', () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(l=(m=r.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const yt=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,yt as __namedExportsOrder,Nt as default};
