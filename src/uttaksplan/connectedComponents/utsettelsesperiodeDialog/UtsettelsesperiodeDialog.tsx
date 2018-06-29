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

import { UttaksplanAppState } from 'uttaksplan/redux/types';
import { getGyldigTidsromForUtsettelse } from 'uttaksplan/utils/permisjonUtils';
import { Uttaksinfo } from 'uttaksplan/uttak/uttaksinfo';
import { Uttaksgrunnlag } from 'uttaksplan/uttak/uttaksgrunnlag';
import UtsettelseSkjema from 'uttaksplan/components/skjema/utsettelseSkjema/UtsettelseSkjema';

interface StateProps {
    isOpen: boolean;
    utsettelse?: Utsettelsesperiode;
    tidsromForUtsettelse?: Tidsperiode;
    perioder?: Periode[];
    uttaksgrunnlag?: Uttaksgrunnlag;
}

interface OwnProps {
    familiehendelsedato: Date;
    permisjonsregler: Permisjonsregler;
    navnForelder1?: string;
    navnForelder2?: string;
    uttaksinfo: Uttaksinfo;
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
        familiehendelsedato,
        uttaksgrunnlag,

        dispatch,
        intl
    } = props;

    if (!isOpen || !perioder || !tidsromForUtsettelse || !uttaksgrunnlag) {
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
                søker={uttaksgrunnlag.søker}
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
                familiehendelsedato={familiehendelsedato}
            />
        </Modal>
    );
};

const mapStateToProps = (
    state: UttaksplanAppState,
    props: OwnProps
): StateProps | undefined => {
    const { form, uttaksplan, view } = state.uttaksplan;
    const { familiehendelsedato } = props;
    const { dekningsgrad } = form;
    const sisteRegistrertePermisjonsdag =
        props.uttaksinfo.registrertTidsperiode.sluttdato;
    if (
        !familiehendelsedato ||
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
        familiehendelsedato,
        props.permisjonsregler,
        sisteRegistrertePermisjonsdag
    );

    return {
        isOpen: true,
        utsettelse: view.valgtPeriode.periode as Utsettelsesperiode,
        perioder: uttaksplan.perioder,
        tidsromForUtsettelse,
        uttaksgrunnlag: state.uttaksplan.uttaksplan.uttaksgrunnlag
    };
};

export default connect(mapStateToProps)(injectIntl(UtsettelsesperiodeDialog));
