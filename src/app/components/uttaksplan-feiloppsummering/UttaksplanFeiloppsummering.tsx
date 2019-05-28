import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { NavnPåForeldre } from 'common/types';
import { Periode } from '../../types/uttaksplan/periodetyper';
import { SummaryError } from 'common/lib/validation/types';
import { uttaksplanleggerDomId } from '../uttaksplanlegger/Uttaksplanlegger';
import { UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';
import Feiloppsummering from 'common/lib/validation/errors/Feiloppsummering';
import getMessage from 'common/util/i18nUtils';
import { getRegelIntlValues } from '../../regler/uttaksplanValidering/regelUtils';
import { RegelAvvikInfo, RegelAlvorlighet } from '../../regler/uttaksplanValidering/types';

interface OwnProps {
    uttaksplan: Periode[];
    uttaksplanValidering: UttaksplanValideringState;
    navnPåForeldre: NavnPåForeldre;
    erSynlig?: boolean;
    onErrorClick: (periodeId: string) => void;
}

interface PeriodeRelatertFeil {
    periodeId: string;
}

type UttaksplanValideringFeil = SummaryError<PeriodeRelatertFeil>;

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
        const { uttaksplanValidering, erSynlig, intl } = this.props;
        if (erSynlig === false) {
            return null;
        }

        const feil: UttaksplanValideringFeil[] = [];
        if (uttaksplanValidering.resultat && uttaksplanValidering.resultat.harFeil) {
            uttaksplanValidering.resultat.avvik
                .filter((a) => a.alvorlighet === RegelAlvorlighet.FEIL)
                .forEach((avvik) => {
                    const addFeilInfo = (info: RegelAvvikInfo) => {
                        feil.push({
                            name: uttaksplanleggerDomId,
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
