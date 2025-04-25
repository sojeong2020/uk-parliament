import { MemberResponse } from './types';

export async function fetchMemberData(memberId: string): Promise<MemberResponse> {
    try {
        const response = await fetch(`https://members-api.parliament.uk/api/Members/${memberId}`);
        console.log(response,"response")

        if (!response.ok) {
            throw new Error('Failed to fetch member data')
        }

        return await response.json();
    }
    catch (error) {
        console.log(error,"error message")
        throw error;
    }

}