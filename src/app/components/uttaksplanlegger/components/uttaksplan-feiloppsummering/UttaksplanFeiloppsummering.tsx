import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { NavnPåForeldre } from 'common/types';
import { SummaryError } from 'common/lib/validation/types';
import Feiloppsummering from 'common/lib/validation/errors/Feiloppsummering';
import getMessage from 'common/util/i18nUtils';
import { UttaksplanValideringState } from 'app/redux/reducers/uttaksplanValideringReducer';
import { Periode } from 'app/types/uttaksplan/periodetyper';
import { UTTAKSPLANLEGGER_DOM_ID } from '../../Uttaksplanlegger';
import { RegelAlvorlighet, RegelAvvikInfo } from 'shared/regler/regelTypes';
import { getRegelIntlValues } from 'shared/regler/regelUtils';

interface OwnProps {
    uttaksplan: Periode[];
    uttaksplanValidering: UttaksplanValideringState;
    navnPåForeldre: NavnPåForeldre;
    erSynlig?: boolean;
    onErrorClick: (periodeId: string) => void;
    intl: IntlShape;
}

interface PeriodeRelatertFeil {
    periodeId: string;
}

type UttaksplanValideringFeil = SummaryError<PeriodeRelatertFeil>;

export type Props = OwnProps;

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
        const { uttaksplanValidering, erSynlig, intl } = this.props;
        if (erSynlig === false) {
            return null;
        }

        const feil: UttaksplanValideringFeil[] = [];
        if (uttaksplanValidering.resultat && uttaksplanValidering.resultat.harFeil) {
            uttaksplanValidering.resultat.avvik
                .filter((a) => a.regel.alvorlighet === RegelAlvorlighet.FEIL)
                .forEach((avvik) => {
                    const addFeilInfo = (info: RegelAvvikInfo) => {
                        feil.push({
                            name: UTTAKSPLANLEGGER_DOM_ID,
                            text: getMessage(intl, info.intlKey, getRegelIntlValues(intl, info)),
                            payload: info.periodeId ? { periodeId: info.periodeId } : undefined
                        });
                    };
                    addFeilInfo(avvik.info);
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
