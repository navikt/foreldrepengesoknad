import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { AnnenForelderPartial } from '../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';

const MAKS_FNR_LENGTH = 30;

interface OwnProps {
    fnr?: string;
    utenlandskFnr?: boolean;
    onChange: (
        annenForelder: AnnenForelderPartial,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = OwnProps & InjectedIntlProps;

const FødselsnummerPåAnnenForelderSpørsmål = (props: Props) => {
    const { fnr, utenlandskFnr, onChange, intl } = props;

    return (
        <React.Fragment>
            <Input
                label={getMessage(intl, 'annenForelder.label.fødselsnummer')}
                id="js-fødselsnummer"
                placeholder={getMessage(
                    intl,
                    'annenForelder.placeholder.fødselsnummer'
                )}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange({ fnr: e.target.value }, e)
                }
                name="fodselsnummerfelt"
                value={fnr || ''}
                maxLength={MAKS_FNR_LENGTH}
            />
            <Checkbox
                checked={utenlandskFnr || false}
                label={getMessage(
                    intl,
                    'annenForelder.label.utenlandskFødselsnummer'
                )}
                id="utenlandskFnr"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange({ utenlandskFnr: e.target.checked }, e)
                }
            />
        </React.Fragment>
    );
};

export default injectIntl(FødselsnummerPåAnnenForelderSpørsmål);
