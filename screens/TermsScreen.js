import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';

const email = "email";


export default () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.layout}>
                <Text style={styles.header}>Terms and Conditions</Text>
                <Text>Last updated: April 05, 2021</Text>
                <Text>Please read these terms and conditions carefully before using Our Service.</Text>
                <Text style={styles.header}>Interpretation and Definitions</Text>
                <Text style={styles.subheader}>Interpretation</Text>
                <Text>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</Text>
                <Text style={styles.subheader}>Definitions</Text>
                <Text>For the purposes of these Terms and Conditions:</Text>



                <Text><Text style={{ fontWeight: 'bold' }}>&#8226; Application </Text>
                means the software program provided by the Company downloaded by You on any electronic device, named GoPlay! - Montana Repertory Theatre</Text>


                <Text><Text style={{ fontWeight: 'bold' }}>&#8226; Application Store </Text>
                means the digital distribution service operated and developed by Apple Inc. (Apple App Store) or Google Inc. (Google Play Store) in which the Application has been downloaded.</Text>


                <Text><Text style={{ fontWeight: 'bold' }}>&#8226; Affiliate </Text>
                means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</Text>


                <Text><Text style={{ fontWeight: 'bold' }}>&#8226; Account </Text>
                means a unique account created for You to access our Service or parts of our Service.</Text>


                <Text><Text style={{ fontWeight: 'bold' }}>&#8226; Country </Text>
                refers to: Montana, United States</Text>


                <Text><Text style={{ fontWeight: 'bold' }}>&#8226; Company </Text>
                (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Montana Repertory Theatre, 32 Campus Drive.</Text>


                <Text><Text style={{ fontWeight: 'bold' }}>&#8226; Device </Text>
                means any device that can access the Service such as a computer, a cellphone or a digital tablet.</Text>


                <Text><Text style={{ fontWeight: 'bold' }}>&#8226; Service </Text>
                refers to the Application or the Website or both.</Text>


                <Text><Text style={{ fontWeight: 'bold' }}>&#8226; Subscriptions </Text>
                refer to the services or access to the Service offered on a subscription basis by the Company to You.</Text>


                <Text><Text style={{ fontWeight: 'bold' }}>&#8226; Terms and Conditions </Text>
                (also referred as &quot;Terms&quot;) mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</Text>


                <Text><Text style={{ fontWeight: 'bold' }}>&#8226; Third-party Social Media Service </Text>
                means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</Text>


                <Text><Text style={{ fontWeight: 'bold' }}>&#8226; Website </Text>
                refers to Montana Repertory Theatre, accessible from
                    <Text onPress={() => {
                        Linking.openURL("https://goplay.montanarep.com/")
                            .catch(err => {
                                console.error("Failed opening page because: ", err);
                                alert('Failed to open page');
                            })
                    }}>goplay.montanarep.com</Text>
                </Text>

                <Text><Text style={{ fontWeight: 'bold' }}>&#8226; You </Text>
                means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</Text>


                <Text style={styles.header}>Acknowledgment</Text>
                <Text>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</Text>
                <Text>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</Text>
                <Text>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</Text>
                <Text>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</Text>
                <Text>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.</Text>
                <Text style={styles.header}>Subscriptions</Text>
                <Text style={styles.subheader}>Subscription period</Text>
                <Text>The Service or some parts of the Service are available only with a paid Subscription. You will be billed in advance on a recurring and periodic basis (such as daily, weekly, monthly or annually), depending on the type of Subscription plan you select when purchasing the Subscription.</Text>
                <Text>At the end of each period, Your Subscription will automatically renew under the exact same conditions unless You cancel it or the Company cancels it.</Text>
                <Text style={styles.subheader}>Subscription cancellations</Text>
                <Text>You may cancel Your Subscription renewal either through Your Account settings page or by contacting the Company. You will not receive a refund for the fees You already paid for Your current Subscription period and You will be able to access the Service until the end of Your current Subscription period.</Text>
                <Text style={styles.subheader}>Billing</Text>
                <Text>You shall provide the Company with accurate and complete billing information including full name, address, state, zip code, telephone number, and a valid payment method information.</Text>
                <Text>Should automatic billing fail to occur for any reason, the Company will issue an electronic invoice indicating that you must proceed manually, within a certain deadline date, with the full payment corresponding to the billing period as indicated on the invoice.</Text>
                <Text style={styles.subheader}>Fee Changes</Text>
                <Text>The Company, in its sole discretion and at any time, may modify the Subscription fees. Any Subscription fee change will become effective at the end of the then-current Subscription period.</Text>
                <Text>The Company will provide You with reasonable prior notice of any change in Subscription fees to give You an opportunity to terminate Your Subscription before such change becomes effective.</Text>
                <Text>Your continued use of the Service after the Subscription fee change comes into effect constitutes Your agreement to pay the modified Subscription fee amount.</Text>
                <Text style={styles.subheader}>Refunds</Text>
                <Text>Except when required by law, paid Subscription fees are non-refundable.</Text>
                <Text>Certain refund requests for Subscriptions may be considered by the Company on a case-by-case basis and granted at the sole discretion of the Company.</Text>
                <Text style={styles.header}>User Accounts</Text>
                <Text>When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.</Text>
                <Text>You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password, whether Your password is with Our Service or a Third-Party Social Media Service.</Text>
                <Text>You agree not to disclose Your password to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account.</Text>
                <Text>You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than You without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.</Text>
                <Text style={styles.header}>Intellectual Property</Text>
                <Text>The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of the Company and its licensors.</Text>
                <Text>The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.</Text>
                <Text>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.</Text>
                <Text style={styles.header}>Links to Other Websites</Text>
                <Text>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</Text>
                <Text>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</Text>
                <Text>We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</Text>
                <Text style={styles.header}>Termination</Text>
                <Text>We may terminate or suspend Your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</Text>
                <Text>Upon termination, Your right to use the Service will cease immediately. If You wish to terminate Your Account, You may simply discontinue using the Service.</Text>
                <Text style={styles.header}>Limitation of Liability</Text>
                <Text>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</Text>
                <Text>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</Text>
                <Text>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.</Text>
                <Text style={styles.header}>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</Text>
                <Text>The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</Text>
                <Text>Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</Text>
                <Text>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</Text>
                <Text style={styles.header}>Governing Law</Text>
                <Text>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</Text>
                <Text style={styles.header}>Disputes Resolution</Text>
                <Text>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</Text>
                <Text style={styles.header}>For European Union (EU) Users</Text>
                <Text>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.</Text>
                <Text style={styles.header}>United States Federal Government End Use Provisions</Text>
                <Text>If You are a U.S. federal government end user, our Service is a &quot;Commercial Item&quot; as that term is defined at 48 C.F.R. §2.101.</Text>
                <Text style={styles.header}>United States Legal Compliance</Text>
                <Text>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</Text>
                <Text style={styles.header}>Severability and Waiver</Text>
                <Text style={styles.subheader}>Severability</Text>
                <Text>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</Text>
                <Text style={styles.subheader}>Waiver</Text>
                <Text>Except as provided herein, the failure to exercise a right or to require performance of an obligation under this Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.</Text>
                <Text style={styles.header}>Translation Interpretation</Text>
                <Text>These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.</Text>
                <Text style={styles.header}>Changes to These Terms and Conditions</Text>
                <Text>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</Text>
                <Text>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.</Text>
                <Text style={styles.header}>Contact Us</Text>
                <Text>If you have any questions about these Terms and Conditions, You can contact us:</Text>

                <Text>By email:
                    <Text onPress={() => {
                        Linking.openURL('mailto:goplay@montanarep.com')
                            .catch(err => {
                                console.error("Failed opening page because: ", err);
                                alert('Failed to open page');
                            })
                    }}> goplay@montanarep.com</Text>
                </Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 30,
        paddingRight: 30, 
        paddingBottom: 30
    },
    layout: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 20,
        marginBottom: 150,
    },
    header: {
        fontSize: 24,
        fontFamily: 'FuturaPT-Demi',
        textAlign: 'left',
        color: '#343A3F',
        marginTop: 20,
        marginBottom: 10,
    },
    subheader: {
        fontSize: 20,
        fontFamily: 'FuturaPT-Demi',
        textAlign: 'left',
        color: '#343A3F',
        marginTop: 10,
        marginBottom: 10,
    },
    subsubheader: {
        fontSize: 18,
        fontFamily: 'FuturaPT-Demi',
        textAlign: 'left',
        color: '#343A3F',
        marginTop: 10,
        marginBottom: 5,
    },
    header_text: {
        fontSize: 24,
        fontFamily: 'FuturaPT-Demi',
        textAlign: 'center',
        color: '#343A3F',
        marginBottom: 50,
    },
    horizontal_rule: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 30,
        marginTop: 30
    },
    subtext: {
        fontSize: 18,
        fontFamily: 'FuturaPT-Book',
    },

});