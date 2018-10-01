import * as React from 'react';
import {
    Periode,
    Periodetype,
    StønadskontoType,
    Uttaksperiode,
    ForeldrepengerFørFødselUttaksperiode,
    isForeldrepengerFørFødselUttaksperiode,
    Overføringsperiode
} from '../../types/uttaksplan/periodetyper';
import { Forelder, Tidsperiode } from 'common/types';
import { RecursivePartial } from '../../types/Partial';
import Søknad from '../../types/søknad/Søknad';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import HvilkenKvoteSkalBenyttesSpørsmål from '../../spørsmål/HvilkenKvoteSkalBenyttesSpørsmål';
import Block from 'common/components/block/Block';
import FellesperiodeUttakForm from './fellesperiode-uttak-form/FellesperiodeUttakForm';
import { annenForelderSkalHaForeldrepenger } from '../../util/domain/personUtil';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import TidsperiodeBolk from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { getPermisjonsregler } from '../../util/uttaksplan/permisjonsregler';
import { getDatoavgrensningerForStønadskonto } from '../../util/uttaksplan/uttaksperiodeUtils';
import ForeldrepengerFørFødselUttakForm from './foreldrepenger-før-fødsel-uttak-form/ForeldrepengerFørFødselUttakForm';
import OverføringUttakForm, { OverføringUttakFormSkjemadata } from './overføring-uttak-form/OverføringUttakForm';
import Arbeidsforhold from '../../types/Arbeidsforhold';
import GradertUttakForm from './gradert-uttak-form/GradertUttakForm';
import { getVelgbareStønadskontotyper } from '../../util/uttaksplan/stønadskontoer';

