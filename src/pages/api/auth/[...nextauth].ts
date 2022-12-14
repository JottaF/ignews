import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from "../../../services/fauna"
import { query as q } from "faunadb"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const { email } = user
            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            { data: { email } }
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(email)
                            )
                        )
                    )
                )
                return true

            } catch (err) {
                console.log(
                    'Error: [%s] %s: %s',
                    err.name,
                    err.message,
                    err.errors()[0].description,
                )
                return false
            }
        }
    }
}

export default NextAuth(authOptions)