import * as React from 'react';
import {
    Oppholdsperiode,
    OppholdÅrsakType,
    Periode,
    Periodetype,
    GradertUttaksperiode,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    StønadskontoType
} from '../../types/uttaksplan/periodetyper';
import { Forelder, Tidsperiode } from 'common/types';
import Block from 'common/components/block/Block';
import HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål from '../../spørsmål/HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import Søknad from '../../types/søknad/Søknad';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import getMessage from 'common/util/i18nUtils';
import {
    UtsettelsePgaHeltidsarbeidSkjemadata,
    default as UtsettelsePgaHeltidsarbeidForm
} from './partials/utsettelse-pga-heltidsarbeid-form/UtsettelsePgaHeltidsarbeidForm';
import { RecursivePartial } from '../../types/Partial';
import UtsettelsePgaDeltidsarbeidForm, {
    UtsettelsePgaDeltidsarbeidSkjemadata
} from './partials/utsettelse-pga-deltidsarbeid-form/UtsettelsePgaDeltidsarbeidForm';
import UtsettelsePgaFerieForm from './partials/utsettelse-pga-ferie-form/UtsettelsePgaFerieForm';
import UtsettelsePgaSykdomForm from './partials/utsettelse-pga-sykdom-form/UtsettelsePgaSykdomForm';
import { harAktivtArbeidsforhold } from '../../util/domain/arbeidsforhold';
import DateValues from '../../util/validation/values';
import Arbeidsforhold from '../../types/Arbeidsforhold';
import UtsettelseTidsperiodeSpørsmål from './partials/UtsettelseTidsperiodeSpørsmål';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { getFamiliehendelsedato } from '../../util/uttaksplan';
import { formaterNavn, erFarEllerMedmor } from '../../util/domain/personUtil';
import UtsettelsePgaUttakAnnenForelderForm from './partials/utsettelse-pga-uttakAnnenForelder-form/UtsettelsePgaUttakAnnenForelderForm';
import { getVelgbareStønadskontotyper } from '../../util/uttaksplan/st\u00F8nadskontoer';

interface UtsettelsesperiodeFormProps {
    tittel?: string;
    periode: RecursivePartial<Periode>;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

interface StateProps {
    søknad: Søknad;
    arbeidsforhold: Arbeidsforhold[];
    velgbareStønadskontoer: StønadskontoType[];
    søkerErFarEllerMedmor: boolean;
}

type Props = UtsettelsesperiodeFormProps & StateProps & InjectedIntlProps;

export enum Utsettelsesvariant {
    Ferie = 'ferie',
    ArbeidHeltid = 'arbeidHeltid',
    ArbeidDeltid = 'arbeidDeltid',
    Sykdom = 'sykdom',
    UttakAnnenForelder = 'uttakAnnenForelder'
}

const getUtsettelsesvariantFromPeriode = (periode: RecursivePartial<Periode>): Utsettelsesvariant | undefined => {
    if (periode.type === Periodetype.Utsettelse) {
        if (periode.årsak === UtsettelseÅrsakType.Ferie) {
            return Utsettelsesvariant.Ferie;
        } else if (periode.årsak === UtsettelseÅrsakType.Sykdom) {
            return Utsettelsesvariant.Sykdom;
        } else if (periode.årsak === UtsettelseÅrsakType.Arbeid) {
            return Utsettelsesvariant.ArbeidHeltid;
        }
    } else if (periode.type === Periodetype.Opphold) {
        return Utsettelsesvariant.UttakAnnenForelder;
    }
    return undefined;
};

interface State {
    variant?: Utsettelsesvariant;
}

const periodeErOpprettetSykdomsperiode = (periode: RecursivePartial<Periode>): boolean => {
    return (
        periode.id !== undefined &&
        periode.type === Periodetype.Utsettelse &&
        (periode.årsak === UtsettelseÅrsakType.Sykdom ||
            periode.årsak === UtsettelseÅrsakType.InstitusjonBarnet ||
            periode.årsak === UtsettelseÅrsakType.InstitusjonSøker)
    );
};
class UtsettelsesperiodeForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.updateUtsettelsesvariant = this.updateUtsettelsesvariant.bind(this);
        this.getUtsettelseÅrsakRadios = this.getUtsettelseÅrsakRadios.bind(this);
        this.updateUtsettelsePgaHeltidsarbeid = this.updateUtsettelsePgaHeltidsarbeid.bind(this);
        this.updateUtsettelsePgaDeltidsarbeid = this.updateUtsettelsePgaDeltidsarbeid.bind(this);
        this.updateUtsettelsePgaUttakAnnenForelder = this.updateUtsettelsePgaUttakAnnenForelder.bind(this);
        this.getSkjemadataForUtsettelsePgaHeltidsarbeid = this.getSkjemadataForUtsettelsePgaHeltidsarbeid.bind(this);
        this.getSkjemadataForUtsettelsePgaDeltidsarbeid = this.getSkjemadataForUtsettelsePgaDeltidsarbeid.bind(this);

