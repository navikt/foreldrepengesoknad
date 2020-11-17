import * as React from 'react';
import { injectIntl, FormattedMessage, IntlShape } from 'react-intl';
import { MorsAktivitet } from '../types/uttaksplan/periodetyper';
import Select from 'common/components/skjema/wrappers/Select';
import getMessage from 'common/util/i18nUtils';
import { SelectChangeEvent } from '../../common/types/Events';
import Block from 'common/components/block/Block';
import lenker from '../util/routing/lenker';
import { NavnISøknaden } from 'app/selectors/types';
import { getNavnGenitivEierform } from '../util/tekstUtils';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'common/components/veileder/Veileder';

interface HvaSkalMorGjøreSpørsmålProps {
    morsAktivitetIPerioden?: MorsAktivitet;
    navnPåForeldre: NavnISøknaden;
    onChange: (morsAktivitetIPerioden: MorsAktivitet) => void;
    intl: IntlShape;
}

type Props = HvaSkalMorGjøreSpørsmålProps;

class HvaSkalMorGjøreSpørsmål extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.renderOptions = this.renderOptions.bind(this);
    }

    getVeilederTekst() {
        const { morsAktivitetIPerioden, navnPåForeldre, intl } = this.props;

        if (morsAktivitetIPerioden === MorsAktivitet.Arbeid) {
            return (
                <FormattedMessage
                    id="uttaksplan.fellesdel.hvaSkalMorGjøre.veileder.arbeid"
                    values={{ navnMor: getNavnGenitivEierform(navnPåForeldre.mor.fornavn, intl.locale) }}
                />
            );
        } else if (morsAktivitetIPerioden === MorsAktivitet.ArbeidOgUtdanning) {
            const listData = [
                getMessage(intl, 'uttaksplan.fellesdel.hvaSkalMorGjøre.veileder.arbeidOgUtdanning.punkt1'),
                getMessage(intl, 'uttaksplan.fellesdel.hvaSkalMorGjøre.veileder.arbeidOgUtdanning.punkt2'),
                getMessage(intl, 'uttaksplan.fellesdel.hvaSkalMorGjøre.veileder.arbeidOgUtdanning.punkt3'),
                getMessage(intl, 'uttaksplan.fellesdel.hvaSkalMorGjøre.veileder.arbeidOgUtdanning.punkt4'),
            ];

            return (
                <>
                    <FormattedMessage
                        id="uttaksplan.fellesdel.hvaSkalMorGjøre.veileder.arbeidOgUtdanning"
                        values={{ navnMor: navnPåForeldre.mor.fornavn }}
                    />
                    <ul>
                        {listData.map((listItem, index) => (
                            <li key={`arbeidOgUtdanning${index}`}>{listItem}</li>
                        ))}
                    </ul>
                </>
            );
        } else if (morsAktivitetIPerioden === MorsAktivitet.Innlagt) {
            return (
                <FormattedMessage
                    id="uttaksplan.informasjonVedSykdomAnnenForelder"
                    values={{ navn: navnPåForeldre.mor.fornavn }}
                />
            );
        } else if (morsAktivitetIPerioden === MorsAktivitet.Introduksjonsprogrammet) {
            return (
                <FormattedMessage
                    id="uttaksplan.fellesdel.hvaSkalMorGjøre.veileder.introduksjonsprogrammet"
                    values={{ navnMor: navnPåForeldre.mor.fornavn }}
                />
            );
        } else if (morsAktivitetIPerioden === MorsAktivitet.Kvalifiseringsprogrammet) {
            return (
                <FormattedMessage
                    id="uttaksplan.fellesdel.hvaSkalMorGjøre.veileder.kvalifiseringsprogrammet"
                    values={{ navnMor: navnPåForeldre.mor.fornavn }}
                />
            );
        } else if (morsAktivitetIPerioden === MorsAktivitet.TrengerHjelp) {
            return (
                <FormattedMessage
                    id="uttaksplan.informasjonVedSykdomAnnenForelder"
                    values={{ navn: navnPåForeldre.mor.fornavn }}
                />
            );
        } else if (morsAktivitetIPerioden === MorsAktivitet.Utdanning) {
            const listData = [
                getMessage(intl, 'uttaksplan.fellesdel.hvaSkalMorGjøre.veileder.utdanning.punkt1'),
                getMessage(intl, 'uttaksplan.fellesdel.hvaSkalMorGjøre.veileder.utdanning.punkt2'),
                getMessage(intl, 'uttaksplan.fellesdel.hvaSkalMorGjøre.veileder.utdanning.punkt3'),
                getMessage(intl, 'uttaksplan.fellesdel.hvaSkalMorGjøre.veileder.utdanning.punkt4'),
            ];

            return (
                <>
                    <FormattedMessage
                        id="uttaksplan.fellesdel.hvaSkalMorGjøre.veileder.utdanning"
                        values={{ navnMor: navnPåForeldre.mor.fornavn }}
                    />
                    <ul>
                        {listData.map((listItem, index) => (
                            <li key={`trengerhjelp${index}`}>{listItem}</li>
                        ))}
                    </ul>
                </>
            );
        } else {
            return '';
        }
    }

    renderOptions() {
        const { intl } = this.props;
        return Object.keys(MorsAktivitet)
            .filter((aktivitetsid) => MorsAktivitet[aktivitetsid] !== MorsAktivitet.Uføre)
            .map((aktivitetsid) => (
                <option value={MorsAktivitet[aktivitetsid]} key={MorsAktivitet[aktivitetsid]}>
                    {getMessage(intl, `morsAktivitet.${aktivitetsid}`)}
                </option>
            ));
    }
    render() {
        const { intl, navnPåForeldre, morsAktivitetIPerioden, onChange } = this.props;
        const visVeileder = morsAktivitetIPerioden !== undefined && morsAktivitetIPerioden.length > 0;
        return (
            <>
                <Block margin={visVeileder ? 's' : 'm'}>
                    <Select
                        value={morsAktivitetIPerioden}
                        name="hvaSkalMorGjøre.spørsmål"
                        label={getMessage(intl, 'uttaksplan.fellesdel.hvaSkalMorGjøre.spørsmål', {
                            navnMor: navnPåForeldre.mor.fornavn,
                        })}
                        autoComplete="off"
                        onChange={(e: SelectChangeEvent) => onChange(e.target.value as MorsAktivitet)}
                        validators={[
                            {
                                test: () =>
                                    morsAktivitetIPerioden !== undefined &&
                                    morsAktivitetIPerioden !== MorsAktivitet.Uføre &&
                                    morsAktivitetIPerioden.length > 0,
                                failText: getMessage(intl, 'påkrevd'),
                            },
                        ]}
                    >
                        <option value="" />
                        {this.renderOptions()}
                    </Select>
                </Block>
                <Block visible={visVeileder} margin="none">
                    <Veilederpanel svg={<Veileder farge="lilla" stil="kompakt" />}>
                        <span>{this.getVeilederTekst()}</span>
                        <FormattedMessage
                            id="aktivitetskrav.lesmer"
                            values={{
                                a: (msg: any) => (
                                    <a
                                        href={lenker.morsAktivitetskrav}
                                        className="lenke"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        {msg}
                                    </a>
                                ),
                            }}
                        />
                    </Veilederpanel>
                </Block>
            </>
        );
    }
}

export default injectIntl(HvaSkalMorGjøreSpørsmål);
