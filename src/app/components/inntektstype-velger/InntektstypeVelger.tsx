import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AnnenInntektType } from '../../types/søknad/AnnenInntekt';
import InjectedIntl = ReactIntl.InjectedIntl;
import getMessage from 'common/util/i18nUtils';
import Select from 'common/components/skjema/wrappers/Select';
import { Validator } from 'common/lib/validation/types';

interface InntektstypeVelgerProps {
    defaultValue?: string;
    label: React.ReactNode;
    validators?: Validator[];
    name?: string;
    onChange: (value: string, event?: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface InntektstypeOptions {
    [key: string]: string;
}

const getOptions = (intl: InjectedIntl): InntektstypeOptions => ({
    [AnnenInntektType.JOBB_I_UTLANDET]: getMessage(intl, 'inntektstype.jobb_i_utlandet'),
    [AnnenInntektType.MILITÆRTJENESTE]: getMessage(intl, 'inntektstype.militær_eller_siviltjeneste'),
    [AnnenInntektType.VENTELØNN]: getMessage(intl, 'inntektstype.ventelønn'),
    [AnnenInntektType.SLUTTPAKKE]: getMessage(intl, 'inntektstype.etterlønn_arbeidsgiver')
});

class InntektstypeVelger extends React.Component<InntektstypeVelgerProps & InjectedIntlProps> {
    renderInntektstypeOptions() {
        return Object.entries(getOptions(this.props.intl)).map((value: string[]) => {
            return (
                <option key={value[0]} value={value[0]}>
                    {value[1]}
                </option>
            );
        });
    }

    render() {
        const { validators, onChange, ...restProps } = this.props;
        return (
            <Select
                name="inntektstype"
                {...restProps}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value, e)}
                validators={validators}>
                <option value="" />
                {this.renderInntektstypeOptions()}
            </Select>
        );
    }
}

export default injectIntl(InntektstypeVelger);
