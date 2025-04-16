import { ReactNode } from 'react';

type SocialIconProps = {
  href: string;
  icon: ReactNode;
  label: string;
  className?: string;
};

const SocialIcon = ({ href, icon, label, className = '' }: SocialIconProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`transition-colors duration-300 ${className}`}
      aria-label={label}
    >
      {icon}
    </a>
  );
};

export default SocialIcon;
