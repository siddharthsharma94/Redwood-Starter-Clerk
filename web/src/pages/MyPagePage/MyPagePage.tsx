import { SignInButton, useAuth, UserButton } from '@clerk/clerk-react'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const MyPagePage = () => {
  const { isSignedIn, sessionId, userId } = useAuth()
  return (
    <>
      <MetaTags title="MyPage" description="MyPage page" />
      {isSignedIn ? (
        <UserButton afterSignOutUrl={window.location.href} />
      ) : (
        <SignInButton mode="modal">
          <button>Log in</button>
        </SignInButton>
      )}
      <h1>MyPagePage</h1>
      <p>
        Find me in <code>./web/src/pages/MyPagePage/MyPagePage.tsx</code>
      </p>
      <p>
        My default route is named <code>myPage</code>, link to me with `
        <Link to={routes.myPage()}>MyPage</Link>`
      </p>
    </>
  )
}

export default MyPagePage
