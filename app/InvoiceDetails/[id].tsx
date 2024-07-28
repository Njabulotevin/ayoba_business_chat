import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

const InvoiceDetails = () => {
  const route = useRoute();
  const { invoiceId } = route.params;

  // Dummy data for the invoice details
  const invoiceDetails = {
    id: invoiceId,
    date: '2024-01-01',
    amount: 'R1000.00',
    items: [
      { description: 'Item 1', quantity: 2, price: 'R500.00' },
      { description: 'Item 2', quantity: 1, price: 'R500.00' },
    ],
    customer: {
      name: 'John Doe',
      address: '123 Main St, Anytown, AT 12345',
      phone: '123-456-7890',
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Invoice #{invoiceDetails.id}</Text>
      <Text style={styles.detail}>Date: {invoiceDetails.date}</Text>
      <Text style={styles.detail}>Amount: {invoiceDetails.amount}</Text>

      <Text style={styles.sectionHeader}>Customer Details</Text>
      <Text style={styles.detail}>Name: {invoiceDetails.customer.name}</Text>
      <Text style={styles.detail}>Address: {invoiceDetails.customer.address}</Text>
      <Text style={styles.detail}>Phone: {invoiceDetails.customer.phone}</Text>

      <Text style={styles.sectionHeader}>Items</Text>
      {invoiceDetails.items.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemDetail}>{item.description}</Text>
          <Text style={styles.itemDetail}>Quantity: {item.quantity}</Text>
          <Text style={styles.itemDetail}>Price: {item.price}</Text>
        </View>
      ))}
    </View>
  );
};

export default InvoiceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  itemDetail: {
    fontSize: 16,
    color: '#444',
  },
});
