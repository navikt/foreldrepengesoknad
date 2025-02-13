import{j as t}from"./jsx-runtime-CLpGMVip.js";import{Q as k}from"./useQuery-D4bRZ7iC.js";import{h as g,H as d}from"./index-B-Pz4-0B.js";import{O as s}from"./routes-D6j-qr5i.js";import{Y as c}from"./Ytelse-7td-ciMh.js";import{E as o}from"./ForeldrepengeoversiktRoutes-C6p2N7xb.js";import{Q as f}from"./queryClient-DpQYMfvj.js";import{M as E,R as S,a as h}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./index-CR__hKHy.js";import"./decorators-DIzpaN6C.js";import"./UttaksplanKalender-OXkSQbe_.js";import"./dates-BoUBb6Xm.js";import"./index-DjWdgH6H.js";import"./iframe-ByeUE_v2.js";import"./dateFormValidation-CISUN9Py.js";import"./Label-uxnjPK_2.js";import"./useId-CID_lvh_.js";import"./Button-CDknUoqM.js";import"./composeEventHandlers-BV8udL3-.js";import"./links-Cq4ifjPA.js";import"./VStack-8aKLoWqK.js";import"./message-CzTHpKKo.js";import"./Alert-1u4Gr0Oy.js";import"./Link-DCG3SZwE.js";import"./File-lmocubeF.js";import"./UttaksdagenString-ClXtFMGX.js";import"./HGrid-DN2FVMEE.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./stønadskontoType-l1GAnwlP.js";import"./_baseIsEqual-Ca4dwh5c.js";import"./stringUtils-xBoGBqui.js";import"./ChevronDown-CtB47T9y.js";import"./Responsive-BA9B7nU-.js";import"./ArrowRight-DNLm8DIc.js";import"./index-BDNcHBiq.js";import"./Accordion-BFFdnJeN.js";import"./useBackgroundColor-CjyW9dsS.js";import"./useSelectedSak-C3cMD7ir.js";import"./api-DD3Y1hVe.js";import"./sakerUtils-Bk_ymF95.js";import"./Snarveier-B1VfhlOJ.js";import"./LenkePanel-Cpf6jKQt.js";import"./Dokument-C1jTZ74V.js";import"./dokumenterUtils-DxlPLxOZ.js";import"./Tag-ilehSkCp.js";import"./GrupperteDokumenter-DQJ-xLqn.js";import"./guid-CsArkN6i.js";import"./Header-BC_-essq.js";import"./LayoutWrapper-Cvi31uXS.js";import"./StatusTag-fyAQ8Z0C.js";import"./Stroller-CHl3Gahh.js";import"./NoeGikkGalt-C4qJeb2u.js";import"./MinidialogSkjema-BgvJh3uG.js";import"./skjemanummer-DfIZjofp.js";import"./BekreftelseSendtSøknad-BX1TKk9D.js";import"./KontonummerInfo-C1I8UpUo.js";import"./HarIkkeSaker-Bds8J5l4.js";import"./SøkelenkerPanel-CdUelz1f.js";import"./HarSaker-C7hSh1BK.js";import"./SakLink-CqRLVKpm.js";import"./ContentSection-7DyEQ1Ld.js";import"./DinPlan-DmOeGPB0.js";import"./DekningsgradDTO-DRRk0ium.js";import"./Oppgaver-Oa_MGqUi.js";import"./OppgaveLenkepanel-C9fgcDCZ.js";import"./KontaktOss-Dg5vZDd_.js";const R=new f({defaultOptions:{queries:{retry:!1}}}),Gt={title:"EttersendingPage",component:o,render:u=>t.jsx(k,{client:R,children:t.jsx(E,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(S,{children:t.jsx(h,{element:t.jsx(o,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[g.post(".//rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:c.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[g.post(".//rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:r.args};var n,p,a;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
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
}`,...(a=(p=r.parameters)==null?void 0:p.docs)==null?void 0:a.source}}};var m,i,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const Ht=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,r as SkalIkkeFeileOpplasting,Ht as __namedExportsOrder,Gt as default};
