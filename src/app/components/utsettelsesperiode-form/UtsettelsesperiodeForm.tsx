import * as React from 'react';
import {
    Oppholdsperiode,
    OppholdÅrsakType,
    Periode,
    Periodetype,
    GradertUttaksperiode,
    Utsettelsesperiode,
    UtsettelseÅrsakType
} from '../../types/uttaksplan/periodetyper';
import { Forelder, TidsperiodePartial } from 'common/types';
import TidsperiodeBolk from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import Block from 'common/components/block/Block';
import HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål from '../../spørsmål/HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import Søknad from '../../types/søknad/Søknad';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import getMessage from 'common/util/i18nUtils';
import AnnenForeldersUttakForm from './partials/AnnenForeldersUttakForm';
import {
    UtsettelsePgaHeltidsarbeidSkjemadata,
    default as UtsettelsePgaHeltidsarbeidForm
} from './partials/utsettelse-pga-heltidsarbeid-form/UtsettelsePgaHeltidsarbeidForm';
import { RecursivePartial } from '../../types/Partial';
import UtsettelsePgaDeltidsarbeidForm, {
    UtsettelsePgaDeltidsarbeidSkjemadata
} from './partials/utsettelse-pga-deltidsarbeid-form/UtsettelsePgaDeltidsarbeidForm';
import UtsettelsePgaFerieForm from './partials/utsettelse-pga-ferie-form.tsx/UtsettelsePgaFerieForm';
import { Tidsperioden, getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import UtsettelsePgaSykdomForm from './partials/utsettelse-pga-sykdom-form/UtsettelsePgaSykdomForm';

interface UtsettelsesperiodeFormProps {
    tittel?: string;
    periode: RecursivePartial<Periode>;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

interface StateProps {
    søknad: Søknad;
}

type Props = UtsettelsesperiodeFormProps & StateProps & InjectedIntlProps;

export enum Utsettelsesvariant {
    Ferie = 'ferie',
    ArbeidHeltid = 'arbeidHeltid',
    ArbeidDeltid = 'arbeidDeltid',
    Sykdom = 'sykdom'
}

interface State {
    gjelderOpphold: boolean;
    variant?: Utsettelsesvariant;
}

class UtsettelsesperiodeForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.updateUtsettelsesvariant = this.updateUtsettelsesvariant.bind(this);
        this.getUtsettelseÅrsakRadios = this.getUtsettelseÅrsakRadios.bind(this);
        this.updateUtsettelsePgaHeltidsarbeid = this.updateUtsettelsePgaHeltidsarbeid.bind(this);
        this.updateUtsettelsePgaDeltidsarbeid = this.updateUtsettelsePgaDeltidsarbeid.bind(this);
        this.getSkjemadataForUtsettelsePgaHeltidsarbeid = this.getSkjemadataForUtsettelsePgaHeltidsarbeid.bind(this);
        this.getSkjemadataForUtsettelsePgaDeltidsarbeid = this.getSkjemadataForUtsettelsePgaDeltidsarbeid.bind(this);

        this.state = {
            gjelderOpphold: false
        };
    }

    handleOnChange(årsak: UtsettelseÅrsakType | OppholdÅrsakType) {
        const { onChange } = this.props;
        if (
            årsak === UtsettelseÅrsakType.Arbeid ||
            årsak === UtsettelseÅrsakType.Ferie ||
            årsak === UtsettelseÅrsakType.Sykdom
        ) {
            const updatedPeriode = { årsak };
            onChange(updatedPeriode as Periode);
            this.setState({ gjelderOpphold: false });
        } else {
            this.setState({ gjelderOpphold: true });
        }
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
                label: `${annenForelder.navn} ${getMessage(intl, 'skaltautforeldrepenger')}`,
                value: ''
            }
        ];
    }

    updateUtsettelsePgaHeltidsarbeid(skjemadata: UtsettelsePgaHeltidsarbeidSkjemadata) {
        const { periode, onChange } = this.props;
        const { tidsperiode } = periode;
        const { orgnr, skalJobbeSomFrilansEllerSelvstendigNæringsdrivende } = skjemadata;
        const utsettelsesperiode: RecursivePartial<Utsettelsesperiode> = {
            type: Periodetype.Utsettelse,
            årsak: UtsettelseÅrsakType.Arbeid,
            tidsperiode,
            forelder: Forelder.FORELDER_1,
            orgnr,
            skalJobbeSomFrilansEllerSelvstendigNæringsdrivende
        };
        onChange(utsettelsesperiode);
    }

    updateUtsettelsePgaDeltidsarbeid(skjemadata: UtsettelsePgaDeltidsarbeidSkjemadata) {
        const { periode, onChange } = this.props;
        const { tidsperiode } = periode;
        const gradertUttaksperiode: RecursivePartial<GradertUttaksperiode> = {
            type: Periodetype.Uttak,
            årsak: UtsettelseÅrsakType.Arbeid,
            forelder: Forelder.FORELDER_1,
            tidsperiode,
            ...skjemadata
        };
        onChange(gradertUttaksperiode);
    }

    getSkjemadataForUtsettelsePgaHeltidsarbeid(): UtsettelsePgaHeltidsarbeidSkjemadata {
        const { periode } = this.props;
        if (periode.type === Periodetype.Utsettelse) {
            return {
                orgnr: periode.orgnr
            };
        }
        return {};
    }

    getSkjemadataForUtsettelsePgaDeltidsarbeid(): UtsettelsePgaDeltidsarbeidSkjemadata {
        const { periode } = this.props;
        if (periode.type === Periodetype.Uttak) {
            const gradertPeriode = periode as GradertUttaksperiode;
            const { stillingsprosent, konto, samtidigGradertUttak, orgnr } = gradertPeriode;
            return {
                stillingsprosent,
                konto,
                samtidigGradertUttak,
                orgnr
            };
        }
        return {};
    }

    updateUtsettelsesvariant(variant: Utsettelsesvariant) {
        this.setState({
            variant
        });
    }

    render() {
        const { gjelderOpphold, variant } = this.state;
        const { periode, onChange } = this.props;
        const { tidsperiode } = periode;

        const validTidsperiode = getValidTidsperiode(tidsperiode);
        const antallDager = validTidsperiode ? Tidsperioden(validTidsperiode).getAntallUttaksdager() : undefined;

        return (
            <React.Fragment>
                <Block margin="s">
                    <TidsperiodeBolk
                        onChange={(v: TidsperiodePartial) => onChange({ tidsperiode: v })}
                        tidsperiode={tidsperiode as TidsperiodePartial}
                        datoAvgrensninger={{
                            fra: {
                                maksDato: tidsperiode ? (tidsperiode.tom as Date) : undefined
                            },
                            til: {
                                minDato: tidsperiode ? (tidsperiode.fom as Date) : undefined
                            }
                        }}
                        visVarighet={true}
                    />
                </Block>
                <Block margin="s">
                    <HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål
                        onChange={this.updateUtsettelsesvariant}
                        variant={variant}
                        radios={this.getUtsettelseÅrsakRadios()}
                    />
                </Block>

                <Block visible={gjelderOpphold} hasChildBlocks={true}>
                    <AnnenForeldersUttakForm onChange={(v: Oppholdsperiode) => onChange(v)} />
                </Block>

                <Block visible={variant === Utsettelsesvariant.ArbeidHeltid} hasChildBlocks={true}>
                    <UtsettelsePgaHeltidsarbeidForm
                        onChange={this.updateUtsettelsePgaHeltidsarbeid}
                        skjemadata={this.getSkjemadataForUtsettelsePgaHeltidsarbeid()}
                    />
                </Block>

                <Block visible={variant === Utsettelsesvariant.ArbeidDeltid} hasChildBlocks={true}>
                    <UtsettelsePgaDeltidsarbeidForm
                        onChange={this.updateUtsettelsePgaDeltidsarbeid}
                        skjemadata={this.getSkjemadataForUtsettelsePgaDeltidsarbeid()}
                    />
                </Block>
                {antallDager && (
                    <>
                        <Block visible={variant === Utsettelsesvariant.Ferie} hasChildBlocks={true}>
                            <UtsettelsePgaFerieForm
                                antallDager={antallDager}
                                onChange={(p) => this.props.onChange(p)}
                                forelder={Forelder.FORELDER_1}
                            />
                        </Block>
                        <Block visible={variant === Utsettelsesvariant.Sykdom} hasChildBlocks={true}>
                            <UtsettelsePgaSykdomForm
                                onChange={(p) => this.props.onChange(p)}
                                periode={periode as Periode}
                                forelder={Forelder.FORELDER_1}
                            />
                        </Block>
                    </>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        søknad: state.søknad
    };
};

export default connect(mapStateToProps)(injectIntl(UtsettelsesperiodeForm));
