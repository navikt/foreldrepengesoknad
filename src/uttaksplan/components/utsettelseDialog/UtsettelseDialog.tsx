import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import Modal from 'nav-frontend-modal';

import { DispatchProps } from 'app/redux/types';
import {
    lukkPeriodeDialog,
    opprettEllerOppdaterPeriode,
    slettPeriode
} from 'uttaksplan/redux/actions';
import {
    Utsettelsesperiode,
    Tidsperiode,
    Permisjonsregler
} from 'uttaksplan/types';
import UtsettelseSkjema from 'uttaksplan/components/utsettelseSkjema/UtsettelseSkjema';

import './utsettelseDialog.less';

interface OwnProps {
    isOpen: boolean;
    utsettelser: Utsettelsesperiode[];
    tidsrom: Tidsperiode;
    permisjonsregler: Permisjonsregler;
    utsettelse?: Utsettelsesperiode;
    navnForelder1?: string;
    navnForelder2?: string;
    termindato: Date;
}

type Props = OwnProps & DispatchProps & InjectedIntlProps;

const UtsettelseDialog: React.StatelessComponent<Props> = (props: Props) => {
    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel={props.intl.formatMessage({
                id: 'uttaksplan.utsettelseskjema.tittel'
            })}
            onRequestClose={() => props.dispatch(lukkPeriodeDialog())}
            className="utsettelseSkjemaDialog"
            children={
                props.isOpen && (
                    <UtsettelseSkjema
                        registrerteUtsettelser={props.utsettelser}
                        utsettelse={props.utsettelse}
                        navnForelder1={props.navnForelder1}
                        navnForelder2={props.navnForelder2}
                        permisjonsregler={props.permisjonsregler}
                        tidsrom={props.tidsrom}
                        onChange={(utsettelse) =>
                            props.dispatch(
                                opprettEllerOppdaterPeriode(utsettelse)
                            )
                        }
                        onFjern={(utsettelse) =>
                            props.dispatch(slettPeriode(utsettelse))
                        }
                        termindato={props.termindato}
                    />
                )
            }
        />
    );
};

export default connect()(injectIntl(UtsettelseDialog));
