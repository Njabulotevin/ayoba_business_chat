import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming you are using React Navigation
import { router } from 'expo-router';

const OrderDetails = () => {
  const navigation = useNavigation();

  const orders = [
    { id: 1, name: 'Customer 1', orderNumber: 7832748, status: 'Pending Payment', items: [{ name: 'T-shirt', quantity: 2, price: 250 }] },
    { id: 2, name: 'Customer 2', orderNumber: 7832749, status: 'Shipped', items: [{ name: 'Jeans', quantity: 1, price: 300 }] },
    // Add more orders here
  ];

  const handleOrderPress = (orderId: string) => {
    router.push(`/OrderDetails/[id]`);
    router.setParams({id : orderId})
  };

  return (
    <ScrollView style={styles.container}>
      {orders.map((order) => (
        <TouchableOpacity key={order.id} style={styles.orderContainer} onPress={() => handleOrderPress(order.id)}>
          <View style={styles.header}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileIconText}>{order.name.charAt(0)}</Text>
            </View>
            <Text style={styles.customerName}>{order.name}</Text>
            <Text style={styles.orderNumber}>Order Number # {order.orderNumber}</Text>
            <View style={styles.statusButton}>
              <Text style={styles.statusButtonText}>{order.status}</Text>
            </View>
          </View>
          {order.items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.itemImage}></View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Quantity {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>R{item.price}.00</Text>
            </View>
          ))}
          <View style={styles.separator}></View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>R{order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  orderContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
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
});
