export default function Privacy() {
  return (
    <article className="prose-invert">
      <p className="text-center text-sm font-medium text-brand-400">Privacy Policy</p>
      <h1 className="mt-2 text-center font-display text-2xl font-bold text-zinc-100 sm:text-3xl">
        We care about your privacy
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500">
        Your privacy is important to us at Metube. We respect your privacy regarding any
        information we may collect from you across our website.
      </p>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-zinc-400">
        <p>
          We only collect information about you if we have a reason to do so — for example, to
          provide our services, to communicate with you, or to make our services better. We
          collect this information from three sources: if and when you provide information to us,
          automatically through operating our services, and from outside sources.
        </p>

        <div>
          <h2 className="font-display text-lg font-semibold text-zinc-100">
            What information do we collect?
          </h2>
          <p className="mt-2">
            Information you provide includes your account details (name, username, email and
            profile images), any content you upload such as videos, comments and playlists, and
            anything else you choose to share with us.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-zinc-100">
            How do we use your information?
          </h2>
          <p className="mt-2">
            We use the information we collect to provide, maintain and improve our services,
            including to authenticate your account, personalize your experience, and keep the
            platform secure.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-zinc-100">Your rights</h2>
          <p className="mt-2">
            You can access, update or delete your personal information at any time from your
            account settings. If you have questions about this policy, please contact our support
            team.
          </p>
        </div>
      </div>
    </article>
  );
}
