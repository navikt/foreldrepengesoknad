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

import { UttaksplanAppState } from 'uttaksplan/redux/types';
import { Uttaksgrunnlag } from 'uttaksplan/uttak/uttaksgrunnlag';
import UttaksperiodeSkjema from 'uttaksplan/components/skjema/uttaksperiodeSkjema/UttaksperiodeSkjema';
import { getUgyldigeTidsperioderForUttaksperiode } from 'uttaksplan/components/skjema/uttaksperiodeSkjema/uttaksperiodeskjemaUtils';

interface StateProps {
    isOpen: boolean;
    perioder?: Periode[];
    valgtPeriode?: Uttaksperiode;
}

interface OwnProps {
    uttaksgrunnlag: Uttaksgrunnlag;
    familiehendelsedato: Date;
    dekningsgrad: Dekningsgrad;
}

type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps;

const UttaksperiodeDialog: React.StatelessComponent<Props> = (props: Props) => {
    const periodetype = Periodetype.Uttak;
    const {
        familiehendelsedato,
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
                familiehendelsedato={familiehendelsedato}
                dekningsgrad={dekningsgrad}
                periode={valgtPeriode}
                ugyldigeTidsperioder={getUgyldigeTidsperioderForUttaksperiode(
                    perioder
                )}
                uttaksgrunnlag={uttaksgrunnlag}
                onChange={(p) => {
                    dispatch(opprettEllerOppdaterPeriode(p));
                    dispatch(lukkPeriodeDialog());
                }}
                onFjern={(p) => {
                    dispatch(slettPeriode(p));
                    dispatch(lukkPeriodeDialog());
                }}
            />
        </Modal>
    );
};

const mapStateToProps = (state: UttaksplanAppState): StateProps => {
    const { uttaksplan, view } = state.uttaksplan;
    if (
        !view.dialogErApen ||
        (view.valgtPeriode &&
            view.valgtPeriode.periodetype !== Periodetype.Uttak)
    ) {
        return { isOpen: false };
    }
    return {
        isOpen: true,
        valgtPeriode: view.valgtPeriode
            ? (view.valgtPeriode.periode as Uttaksperiode)
            : undefined,
        perioder: uttaksplan.perioder
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeDialog));
