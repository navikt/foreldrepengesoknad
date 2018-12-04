import * as React from 'react';
import HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål from '../../spørsmål/HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål';
import Block from 'common/components/block/Block';
import DriverDuFosterhjemSpørsmål from '../../spørsmål/DriverDuFosterhjemSpørsmål';
import HarDuJobbetSomFrilansSiste10MndSpørsmål from '../../spørsmål/HarDuJobbetSomFrilansSiste10MndSpørsmål';
import Søker, { SøkerPartial } from '../../types/søknad/Søker';
import JobberDuFremdelesSomFrilansSpørsmål from '../../spørsmål/JobberDuFremdelesSomFrilansSpørsmål';
import { FrilansInformasjonPartial, FrilansOppdrag } from '../../types/søknad/FrilansInformasjon';
import FrilansOppdragBolk from '../frilans-oppdrag-bolk/FrilansOppdragBolk';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import visibility from './visibility';
import { notInFutureAvgrensning } from '../../util/validation/common';
import { getFrilansOppstartRules } from '../../util/validation/frilans';

interface FrilanserBolkProps {
    søker: Søker;
    onChangeSøker: (v: SøkerPartial) => void;
    onChangeFrilansinformasjon: (v: FrilansInformasjonPartial) => void;
}

type Props = FrilanserBolkProps & InjectedIntlProps;

class FrilanserBolk extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleSøkerOnChange = this.handleSøkerOnChange.bind(this);
        this.handleFrilansinformasjonOnChange = this.handleFrilansinformasjonOnChange.bind(this);
        this.renderOppdragSiste10MndSpørsmål = this.renderOppdragSiste10MndSpørsmål.bind(this);
    }

    handleSøkerOnChange(changedProps: SøkerPartial) {
        const { søker, onChangeSøker } = this.props;
        onChangeSøker({ ...søker, ...changedProps });
    }

    handleFrilansinformasjonOnChange(changedProps: FrilansInformasjonPartial) {
        const { søker, onChangeFrilansinformasjon } = this.props;
        const { frilansInformasjon } = søker;
        onChangeFrilansinformasjon({ ...frilansInformasjon, ...changedProps });
    }

    renderOppdragSiste10MndSpørsmål() {
        const { søker } = this.props;
        const { frilansInformasjon } = søker;
        const harJobbetForNærVennEllerFamilieSiste10Mnd =
            frilansInformasjon && frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd;

        return (
            <Block margin={harJobbetForNærVennEllerFamilieSiste10Mnd ? 'xs' : 'm'}>
                <HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål
                    onChange={(v: boolean) =>
                        this.handleFrilansinformasjonOnChange({
                            harJobbetForNærVennEllerFamilieSiste10Mnd: v
                        })
                    }
                    harJobbetForNærVennEllerFamilieSiste10Mnd={harJobbetForNærVennEllerFamilieSiste10Mnd}
                />
            </Block>
        );
    }

    render() {
        const { søker, intl } = this.props;
        const { frilansInformasjon } = søker;

        const driverFosterhjem = frilansInformasjon && frilansInformasjon.driverFosterhjem;
        const jobberFremdelesSomFrilans = frilansInformasjon && frilansInformasjon.jobberFremdelesSomFrilans;
        const oppdragForNæreVennerEllerFamilieSiste10Mnd =
            frilansInformasjon && frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd;
        const oppstartsdato = frilansInformasjon && frilansInformasjon.oppstart;

        return (
            <React.Fragment>
                <Block>
                    <HarDuJobbetSomFrilansSiste10MndSpørsmål
                        onChange={(v: boolean) =>
                            this.handleSøkerOnChange({
                                harJobbetSomFrilansSiste10Mnd: v
                            })
                        }
                        harJobbetSomFrilansSiste10Mnd={søker.harJobbetSomFrilansSiste10Mnd}
                    />
                </Block>

                <Block animated={false} visible={visibility.startdatoVisible(søker)}>
                    <DatoInput
                        name="frilansStartDato"
                        id="frilansStartDato"
                        label={getMessage(intl, 'frilans.oppstart')}
                        onChange={(oppstart: Date) =>
                            this.handleFrilansinformasjonOnChange({
                                oppstart
                            })
                        }
                        dato={oppstartsdato}
                        avgrensninger={notInFutureAvgrensning}
                        validators={getFrilansOppstartRules(oppstartsdato, intl)}
                    />
                </Block>

                <Block visible={visibility.fremdelesFrilansVisible(søker)}>
                    <JobberDuFremdelesSomFrilansSpørsmål
                        onChange={(v: boolean) =>
                            this.handleFrilansinformasjonOnChange({
                                jobberFremdelesSomFrilans: v
                            })
                        }
                        jobberFremdelesSomFrilans={jobberFremdelesSomFrilans}
                    />
                </Block>

                <Block visible={visibility.oppdragBolkVisible(søker)} margin="none">
                    <FrilansOppdragBolk
                        renderSpørsmål={this.renderOppdragSiste10MndSpørsmål}
                        showOppdragsPerioderContent={visibility.oppdragPerioderVisible(søker)}
                        oppdragListe={oppdragForNæreVennerEllerFamilieSiste10Mnd || []}
                        onChange={(oppdragListe: FrilansOppdrag[]) =>
                            this.handleFrilansinformasjonOnChange({
                                oppdragForNæreVennerEllerFamilieSiste10Mnd: oppdragListe
                            })
                        }
                    />
                </Block>

                <Block visible={visibility.driverDuFosterhjemVisible(søker)}>
                    <DriverDuFosterhjemSpørsmål
                        onChange={(v: boolean) =>
                            this.handleFrilansinformasjonOnChange({
                                driverFosterhjem: v
                            })
                        }
                        driverFosterhjem={driverFosterhjem}
                    />
                </Block>
            </React.Fragment>
        );
    }
}

export default injectIntl(FrilanserBolk);
