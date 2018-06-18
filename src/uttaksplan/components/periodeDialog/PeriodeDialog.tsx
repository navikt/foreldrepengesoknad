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
    Utsettelsesperiode,
    Uttaksperiode
} from 'uttaksplan/types';

import './periodeDialog.less';
import UtsettelseSkjema from 'uttaksplan/skjema/utsettelseSkjema/UtsettelseSkjema';
import UttaksperiodeSkjema from 'uttaksplan/skjema/uttaksperiodeSkjema/UttaksperiodeSkjema';
import { getUgyldigeTidsperioderForUttaksperiode } from 'uttaksplan/utils/periodeskjemaUtils';

interface OwnProps {
    periodetype: Periodetype;
    periode?: Periode;
    isOpen: boolean;
    perioder: Periode[];
    tidsrom: Tidsperiode;
    permisjonsregler: Permisjonsregler;
    navnForelder1?: string;
    navnForelder2?: string;
    termindato: Date;
}

type Props = OwnProps & DispatchProps & InjectedIntlProps;

const PeriodeDialog: React.StatelessComponent<Props> = (props: Props) => {
    const renderDialogContent = () => {
        const {
            termindato,
            periode,
            perioder,
            navnForelder1,
            navnForelder2,
            periodetype,
            permisjonsregler,
            tidsrom,
            dispatch
        } = props;
        if (periodetype === Periodetype.Utsettelse) {
            const utsettelse = periode
                ? (periode as Utsettelsesperiode)
                : undefined;
            return (
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
                    tidsperiode={tidsrom}
                    onChange={(u) => dispatch(opprettEllerOppdaterPeriode(u))}
                    onFjern={(u) => dispatch(slettPeriode(u))}
                    termindato={termindato}
                />
            );
        } else if (periodetype === Periodetype.Uttak) {
            return (
                <UttaksperiodeSkjema
                    periode={periode as Uttaksperiode}
                    onChange={(p) =>
                        props.dispatch(opprettEllerOppdaterPeriode(p))
                    }
                    onFjern={(p) => props.dispatch(slettPeriode(p))}
                    ugyldigeTidsperioder={getUgyldigeTidsperioderForUttaksperiode(
                        perioder
                    )}
                />
            );
        }
        return <div>{props.periodetype}</div>;
    };

    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel={props.intl.formatMessage({
                id: `uttaksplan.periodedialog.${props.periodetype}.tittel`
            })}
            onRequestClose={() => props.dispatch(lukkPeriodeDialog())}
            className="periodeSkjemaDialog"
            children={props.isOpen && renderDialogContent()}
        />
    );
};

export default connect()(injectIntl(PeriodeDialog));
