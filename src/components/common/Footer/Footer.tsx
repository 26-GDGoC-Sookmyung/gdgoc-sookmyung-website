import blogIcon from '@/assets/icons/footer/blog.svg';
import gdgCommunityIcon from '@/assets/icons/footer/gdg-community.svg';
import githubIcon from '@/assets/icons/footer/github.svg';
import instagramIcon from '@/assets/icons/footer/instagram.svg';
import youtubeIcon from '@/assets/icons/footer/youtube.svg';
import styles from './Footer.module.css';

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/gdg_sookmyung/',
    icon: instagramIcon,
  },
  {
    label: 'GDG Community',
    href: 'https://gdg.community.dev/gdg-on-campus-sookmyung-womens-university-seoul-south-korea/',
    icon: gdgCommunityIcon,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/dsc-sookmyung',
    icon: githubIcon,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@gdgocsookmyung',
    icon: youtubeIcon,
  },
  {
    label: 'Blog',
    href: 'https://dsc-sookmyung.tistory.com/',
    icon: blogIcon,
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.brandDot} aria-hidden="true" />
          <p className={styles.name}>
            GDGoC <span>Sookmyung</span>
          </p>
        </div>
        <div className={styles.social} aria-label="소셜 채널">
          {socialLinks.map((link) => (
            <a
              className={styles.socialLink}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              key={link.label}
            >
              <img
                className={styles.socialIcon}
                src={link.icon}
                alt=""
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
        <p className={styles.copyright}>
          Copyrightⓒ25-26 GDGoC Sookmyung All rights reserved.
        </p>
      </div>
    </footer>
  );
}
