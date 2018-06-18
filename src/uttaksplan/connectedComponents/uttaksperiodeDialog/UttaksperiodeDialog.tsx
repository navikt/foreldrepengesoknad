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
import AnnenForelder from 'app/types/s\u00F8knad/AnnenForelder';
import Person from 'app/types/Person';
import { Søker } from 'app/types/s\u00F8knad/S\u00F8ker';

interface StateProps {
    isOpen: boolean;
    periode?: Uttaksperiode;
    perioder: Periode[];
    dekningsgrad: Dekningsgrad;
}

interface OwnProps {
    termindato: Date;
    permisjonsregler: Permisjonsregler;
    bruker: Person;
    annenForelder?: AnnenForelder;
    søker: Søker;
}

type Props = StateProps & OwnProps & DispatchProps & InjectedIntlProps;

const PeriodeDialog: React.StatelessComponent<Props> = (props: Props) => {
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
        termindato
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
                onChange={(p) => props.dispatch(opprettEllerOppdaterPeriode(p))}
                onFjern={(p) => props.dispatch(slettPeriode(p))}
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
        return undefined;
    }
    return {
        isOpen: true,
        periode: periode.valgtPeriode.periode as Uttaksperiode,
        perioder: periode.perioder,
        dekningsgrad
    };
};

export default connect(mapStateToProps)(injectIntl(PeriodeDialog));
