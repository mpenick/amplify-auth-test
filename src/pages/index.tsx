import { withAuthenticator } from "@aws-amplify/ui-react"

export default withAuthenticator(function Home({signOut, user}) {
  return (
    <div style={{ padding: 50 }}>
      <h1>Logged in as {user?.attributes?.preferred_username}.</h1>
      <div>
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  )
})
