// @flow
import i18n from '@dhis2/d2-i18n';
import { IconCross16, IconUndo16, MenuItem } from '@dhis2/ui';
import React from 'react';
import { plainStatus } from '../../constants/status.const';
import type { Props } from './cancel.types';

export const Cancel = ({ enrollment, onUpdate }: Props) =>
    (enrollment.status === plainStatus.CANCELLED ? (
        <MenuItem
            dense
            dataTest="widget-enrollment-actions-reactivate"
            onClick={() =>
                onUpdate({
                    ...enrollment,
                    status: plainStatus.ACTIVE,
                })
            }
            icon={<IconUndo16 />}
            label={i18n.t('Reactivate')}
        />
    ) : (
        <MenuItem
            dense
            dataTest="widget-enrollment-actions-cancel"
            onClick={() =>
                onUpdate({
                    ...enrollment,
                    status: plainStatus.CANCELLED,
                })
            }
            icon={<IconCross16 />}
            destructive
            label={i18n.t('Mark as cancelled')}
        />
    ));
