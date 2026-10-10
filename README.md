# GameLaunch Bridge

Independent gaming creator-marketing pilot, focused initially on console accessories and major game-release windows.

**Live site:** https://michaelpan24.github.io/gamelaunch-bridge/

**Business contact (public, approved by operator):** 1102847670py@gmail.com

**Status:** Public early-stage website, with email-client inquiries available. This is **not** a hosted-form/CRM submission service.

> GameLaunch Bridge is independent. It is not affiliated with, sponsored by or endorsed by Rockstar Games or Take-Two Interactive.

## Site structure
- `index.html` — English landing page, brand and creator intake UI, scope/indicative prices and disclaimers.
- `styles.css` — responsive layouts.
- `main.js` — on form submission, validates fields and opens `mailto:` with an inquiry draft addressed to the public contact. **The visitor must explicitly press Send** in their own email application. No website lead database or submission API is present.
- `privacy.html` — current email-contact privacy disclosure. Operator legal identity and jurisdiction-specific compliance details must be confirmed before paid engagements.
- `.nojekyll` — direct static hosting compatibility.

## Tested and not tested
- [x] Files committed to main branch
- [x] GitHub Pages previously deployed successfully
- [x] Email recipient deliberately configured with user permission
- [x] Both form configurations updated from preview to email draft mode
- [x] Static site privacy/contact copy updated
- [ ] Manual cross-device functional test for opening mailto drafts
- [ ] Actual test message received in Gmail (no test message sent automatically)
- [ ] Identity and retention policies validated before scaled outreach
- [ ] Hosted form and private CRM integration (optional upgrade; not currently implemented)
- [ ] Production legal terms / privacy review before paid contracts
- [ ] Review and send individually drafted, compliant brand/creator outreach

### Testing the inquiry UI
1. Visit the live site, select **For brands** or **For creators**.
2. Enter fictitious test details, accept the notice and press **Open email draft**.
3. Your email application should open a draft to `1102847670py@gmail.com`. Confirm correct subject and body.
4. If you choose to send an actual test message, verify it reaches Gmail.
5. If the email handler doesn't launch, use the visible contact link. The site cannot detect whether the email was ultimately sent.

**Important:** Do not put personal customer records, CRM exports or other nonpublic data into this public repository.

## Indicative commercial pilot
- $499 creator-research shortlist; deliverables must be scoped in a proposal.
- $1,499 coordination fee, with creator compensation, media, taxes and usage rights separate unless contract explicitly says otherwise.
- No views, revenue, confirmed creator availability, or partnership is promised.
