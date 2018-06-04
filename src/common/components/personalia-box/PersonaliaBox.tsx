import * as React from 'react';

import 'personaliaBox.less';

interface PersonaliaBoxProps {
    personalia: any;
}

const PersonaliaBox = (props: PersonaliaBoxProps) => {
    return <div className="personaliaBox">{props.personalia}</div>;
};

export default PersonaliaBox;
