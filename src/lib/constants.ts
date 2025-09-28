import { Home, ClipboardList, Library, Bot, User, LucideIcon } from 'lucide-react';
import type { EnneagramType } from './types';

type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/quick-check', label: 'Quick Check', icon: ClipboardList },
  { href: '/deep-dive', label: 'Deep Dive', icon: Library },
  { href: '/simulations', label: 'Simulations', icon: Bot },
  { href: '/profile', label: 'Profile', icon: User },
];

export const ENNEAGRAM_TYPES: EnneagramType[] = [
    { id: '1', name: 'Type 1: The Reformer', description: 'Rational, idealistic, principled, and self-controlled.' },
    { id: '2', name: 'Type 2: The Helper', description: 'Caring, interpersonal, generous, and people-pleasing.' },
    { id: '3', name: 'Type 3: The Achiever', description: 'Success-oriented, pragmatic, adaptive, and driven.' },
    { id: '4', name: 'Type 4: The Individualist', description: 'Sensitive, withdrawn, expressive, and dramatic.' },
    { id: '5', name: 'Type 5: The Investigator', description: 'Intense, cerebral, perceptive, and secretive.' },
    { id: '6', name: 'Type 6: The Loyalist', description: 'Committed, security-oriented, engaging, and responsible.' },
    { id: '7', name: 'Type 7: The Enthusiast', description: 'Busy, fun-loving, spontaneous, and versatile.' },
    { id: '8', name: 'Type 8: The Challenger', description: 'Powerful, dominating, self-confident, and decisive.' },
    { id: '9', name: 'Type 9: The Peacemaker', description: 'Easygoing, self-effacing, receptive, and reassuring.' },
];
