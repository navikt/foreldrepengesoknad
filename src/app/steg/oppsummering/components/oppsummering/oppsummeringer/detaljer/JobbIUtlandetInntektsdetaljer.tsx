import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { JobbIUtlandetInntekt } from '../../../../../../types/søknad/AnnenInntekt';
import getMessage from 'common/util/i18nUtils';
import { useIntl } from 'react-intl';
import Feltoppsummering from 'app/steg/oppsummering/components/feltoppsummering/Feltoppsummering';

interface JobbIUtlandetInntektsdetaljerProps {
    jobbIUtlandetInntekt: JobbIUtlandetInntekt;
}

type Props = JobbIUtlandetInntektsdetaljerProps;

const JobbIUtlandetInntektsdetaljer: React.StatelessComponent<Props> = ({ jobbIUtlandetInntekt }) => {
    const { arbeidsgiverNavn, land } = jobbIUtlandetInntekt;
    const intl = useIntl();

    return (
        <>
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.andreInntekter.arbeidsgiverNavn')}
                verdi={arbeidsgiverNavn}
            />
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.andreInntekter.arbeidsgiverLand')}
                verdi={countries.getName(land, 'nb')}
            />
        </>
    );
};

export default JobbIUtlandetInntektsdetaljer;
