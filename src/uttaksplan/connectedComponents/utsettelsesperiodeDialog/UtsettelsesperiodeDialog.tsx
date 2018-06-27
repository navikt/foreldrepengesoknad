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
    Tidsperiode,
    Permisjonsregler,
    Periode,
    Periodetype,
    Utsettelsesperiode
} from 'uttaksplan/types';

import UtsettelseSkjema from 'uttaksplan/skjema/utsettelseSkjema/UtsettelseSkjema';
import { UttaksplanAppState } from 'uttaksplan/redux/types';
import { getSisteRegistrertePermisjonsdag } from 'uttaksplan/selectors/periodeSelector';
import { getGyldigTidsromForUtsettelse } from 'uttaksplan/utils/permisjonUtils';

interface StateProps {
    isOpen: boolean;
    utsettelse?: Utsettelsesperiode;
    tidsromForUtsettelse?: Tidsperiode;
    perioder?: Periode[];
}

interface OwnProps {
    termindato: Date;
    permisjonsregler: Permisjonsregler;
    navnForelder1?: string;
    navnForelder2?: string;
}

type Props = StateProps & OwnProps & DispatchProps & InjectedIntlProps;

const UtsettelsesperiodeDialog: React.StatelessComponent<Props> = (
    props: Props
) => {
    const periodetype = Periodetype.Uttak;
    const {
        isOpen,
        utsettelse,
        perioder,
        permisjonsregler,
        navnForelder1,
        navnForelder2,
        tidsromForUtsettelse,
        termindato,
        dispatch,
        intl
    } = props;

    if (!isOpen || !perioder || !tidsromForUtsettelse) {
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
            <UtsettelseSkjema
                registrerteUtsettelser={
                    perioder.filter(
                        (p) => p.type === Periodetype.Utsettelse
                    ) as Utsettelsesperiode[]
                }
                utsettelse={utsettelse}
                navnForelder1={navnForelder1}
                navnForelder2={navnForelder2}
                permisjonsregler={permisjonsregler}
                tidsperiode={tidsromForUtsettelse}
                onChange={(p) => {
                    dispatch(opprettEllerOppdaterPeriode(p));
                    dispatch(lukkPeriodeDialog());
                }}
                onFjern={(p) => {
                    dispatch(slettPeriode(p));
                    dispatch(lukkPeriodeDialog());
                }}
                termindato={termindato}
            />
        </Modal>
    );
};

const mapStateToProps = (
    state: UttaksplanAppState,
    props: OwnProps
): StateProps | undefined => {
    const { form, uttaksplan, view } = state.uttaksplan;
    const { termindato } = props;
    const { dekningsgrad } = form;
    const sisteRegistrertePermisjonsdag = getSisteRegistrertePermisjonsdag(
        state
    );
    if (
        !termindato ||
        !dekningsgrad ||
        !sisteRegistrertePermisjonsdag ||
        !view.dialogErApen ||
        view.valgtPeriode === undefined ||
        view.valgtPeriode.periodetype !== Periodetype.Utsettelse
    ) {
        return {
            isOpen: false
        };
    }

    const tidsromForUtsettelse = getGyldigTidsromForUtsettelse(
        termindato,
        dekningsgrad,
        props.permisjonsregler,
        sisteRegistrertePermisjonsdag
    );

    return {
        isOpen: true,
        utsettelse: view.valgtPeriode.periode as Utsettelsesperiode,
        perioder: uttaksplan.perioder,
        tidsromForUtsettelse
    };
};

export default connect(mapStateToProps)(injectIntl(UtsettelsesperiodeDialog));
