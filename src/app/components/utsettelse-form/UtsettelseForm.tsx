import * as React from 'react';
import PT from 'prop-types';

import {
    Periodetype,
    Oppholdsperiode,
    UtsettelseÅrsakType,
    Utsettelsesperiode
} from '../../types/uttaksplan/periodetyper';
import UtsettelsePgaSykdomPart, { UtsettelsePgaSykdomChangePayload } from './partials/UtsettelsePgaSykdomPart';
import OppholdsårsakSpørsmål from './partials/OppholdsårsakSpørsmål';
import HvorSkalDuJobbeSpørsmål from '../../spørsmål/HvorSkalDuJobbeSpørsmål';
import UtsettelsePgaFerieInfo from './partials/UtsettelsePgaFerieInfo';
import { Forelder, NavnPåForeldre, Tidsperiode } from 'common/types';
import { harAktivtArbeidsforhold } from '../../util/domain/arbeidsforhold';
import DateValues from '../../util/validation/values';
import { UtsettelseSpørsmålKeys, getUtsettelseFormVisibility } from './utsettelseFormConfig';
import HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål from '../../spørsmål/HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål';
import Block from 'common/components/block/Block';
import UtsettelseTidsperiodeSpørsmål from './partials/UtsettelseTidsperiodeSpørsmål';
import { getFamiliehendelsedato, getNavnPåForeldre } from '../../util/uttaksplan';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import getMessage from 'common/util/i18nUtils';
import Søknad from '../../types/søknad/Søknad';
import Arbeidsforhold from '../../types/Arbeidsforhold';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RecursivePartial } from '../../types/Partial';
import { formaterNavn, erFarEllerMedmor } from '../../util/domain/personUtil';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import NyPeriodeKnapperad from '../ny-periode-form/NyPeriodeKnapperad';
import AktivitetskravMorBolk from '../../bolker/AktivitetskravMorBolk';
import { getEgenKvote } from '../../util/uttaksplan/uttakUtils';

export type UtsettelseFormPeriodeType = RecursivePartial<Utsettelsesperiode> | RecursivePartial<Oppholdsperiode>;

interface OwnProps {
    periode: UtsettelseFormPeriodeType;
    harOverlappendePerioder?: boolean;
    onChange: (periode: UtsettelseFormPeriodeType) => void;
    onCancel?: () => void;
}

interface StateProps {
    søknad: Søknad;
    arbeidsforhold: Arbeidsforhold[];
    søkerErFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
}

type Props = OwnProps & StateProps & InjectedIntlProps;

interface State {
    variant?: Utsettelsesvariant;
}

export enum Utsettelsesvariant {
    Ferie = 'ferie',
    Arbeid = 'arbeid',
    Sykdom = 'sykdom',
    UttakAnnenForelder = 'uttakAnnenForelder'
}

export const getVariantFromPeriode = (periode: UtsettelseFormPeriodeType): Utsettelsesvariant | undefined => {
    if (periode.type === Periodetype.Opphold) {
        return Utsettelsesvariant.UttakAnnenForelder;
    } else {
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
    }
};

class UtsettelsesperiodeForm extends React.Component<Props, State> {
    static contextTypes = {
        validForm: PT.object
    };
    context: any;

    constructor(props: Props) {
        super(props);
        this.onVariantChange = this.onVariantChange.bind(this);
        this.onSykdomÅrsakChange = this.onSykdomÅrsakChange.bind(this);
        this.state = {
            variant: getVariantFromPeriode(props.periode)
        };
    }

    componentDidMount() {
        if (this.context.validForm) {
            this.context.validForm.validateAll();
        }
    }

    onChange(periode: UtsettelseFormPeriodeType) {
        if (periode.type === Periodetype.Utsettelse) {
            (periode as Utsettelsesperiode).konto = getEgenKvote(this.props.søkerErFarEllerMedmor);
        }

        this.props.onChange(periode);
        if (this.context.validForm) {
            this.context.validForm.validateAll();
        }
    }

    getUtsettelseÅrsakRadios(): RadioProps[] {
        const { søknad, intl } = this.props;
        const { annenForelder, søker } = søknad;
        const { kanIkkeOppgis, utenlandskFnr, harRettPåForeldrepenger } = annenForelder;
        const { erAleneOmOmsorg } = søker;

        const defaultRadios: RadioProps[] = [
            {
                label: getMessage(intl, 'jegskalhaferie'),
                value: Utsettelsesvariant.Ferie
            },
            {
                label: 'Jeg skal jobbe heltid',
                value: Utsettelsesvariant.Arbeid
            },
            {
                label: getMessage(intl, 'pgasykdom'),
                value: Utsettelsesvariant.Sykdom
            }
        ];

        if (erAleneOmOmsorg || !harRettPåForeldrepenger || utenlandskFnr || kanIkkeOppgis) {
            return defaultRadios;
        }

        return [
            ...defaultRadios,
            {
                label: `${formaterNavn(annenForelder.fornavn, annenForelder.etternavn)} ${getMessage(
                    intl,
                    'skaltautforeldrepenger'
                )}`,
                value: Utsettelsesvariant.UttakAnnenForelder
            }
        ];
    }

