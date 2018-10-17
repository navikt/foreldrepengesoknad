import * as React from 'react';
import { JobbIUtlandetInntekt } from '../../../../../app/types/søknad/AnnenInntekt';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';

interface JobbIUtlandetInntektsdetaljerProps {
    jobbIUtlandetInntekt: JobbIUtlandetInntekt;
}

type Props = JobbIUtlandetInntektsdetaljerProps & InjectedIntlProps;

const JobbIUtlandetInntektsdetaljer: React.StatelessComponent<Props> = ({ jobbIUtlandetInntekt, intl }) => {
    const { arbeidsgiverNavn, land, erNærVennEllerFamilieMedArbeidsgiver } = jobbIUtlandetInntekt;
    return (
        <>
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.andreInntekter.arbeidsgiverNavn')}
                verdi={arbeidsgiverNavn}
            />
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.andreInntekter.arbeidsgiverLand')}
                verdi={land}
            />
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.andreInntekter.nærVennEllerFamilie')}
                verdi={erNærVennEllerFamilieMedArbeidsgiver ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
            />
        </>
    );
};

export default injectIntl(JobbIUtlandetInntektsdetaljer);
