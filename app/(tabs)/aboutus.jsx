import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import vector icons

// Import local images
import background from "../../assets/images/backgroundimg.png";
import profile from "../../assets/images/joy.png";

export default function AboutUs() {
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("An error occurred", err));
  };

  const handleEmailPress = () => {
    const email = "shahsultan@gmail.com";
    const subject = "Contacting You";
    const body = "Hello, I would like to get in touch with you.";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailtoUrl).catch((err) => console.error("An error occurred", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={background} style={styles.backgroundImage}>
        <View style={styles.content}>
          <Image source={profile} style={styles.profileImage} />
          <Text style={styles.name}>Shahsultan Islam Joy</Text>
          <Text style={styles.title}>Full Stack Developer</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.sectionContent}>
              I am a passionate developer with a love for creating dynamic and
              responsive web and mobile applications...
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <Text style={styles.sectionContent}>
              B.S.C (Computer Science & Engineering) {"\n"} S.S.C in Nabarun
              Public school
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.sectionContent}>
              JavaScript, React, React Native, Node.js{"\n"}- c++, type script,
              Flask{"\n"}- SQL, MongoDB, Firebase
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <View style={styles.contactItem}>
              <TouchableOpacity onPress={handleEmailPress} style={styles.contactButton}>
                <Icon name="envelope" size={20} color="#333" />
                <Text style={styles.contactText}>shahsultan@gmail.com</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contactItem}>
              <TouchableOpacity onPress={() => openLink('https://www.facebook.com')} style={styles.contactButton}>
                <Icon name="facebook-square" size={30} color="#3b5998" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink('https://www.youtube.com')} style={styles.contactButton}>
                <Icon name="youtube-square" size={30} color="#FF0000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  content: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Add a semi-transparent background to the content
    borderRadius: 10,
    margin: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginTop: 20,
    borderColor: "#ddd",
    borderWidth: 2,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  sectionContent: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  contactText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
});
