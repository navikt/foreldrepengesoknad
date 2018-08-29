import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

enum JobberFremdelesSomFrilans {
    'JOBBER_FREMDELES_SOM_FRILANS' = 'jobberFremdelesSomFrilans',
    'JOBBER_IKKE_FREMDELES_SOM_FRILANS' = 'jobberIkkeFremdelesSomFrilans'
}

interface JobberFremdelesSomFrilansSpørsmålProps {
    jobberFremdelesSomFrilans?: boolean;
    onChange: (jobberFremdelesSomFrilans: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
}

type Props = JobberFremdelesSomFrilansSpørsmålProps & InjectedIntlProps;

const JobberFremdelesSomFrilansSpørsmål = (props: Props) => {
    const { onChange, jobberFremdelesSomFrilans, intl, ...otherProps } = props;

    let checked;
    if (jobberFremdelesSomFrilans === true) {
        checked = JobberFremdelesSomFrilans.JOBBER_FREMDELES_SOM_FRILANS;
    } else if (jobberFremdelesSomFrilans === false) {
        checked = JobberFremdelesSomFrilans.JOBBER_IKKE_FREMDELES_SOM_FRILANS;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'jobberFremdelesSomFrilans.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: JobberFremdelesSomFrilans.JOBBER_FREMDELES_SOM_FRILANS
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: JobberFremdelesSomFrilans.JOBBER_IKKE_FREMDELES_SOM_FRILANS
                }
            ]}
            name="jobberFremdelesSomFrilans"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: JobberFremdelesSomFrilans) =>
                onChange(v === JobberFremdelesSomFrilans.JOBBER_FREMDELES_SOM_FRILANS, e)
            }
            {...otherProps}
        />
    );
};

export default injectIntl(JobberFremdelesSomFrilansSpørsmål);
