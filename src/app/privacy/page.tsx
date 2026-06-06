import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Resumate',
  description: 'Privacy policy for Resumate, the AI cover letter generator.',
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="mb-8 inline-flex text-sm font-medium text-[var(--link)] hover:underline"
      >
        ← Back to Resumate
      </Link>

      <h1 className="text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-[var(--mute)]">Last updated: June 7, 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-7 text-[var(--body)]">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Overview</h2>
          <p>
            Resumate (&quot;we&quot;, &quot;the app&quot;) is a cover letter generator that helps you create
            tailored cover letters from your resume and a job description. This policy explains what
            information we collect, how we use it, and what we do not store.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Information we collect</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-[var(--ink)]">Google account information.</strong> If you sign in
              with Google, we receive your name, email address, and profile picture. We use this to
              identify your session and enforce daily usage limits.
            </li>
            <li>
              <strong className="text-[var(--ink)]">Resume and job description content.</strong> When you
              upload a PDF or paste text, we extract and process that content to generate your cover
              letter.
            </li>
            <li>
              <strong className="text-[var(--ink)]">Usage data.</strong> We store a daily generation
              count linked to your email address (for example, how many cover letters you have generated
              today). This is used only for rate limiting.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">What we do not store</h2>
          <p>
            We do <strong className="text-[var(--ink)]">not</strong> save your cover letters, resume
            files, or job descriptions to a database. Generated content exists only in your browser
            session until you close the tab or navigate away. We do not build a history of your letters
            on our servers.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">How we use your information</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>To authenticate you via Google sign-in</li>
            <li>To generate cover letter content tailored to your resume and job description</li>
            <li>To enforce fair usage limits (5 generations per day per account, unless otherwise configured)</li>
            <li>To operate and improve the app</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Third-party services</h2>
          <p className="mb-3">We use the following services to run Resumate:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-[var(--ink)]">Google OAuth</strong> — for sign-in authentication
            </li>
            <li>
              <strong className="text-[var(--ink)]">Groq</strong> — to process resume and job description
              text and generate cover letter content. Text you submit is sent to Groq&apos;s API for this
              purpose.
            </li>
            <li>
              <strong className="text-[var(--ink)]">Upstash Redis</strong> — to store daily generation
              counts per email address
            </li>
            <li>
              <strong className="text-[var(--ink)]">Vercel</strong> — to host the application
            </li>
          </ul>
          <p className="mt-3">
            These providers process data according to their own privacy policies. We do not sell your
            personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Cookies and local storage</h2>
          <p>
            We use session cookies to keep you signed in (via NextAuth). We also store your theme
            preference (light or dark mode) in your browser&apos;s local storage. We do not use
            advertising or tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Data retention</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Cover letter content is not retained on our servers after your session ends.</li>
            <li>Daily usage counters expire automatically within 24 hours.</li>
            <li>Authentication sessions follow standard session expiry managed by NextAuth.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Your choices</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>You can sign out at any time using the Sign out button in the app header.</li>
            <li>You can revoke Resumate&apos;s access to your Google account in your Google Account settings under &quot;Third-party apps with account access&quot;.</li>
            <li>You can clear your browser&apos;s local storage to reset theme preferences.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Children&apos;s privacy</h2>
          <p>
            Resumate is not intended for users under the age of 13. We do not knowingly collect
            information from children.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Changes to this policy</h2>
          <p>
            We may update this privacy policy from time to time. The &quot;Last updated&quot; date at the
            top of this page will reflect any changes.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Contact</h2>
          <p>
            If you have questions about this privacy policy, contact us at{' '}
            <a
              href="mailto:singhpriyansh2000@gmail.com"
              className="font-medium text-[var(--link)] hover:underline"
            >
              singhpriyansh2000@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
