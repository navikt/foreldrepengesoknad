import * as React from 'react';
import { JobbIUtlandetInntekt } from '../../../../../app/types/søknad/AnnenInntekt';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntlProps, injectIntl } from 'react-intl';

interface JobbIUtlandetInntektsdetaljerProps {
    jobbIUtlandetInntekt: JobbIUtlandetInntekt;
}

type Props = JobbIUtlandetInntektsdetaljerProps & InjectedIntlProps;

const JobbIUtlandetInntektsdetaljer: React.StatelessComponent<Props> = ({ jobbIUtlandetInntekt, intl }) => {
    const { arbeidsgiverNavn, land, erNærVennEllerFamilieMedArbeidsgiver } = jobbIUtlandetInntekt;
    return (
        <>
            <p>
                {getMessage(intl, 'oppsummering.andreInntekter.arbeidsgiverNavn')}: {arbeidsgiverNavn}
            </p>
            <p>
                {getMessage(intl, 'oppsummering.andreInntekter.arbeidsgiverLand')}: {land}
            </p>
            <p>
                {getMessage(intl, 'oppsummering.andreInntekter.nærVennEllerFamilie')}:
                {erNærVennEllerFamilieMedArbeidsgiver ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
            </p>
        </>
    );
};

export default injectIntl(JobbIUtlandetInntektsdetaljer);
