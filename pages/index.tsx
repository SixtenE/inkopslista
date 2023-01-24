import { Button, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ProfileSelect from '../components/ProfileSelect'
import ShoppingList from '../components/ShoppingList'
import { supabase } from '../lib/initSupabase'

export default function Index() {
    const [user, setUser] = useState<any>(null)
    const [users, setUsers] = useState<[]>([])

    async function getLocalUser() {
        const localUser = localStorage.getItem('user_id')

        if (localUser) {
            let { data, error } = await supabase.from('users').select('user_name, user_id').eq('user_id', localUser)

            if (error) return

            if (data) setUser(data[0] as any)
        }
    }

    useEffect(() => {
        getLocalUser()
    }, [])

    return (
        <Flex
            justifyContent='center'
            direction='column'
        >
            {user ? (
                <ShoppingList
                    user={user}
                    setUser={setUser}
                    otherUsers={users.filter((otherUser: any) => otherUser.user_id !== user.user_id)}
                />
            ) : (
                <ProfileSelect
                    setUser={setUser}
                    users={users}
                    setUsers={setUsers}
                />
            )}
        </Flex>
    )
}