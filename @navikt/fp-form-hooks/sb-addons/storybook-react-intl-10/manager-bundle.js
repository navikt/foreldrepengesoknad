try{
(()=>{var w=__STORYBOOK_API__,{ActiveTabs:D,Consumer:v,ManagerContext:H,Provider:x,addons:s,combineParameters:M,controlOrMetaKey:U,controlOrMetaSymbol:F,eventMatchesShortcut:G,eventToShortcut:N,isMacLike:W,isShortcutTaken:K,keyToSymbol:Y,merge:V,mockChannel:q,optionOrAltSymbol:Z,shortcutMatchesShortcut:z,shortcutToHumanString:j,types:d,useAddonState:J,useArgTypes:Q,useArgs:$,useChannel:u,useGlobalTypes:X,useGlobals:p,useParameter:oo,useSharedState:no,useStoryPrepared:eo,useStorybookApi:co,useStorybookState:to}=__STORYBOOK_API__;var r=__REACT__,{Children:io,Component:so,Fragment:uo,Profiler:po,PureComponent:mo,StrictMode:So,Suspense:Co,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:ho,cloneElement:To,createContext:bo,createElement:_o,createFactory:Ao,createRef:go,forwardRef:ko,isValidElement:yo,lazy:Oo,memo:Bo,startTransition:Lo,unstable_act:fo,useCallback:Po,useContext:Ro,useDebugValue:Eo,useDeferredValue:wo,useEffect:Do,useId:vo,useImperativeHandle:Ho,useInsertionEffect:xo,useLayoutEffect:Mo,useMemo:Uo,useReducer:Fo,useRef:Go,useState:No,useSyncExternalStore:Wo,useTransition:Ko,version:Yo}=__REACT__;var jo=__STORYBOOK_COMPONENTS__,{A:Jo,ActionBar:Qo,AddonPanel:$o,Badge:Xo,Bar:on,Blockquote:nn,Button:en,ClipboardCode:cn,Code:tn,DL:rn,Div:In,DocumentWrapper:an,ErrorFormatter:ln,FlexBar:sn,Form:dn,H1:un,H2:pn,H3:mn,H4:Sn,H5:Cn,H6:hn,HR:Tn,IconButton:m,IconButtonSkeleton:bn,Icons:_n,Img:An,LI:gn,Link:kn,ListItem:yn,Loader:On,OL:Bn,P:Ln,Placeholder:fn,Pre:Pn,ResetWrapper:Rn,ScrollArea:En,Separator:wn,Spaced:Dn,Span:vn,StorybookIcon:Hn,StorybookLogo:xn,Symbols:Mn,SyntaxHighlighter:Un,TT:Fn,TabBar:Gn,TabButton:Nn,TabWrapper:Wn,Table:Kn,Tabs:Yn,TabsState:Vn,TooltipLinkList:S,TooltipMessage:qn,TooltipNote:Zn,UL:zn,WithTooltip:C,WithTooltipPure:jn,Zoom:Jn,codeCommon:Qn,components:$n,createCopyToClipboardFunction:Xn,getStoryHref:oe,icons:ne,interleaveSeparators:ee,nameSpaceClassNames:ce,resetComponents:te,withReset:re}=__STORYBOOK_COMPONENTS__;var se=__STORYBOOK_ICONS__,{AccessibilityAltIcon:de,AccessibilityIcon:ue,AddIcon:pe,AdminIcon:me,AlertAltIcon:Se,AlertIcon:Ce,AlignLeftIcon:he,AlignRightIcon:Te,AppleIcon:be,ArrowDownIcon:_e,ArrowLeftIcon:Ae,ArrowRightIcon:ge,ArrowSolidDownIcon:ke,ArrowSolidLeftIcon:ye,ArrowSolidRightIcon:Oe,ArrowSolidUpIcon:Be,ArrowUpIcon:Le,AzureDevOpsIcon:fe,BackIcon:Pe,BasketIcon:Re,BatchAcceptIcon:Ee,BatchDenyIcon:we,BeakerIcon:De,BellIcon:ve,BitbucketIcon:He,BoldIcon:xe,BookIcon:Me,BookmarkHollowIcon:Ue,BookmarkIcon:Fe,BottomBarIcon:Ge,BottomBarToggleIcon:Ne,BoxIcon:We,BranchIcon:Ke,BrowserIcon:Ye,ButtonIcon:Ve,CPUIcon:qe,CalendarIcon:Ze,CameraIcon:ze,CategoryIcon:je,CertificateIcon:Je,ChangedIcon:Qe,ChatIcon:$e,CheckIcon:Xe,ChevronDownIcon:oc,ChevronLeftIcon:nc,ChevronRightIcon:ec,ChevronSmallDownIcon:cc,ChevronSmallLeftIcon:tc,ChevronSmallRightIcon:rc,ChevronSmallUpIcon:Ic,ChevronUpIcon:ac,ChromaticIcon:lc,ChromeIcon:ic,CircleHollowIcon:sc,CircleIcon:dc,ClearIcon:uc,CloseAltIcon:pc,CloseIcon:mc,CloudHollowIcon:Sc,CloudIcon:Cc,CogIcon:hc,CollapseIcon:Tc,CommandIcon:bc,CommentAddIcon:_c,CommentIcon:Ac,CommentsIcon:gc,CommitIcon:kc,CompassIcon:yc,ComponentDrivenIcon:Oc,ComponentIcon:Bc,ContrastIcon:Lc,ControlsIcon:fc,CopyIcon:Pc,CreditIcon:Rc,CrossIcon:Ec,DashboardIcon:wc,DatabaseIcon:Dc,DeleteIcon:vc,DiamondIcon:Hc,DirectionIcon:xc,DiscordIcon:Mc,DocChartIcon:Uc,DocListIcon:Fc,DocumentIcon:Gc,DownloadIcon:Nc,DragIcon:Wc,EditIcon:Kc,EllipsisIcon:Yc,EmailIcon:Vc,ExpandAltIcon:qc,ExpandIcon:Zc,EyeCloseIcon:zc,EyeIcon:jc,FaceHappyIcon:Jc,FaceNeutralIcon:Qc,FaceSadIcon:$c,FacebookIcon:Xc,FailedIcon:ot,FastForwardIcon:nt,FigmaIcon:et,FilterIcon:ct,FlagIcon:tt,FolderIcon:rt,FormIcon:It,GDriveIcon:at,GithubIcon:lt,GitlabIcon:it,GlobeIcon:h,GoogleIcon:st,GraphBarIcon:dt,GraphLineIcon:ut,GraphqlIcon:pt,GridAltIcon:mt,GridIcon:St,GrowIcon:Ct,HeartHollowIcon:ht,HeartIcon:Tt,HomeIcon:bt,HourglassIcon:_t,InfoIcon:At,ItalicIcon:gt,JumpToIcon:kt,KeyIcon:yt,LightningIcon:Ot,LightningOffIcon:Bt,LinkBrokenIcon:Lt,LinkIcon:ft,LinkedinIcon:Pt,LinuxIcon:Rt,ListOrderedIcon:Et,ListUnorderedIcon:wt,LocationIcon:Dt,LockIcon:vt,MarkdownIcon:Ht,MarkupIcon:xt,MediumIcon:Mt,MemoryIcon:Ut,MenuIcon:Ft,MergeIcon:Gt,MirrorIcon:Nt,MobileIcon:Wt,MoonIcon:Kt,NutIcon:Yt,OutboxIcon:Vt,OutlineIcon:qt,PaintBrushIcon:Zt,PaperClipIcon:zt,ParagraphIcon:jt,PassedIcon:Jt,PhoneIcon:Qt,PhotoDragIcon:$t,PhotoIcon:Xt,PinAltIcon:or,PinIcon:nr,PlayBackIcon:er,PlayIcon:cr,PlayNextIcon:tr,PlusIcon:rr,PointerDefaultIcon:Ir,PointerHandIcon:ar,PowerIcon:lr,PrintIcon:ir,ProceedIcon:sr,ProfileIcon:dr,PullRequestIcon:ur,QuestionIcon:pr,RSSIcon:mr,RedirectIcon:Sr,ReduxIcon:Cr,RefreshIcon:hr,ReplyIcon:Tr,RepoIcon:br,RequestChangeIcon:_r,RewindIcon:Ar,RulerIcon:gr,SearchIcon:kr,ShareAltIcon:yr,ShareIcon:Or,ShieldIcon:Br,SideBySideIcon:Lr,SidebarAltIcon:fr,SidebarAltToggleIcon:Pr,SidebarIcon:Rr,SidebarToggleIcon:Er,SpeakerIcon:wr,StackedIcon:Dr,StarHollowIcon:vr,StarIcon:Hr,StickerIcon:xr,StopAltIcon:Mr,StopIcon:Ur,StorybookIcon:Fr,StructureIcon:Gr,SubtractIcon:Nr,SunIcon:Wr,SupportIcon:Kr,SwitchAltIcon:Yr,SyncIcon:Vr,TabletIcon:qr,ThumbsUpIcon:Zr,TimeIcon:zr,TimerIcon:jr,TransferIcon:Jr,TrashIcon:Qr,TwitterIcon:$r,TypeIcon:Xr,UbuntuIcon:oI,UndoIcon:nI,UnfoldIcon:eI,UnlockIcon:cI,UnpinIcon:tI,UploadIcon:rI,UserAddIcon:II,UserAltIcon:aI,UserIcon:lI,UsersIcon:iI,VSCodeIcon:sI,VerifiedIcon:dI,VideoIcon:uI,WandIcon:pI,WatchIcon:mI,WindowsIcon:SI,WrenchIcon:CI,YoutubeIcon:hI,ZoomIcon:TI,ZoomOutIcon:bI,ZoomResetIcon:_I,iconList:AI}=__STORYBOOK_ICONS__;var b="storybook/i18n-addon",_="storybook/i18n-addon/tool",A="LOCALE_CHANGED",g=o=>typeof o=="string"?{title:o}:{title:o.title||"",icon:o.icon,right:o.right},k=(o,a,I)=>o?Object.entries(o).map(([t,l])=>({...g(l),id:t,active:t===a,onClick:()=>I(t)})):[{id:"none",title:"No locales in parameters",active:!0,onClick:()=>{}}],y=()=>{let[o,a]=p(),{locale:I,locales:t}=o,l=u({});return r.createElement(C,{closeOnOutsideClick:!0,placement:"top",tooltip:({onHide:T})=>r.createElement(S,{links:k(t,I,i=>{i!==I&&(a({locale:i}),l(A,i)),T()})}),trigger:"click"},r.createElement(m,{key:"i18n-locale",title:"Locale Selector"},r.createElement(h,null)))},O=y;s.register(b,()=>{s.add(_,{title:"Storybook i18n",type:d.TOOL,match:({viewMode:o})=>!!o?.match(/^(story|docs)$/),render:O})});})();
}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }
