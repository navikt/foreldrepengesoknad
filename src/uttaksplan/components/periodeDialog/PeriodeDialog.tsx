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
    Stonadsperiode
} from 'uttaksplan/types';
import UtsettelseSkjema from 'uttaksplan/components/utsettelseSkjema/UtsettelseSkjema';

import './periodeDialog.less';
import StonadsperiodeSkjema from 'uttaksplan/components/stonadsperiodeSkjema/StonadsperiodeSkjema';

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
        const { periode, periodetype } = props;
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
                    navnForelder1={props.navnForelder1}
                    navnForelder2={props.navnForelder2}
                    permisjonsregler={props.permisjonsregler}
                    tidsrom={props.tidsrom}
                    onChange={(u) =>
                        props.dispatch(opprettEllerOppdaterPeriode(u))
                    }
                    onFjern={(u) => props.dispatch(slettPeriode(u))}
                    termindato={props.termindato}
                />
            );
        } else if (periodetype === Periodetype.Stonadsperiode) {
            return (
                <StonadsperiodeSkjema
                    periode={periode as Stonadsperiode}
                    onChange={(p) =>
                        props.dispatch(opprettEllerOppdaterPeriode(p))
                    }
                    onFjern={(p) => null}
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
