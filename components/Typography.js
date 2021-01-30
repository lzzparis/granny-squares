import React from 'react';
import { Text } from 'react-native';

function Typography({ style, children, ...props }) {
  return (
    <Text {...props} style={{ ...style, fontFamily: 'Poppins_400Regular' }}>{children}</Text>
  );
}

export default Typography;
