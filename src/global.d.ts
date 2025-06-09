import "little-state-machine";

declare module "little-state-machine" {
    interface GlobalState {

    }
};

declare global {
    type FormSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    type FormTheme = 'primary' | 'secondary' | 'accent' | 'warning' | 'info' | 'success' | 'danger'
    type UserType = {
        id: string,
        collectionId: string,
        collectionName: string,
        username: string,
        name: string,
        type: string,
        group: string,
        email: string,
        avatar: string | null,
        verified: boolean,
        emailVisibility: boolean,
        created: string,
        updated: string
    };
};