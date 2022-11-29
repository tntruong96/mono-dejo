import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React, { FC, memo } from 'react';

interface Props extends FontAwesomeIconProps {}

const FontAwsomeIconComponent: FC<Props>= (props) => {

    const FontAwesomeIconMemo = memo(FontAwesomeIcon);
    return (
        <FontAwesomeIconMemo {...props}/>
    );
};

export default memo(FontAwsomeIconComponent);