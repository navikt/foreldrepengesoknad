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
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';
import { UttaksplanAppState } from 'uttaksplan/redux/types';
import { getSisteRegistrertePermisjonsdag } from 'uttaksplan/selectors/periodeSelector';
import { getGyldigTidsromForUtsettelse } from 'uttaksplan/utils/permisjonUtils';

interface StateProps {
    isOpen: boolean;
    utsettelse?: Utsettelsesperiode;
    tidsromForUtsettelse: Tidsperiode;
    perioder: Periode[];
    permisjonsregler: Permisjonsregler;
    navnForelder1?: string;
    navnForelder2?: string;
    termindato: Date;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

const UtsettelsesperiodeDialog: React.StatelessComponent<Props> = (
    props: Props
) => {
    const periodetype = Periodetype.Uttak;
    const {
        isOpen,
        utsettelse,
        permisjonsregler,
        navnForelder1,
        navnForelder2,
        tidsromForUtsettelse,
        termindato,
        dispatch
    } = props;

    if (!isOpen) {
        return null;
    }

    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel={props.intl.formatMessage({
                id: `uttaksplan.periodedialog.${periodetype}.tittel`
            })}
            onRequestClose={() => props.dispatch(lukkPeriodeDialog())}
            className="periodeSkjemaDialog">
            <UtsettelseSkjema
                registrerteUtsettelser={
                    props.perioder.filter(
                        (p) => p.type === Periodetype.Utsettelse
                    ) as Utsettelsesperiode[]
                }
                utsettelse={utsettelse}
                navnForelder1={navnForelder1}
                navnForelder2={navnForelder2}
                permisjonsregler={permisjonsregler}
                tidsperiode={tidsromForUtsettelse}
                onChange={(u) => dispatch(opprettEllerOppdaterPeriode(u))}
                onFjern={(u) => dispatch(slettPeriode(u))}
                termindato={termindato}
            />
        </Modal>
    );
};

const mapStateToProps = (state: UttaksplanAppState): StateProps | undefined => {
    const { form, periode } = state.uttaksplan;
    const { termindato, dekningsgrad } = form;
    const sisteRegistrertePermisjonsdag = getSisteRegistrertePermisjonsdag(
        state
    );
    if (
        !termindato ||
        !dekningsgrad ||
        !sisteRegistrertePermisjonsdag ||
        !periode.dialogErApen ||
        periode.valgtPeriode === undefined ||
        periode.valgtPeriode.periodetype !== Periodetype.Utsettelse
    ) {
        return undefined;
    }

    const permisjonsregler = getPermisjonsregler(termindato);
    const tidsromForUtsettelse = getGyldigTidsromForUtsettelse(
        termindato,
        dekningsgrad,
        permisjonsregler,
        sisteRegistrertePermisjonsdag
    );

    return {
        isOpen: true,
        utsettelse: periode.valgtPeriode.periode as Utsettelsesperiode,
        termindato,
        perioder: periode.perioder,
        tidsromForUtsettelse,
        permisjonsregler,
        navnForelder1: form.navnForelder1,
        navnForelder2: form.navnForelder2
    };
};

export default connect(mapStateToProps)(injectIntl(UtsettelsesperiodeDialog));
