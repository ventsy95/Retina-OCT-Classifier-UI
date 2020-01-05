import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import * as Constants from './constants';

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
    },
    boldText: {
        padding: 10, 
        fontFamily: 'Helvetica-Bold'
    },
    text: {
        padding: 0, 
        fontFamily: 'Helvetica'
    },
    indentedText: {
        padding: 0, 
        marginLeft: 30,
        fontFamily: 'Helvetica'
    }
});

// Create Document Component
const MyDocument = (props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.boldText}>OCT Scan:</Text>
                <Image style={styles.image} src={`data:image/*;base64,${props.image}`} />
                <Text style={styles.boldText}>Diagnose: <Text style={styles.text}>{props.diagnose}</Text></Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.boldText}>Personal info:</Text>
                <Text style={styles.boldText}>Name:</Text>
                {props.fullName.split(" ").map(row => (
                    <Text style={styles.indentedText}>{row}</Text>
                ))}
                <Text style={styles.boldText}>Age: <Text style={styles.text}>{props.age}</Text></Text>
                <Text style={styles.boldText}>Gender: <Text style={styles.text}>{props.gender}</Text></Text>
            </View>
        </Page>
    </Document>
);

export default MyDocument;