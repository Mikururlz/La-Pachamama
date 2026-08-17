import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../config";

export default function InstagramSection() {
  const hasInstagramProfile = Boolean(INSTAGRAM_URL && INSTAGRAM_HANDLE);

  return (
    <section className="instagramSection" aria-labelledby="instagram-title">
      <div className="container instagramInner">
        <div>
          <h2 id="instagram-title">Seguinos en Instagram</h2>
          <p>Conocé nuestros productos y novedades.</p>
        </div>
        {hasInstagramProfile ? (
          <a
            className="instagramButton"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle className="instagramDot" cx="17.4" cy="6.7" r="1" />
            </svg>
            Ver Instagram
          </a>
        ) : (
          <span className="instagramButton" aria-disabled="true">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle className="instagramDot" cx="17.4" cy="6.7" r="1" />
            </svg>
            Ver Instagram
          </span>
        )}
      </div>
    </section>
  );
}
