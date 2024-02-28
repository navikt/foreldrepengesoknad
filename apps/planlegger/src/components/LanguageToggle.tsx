import { Select } from '@navikt/ds-react';

const LanguageToggle = () => {
    return (
        <Select label="" hideLabel>
            <option value="no">Norsk</option>
            <option value="EN">Engelsk</option>
        </Select>
    );
};

export default LanguageToggle;
