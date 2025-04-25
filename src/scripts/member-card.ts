import { fetchMemberData } from './api';
import { Member } from './types';

export class MemberCard {
    private memberCard: HTMLElement;

    constructor(memberCardId: string) {
        const element = document.getElementById(memberCardId);

        if (!element) {
            throw new Error(`${memberCardId} not found`)
        }

        this.memberCard = element;
    }

    async getMember(memberId: string): Promise<void> {
        try {
            this.memberLoading();

            const data = await fetchMemberData(memberId);

            if (data.value) {

                this.renderMember(data.value)

            } else {
                this.displayErrorMessage('Unexpected response');
            }

        }
        catch (error) {
            this.displayErrorMessage(`${error}`)
        }    
    }

    private renderMember(memberData: Member ): void {
        try {
            const member = memberData;
            const party = member.latestParty;
            const membership = member.latestHouseMembership;

            //Check if the member's end date is before the current date
            const membershipEndDate = membership && membership.membershipEndDate &&
                new Date(membership.membershipEndDate) < new Date();

            //Check the party-background colour
            const partyColour = party && party.backgroundColour ? party.backgroundColour : '#373151'

            //Create a unique Id for the inline style
            const styleId = `party-style-${member.id}`


            const html = `
            <style id="${styleId}">
                .member-card__image--${member.id} {border-color: #${partyColour}}
            </style>

            <div class="member-card__container">
                <div class="member-card__image-container">
                    <img class="member-card__image member-card__image--${member.id}"
                    src="${member.thumbnailUrl}"
                    alt="" />
                </div>
                <div class="member-card__content">
                    <div class="member-card__party">${party.name || 'Unknown Party'}</div>
                    <div class="member-card__name">${member.nameDisplayAs || 'Unknown Name'}</div>
                    <div class="member-card__constituency">${membership.membershipFrom || "Unknown Constituency"}</div>
                    ${membershipEndDate ? '<div class="member-card__status">No longer serving</div>': ''}
                </div>
            </div>
            `;

            this.memberCard.innerHTML = html;

        }
        catch (error) {
            this.displayErrorMessage(`${error}`);
        }
            
    }

    private memberLoading(): void {
        const html = `
        <div class="member-card__container">
            <div class="member-card__loading"> Loading ...</div>
        </div>
        `
        this.memberCard.innerHTML = html;

    }

    private displayErrorMessage(message : string): void {
        const html = `
        <div class="member-card__container">
             <div class="member-card__error">${message}</div>
        </div>
        `
        this.memberCard.innerHTML = html;

    }

}