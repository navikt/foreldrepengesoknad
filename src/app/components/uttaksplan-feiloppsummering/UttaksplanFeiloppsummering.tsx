import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { begrunnelseSenEndringMaxLength } from 'app/util/validation/uttaksplan/begrunnelseForSenEndringValidation';
import { getFritekstErrorMessage } from 'app/util/validation/fritekstfelt';
import { getPeriodelisteElementId } from '../periodeliste/Periodeliste';
import { getStønadskontoNavn } from '../../util/uttaksplan';
import { NavnPåForeldre } from 'common/types';
import { Periode } from '../../types/uttaksplan/periodetyper';
import { Periodene } from '../../util/uttaksplan/Periodene';
import { Stønadskontouttak } from '../uttaksoppsummering/Uttaksoppsummering';
import { SummaryError } from 'common/lib/validation/types';
import { uttaksplanleggerDomId } from '../uttaksplanlegger/Uttaksplanlegger';
import { ValidertPeriode, UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';
import Feiloppsummering from 'common/lib/validation/errors/Feiloppsummering';
import getMessage from 'common/util/i18nUtils';

interface OwnProps {
    uttaksplan: Periode[];
    uttaksplanValidering: UttaksplanValideringState;
    navnPåForeldre: NavnPåForeldre;
    erSynlig?: boolean;
    onErrorClick: (periodeId: string) => void;
}

type UttaksplanValideringFeil = SummaryError<ValidertPeriode>;

export type Props = OwnProps & InjectedIntlProps;

class UttaksplanFeiloppsummering extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleOnErrorClick = this.handleOnErrorClick.bind(this);
    }
    handleOnErrorClick(error: UttaksplanValideringFeil, evt: React.MouseEvent<HTMLAnchorElement>) {
        evt.stopPropagation();
        evt.preventDefault();
        const { onErrorClick } = this.props;
        if (error.payload && error.payload.periodeId) {
            onErrorClick(error.payload.periodeId);
        }
    }
    render() {
        const { uttaksplanValidering, erSynlig, uttaksplan, navnPåForeldre, intl } = this.props;
        if (erSynlig === false) {
            return null;
        }
        const { periodevalidering } = uttaksplanValidering;
        const validertePerioder: ValidertPeriode[] = Object.keys(periodevalidering)
            .map((key) => periodevalidering[key])
            .filter((p) => p.valideringsfeil.length > 0 || p.overlappendePerioder.length > 0);

        const feil: UttaksplanValideringFeil[] = validertePerioder.map((validertPeriode): UttaksplanValideringFeil => {
            const periode = Periodene(uttaksplan).getPeriode(validertPeriode.periodeId);
            if (periode === undefined) {
                return {
                    name: validertPeriode.periodeId,
                    payload: validertPeriode,
                    text: getMessage(intl, 'uttaksplan.validering.feilUkjentPeriode')
                };
            }
            const feilmelding: string =
                validertPeriode.valideringsfeil.length > 0
                    ? getMessage(intl, `uttaksplan.validering.feil.${validertPeriode.valideringsfeil[0].feilKey}`)
                    : getMessage(intl, 'uttaksplan.validering.feil.periodeoverlapp');
            return {
                name: getPeriodelisteElementId(validertPeriode.periodeId),
                payload: validertPeriode,
                text: feilmelding
            };
        });

        if (uttaksplanValidering.inneholderPerioder === false) {
            feil.push({
                name: uttaksplanleggerDomId,
                text: getMessage(intl, 'uttaksplan.validering.feil.tomUttaksplan')
            });
        }

        if (uttaksplanValidering.stønadskontoerMedForMyeUttak.length > 0) {
            uttaksplanValidering.stønadskontoerMedForMyeUttak.forEach((uttak: Stønadskontouttak) => {
                feil.push({
                    name: uttaksplanleggerDomId,
                    text: getMessage(intl, 'uttaksplan.validering.feil.forMyeUttak', {
                        konto: getStønadskontoNavn(intl, uttak.konto, navnPåForeldre).toLowerCase()
                    })
                });
            });
        }

        if (uttaksplanValidering.morHarSøktUgyldigUtsettelseFørsteSeksUker) {
            feil.push({
                name: uttaksplanleggerDomId,
                text: getMessage(intl, 'uttaksplan.validering.feil.morHarSøktUgyldigUtsettelseSeksFør')
            });
        }

        if (uttaksplanValidering.farHarSøktUgyldigUtsettelseFørsteSeksUker) {
            feil.push({
                name: uttaksplanleggerDomId,
                text: getMessage(intl, 'uttaksplan.validering.feil.farHarSøktUgyldigUtsettelseSeksFør')
            });
        }

        if (uttaksplanValidering.uttaksmengdeForFarMedmorForHøy === true) {
            feil.push({
                name: uttaksplanleggerDomId,
                text: getMessage(intl, 'uttaksplan.validering.feil.farMedmorForHøytUttak')
            });
        }

        if (uttaksplanValidering.uttakErBareOpphold === true) {
            feil.push({
                name: uttaksplanleggerDomId,
                text: getMessage(intl, 'uttaksplan.validering.feil.uttaksplanKunOpphold')
            });
        }

        if (uttaksplanValidering.uttaksplanStarterMedOpphold === true) {
            feil.push({
                name: uttaksplanleggerDomId,
                text: getMessage(intl, 'uttaksplan.validering.feil.uttaksplanStarterMedOpphold')
            });
        }

        if (uttaksplanValidering.uttaksplanSlutterMedOpphold === true) {
            feil.push({
                name: uttaksplanleggerDomId,
                text: getMessage(intl, 'uttaksplan.validering.feil.uttaksplanSlutterMedOpphold')
            });
        }

        if (uttaksplanValidering.uttaksplanGraderingStørreEnnSamtidigUttak === true) {
            feil.push({
                name: uttaksplanleggerDomId,
                text: getMessage(intl, 'uttaksplan.validering.feil.graderingsProsentErHøyereEnnSamtidigUttak')
            });
        }

        if (uttaksplanValidering.begrunnelseForSenEndringErGyldig === false) {
            feil.push({
                name: uttaksplanleggerDomId,
                text: getFritekstErrorMessage(intl, begrunnelseSenEndringMaxLength)
            });
        }

        if (uttaksplanValidering.uttaksplanHarForMangeFlerbarnsdager === true) {
            feil.push({
                name: uttaksplanleggerDomId,
                text: getMessage(intl, 'uttaksplan.validering.feil.uttaksplanHarForMangeFlerbarnsdager')
            });
        }

        return (
            <Feiloppsummering
                show={erSynlig === true && uttaksplanValidering.erGyldig === false}
                title={getMessage(intl, 'uttaksplan.validering.feiloppsummering.tittel')}
                errors={feil}
                onErrorClick={this.handleOnErrorClick}
            />
        );
    }
}
export default injectIntl(UttaksplanFeiloppsummering);
