import { MemberCard } from './member-card';
import '../styles/main.scss';

const urlParams = new URLSearchParams(document.location.search);

const memberId = urlParams.get('id') || '4514';


const memberCard = new MemberCard('member-card');

memberCard.getMember(memberId);

