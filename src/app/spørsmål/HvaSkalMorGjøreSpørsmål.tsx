import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { MorsAktivitet } from '../types/uttaksplan/periodetyper';
import Select from 'common/components/skjema/wrappers/Select';
import getMessage from 'common/util/i18nUtils';
import { SelectChangeEvent } from '../types/dom/Events';

interface HvaSkalMorGjøreSpørsmålProps {
    morsAktivitetIPerioden?: MorsAktivitet;
    onChange: (morsAktivitetIPerioden: MorsAktivitet) => void;
}

type Props = HvaSkalMorGjøreSpørsmålProps & InjectedIntlProps;

class HvaSkalMorGjøreSpørsmål extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.renderOptions = this.renderOptions.bind(this);
    }

    renderOptions() {
        const { intl } = this.props;
        return Object.keys(MorsAktivitet).map((aktivitetsid) => (
            <option value={MorsAktivitet[aktivitetsid]} key={MorsAktivitet[aktivitetsid]}>
                {getMessage(intl, `morsAktivitet.${aktivitetsid}`)}
            </option>
        ));
    }
    render() {
        const { intl, onChange } = this.props;
        return (
            <Select
                label={getMessage(intl, 'hvaSkalMorGjøre.spørsmål')}
                onChange={(e: SelectChangeEvent) => onChange(e.target.value as MorsAktivitet)}>
                <option value="" />
                {this.renderOptions()}
            </Select>
        );
    }
}

export default injectIntl(HvaSkalMorGjøreSpørsmål);
