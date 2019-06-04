import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { JobbIUtlandetInntekt } from '../../../../../../types/søknad/AnnenInntekt';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';

interface JobbIUtlandetInntektsdetaljerProps {
    jobbIUtlandetInntekt: JobbIUtlandetInntekt;
}

type Props = JobbIUtlandetInntektsdetaljerProps & InjectedIntlProps;

const JobbIUtlandetInntektsdetaljer: React.StatelessComponent<Props> = ({ jobbIUtlandetInntekt, intl }) => {
    const { arbeidsgiverNavn, land } = jobbIUtlandetInntekt;
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

export default injectIntl(JobbIUtlandetInntektsdetaljer);
