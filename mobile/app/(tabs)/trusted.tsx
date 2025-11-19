import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TrustedContacts() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const saved = await AsyncStorage.getItem("trustedContacts");
    if (saved) setContacts(JSON.parse(saved));
  };

  const addContact = async () => {
    if (name === "" || phone.length < 10) {
      alert("Enter valid name & phone");
      return;
    }

    const newList = [...contacts, { name, phone }];
    setContacts(newList);

    await AsyncStorage.setItem("trustedContacts", JSON.stringify(newList));

    setName("");
    setPhone("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Trusted Contact</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Phone Number"
        keyboardType="number-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <Button title="Add Contact" onPress={addContact} />

      <Text style={styles.listHeading}>Saved Contacts</Text>

      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.contactItem}>
            {item.name} - {item.phone}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  listHeading: { fontSize: 20, fontWeight: "bold", marginTop: 20 },
  contactItem: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginTop: 10,
  },
});
