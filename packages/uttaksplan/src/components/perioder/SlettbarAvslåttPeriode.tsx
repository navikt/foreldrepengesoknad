import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyLong } from '@navikt/ds-react';

import {
    ActionLink,
    InfoPeriode,
    OpprinneligSøkt,
    bemUtils,
    getSlettPeriodeTekst,
    isAvslåttPeriode,
} from '@navikt/fp-common';
import { logAmplitudeEvent } from '@navikt/fp-metrics';

import './slettbarAvslåttPeriode.less';

interface Props {
    periode: InfoPeriode;
    handleDeletePeriode: (periodeId: string) => void;
}

const SlettbarAvslåttPeriode: FunctionComponent<Props> = ({ periode, handleDeletePeriode }) => {
    const bem = bemUtils('slettbarAvslåttPeriode');
    const onSlettPeriode = () => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            hendelse: 'slettPeriodeKlikk',
        });
        handleDeletePeriode(periode.id);
    };

    let bodyTekst = undefined;

    if (isAvslåttPeriode(periode) && periode.opprinneligSøkt === OpprinneligSøkt.Arbeid) {
        bodyTekst =
            'Perioden om utsettelse av foreldrepenger på grunn av arbeid har blitt avslått. Denne perioden kan' +
            ' du slette og legge inn hva du egentlig gjorde i stedet.';
    }

    if (isAvslåttPeriode(periode) && periode.opprinneligSøkt === OpprinneligSøkt.Ferie) {
        bodyTekst =
            'Perioden om utsettelse av foreldrepenger på grunn av ferie har blitt avslått. Denne perioden kan' +
            ' du slette og legge inn hva du egentlig gjorde i stedet.';
    }

    return (
        <>
            {bodyTekst ? <BodyLong>{bodyTekst}</BodyLong> : null}
            <div className={bem.element('wrapper')}>
                <ActionLink onClick={onSlettPeriode}>
                    <FormattedMessage id={getSlettPeriodeTekst(periode.type)} />
                </ActionLink>
            </div>
        </>
    );
};

export default SlettbarAvslåttPeriode;
