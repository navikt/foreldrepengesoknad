import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface JobberFremdelesSomFrilansSpørsmålProps {
    jobberFremdelesSomFrilans?: boolean;
    onChange: (jobberFremdelesSomFrilans: boolean) => void;
}

type Props = JobberFremdelesSomFrilansSpørsmålProps;

const JobberFremdelesSomFrilansSpørsmål = (props: Props) => {
    const { onChange, jobberFremdelesSomFrilans } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'jobberFremdelesSomFrilans.spørsmål')}
            navn="jobberFremdelesSomFrilans"
            valgtVerdi={jobberFremdelesSomFrilans}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default JobberFremdelesSomFrilansSpørsmål;