interface UttaksperiodeFormProps {
    periode: RecursivePartial<Uttaksperiode> | RecursivePartial<Overføringsperiode>;
    kanEndreStønadskonto?: boolean;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

interface StateProps {
    søknad: Søknad;
    arbeidsforhold?: Arbeidsforhold[];
    velgbareStønadskontotyper: StønadskontoType[];
}

type Props = UttaksperiodeFormProps & StateProps & InjectedIntlProps;

const erUttakAvAnnenForeldersKvote = (konto: StønadskontoType | undefined, søkerErFarEllerMedmor: boolean): boolean => {
    return (
        (konto === StønadskontoType.Mødrekvote && søkerErFarEllerMedmor) ||
        (konto === StønadskontoType.Fedrekvote && !søkerErFarEllerMedmor)
    );
};

class UttaksperiodeForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.getTidsperiodeDisabledProps = this.getTidsperiodeDisabledProps.bind(this);
        this.updateStønadskontoType = this.updateStønadskontoType.bind(this);
        this.updatePeriodeGradering = this.updatePeriodeGradering.bind(this);
    }

    getSkjemadataForOverføring(): OverføringUttakFormSkjemadata {
        const { periode } = this.props;
        if (periode.type === Periodetype.Overføring) {
            return {
                årsak: periode.årsak,
                vedlegg: periode.vedlegg as Attachment[]
            };
        }
        return {};
    }

    updateForeldrepengerFørFødselUttak(skalIkkeHaUttakFørTermin: boolean) {
        const { onChange } = this.props;
        onChange({
            skalIkkeHaUttakFørTermin,
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: undefined,
                tom: undefined
            }
        });
    }

    updatePeriodeGradering(periode: RecursivePartial<Uttaksperiode>) {
        this.props.onChange({ ...periode });
    }

    updateOverføringUttak(skjemadata: OverføringUttakFormSkjemadata) {
        const { onChange } = this.props;
        onChange({
            type: Periodetype.Overføring,
            ...skjemadata,
            forelder: this.props.søknad.ekstrainfo.uttaksplanInfo!.søkerErFarEllerMedmor
                ? Forelder.FARMEDMOR
                : Forelder.MOR
        });
    }

    updateStønadskontoType(konto: StønadskontoType) {
        const uttaksplanInfo = this.props.søknad.ekstrainfo.uttaksplanInfo!;

        if (erUttakAvAnnenForeldersKvote(konto, uttaksplanInfo.søkerErFarEllerMedmor)) {
            this.props.onChange({
                type: Periodetype.Overføring,
                konto
            });
        } else {
            this.props.onChange({
                type: Periodetype.Uttak,
                konto
            });
        }
    }

    getTidsperiodeDisabledProps(): { startdatoDisabled?: boolean; sluttdatoDisabled?: boolean } | undefined {
        const { periode } = this.props;
        if (isForeldrepengerFørFødselUttaksperiode(periode as Periode)) {
            const skalIkkeHaUttak = (periode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin;
            return {
                startdatoDisabled: skalIkkeHaUttak,
                sluttdatoDisabled: skalIkkeHaUttak
            };
        }
        return undefined;
    }

    renderStønadskontoFormParts() {
        const { periode, søknad } = this.props;
        const { annenForelder } = søknad;
        const { uttaksplanInfo } = søknad.ekstrainfo;
        const { søkerErFarEllerMedmor, navnPåForeldre } = uttaksplanInfo!;
        const validTidsperiode = getValidTidsperiode(periode.tidsperiode as Partial<Tidsperiode>);

        if (periode.konto === StønadskontoType.ForeldrepengerFørFødsel) {
            return (
                <ForeldrepengerFørFødselUttakForm
                    skalIkkeHaUttakFørTermin={
                        (periode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin
                    }
                    onChange={(skalIkkeHaUttakFørTermin) =>
                        this.updateForeldrepengerFørFødselUttak(skalIkkeHaUttakFørTermin)
                    }
                />
            );
        }
        if (validTidsperiode) {
            if (periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.Fellesperiode) {
                return (
                    <FellesperiodeUttakForm
                        søkerErFarMedmor={søkerErFarEllerMedmor}
                        navnPåForeldre={navnPåForeldre}
                        annenForelderSkalHaForeldrepenger={annenForelderSkalHaForeldrepenger(annenForelder)}
                        periode={periode}
                        onChange={this.props.onChange}
                    />
                );
            } else if (erUttakAvAnnenForeldersKvote(periode.konto, søkerErFarEllerMedmor)) {
                return (
                    <OverføringUttakForm
                        skjemadata={this.getSkjemadataForOverføring()}
                        navnAnnenForelder={søknad.annenForelder.fornavn}
                        søkerErFarEllerMedmor={søkerErFarEllerMedmor}
                        onChange={(skjemadata) => this.updateOverføringUttak(skjemadata)}
                    />
                );
            }
        }
        return undefined;
    }

    render() {
        const {
            periode,
            onChange,
            søknad,
            kanEndreStønadskonto,
            arbeidsforhold,
            velgbareStønadskontotyper
        } = this.props;
        const { tidsperiode } = periode;
        const { uttaksplanInfo } = søknad.ekstrainfo;
        const { navnPåForeldre, familiehendelsesdato } = uttaksplanInfo!;
        const validTidsperiode = getValidTidsperiode(periode.tidsperiode as Partial<Tidsperiode>);

        return (
            <React.Fragment>
                <Block margin="s">
                    <TidsperiodeBolk
                        onChange={(v: Partial<Tidsperiode>) => onChange({ tidsperiode: v })}
                        tidsperiode={tidsperiode as Partial<Tidsperiode>}
                        visVarighet={true}
                        {...this.getTidsperiodeDisabledProps()}
                        datoAvgrensninger={
                            periode.konto
                                ? getDatoavgrensningerForStønadskonto(
                                      periode.konto,
                                      familiehendelsesdato,
                                      getPermisjonsregler()
                                  )
                                : undefined
                        }
                    />
                </Block>
                <Block margin="s" visible={validTidsperiode !== undefined && kanEndreStønadskonto}>
                    <HvilkenKvoteSkalBenyttesSpørsmål
                        onChange={(stønadskontoType) => this.updateStønadskontoType(stønadskontoType)}
                        navnPåForeldre={navnPåForeldre}
                        velgbareStønadskontoer={velgbareStønadskontotyper}
                        stønadskonto={periode.konto}
                    />
                </Block>
                <Block
                    hasChildBlocks={true}
                    visible={validTidsperiode !== undefined || isForeldrepengerFørFødselUttaksperiode(periode)}>
                    {this.renderStønadskontoFormParts()}
                </Block>

                {validTidsperiode &&
                    periode.type === Periodetype.Uttak &&
                    (periode.konto && periode.konto !== StønadskontoType.ForeldrepengerFørFødsel) && (
                        <GradertUttakForm
                            periode={periode}
                            annenForelderHarRettPåForeldrepenger={søknad.annenForelder.harRettPåForeldrepenger}
                            erAleneOmOmsorg={søknad.søker.erAleneOmOmsorg}
                            arbeidsforhold={arbeidsforhold}
                            onChange={this.props.onChange}
                        />
                    )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        søknad: state.søknad,
        arbeidsforhold: state.api.søkerinfo!.arbeidsforhold,
        velgbareStønadskontotyper: getVelgbareStønadskontotyper(state.api.tilgjengeligeStønadskontoer)
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeForm));
