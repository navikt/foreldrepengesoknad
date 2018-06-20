import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import getMessage from 'common/util/i18nUtils';
import { formaterNavn } from '../util/personUtil';
import CheckboksPanelGruppeResponsive from 'common/components/checkbox-panel-gruppe-responsive/CheckboksPanelGruppeResponsive';
import { SøkersBarn } from '../types/Person';

interface RiktigBarnSpørsmålProps {
    søkersBarn: SøkersBarn[];
    annetBarn: boolean;
    onChange: (fødselsnummer: string) => void;
}

type Props = RiktigBarnSpørsmålProps & InjectedIntlProps;

const RiktigBarnSpørmål = (props: Props) => {
    const { onChange, søkersBarn, intl } = props;
    const createBarnOptions = () => {
        const barnRadioProps = søkersBarn.map((barn: SøkersBarn) => {
            return {
                label: formaterNavn(
                    barn.fornavn,
                    barn.etternavn,
                    barn.mellomnavn
                ),
                value: barn.fnr,
                checked: barn.checked ? true : false
            };
        });
        barnRadioProps.push({
            label: 'annet barn',
            value: 'annetBarn',
            checked: props.annetBarn
        });
        return barnRadioProps;
    };

    return (
        <CheckboksPanelGruppeResponsive
            legend={getMessage(intl, 'riktigBarn.spørsmål')}
            checkboxes={createBarnOptions()}
            onChange={(e: React.ChangeEvent<any>, fødselsnummer: string) => {
                onChange(fødselsnummer);
            }}
        />
    );
};

export default injectIntl(RiktigBarnSpørmål);
