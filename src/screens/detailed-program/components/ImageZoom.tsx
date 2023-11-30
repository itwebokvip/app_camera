import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors, sizes } from 'core';
import { goBack } from 'helpers/navigation';

const ImageZoomDetail: React.FC<any> = ({ route }: any) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AntDesign name='arrowleft' size={24} style={{ paddingHorizontal: 20, position: 'absolute', top: 50, left: 10, zIndex: 2 }} onPress={goBack} />
            <View style={[StyleSheet.absoluteFillObject]}>
                <Image
                    resizeMode="contain"
                    resizeMethod="resize"
                    style={[StyleSheet.absoluteFillObject, { resizeMode: 'cover' }]}
                    source={{ uri: route.params.item.uri }} />
            </View>
            {/* <View style={{ width: '80%', height: '30%', justifyContent: 'space-between', alignContent: 'space-between', backgroundColor: 'white' }}></View> */}
            <View style={styles.container}>
                <View style={{ flexDirection: 'column', flex: 1, padding: sizes.s20 }}>
                    <Text style={{ color: colors.black, fontSize: sizes.s22 }}>{route.params.infos.currAdd}</Text>
                    <View style={{ flexDirection: 'row', paddingTop: sizes.s18 }}>
                        <AntDesign name='clockcircleo' size={sizes.s20} color={'black'} />
                        <Text style={{ marginLeft: sizes.s8, color: colors.gray400, fontSize: sizes.s16 }}>{route.params.infos.time}</Text>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default ImageZoomDetail;

const styles = StyleSheet.create({
    containers: {
        padding: 16,
    },
    itemContainers: {
        borderWidth: 1,
        borderColor: colors.semanticsWarning,
        marginBottom: 16,
        marginTop: 10,
        padding: 20,
        borderRadius: 8,
    },
    infoContainer: {
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: 'blue',
        marginHorizontal: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    image: {
        width: 350,
        position: 'relative',
        height: 200,
    },
    container: {
        width: '100%',
        height: '20%',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        backgroundColor: 'white',
        borderTopLeftRadius: sizes.s30,
        borderTopRightRadius: sizes.s30,
        position: 'absolute',
        bottom: 0,
        elevation: sizes.s10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
        color: colors.black
    },
});
