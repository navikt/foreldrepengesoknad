import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

interface JobberFremdelesSomFrilansSpørsmålProps {
    jobberFremdelesSomFrilans?: boolean;
    onChange: (jobberFremdelesSomFrilans: boolean) => void;
}

type Props = JobberFremdelesSomFrilansSpørsmålProps & InjectedIntlProps;

const JobberFremdelesSomFrilansSpørsmål = (props: Props) => {
    const { onChange, jobberFremdelesSomFrilans, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'jobberFremdelesSomFrilans.spørsmål')}
            navn="jobberFremdelesSomFrilans"
            valgtVerdi={jobberFremdelesSomFrilans}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(JobberFremdelesSomFrilansSpørsmål);
