import * as React from 'react';

import {
    Arbeidsform,
    Oppholdsperiode,
    Periodetype,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    TilgjengeligStønadskonto,
    Periode,
    isUtsettelsesperiode,
} from '../../../../types/uttaksplan/periodetyper';
import UtsettelsePgaSykdomPart, { UtsettelsePgaSykdomChangePayload } from './partials/UtsettelsePgaSykdomPart';
import UtsettelsePgaFerieInfo from './UtsettelsePgaFerieInfo';
import { Forelder, Tidsperiode, TidsperiodeString } from 'common/types';
import { harAktivtArbeidsforhold } from '../../../../util/domain/arbeidsforhold';
import { getUtsettelseFormVisibility, UtsettelseSpørsmålKeys } from './utsettelseFormConfig';
import HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål from '../../../../spørsmål/HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import Arbeidsforhold from '../../../../types/Arbeidsforhold';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { injectIntl, FormattedMessage, IntlShape } from 'react-intl';
import { RecursivePartial } from '../../../../types/Partial';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import NyPeriodeKnapperad from '../nyPeriodeForm/NyPeriodeKnapperad';
import AktivitetskravMorBolk from '../AktivitetskravMorBolk';
import HvorSkalDuJobbeSpørsmålFlervalg from 'app/spørsmål/HvorSkalDuJobbeSpørsmålFlervalg';
import { EndrePeriodeChangeEvent } from '../endrePeriodeForm/EndrePeriodeForm';
import { Tidsperioden, isValidTidsperiode } from '../../../../util/uttaksplan/Tidsperioden';
import AlertStripe from 'nav-frontend-alertstriper';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';
import { selectSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { Søknadsinfo } from 'app/selectors/types';
import { selectTilgjengeligeStønadskontoer } from 'app/selectors/apiSelector';
import { Periodene } from 'app/util/uttaksplan/Periodene';
import { getTidsperioderIUttaksplan } from 'app/util/uttaksplan';
import JaNeiSpørsmål from 'common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';
import { RadioProps } from 'nav-frontend-skjema';
import { ValidFormContext, ValidFormContextInterface } from 'common/lib/validation/elements/ValiderbarForm';
import VedleggSpørsmål from 'app/components/skjema/vedleggSpørsmål/VedleggSpørsmål';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { Skjemanummer } from 'app/types/søknad/Søknad';
import {
    mapTidsperiodeStringToTidsperiode,
    mapTidsperiodeToTidsperiodeString,
} from '../../../../util/tidsperiodeUtils';
import UtsettelseEndreTidsperiodeSpørsmål from './partials/UtsettelseEndreTidsperiodeSpørsmål';
import TidsperiodeDisplay from '../tidsperiodeDisplay/TidsperiodeDisplay';
import TidsperiodeForm from '../tidsperiodeForm/TidsperiodeForm';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik/lib';

export type UtsettelseFormPeriodeType = RecursivePartial<Utsettelsesperiode> | RecursivePartial<Oppholdsperiode>;

interface OwnProps {
    periode: UtsettelseFormPeriodeType;
    antallFeriedager: number;
    harOverlappendePerioder?: boolean;
    onChange: EndrePeriodeChangeEvent;
    onCancel?: () => void;
    onUtsettelsesvariantChange?: (utsettelsesvariant: Utsettelsesvariant | undefined) => void;
    intl: IntlShape;
    erNyPeriode: boolean;
    periodeHarUbesvarteSpørsmål: boolean;
}

interface StateProps {
    arbeidsforhold: Arbeidsforhold[];
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    søknadsinfo: Søknadsinfo;
    uttaksplan: Periode[];
}

type Props = OwnProps & StateProps;

interface State {
    tidsperiodeIsOpen: boolean;
    variant?: Utsettelsesvariant;
    ugyldigTidsperiode?: TidsperiodeString;
}

export enum Utsettelsesvariant {
    Ferie = 'ferie',
    Arbeid = 'arbeid',
    Sykdom = 'sykdom',
    HvØvelse = 'hv_øvelse',
    NavTiltak = 'nav_tiltak',
    Fri = 'fri',
}

export const getVariantFromPeriode = (periode: UtsettelseFormPeriodeType): Utsettelsesvariant | undefined => {
    switch (periode.årsak) {
        case UtsettelseÅrsakType.Arbeid:
            return Utsettelsesvariant.Arbeid;
        case UtsettelseÅrsakType.Ferie:
            return Utsettelsesvariant.Ferie;
        case UtsettelseÅrsakType.HvØvelse:
            return Utsettelsesvariant.HvØvelse;
        case UtsettelseÅrsakType.NavTiltak:
            return Utsettelsesvariant.NavTiltak;
        case UtsettelseÅrsakType.Sykdom:
        case UtsettelseÅrsakType.InstitusjonBarnet:
        case UtsettelseÅrsakType.InstitusjonSøker:
            return Utsettelsesvariant.Sykdom;
        case UtsettelseÅrsakType.Fri:
            return Utsettelsesvariant.Fri;
        default:
            return undefined;
    }
};

const getVeilederForFrilansOgSNVisible = (periode: UtsettelseFormPeriodeType) => {
    const castPeriode = periode as Utsettelsesperiode;

    return (
        castPeriode.erArbeidstaker === false &&
        castPeriode.arbeidsformer !== undefined &&
        (castPeriode.arbeidsformer.includes(Arbeidsform.frilans) ||
            castPeriode.arbeidsformer.includes(Arbeidsform.selvstendignæringsdrivende))
    );
};

const overlapperUtsettelseAndreUtsettelser = (periode: Partial<Periode>, uttaksplan: Periode[]): boolean => {
    const utsettelser = Periodene(uttaksplan).getUtsettelser();
    return isValidTidsperiode(periode.tidsperiode)
        ? Periodene(utsettelser).finnOverlappendePerioder(periode as Periode).length > 0
        : false;
};

type FormContextProps = Props & {
    formContext: ValidFormContextInterface;
};

class UtsettelsesperiodeForm extends React.Component<FormContextProps, State> {
    constructor(props: FormContextProps) {
        super(props);
        this.onVariantChange = this.onVariantChange.bind(this);
        this.onSykdomÅrsakChange = this.onSykdomÅrsakChange.bind(this);
        this.getVisibility = this.getVisibility.bind(this);
        this.oppdaterTidsperiode = this.oppdaterTidsperiode.bind(this);
        this.handleAvbrytTidsperiode = this.handleAvbrytTidsperiode.bind(this);
        this.toggleVisTidsperiode = this.toggleVisTidsperiode.bind(this);
        this.state = {
            variant: getVariantFromPeriode(props.periode),
            tidsperiodeIsOpen: false,
        };
    }

    componentDidMount() {
        if (this.props.formContext && this.props.periode.id) {
            this.props.formContext.validateAll();
        }
    }

    onChange(periode: UtsettelseFormPeriodeType, replace = false) {
        this.props.onChange(periode, replace, this.getVisibility());
        if (this.props.formContext && this.props.periode.id) {
            this.props.formContext.validateAll();
        }
    }

    getUtsettelseÅrsakRadios(disableFerie: boolean, skalViseGamleUtsettelseÅrsaker: boolean): RadioProps[] {
        const { søknadsinfo, intl } = this.props;

        const allRadios: RadioProps[] = [
            {
                label: getMessage(intl, 'jegskalhaferie'),
                value: Utsettelsesvariant.Ferie,
                disabled: disableFerie === true,
                name: 'utsettelseÅrsak',
            },
            {
                label: getMessage(intl, 'jegskaljobbeheltid'),
                value: Utsettelsesvariant.Arbeid,
                name: 'utsettelseÅrsak',
            },
            {
                label: getMessage(intl, 'pgasykdom'),
                value: Utsettelsesvariant.Sykdom,
                name: 'utsettelseÅrsak',
            },
            {
                label: getMessage(intl, 'hv_øvelse'),
                value: Utsettelsesvariant.HvØvelse,
                name: 'utsettelseÅrsak',
            },
            {
                label: getMessage(intl, 'navtiltak'),
                value: Utsettelsesvariant.NavTiltak,
                name: 'utsettelseÅrsak',
            },
            {
                label: getMessage(intl, 'fri'),
                value: Utsettelsesvariant.Fri,
                name: 'utsettelseÅrsak',
            },
        ];

        const defaultRadios = allRadios.filter((option) => {
            if (skalViseGamleUtsettelseÅrsaker) {
                return true;
            }

            return option.value === Utsettelsesvariant.Sykdom || option.value === Utsettelsesvariant.Fri;
        });

        if (
            søknadsinfo.søker.erAleneOmOmsorg ||
            !søknadsinfo.annenForelder.harRett ||
            søknadsinfo.annenForelder.kanIkkeOppgis
        ) {
            return defaultRadios;
        }

        return [...defaultRadios];
    }

    onVariantChange(variant: Utsettelsesvariant) {
        if (variant !== this.state.variant) {
            const forelder =
                this.props.søknadsinfo.søker.erFarEllerMedmor === false ? Forelder.mor : Forelder.farMedmor;
            if (variant === Utsettelsesvariant.Arbeid) {
                this.onChange({
                    type: Periodetype.Utsettelse,
                    årsak: UtsettelseÅrsakType.Arbeid,
                    forelder,
                    erArbeidstaker: this.props.arbeidsforhold.length > 0,
                });
            } else if (variant === Utsettelsesvariant.Ferie) {
                this.onChange({
                    type: Periodetype.Utsettelse,
                    årsak: UtsettelseÅrsakType.Ferie,
                    forelder,
                    erArbeidstaker: this.props.arbeidsforhold.length > 0,
                });
            } else if (variant === Utsettelsesvariant.Sykdom) {
                this.onChange({
                    type: Periodetype.Utsettelse,
                    årsak: undefined,
                    forelder,
                    erArbeidstaker: this.props.arbeidsforhold.length > 0,
                });
            } else if (variant === Utsettelsesvariant.HvØvelse) {
                this.onChange({
                    type: Periodetype.Utsettelse,
                    årsak: UtsettelseÅrsakType.HvØvelse,
                    forelder,
                    erArbeidstaker: this.props.arbeidsforhold.length > 0,
                });
            } else if (variant === Utsettelsesvariant.NavTiltak) {
                this.onChange({
                    type: Periodetype.Utsettelse,
                    årsak: UtsettelseÅrsakType.NavTiltak,
                    forelder,
                    erArbeidstaker: this.props.arbeidsforhold.length > 0,
                });
            } else if (variant === Utsettelsesvariant.Fri) {
                this.onChange({
                    type: Periodetype.Utsettelse,
                    årsak: UtsettelseÅrsakType.Fri,
                    erArbeidstaker: this.props.arbeidsforhold.length > 0,
                });
            }
        }
        this.setState({
            variant,
        });
        if (this.props.onUtsettelsesvariantChange) {
            this.props.onUtsettelsesvariantChange(variant);
        }
    }

    onSykdomÅrsakChange({ sykdomsårsak, vedlegg }: UtsettelsePgaSykdomChangePayload) {
        if (sykdomsårsak === UtsettelseÅrsakType.InstitusjonBarnet) {
            this.onChange({
                årsak: UtsettelseÅrsakType.InstitusjonBarnet,
                vedlegg,
            });
        } else if (sykdomsårsak === UtsettelseÅrsakType.InstitusjonSøker) {
            this.onChange({
                årsak: UtsettelseÅrsakType.InstitusjonSøker,
                vedlegg,
            });
        } else if (sykdomsårsak === UtsettelseÅrsakType.Sykdom) {
            this.onChange({
                årsak: UtsettelseÅrsakType.Sykdom,
                vedlegg,
            });
        } else {
            throw new Error('No sykdomsårsak defined');
        }
    }

    getVisibility() {
        const { periode, søknadsinfo, arbeidsforhold } = this.props;
        const { variant } = this.state;

        return getUtsettelseFormVisibility({
            variant,
            periode,
            søknadsinfo,
            arbeidsforhold,
        });
    }

    oppdaterTidsperiode(tidsperiode: Partial<TidsperiodeString>) {
        const { periode, uttaksplan } = this.props;
        if (isValidTidsperiode(tidsperiode)) {
            const p = { ...periode, tidsperiode };
            const overlapperAndreUtsettelser = overlapperUtsettelseAndreUtsettelser(p as Periode, uttaksplan);
            if (overlapperAndreUtsettelser === false) {
                this.setState({ ugyldigTidsperiode: undefined });
                this.onChange({ tidsperiode: mapTidsperiodeStringToTidsperiode(tidsperiode) });
            } else {
                this.setState({ ugyldigTidsperiode: tidsperiode });
            }
        } else {
            this.setState({ ugyldigTidsperiode: undefined });
            this.onChange({ tidsperiode: mapTidsperiodeStringToTidsperiode(tidsperiode) });
        }
    }

    handleAvbrytTidsperiode() {
        this.setState({
            ...this.state,
            tidsperiodeIsOpen: false,
        });
    }

    toggleVisTidsperiode() {
        this.setState({
            ...this.state,
            tidsperiodeIsOpen: !this.state.tidsperiodeIsOpen,
        });
    }

    render() {
        const {
            periode,
            antallFeriedager,
            arbeidsforhold,
            onCancel,
            søknadsinfo,
            uttaksplan,
            periodeHarUbesvarteSpørsmål,
            intl,
        } = this.props;

        const { variant } = this.state;

        const visibility = this.getVisibility();

        if (visibility === undefined) {
            return null;
        }
        const tidsperiode = periode.tidsperiode as Partial<Tidsperiode>;
        const antallHelligdager = Tidsperioden(tidsperiode).getAntallFridager();
        const antallUttaksdager = Tidsperioden(tidsperiode).getAntallUttaksdager();
        const kunHelligdager = antallHelligdager === antallUttaksdager;

        const visInfoOmHelligdagerOgFerie =
            antallHelligdager > 0 &&
            periode.type === Periodetype.Utsettelse &&
            periode.årsak === UtsettelseÅrsakType.Ferie;

        const utsettelser = Periodene(uttaksplan).getUtsettelser();
        const ugyldigeTidsperioder = søknadsinfo.søknaden.harGjenskaptUttaksplanFraEkisterendeSak
            ? undefined
            : getTidsperioderIUttaksplan(utsettelser, periode.id);

        const overlapperAndreUtsettelser = overlapperUtsettelseAndreUtsettelser(periode as Periode, uttaksplan);
        const harDeltidUtenAvtaleMedArbeidsgiver =
            isUtsettelsesperiode(periode) && periode.harAvtaleOmFulltidForDeltidsstilling === false;
        const { familiehendelsesdato } = søknadsinfo.søknaden;
        const skalViseGamleUtsettelseÅrsaker = false; // Utsettelseårsaker som gjelder for søknader sendt før 1. oktober 2021

        return (
            <>
                <Block visible={!isValidTidsperiode(tidsperiode)}>
                    <TidsperiodeForm
                        familiehendelsesdato={familiehendelsesdato}
                        onBekreft={(v) => {
                            this.oppdaterTidsperiode(v);
                        }}
                        ugyldigeTidsperioder={ugyldigeTidsperioder}
                        tidsperiode={mapTidsperiodeToTidsperiodeString(tidsperiode)}
                        onCancel={onCancel}
                    />
                </Block>
                <Block visible={isValidTidsperiode(tidsperiode)} hasChildBlocks={true}>
                    <Block>
                        <TidsperiodeDisplay
                            tidsperiode={periode.tidsperiode}
                            toggleVisTidsperiode={this.toggleVisTidsperiode}
                        />
                        <UtsettelseEndreTidsperiodeSpørsmål
                            familiehendelsesdato={familiehendelsesdato}
                            ugyldigeTidsperioder={ugyldigeTidsperioder}
                            onBekreft={(v) => {
                                this.oppdaterTidsperiode(v);
                                this.toggleVisTidsperiode();
                            }}
                            changeTidsperiode={(v) => this.oppdaterTidsperiode(v)}
                            tidsperiode={mapTidsperiodeToTidsperiodeString(tidsperiode)}
                            onAvbryt={this.handleAvbrytTidsperiode}
                            visible={this.state.tidsperiodeIsOpen}
                        />
                    </Block>
                    <Block
                        visible={visibility.isVisible(UtsettelseSpørsmålKeys.variant)}
                        margin={visInfoOmHelligdagerOgFerie ? 'xs' : undefined}
                    >
                        <HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål
                            variant={variant}
                            radios={this.getUtsettelseÅrsakRadios(kunHelligdager, skalViseGamleUtsettelseÅrsaker)}
                            onChange={(v: Utsettelsesvariant) => this.onVariantChange(v)}
                            infotekst={
                                kunHelligdager
                                    ? getMessage(intl, 'utsettelseskjema.kunHelligdager.disabledFerieMelding')
                                    : undefined
                            }
                        />
                    </Block>
                    <Block visible={visInfoOmHelligdagerOgFerie}>
                        <AlertStripe type="info">
                            <FormattedMessage id="utsettelse.helligdager" />
                        </AlertStripe>
                    </Block>

                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.ferieinfo)} hasChildBlocks={true}>
                        <UtsettelsePgaFerieInfo
                            antallFeriedager={antallFeriedager}
                            aktivtArbeidsforhold={harAktivtArbeidsforhold(arbeidsforhold, tidsperiode.tom)}
                            forelder={Forelder.mor}
                        />
                    </Block>
                    {periode.type === Periodetype.Utsettelse && (
                        <>
                            {periode.årsak === UtsettelseÅrsakType.Arbeid && (
                                <>
                                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.arbeidsplass)}>
                                        <HvorSkalDuJobbeSpørsmålFlervalg
                                            arbeidsforhold={arbeidsforhold || []}
                                            onChange={(orgnumre: string[], arbeidsformer: Arbeidsform[]) =>
                                                this.onChange({
                                                    orgnumre,
                                                    arbeidsformer,
                                                    erArbeidstaker: arbeidsformer.includes(Arbeidsform.arbeidstaker),
                                                })
                                            }
                                            arbeidsformer={(periode as Utsettelsesperiode).arbeidsformer || []}
                                            orgnumre={(periode as Utsettelsesperiode).orgnumre || []}
                                            tidsperiode={periode.tidsperiode}
                                        />
                                    </Block>
                                    <Block
                                        visible={visibility.isVisible(UtsettelseSpørsmålKeys.avtaltFulltidVedDeltid)}
                                    >
                                        <JaNeiSpørsmål
                                            navn={UtsettelseSpørsmålKeys.avtaltFulltidVedDeltid}
                                            spørsmål={getMessage(
                                                intl,
                                                'utsettelseskjema.arbeid.avtaltFulltidVedDeltid',
                                                {
                                                    antall: periode.orgnumre ? periode.orgnumre.length : 0,
                                                }
                                            )}
                                            onChange={(avtaltFulltArbeidForDeltid: boolean) =>
                                                this.onChange({
                                                    harAvtaleOmFulltidForDeltidsstilling: avtaltFulltArbeidForDeltid,
                                                })
                                            }
                                            valgtVerdi={
                                                (periode as Utsettelsesperiode).harAvtaleOmFulltidForDeltidsstilling
                                            }
                                        />
                                    </Block>
                                    <Block visible={periode.orgnumre && periode.orgnumre.length > 0}>
                                        <VeilederInfo
                                            kompakt={true}
                                            skjulMeldingIkon={true}
                                            messages={[
                                                {
                                                    type: 'info',
                                                    contentIntlKey:
                                                        'vedlegg.veileder.dokumentasjonAvArbeidVedUtsettelse',
                                                    values: {
                                                        antall: periode.orgnumre ? periode.orgnumre.length : 0,
                                                    },
                                                },
                                            ]}
                                        />
                                    </Block>
                                    <Block visible={getVeilederForFrilansOgSNVisible(periode)}>
                                        <VeilederInfo
                                            messages={[
                                                {
                                                    type: 'normal',
                                                    contentIntlKey: 'uttaksplan.infoTilFrilansOgSelvstendig',
                                                },
                                            ]}
                                        />
                                    </Block>
                                </>
                            )}
                            <Block
                                visible={visibility.isVisible(UtsettelseSpørsmålKeys.sykdomsårsak)}
                                hasChildBlocks={true}
                            >
                                <Block>
                                    <VeilederInfo
                                        messages={[
                                            {
                                                type: 'normal',
                                                contentIntlKey: 'uttaksplan.informasjonVedSykdom',
                                            },
                                        ]}
                                    />
                                </Block>
                                <UtsettelsePgaSykdomPart
                                    onChange={this.onSykdomÅrsakChange}
                                    sykdomsårsak={periode.årsak}
                                    forelder={Forelder.mor}
                                    vedlegg={(periode.vedlegg as Attachment[]) || []}
                                />
                            </Block>

                            <Block
                                visible={visibility.isVisible(UtsettelseSpørsmålKeys.morsAktivitet)}
                                hasChildBlocks={true}
                            >
                                <AktivitetskravMorBolk
                                    navnPåForeldre={søknadsinfo.navn}
                                    morsAktivitetIPerioden={periode.morsAktivitetIPerioden}
                                    vedlegg={periode.vedlegg as Attachment[]}
                                    onChange={(periodeData: UtsettelseFormPeriodeType) => this.onChange(periodeData)}
                                />
                            </Block>
                            <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.hvØvelse)}>
                                <Block>
                                    <VeilederInfo
                                        messages={[
                                            {
                                                type: 'normal',
                                                contentIntlKey: 'uttaksplan.informasjonVedHVØvelse',
                                            },
                                        ]}
                                    />
                                </Block>
                                <VedleggSpørsmål
                                    attachmentType={AttachmentType.HV_ØVELSE}
                                    skjemanummer={Skjemanummer.HV_ØVELSE}
                                    vedlegg={periode.vedlegg as Attachment[]}
                                    onChange={(v: Attachment[]) => this.onChange({ vedlegg: v })}
                                />
                            </Block>
                            <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.navTiltak)}>
                                <Block>
                                    <VeilederInfo
                                        messages={[
                                            {
                                                type: 'normal',
                                                contentIntlKey: 'uttaksplan.informasjonVedNAVTiltak',
                                            },
                                        ]}
                                    />
                                </Block>
                                <VedleggSpørsmål
                                    attachmentType={AttachmentType.NAV_TILTAK}
                                    skjemanummer={Skjemanummer.NAV_TILTAK}
                                    vedlegg={periode.vedlegg as Attachment[]}
                                    onChange={(v: Attachment[]) => this.onChange({ vedlegg: v })}
                                />
                            </Block>
                        </>
                    )}
                </Block>
                {periodeHarUbesvarteSpørsmål && (
                    <div style={{ marginBottom: '1rem' }}>
                        <UnansweredQuestionsInfo>
                            {getMessage(intl, 'steg.footer.spørsmålMåBesvares')}
                        </UnansweredQuestionsInfo>
                    </div>
                )}
                {periode.id === undefined && (
                    <NyPeriodeKnapperad
                        periodeKanLeggesTil={
                            visibility.areAllQuestionsAnswered() &&
                            overlapperAndreUtsettelser === false &&
                            harDeltidUtenAvtaleMedArbeidsgiver === false
                        }
                        onCancel={onCancel}
                        ariaLabelAvbryt={getMessage(intl, 'uttaksplan.nyttopphold.avbrytAriaLabel')}
                        ariaLabelLeggTil={getMessage(intl, 'uttaksplan.nyttopphold.leggTilAriaLabel')}
                    />
                )}
            </>
        );
    }
}

const UtsettelsesperiodeFormContextWrapper = (props: Props) => {
    const formContext = React.useContext(ValidFormContext);

    return <UtsettelsesperiodeForm {...props} formContext={formContext} />;
};

const mapStateToProps = (state: AppState): StateProps => {
    return {
        arbeidsforhold: state.api.søkerinfo!.arbeidsforhold || [],
        tilgjengeligeStønadskontoer: selectTilgjengeligeStønadskontoer(state),
        søknadsinfo: selectSøknadsinfo(state)!,
        uttaksplan: state.søknad.uttaksplan,
    };
};

export default connect(mapStateToProps)(injectIntl(UtsettelsesperiodeFormContextWrapper));
