import * as React from 'react';

import {
    Arbeidsform,
    Oppholdsperiode,
    Periodetype,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    TilgjengeligStønadskonto,
    Periode,
    isUtsettelsesperiode
} from '../../../../types/uttaksplan/periodetyper';
import UtsettelsePgaSykdomPart, { UtsettelsePgaSykdomChangePayload } from './partials/UtsettelsePgaSykdomPart';
import UtsettelsePgaFerieInfo from './UtsettelsePgaFerieInfo';
import { Forelder, Tidsperiode } from 'common/types';
import { harAktivtArbeidsforhold } from '../../../../util/domain/arbeidsforhold';
import { getUtsettelseFormVisibility, UtsettelseSpørsmålKeys } from './utsettelseFormConfig';
import HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål from '../../../../spørsmål/HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål';
import Block from 'common/components/block/Block';
import UtsettelseTidsperiodeSpørsmål from './partials/UtsettelseTidsperiodeSpørsmål';
import getMessage from 'common/util/i18nUtils';
import Arbeidsforhold from '../../../../types/Arbeidsforhold';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
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

export type UtsettelseFormPeriodeType = RecursivePartial<Utsettelsesperiode> | RecursivePartial<Oppholdsperiode>;

interface OwnProps {
    periode: UtsettelseFormPeriodeType;
    antallFeriedager: number;
    harOverlappendePerioder?: boolean;
    onChange: EndrePeriodeChangeEvent;
    onCancel?: () => void;
    onUtsettelsesvariantChange?: (utsettelsesvariant: Utsettelsesvariant | undefined) => void;
}

interface StateProps {
    arbeidsforhold: Arbeidsforhold[];
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    søknadsinfo: Søknadsinfo;
    uttaksplan: Periode[];
}

type Props = OwnProps & StateProps & InjectedIntlProps;

interface State {
    variant?: Utsettelsesvariant;
    ugyldigTidsperiode?: Tidsperiode;
}

export enum Utsettelsesvariant {
    Ferie = 'ferie',
    Arbeid = 'arbeid',
    Sykdom = 'sykdom'
}

export const getVariantFromPeriode = (periode: UtsettelseFormPeriodeType): Utsettelsesvariant | undefined => {
    switch (periode.årsak) {
        case UtsettelseÅrsakType.Arbeid:
            return Utsettelsesvariant.Arbeid;
        case UtsettelseÅrsakType.Ferie:
            return Utsettelsesvariant.Ferie;
        case UtsettelseÅrsakType.Sykdom:
        case UtsettelseÅrsakType.InstitusjonBarnet:
        case UtsettelseÅrsakType.InstitusjonSøker:
            return Utsettelsesvariant.Sykdom;
        default:
            return undefined;
    }
};

