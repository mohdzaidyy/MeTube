export default function Terms() {
  return (
    <article className="prose-invert">
      <p className="text-center text-sm font-medium text-brand-400">Current as of July 2026</p>
      <h1 className="mt-2 text-center font-display text-2xl font-bold text-zinc-100 sm:text-3xl">
        Terms and conditions
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500">
        By accessing our website, you are agreeing to be bound by these terms of service, and
        agree that you are responsible for compliance with any applicable local laws.
      </p>

      <hr className="my-8 border-base-border" />

      <div className="space-y-6 text-sm leading-relaxed text-zinc-400">
        <p>
          These Terms and Conditions govern your use of Metube. By creating an account or using our
          services, you agree to these terms in full. If you disagree with any part of these
          terms, please do not use our services.
        </p>

        <div>
          <h2 className="font-display text-lg font-semibold text-zinc-100">Content ownership</h2>
          <p className="mt-2">
            You retain ownership of any content you upload. By uploading content, you grant Metube a
            license to host, store and display that content as part of operating the service.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-zinc-100">Acceptable use</h2>
          <p className="mt-2">
            You agree not to upload content that infringes on others' rights, violates any law, or
            is intended to harass, abuse or harm other users.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-zinc-100">
            Termination
          </h2>
          <p className="mt-2">
            We may suspend or terminate your access to Metube if you violate these terms. You may
            also delete your account at any time by contacting support.
          </p>
        </div>
      </div>
    </article>
  );
}
