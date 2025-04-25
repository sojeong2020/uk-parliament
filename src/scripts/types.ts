export interface MemberResponse {
    value: Member;
}

export interface Member {
    id: string;
    nameDisplayAs: string;
    thumbnailUrl: string;
    latestParty: {
        id: string;
        name: string;
        backgroundColour: string;
        foregroundColour: string;
    };
    latestHouseMembership: {
        membershipFrom: string;
        membershipEndDate?: string;
    }
}