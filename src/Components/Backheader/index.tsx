import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import Colors from '../../Constans/Colors';
import Icons from '../Icons';
// import { TextComponent } from '../TextComponent';
import CommonFonts from '../../Constans/CommonFonts';


interface BackHeaderProps {
  onPress?: () => void;
  title?:string;
}

const BackHeader: React.FC<BackHeaderProps> = ({ onPress,title }) => {
  return (
    <View style={{ flexDirection: 'row', width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.light,alignItems:'center' }}>
      <Pressable style={{  paddingLeft:10,paddingVertical:10,
    paddingHorizontal:10}} onPress={onPress}>
        <Icons
          type="AntDesign"
          name="arrowleft"
          color={Colors.black}
          size={20}
        />  
      </Pressable>

      <View style={{ width: '85%', padding: verticalScale(10),
    paddingLeft:0 }}>
        <Text style={{
          // fontFamily:CommonFonts.buttonTextFont,
          fontWeight:'600',color:Colors.black,fontSize:17}}>{title}</Text>
      </View> 
    </View>
  );
};

export default BackHeader;
