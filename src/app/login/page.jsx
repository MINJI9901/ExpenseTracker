import { redirect } from 'next/navigation'

import { login, signup } from './actions'
import { authenticateUser } from './actions'

import Login from '@/components/user/Login'

export default async function LoginPage() {
    // const result = await middleware();
    // console.log(result)

    const user = await authenticateUser();
    console.log('user: ', user);

    if (user) {
        redirect('/private')
    }
    return (
        <Login/>
    )
}