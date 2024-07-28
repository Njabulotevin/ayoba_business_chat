import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const OrderDetails = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>S</Text>
        </View>
        <Text style={styles.customerName}>Customer Name</Text>
        <Text style={styles.orderNumber}>Order Number # 7832748</Text>
        <View style={styles.statusButton}>
          <Text style={styles.statusButtonText}>Pending Payment</Text>
        </View>
      </View>
      <View style={styles.orderItem}>
        <View style={styles.itemImage}></View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>T-shirt</Text>
          <Text style={styles.itemQuantity}>Quantity 2</Text>
        </View>
        <Text style={styles.itemPrice}>R250.00</Text>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>R500</Text>
      </View>
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update Order Status</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ba68c8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileIconText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderNumber: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  statusButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  statusButtonText: {
    color: '#555',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#777',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
