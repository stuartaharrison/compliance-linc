import "little-state-machine";

declare module "little-state-machine" {
    interface GlobalState {

    }
};

declare global {
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