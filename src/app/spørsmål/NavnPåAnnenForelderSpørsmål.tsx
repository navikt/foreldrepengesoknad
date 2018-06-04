import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { AnnenForelderPartial } from '../types/s\u00F8knad/AnnenForelder';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import getMessage from 'common/util/i18nUtils';

const MAKS_NAVN_LENGTH = 100;

interface OwnProps {
    navn?: string;
    kanIkkeOppgis?: boolean;
    onChange: (
        annenForelder: AnnenForelderPartial,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = OwnProps & InjectedIntlProps;

const NavnPåAnnenForelderSpørsmål = (props: Props) => {
    const { kanIkkeOppgis, navn, onChange, intl } = props;

    return (
        <div>
            <Input
                id="js-annenForelder"
                name="navnfelt"
                label={
                    <Labeltekst>
                        {getMessage(intl, 'annenForelder.label.navn')}
                    </Labeltekst>
                }
                placeholder={getMessage(intl, 'annenForelder.placeholder.navn')}
                disabled={kanIkkeOppgis || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange({ navn: e.target.value }, e)
                }
                value={navn || ''}
                maxLength={MAKS_NAVN_LENGTH}
            />
            <Checkbox
                checked={kanIkkeOppgis || false}
                label={getMessage(intl, 'annenForelder.label.kanIkkeOppgiNavn')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(
                        {
                            navn: undefined,
                            fnr: undefined,
                            utenlandskFnr: undefined,
                            kanIkkeOppgis: e.target.checked
                        },
                        e
                    )
                }
            />
        </div>
    );
};

export default injectIntl(NavnPåAnnenForelderSpørsmål);
