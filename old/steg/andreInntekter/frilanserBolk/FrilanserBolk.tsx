import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import Block from 'common/components/block/Block';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import BEMHelper from 'common/util/bem';
import getMessage from 'common/util/i18nUtils';
import DriverDuFosterhjemSpørsmål from '../../../spørsmål/DriverDuFosterhjemSpørsmål';
import HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål from '../../../spørsmål/HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål';
import HarDuJobbetSomFrilansSiste10MndSpørsmål from '../../../spørsmål/HarDuJobbetSomFrilansSiste10MndSpørsmål';
import JobberDuFremdelesSomFrilansSpørsmål from '../../../spørsmål/JobberDuFremdelesSomFrilansSpørsmål';
import { FrilansInformasjonPartial, FrilansOppdrag } from '../../../types/søknad/FrilansInformasjon';
import Søker, { SøkerPartial } from '../../../types/søknad/Søker';
import { notInFutureAvgrensning } from '../../../util/validation/common';
import { getFrilansOppstartRules } from '../../../util/validation/frilans';
import FrilansOppdragBolk from '../frilansOppdragBolk/FrilansOppdragBolk';
import visibility from './visibility';
import './frilanserBolk.less';

interface FrilanserBolkProps {
    søker: Søker;
    onChangeSøker: (v: SøkerPartial) => void;
    onChangeFrilansinformasjon: (v: FrilansInformasjonPartial) => void;
    planInneholderFrilansaktivitet: boolean;
    intl: IntlShape;
}

type Props = FrilanserBolkProps;

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
            <Block margin={harJobbetForNærVennEllerFamilieSiste10Mnd ? 'xs' : 'none'}>
                <HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål
                    onChange={(v: boolean) =>
                        this.handleFrilansinformasjonOnChange({
                            harJobbetForNærVennEllerFamilieSiste10Mnd: v,
                        })
                    }
                    harJobbetForNærVennEllerFamilieSiste10Mnd={harJobbetForNærVennEllerFamilieSiste10Mnd}
                />
            </Block>
        );
    }

    render() {
        const { søker, planInneholderFrilansaktivitet, intl } = this.props;
        const { frilansInformasjon } = søker;

        const driverFosterhjem = frilansInformasjon && frilansInformasjon.driverFosterhjem;
        const jobberFremdelesSomFrilans = frilansInformasjon && frilansInformasjon.jobberFremdelesSomFrilans;
        const oppdragForNæreVennerEllerFamilieSiste10Mnd =
            frilansInformasjon && frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd;
        const oppstartsdato = frilansInformasjon && frilansInformasjon.oppstart;
        const bem = BEMHelper('frilanserBolk');

        return (
            <React.Fragment>
                <Block margin="xs">
                    <HarDuJobbetSomFrilansSiste10MndSpørsmål
                        onChange={(v: boolean) =>
                            this.handleSøkerOnChange({
                                harJobbetSomFrilansSiste10Mnd: v,
                            })
                        }
                        harJobbetSomFrilansSiste10Mnd={søker.harJobbetSomFrilansSiste10Mnd}
                        planInneholderFrilansaktivitet={planInneholderFrilansaktivitet}
                    />
                </Block>

                {søker.harJobbetSomFrilansSiste10Mnd === true && (
                    <div className={bem.element('innhold')}>
                        <Block animated={false} visible={visibility.startdatoVisible(søker)} margin="xs">
                            <DatoInput
                                name="frilansStartDato"
                                id="frilansStartDato"
                                label={getMessage(intl, 'frilans.oppstart')}
                                onChange={(oppstart) =>
                                    this.handleFrilansinformasjonOnChange({
                                        oppstart,
                                    })
                                }
                                dato={oppstartsdato}
                                datoAvgrensinger={notInFutureAvgrensning}
                                validators={getFrilansOppstartRules(oppstartsdato, intl)}
                            />
                        </Block>

                        <Block visible={visibility.fremdelesFrilansVisible(søker)} margin="xs">
                            <JobberDuFremdelesSomFrilansSpørsmål
                                onChange={(v: boolean) =>
                                    this.handleFrilansinformasjonOnChange({
                                        jobberFremdelesSomFrilans: v,
                                    })
                                }
                                jobberFremdelesSomFrilans={jobberFremdelesSomFrilans}
                            />
                        </Block>

                        <Block visible={visibility.oppdragBolkVisible(søker)} margin="xs">
                            <FrilansOppdragBolk
                                renderSpørsmål={this.renderOppdragSiste10MndSpørsmål}
                                showOppdragsPerioderContent={visibility.oppdragPerioderVisible(søker)}
                                oppdragListe={oppdragForNæreVennerEllerFamilieSiste10Mnd || []}
                                onChange={(oppdragListe: FrilansOppdrag[]) =>
                                    this.handleFrilansinformasjonOnChange({
                                        oppdragForNæreVennerEllerFamilieSiste10Mnd: oppdragListe,
                                    })
                                }
                            />
                        </Block>

                        <Block visible={visibility.driverDuFosterhjemVisible(søker)} margin="xs">
                            <DriverDuFosterhjemSpørsmål
                                onChange={(v: boolean) =>
                                    this.handleFrilansinformasjonOnChange({
                                        driverFosterhjem: v,
                                    })
                                }
                                driverFosterhjem={driverFosterhjem}
                            />
                        </Block>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default injectIntl(FrilanserBolk);
