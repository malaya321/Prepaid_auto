import { View, Text } from 'react-native'
import React from 'react'
import BodyWarpper from '../../../Components/BodyWarpper'
import BackHeader from '../../../Components/Backheader'

const Profile = () => {
  return (
    <BodyWarpper>
        <BackHeader 
        onPress={()=>{}}
        title='Profile'/>
      <Text>Profile</Text>
    </BodyWarpper>
  )
}

export default Profile