    onVariantChange(variant: Utsettelsesvariant) {
        if (variant !== this.state.variant) {
            if (variant === Utsettelsesvariant.UttakAnnenForelder) {
                const forelder = this.props.søkerErFarEllerMedmor ? Forelder.MOR : Forelder.FARMEDMOR;
                this.onChange({ type: Periodetype.Opphold, årsak: undefined, forelder });
            } else {
                const forelder = this.props.søkerErFarEllerMedmor === false ? Forelder.MOR : Forelder.FARMEDMOR;
                if (variant === Utsettelsesvariant.Arbeid) {
                    this.onChange({ type: Periodetype.Utsettelse, årsak: UtsettelseÅrsakType.Arbeid, forelder });
                } else if (variant === Utsettelsesvariant.Ferie) {
                    this.onChange({ type: Periodetype.Utsettelse, årsak: UtsettelseÅrsakType.Ferie, forelder });
                } else if (variant === Utsettelsesvariant.Sykdom) {
                    this.onChange({ type: Periodetype.Utsettelse, årsak: undefined, forelder });
                }
            }
        }
        this.setState({
            variant
        });
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

    render() {
        const {
            periode,
            arbeidsforhold,
            søknad,
            navnPåForeldre,
            søkerErFarEllerMedmor,
            harOverlappendePerioder,
            onCancel,
            intl
        } = this.props;
        const { variant } = this.state;

        const visibility = getUtsettelseFormVisibility({
            variant,
            periode,
            søkerErAleneOmOmsorg: søknad.søker.erAleneOmOmsorg,
            søkerErFarEllerMedmor,
            annenForelderHarRettPåForeldrepenger: søknad.annenForelder.harRettPåForeldrepenger
        });

        if (visibility === undefined) {
            return null;
        }
        const tidsperiode = periode.tidsperiode as Partial<Tidsperiode>;
        return (
            <>
                <Block hasChildBlocks={true}>
                    <Block>
                        <UtsettelseTidsperiodeSpørsmål
                            tidsperiode={tidsperiode}
                            familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
                            onChange={(p) => this.onChange({ tidsperiode: p })}
                            feil={
                                harOverlappendePerioder
                                    ? { feilmelding: getMessage(intl, 'periodeliste.overlappendePeriode') }
                                    : undefined
                            }
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.variant)}>
                        <HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål
                            variant={variant}
                            radios={this.getUtsettelseÅrsakRadios()}
                            onChange={(v) => this.onVariantChange(v)}
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.ferieinfo)} hasChildBlocks={true}>
                        <UtsettelsePgaFerieInfo
                            tidsperiode={tidsperiode}
                            aktivtArbeidsforhold={harAktivtArbeidsforhold(arbeidsforhold, DateValues.today.toDate())}
                            forelder={Forelder.MOR}
                        />
                    </Block>
                    {periode.type === Periodetype.Utsettelse && (
                        <>
                            {periode.årsak === UtsettelseÅrsakType.Arbeid && (
                                <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.arbeidsplass)}>
                                    <HvorSkalDuJobbeSpørsmål
                                        arbeidsforhold={arbeidsforhold}
                                        valgtArbeidsforhold={periode.orgnr}
                                        frilansEllerSelvstendig={periode.selvstendigNæringsdrivendeEllerFrilans}
                                        onChange={(orgnr, selvstendigNæringsdrivendeEllerFrilans) =>
                                            this.onChange({
                                                orgnr,
                                                selvstendigNæringsdrivendeEllerFrilans
                                            })
                                        }
                                    />
                                </Block>
                            )}
                            <Block
                                visible={visibility.isVisible(UtsettelseSpørsmålKeys.sykdomsårsak)}
                                hasChildBlocks={true}>
                                <UtsettelsePgaSykdomPart
                                    onChange={this.onSykdomÅrsakChange}
                                    vedlegg={(periode.vedlegg as Attachment[]) || []}
                                    sykdomsårsak={periode.årsak}
                                    forelder={Forelder.MOR}
                                />
                            </Block>

                            <Block
                                visible={visibility.isVisible(UtsettelseSpørsmålKeys.morsAktivitet)}
                                hasChildBlocks={true}>
                                <AktivitetskravMorBolk
                                    navnPåForeldre={navnPåForeldre}
                                    morsAktivitetIPerioden={periode.morsAktivitetIPerioden}
                                    vedlegg={periode.vedlegg as Attachment[]}
                                    onChange={(periodeData) => this.onChange(periodeData)}
                                />
                            </Block>
                        </>
                    )}
                    {periode.type === Periodetype.Opphold && (
                        <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.oppholdsårsak)}>
                            <OppholdsårsakSpørsmål
                                onChange={(oppholdsårsak) => this.onChange({ årsak: oppholdsårsak })}
                                oppholdsårsak={periode.årsak}
                                navnAnnenForelder={søknad.annenForelder.fornavn}
                            />
                        </Block>
                    )}
                </Block>
                {periode.id === undefined && (
                    <NyPeriodeKnapperad
                        periodeKanLeggesTil={visibility.areAllQuestionsAnswered()}
                        onCancel={onCancel}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        søknad: state.søknad,
        arbeidsforhold: state.api.søkerinfo!.arbeidsforhold || [],
        søkerErFarEllerMedmor: erFarEllerMedmor(state.søknad.søker.rolle),
        navnPåForeldre: getNavnPåForeldre(state.søknad, state.api.søkerinfo!.person!)
    };
};

export default connect(mapStateToProps)(injectIntl(UtsettelsesperiodeForm));
