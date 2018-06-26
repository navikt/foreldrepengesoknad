import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import Modal from 'nav-frontend-modal';

import { DispatchProps } from 'common/redux/types';
import {
    lukkPeriodeDialog,
    opprettEllerOppdaterPeriode,
    slettPeriode
} from 'uttaksplan/redux/actions';
import {
    Periodetype,
    Uttaksperiode,
    Periode,
    Dekningsgrad
} from 'uttaksplan/types';

import UttaksperiodeSkjema from 'uttaksplan/skjema/uttaksperiodeSkjema/UttaksperiodeSkjema';
import { UttaksplanAppState } from 'uttaksplan/redux/types';
import { Uttaksgrunnlag } from 'uttaksplan/types/uttaksgrunnlag';
import { getUgyldigeTidsperioderForUttaksperiode } from 'uttaksplan/skjema/uttaksperiodeSkjema/uttaksperiodeskjemaUtils';

interface StateProps {
    isOpen: boolean;
    perioder?: Periode[];
    valgtPeriode?: Uttaksperiode;
}

interface OwnProps {
    uttaksgrunnlag: Uttaksgrunnlag;
    termindato: Date;
    dekningsgrad: Dekningsgrad;
}

type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps;

const UttaksperiodeDialog: React.StatelessComponent<Props> = (props: Props) => {
    const periodetype = Periodetype.Uttak;
    const {
        termindato,
        dekningsgrad,
        isOpen,
        valgtPeriode,
        perioder,
        uttaksgrunnlag,
        dispatch,
        intl
    } = props;
    if (!isOpen || !perioder || !uttaksgrunnlag) {
        return null;
    }
    return (
        <Modal
            isOpen={isOpen}
            contentLabel={intl.formatMessage({
                id: `uttaksplan.periodedialog.${periodetype}.tittel`
            })}
            onRequestClose={() => dispatch(lukkPeriodeDialog())}
            className="periodeSkjemaDialog">
            <UttaksperiodeSkjema
                termindato={termindato}
                dekningsgrad={dekningsgrad}
                periode={valgtPeriode}
                ugyldigeTidsperioder={getUgyldigeTidsperioderForUttaksperiode(
                    perioder
                )}
                uttaksgrunnlag={uttaksgrunnlag}
                onChange={(p) => dispatch(opprettEllerOppdaterPeriode(p))}
                onFjern={(p) => dispatch(slettPeriode(p))}
            />
        </Modal>
    );
};

const mapStateToProps = (state: UttaksplanAppState): StateProps => {
    const { periode } = state.uttaksplan;
    if (
        !periode.dialogErApen ||
        (periode.valgtPeriode &&
            periode.valgtPeriode.periodetype !== Periodetype.Uttak)
    ) {
        return { isOpen: false };
    }
    return {
        isOpen: true,
        valgtPeriode: periode.valgtPeriode
            ? (periode.valgtPeriode.periode as Uttaksperiode)
            : undefined,
        perioder: periode.perioder
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeDialog));
