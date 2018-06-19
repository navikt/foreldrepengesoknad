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
    Permisjonsregler,
    Periodetype,
    Uttaksperiode,
    Periode,
    Dekningsgrad
} from 'uttaksplan/types';

import UttaksperiodeSkjema from 'uttaksplan/skjema/uttaksperiodeSkjema/UttaksperiodeSkjema';
import { getUgyldigeTidsperioderForUttaksperiode } from 'uttaksplan/utils/periodeskjemaUtils';
import { UttaksplanAppState } from 'uttaksplan/redux/types';
import AnnenForelder from 'app/types/søknad/AnnenForelder';
import Person from 'app/types/Person';
import { Søker } from 'app/types/søknad/Søker';

interface StateProps {
    isOpen: boolean;
    periode?: Uttaksperiode;
    perioder?: Periode[];
    dekningsgrad?: Dekningsgrad;
}

interface OwnProps {
    termindato: Date;
    permisjonsregler: Permisjonsregler;
    bruker: Person;
    annenForelder?: AnnenForelder;
    søker: Søker;
}

type Props = StateProps & OwnProps & DispatchProps & InjectedIntlProps;

const UttaksperiodeDialog: React.StatelessComponent<Props> = (props: Props) => {
    const periodetype = Periodetype.Uttak;
    const {
        isOpen,
        periode,
        perioder,
        permisjonsregler,
        bruker,
        annenForelder,
        søker,
        dekningsgrad,
        termindato,
        dispatch,
        intl
    } = props;
    if (!isOpen || !perioder || !dekningsgrad) {
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
                periode={periode}
                ugyldigeTidsperioder={getUgyldigeTidsperioderForUttaksperiode(
                    perioder
                )}
                termindato={termindato}
                dekningsgrad={dekningsgrad}
                permisjonsregler={permisjonsregler}
                bruker={bruker}
                annenForelder={annenForelder}
                søker={søker}
                onChange={(p) => dispatch(opprettEllerOppdaterPeriode(p))}
                onFjern={(p) => dispatch(slettPeriode(p))}
            />
        </Modal>
    );
};

const mapStateToProps = (
    state: UttaksplanAppState,
    props: OwnProps
): StateProps | undefined => {
    const { form, periode } = state.uttaksplan;
    const { dekningsgrad } = form;
    if (
        !props.termindato ||
        !dekningsgrad ||
        !periode.dialogErApen ||
        periode.valgtPeriode === undefined ||
        periode.valgtPeriode.periodetype !== Periodetype.Uttak
    ) {
        return { isOpen: false };
    }
    return {
        isOpen: true,
        periode: periode.valgtPeriode.periode as Uttaksperiode,
        perioder: periode.perioder,
        dekningsgrad
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeDialog));
