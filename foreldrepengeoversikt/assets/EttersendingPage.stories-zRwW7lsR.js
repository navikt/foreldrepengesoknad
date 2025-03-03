import{j as t}from"./jsx-runtime-CLpGMVip.js";import{Q as k}from"./useQuery-D4bRZ7iC.js";import{h as g,H as d}from"./index-B-Pz4-0B.js";import{O as s}from"./routes-D6j-qr5i.js";import{Y as c}from"./Ytelse-7td-ciMh.js";import{E as o}from"./ForeldrepengeoversiktRoutes-CxwN8Q_c.js";import{Q as f}from"./queryClient-DpQYMfvj.js";import{M as E,R as S,a as h}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./index-CR__hKHy.js";import"./decorators-DIzpaN6C.js";import"./UttaksplanKalender-DARBr-X2.js";import"./dates-Ch5Wtujs.js";import"./index-DjWdgH6H.js";import"./iframe-3hx1ScN8.js";import"./dateFormValidation-DFSt-iQw.js";import"./Label-uxnjPK_2.js";import"./useId-CID_lvh_.js";import"./links-Cq4ifjPA.js";import"./VStack-xsqAeGIc.js";import"./message-CzTHpKKo.js";import"./Alert-CzTQImhr.js";import"./Button-TID81GkK.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-DCG3SZwE.js";import"./File-lmocubeF.js";import"./UttaksdagenString-Du8CFmse.js";import"./HGrid-CaP7582m.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./stønadskontoType-l1GAnwlP.js";import"./_baseIsEqual-Ca4dwh5c.js";import"./stringUtils-xBoGBqui.js";import"./ChevronDown-CtB47T9y.js";import"./Responsive-BJBwe6-C.js";import"./ArrowRight-DNLm8DIc.js";import"./index-BDNcHBiq.js";import"./Accordion-B5N9WBXj.js";import"./Checkmark-DJs5cfYY.js";import"./useBackgroundColor-CjyW9dsS.js";import"./useSelectedSak-cmBlo-Cd.js";import"./api-BLZsujro.js";import"./sakerUtils-DRp6qHjv.js";import"./Snarveier-DZM5qQBl.js";import"./LenkePanel-hyQ4uTQx.js";import"./Dokument-BHif_y-U.js";import"./dokumenterUtils-BgjtbbvA.js";import"./Tag-ilehSkCp.js";import"./GrupperteDokumenter-66I__nge.js";import"./guid-CsArkN6i.js";import"./Header-OWeksKd5.js";import"./LayoutWrapper-Cvi31uXS.js";import"./StatusTag-fyAQ8Z0C.js";import"./Stroller-CHl3Gahh.js";import"./NoeGikkGalt-m7-hftPj.js";import"./MinidialogSkjema-BIb_hX7c.js";import"./skjemanummer-DfIZjofp.js";import"./BekreftelseSendtSøknad-DGBXW9Fe.js";import"./KontonummerInfo-DORKr00F.js";import"./HarIkkeSaker-DXb5aq9g.js";import"./SøkelenkerPanel-c13jPFNs.js";import"./HarSaker-Bpyk66B1.js";import"./SakLink-HTGRgqnC.js";import"./ContentSection-7DyEQ1Ld.js";import"./DinPlan-DRHtSn-7.js";import"./DekningsgradDTO-DRRk0ium.js";import"./Oppgaver-B43Jnw92.js";import"./OppgaveLenkepanel-1wY4h8RV.js";import"./KontaktOss-BZMzHklQ.js";const R=new f({defaultOptions:{queries:{retry:!1}}}),Ht={title:"EttersendingPage",component:o,render:u=>t.jsx(k,{client:R,children:t.jsx(E,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(S,{children:t.jsx(h,{element:t.jsx(o,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[g.post(".//rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:c.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[g.post(".//rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:r.args};var n,p,a;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const Qt=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,r as SkalIkkeFeileOpplasting,Qt as __namedExportsOrder,Ht as default};