const getTidsperiodeFeilmeldingKey = (
    harOverlappendePerioder: boolean,
    overlapperAndreUtsettelser: boolean,
    erNyPeriode: boolean
): string | undefined => {
    if (harOverlappendePerioder) {
        return 'periodeliste.overlappendePeriode';
    }
    if (overlapperAndreUtsettelser) {
        return `periodeliste.utsettelse.overlappendeTidsperiode.${erNyPeriode ? 'ny' : 'endre'}`;
    }
    return undefined;
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
        this.state = {
            variant: getVariantFromPeriode(props.periode)
        };
    }

    componentDidMount() {
        if (this.props.formContext && this.props.periode.id) {
            this.props.formContext.validateAll();
        }
    }

    onChange(periode: UtsettelseFormPeriodeType, replace: boolean = false) {
        this.props.onChange(periode, replace, this.getVisibility());
        if (this.props.formContext && this.props.periode.id) {
            this.props.formContext.validateAll();
        }
    }

    getUtsettelseÅrsakRadios(disableFerie: boolean): RadioProps[] {
        const { søknadsinfo, intl } = this.props;

        const defaultRadios: RadioProps[] = [
            {
                label: getMessage(intl, 'jegskalhaferie'),
                value: Utsettelsesvariant.Ferie,
                disabled: disableFerie === true,
                name: 'utsettelseÅrsak'
            },
            {
                label: getMessage(intl, 'jegskaljobbeheltid'),
                value: Utsettelsesvariant.Arbeid,
                name: 'utsettelseÅrsak'
            },
            {
                label: getMessage(intl, 'pgasykdom'),
                value: Utsettelsesvariant.Sykdom,
                name: 'utsettelseÅrsak'
            }
        ];

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
                    erArbeidstaker: this.props.arbeidsforhold.length > 0
                });
            } else if (variant === Utsettelsesvariant.Ferie) {
                this.onChange({
                    type: Periodetype.Utsettelse,
                    årsak: UtsettelseÅrsakType.Ferie,
                    forelder,
                    erArbeidstaker: this.props.arbeidsforhold.length > 0
                });
            } else if (variant === Utsettelsesvariant.Sykdom) {
                this.onChange({
                    type: Periodetype.Utsettelse,
                    årsak: undefined,
                    forelder,
                    erArbeidstaker: this.props.arbeidsforhold.length > 0
                });
            }
        }
        this.setState({
            variant
        });
        if (this.props.onUtsettelsesvariantChange) {
            this.props.onUtsettelsesvariantChange(variant);
        }
    }

    onSykdomÅrsakChange({ sykdomsårsak, vedlegg }: UtsettelsePgaSykdomChangePayload) {
        if (sykdomsårsak === UtsettelseÅrsakType.InstitusjonBarnet) {
            this.onChange({
                årsak: UtsettelseÅrsakType.InstitusjonBarnet,
                vedlegg
            });
        } else if (sykdomsårsak === UtsettelseÅrsakType.InstitusjonSøker) {
            this.onChange({
                årsak: UtsettelseÅrsakType.InstitusjonSøker,
                vedlegg
            });
        } else if (sykdomsårsak === UtsettelseÅrsakType.Sykdom) {
            this.onChange({
                årsak: UtsettelseÅrsakType.Sykdom,
                vedlegg
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
            arbeidsforhold
        });
    }

    oppdaterTidsperiode(tidsperiode: Partial<Tidsperiode>) {
        const { periode, uttaksplan } = this.props;
        if (isValidTidsperiode(tidsperiode)) {
            const p = { ...periode, tidsperiode };
            const overlapperAndreUtsettelser = overlapperUtsettelseAndreUtsettelser(p as Periode, uttaksplan);
            if (overlapperAndreUtsettelser === false) {
                this.setState({ ugyldigTidsperiode: undefined });
                this.onChange({ tidsperiode });
            } else {
                this.setState({ ugyldigTidsperiode: tidsperiode });
            }
        } else {
            this.setState({ ugyldigTidsperiode: undefined });
            this.onChange({ tidsperiode });
        }
    }

    render() {
        const {
            periode,
            antallFeriedager,
            arbeidsforhold,
            harOverlappendePerioder,
            onCancel,
            søknadsinfo,
            uttaksplan,
            intl
        } = this.props;

        const { variant, ugyldigTidsperiode } = this.state;

        const visibility = this.getVisibility();

        if (visibility === undefined) {
            return null;
        }
        const tidsperiode = periode.tidsperiode as Partial<Tidsperiode>;
        const antallHelligdager = isValidTidsperiode(tidsperiode) ? Tidsperioden(tidsperiode).getAntallFridager() : 0;
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

        const tidsperiodeFeilmeldingKey = getTidsperiodeFeilmeldingKey(
            harOverlappendePerioder === true,
            ugyldigTidsperiode !== undefined,
            periode.id === undefined
        );

        return (
            <>
                <Block hasChildBlocks={true}>
                    <Block>
                        <UtsettelseTidsperiodeSpørsmål
                            tidsperiode={this.state.ugyldigTidsperiode || tidsperiode}
                            familiehendelsesdato={søknadsinfo.søknaden.familiehendelsesdato}
                            onChange={this.oppdaterTidsperiode}
                            ugyldigeTidsperioder={ugyldigeTidsperioder}
                            feil={
                                tidsperiodeFeilmeldingKey
                                    ? { feilmelding: getMessage(intl, tidsperiodeFeilmeldingKey) }
                                    : undefined
                            }
                        />
                    </Block>
                    <Block
                        visible={visibility.isVisible(UtsettelseSpørsmålKeys.variant)}
                        margin={visInfoOmHelligdagerOgFerie ? 'xs' : undefined}
                    >
                        <HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål
                            variant={variant}
                            radios={this.getUtsettelseÅrsakRadios(kunHelligdager)}
                            onChange={(v) => this.onVariantChange(v)}
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
                                            onChange={(orgnumre, arbeidsformer) =>
                                                this.onChange({
                                                    orgnumre,
                                                    arbeidsformer,
                                                    erArbeidstaker: arbeidsformer.includes(Arbeidsform.arbeidstaker)
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
                                                    antall: periode.orgnumre ? periode.orgnumre.length : 0
                                                }
                                            )}
                                            onChange={(avtaltFulltArbeidForDeltid) =>
                                                this.onChange({
                                                    harAvtaleOmFulltidForDeltidsstilling: avtaltFulltArbeidForDeltid
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
                                                        antall: periode.orgnumre ? periode.orgnumre.length : 0
                                                    }
                                                }
                                            ]}
                                        />
                                    </Block>
                                    <Block visible={getVeilederForFrilansOgSNVisible(periode)}>
                                        <VeilederInfo
                                            messages={[
                                                {
                                                    type: 'normal',
                                                    contentIntlKey: 'uttaksplan.infoTilFrilansOgSelvstendig'
                                                }
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
                                                formatContentAsHTML: true
                                            }
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
                                    onChange={(periodeData) => this.onChange(periodeData)}
                                />
                            </Block>
                        </>
                    )}
                </Block>
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
        uttaksplan: state.søknad.uttaksplan
    };
};

export default connect(mapStateToProps)(injectIntl(UtsettelsesperiodeFormContextWrapper));
