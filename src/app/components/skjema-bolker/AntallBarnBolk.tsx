import * as React from 'react';
import { Select } from 'nav-frontend-skjema';
import Bolk from '../layout/Bolk';

interface Props {
    tittel: string;
    onChange: () => void;
}

const AntallBarnBolk: React.StatelessComponent<Props> = (props: Props) => {
    return (
        <Bolk
            tittel={props.tittel}
            render={() => (
                <Select
                    id="test"
                    bredde="xs"
                    label=""
                    onChange={props.onChange}
                    feil={{ feilmelding: 'test' }}
                    selectRef={() => {}}
                    disabled={false}>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                </Select>
            )}
        />
    );
};
export default AntallBarnBolk;
