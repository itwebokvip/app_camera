import React, { Component, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    WaveIndicator,
} from 'react-native-indicators';

interface LoadingViewProps {
    style?: any;
}

export default class LoadingView extends Component<LoadingViewProps> {
    render(): ReactNode {
        return (
            <View style={[styles.container, this.props.style]}>
                <WaveIndicator color="blue" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});