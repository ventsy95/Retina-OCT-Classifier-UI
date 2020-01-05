import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    image: {
        width: '250px',
        height: '166px'
    }
});

// Create Document Component
const MyDocument = (props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>OCT Scan:</Text>
                <Image style={styles.image} src={`data:image/*;base64,${props.image}`} />
                <Text>Diagnose: {props.diagnose}</Text>
            </View>
            <View style={styles.section}>
                <Text>Personal info:</Text>
                <View style={styles.section}>
                    <Text style={{flexGrow: 0}}>Name: {props.fullName}</Text>
                    <Text>Age: {props.age}</Text>
                    <Text>Gender: {props.gender}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default MyDocument;