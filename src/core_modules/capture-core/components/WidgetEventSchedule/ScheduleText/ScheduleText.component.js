// @flow
import i18n from '@dhis2/d2-i18n';
import React from 'react';
import { InfoIconText } from '../../InfoIconText';
import type { Props } from './scheduleText.types';

export const ScheduleText = ({ orgUnitName, stageName, programName }: Props) => (<InfoIconText>
    <span>
        { i18n.t(`Scheduling an event in ${stageName} for ${programName} in ${orgUnitName}`,
            { interpolation: { escapeValue: false } })}
    </span>
</InfoIconText>);
