import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import * as Constants from './constants';

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#E4E4E4'
    },
    customSection: {
        flexDirection: 'row',
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
    infoText: {
        padding: 10,
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
            <View style={styles.customSection}>
                <View style={styles.section}>
                    <Text style={styles.boldText}>OCT Scan:</Text>
                    <Image style={styles.image} src={`data:image/*;base64,${props.image}`} />
                    <Text style={styles.boldText}>Diagnosis: <Text style={styles.text}>{props.diagnosis}</Text></Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.boldText}>Personal info:</Text>
                    <Text style={styles.boldText}>Name:</Text>
                    {props.fullName.split(" ").map(row => (
                        <Text key={row} style={styles.indentedText}>{row}</Text>
                    ))}
                    <Text style={styles.boldText}>Age: <Text style={styles.text}>{props.age}</Text></Text>
                    <Text style={styles.boldText}>Gender: <Text style={styles.text}>{props.gender}</Text></Text>
                    <Text style={styles.boldText}>Ethnicity: <Text style={styles.text}>{props.race}</Text></Text>
                </View>
            </View>
            {props.diagnosis === 'CNV' &&
                <View>
                    <Text style={styles.boldText}>{Constants.CNV_TITLE}</Text>
                    <Text style={styles.boldText}>What is CNV?</Text>
                    <Text style={styles.infoText}>{Constants.CNV_INFO}</Text>
                    <Text style={styles.boldText}>Treatment</Text>
                    <Text style={styles.infoText}>{Constants.CNV_TREATMENT}</Text>
                </View>
            }
            {props.diagnosis === 'DME' &&
                <View>
                    <Text style={styles.boldText}>{Constants.DME_TITLE}</Text>
                    <Text style={styles.boldText}>What is DME?</Text>
                    <Text style={styles.infoText}>{Constants.DME_INFO}</Text>
                    <Text style={styles.boldText}>Treatment</Text>
                    <Text style={styles.infoText}>{Constants.DME_TREATMENT}</Text>
                </View>
            }
            {props.diagnosis === 'DRUSEN' &&
                <View>
                    <Text style={styles.boldText}>{Constants.DRUSEN_TITLE}</Text>
                    <Text style={styles.boldText}>What is DRUSEN?</Text>
                    <Text style={styles.infoText}>{Constants.DRUSEN_INFO}</Text>
                    <Text style={styles.boldText}>Treatment</Text>
                    <Text style={styles.infoText}>{Constants.DRUSEN_TREATMENT}</Text>
                </View>
            }
            {props.diagnosis === 'CSR' &&
                <View>
                    <Text style={styles.boldText}>{Constants.CSR_TITLE}</Text>
                    <Text style={styles.boldText}>What is CSR?</Text>
                    <Text style={styles.infoText}>{Constants.CSR_INFO}</Text>
                    <Text style={styles.boldText}>Treatment</Text>
                    <Text style={styles.infoText}>{Constants.CSR_TREATMENT}</Text>
                </View>
            }
            {props.diagnosis === 'MH' &&
                <View>
                    <Text style={styles.boldText}>{Constants.MH_TITLE}</Text>
                    <Text style={styles.boldText}>What is MH?</Text>
                    <Text style={styles.infoText}>{Constants.MH_INFO}</Text>
                    <Text style={styles.boldText}>Treatment</Text>
                    <Text style={styles.infoText}>{Constants.MH_TREATMENT}</Text>
                </View>
            }
            {props.diagnosis === 'NORMAL' &&
                <View>
                    <Text style={styles.boldText}>{Constants.NORMAL_TITLE}</Text>
                </View>
            }
        </Page>
    </Document>
);

export default MyDocument;