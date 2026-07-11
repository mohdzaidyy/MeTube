# Metube — Frontend

A responsive React frontend for the **Metube** video platform (a YouTube-style clone), built to
match the provided UI mockups and wired end-to-end against your Express/MongoDB backend.

## Stack

- **React 19** + **Vite**
- **React Router v7** for routing (nested layouts, protected routes)
- **Axios** with `withCredentials` cookie auth + automatic access-token refresh
- **Tailwind CSS** for styling (dark theme, purple/pink brand gradient)
- **React Hook Form** for form validation
- **react-hot-toast** for notifications
- **lucide-react** for icons
- **dayjs** for relative/formatted dates

## Getting started

```bash
npm install
cp .env.example .env   # then edit VITE_API_BASE_URL if needed
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Environment variables

| Variable            | Description                                        | Default                        |
| ------------------- | --------------------------------------------------- | ------------------------------- |
| `VITE_API_BASE_URL` | Base URL of your backend API, including `/api/v1`   | `http://localhost:8000/api/v1` |

Check the `PORT` your backend actually listens on (`index.js`) and update this value to match.

### Backend CORS requirement

This app relies on **httpOnly cookies** (`accessToken` / `refreshToken`) for auth, exactly like
your backend issues them. For that to work cross-origin in development, your backend's
`CORS_ORIGIN` environment variable must be set to the frontend's exact origin, e.g.:

```
CORS_ORIGIN=http://localhost:5173
```

and the backend must keep `credentials: true` in its CORS config (already the case in `app.js`).

## Available scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally

## Project structure

```
src/
  api/            One file per backend resource (userApi, videoApi, commentApi, ...)
  components/
    common/       Buttons, modals, avatar, empty states, skeletons, etc.
    layout/       Header, Sidebar, MainLayout, AuthLayout, LegalLayout, ProtectedRoute
    video/        VideoCard, VideoListItem, upload/edit modals, like button
    comment/      Comment list + item
    tweet/        Tweet list + item
    channel/      Channel header/tabs, subscribe button
    playlist/     Playlist card, create/edit modal, save-to-playlist modal
    settings/     Settings tab panels
  context/        AuthContext (session bootstrap, login/register/logout)
  hooks/          usePaginatedFetch, useLikeToggle, useDebounce
  pages/          One file per route/page
  utils/          Formatters, class-name helper, media URL resolver
```

## Pages implemented

Home · Search · Watch (video detail with comments) · Channel (Videos / Playlist / Tweets /
Subscribed tabs, public + owner views) · Playlist detail · Dashboard (stats + video management
table) · Settings (Personal info / Channel info / Change password) · Liked videos · History ·
Collections (your playlists) · Subscribers · Login · Register · Support · Privacy · Terms · 404

## Notes on the backend contract

A few things worth knowing since they shaped some frontend decisions:

- **Watching a video and viewing/posting comments require authentication** — `GET /videos/v/:id`
  and all `/comments` routes are behind `verifyJWT` in your routes. Signed-out visitors can browse
  the Home/Search grid (public), but the Watch page shows a "log in to watch" prompt instead of
  calling the endpoint, to avoid a guaranteed 401.
- **Likes only exist for videos/comments/tweets** — there's no dislike model, so the UI only
  shows a Like toggle (no working dislike button), except in the Dashboard table where a static
  "0 dislikes" badge mirrors the mockup for visual completeness.
- **Channel "username" and "description" aren't editable** — there's no route to update them, so
  the Settings → Channel Information tab is shown (per the mockups) but disabled with an inline
  note, rather than silently failing.
- **File uploads use `FormData` with no manual `Content-Type` header** — letting the browser set
  the multipart boundary automatically, which `multer` needs to parse the request correctly.
- Some aggregation pipelines project `"avatar.url"` while the `User` schema stores `avatar` as a
  plain string URL. The frontend's `resolveMediaUrl()` / `<Avatar>` helpers handle both shapes and
  fall back to initials when nothing resolves, so this doesn't surface as a bug in the UI.

If you patch these on the backend later, the corresponding frontend pieces are isolated enough
(`api/*.js`, `Settings` tabs) to update quickly.
