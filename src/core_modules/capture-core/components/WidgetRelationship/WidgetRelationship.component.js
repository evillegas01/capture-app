// @flow
import React, { useState, useCallback } from 'react';
import { Chip } from '@dhis2/ui';
import { Widget } from '../Widget';
import type { Props } from './widgetRelationship.types';
import { Relationships } from './Relationships/';

export const WidgetRelationship = ({ relationships, title, onAddRelationship }: Props) => {
    const [open, setOpenStatus] = useState(true);
    const count = relationships.reduce((acc, curr) => { acc += curr.relationshipAttributes.length; return acc; }, 0);
    return (
        <div
            data-test="relationship-widget"
        >
            <Widget
                header={<div>
                    <span>{title}</span>
                    {relationships && <Chip dense>
                        {count}
                    </Chip>
                    }
                </div>
                }
                onOpen={useCallback(() => setOpenStatus(true), [setOpenStatus])}
                onClose={useCallback(() => setOpenStatus(false), [setOpenStatus])}
                open={open}
            >
                <Relationships relationships={relationships} onAddRelationship={onAddRelationship} />
            </Widget>
        </div>
    );
};