        this.state = {
            variant: props.periode ? getUtsettelsesvariantFromPeriode(props.periode) : undefined
        };
    }

    getUtsettelseÅrsakRadios(): RadioProps[] {
        const { søknad, intl } = this.props;

        const { annenForelder, søker } = søknad;
        const { kanIkkeOppgis, utenlandskFnr, harRettPåForeldrepenger } = annenForelder;
        const { erAleneOmOmsorg } = søker;

        const defaultRadios = [
            {
                label: getMessage(intl, 'jegskalhaferie'),
                value: Utsettelsesvariant.Ferie
            },
            {
                label: 'Jeg skal jobbe heltid',
                value: Utsettelsesvariant.ArbeidHeltid
            },
            {
                label: 'Jeg skal jobbe deltid',
                value: Utsettelsesvariant.ArbeidDeltid
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

    updateUtsettelsePgaHeltidsarbeid(skjemadata: UtsettelsePgaHeltidsarbeidSkjemadata) {
        const { periode, onChange } = this.props;
        const { orgnr, skalJobbeSomFrilansEllerSelvstendigNæringsdrivende, tidsperiode } = skjemadata;
        const utsettelsesperiode: RecursivePartial<Utsettelsesperiode> = {
            type: Periodetype.Utsettelse,
            årsak: UtsettelseÅrsakType.Arbeid,
            tidsperiode: tidsperiode || periode.tidsperiode,
            forelder: Forelder.MOR,
            orgnr,
            skalJobbeSomFrilansEllerSelvstendigNæringsdrivende
        };
        onChange(utsettelsesperiode);
    }

    updateUtsettelsePgaDeltidsarbeid(skjemadata: UtsettelsePgaDeltidsarbeidSkjemadata) {
        const { onChange } = this.props;

        const gradertUttaksperiode: RecursivePartial<GradertUttaksperiode> = {
            type: Periodetype.Uttak,
            årsak: UtsettelseÅrsakType.Arbeid,
            forelder: Forelder.MOR,
            gradert: true,
            ...skjemadata
        };
        onChange(gradertUttaksperiode);
    }

    getSkjemadataForUtsettelsePgaHeltidsarbeid(): UtsettelsePgaHeltidsarbeidSkjemadata {
        const { periode } = this.props;
        if (periode.type === Periodetype.Utsettelse && periode.årsak === UtsettelseÅrsakType.Arbeid) {
            return {
                orgnr: periode.orgnr,
                tidsperiode: periode.tidsperiode as Partial<Tidsperiode>
            };
        }
        return { tidsperiode: periode.tidsperiode as Partial<Tidsperiode> };
    }

    getSkjemadataForUtsettelsePgaDeltidsarbeid(): UtsettelsePgaDeltidsarbeidSkjemadata {
        const { periode } = this.props;
        if (periode.type === Periodetype.Uttak) {
            const gradertPeriode = periode as GradertUttaksperiode;
            const { stillingsprosent, konto, ønskerSamtidigUttak, orgnr } = gradertPeriode;
            return {
                stillingsprosent,
                konto,
                ønskerSamtidigUttak,
                orgnr,
                tidsperiode: periode.tidsperiode as Partial<Tidsperiode>
            };
        }
        return {
            tidsperiode: periode.tidsperiode as Partial<Tidsperiode>
        };
    }

    updateUtsettelsePgaUttakAnnenForelder(årsak: OppholdÅrsakType) {
        const { periode, onChange } = this.props;
        const oppholdsperiode: RecursivePartial<Oppholdsperiode> = {
            type: Periodetype.Opphold,
            tidsperiode: { ...periode.tidsperiode },
            årsak,
            forelder: this.props.søkerErFarEllerMedmor ? Forelder.MOR : Forelder.FARMEDMOR
        };
        onChange(oppholdsperiode);
    }

    updateUtsettelsesvariant(variant: Utsettelsesvariant) {
        this.setState({
            variant
        });
    }

    render() {
        const { variant } = this.state;
        const { periode, onChange, arbeidsforhold, søknad, velgbareStønadskontoer } = this.props;
        const validTidsperiode = getValidTidsperiode(periode.tidsperiode as Partial<Tidsperiode>);

        return (
            <React.Fragment>
                <Block hasChildBlocks={true}>
                    <Block>
                        <UtsettelseTidsperiodeSpørsmål
                            tidsperiode={periode.tidsperiode as Partial<Tidsperiode>}
                            familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
                            onChange={(t) => onChange({ tidsperiode: t })}
                        />
                    </Block>
                    <Block margin="s" visible={periode.id === undefined && validTidsperiode !== undefined}>
                        <HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål
                            onChange={this.updateUtsettelsesvariant}
                            variant={variant}
                            radios={this.getUtsettelseÅrsakRadios()}
                        />
                    </Block>
                    <Block visible={variant === Utsettelsesvariant.ArbeidHeltid} hasChildBlocks={true}>
                        <UtsettelsePgaHeltidsarbeidForm
                            onChange={this.updateUtsettelsePgaHeltidsarbeid}
                            skjemadata={this.getSkjemadataForUtsettelsePgaHeltidsarbeid()}
                            arbeidsforhold={arbeidsforhold}
                        />
                    </Block>
                    <Block visible={variant === Utsettelsesvariant.ArbeidDeltid} hasChildBlocks={true}>
                        <UtsettelsePgaDeltidsarbeidForm
                            onChange={this.updateUtsettelsePgaDeltidsarbeid}
                            velgbareStønadskontoer={velgbareStønadskontoer}
                            skjemadata={this.getSkjemadataForUtsettelsePgaDeltidsarbeid()}
                            arbeidsforhold={arbeidsforhold}
                        />
                    </Block>
                    <Block visible={variant === Utsettelsesvariant.UttakAnnenForelder}>
                        <UtsettelsePgaUttakAnnenForelderForm
                            onChange={this.updateUtsettelsePgaUttakAnnenForelder}
                            oppholdsårsak={(periode as Oppholdsperiode).årsak}
                            navnAnnenForelder={søknad.annenForelder.fornavn}
                        />
                    </Block>
                    <Block
                        visible={
                            variant === Utsettelsesvariant.Ferie ||
                            (periode.id !== undefined &&
                                periode.type === Periodetype.Utsettelse &&
                                periode.årsak === UtsettelseÅrsakType.Ferie)
                        }
                        hasChildBlocks={true}>
                        <UtsettelsePgaFerieForm
                            tidsperiode={periode.tidsperiode as Partial<Tidsperiode>}
                            aktivtArbeidsforhold={harAktivtArbeidsforhold(arbeidsforhold, DateValues.today.toDate())}
                            forelder={Forelder.MOR}
                            onChange={(p) => this.props.onChange(p)}
                        />
                    </Block>
                    <Block
                        visible={variant === Utsettelsesvariant.Sykdom || periodeErOpprettetSykdomsperiode(periode)}
                        hasChildBlocks={true}>
                        <UtsettelsePgaSykdomForm
                            onChange={(p) => this.props.onChange(p)}
                            periode={periode}
                            forelder={Forelder.MOR}
                        />
                    </Block>
                </Block>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        søknad: state.søknad,
        arbeidsforhold: state.api.søkerinfo!.arbeidsforhold || [],
        søkerErFarEllerMedmor: erFarEllerMedmor(state.api.søkerinfo!.person.kjønn, state.søknad.søker.rolle),
        velgbareStønadskontoer: getVelgbareStønadskontotyper(state.api.tilgjengeligeStønadskontoer!)
    };
};

export default connect(mapStateToProps)(injectIntl(UtsettelsesperiodeForm));
