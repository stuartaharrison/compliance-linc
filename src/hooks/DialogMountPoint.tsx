/*
Provides a custom location to mount the dialog box that "react-confirm" will display for us.
This is to ensure that themes from the CSS are applied correctly by forcing the dialog to appear
under the correct root node/html element.
*/

import {
    createConfirmationCreater,
    createReactTreeMounter,
    createMountPoint,
    confirmable as baseConfirmable
} from "react-confirm";

const mounter = createReactTreeMounter();

export const createConfirmation = createConfirmationCreater(mounter);
export const MountPoint = createMountPoint(mounter);
export const confirmable = baseConfirmable;