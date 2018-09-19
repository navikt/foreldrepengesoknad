import * as React from 'react';
import {
    Periode,
    Periodetype,
    StønadskontoType,
    TilgjengeligStønadskonto,
    Uttaksperiode,
    ForeldrepengerFørFødselUttaksperiode,
    isForeldrepengerFørFødselUttaksperiode
} from '../../types/uttaksplan/periodetyper';
import { Forelder, Tidsperiode } from 'common/types';
import { RecursivePartial } from '../../types/Partial';
import Søknad, { SøkerRolle } from '../../types/søknad/Søknad';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import HvilkenKvoteSkalBenyttesSpørsmål from '../../spørsmål/HvilkenKvoteSkalBenyttesSpørsmål';
import { getVelgbareStønadskontotyper } from '../../util/uttaksplan/stønadskontoer';
import Block from 'common/components/block/Block';
import FellesperiodeUttakForm, {
    FellesperiodeUttakSkjemadata
} from './fellesperiode-uttak-form/FellesperiodeUttakForm';
import { annenForelderSkalHaForeldrepenger, erFarEllerMedmor } from '../../util/domain/personUtil';
import { Søkerinfo } from '../../types/søkerinfo';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import TidsperiodeBolk from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import EgenDelUttakForm from './egen-del-uttak-form/EgenDelUttakForm';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { getPermisjonsregler } from '../../util/uttaksplan/permisjonsregler';
import { getDatoavgrensningerForStønadskonto } from '../../util/uttaksplan/uttaksperiodeUtils';
import { getFamiliehendelsedato, getNavnPåForeldre } from '../../util/uttaksplan';
import ForeldrepengerFørFødselUttakForm from './foreldrepenger-før-fødsel-uttak-form/ForeldrepengerFørFødselUttakForm';

interface UttaksperiodeFormProps {
    periode: RecursivePartial<Uttaksperiode>;
    kanEndreStønadskonto?: boolean;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

interface StateProps {
    søknad: Søknad;
    søkerinfo: Søkerinfo;
    familiehendelsesdato: Date;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
}

type Props = UttaksperiodeFormProps & StateProps & InjectedIntlProps;

class UttaksperiodeForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.getSkjemadataForFellesperiodeUttak = this.getSkjemadataForFellesperiodeUttak.bind(this);
        this.updateFellesperiodeUttak = this.updateFellesperiodeUttak.bind(this);
        this.getTidsperiodeDisabledProps = this.getTidsperiodeDisabledProps.bind(this);
    }

    getSkjemadataForFellesperiodeUttak(): FellesperiodeUttakSkjemadata {
        const { morsAktivitetIPerioden, vedlegg, ønskerSamtidigUttak } = this.props.periode;
        return {
            vedlegg: vedlegg as Attachment[],
            morsAktivitetIPerioden,
            ønskerSamtidigUttak
        };
    }

    updateFellesperiodeUttak(data: FellesperiodeUttakSkjemadata, erFarMedmorVerdi: boolean) {
        const { onChange } = this.props;
        onChange({
            ...data,
            forelder: erFarMedmorVerdi ? Forelder.FARMEDMOR : Forelder.MOR,
            type: Periodetype.Uttak
        });
    }

    updateEgenPeriodeUttak(ønskerSamtidigUttak: boolean) {
        const { onChange } = this.props;
        onChange({
            ønskerSamtidigUttak,
            type: Periodetype.Uttak
        });
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

    render() {
        const {
            periode,
            tilgjengeligeStønadskontoer,
            onChange,
            søknad,
            søkerinfo,
            kanEndreStønadskonto,
            familiehendelsesdato
        } = this.props;
        const { søker, annenForelder } = søknad;
        const { rolle } = søker;
        const { konto, tidsperiode } = periode;
        const velgbareStønadskontoer = getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer);
        const validTidsperiode = getValidTidsperiode(periode.tidsperiode as Partial<Tidsperiode>);
        const søkerErFarMedmor = erFarEllerMedmor(søkerinfo.person.kjønn, rolle);

        const erUttakAvEgenKvote =
            (konto === StønadskontoType.Mødrekvote && (rolle === SøkerRolle.MOR || søkerErFarMedmor === false)) ||
            (konto === StønadskontoType.Fedrekvote &&
                (erFarEllerMedmor(søkerinfo.person.kjønn, rolle) === true || søkerErFarMedmor === true));

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
                        onChange={(stønadskonto: StønadskontoType) => {
                            onChange({ konto: stønadskonto });
                        }}
                        navnPåForeldre={getNavnPåForeldre(søknad, søkerinfo.person)}
                        velgbareStønadskontoer={velgbareStønadskontoer}
                        stønadskonto={konto}
                    />
                </Block>
                <Block visible={konto === StønadskontoType.Fellesperiode}>
                    <FellesperiodeUttakForm
                        søkerErFarMedmor={søkerErFarMedmor}
                        annenForelderSkalHaForeldrepenger={annenForelderSkalHaForeldrepenger(annenForelder)}
                        skjemadata={this.getSkjemadataForFellesperiodeUttak()}
                        onChange={(data: FellesperiodeUttakSkjemadata) =>
                            this.updateFellesperiodeUttak(data, søkerErFarMedmor)
                        }
                    />
                </Block>
                <Block visible={erUttakAvEgenKvote} hasChildBlocks={true}>
                    <EgenDelUttakForm
                        ønskerSamtidigUttak={periode.ønskerSamtidigUttak}
                        onChange={(ønskerSamtidigUttak) => this.updateEgenPeriodeUttak(ønskerSamtidigUttak)}
                    />
                </Block>
                <Block visible={isForeldrepengerFørFødselUttaksperiode(periode as Periode)}>
                    <ForeldrepengerFørFødselUttakForm
                        skalIkkeHaUttakFørTermin={
                            (periode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin
                        }
                        onChange={(skalIkkeHaUttakFørTermin) =>
                            this.updateForeldrepengerFørFødselUttak(skalIkkeHaUttakFørTermin)
                        }
                    />
                </Block>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    const { situasjon, barn } = state.søknad;
    return {
        søknad: state.søknad,
        søkerinfo: state.api.søkerinfo!,
        tilgjengeligeStønadskontoer: state.api.tilgjengeligeStønadskontoer,
        familiehendelsesdato: getFamiliehendelsedato(barn, situasjon)
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeForm));
