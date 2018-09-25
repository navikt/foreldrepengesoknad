import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { MorsAktivitet } from '../types/uttaksplan/periodetyper';
import Select from 'common/components/skjema/wrappers/Select';
import getMessage from 'common/util/i18nUtils';
import { SelectChangeEvent } from '../types/dom/Events';
import { NavnPåForeldre } from 'common/types';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

interface HvaSkalMorGjøreSpørsmålProps {
    morsAktivitetIPerioden?: MorsAktivitet;
    navnPåForeldre: NavnPåForeldre;
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
        const { intl, navnPåForeldre, morsAktivitetIPerioden, onChange } = this.props;
        const visVeileder = morsAktivitetIPerioden !== undefined;
        return (
            <>
                <Block margin={visVeileder ? 's' : 'm'}>
                    <Select
                        value={morsAktivitetIPerioden}
                        name="hvaSkalMorGjøre.spørsmål"
                        label={getMessage(intl, 'uttaksplan.fellesdel.hvaSkalMorGjøre.spørsmål', {
                            navnMor: navnPåForeldre.mor
                        })}
                        onChange={(e: SelectChangeEvent) => onChange(e.target.value as MorsAktivitet)}>
                        <option value="" />
                        {this.renderOptions()}
                    </Select>
                </Block>
                <Block visible={visVeileder} margin="none">
                    <Veilederinfo>
                        <FormattedMessage id="uttaksplan.fellesdel.hvaSkalMorGjøre.veileder" />
                    </Veilederinfo>
                </Block>
            </>
        );
    }
}

export default injectIntl(HvaSkalMorGjøreSpørsmål);
