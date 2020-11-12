import * as React from 'react';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';

export interface Props {
    periodeKanLeggesTil: boolean;
    ariaLabelLeggTil: string;
    ariaLabelAvbryt: string;
    onCancel?: () => void;
}

const NyPeriodeKnapperad: React.FunctionComponent<Props> = ({
    onCancel,
    periodeKanLeggesTil,
    ariaLabelAvbryt,
    ariaLabelLeggTil,
}) => (
    <Knapperad>
        {onCancel && (
            <Knapp htmlType="button" onClick={onCancel} aria-label={ariaLabelAvbryt}>
                <FormattedMessage id="avbryt" />
            </Knapp>
        )}
        {periodeKanLeggesTil && (
            <Hovedknapp data-name="leggTilPeriode" htmlType="submit" aria-label={ariaLabelLeggTil}>
                <FormattedMessage id="leggtil" />
            </Hovedknapp>
        )}
    </Knapperad>
);

export default NyPeriodeKnapperad;
