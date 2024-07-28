import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

// Define the structure of an invoice
interface Invoice {
  id: number;
  date: string;
  amount: string;
}

const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    // Simulating a network request to fetch invoices
    const fetchInvoices = async () => {
      try {
        // Here you can replace this with a real API call if needed
        const dummyInvoices: Invoice[] = [
          { id: 1, date: '2024-01-01', amount: 'R1000.00' },
          { id: 2, date: '2024-02-01', amount: 'R1500.00' },
          { id: 3, date: '2024-03-01', amount: 'R2000.00' },
          { id: 4, date: '2024-04-01', amount: 'R2500.00' },
        ];

        setInvoices(dummyInvoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        Alert.alert('Error', 'Failed to load invoices. Please try again later.');
      }
    };

    fetchInvoices();
  }, []);

  const handleViewInvoice = (invoiceId: string) => {
    router.push(`/InvoiceDetails/[id]`);
    router.setParams({id : invoiceId})
  };

  const renderInvoice = ({ item }: { item: Invoice }) => (
    <TouchableOpacity onPress={() => handleViewInvoice(item.id)} style={styles.invoiceItem}>
      <View style={styles.invoiceInfo}>
        <Text style={styles.invoiceNumber}>Invoice #{item.id}</Text>
        <Text style={styles.invoiceDate}>Date: {item.date}</Text>
        <Text style={styles.invoiceAmount}>Amount: {item.amount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderInvoice}
        contentContainerStyle={styles.invoiceList}
      />
    </View>
  );
};

export default Invoices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  invoiceList: {
    paddingBottom: 80,
  },
  invoiceItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  invoiceInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  invoiceNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  invoiceDate: {
    fontSize: 16,
    color: '#888',
  },
  invoiceAmount: {
    fontSize: 16,
    color: '#888',
  },
});
